/**
 * GSAP ANIMATIONS — Portal del Mariachi
 * v2.0 — Safe: nunca modifica opacity/transform de elementos en reposo.
 * Solo usa ScrollTrigger (que anima cuando el elemento ENTRA al viewport)
 * y el evento mariachi:sectionReady para re-inicializar los triggers.
 *
 * REGLA CRÍTICA: No usar gsap.set() ni gsap.from() sin ScrollTrigger.
 * Los elementos deben ser SIEMPRE visibles en su estado por defecto.
 */

(function () {
    'use strict';

    function initGSAP() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP o ScrollTrigger no disponibles');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // ── Helper: animar grupo de elementos con ScrollTrigger ────────────────
        function animateGroup(selector, props, triggerEl) {
            const els = document.querySelectorAll(selector);
            if (!els.length) return;
            const trigger = triggerEl || els[0];
            gsap.from(els, {
                ...props,
                scrollTrigger: {
                    trigger,
                    start: 'top 90%',    // Se dispara cuando el elemento está al 90% del viewport
                    once: true,          // Solo una vez, luego se destruye el trigger
                },
            });
        }

        // ── Animaciones registradas en cada carga de sección ─────────────────
        function setupAnimations() {
            // Matar triggers previos para no acumularlos en la SPA
            ScrollTrigger.getAll().forEach(st => st.kill());

            // Stat cards — stagger zoom desde abajo
            animateGroup('.stat-card', {
                opacity: 0, y: 40, scale: 0.9,
                duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
            });

            // Headers de sección
            animateGroup('.section-header', {
                opacity: 0, y: 25, duration: 0.8, ease: 'power3.out',
            });

            // Cards de awards / repertorio con MO para esperar fetch
            const grids = document.querySelectorAll('#awardsGrid, #repertorioGrid, .cards-grid');
            grids.forEach(grid => {
                const mo = new MutationObserver(() => {
                    const cards = grid.querySelectorAll('[class*=card]');
                    if (!cards.length) return;
                    mo.disconnect();
                    gsap.from(cards, {
                        opacity: 0, y: 40, duration: 0.5,
                        stagger: { amount: 0.5 }, ease: 'power3.out',
                        scrollTrigger: { trigger: grid, start: 'top 90%', once: true },
                    });
                });
                mo.observe(grid, { childList: true });
            });

            // Audio tracks
            animateGroup('.audio-track', {
                opacity: 0, x: -20, duration: 0.45,
                stagger: { amount: 0.4 }, ease: 'power2.out',
            });

            // Destacados cards
            const destGrid = document.querySelector('#destCardsGrid');
            if (destGrid) {
                const mo = new MutationObserver(() => {
                    const cards = destGrid.querySelectorAll('.dest-card');
                    if (!cards.length) return;
                    mo.disconnect();
                    gsap.from(cards, {
                        opacity: 0, y: 30, scale: 0.95,
                        duration: 0.5, stagger: { amount: 0.4 }, ease: 'back.out(1.3)',
                        scrollTrigger: { trigger: destGrid, start: 'top 90%', once: true },
                    });
                });
                mo.observe(destGrid, { childList: true });
            }

            ScrollTrigger.refresh();
        }

        // ── Nav hide/show por velocidad de Lenis ──────────────────────────────
        function setupNavBehavior() {
            const nav = document.getElementById('mainNav');
            if (!nav || !window.lenis) return;
            let hideTimeout;
            window.lenis.on('scroll', ({ scroll, velocity }) => {
                if (scroll < 80) {
                    gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
                    return;
                }
                if (velocity > 0.5) {
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(() => {
                        gsap.to(nav, { y: '-110%', duration: 0.45, ease: 'power3.in', overwrite: true });
                    }, 100);
                } else if (velocity < -0.5) {
                    clearTimeout(hideTimeout);
                    gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: true });
                }
            });
        }

        // ── Escuchar el evento de la SPA ──────────────────────────────────────
        window.addEventListener('mariachi:sectionReady', () => {
            // Esperar un frame más para que el DOM esté completamente estable
            requestAnimationFrame(() => {
                setTimeout(setupAnimations, 200);
            });
        });

        // Nav behavior solo se configura una vez (no depende del contenido)
        // Esperar a que lenis esté disponible
        if (window.lenis) {
            setupNavBehavior();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(setupNavBehavior, 500);
            });
        }

        console.log('✅ GSAP animations ready (v3.14 + ScrollTrigger)');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGSAP);
    } else {
        initGSAP();
    }
})();
