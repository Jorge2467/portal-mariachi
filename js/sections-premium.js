/**
 * MARIACHI PORTAL - Premium Sections
 * All section content loaders with Awwwards-inspired design
 */

// Translation helper
const t = (key) => window.i18n ? window.i18n.t(key) : key;

// ===================================
// HOME SECTION
// ===================================
window.loadHomeContent = function() {
    const container = document.getElementById('homeContent');
    container.innerHTML = `
        <style>
            .hero-premium {
                min-height: calc(100vh - var(--nav-height));
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 4rem 2rem;
                background: linear-gradient(180deg, var(--black) 0%, var(--gray-900) 100%);
                position: relative;
                overflow: hidden;
            }
            
            .hero-premium::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 50% 50%, rgba(255,184,0,0.1) 0%, transparent 70%);
                pointer-events: none;
            }
            
            .hero-container {
                max-width: var(--container-max);
                width: 100%;
                position: relative;
                z-index: 1;
            }
            
            .hero-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255,184,0,0.1);
                border: 1px solid rgba(255,184,0,0.3);
                padding: 0.5rem 1.5rem;
                border-radius: 50px;
                color: var(--gold-primary);
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 2rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            
            .hero-title {
                font-family: var(--font-display);
                font-size: clamp(3rem, 8vw, 6rem);
                font-weight: 900;
                line-height: 1.1;
                margin-bottom: 1.5rem;
                background: linear-gradient(135deg, var(--gold-primary), var(--gold-light), var(--white));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .hero-subtitle {
                font-size: clamp(1.5rem, 3vw, 2rem);
                color: var(--gray-300);
                margin-bottom: 2rem;
                font-weight: 300;
            }
            
            .hero-description {
                font-size: 1.1rem;
                color: var(--gray-400);
                max-width: 700px;
                margin-bottom: 3rem;
                line-height: 1.8;
            }
            
            .hero-actions {
                display: flex;
                gap: 1.5rem;
                flex-wrap: wrap;
            }
            
            .hero-card {
                background: rgba(31,31,31,0.8);
                backdrop-filter: blur(20px);
                border: 2px solid rgba(255,184,0,0.2);
                border-radius: 16px;
                padding: 2.5rem;
                margin-top: 4rem;
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 3rem;
                align-items: center;
                transition: all 0.3s ease;
            }
            
            .hero-card:hover {
                border-color: var(--gold-primary);
                box-shadow: 0 20px 60px rgba(255,184,0,0.2);
                transform: translateY(-5px);
            }
            
            .hero-card-info h3 {
                font-family: var(--font-display);
                font-size: 2rem;
                color: var(--gold-primary);
                margin-bottom: 0.5rem;
            }
            
            .hero-card-meta {
                display: flex;
                gap: 2rem;
                margin-top: 1.5rem;
                flex-wrap: wrap;
            }
            
            .meta-item {
                display: flex;
                flex-direction: column;
            }
            
            .meta-label {
                font-size: 0.8rem;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            
            .meta-value {
                font-size: 1.1rem;
                color: var(--white);
                font-weight: 600;
                margin-top: 0.25rem;
            }
            
            .hero-card-score {
                text-align: center;
            }
            
            .score-circle {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 8px solid var(--gold-primary);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                position: relative;
                background: linear-gradient(135deg, rgba(255,184,0,0.1), rgba(255,184,0,0.05));
            }
            
            .score-number {
                font-size: 3rem;
                font-weight: 900;
                color: var(--gold-primary);
                line-height: 1;
            }
            
            .score-max {
                font-size: 1rem;
                color: var(--gray-400);
            }
            
            .vote-btn {
                padding: 0.75rem 2rem;
                background: linear-gradient(135deg, var(--red-mariachi), var(--red-dark));
                color: var(--white);
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .vote-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(220,38,38,0.4);
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin-top: 4rem;
                padding: 4rem 2rem;
                background: var(--gray-900);
            }
            
            .stat-card {
                text-align: center;
                padding: 2rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.05);
                border-radius: 12px;
                transition: all 0.3s ease;
            }
            
            .stat-card:hover {
                background: rgba(255,184,0,0.05);
                border-color: rgba(255,184,0,0.2);
                transform: translateY(-5px);
            }
            
            .stat-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .stat-number {
                font-size: 2.5rem;
                font-weight: 900;
                color: var(--gold-primary);
                margin-bottom: 0.5rem;
            }
            
            .stat-label {
                font-size: 1rem;
                color: var(--gray-400);
            }
            
            @media (max-width: 768px) {
                .hero-card {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
                
                .hero-actions {
                    justify-content: center;
                }
                
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        </style>
        
        <div class="hero-premium">
            <div class="hero-container">
                <div class="hero-badge">
                    <i class="fas fa-trophy"></i> ${t('home.badge')} - ${new Date().toLocaleDateString(t === undefined ? 'es-MX' : (window.i18n && window.i18n.currentLang === 'en' ? 'en-US' : window.i18n && window.i18n.currentLang === 'pt' ? 'pt-PT' : 'es-MX'), { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                
                <h1 class="hero-title">${t('home.title')}</h1>
                <h2 class="hero-subtitle">${t('home.subtitle')}</h2>
                <p class="hero-description">
                    ${t('home.description')}
                </p>
                
                <div class="hero-actions">
                    <button class="btn-primary" onclick="app.loadSection('repertorio')">
                        <i class="fas fa-music"></i> ${t('home.btn_repertorio')}
                    </button>
                    <button class="btn-secondary" onclick="app.loadSection('audios')">
                        <i class="fas fa-play-circle"></i> ${t('home.btn_audios')}
                    </button>
                </div>
                
                <div class="hero-card">
                    <div class="hero-card-info">
                        <h3>🎵 ${t('home.featured_title')}</h3>
                        <p style="color: var(--gray-400); margin-top: 0.5rem;">
                            ${t('home.featured_desc')}
                        </p>
                        <div class="hero-card-meta">
                            <div class="meta-item">
                                <span class="meta-label">${t('home.composer')}</span>
                                <span class="meta-value">${t('home.traditional')}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">${t('home.style')}</span>
                                <span class="meta-value">${t('home.son_jalisciense')}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">${t('home.year')}</span>
                                <span class="meta-value">${t('home.traditional')}</span>
                            </div>
                        </div>
                        <button class="btn-primary" style="margin-top: 1.5rem;" onclick="app.loadSection('repertorio')">
                            <i class="fas fa-headphones"></i> ${t('home.listen_now')}
                        </button>
                    </div>
                    
                    <div class="hero-card-score">
                        <div class="score-circle">
                            <span class="score-number" id="featuredScore">9.2</span>
                            <span class="score-max">/10</span>
                        </div>
                        <button class="vote-btn" id="featuredVoteBtn" onclick="openVoteModal(window._featuredSongId, window._featuredSongTitle)">
                            <i class="fas fa-star"></i> ${t('home.vote_now')}
                        </button>
                        <button class="fav-btn-hero" onclick="toggleFavorite(window._featuredSongId)">
                            <i class="far fa-heart" id="featuredFavIcon"></i> ${t('vote.favorite')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="stats-grid" id="homeStats">
            <div class="stat-card">
                <div class="stat-icon">🎵</div>
                <div class="stat-number" id="statSongs">...</div>
                <div class="stat-label">${t('stats.songs')}</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🎧</div>
                <div class="stat-number" id="statCollections">...</div>
                <div class="stat-label">${t('stats.audios')}</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📄</div>
                <div class="stat-number" id="statMariachis">...</div>
                <div class="stat-label">${t('stats.scores')}</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-number" id="statCourses">...</div>
                <div class="stat-label">${t('stats.styles')}</div>
            </div>
        </div>
    `;
    // Load real stats from API
    if (window.API) {
        API.stats().then(data => {
            if (!data) return;
            const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
            el('statSongs', data.songs || 0);
            el('statCollections', data.collections || 0);
            el('statMariachis', data.mariachis || 0);
            el('statCourses', data.courses || 0);
        });

        API.featuredSong().then(song => {
            if (!song) return;
            window._featuredSongId = song.id;
            window._featuredSongTitle = song.title;
            const info = document.querySelector('.hero-card-info');
            if (!info) return;
            info.querySelector('h3').textContent = '🎵 ' + song.title;
            info.querySelector('p').textContent = song.description || '';
            const metas = info.querySelectorAll('.meta-value');
            if (metas[0]) metas[0].textContent = song.composer || t('home.traditional');
            if (metas[1]) metas[1].textContent = song.style || '';
            if (metas[2]) metas[2].textContent = song.year || t('home.traditional');
            const scoreNum = document.getElementById('featuredScore');
            if (scoreNum) scoreNum.textContent = song.score_rating || '9.2';
        });
    }
};

