'use client'

export const dynamic = 'force-dynamic'

export default function SocialContentPage() {
    return (
        <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden bg-[#020617]">
            <div className="flex justify-between items-center p-4 border-b border-white/5 bg-slate-900/40 shrink-0">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-300">Hub Integrado</span>
                </div>
                <div className="text-xs text-blue-400 font-mono tracking-widest uppercase">
                    Motor: Gemini 2.0 Flash
                </div>
            </div>
            <iframe
                src="/social-studio.html"
                className="w-full flex-1 border-none"
                title="Social Content Studio"
            />
        </div>
    )
}
