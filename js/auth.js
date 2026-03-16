/**
 * MARIACHI PORTAL - Auth Utility Module
 * Session management + role checking only.
 * DOM interaction is handled by app-premium.js
 */

class AuthUtil {
    constructor() {
        this.currentUser = null;
        this.users = [
            {
                email: 'admin@portalmariachi.com',
                password: 'admin2026!',
                name: 'Administrador',
                role: 'super_admin',
                avatar: 'https://ui-avatars.com/api/?name=Admin&background=FFB800&color=0F0F0F'
            },
            {
                email: 'musico@mariachi.com',
                password: 'demo123',
                name: 'Juan Músico',
                role: 'musician',
                avatar: 'https://ui-avatars.com/api/?name=Juan+Musico&background=DC2626&color=FFFFFF'
            },
            {
                email: 'editor@mariachi.com',
                password: 'demo123',
                name: 'María Editora',
                role: 'editor',
                avatar: 'https://ui-avatars.com/api/?name=Maria+Editora&background=059669&color=FFFFFF'
            },
            {
                email: 'user@mariachi.com',
                password: 'demo123',
                name: 'Usuario Demo',
                role: 'user',
                avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=525252&color=FFFFFF'
            }
        ];

        // Restore session on load
        this.restoreSession();
    }

    /**
     * Attempt login with email/password
     * @returns {object|null} user object or null if invalid
     */
    authenticate(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = {
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar,
                loginTime: new Date().toISOString()
            };
            this.saveSession();
            return this.currentUser;
        }
        return null;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('mariachi_user');
    }

    saveSession() {
        localStorage.setItem('mariachi_user', JSON.stringify(this.currentUser));
    }

    restoreSession() {
        try {
            const saved = localStorage.getItem('mariachi_user');
            if (saved) {
                this.currentUser = JSON.parse(saved);
            }
        } catch (e) {
            localStorage.removeItem('mariachi_user');
        }
    }

    getUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isSuperAdmin() {
        return this.currentUser && this.currentUser.role === 'super_admin';
    }

    isEditor() {
        return this.currentUser && (this.currentUser.role === 'editor' || this.isSuperAdmin());
    }

    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }
}

// Single global instance
window.authUtil = new AuthUtil();
