/**
 * MARIACHI PORTAL - Premium App
 * Awwwards-inspired Single Page Application
 */

class MariachiAppPremium {
    constructor() {
        this.currentSection = 'home';
        this.currentLang = 'es';
        this.user = null;
        
        this.init();
    }
    
    init() {
        // Initialize navigation
        this.setupNavigation();
        
        // Initialize auth
        this.setupAuth();
        
        // Initialize language
        this.setupLanguage();
        
        // Load initial section
        this.loadSection('home');
        
        // Setup scroll effects
        this.setupScrollEffects();
        
        console.log('✅ Mariachi Portal Premium initialized');
    }
    
    setupNavigation() {
        // Main navigation links
        document.querySelectorAll('.nav-link, .nav-dropdown-section a, a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const section = href.substring(1);
                    this.loadSection(section);
                    
                    // Update active state
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    if (link.classList.contains('nav-link')) {
                        link.classList.add('active');
                    }
                }
            });
        });
        
        // Mobile toggle
        const mobileToggle = document.querySelector('.nav-mobile-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.toggle('active');
            });
        }
    }
    
    setupAuth() {
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const modalClose = loginModal ? loginModal.querySelector('.modal-close') : null;
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const logoutBtn = document.getElementById('logoutBtn');
        
        // Open login modal
        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => {
                this.showAuthTab('login');
                loginModal.classList.add('active');
            });
        }
        
        // Close login modal
        if (modalClose && loginModal) {
            modalClose.addEventListener('click', () => {
                loginModal.classList.remove('active');
            });
        }
        
        // Close modal on outside click
        if (loginModal) {
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    loginModal.classList.remove('active');
                }
            });
        }
        
        // Handle login
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                this.login(email, password);
            });
        }
        
        // Handle register
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                this.register(name, email, password);
            });
        }
        
        // Handle logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
        
        // Tab switching
        document.querySelectorAll('.auth-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showAuthTab(btn.dataset.tab);
            });
        });
        
        // Register link in login form
        const registerLink = document.querySelector('a[href="#register"]');
        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAuthTab('register');
            });
        }
        
        // Restore existing session
        if (window.authClient && window.authClient.isAuthenticated()) {
            this.user = window.authClient.getUser();
            this.updateUserUI();
        }
    }
    
    showAuthTab(tab) {
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        
        document.querySelectorAll('.auth-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        if (loginTab) loginTab.style.display = tab === 'login' ? 'block' : 'none';
        if (registerTab) registerTab.style.display = tab === 'register' ? 'block' : 'none';
    }
    
    async login(email, password) {
        if (!window.authClient) {
            this.showNotification('Error de sistema', 'error');
            return;
        }
        
        const submitBtn = document.querySelector('#loginForm button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        
        const result = await window.authClient.login(email, password);
        
        if (submitBtn) submitBtn.disabled = false;
        
        if (result.error) {
            this.showNotification(result.error, 'error');
            return;
        }
        
        this.user = result.user;
        this.updateUserUI();
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('loginForm').reset();
        
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;
        this.showNotification(t('auth.welcome') + ' ' + result.user.name + '!', 'success');
    }
    
    async register(name, email, password) {
        if (!window.authClient) {
            this.showNotification('Error de sistema', 'error');
            return;
        }
        
        const submitBtn = document.querySelector('#registerForm button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        
        const result = await window.authClient.register(email, password, name);
        
        if (submitBtn) submitBtn.disabled = false;
        
        if (result.error) {
            this.showNotification(result.error, 'error');
            return;
        }
        
        this.user = result.user;
        this.updateUserUI();
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('registerForm').reset();
        
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;
        this.showNotification(t('auth.registered') + ' ' + result.user.name + '!', 'success');
    }
    
    async logout() {
        if (window.authClient) {
            await window.authClient.logout();
        }
        this.user = null;
        this.updateUserUI();
        this.showNotification('Sesión cerrada', 'info');
        this.loadSection('home');
    }
    
    updateUserUI() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');
        const userAvatar = document.querySelector('.nav-user-avatar');
        const adminLink = document.getElementById('adminLink');
        
        if (this.user) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'block';
            if (userName) userName.textContent = this.user.name;
            if (userAvatar && this.user.avatar) userAvatar.src = this.user.avatar;
            
            // Show admin link for super_admin
            if (adminLink) {
                adminLink.style.display = this.user.role === 'super_admin' ? 'flex' : 'none';
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
            if (adminLink) adminLink.style.display = 'none';
        }
    }
    
    setupLanguage() {
        const langSelector = document.getElementById('languageSelector');
        if (langSelector) {
            // Sync with I18n if it restored a saved language
            if (window.i18n && window.i18n.currentLang) {
                this.currentLang = window.i18n.currentLang;
                langSelector.value = this.currentLang;
            }
            
            langSelector.addEventListener('change', (e) => {
                this.currentLang = e.target.value;
                
                // Let I18n handle data-i18n attributes
                if (window.i18n) {
                    window.i18n.setLanguage(this.currentLang);
                }
                
                // Reload current section to update dynamic content
                this.loadSection(this.currentSection);
            });
        }
    }
    
    setupScrollEffects() {
        let lastScroll = 0;
        const nav = document.getElementById('mainNav');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    loadSection(sectionName) {
        this.currentSection = sectionName;
        const mainContent = document.getElementById('mainContent');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Load section content
        switch(sectionName) {
            case 'home':
                this.loadHomeSection();
                break;
            case 'awards':
            case 'nominees':
            case 'trending':
            case 'winners':
                this.loadAwardsSection(sectionName);
                break;
            case 'repertorio':
            case 'by-style':
            case 'by-composer':
            case 'by-year':
                this.loadRepertorioSection(sectionName);
                break;
            case 'audios':
                this.loadAudiosSection();
                break;
            case 'partituras':
                this.loadPartiturasSection();
                break;
            case 'estilos':
                this.loadEstilosSection();
                break;
            case 'wiki':
                this.loadWikiSection();
                break;
            case 'chatbot':
                this.loadChatbotSection();
                break;
            case 'academy':
                this.loadAcademySection();
                break;
            case 'collections':
                this.loadCollectionsSection();
                break;
            case 'directory':
                this.loadDirectorySection();
                break;
            case 'blog':
                this.loadBlogSection();
                break;
            case 'admin':
                this.loadAdminSection();
                break;
            case 'videos':
                this.loadVideosSection();
                break;
            case 'gallery':
                this.loadGallerySection();
                break;
            default:
                this.loadHomeSection();
        }
    }
    
    loadHomeSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <!-- Home content will be loaded by sections-premium.js -->
            <div id="homeContent"></div>
        `;
        
        // Call the section loader from sections-premium.js
        if (window.loadHomeContent) {
            window.loadHomeContent();
        }
    }
    
    loadAwardsSection(type) {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="awardsContent" data-type="${type}"></div>
        `;
        
        if (window.loadAwardsContent) {
            window.loadAwardsContent(type);
        }
    }
    
    loadRepertorioSection(filter) {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="repertorioContent" data-filter="${filter}"></div>
        `;
        
        if (window.loadRepertorioContent) {
            window.loadRepertorioContent(filter);
        }
    }
    
    loadAudiosSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="audiosContent"></div>
        `;
        
        if (window.loadAudiosContent) {
            window.loadAudiosContent();
        }
    }
    
    loadPartiturasSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="partiturasContent"></div>
        `;
        
        if (window.loadPartiturasContent) {
            window.loadPartiturasContent();
        }
    }
    
    loadEstilosSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="estilosContent"></div>
        `;
        
        if (window.loadEstilosContent) {
            window.loadEstilosContent();
        }
    }
    
    loadWikiSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="wikiContent"></div>
        `;
        
        if (window.loadWikiContent) {
            window.loadWikiContent();
        }
    }
    
    loadChatbotSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="chatbotContent"></div>
        `;
        
        if (window.loadChatbotContent) {
            window.loadChatbotContent();
        }
    }
    
    loadAcademySection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="academyContent"></div>
        `;
        
        if (window.loadAcademyContent) {
            window.loadAcademyContent();
        }
    }
    
    loadCollectionsSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="collectionsContent"></div>
        `;
        
        if (window.loadCollectionsContent) {
            window.loadCollectionsContent();
        }
    }
    
    loadDirectorySection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="directoryContent"></div>
        `;
        
        if (window.loadDirectoryContent) {
            window.loadDirectoryContent();
        }
    }
    
    loadBlogSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="blogContent"></div>
        `;
        
        if (window.loadBlogContent) {
            window.loadBlogContent();
        }
    }
    
    loadAdminSection() {
        if (!this.user || this.user.role !== 'super_admin') {
            this.showNotification('No tienes permiso para acceder al panel de administración', 'error');
            this.loadSection('home');
            return;
        }
        
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div id="adminContent"></div>
        `;
        
        if (window.loadAdminContent) {
            window.loadAdminContent();
        }
    }

    loadVideosSection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `<div id="videosContent"></div>`;
        if (window.loadVideosContent) window.loadVideosContent();
    }

    loadGallerySection() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `<div id="galleryContent"></div>`;
        if (window.loadGalleryContent) window.loadGalleryContent();
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: calc(var(--nav-height) + 1rem);
            right: 1rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--green-mariachi)' : type === 'error' ? 'var(--red-mariachi)' : 'var(--gray-700)'};
            color: var(--white);
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Add animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MariachiAppPremium();
});
