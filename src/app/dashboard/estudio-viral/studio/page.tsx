
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './studio.module.css'

// TYPES
type Platform = 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'facebook' | 'threads'
type Tone = 'profesional' | 'viral' | 'educativo' | 'humano' | 'audaz' | 'minimalista'

interface GeneratedPost {
    index: number
    hook: string
    body: string
    score: number
    chars: number
}

const PLATFORM_LABELS: Record<Platform, string> = {
    instagram: 'Instagram', linkedin: 'LinkedIn', twitter: 'Twitter/X',
    tiktok: 'TikTok', facebook: 'Facebook', threads: 'Threads',
}

const PLATFORM_LIMITS: Record<Platform, number> = {
    instagram: 2200, linkedin: 3000, twitter: 280,
    tiktok: 2200, facebook: 63206, threads: 500,
}

// LOADING STEPS
const LOADING_STEPS = [
    { title: 'ANALIZANDO', sub: 'brief y audiencia' },
    { title: 'CONSULTANDO', sub: 'OmniMind · patrones virales' },
    { title: 'GENERANDO', sub: 'hooks de alto impacto' },
    { title: 'OPTIMIZANDO', sub: 'para la plataforma' },
    { title: 'CALCULANDO', sub: 'engagement score' },
]

export default function SocialStudio() {
    // STATE
    const [platform, setPlatform] = useState<Platform>('instagram')
    const [tone, setTone] = useState<Tone>('profesional')
    const [count, setCount] = useState(3)
    const [brand, setBrand] = useState('')
    const [topic, setTopic] = useState('')
    const [audience, setAudience] = useState('')

    // UI STATE
    const [viewState, setViewState] = useState<'empty' | 'loading' | 'results'>('empty')
    const [loadingStep, setLoadingStep] = useState(0)
    const [posts, setPosts] = useState<GeneratedPost[]>([])
    const [genTime, setGenTime] = useState(0)

    // CHAR COUNT
    const charCount = topic.length

    // ACTIONS
    async function handleGenerate() {
        setViewState('loading')
        setLoadingStep(0)
        const startTime = Date.now()

        // Animate Loader Steps
        const interval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev < LOADING_STEPS.length - 1) return prev + 1
                return prev
            })
        }, 800)

        try {
            // CALL API
            // Using a relative URL
            const res = await fetch('/api/agent/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    skill: 'social-content',
                    prompt: topic,
                    userId: 'user-demo',
                    options: { brand, platform, tone, count, audience }
                })
            })

            const data = await res.json()

            clearInterval(interval)

            if (data.success) {
                setPosts(data.data)
                setGenTime((Date.now() - startTime) / 1000)
                setViewState('results')
            } else {
                throw new Error(data.error || 'Unknown error')
            }

        } catch (e) {
            console.error(e)
            alert('Error generando contenido')
            setViewState('empty')
            clearInterval(interval)
        }
    }

    // UTILS
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        alert('Copiado al portapapeles')
    }

    // JSX
    return (
        <div className={styles.studioWrapper}>
            {/* INJECT FONTS */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');
            `}</style>

            {/* HEADER */}
            <header className={styles.header}>
                <div className={styles.headerBrand}>
                    <div className={styles.brandName}>⚡ OMNIAGENT</div>
                    <div className={styles.breadcrumb}>
                        <Link href="/dashboard">Dashboard</Link> <span>/</span> <Link href="/dashboard/social-content">Social</Link> <span>/</span> <span>Studio</span>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button className={`${styles.btnSm} ${styles.btnGhost}`}>📁 Mis drafts</button>
                    <button className={`${styles.btnSm} ${styles.btnGhost}`}>📊 Analytics</button>
                    <button className={`${styles.btnSm} ${styles.btnAccent}`}>✦ OmniMind</button>
                </div>
            </header>

            <div className={styles.layout}>
                {/* LEFT PANEL */}
                <div className={styles.leftPanel}>
                    <div className={styles.sectionTitle}>CONTENT<br />STUDIO</div>
                    <div className={styles.sectionSub}>// genera · itera · publica</div>

                    {/* Platform */}
                    <label className={styles.label}>Plataforma</label>
                    <div className={styles.platformGrid}>
                        {(['instagram', 'linkedin', 'twitter', 'tiktok', 'facebook', 'threads'] as Platform[]).map(p => (
                            <button
                                key={p}
                                className={`${styles.platformBtn} ${platform === p ? styles.platformBtnActive : ''}`}
                                onClick={() => setPlatform(p)}
                            >
                                <div className={styles.platformIcon}>
                                    {p === 'instagram' && '📸'}
                                    {p === 'linkedin' && '💼'}
                                    {p === 'twitter' && '𝕏'}
                                    {p === 'tiktok' && '🎵'}
                                    {p === 'facebook' && '👥'}
                                    {p === 'threads' && '🧵'}
                                </div>
                                <div className={styles.platformName}>{p}</div>
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Marca / Empresa</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="ej: OmniAgentSys"
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tema del contenido</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="ej: Lanzamos nuestra nueva integración de WhatsApp..."
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />
                        <div className={styles.fieldFooter}>
                            <div></div>
                            <div className={styles.charCount}>{charCount} / 500</div>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Audiencia objetivo</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="ej: Emprendedores B2B..."
                            value={audience}
                            onChange={e => setAudience(e.target.value)}
                        />
                    </div>

                    {/* Tone */}
                    <label className={styles.label}>Tono</label>
                    <div className={styles.toneGrid}>
                        {(['profesional', 'viral', 'educativo', 'humano', 'audaz', 'minimalista'] as Tone[]).map(t => (
                            <button
                                key={t}
                                className={`${styles.tonePill} ${tone === t ? styles.tonePillActive : ''}`}
                                data-tone={t}
                                onClick={() => setTone(t)}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className={styles.divider}></div>

                    {/* Count */}
                    <label className={styles.label}>Variaciones a generar</label>
                    <div className={styles.countRow}>
                        <button className={styles.countBtn} onClick={() => setCount(Math.max(1, count - 1))}>−</button>
                        <div className={styles.countDisplay}>{count}</div>
                        <button className={styles.countBtn} onClick={() => setCount(Math.min(6, count + 1))}>+</button>
                        <div className={styles.countLabel}>posts<br />distintos</div>
                    </div>

                    {/* CTA */}
                    <button
                        className={styles.btnGenerate}
                        onClick={handleGenerate}
                        disabled={viewState === 'loading' || !topic}
                    >
                        {viewState === 'loading' ? 'CREANDO...' : '⚡ GENERAR CONTENIDO'}
                    </button>
                </div>

                {/* RIGHT PANEL */}
                <div className={styles.rightPanel}>
                    {/* EMPTY */}
                    {viewState === 'empty' && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>✦</div>
                            <div className={styles.emptyTitle}>TU CONTENIDO<br />APARECE AQUÍ</div>
                            <div className={styles.emptySub}>// configura y presiona generar</div>
                        </div>
                    )}

                    {/* LOADING */}
                    {viewState === 'loading' && (
                        <div className={styles.loadingState}>
                            <div className={styles.loaderRing}></div>
                            <div className={styles.loaderTitle}>{LOADING_STEPS[loadingStep]?.title}</div>
                            <div className={styles.loaderSub}>// {LOADING_STEPS[loadingStep]?.sub}</div>

                            <div className={styles.loaderSteps}>
                                {LOADING_STEPS.map((step, idx) => (
                                    <div
                                        key={idx}
                                        className={`${styles.loaderStep} ${idx === loadingStep ? styles.loaderStepActive : ''} ${idx < loadingStep ? styles.loaderStepDone : ''}`}
                                    >
                                        <div className={styles.stepDot}></div>
                                        {step.sub}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RESULTS */}
                    {viewState === 'results' && (
                        <div className={styles.resultsState}>
                            <div className={styles.resultsHeader}>
                                <div className={styles.resultsTitle}>{posts.length} POSTS<br />GENERADOS</div>
                                <div className={styles.resultsMeta}>
                                    <span>⏱ generado en {genTime.toFixed(1)}s</span><br />
                                    <span>OmniMind: <span>activo</span></span>
                                </div>
                            </div>

                            <div className={styles.summaryBar}>
                                <div className={styles.summaryChip}><b>{PLATFORM_LABELS[platform]}</b></div>
                                <div className={styles.summaryChip}>Tono: <b>{tone}</b></div>
                                <div className={styles.summaryChip}>Marca: <b>{brand || 'N/A'}</b></div>
                                <div className={styles.summaryChip}>Límite: <b>{PLATFORM_LIMITS[platform]} chars</b></div>
                            </div>

                            <div className={styles.postsGrid}>
                                {posts.map((post, idx) => (
                                    <div key={idx} className={styles.postCard} style={{ animationDelay: `${idx * 100}ms` }}>
                                        <div className={styles.postHeader}>
                                            <div className={styles.postNumber}>POST 0{idx + 1}</div>
                                            <div className={styles.postBadges}>
                                                <span className={`${styles.badge} ${styles.badgePlatform}`}>{PLATFORM_LABELS[platform]}</span>
                                                <span className={`${styles.badge} ${styles.badgeTone}`}>{tone}</span>
                                                <span className={`${styles.badge} ${styles.badgeHook}`}>HOOK ★</span>
                                            </div>
                                        </div>

                                        <div className={styles.scoreBarWrap}>
                                            <div className={styles.scoreLabel}>Engagement Score</div>
                                            <div className={styles.scoreTrack}>
                                                <div
                                                    className={styles.scoreFill}
                                                    style={{ width: `${post.score}%` }}
                                                />
                                            </div>
                                            <div className={styles.scoreValue} style={{ color: post.score > 85 ? 'var(--green)' : 'var(--accent)' }}>
                                                {post.score}
                                            </div>
                                        </div>

                                        <div className={styles.postBody}>
                                            <div className={styles.postHook}>{post.hook}</div>
                                            <div className={styles.postContent}>
                                                {/* Simple split for hashtags highlight */}
                                                {post.body.split(/(\s+)/).map((part, wIdx) =>
                                                    (part.startsWith('#') || part.startsWith('\n#'))
                                                        ? <span key={wIdx} style={{ color: 'var(--accent)' }}>{part}</span>
                                                        : part
                                                )}
                                            </div>
                                        </div>

                                        <div className={styles.postFooter}>
                                            <div className={styles.postStats}>
                                                <div className={styles.statItem}>
                                                    <span>CHARS</span>
                                                    <span className={styles.statValue}>{post.chars}</span>
                                                </div>
                                                <div className={styles.statItem}>
                                                    <span>LÍMITE</span>
                                                    <span
                                                        className={styles.statValue}
                                                        style={{ color: post.chars > PLATFORM_LIMITS[platform] ? 'var(--rose)' : 'var(--green)' }}
                                                    >
                                                        {PLATFORM_LIMITS[platform]}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.postActions}>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={() => copyToClipboard(post.hook + '\n\n' + post.body)}
                                                >
                                                    ⎘ Copiar
                                                </button>
                                                <button className={styles.actionBtn}>★ Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
