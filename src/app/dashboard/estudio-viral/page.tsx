'use client'
import { useState } from 'react'
import LovartCanvas from './canvas'

export const dynamic = 'force-dynamic'

export default function SocialContentPage() {
    const [showCanvas, setShowCanvas] = useState(false)

    if (showCanvas) {
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
                <LovartCanvas onClose={() => setShowCanvas(false)} />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden bg-[#020617]">
            <div className="flex justify-between items-center p-4 border-b border-white/5 bg-slate-900/40 shrink-0">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-300">Hub Integrado</span>
                </div>
                <button 
                    onClick={() => setShowCanvas(true)}
                    className="bg-blue-600 text-white shadow-lg px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                    Abrir Lovart Canvas (Editor IA)
                </button>
            </div>
            <iframe
                src="/social-studio.html"
                className="w-full flex-1 border-none"
                title="Social Content Studio"
            />
        </div>
    )
}
