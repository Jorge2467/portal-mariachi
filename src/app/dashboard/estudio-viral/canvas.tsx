"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { ChevronLeft, Plus, Minus, MousePointer2, ChevronDown, Sparkles, Save, Cloud, CloudOff } from 'lucide-react';
import Link from 'next/link';
import { useSession, SessionProvider } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FloatingToolbar } from '@/components/canvas/FloatingToolbar';
import { CanvasArea, CanvasElement } from '@/components/canvas/CanvasArea';
import { ImageGeneratorPanel } from '@/components/canvas/ImageGeneratorPanel';
import { VideoGeneratorPanel } from '@/components/canvas/VideoGeneratorPanel';
import { AiDesignerPanel } from '@/components/canvas/AiDesignerPanel';
import { v4 as uuidv4 } from 'uuid';

function LovartCanvasContent({ onClose }: { onClose?: () => void }) {
    const { data: session, status } = useSession();
    const user = session?.user;
    
    // We remove Supabase for now, rely on local state or fetch APIs manually
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');

    const [scale, setScale] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [elements, setElements] = useState<CanvasElement[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [activeTool, setActiveTool] = useState('select'); // 'select', 'hand', 'mark', 'shape', 'text', 'draw'
    const [title, setTitle] = useState('Untitled');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDraggingElement, setIsDraggingElement] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(projectId);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'offline'>('saved');
    const [isLoading, setIsLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isInitializedRef = useRef(false);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.1));

    const isSavingRef = useRef(false);
    const needsSaveRef = useRef(false);

    // Save project to SQLite Backend Layer
    const saveProject = useCallback(async () => {
        if (!user) {
            console.log('Save skipped: No user logged in');
            setSaveStatus('offline');
            return;
        }

        // Prevent concurrent saves
        if (isSavingRef.current) {
            needsSaveRef.current = true;
            return;
        }

        isSavingRef.current = true;
        console.log('Starting save...', { userId: user.email, projectId: currentProjectId, elementsCount: elements.length });

        try {
            setSaveStatus('saving');
            const targetId = currentProjectId || uuidv4();

            const uniqueElements = Array.from(new Map(elements.map(item => [item.id, item])).values());
            
            // This is a stub for the SQLite save API we will build later
            await fetch('/api/social/canvas/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: targetId,
                    title,
                    elements: uniqueElements
                })
            });

            if (!currentProjectId) {
                setCurrentProjectId(targetId);
                window.history.pushState({}, '', `/dashboard/social-content?id=${targetId}`);
            }

            console.log('Save successful!');
            setSaveStatus('saved');
        } catch (error: any) {
            console.error('Failed to save project:', error);
            setSaveStatus('offline');
        } finally {
            isSavingRef.current = false;
            // If changes happened while saving, trigger another save
            if (needsSaveRef.current) {
                needsSaveRef.current = false;
                saveProject();
            }
        }
    }, [user, currentProjectId, title, elements]);

    // Load project from Local SQL Layer
    const loadProject = useCallback(async (id: string) => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await fetch(`/api/social/canvas/load?id=${id}`);
            if(!res.ok) throw new Error("Failed to load");
            const data = await res.json();
            
            if (data.project) {
                setTitle(data.project.title);
            }
            if (data.elements) {
                setElements(data.elements);
            }
        } catch (error: any) {
            console.error('Failed to load project:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    // Load project on mount if ID is provided
    const hasLoadedRef = useRef(false);
    useEffect(() => {
        if (projectId && user && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            loadProject(projectId);
        } else if (!projectId) {
            setIsLoading(false);
            // Mark as initialized for new projects
            isInitializedRef.current = true;
        }

        // Check if there's a prompt in URL
        const prompt = searchParams.get('prompt');
        if (prompt) {
            setInitialPrompt(prompt);
            setShowChat(true);
        }
    }, [projectId, user, loadProject, searchParams]);

    // Mark as initialized after loading completes
    useEffect(() => {
        if (!isLoading && !isInitializedRef.current && hasLoadedRef.current) {
            isInitializedRef.current = true;
        }
    }, [isLoading]);

    // Auto-save with debouncing
    useEffect(() => {
        // Don't auto-save if not initialized, not logged in, or still loading
        if (!user || isLoading || !isInitializedRef.current) {
            console.log('Auto-save skipped:', { 
                hasUser: !!user, 
                isLoading, 
                isInitialized: isInitializedRef.current 
            });
            return;
        }

        console.log('Auto-save scheduled for', elements.length, 'elements');

        // Clear existing timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set new timeout to save after 2 seconds of inactivity
        saveTimeoutRef.current = setTimeout(() => {
            console.log('Auto-save triggered');
            saveProject();
        }, 2000);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [elements, title, user, isLoading, saveProject]);

    // Handle Delete Key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't delete if user is typing in an input or textarea
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
                return;
            }

            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0) {
                setElements(prev => prev.filter(el => !selectedIds.includes(el.id)));
                setSelectedIds([]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIds]);

    const handleAddImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newElement: CanvasElement = {
                id: uuidv4(),
                type: 'image',
                x: 100 - pan.x + elements.length * 20,
                y: 100 - pan.y + elements.length * 20,
                width: 300,
                height: 200,
                content: e.target?.result as string,
            };
            setElements(prev => [...prev, newElement]);
            setSelectedIds([newElement.id]);
            setActiveTool('select');
        };
        reader.readAsDataURL(file);
    };

    const handleAddVideo = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newElement: CanvasElement = {
                id: uuidv4(),
                type: 'video',
                x: 100 - pan.x + elements.length * 20,
                y: 100 - pan.y + elements.length * 20,
                width: 400,
                height: 300,
                content: e.target?.result as string,
            };
            setElements(prev => [...prev, newElement]);
            setSelectedIds([newElement.id]);
            setActiveTool('select');
        };
        reader.readAsDataURL(file);
    };

    const handleAddText = () => {
        const newElement: CanvasElement = {
            id: uuidv4(),
            type: 'text',
            x: 200 - pan.x + elements.length * 20,
            y: 200 - pan.y + elements.length * 20,
            content: 'Double click to edit',
        };
        setElements(prev => [...prev, newElement]);
        setSelectedIds([newElement.id]);
        setActiveTool('select');
    };

    const handleAddShape = (type: 'square' | 'circle' | 'triangle' | 'star' | 'message' | 'arrow-left' | 'arrow-right') => {
        const newElement: CanvasElement = {
            id: uuidv4(),
            type: 'shape',
            shapeType: type,
            x: 300 - pan.x + elements.length * 20,
            y: 300 - pan.y + elements.length * 20,
            width: 150,
            height: 150,
            color: '#9CA3AF', // Default gray
        };
        setElements(prev => [...prev, newElement]);
        setSelectedIds([newElement.id]);
        setActiveTool('select');
    };

    const handleElementChange = (id: string, newAttrs: Partial<CanvasElement>) => {
        setElements(prev => prev.map(el => el.id === id ? { ...el, ...newAttrs } : el));
    };

    const handleDelete = (id: string) => {
        setElements(prev => prev.filter(el => el.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    };

    const handleOpenImageGenerator = () => {
        const newElement: CanvasElement = {
            id: uuidv4(),
            type: 'image-generator',
            x: 300 - pan.x + elements.length * 20,
            y: 300 - pan.y + elements.length * 20,
            width: 400,
            height: 400,
        };
        setElements(prev => [...prev, newElement]);
        setSelectedIds([newElement.id]);
        setActiveTool('select');
    };

    const handleOpenVideoGenerator = () => {
        const newElement: CanvasElement = {
            id: uuidv4(),
            type: 'video-generator',
            x: 300 - pan.x + elements.length * 20,
            y: 300 - pan.y + elements.length * 20,
            width: 400,
            height: 300,
        };
        setElements(prev => [...prev, newElement]);
        setSelectedIds([newElement.id]);
        setActiveTool('select');
    };

    const handleGenerateVideo = async (videoUrl: string) => {
        const generatorElementId = selectedIds.find(id => elements.find(el => el.id === id)?.type === 'video-generator');

        if (generatorElementId) {
            setElements(prev => prev.map(el => {
                if (el.id === generatorElementId) {
                    return { ...el, type: 'video', content: videoUrl };
                }
                return el;
            }));
        } else {
            const newElement: CanvasElement = {
                id: uuidv4(),
                type: 'video',
                x: 300 - pan.x,
                y: 300 - pan.y,
                width: 400,
                height: 300,
                content: videoUrl,
            };
            setElements(prev => [...prev, newElement]);
            setSelectedIds([newElement.id]);
        }
    };

    const handleConnectFlow = (sourceElement: CanvasElement) => {
        if (!sourceElement.content) return;

        const spacing = 120;
        const groupId = uuidv4();
        const connectorId = uuidv4();
        const generatorId = uuidv4();

        // Create image generator element
        const generatorElement: CanvasElement = {
            id: generatorId,
            type: 'image-generator',
            x: sourceElement.x + (sourceElement.width || 400) + spacing,
            y: sourceElement.y,
            width: sourceElement.width || 400,
            height: sourceElement.height || 400,
            referenceImageId: sourceElement.id,
            groupId: groupId,
            linkedElements: [sourceElement.id, connectorId],
        };

        // Create dashed connector line
        const connectorElement: CanvasElement = {
            id: connectorId,
            type: 'connector',
            x: 0,
            y: 0,
            connectorFrom: sourceElement.id,
            connectorTo: generatorId,
            connectorStyle: 'dashed',
            color: '#6B7280',
            strokeWidth: 2,
            groupId: groupId,
        };

        // Update source element with group info AND add new elements in one go
        setElements(prev => {
            const updatedPrev = prev.map(el => {
                if (el.id === sourceElement.id) {
                    return {
                        ...el,
                        groupId: groupId,
                        linkedElements: [connectorId, generatorId],
                    };
                }
                return el;
            });
            return [...updatedPrev, connectorElement, generatorElement];
        });

        setSelectedIds([generatorId]);
        setActiveTool('select');
    };

    const handleGenerateFromImage = (sourceImage: CanvasElement) => {
        // Use the same flow connection logic
        handleConnectFlow(sourceImage);
    };

    const handleGenerateImage = async (
        prompt: string,
        resolution: '1K' | '2K' | '4K',
        aspectRatio: '1:1' | '4:3' | '16:9',
        referenceImage?: string
    ) => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/social/canvas/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    resolution,
                    aspectRatio,
                    referenceImage,
                    mimeType: referenceImage ? 'image/jpeg' : undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Error de generación');
            }

            // Find the selected image-generator element
            const generatorElementId = selectedIds.find(id => elements.find(el => el.id === id)?.type === 'image-generator');

            if (data.imageData) {
                if (generatorElementId) {
                    // Replace the generator element with the generated image
                    setElements(prev => prev.map(el => {
                        if (el.id === generatorElementId) {
                            return {
                                ...el,
                                type: 'image',
                                content: data.imageData,
                            };
                        }
                        return el;
                    }));
                } else {
                    // Fallback: Add new image element
                    const newElement: CanvasElement = {
                        id: uuidv4(),
                        type: 'image',
                        x: 300 - pan.x,
                        y: 300 - pan.y,
                        width: 400,
                        height: 400,
                        content: data.imageData,
                    };
                    setElements(prev => [...prev, newElement]);
                    setSelectedIds([newElement.id]);
                }
            } else if (data.textResponse) {
                // Handle text response (Design Assistant)
                const newElement: CanvasElement = {
                    id: uuidv4(),
                    type: 'text',
                    x: 300 - pan.x,
                    y: 300 - pan.y,
                    content: data.textResponse,
                };
                setElements(prev => [...prev, newElement]);
                setSelectedIds([newElement.id]);
            }
        } catch (error) {
            console.error('Generation failed:', error);
            alert('Error de generación: ' + (error instanceof Error ? error.message : '未知错误'));
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAiChat = async (prompt: string): Promise<string> => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/social/canvas/generate-design', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Error de generación');
            }

            if (data.suggestion) {
                return data.suggestion;
            }

            return "未收到回复";
        } catch (error) {
            console.error('Chat generation failed:', error);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    };

    // 显示加载状态
    if (isLoading) {
        return (
            <div className="h-full w-full bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-300 font-medium">Cargando canvas...</p>
                    <p className="text-gray-500 text-sm mt-2">Obteniendo datos de la base...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gray-950 relative overflow-hidden">
            {/* Header */}
            <header className="absolute top-0 left-0 w-full h-14 flex items-center justify-between px-4 z-50 pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                    {onClose ? (
                        <button onClick={onClose} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors shadow-sm">
                            <ChevronLeft size={16} />
                            Volver al Hub
                        </button>
                    ) : (
                        <Link href="/dashboard/social-content" className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors shadow-sm">
                            <ChevronLeft size={16} />
                            Volver al Hub
                        </Link>
                    )}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-sm font-medium text-gray-200 bg-transparent border-none outline-none hover:bg-gray-900 focus:bg-gray-900 rounded px-2 py-1 transition-colors w-40"
                        placeholder="Untitled"
                        disabled={isLoading}
                    />
                    {/* Save Status Indicator */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        {saveStatus === 'saving' && (
                            <>
                                <Cloud size={14} className="animate-pulse" />
                                <span>Guardar中...</span>
                            </>
                        )}
                        {saveStatus === 'saved' && (
                            <>
                                <Cloud size={14} className="text-green-500" />
                                <span className="text-green-600">Guardado</span>
                            </>
                        )}
                        {saveStatus === 'offline' && (
                            <>
                                <CloudOff size={14} className="text-red-500" />
                                <span className="text-red-600">Desconectado</span>
                            </>
                        )}
                        {(!user && status !== 'loading') && (
                            <span className="text-amber-600 text-[10px] ml-2">Modo Local</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${showChat ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                    >
                        <Sparkles size={18} className="text-white" />
                    </button>
                </div>
            </header>

            {/* AI Designer Panel */}
            {showChat && (
                <div className="absolute right-4 top-20 bottom-4 w-[400px] z-40 animate-in slide-in-from-right-4 duration-300">
                    <AiDesignerPanel
                        onGenerate={handleAiChat}
                        isGenerating={isGenerating}
                        onClose={() => setShowChat(false)}
                        initialPrompt={initialPrompt}
                    />
                </div>
            )}

            {/* Main Editor Area */}
            <div className="absolute inset-0">
                <CanvasArea
                    scale={scale}
                    pan={pan}
                    onPanChange={setPan}
                    elements={elements}
                    selectedIds={selectedIds}
                    onSelect={setSelectedIds}
                    onElementChange={handleElementChange}
                    onDelete={handleDelete}
                    onAddElement={(element) => setElements(prev => [...prev, element])}
                    activeTool={activeTool}
                    onDragStart={() => setIsDraggingElement(true)}
                    onDragEnd={() => setIsDraggingElement(false)}
                    onGenerateFromImage={handleGenerateFromImage}
                    onConnectFlow={handleConnectFlow}
                />
                <FloatingToolbar
                    activeTool={activeTool}
                    onToolChange={setActiveTool}
                    onAddImage={handleAddImage}
                    onAddVideo={handleAddVideo}
                    onAddText={handleAddText}
                    onAddShape={handleAddShape}
                    onOpenImageGenerator={handleOpenImageGenerator}
                    onOpenVideoGenerator={handleOpenVideoGenerator}
                />

                {/* Image Generator Panel */}
                {selectedIds.length === 1 && !isDraggingElement && (() => {
                    const selectedEl = elements.find(el => el.id === selectedIds[0]);
                    if (selectedEl?.type === 'image-generator') {
                        // Calculate position
                        const left = (selectedEl.x * scale) + pan.x;
                        const top = ((selectedEl.y + (selectedEl.height || 400)) * scale) + pan.y + 20; // 20px margin

                        return (
                            <ImageGeneratorPanel
                                elementId={selectedIds[0]}
                                onGenerate={handleGenerateImage}
                                isGenerating={isGenerating}
                                canvasElements={elements}
                                style={{
                                    left: `${left}px`,
                                    top: `${top}px`,
                                }}
                            />
                        );
                    }
                    return null;
                })()}

                {/* Video Generator Panel */}
                {selectedIds.length === 1 && !isDraggingElement && (() => {
                    const selectedEl = elements.find(el => el.id === selectedIds[0]);
                    if (selectedEl?.type === 'video-generator') {
                        // Calculate position
                        const left = (selectedEl.x * scale) + pan.x;
                        const top = ((selectedEl.y + (selectedEl.height || 300)) * scale) + pan.y + 20; // 20px margin

                        return (
                            <VideoGeneratorPanel
                                elementId={selectedIds[0]}
                                onGenerate={handleGenerateVideo}
                                isGenerating={isGenerating}
                                canvasElements={elements}
                                style={{
                                    left: `${left}px`,
                                    top: `${top}px`,
                                }}
                            />
                        );
                    }
                    return null;
                })()}

                {/* Zoom Controls */}
                <div className="absolute bottom-4 left-4 flex items-center bg-gray-950 rounded-lg shadow-sm border border-gray-800 p-1 z-50">
                    <button onClick={handleZoomOut} className="p-1.5 hover:bg-gray-900 rounded text-gray-500">
                        <Minus size={16} />
                    </button>
                    <span className="px-2 text-xs font-medium text-gray-300 min-w-[3rem] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button onClick={handleZoomIn} className="p-1.5 hover:bg-gray-900 rounded text-gray-500">
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function LovartCanvas({ onClose }: { onClose?: () => void }) {
    return (
        <SessionProvider>
            <Suspense fallback={
                <div className="h-full w-full bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-300">Cargando canvas...</p>
                    </div>
                </div>
            }>
                <LovartCanvasContent onClose={onClose} />
            </Suspense>
        </SessionProvider>
    );
}
