/**
 * MARIACHI PORTAL - Auth Client
 * Communicates with /api/auth/* endpoints
 * Falls back to demo mode if DB not available
 */

class AuthClient {
    constructor() {
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.refreshTimer = null;
        this.isDemo = false;

        this.restoreSession();
    }

    // ---- API calls ----

    async register(email, password, name) {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const data = await res.json();

            if (res.status === 503) {
                return this.demoLogin(email, password, name);
            }

            if (!res.ok) {
                return { error: data.error || 'Registration failed' };
            }

            this.setSession(data);
            return { user: data.user };
        } catch (err) {
            // Fallback to demo
            return this.demoLogin(email, password, name);
        }
    }

    async login(email, password) {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.status === 503) {
                // DB not available — fall back to demo
                return this.demoLogin(email, password);
            }

            if (!res.ok) {
                return { error: data.error || 'Login failed' };
            }

            this.setSession(data);
            return { user: data.user };
        } catch (err) {
            // Fallback to demo
            return this.demoLogin(email, password);
        }
    }

    async refreshAccessToken() {
        if (!this.refreshToken) return false;

        try {
            const res = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: this.refreshToken })
            });

            if (!res.ok) {
                this.clearSession();
                return false;
            }

            const data = await res.json();
            this.setSession(data);
            return true;
        } catch {
            return false;
        }
    }

    async logout() {
        try {
            if (this.accessToken) {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.accessToken}`
                    },
                    body: JSON.stringify({ refreshToken: this.refreshToken })
                });
            }
        } catch { /* ignore */ }

        this.clearSession();
    }

    async getMe() {
        if (!this.accessToken) return null;

        try {
            const res = await fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${this.accessToken}` }
            });

            if (res.status === 401) {
                const refreshed = await this.refreshAccessToken();
                if (!refreshed) return null;
                return this.getMe();
            }

            if (!res.ok) return null;

            const data = await res.json();
            this.user = data.user;
            return data.user;
        } catch {
            return this.user;
        }
    }

    // ---- Session management ----

    setSession(data) {
        this.user = data.user;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.isDemo = !data.accessToken;

        // Persist to localStorage
        localStorage.setItem('mariachi_session', JSON.stringify({
            user: this.user,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            isDemo: this.isDemo
        }));

        // Auto-refresh token 1 min before expiry (14 min)
        if (this.refreshTimer) clearInterval(this.refreshTimer);
        if (this.accessToken && !this.isDemo) {
            this.refreshTimer = setInterval(() => this.refreshAccessToken(), 14 * 60 * 1000);
        }
    }

    clearSession() {
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.isDemo = false;
        if (this.refreshTimer) clearInterval(this.refreshTimer);
        localStorage.removeItem('mariachi_session');
    }

    restoreSession() {
        try {
            const saved = localStorage.getItem('mariachi_session');
            if (!saved) return;

            const session = JSON.parse(saved);
            this.user = session.user;
            this.accessToken = session.accessToken;
            this.refreshToken = session.refreshToken;
            this.isDemo = session.isDemo || false;

            // Try to refresh token on restore
            if (this.refreshToken && !this.isDemo) {
                this.refreshAccessToken();
            }
        } catch {
            localStorage.removeItem('mariachi_session');
        }
    }

    // ---- Getters ----

    getUser() { return this.user; }
    isAuthenticated() { return this.user !== null; }
    isSuperAdmin() { return this.user && this.user.role === 'super_admin'; }
    isEditor() { return this.user && (this.user.role === 'editor' || this.isSuperAdmin()); }
    getToken() { return this.accessToken; }

    // ---- Demo fallback (when DB not available) ----

    demoLogin(email, password, name) {
        const demoUsers = [
            { email: 'admin@portalmariachi.com', password: 'admin2026!', name: 'Administrador', role: 'super_admin',
              avatar_url: 'https://ui-avatars.com/api/?name=Admin&background=FFB800&color=0F0F0F' },
            { email: 'musico@mariachi.com', password: 'demo123', name: 'Juan Músico', role: 'musician',
              avatar_url: 'https://ui-avatars.com/api/?name=Juan+Musico&background=DC2626&color=FFFFFF' },
            { email: 'editor@mariachi.com', password: 'demo123', name: 'María Editora', role: 'editor',
              avatar_url: 'https://ui-avatars.com/api/?name=Maria+Editora&background=059669&color=FFFFFF' }
        ];

        const user = demoUsers.find(u => u.email === email && u.password === password);

        if (user) {
            const userData = { id: 'demo', email: user.email, name: user.name, role: user.role, avatar_url: user.avatar_url };
            this.setSession({ user: userData });
            this.isDemo = true;
            return { user: userData };
        }

        // Demo register
        if (name && email && password) {
            const userData = {
                id: 'demo-' + Date.now(),
                email, name, role: 'user',
                avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FFB800&color=0F0F0F`
            };
            this.setSession({ user: userData });
            this.isDemo = true;
            return { user: userData };
        }

        return { error: 'Invalid credentials' };
    }
}

// Global instance
window.authClient = new AuthClient();
