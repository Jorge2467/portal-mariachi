/**
 * LENIS SMOOTH SCROLL — Portal del Mariachi
 * Integración de Lenis v1.3.19 (darkroomengineering)
 * 
 * Este módulo inicializa Lenis y expone la instancia como window.lenis
 * para que app-premium.js y otros módulos puedan usarla.
 */

(function () {
    'use strict';

    // Esperar a que el DOM esté listo
    function initLenis() {
        // Verificar que la librería se cargó desde el CDN
        if (typeof Lenis === 'undefined') {
            console.warn('⚠️ Lenis no está disponible. Asegúrate de incluir el script CDN antes de este fichero.');
            return;
        }

        // ── Configuración de Lenis ───────────────────────────────────────────
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // ── RAF Loop manual (estable, no depende de GSAP) ─────────────────────
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // ── Exponer globalmente ───────────────────────────────────────────────
        window.lenis = lenis;

        // ── Sincronizar Lenis con ScrollTrigger de GSAP ───────────────────────
        // Se hace DESPUÉS de que lenis esté corriendo, de forma no bloqueante.
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
        }

        // ── Estado del nav basado en scroll de Lenis ──────────────────────────
        const nav = document.getElementById('mainNav');
        lenis.on('scroll', ({ scroll }) => {
            if (!nav) return;
            if (scroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // ── Pausar Lenis cuando un modal está activo ──────────────────────────
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            const modalObserver = new MutationObserver(() => {
                if (loginModal.classList.contains('active')) {
                    lenis.stop();
                } else {
                    lenis.start();
                }
            });
            modalObserver.observe(loginModal, { attributes: true, attributeFilter: ['class'] });
        }

        console.log('✅ Lenis smooth scroll inicializado (v1.3.19)');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLenis);
    } else {
        initLenis();
    }
})();
