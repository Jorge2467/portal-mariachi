/**
 * MARIACHI PORTAL - API Data Loader
 * Fetches real data from backend APIs
 * Falls back gracefully if API unavailable
 */

const API = {
    async get(endpoint) {
        try {
            const res = await fetch('/api/content' + endpoint);
            if (!res.ok) return null;
            return await res.json();
        } catch { return null; }
    },

    async stats() {
        return await this.get('/stats');
    },

    async songs(params = {}) {
        const q = new URLSearchParams(params).toString();
        return await this.get('/songs' + (q ? '?' + q : ''));
    },

    async featuredSong() {
        const data = await this.get('/songs?featured=true&limit=1');
        if (data && data.songs && data.songs.length > 0) return data.songs[0];
        const fallback = await this.get('/songs?sort=score_rating&limit=1');
        return fallback && fallback.songs ? fallback.songs[0] : null;
    },

    async collections() {
        return await this.get('/collections');
    },

    async mariachis(params = {}) {
        const q = new URLSearchParams(params).toString();
        return await this.get('/mariachis' + (q ? '?' + q : ''));
    },

    async courses() {
        return await this.get('/courses');
    },

    async blog(params = {}) {
        const q = new URLSearchParams(params).toString();
        return await this.get('/blog' + (q ? '?' + q : ''));
    }
};

window.API = API;
