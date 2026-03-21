'use client';

import FadeIn from '@/components/ui/FadeIn';
import { Upload, Music, FileText, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function ExploradorArchivos() {
  const [activeTab, setActiveTab] = useState<'audio' | 'scores' | 'gallery'>('audio');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    setMessage('Subiendo archivo al servidor...');

    const formData = new FormData();
    
    // Si es audio va como 'file', si es scores o gallery puede ir como 'files' en array
    if (activeTab === 'audio') {
      formData.append('file', file);
    } else {
      formData.append('files', file);
    }

    try {
      const endpoint = `/api/uploads/${activeTab}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'El archivo ha sido indexado correctamente en la Base de Datos.');
        setFile(null); // Clear after upload
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al procesar el archivo.');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage('Fallo de red al comunicarse con el motor de archivos.');
    }
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Explorador Multimedia</h1>
          <p className="body-text">Carga audios, partituras y recursos visuales al Servidor Central. Todo el contenido será sincronizado automáticamente con la Base de Datos Drizzle.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="glass-card p-6 border-t-4 border-t-gold-primary">
          {/* Navegación por Pestañas */}
          <div className="flex gap-4 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'audio' ? 'bg-gold-primary text-black' : 'text-text-light hover:text-white hover:bg-white/5'
              }`}
            >
              <Music size={18} /> Audios (MP3/WAV)
            </button>
            <button
              onClick={() => setActiveTab('scores')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'scores' ? 'bg-gold-primary text-black' : 'text-text-light hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={18} /> Partituras (PDF/Sib)
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'gallery' ? 'bg-gold-primary text-black' : 'text-text-light hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon size={18} /> Galería de Eventos
            </button>
          </div>

          {/* Área de Carga */}
          <div className="max-w-2xl">
            <h3 className="text-xl font-syne font-bold mb-4 text-white">
              Sube tus {activeTab === 'audio' ? 'Canciones' : activeTab === 'scores' ? 'Partituras' : 'Imágenes'}
            </h3>
            
            <div className="border-2 border-dashed border-white/10 rounded-xl p-10 flex flex-col items-center justify-center bg-black/50 hover:bg-white/5 hover:border-gold-primary/30 transition-all group relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept={
                  activeTab === 'audio' ? 'audio/*' : 
                  activeTab === 'scores' ? '.pdf,.png,.jpg,.jpeg,.sib,.mus' : 
                  'image/*'
                }
              />
              
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={28} className="text-gold-primary" />
              </div>
              <p className="text-lg font-medium text-white mb-1">Arrastra tu archivo aquí</p>
              <p className="text-sm text-text-light mb-4">o haz clic para explorar en el disco local</p>
              
              {/* Constraint Hint */}
              <span className="text-xs font-mono text-gold-light/60 bg-gold-primary/10 px-3 py-1 rounded-full">
                {activeTab === 'audio' && 'Formatos válidos: MP3, WAV, AAC (Max 50MB)'}
                {activeTab === 'scores' && 'Formatos válidos: PDF, SIB, IMAGEN (Max 20MB)'}
                {activeTab === 'gallery' && 'Formatos válidos: JPG, PNG, WEBP (Max 10MB)'}
              </span>
            </div>

            {/* Fila del Archivo Seleccionado */}
            {file && (
              <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-black rounded-lg shrink-0">
                    {activeTab === 'audio' ? <Music size={20} className="text-blue-400" /> : 
                     activeTab === 'scores' ? <FileText size={20} className="text-green-400" /> : 
                     <ImageIcon size={20} className="text-purple-400" />}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <p className="text-xs text-text-light">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>

                <button 
                  onClick={handleUpload}
                  disabled={status === 'uploading'}
                  className="btn-primary py-2 px-6 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === 'uploading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Procesando...</>
                  ) : (
                    'Subir Archivo'
                  )}
                </button>
              </div>
            )}

            {/* Mensaje de Estado */}
            {status !== 'idle' && (
              <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                status === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {status === 'success' ? <CheckCircle2 size={18} /> : 
                 status === 'uploading' ? <Loader2 size={18} className="animate-spin" /> : 
                 null}
                {message}
              </div>
            )}
            
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