// ===================================
// AWARDS SECTION
// ===================================
window.loadAwardsContent = function(type) {
    const container = document.getElementById('awardsContent');
    
    const titles = {
        awards: t('awards.title_awards'),
        nominees: t('awards.title_nominees'),
        trending: t('awards.title_trending'),
        winners: t('awards.title_winners')
    };
    
    const emojis = {
        awards: '🏆',
        nominees: '🌟',
        trending: '📈',
        winners: '👑'
    };
    
    container.innerHTML = `
        <style>
            .section-premium {
                padding: 4rem 2rem;
                min-height: 60vh;
            }
            
            .section-header {
                max-width: var(--container-max);
                margin: 0 auto 3rem;
                text-align: center;
            }
            
            .section-title {
                font-family: var(--font-display);
                font-size: clamp(2.5rem, 5vw, 4rem);
                font-weight: 900;
                color: var(--gold-primary);
                margin-bottom: 1rem;
            }
            
            .section-subtitle {
                font-size: 1.2rem;
                color: var(--gray-400);
            }
            
            .cards-grid {
                max-width: var(--container-max);
                margin: 0 auto;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 2rem;
            }
            
            .award-card {
                background: var(--gray-900);
                border: 2px solid rgba(255,184,0,0.2);
                border-radius: 16px;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .award-card:hover {
                border-color: var(--gold-primary);
                transform: translateY(-5px);
                box-shadow: 0 20px 60px rgba(255,184,0,0.2);
            }
            
            .award-card-image {
                width: 100%;
                height: 250px;
                background: linear-gradient(135deg, var(--gray-800), var(--gray-700));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                position: relative;
                overflow: hidden;
            }
            
            .award-card-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: var(--gold-primary);
                color: var(--black);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            
            .award-card-content {
                padding: 2rem;
            }
            
            .award-card-type {
                font-size: 0.8rem;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 0.5rem;
            }
            
            .award-card-title {
                font-family: var(--font-display);
                font-size: 1.5rem;
                color: var(--white);
                margin-bottom: 0.5rem;
            }
            
            .award-card-author {
                color: var(--gray-400);
                font-size: 0.95rem;
                margin-bottom: 1.5rem;
            }
            
            .award-card-score {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-top: 1.5rem;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .score-badge {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--gold-primary);
            }
            
            .view-btn {
                padding: 0.5rem 1.5rem;
                background: rgba(255,184,0,0.1);
                border: 1px solid rgba(255,184,0,0.3);
                color: var(--gold-primary);
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .view-btn:hover {
                background: rgba(255,184,0,0.2);
                border-color: var(--gold-primary);
            }
        </style>
        
        <div class="section-premium">
            <div class="section-header">
                <h1 class="section-title">${emojis[type]} ${titles[type]}</h1>
                <p class="section-subtitle">${t('awards.subtitle')}</p>
            </div>
            
            <div class="cards-grid" id="awardsGrid"></div>
        </div>
    `;
    
    // Load sample cards
    loadAwardCards(type);
};

function loadAwardCards(type, gridId) {
    const grid = document.getElementById(gridId || 'awardsGrid');
    if (!grid) return;
    
    grid.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray-400);">Cargando...</div>';

    const emojis = ['🎺','🎻','🎸','🎤','🎵','🎺','🎻','🎸','🎤','🎵','🎺','🎻'];
    
    const renderCards = (songs) => {
        grid.innerHTML = songs.map((song, idx) => `
        <div class="award-card" data-song-id="${song.id}">
            <div class="award-card-image">
                ${emojis[idx % emojis.length]}
                <div class="award-card-badge">${song.badge || ''}</div>
            </div>
            <div class="award-card-content">
                <div class="award-card-type">${song.style || ''}</div>
                <h3 class="award-card-title">${song.title}</h3>
                <p class="award-card-author">${t('awards.by')} ${song.composer || ''}</p>
                <p class="award-card-desc" style="color:var(--gray-400);font-size:0.85rem;margin:0.5rem 0;line-height:1.5;">${song.description ? song.description.substring(0, 120) + '...' : ''}</p>
                <div class="award-card-score">
                    <div class="score-badge">
                        <i class="fas fa-star"></i> <span id="score-${song.id}">${song.score_rating || 0}</span>
                        <span style="font-size:0.75rem;color:var(--gray-400);margin-left:0.25rem;">(${song.vote_count || 0})</span>
                    </div>
                    <div class="card-actions">
                        <button class="fav-btn" id="fav-${song.id}" onclick="event.stopPropagation();toggleFavorite('${song.id}')" title="${t('vote.favorite')}">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="vote-btn" onclick="event.stopPropagation();openVoteModal('${song.id}','${song.title.replace(/'/g, '')}')" title="${t('vote.rate')}">
                            <i class="fas fa-star"></i> ${t('vote.rate')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    };

    // Fetch from API
    if (window.API) {
        API.songs({ limit: 25, sort: 'score_rating' }).then(data => {
            if (data && data.songs && data.songs.length > 0) {
                renderCards(data.songs);
            }
        });
    }
}

// ===================================
// REPERTORIO SECTION
// ===================================
window.loadRepertorioContent = function(filter) {
    const container = document.getElementById('repertorioContent');
    container.innerHTML = `
        <div class="section-premium">
            <div class="section-header">
                <h1 class="section-title">🎵 ${t('repertorio.title')}</h1>
                <p class="section-subtitle">${t('repertorio.subtitle')}</p>
            </div>
            
            <div class="cards-grid" id="repertorioGrid"></div>
        </div>
    `;
    
    loadAwardCards('repertorio', 'repertorioGrid');
};

// Additional section loaders...
window.loadAudiosContent = function() {
    const isAuth = window.authClient && window.authClient.isAuthenticated();
    document.getElementById('audiosContent').innerHTML = `
        <style>
            .upload-section { max-width: var(--container-max); margin: 0 auto; padding: 4rem 2rem; }
            .upload-panel { background: var(--gray-900); border: 2px dashed rgba(255,184,0,0.3); border-radius: 16px; padding: 3rem; text-align: center; margin-bottom: 2rem; transition: all 0.3s; cursor: pointer; }
            .upload-panel:hover, .upload-panel.dragover { border-color: var(--gold-primary); background: rgba(255,184,0,0.05); }
            .upload-panel i { font-size: 3rem; color: var(--gold-primary); margin-bottom: 1rem; display: block; }
            .upload-panel h3 { color: var(--white); font-size: 1.3rem; margin-bottom: 0.5rem; }
            .upload-panel p { color: var(--gray-400); font-size: 0.9rem; }
            .upload-input { display: none; }
            .upload-progress { margin-top: 1rem; display: none; }
            .upload-progress-bar { height: 6px; background: var(--gray-700); border-radius: 3px; overflow: hidden; }
            .upload-progress-fill { height: 100%; background: var(--gold-primary); width: 0%; transition: width 0.3s; }
            .upload-status { margin-top: 0.5rem; font-size: 0.85rem; color: var(--gray-400); }
            .audio-list { display: flex; flex-direction: column; gap: 1rem; }
            .audio-item { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.15); border-radius: 12px; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; }
            .audio-item-icon { font-size: 2rem; color: var(--gold-primary); }
            .audio-item-info { flex: 1; }
            .audio-item-name { color: var(--white); font-weight: 600; margin-bottom: 0.25rem; }
            .audio-item-meta { color: var(--gray-400); font-size: 0.85rem; }
            .audio-player { width: 100%; margin-top: 0.5rem; }
            .audio-player audio { width: 100%; height: 40px; }
        </style>
        <div class="upload-section">
            <div class="section-header" style="text-align:center;margin-bottom:2rem;">
                <h1 class="section-title" style="font-family:var(--font-display);font-size:clamp(2.5rem,5vw,4rem);color:var(--gold-primary);">🎧 ${t('audios.section_title')}</h1>
                <p style="color:var(--gray-400);font-size:1.2rem;">${t('audios.section_subtitle')}</p>
            </div>
            
            ${isAuth ? `
            <div class="upload-panel" id="audioDropZone" onclick="document.getElementById('audioFileInput').click()">
                <i class="fas fa-cloud-upload-alt"></i>
                <h3>${t('audios.upload_title')}</h3>
                <p>${t('audios.upload_desc')}</p>
                <input type="file" class="upload-input" id="audioFileInput" accept="audio/*" onchange="handleUpload(this, 'audio')">
            </div>
            <div class="upload-progress" id="audioProgress">
                <div class="upload-progress-bar"><div class="upload-progress-fill" id="audioProgressFill"></div></div>
                <div class="upload-status" id="audioStatus"></div>
            </div>
            ` : `<p style="text-align:center;color:var(--gray-500);margin-bottom:2rem;">${t('audios.login_required')}</p>`}
            
            <div class="audio-list" id="audioList">
                <div style="text-align:center;padding:2rem;color:var(--gray-400);">${t('audios.loading')}</div>
            </div>
        </div>
    `;
    
    // Load existing audio uploads
    if (window.API) {
        API.get('/songs?limit=50').then(data => {
            const list = document.getElementById('audioList');
            if (!list || !data || !data.songs) return;
            const withAudio = data.songs.filter(s => s.audio_url);
            if (withAudio.length === 0) {
                list.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray-500);">' + t('audios.no_audios') + '</div>';
                return;
            }
            list.innerHTML = withAudio.map(s => `
                <div class="audio-item">
                    <div class="audio-item-icon">🎵</div>
                    <div class="audio-item-info">
                        <div class="audio-item-name">${s.title}</div>
                        <div class="audio-item-meta">${s.composer || ''} · ${s.style || ''}</div>
                        <div class="audio-player"><audio controls src="${s.audio_url}"></audio></div>
                    </div>
                </div>
            `).join('');
        });
    }
    
    // Setup drag & drop
    setupDropZone('audioDropZone', 'audioFileInput');
};

window.loadPartiturasContent = function() {
    const isAuth = window.authClient && window.authClient.isAuthenticated();
    document.getElementById('partiturasContent').innerHTML = `
        <div class="upload-section" style="max-width:var(--container-max);margin:0 auto;padding:4rem 2rem;">
            <div class="section-header" style="text-align:center;margin-bottom:2rem;">
                <h1 class="section-title" style="font-family:var(--font-display);font-size:clamp(2.5rem,5vw,4rem);color:var(--gold-primary);">📄 ${t('partituras.section_title')}</h1>
                <p style="color:var(--gray-400);font-size:1.2rem;">${t('partituras.section_subtitle')}</p>
            </div>
            
            ${isAuth ? `
            <div class="upload-panel" onclick="document.getElementById('scoreFileInput').click()">
                <i class="fas fa-file-pdf"></i>
                <h3>${t('partituras.upload_title')}</h3>
                <p>${t('partituras.upload_desc')}</p>
                <input type="file" class="upload-input" id="scoreFileInput" accept=".pdf,image/*" onchange="handleUpload(this, 'scores')">
            </div>
            <div class="upload-progress" id="scoresProgress">
                <div class="upload-progress-bar"><div class="upload-progress-fill" id="scoresProgressFill"></div></div>
                <div class="upload-status" id="scoresStatus"></div>
            </div>
            ` : `<p style="text-align:center;color:var(--gray-500);margin-bottom:2rem;">${t('partituras.login_required')}</p>`}
            
            <div id="scoresList" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;">
                <div style="text-align:center;padding:2rem;color:var(--gray-400);grid-column:1/-1;">${t('partituras.loading')}</div>
            </div>
        </div>
    `;
    
    if (window.API) {
        API.get('/songs?limit=50').then(data => {
            const list = document.getElementById('scoresList');
            if (!list || !data || !data.songs) return;
            const withScores = data.songs.filter(s => s.score_url);
            if (withScores.length === 0) {
                list.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray-500);grid-column:1/-1;">' + t('partituras.no_scores') + '</div>';
                return;
            }
            list.innerHTML = withScores.map(s => `
                <a href="${s.score_url}" target="_blank" style="background:var(--gray-900);border:1px solid rgba(255,184,0,0.15);border-radius:12px;padding:1.5rem;text-decoration:none;display:flex;align-items:center;gap:1rem;transition:all 0.2s;">
                    <i class="fas fa-file-pdf" style="font-size:2rem;color:var(--gold-primary);"></i>
                    <div>
                        <div style="color:var(--white);font-weight:600;">${s.title}</div>
                        <div style="color:var(--gray-400);font-size:0.85rem;">${s.composer || ''}</div>
                    </div>
                </a>
            `).join('');
        });
    }
};

window.loadEstilosContent = function() {
    document.getElementById('estilosContent').innerHTML = `<div class="section-premium"><h1 class="section-title">📚 ${t('estilos.title')}</h1></div>`;
};

window.loadWikiContent = function() {
    const container = document.getElementById('wikiContent');
    container.innerHTML = `
        <style>
            .wiki-section { max-width: var(--container-max); margin: 0 auto; padding: 2rem; }
            .wiki-header { text-align: center; margin-bottom: 3rem; padding-top: 1rem; }
            .wiki-header h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); color: var(--gold-primary); }
            .wiki-header p { color: var(--gray-400); font-size: 1.1rem; margin-top: 0.5rem; }

            .wiki-categories { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2.5rem; }
            .wiki-cat-btn { padding: 0.6rem 1.2rem; background: var(--gray-900); border: 1px solid rgba(255,184,0,0.15); color: var(--gray-300); border-radius: 10px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.2s; }
            .wiki-cat-btn:hover { border-color: var(--gold-primary); color: var(--white); }
            .wiki-cat-btn.active { background: rgba(255,184,0,0.15); border-color: var(--gold-primary); color: var(--gold-primary); }

            .wiki-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }

            .wiki-card { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.12); border-radius: 16px; overflow: hidden; transition: all 0.3s; cursor: pointer; }
            .wiki-card:hover { border-color: var(--gold-primary); transform: translateY(-4px); box-shadow: 0 15px 40px rgba(255,184,0,0.15); }
            .wiki-card-icon { height: 140px; background: linear-gradient(135deg, rgba(255,184,0,0.08), rgba(255,184,0,0.02)); display: flex; align-items: center; justify-content: center; font-size: 4rem; }
            .wiki-card-body { padding: 1.5rem; }
            .wiki-card-cat { font-size: 0.75rem; color: var(--gold-primary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 0.5rem; }
            .wiki-card-title { font-family: var(--font-display); font-size: 1.3rem; color: var(--white); margin-bottom: 0.75rem; line-height: 1.3; }
            .wiki-card-text { color: var(--gray-400); font-size: 0.9rem; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

            .wiki-detail { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.2); border-radius: 16px; padding: 2.5rem; }
            .wiki-detail-back { cursor: pointer; color: var(--gold-primary); font-size: 0.9rem; margin-bottom: 1.5rem; display: inline-flex; align-items: center; gap: 0.5rem; }
            .wiki-detail-back:hover { text-decoration: underline; }
            .wiki-detail h2 { font-family: var(--font-display); font-size: 2rem; color: var(--gold-primary); margin-bottom: 0.5rem; }
            .wiki-detail-cat { font-size: 0.85rem; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem; }
            .wiki-detail-content { color: var(--gray-300); font-size: 1rem; line-height: 1.8; }
            .wiki-detail-content h3 { color: var(--gold-primary); font-size: 1.3rem; margin: 1.5rem 0 0.75rem; }
            .wiki-detail-content p { margin-bottom: 1rem; }
            .wiki-detail-content ul { margin: 0.5rem 0 1rem 1.5rem; }
            .wiki-detail-content li { margin-bottom: 0.4rem; }

            .wiki-search { display: flex; justify-content: center; margin-bottom: 2rem; }
            .wiki-search input { width: 100%; max-width: 500px; padding: 0.8rem 1.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,184,0,0.2); color: var(--white); border-radius: 12px; font-size: 1rem; }
            .wiki-search input:focus { outline: none; border-color: var(--gold-primary); }

            @media (max-width: 768px) {
                .wiki-grid { grid-template-columns: 1fr; }
                .wiki-detail { padding: 1.5rem; }
            }
        </style>

        <div class="wiki-section">
            <div class="wiki-header">
                <h1>${t('wiki.page_title')}</h1>
                <p>${t('wiki.page_subtitle')}</p>
            </div>

            <div class="wiki-search">
                <input type="text" id="wikiSearch" placeholder="${t('wiki.search_placeholder')}" oninput="filterWiki(this.value)">
            </div>

            <div class="wiki-categories">
                <button class="wiki-cat-btn active" onclick="filterWikiCat('all')">${t('wiki.cat_all')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('instrumentos')">🎻 ${t('wiki.cat_instruments')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('historia')">📜 ${t('wiki.cat_history')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('estilos')">🎵 ${t('wiki.cat_styles')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('cultura')">🇲🇽 ${t('wiki.cat_culture')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('tecnica')">🎓 ${t('wiki.cat_technique')}</button>
            </div>

            <div class="wiki-grid" id="wikiGrid"></div>
        </div>
    `;

    renderWikiCards(wikiArticles);
};

const wikiArticles = [
    { id: 'violin', icon: '🎻', cat: 'instrumentos', title: 'El Violín Mariachi', text: 'El violín es el alma melódica del mariachi. Un grupo profesional puede incluir entre 4 y 8 violines.', content: '<h3>Historia en el Mariachi</h3><p>El violín fue uno de los primeros instrumentos europeos adoptados por los músicos mexicanos en el siglo XVI. En el mariachi, el violín lleva la melodía principal y crea los floreos característicos del género.</p><h3>Técnica Especial</h3><p>A diferencia del violín clásico, el estilo mariachi emplea un vibrato más amplio, portamentos expresivos y un uso intenso del doble cuerdas. Los violinistas mariachi deben dominar tanto la lectura de partitura como la improvisación.</p><h3>Violinistas Legendarios</h3><ul><li><strong>Gaspar Vargas</strong> — Fundador del Mariachi Vargas de Tecalitlán</li><li><strong>José Reyes</strong> — Innovador del violín mariachi moderno</li><li><strong>Rubén Fuentes</strong> — Compositor y arreglista que elevó el violín a nivel artístico</li></ul>' },
    { id: 'trompeta', icon: '🎺', cat: 'instrumentos', title: 'La Trompeta Mariachi', text: 'Incorporada en los años 1930, la trompeta le dio al mariachi su sonido brillante y poderoso.', content: '<h3>La Revolución del Sonido</h3><p>Antes de la trompeta, el mariachi era un conjunto de cuerdas. La incorporación de la trompeta en los años 1930 transformó el sonido del género, haciéndolo más potente y festivo. Se atribuye a Emilio Azcárraga esta innovación.</p><h3>Técnica</h3><p>El trompetista mariachi debe dominar el registro agudo, los ataques limpios, el vibrato controlado y las fanfarrias. Las secciones de trompeta típicamente incluyen 2 instrumentos tocando en armonías de terceras.</p><h3>Repertorio Clave</h3><p>Piezas como "El Son de la Negra", "La Bikina" y "Guadalajara" tienen introducciones de trompeta icónicas reconocidas mundialmente.</p>' },
    { id: 'guitarron', icon: '🎸', cat: 'instrumentos', title: 'El Guitarrón Mexicano', text: 'El bajo del mariachi. Instrumento único mexicano que proporciona la base rítmica y armónica.', content: '<h3>Origen</h3><p>El guitarrón mexicano es un instrumento exclusivo de México, derivado del bajo de cuerda español del siglo XVI. Con sus 6 cuerdas gruesas y su caja de resonancia abombada, produce un sonido profundo y cálido.</p><h3>Función en el Mariachi</h3><p>El guitarrón es el "corazón" rítmico del mariachi. Marca el tiempo, define la armonía y guía al resto del conjunto. Un buen guitarronista es la base de un buen mariachi.</p><h3>Técnica</h3><p>Se toca sin amplificación, usando una técnica de "pulgar y dedos" que produce un sonido percusivo y melódico al mismo tiempo. Las cuerdas se tocan en pares (octavas) para mayor volumen.</p>' },
    { id: 'vihuela', icon: '🪕', cat: 'instrumentos', title: 'La Vihuela Mexicana', text: 'Guitarra pequeña de fondo convexo que proporciona el rasgueo rítmico característico del mariachi.', content: '<h3>Descripción</h3><p>La vihuela mexicana es una guitarra pequeña de 5 cuerdas con fondo convexo (abombado). No debe confundirse con la vihuela española renacentista. Es un instrumento exclusivo del mariachi.</p><h3>Función</h3><p>Proporciona el ritmo armónico del conjunto mediante patrones de rasgueo llamados "mañanitas", "son" o "bolero" según el estilo. Es junto al guitarrón el motor rítmico del mariachi.</p><h3>Afinación</h3><p>Se afina en la-re-sol-si-mi (de grave a agudo). Su sonido brillante y percusivo es inconfundible en el conjunto mariachi.</p>' },
    { id: 'guitarra', icon: '🎸', cat: 'instrumentos', title: 'La Guitarra de Golpe', text: 'Guitarra tradicional del mariachi jalisciense, con técnica de rasgueo percusivo.', content: '<h3>Tradición Jalisciense</h3><p>La guitarra de golpe es el instrumento más antiguo del mariachi, originario de Jalisco. A diferencia de la guitarra clásica, se usa exclusivamente para rasgueo percusivo.</p><h3>Diferencia con la Guitarra Clásica</h3><p>Aunque similar en apariencia, la guitarra de golpe tiene un fondo ligeramente convexo y se toca con una técnica de "golpe" que produce un sonido más percusivo y rítmico. En mariachis modernos, a veces se sustituye por la guitarra clásica.</p>' },
    { id: 'arpa', icon: '🪈', cat: 'instrumentos', title: 'El Arpa Mariachi', text: 'Instrumento original del mariachi que fue desplazado por el guitarrón y las trompetas.', content: '<h3>El Instrumento Perdido</h3><p>El arpa fue parte fundamental del mariachi original desde el siglo XIX. Su función era proporcionar la línea de bajo y la armonía. Con la llegada del guitarrón y la trompeta en el siglo XX, el arpa fue gradualmente eliminada de la formación estándar.</p><h3>Supervivencia</h3><p>Algunos mariachis tradicionales de Jalisco aún incluyen el arpa. El Mariachi Los Camperos de Nati Cano fue pionero en rescatar el arpa en formaciones modernas.</p>' },
    { id: 'origenes', icon: '📜', cat: 'historia', title: 'Orígenes del Mariachi', text: 'El mariachi nació en el occidente de México entre los siglos XVIII y XIX como música mestiza.', content: '<h3>Raíces</h3><p>El mariachi surgió en la región occidental de México (Jalisco, Nayarit, Colima, Michoacán) como resultado de la fusión entre tradiciones musicales indígenas, españolas y africanas.</p><h3>Debate sobre el Nombre</h3><p>Existen varias teorías sobre el origen de la palabra "mariachi": desde la teoría francesa (mariage = matrimonio) hasta la más aceptada actualmente que proviene de la lengua coca de Jalisco, donde "mariachi" significaba un tipo de tarima de baile.</p><h3>Evolución</h3><p>Los primeros mariachis eran grupos rurales de cuerdas (violines, vihuela, guitarrón) que tocaban sones regionales. No fue hasta el siglo XX que el mariachi se urbanizó y se convirtió en símbolo nacional de México.</p>' },
    { id: 'cocula', icon: '🏘️', cat: 'historia', title: 'Cocula: Cuna del Mariachi', text: 'El pueblo de Cocula, Jalisco, es reconocido como el lugar de nacimiento del mariachi.', content: '<h3>La Capital del Mariachi</h3><p>Cocula, un pequeño municipio de Jalisco, se proclama como la cuna del mariachi. Su tradición musical data del siglo XVIII, cuando los músicos locales desarrollaron una forma particular de interpretar sones y jarabes.</p><h3>Patrimonio</h3><p>La tradición musical de Cocula fue fundamental para que en 2011, la UNESCO declarara al mariachi como Patrimonio Cultural Inmaterial de la Humanidad. Cada septiembre se celebra el Festival del Mariachi en Cocula.</p>' },
    { id: 'garibaldi', icon: '🎪', cat: 'historia', title: 'Plaza Garibaldi', text: 'La icónica plaza de la Ciudad de México, epicentro mundial del mariachi desde 1920.', content: '<h3>El Epicentro</h3><p>La Plaza Garibaldi en la Ciudad de México es el punto de reunión más famoso de mariachis en el mundo. Desde la década de 1920, cientos de grupos se congregan aquí cada noche para ofrecer serenatas y música en vivo.</p><h3>Historia</h3><p>Originalmente un mercado, la plaza se transformó en centro musical cuando los mariachis comenzaron a emigrar del campo a la ciudad. Hoy alberga el Museo del Tequila y el Mezcal, bares de tradición como el Tenampa, y es Patrimonio Cultural de la CDMX.</p>' },
    { id: 'unesco', icon: '🏆', cat: 'historia', title: 'Patrimonio UNESCO', text: 'En 2011, el mariachi fue declarado Patrimonio Cultural Inmaterial de la Humanidad.', content: '<h3>Reconocimiento Mundial</h3><p>El 27 de noviembre de 2011, la UNESCO inscribió al mariachi en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad. La declaración reconoce al mariachi como una expresión artística que transmite valores de respeto, patrimonio y tradición.</p><h3>Criterios</h3><p>La UNESCO destacó que el mariachi es un símbolo de la alegría mexicana, presente en fiestas, serenatas, misas, funerales y celebraciones patrias. También reconoció el sistema de transmisión oral del conocimiento musical entre generaciones.</p>' },
    { id: 'son', icon: '🎵', cat: 'estilos', title: 'Son Jalisciense', text: 'El género musical fundacional del mariachi, con ritmos vivos y zapateo.', content: '<h3>El Género Original</h3><p>El son jalisciense es el género que dio origen al mariachi. Caracterizado por ritmos vivos en compás de 6/8 o 3/4, melodías alegres y secciones instrumentales virtuosas donde los músicos demuestran su habilidad.</p><h3>Estructura</h3><p>Un son típico alterna entre coplas cantadas y secciones instrumentales. El zapateo (baile percusivo con los pies) es parte integral de la interpretación. Las piezas más famosas incluyen "El Son de la Negra", "El Cascabel" y "La Negra".</p>' },
    { id: 'ranchera', icon: '🤠', cat: 'estilos', title: 'La Ranchera', text: 'Género vocal por excelencia del mariachi, que expresa sentimientos profundos de amor y desamor.', content: '<h3>El Alma del Mariachi</h3><p>La ranchera es el género vocal más importante del repertorio mariachi. Nacida en el periodo post-revolucionario (1910-1920), expresa los sentimientos más profundos del alma mexicana: amor, desamor, orgullo, nostalgia.</p><h3>Subgéneros</h3><ul><li><strong>Ranchera lenta</strong> — Baladas de amor y despedida</li><li><strong>Ranchera rápida</strong> — Canciones alegres y festivas</li><li><strong>Ranchera bravía</strong> — Temas de valentía y orgullo</li></ul><h3>Grandes Compositores</h3><p>José Alfredo Jiménez es el rey indiscutible de la ranchera, con más de 1,000 composiciones. Otros grandes incluyen a Tomás Méndez, Chucho Monge y Juan Gabriel.</p>' },
    { id: 'bolero', icon: '💘', cat: 'estilos', title: 'Bolero Ranchero', text: 'Fusión del bolero cubano con el mariachi mexicano, creando baladas románticas únicas.', content: '<h3>Fusión Perfecta</h3><p>El bolero ranchero combina la estructura armónica y romántica del bolero cubano con la instrumentación y expresividad del mariachi. El resultado es un género de baladas profundamente emotivas.</p><h3>Artistas Emblemáticos</h3><p>Pedro Infante, Javier Solís y Luis Miguel son los máximos exponentes del bolero ranchero. Canciones como "Sabor a Mí", "La Bikina" y "Si Nos Dejan" son clásicos inmortales del género.</p>' },
    { id: 'huapango', icon: '💃', cat: 'estilos', title: 'El Huapango', text: 'Género virtuoso de la Huasteca mexicana con falsete y zapateado sobre tarima.', content: '<h3>Tradición Huasteca</h3><p>El huapango proviene de la región Huasteca (Veracruz, San Luis Potosí, Tamaulipas, Hidalgo). Se caracteriza por el uso del falsete, ritmos complejos y el zapateado sobre tarima de madera.</p><h3>En el Mariachi</h3><p>"El Huapango de Moncayo" es la obra orquestal mexicana más famosa, basada en tres sones huastecos. Piezas como "La Malagueña" combinan elementos del huapango con técnica virtuosa.</p>' },
    { id: 'corrido', icon: '📯', cat: 'estilos', title: 'El Corrido', text: 'Narrativa musical mexicana que cuenta historias de héroes, batallas y eventos históricos.', content: '<h3>El Periodismo Musical</h3><p>El corrido es la forma narrativa de la música mexicana. Descendiente del romance español, se convirtió en el principal medio de comunicación durante la Revolución Mexicana (1910-1920), narrando batallas, hazañas de héroes y eventos históricos.</p><h3>Estructura</h3><p>Un corrido típico comienza con una presentación del tema, narra los eventos en orden cronológico y termina con una despedida o moraleja. Se canta en compás de 3/4 o 2/4 con melodías simples y directas.</p>' },
    { id: 'traje', icon: '🇲🇽', cat: 'cultura', title: 'El Traje de Charro', text: 'La indumentaria oficial del mariachi, derivada del traje del jinete mexicano.', content: '<h3>Origen</h3><p>El traje de charro proviene de la indumentaria del jinete mexicano (charro). Fue adoptado por los mariachis en la década de 1930 cuando el cine mexicano popularizó la imagen del charro cantor.</p><h3>Componentes</h3><ul><li><strong>Chaqueta (bolero)</strong> — Corta, con bordados de hilo de plata u oro</li><li><strong>Pantalón</strong> — Ajustado con botonadura lateral de plata</li><li><strong>Moño</strong> — Corbata de moño típica</li><li><strong>Sombrero</strong> — De ala ancha con bordados</li><li><strong>Botas</strong> — De piel con tacón</li><li><strong>Cinturón piteado</strong> — Bordado en pita (fibra de agave)</li></ul>' },
    { id: 'serenata', icon: '🌙', cat: 'cultura', title: 'La Serenata', text: 'Tradición romántica de llevar música mariachi bajo la ventana del ser amado.', content: '<h3>Tradición Romántica</h3><p>La serenata es una de las tradiciones más emblemáticas de la cultura mexicana. Consiste en contratar un mariachi para llevar música a la persona amada, generalmente de madrugada o al atardecer.</p><h3>Protocolo</h3><p>La serenata tradicional comienza con "Las Mañanitas" si es cumpleaños, o con una canción romántica. El enamorado espera bajo la ventana mientras el mariachi toca. Si la persona amada enciende la luz o sale al balcón, la serenata es aceptada.</p><h3>En la Actualidad</h3><p>Aunque la tradición se ha modernizado, las serenatas siguen siendo populares para cumpleaños, Día de las Madres, aniversarios y declaraciones de amor.</p>' },
    { id: 'fiestas', icon: '🎉', cat: 'cultura', title: 'El Mariachi en las Fiestas', text: 'El mariachi está presente en todas las celebraciones mexicanas: bodas, quinceañeras, fiestas patrias.', content: '<h3>Omnipresencia Cultural</h3><p>No hay celebración mexicana completa sin mariachi. Desde nacimientos hasta funerales, el mariachi acompaña todos los momentos importantes de la vida:</p><ul><li><strong>Bodas</strong> — El mariachi toca durante la ceremonia y la fiesta</li><li><strong>Quinceañeras</strong> — Vals y canciones para la festejada</li><li><strong>Día de los Muertos</strong> — Serenatas en los cementerios</li><li><strong>Fiestas Patrias</strong> — El Grito de Independencia el 15 de septiembre</li><li><strong>Día de las Madres</strong> — "Las Mañanitas" al amanecer</li><li><strong>Bautizos y comuniones</strong> — Música religiosa y festiva</li></ul>' },
    { id: 'madeira', icon: '🏝️', cat: 'cultura', title: 'El Mariachi en Madeira', text: 'La presencia del mariachi en la isla portuguesa de Madeira, un puente cultural entre México y Europa.', content: '<h3>México en el Atlántico</h3><p>La isla de Madeira, Portugal, se ha convertido en un punto de difusión del mariachi en Europa. Gracias a la comunidad mexicana y al turismo, el mariachi encontró un hogar inesperado en esta isla del Atlántico.</p><h3>Mariachi México de Madeira</h3><p>Fundado por músicos apasionados por la cultura mexicana, el Mariachi México de Madeira fue el primer grupo establecido en Portugal. Realizan presentaciones en hoteles, festivales y eventos culturales, llevando la alegría del mariachi a turistas y locales.</p><h3>Puente Cultural</h3><p>La presencia del mariachi en Madeira representa la universalidad de esta expresión cultural mexicana, que trasciende fronteras y conecta corazones a través de la música.</p>' },
    { id: 'afinacion', icon: '🎓', cat: 'tecnica', title: 'Afinación y Tonalidades', text: 'Guía de afinación de los instrumentos del mariachi y tonalidades más usadas.', content: '<h3>Afinaciones</h3><ul><li><strong>Violín</strong> — Sol-Re-La-Mi (estándar)</li><li><strong>Trompeta</strong> — En Si bemol (transpositora)</li><li><strong>Guitarrón</strong> — La-Re-Sol-Do-Mi-La (por pares de octavas)</li><li><strong>Vihuela</strong> — La-Re-Sol-Si-Mi</li><li><strong>Guitarra</strong> — Mi-La-Re-Sol-Si-Mi (estándar)</li></ul><h3>Tonalidades Frecuentes</h3><p>Las tonalidades más usadas en el mariachi son: Re mayor, Sol mayor, La mayor, Do mayor y Mi mayor. Estas tonalidades favorecen la tesitura de los instrumentos y las voces masculinas y femeninas.</p>' },
    { id: 'formacion', icon: '👥', cat: 'tecnica', title: 'Formación del Conjunto', text: 'La estructura y organización de un mariachi profesional moderno.', content: '<h3>Formación Estándar</h3><p>Un mariachi profesional moderno incluye entre 7 y 15 músicos:</p><ul><li><strong>Violines</strong> — 4 a 8 (sección de cuerdas)</li><li><strong>Trompetas</strong> — 2 a 3</li><li><strong>Guitarrón</strong> — 1 (base rítmica)</li><li><strong>Vihuela</strong> — 1 (armonía rítmica)</li><li><strong>Guitarra</strong> — 1 (opcional)</li><li><strong>Arpa</strong> — 1 (opcional, en mariachis tradicionales)</li></ul><h3>Dirección</h3><p>El director del mariachi suele ser el primer violín o el primer trompeta. Coordina los arreglos, decide el repertorio y marca las entradas durante la interpretación.</p>' },
];

function renderWikiCards(articles) {
    const grid = document.getElementById('wikiGrid');
    if (!grid) return;

    grid.innerHTML = articles.map(a => `
        <div class="wiki-card" onclick="openWikiArticle('${a.id}')" data-cat="${a.cat}">
            <div class="wiki-card-icon">${a.icon}</div>
            <div class="wiki-card-body">
                <div class="wiki-card-cat">${a.cat}</div>
                <h3 class="wiki-card-title">${a.title}</h3>
                <p class="wiki-card-text">${a.text}</p>
            </div>
        </div>
    `).join('');
}

window.openWikiArticle = function(id) {
    const article = wikiArticles.find(a => a.id === id);
    if (!article) return;

    const grid = document.getElementById('wikiGrid');
    const cats = document.querySelector('.wiki-categories');
    const search = document.querySelector('.wiki-search');
    if (cats) cats.style.display = 'none';
    if (search) search.style.display = 'none';

    grid.innerHTML = `
        <div class="wiki-detail" style="grid-column: 1 / -1;">
            <div class="wiki-detail-back" onclick="closeWikiArticle()">
                <i class="fas fa-arrow-left"></i> ${t('wiki.back')}
            </div>
            <div style="font-size:4rem;margin-bottom:1rem;">${article.icon}</div>
            <h2>${article.title}</h2>
            <div class="wiki-detail-cat">${article.cat.toUpperCase()}</div>
            <div class="wiki-detail-content">${article.content}</div>
        </div>
    `;
};

window.closeWikiArticle = function() {
    const cats = document.querySelector('.wiki-categories');
    const search = document.querySelector('.wiki-search');
    if (cats) cats.style.display = '';
    if (search) search.style.display = '';
    renderWikiCards(wikiArticles);
};

window.filterWikiCat = function(cat) {
    document.querySelectorAll('.wiki-cat-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (cat === 'all') {
        renderWikiCards(wikiArticles);
    } else {
        renderWikiCards(wikiArticles.filter(a => a.cat === cat));
    }
};

window.filterWiki = function(query) {
    const q = query.toLowerCase().trim();
    if (!q) { renderWikiCards(wikiArticles); return; }
    renderWikiCards(wikiArticles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.text.toLowerCase().includes(q) ||
        a.cat.toLowerCase().includes(q)
    ));
};

window.loadChatbotContent = function() {
    const container = document.getElementById('chatbotContent');
    const lang = window.i18n ? window.i18n.currentLang : 'es';
    container.innerHTML = `
        <style>
            .chat-section {
                padding: 2rem;
                max-width: 900px;
                margin: 0 auto;
                min-height: calc(100vh - var(--nav-height) - 100px);
                display: flex;
                flex-direction: column;
            }
            
            .chat-header {
                text-align: center;
                margin-bottom: 2rem;
                padding-top: 2rem;
            }
            
            .chat-header h1 {
                font-family: var(--font-display);
                font-size: clamp(2rem, 4vw, 3rem);
                color: var(--gold-primary);
                margin-bottom: 0.5rem;
            }
            
            .chat-header p {
                color: var(--gray-400);
                font-size: 1.1rem;
            }
            
            .chat-window {
                flex: 1;
                background: var(--gray-900);
                border: 1px solid rgba(255,184,0,0.2);
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                min-height: 500px;
                overflow: hidden;
            }
            
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 2rem;
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .chat-messages::-webkit-scrollbar {
                width: 6px;
            }
            
            .chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }
            
            .chat-messages::-webkit-scrollbar-thumb {
                background: var(--gray-700);
                border-radius: 3px;
            }
            
            .chat-msg {
                max-width: 80%;
                padding: 1rem 1.5rem;
                border-radius: 16px;
                line-height: 1.6;
                font-size: 0.95rem;
                animation: chatFadeIn 0.3s ease;
            }
            
            @keyframes chatFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .chat-msg.bot {
                background: rgba(255,184,0,0.08);
                border: 1px solid rgba(255,184,0,0.15);
                color: var(--gray-200);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            
            .chat-msg.user {
                background: rgba(255,184,0,0.15);
                border: 1px solid rgba(255,184,0,0.3);
                color: var(--white);
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            
            .chat-msg.bot .msg-label {
                font-size: 0.75rem;
                font-weight: 600;
                color: var(--gold-primary);
                margin-bottom: 0.5rem;
                display: block;
            }
            
            .chat-msg.typing {
                padding: 1rem 1.5rem;
            }
            
            .typing-dots {
                display: flex;
                gap: 6px;
                align-items: center;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                background: var(--gold-primary);
                border-radius: 50%;
                animation: typingBounce 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typingBounce {
                0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                40% { transform: scale(1); opacity: 1; }
            }
            
            .chat-input-area {
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid rgba(255,184,0,0.15);
                background: rgba(15,15,15,0.5);
            }
            
            .chat-input {
                flex: 1;
                padding: 1rem 1.5rem;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,184,0,0.2);
                color: var(--white);
                border-radius: 12px;
                font-size: 1rem;
                font-family: var(--font-primary);
                outline: none;
                transition: border-color 0.2s;
            }
            
            .chat-input:focus {
                border-color: var(--gold-primary);
            }
            
            .chat-input::placeholder {
                color: var(--gray-500);
            }
            
            .chat-send-btn {
                padding: 1rem 2rem;
                background: var(--gold-primary);
                color: var(--black);
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .chat-send-btn:hover {
                background: var(--gold-light);
                transform: translateY(-1px);
            }
            
            .chat-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
            
            .chat-suggestions {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
                padding: 1rem 2rem 0.5rem;
            }
            
            .chat-suggestion {
                padding: 0.5rem 1rem;
                background: rgba(255,184,0,0.08);
                border: 1px solid rgba(255,184,0,0.2);
                color: var(--gold-primary);
                border-radius: 20px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .chat-suggestion:hover {
                background: rgba(255,184,0,0.15);
                border-color: var(--gold-primary);
            }

            .chat-error {
                color: var(--red-mariachi);
                font-size: 0.85rem;
                padding: 0.75rem 1rem;
                background: rgba(220,38,38,0.1);
                border-radius: 8px;
                text-align: center;
            }
            
            @media (max-width: 768px) {
                .chat-section { padding: 1rem; }
                .chat-messages { padding: 1rem; }
                .chat-msg { max-width: 90%; }
                .chat-input-area { padding: 1rem; }
                .chat-send-btn span { display: none; }
            }
        </style>
        
        <div class="chat-section">
            <div class="chat-header">
                <h1>🤖 ${t('chatbot.ui_title')}</h1>
                <p>${t('chatbot.ui_subtitle')}</p>
            </div>
            
            <div class="chat-window">
                <div class="chat-suggestions" id="chatSuggestions">
                    <button class="chat-suggestion" onclick="chatSendSuggestion('${t('chatbot.q1')}')">${t('chatbot.q1')}</button>
                    <button class="chat-suggestion" onclick="chatSendSuggestion('${t('chatbot.q2')}')">${t('chatbot.q2')}</button>
                    <button class="chat-suggestion" onclick="chatSendSuggestion('${t('chatbot.q3')}')">${t('chatbot.q3')}</button>
                    <button class="chat-suggestion" onclick="chatSendSuggestion('${t('chatbot.q4')}')">${t('chatbot.q4')}</button>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-msg bot">
                        <span class="msg-label">🎺 Mariachi Bot</span>
                        ${t('chatbot.welcome')}
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chatInput" 
                           placeholder="${t('chatbot.placeholder')}" 
                           maxlength="2000"
                           onkeydown="if(event.key==='Enter') chatSend()">
                    <button class="chat-send-btn" id="chatSendBtn" onclick="chatSend()">
                        <i class="fas fa-paper-plane"></i>
                        <span>${t('chatbot.send')}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Chat state
window._chatHistory = [];

window.chatSendSuggestion = function(text) {
    document.getElementById('chatInput').value = text;
    const suggestions = document.getElementById('chatSuggestions');
    if (suggestions) suggestions.style.display = 'none';
    chatSend();
};

window.chatSend = async function() {
    const input = document.getElementById('chatInput');
    const btn = document.getElementById('chatSendBtn');
    const messages = document.getElementById('chatMessages');
    const suggestions = document.getElementById('chatSuggestions');
    const msg = input.value.trim();
    
    if (!msg || btn.disabled) return;
    
    // Hide suggestions after first message
    if (suggestions) suggestions.style.display = 'none';
    
    // Add user message
    messages.innerHTML += `<div class="chat-msg user">${escapeHtml(msg)}</div>`;
    input.value = '';
    btn.disabled = true;
    
    // Add typing indicator
    messages.innerHTML += `<div class="chat-msg bot typing" id="typingIndicator">
        <span class="msg-label">🎺 Mariachi Bot</span>
        <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>`;
    messages.scrollTop = messages.scrollHeight;
    
    // Add to history
    window._chatHistory.push({ role: 'user', content: msg });
    
    try {
        const lang = window.i18n ? window.i18n.currentLang : 'es';
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: msg, 
                lang: lang,
                history: window._chatHistory.slice(-10)
            })
        });
        
        // Remove typing indicator
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || 'Error ' + response.status);
        }
        
        const data = await response.json();
        const reply = data.reply;
        
        // Add to history
        window._chatHistory.push({ role: 'assistant', content: reply });
        
        // Format reply (basic markdown: bold, newlines)
        const formatted = escapeHtml(reply)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        messages.innerHTML += `<div class="chat-msg bot">
            <span class="msg-label">🎺 Mariachi Bot</span>
            ${formatted}
        </div>`;
    } catch (err) {
        // Remove typing indicator
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        
        const errorKey = err.message === 'API key not configured' ? 'chatbot.error_nokey' : 'chatbot.error_general';
        messages.innerHTML += `<div class="chat-error">${t(errorKey)}</div>`;
    }
    
    btn.disabled = false;
    messages.scrollTop = messages.scrollHeight;
    input.focus();
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.loadAcademyContent = function() {
    const container = document.getElementById('academyContent');
    container.innerHTML = `
        <style>
            .academy-card {
                background: var(--gray-900);
                border: 2px solid rgba(255,184,0,0.2);
                border-radius: 16px;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .academy-card:hover {
                border-color: var(--gold-primary);
                transform: translateY(-5px);
                box-shadow: 0 20px 60px rgba(255,184,0,0.2);
            }
            
            .academy-card-image {
                width: 100%;
                height: 200px;
                background: linear-gradient(135deg, #059669, #047857);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
            }
            
            .academy-card-content {
                padding: 2rem;
            }
            
            .academy-card-instructor {
                font-size: 0.9rem;
                color: var(--gray-400);
                margin-bottom: 0.5rem;
            }
            
            .academy-card-title {
                font-family: var(--font-display);
                font-size: 1.3rem;
                color: var(--white);
                margin-bottom: 1rem;
            }
            
            .academy-card-rating {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .rating-stars {
                color: var(--gold-primary);
                font-size: 1rem;
            }
            
            .rating-number {
                font-weight: 600;
                color: var(--white);
            }
            
            .academy-card-meta {
                display: flex;
                justify-content: space-between;
                padding-top: 1rem;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .meta-info {
                font-size: 0.9rem;
                color: var(--gray-400);
            }
            
            .price {
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--gold-primary);
            }
        </style>
        
        <div class="section-premium">
            <div class="section-header">
                <h1 class="section-title">🎓 ${t('academy.title')}</h1>
                <p class="section-subtitle">${t('academy.subtitle')}</p>
            </div>
            
            <div class="cards-grid" id="academyGrid">
                <div style="text-align:center;padding:2rem;color:var(--gray-400);grid-column:1/-1;">Cargando cursos...</div>
            </div>
        </div>
    `;
    
    // Load courses from API
    if (window.API) {
        API.courses().then(data => {
            const grid = document.getElementById('academyGrid');
            if (!grid || !data || !data.courses) return;
            grid.innerHTML = data.courses.map(c => `
                <div class="academy-card">
                    <div class="academy-card-image">${c.icon || '🎵'}</div>
                    <div class="academy-card-content">
                        <p class="academy-card-instructor">${c.instructor_name || ''}</p>
                        <h3 class="academy-card-title">${c.title}</h3>
                        <div class="academy-card-rating">
                            <span class="rating-stars">★★★★★</span>
                            <span class="rating-number">${c.rating || 5.0}</span>
                            <span class="meta-info">(${c.student_count || 0} ${t('academy.students')})</span>
                        </div>
                        <div class="academy-card-meta">
                            <span class="meta-info">${c.lessons || 0} ${t('academy.lessons')} · ${c.hours || 0} ${t('academy.hours')}</span>
                            <span class="price">${c.is_free ? t('academy.free') : ('€' + c.price)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        });
    }
};

window.loadCollectionsContent = function() {
    const container = document.getElementById('collectionsContent');
    container.innerHTML = `
        <style>
            .collection-card {
                background: var(--gray-900);
                border: 2px solid rgba(255,184,0,0.2);
                border-radius: 16px;
                padding: 2.5rem;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .collection-card:hover {
                border-color: var(--gold-primary);
                transform: translateY(-5px);
                box-shadow: 0 20px 60px rgba(255,184,0,0.2);
            }
            
            .collection-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
            }
            
            .collection-title {
                font-family: var(--font-display);
                font-size: 1.8rem;
                color: var(--white);
                margin-bottom: 0.5rem;
            }
            
            .collection-category {
                font-size: 0.85rem;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 1rem;
            }
            
            .collection-stats {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--gray-400);
                font-size: 0.95rem;
            }
            
            .stat-number {
                color: var(--gold-primary);
                font-weight: 700;
            }
        </style>
        
        <div class="section-premium">
            <div class="section-header">
                <h1 class="section-title">📂 ${t('collections.title')}</h1>
                <p class="section-subtitle">${t('collections.subtitle')}</p>
            </div>
            
            <div class="cards-grid" id="collectionsGrid">
                <div style="text-align:center;padding:2rem;color:var(--gray-400);grid-column:1/-1;">Cargando...</div>
            </div>
        </div>
    `;
    
    if (window.API) {
        API.collections().then(data => {
            const grid = document.getElementById('collectionsGrid');
            if (!grid || !data || !data.collections) return;
            grid.innerHTML = data.collections.map(col => `
                <div class="collection-card">
                    <div class="collection-icon">${col.icon || '🎵'}</div>
                    <h3 class="collection-title">${col.title}</h3>
                    <p class="collection-category">${col.category || ''}</p>
                    <p style="color: var(--gray-400); margin-bottom: 1rem;">${col.description || ''}</p>
                    <div class="collection-stats">
                        <div class="stat-item">
                            <i class="fas fa-music"></i>
                            <span class="stat-number">${col.song_count || 0}</span> ${t('collections.songs')}
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span class="stat-number">${col.fav_count || 0}</span> ${t('collections.favorites')}
                        </div>
                    </div>
                </div>
            `).join('');
        });
    }
};

window.loadDirectoryContent = function() {
    const container = document.getElementById('directoryContent');
    container.innerHTML = `
        <style>
            .directory-card {
                background: var(--gray-900);
                border: 2px solid rgba(255,184,0,0.2);
                border-radius: 16px;
                padding: 2rem;
                display: flex;
                gap: 2rem;
                align-items: center;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .directory-card:hover {
                border-color: var(--gold-primary);
                transform: translateY(-3px);
                box-shadow: 0 10px 40px rgba(255,184,0,0.2);
            }
            
            .directory-logo {
                width: 80px;
                height: 80px;
                border-radius: 12px;
                background: linear-gradient(135deg, var(--gray-800), var(--gray-700));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                flex-shrink: 0;
            }
            
            .directory-info {
                flex: 1;
            }
            
            .directory-name {
                font-family: var(--font-display);
                font-size: 1.5rem;
                color: var(--white);
                margin-bottom: 0.5rem;
            }
            
            .directory-type {
                font-size: 0.85rem;
                color: var(--gold-primary);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 0.75rem;
            }
            
            .directory-meta {
                display: flex;
                gap: 2rem;
                color: var(--gray-400);
                font-size: 0.9rem;
            }
            
            .directory-actions {
                display: flex;
                gap: 1rem;
            }
            
            .count-badge {
                background: rgba(255,184,0,0.1);
                border: 1px solid rgba(255,184,0,0.3);
                color: var(--gold-primary);
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                font-weight: 600;
            }
        </style>
        
        <div class="section-premium">
            <div class="section-header">
                <h1 class="section-title">📋 ${t('directory.title')}</h1>
                <p class="section-subtitle">${t('directory.subtitle')}</p>
                <p style="color: var(--gray-500); margin-top: 1rem; font-size: 1.1rem;">
                    <strong style="color: var(--gold-primary);">248</strong> ${t('directory.registered')}
                </p>
            </div>
            
            <div id="directoryGrid" style="max-width: var(--container-max); margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <div style="text-align:center;padding:2rem;color:var(--gray-400);">Cargando directorio...</div>
            </div>
        </div>
    `;
    
    if (window.API) {
        API.mariachis().then(data => {
            const grid = document.getElementById('directoryGrid');
            if (!grid || !data || !data.mariachis) return;
            const el = document.querySelector('.section-header p[style]');
            if (el) el.innerHTML = '<strong style="color:var(--gold-primary);">' + data.total + '</strong> ' + t('directory.registered');
            
            grid.innerHTML = data.mariachis.map(m => `
                <div class="directory-card">
                    <div class="directory-logo">🎺</div>
                    <div class="directory-info">
                        <h3 class="directory-name">${m.name}</h3>
                        <p class="directory-type">${m.type || ''}</p>
                        <div class="directory-meta">
                            <span><i class="fas fa-music"></i> ${m.presentations || 0}+ ${t('directory.presentations')}</span>
                            <span><i class="fas fa-trophy"></i> ${m.awards || 0} ${t('directory.awards')}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${m.location || ''}</span>
                        </div>
                    </div>
                    ${m.is_pro ? '<div class="directory-actions"><span class="count-badge">PRO</span></div>' : ''}
                </div>
            `).join('');
        });
    }
};

window.loadBlogContent = function() {
    const container = document.getElementById('blogContent');
    const isAdmin = window.authClient && window.authClient.isSuperAdmin();
    
    container.innerHTML = `
        <style>
            .blog-card {
                background: var(--gray-900);
                border: 2px solid rgba(255,184,0,0.2);
                border-radius: 16px;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .blog-card:hover {
                border-color: var(--gold-primary);
                transform: translateY(-5px);
                box-shadow: 0 20px 60px rgba(255,184,0,0.2);
            }
            
            .blog-card-image {
                width: 100%;
                height: 220px;
                background: linear-gradient(135deg, var(--gray-800), var(--gray-700));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 5rem;
            }
            
            .blog-card-content {
                padding: 2rem;
            }
            
            .blog-card-date {
                font-size: 0.85rem;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 1rem;
            }
            
            .blog-card-title {
                font-family: var(--font-display);
                font-size: 1.5rem;
                color: var(--white);
                margin-bottom: 1rem;
                line-height: 1.3;
            }
            
            .blog-card-excerpt {
                color: var(--gray-400);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .blog-card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1.5rem;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .blog-author {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--gray-400);
                font-size: 0.9rem;
            }
            
            .blog-author-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: var(--gold-primary);
            }
            
            .read-more {
                color: var(--gold-primary);
                font-weight: 600;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: gap 0.3s ease;
            }
            
            .blog-card:hover .read-more {
                gap: 1rem;
            }

            .blog-ai-panel {
                max-width: var(--container-max);
                margin: 0 auto 3rem;
                padding: 2.5rem;
                background: var(--gray-900);
                border: 2px solid rgba(255,184,0,0.3);
                border-radius: 16px;
            }

            .blog-ai-panel h3 {
                font-family: var(--font-display);
                font-size: 1.5rem;
                color: var(--gold-primary);
                margin-bottom: 0.5rem;
            }

            .blog-ai-panel p {
                color: var(--gray-400);
                margin-bottom: 1.5rem;
                font-size: 0.95rem;
            }

            .blog-ai-form {
                display: flex;
                gap: 1rem;
                align-items: stretch;
            }

            .blog-ai-input {
                flex: 1;
                padding: 1rem 1.5rem;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,184,0,0.2);
                color: var(--white);
                border-radius: 12px;
                font-size: 1rem;
                font-family: var(--font-primary);
                outline: none;
            }

            .blog-ai-input:focus {
                border-color: var(--gold-primary);
            }

            .blog-ai-btn {
                padding: 1rem 2rem;
                background: var(--gold-primary);
                color: var(--black);
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            }

            .blog-ai-btn:hover { background: var(--gold-light); }
            .blog-ai-btn:disabled { opacity: 0.5; cursor: not-allowed; }

            .blog-ai-status {
                margin-top: 1rem;
                padding: 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                display: none;
            }

            .blog-ai-status.loading {
                display: block;
                background: rgba(255,184,0,0.08);
                color: var(--gold-primary);
            }

            .blog-ai-status.success {
                display: block;
                background: rgba(5,150,105,0.1);
                color: var(--green-mariachi);
            }

            .blog-ai-status.error {
                display: block;
                background: rgba(220,38,38,0.1);
                color: var(--red-mariachi);
            }

            @media (max-width: 768px) {
                .blog-ai-form { flex-direction: column; }
            }
        </style>
        
        <div class="section-premium">
            <div class="section-header">
                <h1 class="section-title">\u{1F4DD} ${t('blog.title')}</h1>
                <p class="section-subtitle">${t('blog.subtitle')}</p>
            </div>
            
            ${isAdmin ? `
            <div class="blog-ai-panel">
                <h3>\u{1F916} ${t('blog.ai_title')}</h3>
                <p>${t('blog.ai_desc')}</p>
                <div class="blog-ai-form">
                    <input type="text" class="blog-ai-input" id="blogAiTopic" 
                           placeholder="${t('blog.ai_placeholder')}" maxlength="500"
                           onkeydown="if(event.key==='Enter') generateBlogAI()">
                    <button class="blog-ai-btn" id="blogAiBtn" onclick="generateBlogAI()">
                        <i class="fas fa-magic"></i> ${t('blog.ai_generate')}
                    </button>
                </div>
                <div class="blog-ai-status" id="blogAiStatus"></div>
            </div>
            ` : ''}
            
            <div class="cards-grid" id="blogGrid">
                <div style="text-align:center;padding:2rem;color:var(--gray-400);grid-column:1/-1;">Cargando...</div>
            </div>
        </div>
    `;
    
    if (window.API) {
        API.blog().then(data => {
            const grid = document.getElementById('blogGrid');
            if (!grid || !data || !data.posts) return;
            grid.innerHTML = data.posts.map(post => `
                <div class="blog-card">
                    <div class="blog-card-image">${post.icon || '\u{1F4D6}'}</div>
                    <div class="blog-card-content">
                        <p class="blog-card-date">${post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}</p>
                        <h3 class="blog-card-title">${post.title}</h3>
                        <p class="blog-card-excerpt">${post.excerpt || ''}</p>
                        <div class="blog-card-footer">
                            <div class="blog-author">
                                <div class="blog-author-avatar"></div>
                                <span>${post.author_name || ''}</span>
                            </div>
                            <span class="read-more">${t('blog.read_more')} <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </div>
                </div>
            `).join('');
        });
    }
};

// Blog AI Generator function
window.generateBlogAI = async function() {
    const input = document.getElementById('blogAiTopic');
    const btn = document.getElementById('blogAiBtn');
    const status = document.getElementById('blogAiStatus');
    const topic = input.value.trim();
    
    if (!topic) { input.focus(); return; }
    if (!window.authClient || !window.authClient.getToken()) {
        status.className = 'blog-ai-status error';
        status.textContent = t('blog.ai_error_auth');
        return;
    }
    
    btn.disabled = true;
    status.className = 'blog-ai-status loading';
    status.textContent = t('blog.ai_loading');
    
    try {
        const lang = window.i18n ? window.i18n.currentLang : 'es';
        const res = await fetch('/api/blog-ai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.authClient.getToken()
            },
            body: JSON.stringify({ topic, lang })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || 'Error generating article');
        }
        
        status.className = 'blog-ai-status success';
        status.textContent = t('blog.ai_success') + ' "' + data.post.title + '"';
        input.value = '';
        
        // Reload blog posts to show new article
        setTimeout(() => {
            window.app.loadSection('blog');
        }, 2000);
        
    } catch (err) {
        status.className = 'blog-ai-status error';
        status.textContent = t('blog.ai_error') + ': ' + err.message;
    }
    
    btn.disabled = false;
};

window.loadAdminContent = function() {
    if (window.loadAdminPanel) {
        window.loadAdminPanel();
    } else {
        document.getElementById('adminContent').innerHTML = `<div class="section-premium"><h1 class="section-title">👑 ${t('admin.title')}</h1></div>`;
    }
};

// ===================================
// VOTE & FAVORITE SYSTEM
// ===================================

window.openVoteModal = function(songId, songTitle) {
    if (!window.authClient || !window.authClient.isAuthenticated()) {
        window.app.showNotification(t('vote.login_required'), 'error');
        return;
    }

    // Remove existing modal
    const existing = document.getElementById('voteModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'voteModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:2000;';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
        <div style="background:var(--gray-900);border:1px solid rgba(255,184,0,0.3);border-radius:16px;padding:2.5rem;max-width:400px;width:90%;text-align:center;">
            <h3 style="font-family:var(--font-display);color:var(--gold-primary);font-size:1.5rem;margin-bottom:0.5rem;">${t('vote.rate_title')}</h3>
            <p style="color:var(--gray-300);margin-bottom:1.5rem;">${songTitle || ''}</p>
            
            <div id="voteStars" style="display:flex;justify-content:center;gap:0.5rem;margin-bottom:1.5rem;">
                ${[1,2,3,4,5,6,7,8,9,10].map(n => `
                    <button onclick="selectVote(${n})" id="star-${n}" 
                        style="width:36px;height:36px;border-radius:50%;border:2px solid rgba(255,184,0,0.3);background:transparent;color:var(--gray-400);font-size:0.9rem;font-weight:700;cursor:pointer;transition:all 0.2s;"
                        onmouseenter="hoverVote(${n})" onmouseleave="hoverVote(0)">
                        ${n}
                    </button>
                `).join('')}
            </div>
            
            <p id="voteLabel" style="color:var(--gold-primary);font-size:1.2rem;font-weight:700;margin-bottom:1.5rem;min-height:1.5rem;"></p>
            
            <div style="display:flex;gap:1rem;justify-content:center;">
                <button id="voteSubmitBtn" onclick="submitVote('${songId}')" disabled
                    style="padding:0.75rem 2rem;background:var(--gold-primary);color:var(--black);border:none;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer;opacity:0.5;">
                    ${t('vote.submit')}
                </button>
                <button onclick="document.getElementById('voteModal').remove()"
                    style="padding:0.75rem 1.5rem;background:var(--gray-700);color:var(--white);border:none;border-radius:10px;font-size:1rem;cursor:pointer;">
                    ${t('vote.cancel')}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    window._selectedVote = 0;
};

window.hoverVote = function(n) {
    const labels = {
        0: '', 1: '😐', 2: '😐', 3: '🙂', 4: '🙂', 
        5: '😊', 6: '😊', 7: '🤩', 8: '🤩', 9: '🔥', 10: '🔥 ' + t('vote.perfect')
    };
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.getElementById('star-' + i);
        if (!btn) continue;
        if (n > 0) {
            btn.style.background = i <= n ? 'var(--gold-primary)' : 'transparent';
            btn.style.color = i <= n ? 'var(--black)' : 'var(--gray-400)';
            btn.style.borderColor = i <= n ? 'var(--gold-primary)' : 'rgba(255,184,0,0.3)';
        } else if (window._selectedVote > 0) {
            btn.style.background = i <= window._selectedVote ? 'var(--gold-primary)' : 'transparent';
            btn.style.color = i <= window._selectedVote ? 'var(--black)' : 'var(--gray-400)';
            btn.style.borderColor = i <= window._selectedVote ? 'var(--gold-primary)' : 'rgba(255,184,0,0.3)';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--gray-400)';
            btn.style.borderColor = 'rgba(255,184,0,0.3)';
        }
    }
    
    const label = document.getElementById('voteLabel');
    if (label && n > 0) label.textContent = n + '/10 ' + (labels[n] || '');
};

window.selectVote = function(n) {
    window._selectedVote = n;
    hoverVote(n);
    const label = document.getElementById('voteLabel');
    if (label) label.textContent = n + '/10';
    const btn = document.getElementById('voteSubmitBtn');
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
};

window.submitVote = async function(songId) {
    if (!window._selectedVote || !window.authClient) return;
    
    const btn = document.getElementById('voteSubmitBtn');
    if (btn) { btn.disabled = true; btn.textContent = '...'; }
    
    try {
        const res = await fetch('/api/content/songs/' + songId + '/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.authClient.getToken()
            },
            body: JSON.stringify({ score: window._selectedVote })
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Vote failed');
        
        // Update score on the card
        const scoreEl = document.getElementById('score-' + songId);
        if (scoreEl) scoreEl.textContent = data.score_rating;
        
        // Update featured score if it's the same song
        if (window._featuredSongId === songId) {
            const featured = document.getElementById('featuredScore');
            if (featured) featured.textContent = data.score_rating;
        }
        
        // Close modal
        const modal = document.getElementById('voteModal');
        if (modal) modal.remove();
        
        window.app.showNotification(t('vote.success') + ' ' + window._selectedVote + '/10', 'success');
    } catch (err) {
        window.app.showNotification(t('vote.error') + ': ' + err.message, 'error');
        if (btn) { btn.disabled = false; btn.textContent = t('vote.submit'); }
    }
};

window.toggleFavorite = async function(songId) {
    if (!songId) return;
    
    if (!window.authClient || !window.authClient.isAuthenticated()) {
        window.app.showNotification(t('vote.login_required'), 'error');
        return;
    }
    
    try {
        const res = await fetch('/api/content/songs/' + songId + '/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.authClient.getToken()
            }
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Favorite failed');
        
        // Update heart icon
        const favBtn = document.getElementById('fav-' + songId);
        if (favBtn) {
            const icon = favBtn.querySelector('i');
            if (data.favorited) {
                icon.className = 'fas fa-heart';
                favBtn.style.color = 'var(--red-mariachi)';
            } else {
                icon.className = 'far fa-heart';
                favBtn.style.color = '';
            }
        }
        
        // Update featured fav icon
        if (window._featuredSongId === songId) {
            const fIcon = document.getElementById('featuredFavIcon');
            if (fIcon) {
                fIcon.className = data.favorited ? 'fas fa-heart' : 'far fa-heart';
                fIcon.style.color = data.favorited ? 'var(--red-mariachi)' : '';
            }
        }
        
        window.app.showNotification(
            data.favorited ? t('vote.fav_added') : t('vote.fav_removed'), 
            'success'
        );
    } catch (err) {
        window.app.showNotification(t('vote.error'), 'error');
    }
};

// ===================================
// UPLOAD HANDLERS (global)
// ===================================

window.handleUpload = async function(input, type) {
    const file = input.files[0];
    if (!file) return;
    
    if (!window.authClient || !window.authClient.getToken()) {
        alert(t('audios.login_required'));
        return;
    }
    
    const progress = document.getElementById(type + 'Progress');
    const fill = document.getElementById(type + 'ProgressFill');
    const status = document.getElementById(type + 'Status');
    
    if (progress) progress.style.display = 'block';
    if (fill) fill.style.width = '10%';
    if (status) status.textContent = t('upload.uploading') + ' ' + file.name + '...';
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        if (fill) fill.style.width = '50%';
        
        const res = await fetch('/api/uploads/' + type, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + window.authClient.getToken() },
            body: formData
        });
        
        if (fill) fill.style.width = '90%';
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || 'Upload failed');
        }
        
        if (fill) fill.style.width = '100%';
        if (status) {
            status.textContent = '✅ ' + t('upload.success') + ' — ' + file.name;
            status.style.color = 'var(--green-mariachi)';
        }
        
        // Reload section after 2 seconds
        setTimeout(() => {
            if (type === 'audio') window.app.loadSection('audios');
            if (type === 'scores') window.app.loadSection('partituras');
        }, 2000);
        
    } catch (err) {
        if (fill) fill.style.width = '0%';
        if (status) {
            status.textContent = '❌ ' + err.message;
            status.style.color = 'var(--red-mariachi)';
        }
    }
    
    input.value = '';
};

window.setupDropZone = function(zoneId, inputId) {
    const zone = document.getElementById(zoneId);
    if (!zone) return;
    
    ['dragenter', 'dragover'].forEach(evt => {
        zone.addEventListener(evt, (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
        zone.addEventListener(evt, (e) => { e.preventDefault(); zone.classList.remove('dragover'); });
    });
    zone.addEventListener('drop', (e) => {
        const input = document.getElementById(inputId);
        if (input && e.dataTransfer.files.length > 0) {
            input.files = e.dataTransfer.files;
            input.dispatchEvent(new Event('change'));
        }
    });
};

console.log('✅ Premium sections loaded');
