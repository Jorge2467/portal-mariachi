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
                
                <div class="hero-actions reveal-up" style="transition-delay: 200ms;">
                    <button class="btn-primary" onclick="app.loadSection('repertorio')">
                        <i class="fas fa-music"></i> ${t('home.btn_repertorio')}
                    </button>
                    <button class="btn-secondary" onclick="app.loadSection('audios')">
                        <i class="fas fa-play-circle"></i> ${t('home.btn_audios')}
                    </button>
                </div>
                
                <div class="hero-card reveal-up" style="transition-delay: 400ms;">
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
        
        <div class="stats-grid reveal-up" id="homeStats">
            <div class="stat-card reveal-zoom" style="transition-delay: 100ms;">
                <div class="stat-icon">🎵</div>
                <div class="stat-number" id="statSongs">...</div>
                <div class="stat-label">${t('stats.songs')}</div>
            </div>
            <div class="stat-card reveal-zoom" style="transition-delay: 200ms;">
                <div class="stat-icon">🎧</div>
                <div class="stat-number" id="statCollections">...</div>
                <div class="stat-label">${t('stats.audios')}</div>
            </div>
            <div class="stat-card reveal-zoom" style="transition-delay: 300ms;">
                <div class="stat-icon">📄</div>
                <div class="stat-number" id="statMariachis">...</div>
                <div class="stat-label">${t('stats.scores')}</div>
            </div>
            <div class="stat-card reveal-zoom" style="transition-delay: 400ms;">
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

        // Load Destacados section dynamically
        homeLoadDestacados();

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
// DESTACADOS HOME SECTION
// ===================================
function homeLoadDestacados() {
    // Inject the Destacados container after stats-grid
    var statsGrid = document.getElementById('homeStats');
    if (!statsGrid || document.getElementById('homeDestacados')) return;

    var section = document.createElement('div');
    section.id = 'homeDestacados';
    section.className = 'reveal-up';
    section.innerHTML = '<div style="max-width:var(--container-max);margin:0 auto;padding:4rem 2rem;">' +
        '<div style="text-align:center;margin-bottom:2.5rem;">' +
            '<div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,184,0,.08);border:1px solid rgba(255,184,0,.2);padding:.4rem 1.2rem;border-radius:50px;color:var(--gold-primary);font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;margin-bottom:1rem;">' +
            '&#x2726; Destacados del Portal</div>' +
            '<h2 style="font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.8rem);background:linear-gradient(135deg,var(--gold-primary),var(--gold-light),var(--white));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem;">Lo Mejor del Mariachi</h2>' +
            '<p style="color:var(--gray-400);font-size:.95rem;">Selecci&#243;n editorial actualizada en tiempo real</p>' +
        '</div>' +
        '<div id="destCardsGrid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;"></div>' +
    '</div>';
    statsGrid.after(section);

    // Trigger reveal animation
    setTimeout(function() { section.classList.add('visible'); }, 100);

    // Fetch content in parallel
    var token = (JSON.parse(localStorage.getItem('mariachi_session') || '{}')).accessToken;
    var headers = token ? { 'Authorization': 'Bearer ' + token } : {};
    var cards = [];

    Promise.allSettled([
        fetch('/api/content/songs?sort=score_rating&order=DESC&limit=1').then(function(r){return r.json();}),
        fetch('/api/content/blog?limit=1&sort=created_at&order=DESC').then(function(r){return r.json();}),
        fetch('/api/content/partituras?limit=1&sort=created_at&order=DESC').then(function(r){return r.json();}),
        fetch('/api/content/gallery?limit=1&sort=created_at&order=DESC').then(function(r){return r.json();})
    ]).then(function(results) {
        var songsData  = results[0].status === 'fulfilled' ? results[0].value : null;
        var blogData   = results[1].status === 'fulfilled' ? results[1].value : null;
        var scoreData  = results[2].status === 'fulfilled' ? results[2].value : null;
        var galData    = results[3].status === 'fulfilled' ? results[3].value : null;

        // Top song card
        var song = songsData && songsData.songs && songsData.songs[0];
        if (song) {
            cards.push(homeDestCard(
                '&#x1F3B5;',
                'Canci&#243;n Destacada',
                song.title,
                (song.composer || 'Tradicional') + (song.style ? ' &middot; ' + song.style : ''),
                song.score_rating ? song.score_rating + '/10' : null,
                '#repertorio', 'repertorio'
            ));
        }

        // Latest blog post
        var post = blogData && blogData.posts && blogData.posts[0];
        if (post) {
            cards.push(homeDestCard(
                '&#x1F4DD;',
                '&#218;ltimo Art&#237;culo',
                post.title,
                post.excerpt ? post.excerpt.substring(0, 70) + (post.excerpt.length > 70 ? '&#x2026;' : '') : '',
                null,
                '#blog', 'blog'
            ));
        }

        // Latest partitura
        var score = scoreData && scoreData.partituras && scoreData.partituras[0];
        if (score) {
            cards.push(homeDestCard(
                '&#x1F4C4;',
                'Nueva Partitura',
                score.title || score.original_filename,
                (score.composer ? score.composer + ' &middot; ' : '') + (score.file_type || '').toUpperCase(),
                null,
                '#partituras', 'partituras'
            ));
        }

        // Latest gallery image
        var img = galData && galData.images && galData.images[0];
        if (img) {
            cards.push(homeDestCard(
                img.image_url ? null : '&#x1F4F8;',
                'Foto Reciente',
                img.title || 'Sin t&#237;tulo',
                img.category || 'Galer&#237;a',
                null,
                '#gallery', 'gallery',
                img.image_url
            ));
        }

        // Fallback: always show at least "chatbot" card
        if (!cards.length) {
            cards.push(homeDestCard('&#x1F916;', 'Chatbot IA', 'Pregunta sobre Mariachi', 'Potenciado por Gemini 2.0 Flash', null, '#chatbot', 'chatbot'));
        }

        var grid = document.getElementById('destCardsGrid');
        if (grid) grid.innerHTML = cards.join('');
    });
}

function homeDestCard(icon, label, title, sub, badge, href, section, imgUrl) {
    var imgHtml = imgUrl
        ? '<div style="height:120px;overflow:hidden;border-radius:10px 10px 0 0;"><img src="' + imgUrl + '" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>'
        : '<div style="height:90px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:rgba(255,184,0,.04);">' + icon + '</div>';
    return '<div class="dest-card" onclick="app.loadSection(&#39;' + section + '&#39;)">' +
        imgHtml +
        '<div style="padding:1rem 1.1rem 1.1rem;">' +
        '<div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--gold-primary);margin-bottom:.35rem;">' + label + '</div>' +
        '<div style="font-size:.95rem;font-weight:600;color:var(--white);line-height:1.35;margin-bottom:.3rem;">' + title + '</div>' +
        (sub ? '<div style="font-size:.75rem;color:var(--gray-500);line-height:1.4;">' + sub + '</div>' : '') +
        (badge ? '<span style="margin-top:.5rem;display:inline-block;background:var(--gold-primary);color:var(--black);font-size:.65rem;font-weight:800;padding:.15rem .5rem;border-radius:4px;">' + badge + '</span>' : '') +
        '</div></div>';
}

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
            } else {
                grid.innerHTML = `<div style="text-align:center;padding:4rem 2rem;color:var(--gray-400);grid-column:1/-1;">
                    <div style="font-size:3rem;margin-bottom:1rem;opacity:0.5;">🎵</div>
                    <h3 style="color:var(--white);font-family:var(--font-display);font-size:1.5rem;margin-bottom:0.5rem;">Aún no hay canciones</h3>
                    <p>No se encontraron canciones registradas en el servidor.</p>
                </div>`;
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
// ===================================
// AUDIOS SECTION - Full Premium Player
// ===================================
window.loadAudiosContent = function() {
    const container = document.getElementById('audiosContent');
    container.innerHTML = `
        <style>
            .audios-wrap { max-width: var(--container-max); margin: 0 auto; padding: 4rem 2rem; }
            .audios-header { text-align: center; margin-bottom: 2.5rem; }
            .audios-controls { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; align-items: center; }
            .audios-search { flex: 1; min-width: 200px; background: var(--gray-900); border: 1px solid rgba(255,184,0,0.3); border-radius: 10px; padding: 0.75rem 1.25rem; color: var(--white); font-size: 0.95rem; outline: none; }
            .audios-search::placeholder { color: var(--gray-500); }
            .audios-search:focus { border-color: var(--gold-primary); }
            .style-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
            .style-chip { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.25); color: var(--gray-300); padding: 0.4rem 1rem; border-radius: 20px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; white-space: nowrap; }
            .style-chip:hover, .style-chip.active { background: var(--gold-primary); border-color: var(--gold-primary); color: var(--black); font-weight: 600; }
            .audio-track { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.12); border-radius: 14px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; transition: all 0.25s; cursor: pointer; margin-bottom: 0.75rem; }
            .audio-track:hover { border-color: rgba(255,184,0,0.4); background: rgba(255,184,0,0.03); }
            .audio-track.playing { border-color: var(--gold-primary); background: rgba(255,184,0,0.07); }
            .audio-play-btn { width: 44px; height: 44px; border-radius: 50%; background: var(--gold-primary); border: none; color: var(--black); font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.2s; }
            .audio-play-btn:hover { transform: scale(1.1); }
            .audio-track.playing .audio-play-btn { animation: pulse-gold 1.5s infinite; }
            @keyframes pulse-gold { 0%,100% { box-shadow: 0 0 0 0 rgba(255,184,0,0.4); } 50% { box-shadow: 0 0 0 8px rgba(255,184,0,0); } }
            .audio-track-info { flex: 1; min-width: 0; }
            .audio-track-title { color: var(--white); font-weight: 600; font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .audio-track-meta { color: var(--gray-400); font-size: 0.82rem; margin-top: 0.2rem; }
            .audio-track-style { background: rgba(255,184,0,0.1); color: var(--gold-primary); padding: 0.15rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(255,184,0,0.2); }
            .audio-progress-wrap { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.6rem; }
            .audio-progress-bar { flex: 1; height: 4px; background: var(--gray-700); border-radius: 2px; overflow: hidden; }
            .audio-progress-fill { height: 100%; background: var(--gold-primary); width: 0%; transition: width 0.3s linear; }
            .audio-time { color: var(--gray-500); font-size: 0.75rem; font-variant-numeric: tabular-nums; min-width: 60px; text-align: right; }
            .audio-votes { display: flex; align-items: center; gap: 0.5rem; margin-left: auto; flex-shrink: 0; }
            .audio-vote-btn { background: none; border: 1px solid rgba(255,184,0,0.3); border-radius: 8px; color: var(--gray-400); padding: 0.3rem 0.7rem; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
            .audio-vote-btn:hover { background: rgba(255,184,0,0.1); color: var(--gold-primary); border-color: var(--gold-primary); }
            .audios-empty { text-align: center; padding: 4rem 2rem; color: var(--gray-400); }
            .audios-empty i { font-size: 3rem; color: var(--gold-primary); opacity: 0.4; margin-bottom: 1rem; display: block; }
            /* Global sticky mini-player */
            #globalMiniPlayer { display:none; position:fixed; bottom:0; left:0; right:0; background:rgba(10,10,10,0.98); backdrop-filter:blur(24px); border-top:1px solid rgba(255,184,0,0.3); padding:0 2rem; z-index:8888; flex-direction:column; }
            #globalMiniPlayer.visible { display:flex; }
            .gmp-top { display:flex; align-items:center; gap:1.25rem; padding:0.7rem 0 0.3rem; }
            .gmp-info { flex:1; min-width:0; }
            .gmp-title { color:var(--white); font-weight:600; font-size:0.9rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
            .gmp-meta { color:var(--gray-400); font-size:0.72rem; margin-top:0.15rem; }
            .gmp-controls { display:flex; align-items:center; gap:0.5rem; }
            .gmp-btn { background:none; border:none; color:var(--gray-300); font-size:1rem; cursor:pointer; transition:color 0.2s; padding:0.3rem 0.4rem; border-radius:6px; }
            .gmp-btn:hover { color:var(--gold-primary); }
            .gmp-btn.active { color:var(--gold-primary); }
            .gmp-play { background:var(--gold-primary)!important; color:var(--black)!important; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.95rem; flex-shrink:0; }
            .gmp-play:hover { transform:scale(1.07); }
            .gmp-vol-wrap { display:flex; align-items:center; gap:0.4rem; }
            .gmp-vol-slider { -webkit-appearance:none; appearance:none; width:70px; height:3px; border-radius:2px; background: linear-gradient(to right, var(--gold-primary) 80%, var(--gray-700) 80%); cursor:pointer; outline:none; }
            .gmp-vol-slider::-webkit-slider-thumb { -webkit-appearance:none; width:12px; height:12px; border-radius:50%; background:var(--gold-primary); cursor:pointer; }
            .gmp-close { background:none; border:none; color:var(--gray-600); cursor:pointer; font-size:1.1rem; margin-left:0.25rem; padding:0.3rem; }
            .gmp-close:hover { color:var(--gray-300); }
            .gmp-progress-row { display:flex; align-items:center; gap:0.75rem; padding-bottom:0.6rem; }
            .gmp-time { color:var(--gray-500); font-size:0.72rem; font-variant-numeric:tabular-nums; min-width:36px; }
            .gmp-seek { flex:1; -webkit-appearance:none; appearance:none; height:3px; border-radius:2px; background:var(--gray-700); cursor:pointer; outline:none; transition:height 0.15s; }
            .gmp-seek:hover { height:5px; }
            .gmp-seek::-webkit-slider-thumb { -webkit-appearance:none; width:13px; height:13px; border-radius:50%; background:var(--gold-primary); cursor:pointer; }
            /* per-track seek bar */
            .audio-seek { -webkit-appearance:none; appearance:none; flex:1; height:3px; border-radius:2px; background:var(--gray-700); cursor:pointer; outline:none; transition:height 0.15s; }
            .audio-seek:hover { height:5px; }
            .audio-seek::-webkit-slider-thumb { -webkit-appearance:none; width:12px; height:12px; border-radius:50%; background:var(--gold-primary); cursor:pointer; }
        </style>

        <!-- Global Mini Player with full controls -->
        <div id="globalMiniPlayer">
            <div class="gmp-top">
                <div class="gmp-info">
                    <div class="gmp-title" id="miniPlayerTitle">—</div>
                    <div class="gmp-meta" id="miniPlayerMeta">—</div>
                </div>
                <div class="gmp-controls">
                    <button class="gmp-btn" id="gmpShuffleBtn" onclick="audioToggleShuffle()" title="Aleatorio"><i class="fas fa-random"></i></button>
                    <button class="gmp-btn" onclick="audioPlayerPrev()" title="Anterior"><i class="fas fa-step-backward"></i></button>
                    <button class="gmp-btn gmp-play" id="miniPlayBtn" onclick="audioPlayerToggle()"><i class="fas fa-play" id="miniPlayIcon"></i></button>
                    <button class="gmp-btn" onclick="audioPlayerNext()" title="Siguiente"><i class="fas fa-step-forward"></i></button>
                    <button class="gmp-btn" id="gmpRepeatBtn" onclick="audioToggleRepeat()" title="Repetir"><i class="fas fa-redo"></i></button>
                    <div class="gmp-vol-wrap">
                        <button class="gmp-btn" id="gmpMuteBtn" onclick="audioToggleMute()" title="Silenciar"><i class="fas fa-volume-up" id="gmpVolIcon"></i></button>
                        <input type="range" class="gmp-vol-slider" id="gmpVolSlider" min="0" max="1" step="0.02" value="1" oninput="audioSetVolume(this.value)">
                    </div>
                </div>
                <button class="gmp-close" onclick="audioPlayerStop()" title="Cerrar">×</button>
            </div>
            <div class="gmp-progress-row">
                <span class="gmp-time" id="gmpCurrent">0:00</span>
                <input type="range" class="gmp-seek" id="gmpSeek" min="0" max="100" step="0.1" value="0" oninput="audioSeekTo(this.value)">
                <span class="gmp-time" id="gmpDuration">0:00</span>
            </div>
        </div>

        <div class="audios-wrap">
            <div class="audios-header">
                <h1 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,3.5rem);color:var(--gold-primary);">🎧 Audioteca</h1>
                <p style="color:var(--gray-400);font-size:1.1rem;margin-top:0.5rem;">Escucha y comparte música mariachi</p>
            </div>

            <!-- Upload drop zone (Auth only) -->
            ${window.authClient && window.authClient.isAuthenticated() ? `
            <div id="audioDropZone" class="audio-dropzone" onclick="document.getElementById('audioQuickInput').click()" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="handleAudioDrop(event)">
                <i class="fas fa-cloud-upload-alt" style="font-size:2.5rem;color:var(--gold-primary);margin-bottom:0.75rem;display:block;"></i>
                <strong style="color:var(--white);font-size:1.05rem;">Arrastra tu MP3 / WAV aquí</strong>
                <p style="color:var(--gray-500);font-size:0.85rem;margin-top:0.4rem;">o haz click para seleccionar &bull; Máx. 50MB</p>
                <input type="file" id="audioQuickInput" accept="audio/*" style="display:none" onchange="uploadAudioQuick(this.files[0])">
            </div>
            <div id="audioUploadStatus" style="display:none; background:rgba(255,184,0,0.07); border:1px solid rgba(255,184,0,0.3); border-radius:12px; padding:1rem 1.5rem; margin-bottom:1.5rem; display:flex; align-items:center; gap:1rem;">
                <i class="fas fa-spinner fa-spin" style="color:var(--gold-primary);"></i>
                <span id="audioUploadMsg" style="color:var(--gray-300);">Subiendo...</span>
            </div>
            ` : `
            <div style="text-align:center;padding:1.5rem 2rem;background:rgba(255,184,0,0.04);border:1px dashed rgba(255,184,0,0.2);border-radius:12px;margin-bottom:1.5rem;cursor:pointer;" onclick="document.getElementById('loginBtn').click()">
                <i class="fas fa-music" style="color:var(--gold-primary);opacity:0.5;font-size:1.5rem;margin-bottom:0.5rem;display:block;"></i>
                <span style="color:var(--gray-400);font-size:0.9rem;">Inicia sesión para subir tus grabaciones</span>
            </div>
            `}

            <div class="audios-controls">
                <input class="audios-search" id="audioSearch" type="text" placeholder="🔍 Buscar canción o compositor..." oninput="filterAudioList()">
                <span id="audioCount" style="color:var(--gray-500);font-size:0.9rem;white-space:nowrap;"></span>
            </div>
            <div class="style-chips" id="audioStyleChips"></div>
            <div id="audioTrackList"><div class="audios-empty"><i class="fas fa-music"></i><p>Cargando audioteca...</p></div></div>
        </div>
    `;

    // ---- CSS for drop zone ----
    const dzStyle = document.createElement('style');
    dzStyle.textContent = `
        .audio-dropzone { background:var(--gray-900); border:2px dashed rgba(255,184,0,0.35); border-radius:16px; padding:2.5rem 2rem; text-align:center; margin-bottom:1.5rem; cursor:pointer; transition:all 0.25s; }
        .audio-dropzone:hover, .audio-dropzone.drag-over { border-color:var(--gold-primary); background:rgba(255,184,0,0.06); }
        .audio-dropzone.drag-over { transform:scale(1.01); }
    `;
    document.head.appendChild(dzStyle);

    // ---- Upload handler ----
    window.handleAudioDrop = function(e) {
        e.preventDefault();
        document.getElementById('audioDropZone')?.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) uploadAudioQuick(file);
    };

    window.uploadAudioQuick = async function(file) {
        if (!file) return;
        if (!file.type.startsWith('audio/')) {
            alert('Solo se permiten archivos de audio (MP3, WAV, OGG, AAC, M4A)');
            return;
        }
        const statusDiv = document.getElementById('audioUploadStatus');
        const statusMsg = document.getElementById('audioUploadMsg');
        if (statusDiv) statusDiv.style.display = 'flex';
        if (statusMsg) statusMsg.textContent = `Subiendo "${file.name}"... ⏳`;

        const session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
        const token = session.accessToken;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/uploads/audio-quick', {
                method: 'POST',
                headers: token ? { 'Authorization': 'Bearer ' + token } : {},
                body: formData
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error de subida');

            if (statusMsg) statusMsg.innerHTML = `✅ "${data.song.title}" añadida a la audioteca`;
            if (statusDiv) { statusDiv.style.background = 'rgba(0,200,100,0.07)'; statusDiv.style.borderColor = 'rgba(0,200,100,0.3)'; }

            // Add to playlist and re-render
            const newSong = {...data.song, _idx: window._audioPlaylist.length};
            window._audioPlaylist.push(newSong);
            filterAudioList();

            setTimeout(() => { if (statusDiv) statusDiv.style.display = 'none'; }, 3500);
        } catch (err) {
            if (statusMsg) statusMsg.textContent = '❌ ' + err.message;
            setTimeout(() => { if (statusDiv) statusDiv.style.display = 'none'; }, 4000);
        }
    };

    // ---- Player Engine ----
    window._audioPlaylist = [];
    window._audioCurrentIdx = -1;
    window._audioCurrentAudio = null;
    window._audioFilterStyle = 'all';
    window._audioVolume = 1;
    window._audioShuffle = false;
    window._audioRepeat = false;

    window.audioPlayerPlay = function(idx) {
        if (window._audioCurrentAudio) {
            window._audioCurrentAudio.pause();
        }
        // Remove playing class from previous
        document.querySelectorAll('.audio-track.playing').forEach(t => t.classList.remove('playing'));

        const song = window._audioPlaylist[idx];
        if (!song || !song.audio_url) return;
        window._audioCurrentIdx = idx;

        const audio = new Audio(song.audio_url);
        window._audioCurrentAudio = audio;

        // Update mini-player
        const mp = document.getElementById('globalMiniPlayer');
        if (mp) { mp.classList.add('visible'); }
        const titleEl = document.getElementById('miniPlayerTitle');
        const metaEl = document.getElementById('miniPlayerMeta');
        if (titleEl) titleEl.textContent = song.title;
        if (metaEl) metaEl.textContent = (song.composer || '') + (song.style ? ' · ' + song.style : '');
        const miniIcon = document.getElementById('miniPlayIcon');
        if (miniIcon) miniIcon.className = 'fas fa-pause';

        // Update track highlight
        const trackEl = document.getElementById('audio-track-' + idx);
        if (trackEl) {
            trackEl.classList.add('playing');
            const btn = trackEl.querySelector('.audio-play-btn i');
            if (btn) btn.className = 'fas fa-pause';
        }

        // Progress & seek sync
        const fmt = s => String(Math.floor(s/60)).padStart(1,'0') + ':' + String(Math.floor(s%60)).padStart(2,'0');
        audio.addEventListener('timeupdate', () => {
            const pct = audio.duration ? (audio.currentTime / audio.duration * 100) : 0;
            // Per-track seek range
            const seekEl = document.getElementById('seek-' + idx);
            if (seekEl) seekEl.value = pct;
            // Mini-player seek + times
            const gmpSeek = document.getElementById('gmpSeek');
            const gmpCur = document.getElementById('gmpCurrent');
            const gmpDur = document.getElementById('gmpDuration');
            if (gmpSeek && !gmpSeek.matches(':active')) gmpSeek.value = pct;
            if (gmpCur) gmpCur.textContent = fmt(audio.currentTime);
            if (gmpDur) gmpDur.textContent = fmt(audio.duration || 0);
            // Per-track time label
            const timeEl = document.getElementById('time-' + idx);
            if (timeEl) timeEl.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration || 0);
        });
        audio.addEventListener('loadedmetadata', () => {
            const gmpDur = document.getElementById('gmpDuration');
            if (gmpDur) gmpDur.textContent = fmt(audio.duration || 0);
        });
        audio.addEventListener('ended', () => {
            const seekEl = document.getElementById('seek-' + idx);
            if (seekEl) seekEl.value = 0;
            if (trackEl) trackEl.classList.remove('playing');
            const btn = trackEl ? trackEl.querySelector('.audio-play-btn i') : null;
            if (btn) btn.className = 'fas fa-play';
            const miniPlay = document.getElementById('miniPlayIcon');
            if (miniPlay) miniPlay.className = 'fas fa-play';
            // Next: shuffle, repeat, or sequential
            if (window._audioRepeat) {
                audioPlayerPlay(idx);
            } else if (window._audioShuffle) {
                const rnd = Math.floor(Math.random() * window._audioPlaylist.length);
                audioPlayerPlay(rnd);
            } else if (window._audioCurrentIdx < window._audioPlaylist.length - 1) {
                audioPlayerNext();
            }
        });
        audio.volume = window._audioVolume !== undefined ? window._audioVolume : 1;
        audio.play().catch(() => {});
    };

    window.audioPlayerToggle = function() {
        const audio = window._audioCurrentAudio;
        if (!audio) return;
        if (audio.paused) {
            audio.play();
            const miniIcon = document.getElementById('miniPlayIcon');
            if (miniIcon) miniIcon.className = 'fas fa-pause';
        } else {
            audio.pause();
            const miniIcon = document.getElementById('miniPlayIcon');
            if (miniIcon) miniIcon.className = 'fas fa-play';
        }
    };

    window.audioPlayerNext = function() {
        const next = window._audioCurrentIdx + 1;
        if (next < window._audioPlaylist.length) audioPlayerPlay(next);
    };

    window.audioPlayerPrev = function() {
        const prev = window._audioCurrentIdx - 1;
        if (prev >= 0) audioPlayerPlay(prev);
    };

    window.audioPlayerStop = function() {
        if (window._audioCurrentAudio) { window._audioCurrentAudio.pause(); window._audioCurrentAudio = null; }
        const mp = document.getElementById('globalMiniPlayer');
        if (mp) mp.classList.remove('visible');
        document.querySelectorAll('.audio-track.playing').forEach(t => t.classList.remove('playing'));
        window._audioCurrentIdx = -1;
    };

    window.audioSetVolume = function(val) {
        const v = parseFloat(val);
        if (window._audioCurrentAudio) window._audioCurrentAudio.volume = v;
        window._audioVolume = v;
        const icon = document.getElementById('gmpVolIcon');
        const slider = document.getElementById('gmpVolSlider');
        if (slider) slider.style.background = `linear-gradient(to right, var(--gold-primary) ${v*100}%, var(--gray-700) ${v*100}%)`;
        if (icon) icon.className = v === 0 ? 'fas fa-volume-mute' : v < 0.4 ? 'fas fa-volume-down' : 'fas fa-volume-up';
    };

    window.audioToggleMute = function() {
        const audio = window._audioCurrentAudio;
        if (!audio) return;
        audio.muted = !audio.muted;
        const icon = document.getElementById('gmpVolIcon');
        const btn = document.getElementById('gmpMuteBtn');
        if (icon) icon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        if (btn) btn.classList.toggle('active', audio.muted);
    };

    window.audioToggleShuffle = function() {
        window._audioShuffle = !window._audioShuffle;
        const btn = document.getElementById('gmpShuffleBtn');
        if (btn) btn.classList.toggle('active', window._audioShuffle);
    };

    window.audioToggleRepeat = function() {
        window._audioRepeat = !window._audioRepeat;
        const btn = document.getElementById('gmpRepeatBtn');
        if (btn) btn.classList.toggle('active', window._audioRepeat);
    };

    window.audioSeekTo = function(pct) {
        const audio = window._audioCurrentAudio;
        if (!audio || !audio.duration) return;
        audio.currentTime = (pct / 100) * audio.duration;
    };

    window.audioTrackToggle = function(idx) {
        if (window._audioCurrentIdx === idx && window._audioCurrentAudio && !window._audioCurrentAudio.paused) {
            audioPlayerToggle();
            const trackEl = document.getElementById('audio-track-' + idx);
            const btn = trackEl ? trackEl.querySelector('.audio-play-btn i') : null;
            if (btn) btn.className = 'fas fa-play';
        } else {
            audioPlayerPlay(idx);
        }
    };

    window.filterAudioList = function() {
        const q = (document.getElementById('audioSearch')?.value || '').toLowerCase();
        const style = window._audioFilterStyle || 'all';
        const list = window._audioPlaylist;

        const filtered = list.filter(s => {
            const matchQ = !q || s.title.toLowerCase().includes(q) || (s.composer||'').toLowerCase().includes(q);
            const matchStyle = style === 'all' || (s.style||'').toLowerCase() === style.toLowerCase();
            return matchQ && matchStyle;
        });

        const container = document.getElementById('audioTrackList');
        const count = document.getElementById('audioCount');
        if (count) count.textContent = filtered.length + ' canciones';

        if (filtered.length === 0) {
            container.innerHTML = '<div class="audios-empty"><i class="fas fa-search"></i><p>No se encontraron canciones</p></div>';
            return;
        }

        container.innerHTML = filtered.map((s, i) => `
            <div class="audio-track" id="audio-track-${s._idx}" onclick="audioTrackToggle(${s._idx})">
                <button class="audio-play-btn" onclick="event.stopPropagation(); audioTrackToggle(${s._idx})">
                    <i class="fas fa-play"></i>
                </button>
                <div class="audio-track-info">
                    <div class="audio-track-title">${s.title}</div>
                    <div class="audio-track-meta">
                        ${s.composer ? s.composer + ' &bull; ' : ''}
                        ${s.style ? '<span class="audio-track-style">' + s.style + '</span>' : ''}
                    </div>
                    <div class="audio-progress-wrap">
                        <span class="audio-time" id="time-cur-${s._idx}">0:00</span>
                        <input type="range" class="audio-seek" id="seek-${s._idx}" min="0" max="100" step="0.1" value="0"
                            onclick="event.stopPropagation()"
                            oninput="event.stopPropagation(); audioSeekTo(this.value)">
                        <span class="audio-time" id="time-${s._idx}">0:00</span>
                    </div>
                </div>
                <span style="color:var(--gray-600);font-size:0.75rem;min-width:28px;text-align:right;">${s.score_rating ? '⭐ ' + s.score_rating : ''}</span>
            </div>
        `).join('');
    };

    if (window.API) {
        API.get('/songs?limit=100').then(data => {
            const list = document.getElementById('audioTrackList');
            const chips = document.getElementById('audioStyleChips');
            if (!data || !data.songs) return;

            const withAudio = data.songs.filter(s => s.audio_url).map((s, i) => ({...s, _idx: i}));
            window._audioPlaylist = withAudio;

            if (withAudio.length === 0) {
                list.innerHTML = '<div class="audios-empty"><i class="fas fa-music"></i><p>No hay audios en la biblioteca aún.<br><small>El administrador puede añadir audio_url a cada canción.</small></p></div>';
                return;
            }

            // Build style chips
            const styles = ['Todos', ...new Set(withAudio.map(s => s.style).filter(Boolean))];
            chips.innerHTML = styles.map(st => `
                <span class="style-chip ${st==='Todos'?'active':''}" onclick="selectAudioStyle('${st}', this)">${st}</span>
            `).join('');

            window.selectAudioStyle = function(style, el) {
                document.querySelectorAll('.style-chip').forEach(c => c.classList.remove('active'));
                el.classList.add('active');
                window._audioFilterStyle = style === 'Todos' ? 'all' : style;
                filterAudioList();
            };

            filterAudioList();
        });
    }
};


// ===================================
// PARTITURAS SECTION — Full Library
// ===================================
window.loadPartiturasContent = function() {
    const container = document.getElementById('partiturasContent');
    const isAuth = window.authClient && window.authClient.isAuthenticated();
    const isAdmin = window.authClient && window.authClient.isSuperAdmin && window.authClient.isSuperAdmin();

    container.innerHTML = `
    <style>
        .parti-wrap { max-width: var(--container-max); margin: 0 auto; padding: 2rem; }
        .parti-header { text-align: center; margin-bottom: 2rem; padding-top: 1rem; }
        .parti-header h1 { font-family: var(--font-display); font-size: clamp(2rem,5vw,3.5rem); color: var(--gold-primary); }
        .parti-header p  { color: var(--gray-400); margin-top: .4rem; }

        /* Upload Zone */
        .parti-dropzone { border: 2px dashed rgba(255,184,0,0.35); border-radius: 16px; padding: 2.5rem; text-align: center; cursor: pointer; background: rgba(255,184,0,0.03); transition: all .3s; margin-bottom: 1.5rem; }
        .parti-dropzone.drag-over { border-color: var(--gold-primary); background: rgba(255,184,0,0.08); }
        .parti-dropzone i { font-size: 2.5rem; color: var(--gold-primary); opacity: .7; }
        .parti-dropzone p { color: var(--gray-400); margin: .5rem 0 0; font-size: .9rem; }
        .parti-dropzone small { color: var(--gray-600); font-size: .78rem; display: block; margin-top: .25rem; }
        .parti-upload-btn { margin-top: 1rem; padding: .65rem 2rem; background: var(--gold-primary); color: var(--black); border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: none; }
        .parti-upload-btn:disabled { opacity: .5; cursor: not-allowed; }
        .parti-file-list { margin-top: .75rem; text-align: left; max-height: 160px; overflow-y: auto; }
        .parti-file-item { display: flex; align-items: center; gap: .5rem; padding: .3rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: .82rem; color: var(--gray-400); }
        .parti-file-item i { color: var(--gold-primary); width: 18px; text-align: center; }
        .parti-progress-bar { width: 100%; height: 4px; background: var(--gray-800); border-radius: 2px; margin-top: .75rem; display: none; }
        .parti-progress-fill { height: 100%; background: var(--gold-primary); border-radius: 2px; transition: width .3s; width: 0%; }
        .parti-progress-label { font-size: .78rem; color: var(--gray-500); margin-top: .3rem; text-align: center; }

        /* Controls bar */
        .parti-controls { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; margin-bottom: 1.5rem; }
        .parti-search { flex: 1; min-width: 200px; padding: .65rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,184,0,0.2); color: var(--white); border-radius: 8px; font-size: .9rem; }
        .parti-search:focus { outline: none; border-color: var(--gold-primary); }
        .parti-chips { display: flex; gap: .4rem; flex-wrap: wrap; }
        .parti-chip { padding: .35rem .9rem; border-radius: 20px; border: 1px solid rgba(255,184,0,0.3); background: transparent; color: var(--gray-400); cursor: pointer; font-size: .78rem; transition: all .2s; }
        .parti-chip.active, .parti-chip:hover { background: var(--gold-primary); border-color: var(--gold-primary); color: var(--black); font-weight: 600; }
        .parti-sort-btn { padding: .4rem .85rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,184,0,0.2); color: var(--gray-300); border-radius: 8px; cursor: pointer; font-size: .82rem; white-space: nowrap; }
        .parti-sort-btn:hover { border-color: var(--gold-primary); color: var(--gold-primary); }
        .parti-count { color: var(--gray-500); font-size: .82rem; margin-left: auto; white-space: nowrap; }

        /* Grid */
        .parti-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
        .parti-card { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.12); border-radius: 12px; padding: 1.25rem; transition: all .3s; display: flex; flex-direction: column; gap: .5rem; }
        .parti-card:hover { border-color: rgba(255,184,0,0.4); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.4); }
        .parti-card-top { display: flex; align-items: flex-start; gap: .75rem; }
        .parti-type-icon { width: 44px; height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
        .parti-type-icon.pdf   { background: rgba(220,53,69,0.15); }
        .parti-type-icon.image { background: rgba(13,110,253,0.15); }
        .parti-type-icon.sibelius { background: rgba(111,66,193,0.15); }
        .parti-card-title { color: var(--white); font-weight: 600; font-size: .95rem; line-height: 1.3; }
        .parti-card-meta  { color: var(--gray-500); font-size: .78rem; margin-top: .1rem; }
        .parti-badges { display: flex; gap: .4rem; flex-wrap: wrap; margin-top: .25rem; }
        .parti-badge { padding: .18rem .55rem; border-radius: 20px; font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; }
        .parti-badge.pdf   { background: rgba(220,53,69,0.2); color: #f87171; }
        .parti-badge.image { background: rgba(13,110,253,0.2); color: #60a5fa; }
        .parti-badge.sibelius { background: rgba(111,66,193,0.2); color: #c084fc; }
        .parti-badge.style { background: rgba(255,184,0,0.12); color: var(--gold-primary); }
        .parti-card-actions { display: flex; gap: .5rem; margin-top: auto; padding-top: .5rem; border-top: 1px solid rgba(255,255,255,0.05); }
        .parti-btn { flex: 1; padding: .45rem .5rem; border-radius: 6px; border: none; cursor: pointer; font-size: .78rem; font-weight: 600; transition: all .2s; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: .3rem; }
        .parti-btn-view { background: rgba(255,184,0,0.1); color: var(--gold-primary); }
        .parti-btn-view:hover { background: var(--gold-primary); color: var(--black); }
        .parti-btn-edit { background: rgba(255,255,255,0.05); color: var(--gray-400); }
        .parti-btn-edit:hover { background: rgba(255,255,255,0.1); color: var(--white); }
        .parti-btn-del { background: rgba(220,53,69,0.1); color: #f87171; }
        .parti-btn-del:hover { background: rgba(220,53,69,0.25); }

        /* Pagination */
        .parti-pagination { display: flex; align-items: center; justify-content: center; gap: .5rem; margin-top: 2rem; }
        .parti-page-btn { padding: .4rem .85rem; border: 1px solid rgba(255,184,0,0.2); background: transparent; color: var(--gray-400); border-radius: 6px; cursor: pointer; font-size: .82rem; }
        .parti-page-btn:hover, .parti-page-btn.active { background: var(--gold-primary); border-color: var(--gold-primary); color: var(--black); font-weight: 700; }
        .parti-page-btn:disabled { opacity: .3; cursor: not-allowed; }

        /* Empty state */
        .parti-empty { text-align: center; padding: 4rem 2rem; color: var(--gray-500); }
        .parti-empty i { font-size: 3rem; color: var(--gold-primary); opacity: .3; display: block; margin-bottom: 1rem; }

        @media(max-width:768px) {
            .parti-controls { flex-direction: column; align-items: stretch; }
            .parti-grid { grid-template-columns: 1fr; }
        }
    </style>

    <div class="parti-wrap">
        <div class="parti-header">
            <h1>🎼 Partituras</h1>
            <p>Biblioteca de partituras • PDF · Imágenes · Sibelius</p>
        </div>

        ${isAuth ? `
        <div class="parti-dropzone" id="partiDropzone">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Arrastra tus partituras aquí o <strong style="color:var(--gold-primary)">haz clic para seleccionar</strong></p>
            <small>PDF · PNG · JPG · SIB · MUS — hasta 50 archivos · 20MB por fichero</small>
            <input type="file" id="partiFileInput" multiple accept=".pdf,.png,.jpg,.jpeg,.webp,.sib,.mus" style="display:none">
            <div class="parti-file-list" id="partiFileList"></div>
            <button class="parti-upload-btn" id="partiUploadBtn" onclick="partiBatchUpload()">
                <i class="fas fa-upload"></i> Subir partituras
            </button>
            <div class="parti-progress-bar" id="partiProgressBar">
                <div class="parti-progress-fill" id="partiProgressFill"></div>
            </div>
            <div class="parti-progress-label" id="partiProgressLabel"></div>
        </div>
        ` : `<p style="text-align:center;color:var(--gray-500);margin-bottom:1.5rem;">
            <a href="#" onclick="app.showAuthModal()" style="color:var(--gold-primary)">Inicia sesión</a> para subir partituras
        </p>`}

        <div class="parti-controls">
            <input class="parti-search" id="partiSearch" placeholder="Buscar título o compositor..." oninput="partiFilter()">
            <div class="parti-chips" id="partiTypeChips">
                <button class="parti-chip active" onclick="partiSetType('',this)">Todos</button>
                <button class="parti-chip" onclick="partiSetType('pdf',this)">📄 PDF</button>
                <button class="parti-chip" onclick="partiSetType('image',this)">🖼️ Imagen</button>
                <button class="parti-chip" onclick="partiSetType('sibelius',this)">🎼 Sibelius</button>
            </div>
            <button class="parti-sort-btn" id="partiSortBtn" onclick="partiToggleSort()">🔠 A → Z</button>
            <span class="parti-count" id="partiCount">Cargando...</span>
        </div>

        <div class="parti-grid" id="partiGrid">
            <div class="parti-empty"><i class="fas fa-spinner fa-spin"></i><p>Cargando partituras...</p></div>
        </div>
        <div class="parti-pagination" id="partiPagination"></div>
    </div>
    `;

    // --- State ---
    window._partiState = { type: '', search: '', sort: 'title', order: 'ASC', page: 0, pageSize: 48, total: 0 };
    partiLoadData();

    // --- Drag & Drop ---
    if (isAuth) {
        const dz = document.getElementById('partiDropzone');
        const inp = document.getElementById('partiFileInput');
        dz.addEventListener('click', e => { if (e.target !== document.getElementById('partiUploadBtn')) inp.click(); });
        dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
        dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
        dz.addEventListener('drop', e => {
            e.preventDefault(); dz.classList.remove('drag-over');
            partiHandleFiles(Array.from(e.dataTransfer.files));
        });
        inp.addEventListener('change', () => partiHandleFiles(Array.from(inp.files)));
    }
};

function partiHandleFiles(files) {
    window._partiPendingFiles = files;
    const list = document.getElementById('partiFileList');
    const btn = document.getElementById('partiUploadBtn');
    if (!files.length) return;

    const typeIcon = { pdf: '📄', png: '🖼️', jpg: '🖼️', jpeg: '🖼️', webp: '🖼️', sib: '🎼', mus: '🎼' };
    list.innerHTML = files.map(f => {
        const ext = f.name.split('.').pop().toLowerCase();
        return `<div class="parti-file-item"><i>${typeIcon[ext] || '📂'}</i>${f.name} <span style="margin-left:auto;color:var(--gray-600)">${(f.size/1024/1024).toFixed(1)}MB</span></div>`;
    }).join('');
    btn.textContent = `⬆ Subir ${files.length} fichero${files.length > 1 ? 's' : ''}`;
    btn.style.display = 'inline-block';
}

window.partiBatchUpload = async function() {
    const files = window._partiPendingFiles;
    if (!files || !files.length) return;
    const btn = document.getElementById('partiUploadBtn');
    const bar = document.getElementById('partiProgressBar');
    const fill = document.getElementById('partiProgressFill');
    const label = document.getElementById('partiProgressLabel');
    const session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    const token = session.accessToken;

    btn.disabled = true; bar.style.display = 'block';
    const fd = new FormData();
    files.forEach(f => fd.append('files', f));

    label.textContent = `Subiendo ${files.length} fichero${files.length > 1 ? 's' : ''}...`;
    fill.style.width = '30%';

    try {
        const res = await fetch('/api/uploads/scores-batch', {
            method: 'POST',
            headers: token ? { 'Authorization': 'Bearer ' + token } : {},
            body: fd
        });
        fill.style.width = '90%';
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error de servidor');

        fill.style.width = '100%';
        label.textContent = `✅ ${data.uploaded} subida${data.uploaded > 1 ? 's' : ''}${data.errors > 0 ? ` · ⚠️ ${data.errors} error${data.errors > 1 ? 'es' : ''}` : ''}`;
        window.app && window.app.showNotification(`${data.uploaded} partitura${data.uploaded > 1 ? 's' : ''} guardada${data.uploaded > 1 ? 's' : ''}`, 'success');

        document.getElementById('partiFileList').innerHTML = '';
        btn.style.display = 'none';
        window._partiPendingFiles = [];
        setTimeout(() => { bar.style.display = 'none'; fill.style.width = '0%'; label.textContent = ''; }, 3000);
        partiLoadData();
    } catch (err) {
        fill.style.width = '100%'; fill.style.background = '#ef4444';
        label.textContent = '❌ Error: ' + err.message;
        btn.disabled = false;
    }
};

window.partiLoadData = function() {
    const s = window._partiState;
    const params = new URLSearchParams({
        sort: s.sort, order: s.order,
        limit: s.pageSize, offset: s.page * s.pageSize,
        ...(s.search ? { search: s.search } : {}),
        ...(s.type   ? { file_type: s.type } : {})
    });

    fetch('/api/content/partituras?' + params)
        .then(r => r.json())
        .then(data => {
            s.total = data.total || 0;
            document.getElementById('partiCount').textContent = s.total + ' partitura' + (s.total !== 1 ? 's' : '');
            partiRenderGrid(data.partituras || []);
            partiRenderPagination();
        })
        .catch(() => {
            document.getElementById('partiGrid').innerHTML = '<div class="parti-empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando partituras</p></div>';
        });
};

function partiRenderGrid(items) {
    const grid = document.getElementById('partiGrid');
    const isAdmin = window.authClient && window.authClient.isSuperAdmin && window.authClient.isSuperAdmin();

    if (!items.length) {
        grid.innerHTML = '<div class="parti-empty"><i class="fas fa-music"></i><p>No hay partituras. ¡Sé el primero en subir!</p></div>';
        return;
    }

    const typeIcons = { pdf: '📄', image: '🖼️', sibelius: '🎼' };
    const typeBadge = { pdf: 'PDF', image: 'IMG', sibelius: 'SIB' };

    grid.innerHTML = items.map(p => `
        <div class="parti-card">
            <div class="parti-card-top">
                <div class="parti-type-icon ${p.file_type}">${typeIcons[p.file_type] || '📂'}</div>
                <div style="flex:1;min-width:0;">
                    <div class="parti-card-title">${p.title}</div>
                    <div class="parti-card-meta">${p.composer || ''}</div>
                </div>
            </div>
            <div class="parti-badges">
                <span class="parti-badge ${p.file_type}">${typeBadge[p.file_type] || p.file_type.toUpperCase()}</span>
                ${p.style ? `<span class="parti-badge style">${p.style}</span>` : ''}
                ${p.instrument ? `<span class="parti-badge style" style="opacity:.7">${p.instrument}</span>` : ''}
            </div>
            <div class="parti-card-actions">
                ${p.file_type !== 'sibelius' ? `
                <a class="parti-btn parti-btn-view" href="${p.file_url}" target="_blank" rel="noopener">
                    <i class="fas fa-eye"></i> Ver
                </a>` : ''}
                <a class="parti-btn parti-btn-view" href="${p.file_url}" download="${p.original_filename || p.title}">
                    <i class="fas fa-download"></i> Descargar
                </a>
                ${isAdmin ? `
                <button class="parti-btn parti-btn-edit" onclick="partiEditModal('${p.id}','${p.title.replace(/'/g,"\\'")}','${p.composer||''}','${p.style||''}','${p.instrument||''}')">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="parti-btn parti-btn-del" onclick="partiDelete('${p.id}')">
                    <i class="fas fa-trash"></i>
                </button>` : ''}
            </div>
        </div>
    `).join('');
}

function partiRenderPagination() {
    const s = window._partiState;
    const pages = Math.ceil(s.total / s.pageSize);
    const pg = document.getElementById('partiPagination');
    if (pages <= 1) { pg.innerHTML = ''; return; }

    let html = `<button class="parti-page-btn" ${s.page===0?'disabled':''} onclick="partiGoPage(${s.page-1})">◀</button>`;
    for (let i = 0; i < pages; i++) {
        if (i < 3 || i > pages - 3 || Math.abs(i - s.page) <= 1) {
            html += `<button class="parti-page-btn ${i===s.page?'active':''}" onclick="partiGoPage(${i})">${i+1}</button>`;
        } else if (Math.abs(i - s.page) === 2) html += '<span style="color:var(--gray-600);padding:0 .25rem">…</span>';
    }
    html += `<button class="parti-page-btn" ${s.page>=pages-1?'disabled':''} onclick="partiGoPage(${s.page+1})">▶</button>`;
    pg.innerHTML = html;
}

window.partiGoPage = function(p) { window._partiState.page = p; partiLoadData(); document.getElementById('partiGrid').scrollIntoView({behavior:'smooth', block:'start'}); };
window.partiFilter = function() { window._partiState.search = document.getElementById('partiSearch').value; window._partiState.page = 0; partiLoadData(); };
window.partiSetType = function(type, el) {
    window._partiState.type = type; window._partiState.page = 0;
    document.querySelectorAll('.parti-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    partiLoadData();
};
window.partiToggleSort = function() {
    const s = window._partiState;
    s.order = s.order === 'ASC' ? 'DESC' : 'ASC';
    document.getElementById('partiSortBtn').textContent = s.order === 'ASC' ? '🔠 A → Z' : '🔡 Z → A';
    s.page = 0; partiLoadData();
};

window.partiDelete = async function(id) {
    if (!confirm('¿Eliminar esta partitura permanentemente?')) return;
    const session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    const token = session.accessToken;
    const res = await fetch('/api/content/partituras/' + id, {
        method: 'DELETE', headers: token ? { 'Authorization': 'Bearer ' + token } : {}
    });
    if (res.ok) { window.app && window.app.showNotification('Partitura eliminada', 'success'); partiLoadData(); }
    else window.app && window.app.showNotification('Error al eliminar', 'error');
};

window.partiEditModal = function(id, title, composer, style, instrument) {
    const existing = document.getElementById('partiEditModal');
    if (existing) existing.remove();
    const m = document.createElement('div');
    m.id = 'partiEditModal';
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;';
    m.innerHTML = `
    <div style="background:#111;border:1px solid rgba(255,184,0,.3);border-radius:16px;padding:2rem;width:100%;max-width:480px;">
        <h3 style="color:var(--gold-primary);margin-bottom:1.25rem;">✏️ Editar Partitura</h3>
        <div style="display:flex;flex-direction:column;gap:.75rem;">
            <input id="peTitle" value="${title}" placeholder="Título" style="padding:.65rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,184,0,.2);color:#fff;border-radius:8px;">
            <input id="peComposer" value="${composer}" placeholder="Compositor" style="padding:.65rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,184,0,.2);color:#fff;border-radius:8px;">
            <input id="peStyle" value="${style}" placeholder="Estilo (Ranchera, Son...)" style="padding:.65rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,184,0,.2);color:#fff;border-radius:8px;">
            <input id="peInstrument" value="${instrument}" placeholder="Instrumento" style="padding:.65rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,184,0,.2);color:#fff;border-radius:8px;">
        </div>
        <div style="display:flex;gap:.75rem;margin-top:1.25rem;">
            <button onclick="partiEditSave('${id}')" style="flex:1;padding:.65rem;background:var(--gold-primary);border:none;border-radius:8px;font-weight:700;cursor:pointer;">Guardar</button>
            <button onclick="document.getElementById('partiEditModal').remove()" style="padding:.65rem 1.25rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);color:#fff;border-radius:8px;cursor:pointer;">Cancelar</button>
        </div>
    </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
};

window.partiEditSave = async function(id) {
    const session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    const token = session.accessToken;
    const body = {
        title: document.getElementById('peTitle').value,
        composer: document.getElementById('peComposer').value,
        style: document.getElementById('peStyle').value,
        instrument: document.getElementById('peInstrument').value
    };
    const res = await fetch('/api/content/partituras/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': 'Bearer ' + token } : {}) },
        body: JSON.stringify(body)
    });
    document.getElementById('partiEditModal')?.remove();
    if (res.ok) { window.app && window.app.showNotification('Guardado', 'success'); partiLoadData(); }
    else window.app && window.app.showNotification('Error al guardar', 'error');
};


// ===================================
// VIDEOS SECTION (YouTube Player)
// ===================================
window.loadVideosContent = function() {
    const container = document.getElementById('videosContent');
    const isAdmin = window.authClient && (window.authClient.isSuperAdmin() || (window.authClient.user && window.authClient.user.email.toLowerCase().includes('jorge')));

    const mariachVideos = [
        { id: 'nM5IF_83kMs', title: 'Mariachi Vargas - El Son de la Negra', cat: 'Clásico' },
        { id: 'VnDqBfcfBRs', title: 'Cielito Lindo - Mariachi en Plaza Garibaldi', cat: 'Tradicional' },
        { id: 'M_j2fM3Eya0', title: 'El Rey - Vicente Fernández', cat: 'Ranchera' },
        { id: 'Ga7doeIu0sg', title: 'Amor Eterno - Juan Gabriel & Rocío Dúrcal', cat: 'Balada' },
        { id: 'K8R0jVkMCws', title: 'Volver Volver - Vicente Fernández', cat: 'Ranchera' },
        { id: 'UScN8tGEBQY', title: 'La Bikina - Luis Miguel', cat: 'Bolero' },
        { id: 'P-GvNhPEkm0', title: 'Cucurrucucú Paloma - Caetano Veloso', cat: 'Internacional' },
        { id: '4v3dF67wLYo', title: 'Sabor a Mí - Los Panchos', cat: 'Bolero' },
    ];

    container.innerHTML = `
        <style>
            .videos-section { max-width: var(--container-max); margin: 0 auto; padding: 2rem; }
            .videos-header { text-align: center; margin-bottom: 2.5rem; padding-top: 1rem; }
            .videos-header h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); color: var(--gold-primary); }
            .videos-header p { color: var(--gray-400); font-size: 1.1rem; margin-top: 0.5rem; }

            .video-player-area { margin-bottom: 2.5rem; }
            .video-player-container { position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 16px; overflow: hidden; background: var(--black); border: 2px solid rgba(255,184,0,0.2); }
            .video-player-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
            .video-player-title { margin-top: 1rem; font-family: var(--font-display); font-size: 1.3rem; color: var(--white); }
            .video-player-cat { font-size: 0.85rem; color: var(--gold-primary); margin-top: 0.25rem; }

            .video-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
            .video-thumb { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.12); border-radius: 12px; overflow: hidden; cursor: pointer; transition: all 0.3s; }
            .video-thumb:hover { border-color: var(--gold-primary); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255,184,0,0.1); }
            .video-thumb.active { border-color: var(--gold-primary); box-shadow: 0 0 0 2px var(--gold-primary); }
            .video-thumb-img { position: relative; width: 100%; padding-bottom: 56.25%; background: var(--gray-800); }
            .video-thumb-img img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
            .video-thumb-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 48px; height: 48px; background: rgba(255,184,0,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            .video-thumb-play i { color: var(--black); font-size: 1.2rem; margin-left: 3px; }
            .video-thumb-info { padding: 1rem; }
            .video-thumb-title { color: var(--white); font-size: 0.9rem; font-weight: 600; line-height: 1.4; }
            .video-thumb-cat { color: var(--gray-500); font-size: 0.75rem; margin-top: 0.25rem; }

            .video-add-panel { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
            .video-add-panel h3 { color: var(--gold-primary); font-size: 1.1rem; margin-bottom: 1rem; }
            .video-add-form { display: flex; gap: 0.75rem; }
            .video-add-form input { flex: 1; padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,184,0,0.2); color: var(--white); border-radius: 8px; font-size: 0.95rem; }
            .video-add-form input:focus { outline: none; border-color: var(--gold-primary); }
            .video-add-form button { padding: 0.75rem 1.5rem; background: var(--gold-primary); color: var(--black); border: none; border-radius: 8px; font-weight: 700; cursor: pointer; white-space: nowrap; }

            @media (max-width: 768px) {
                .video-list { grid-template-columns: 1fr; }
                .video-add-form { flex-direction: column; }
            }
        </style>

        <div class="videos-section">
            <div class="videos-header">
                <h1>${t('videos.page_title')}</h1>
                <p>${t('videos.page_subtitle')}</p>
            </div>

            <div class="video-player-area">
                <div class="video-player-container" id="videoPlayer">
                    <iframe id="ytPlayer" src="https://www.youtube.com/embed/${mariachVideos[0].id}?rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
                <div class="video-player-title" id="videoTitle">${mariachVideos[0].title}</div>
                <div class="video-player-cat" id="videoCat">${mariachVideos[0].cat}</div>
            </div>

            ${isAdmin ? `
            <div class="video-add-panel">
                <h3>➕ ${t('videos.add_title')}</h3>
                <div class="video-add-form">
                    <input id="videoUrlInput" placeholder="${t('videos.add_placeholder')}" type="text">
                    <input id="videoNameInput" placeholder="${t('videos.add_name')}" type="text">
                    <button onclick="addCustomVideo()">${t('videos.add_btn')}</button>
                </div>
            </div>
            ` : ''}

            <h2 style="font-family:var(--font-display);color:var(--white);font-size:1.3rem;margin-bottom:1.25rem;">${t('videos.playlist')}</h2>
            <div class="video-list" id="videoList"></div>
        </div>
    `;

    // ---- Load from DB first, then fallback to static list ----
    const defaultVideos = [
        { id: 'nM5IF_83kMs', title: 'Mariachi Vargas - El Son de la Negra', cat: 'Clásico' },
        { id: 'VnDqBfcfBRs', title: 'Cielito Lindo - Mariachi en Plaza Garibaldi', cat: 'Tradicional' },
        { id: 'M_j2fM3Eya0', title: 'El Rey - Vicente Fernández', cat: 'Ranchera' },
        { id: 'Ga7doeIu0sg', title: 'Amor Eterno - Juan Gabriel & Rocío Dúrcal', cat: 'Balada' },
        { id: 'K8R0jVkMCws', title: 'Volver Volver - Vicente Fernández', cat: 'Ranchera' },
    ];

    window._videoList = [...defaultVideos];

    // Fetch videos saved to DB
    if (window.API) {
        API.get('/songs?hasVideo=true&limit=100&sort=created_at&order=DESC').then(data => {
            if (data && data.songs && data.songs.length > 0) {
                const dbVideos = data.songs.map(s => {
                    // Extract YouTube ID from video_url
                    const match = (s.video_url || '').match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
                    const ytId = match ? match[1] : s.video_url;
                    return { id: ytId, title: s.title, cat: s.style || 'Video', dbId: s.id };
                }).filter(v => v.id && v.id.length === 11);

                if (dbVideos.length > 0) {
                    // DB videos first, then default static ones
                    window._videoList = [...dbVideos, ...defaultVideos];
                }
            }
            renderVideoList();
            // Auto-play first
            const first = window._videoList[0];
            if (first) {
                const player = document.getElementById('ytPlayer');
                const titleEl = document.getElementById('videoTitle');
                const catEl = document.getElementById('videoCat');
                if (player) player.src = `https://www.youtube.com/embed/${first.id}?rel=0`;
                if (titleEl) titleEl.textContent = first.title;
                if (catEl) catEl.textContent = first.cat;
            }
        }).catch(() => renderVideoList());
    } else {
        renderVideoList();
    }
};

function renderVideoList() {
    const list = document.getElementById('videoList');
    if (!list) return;

    list.innerHTML = window._videoList.map((v, i) => `
        <div class="video-thumb ${i === 0 ? 'active' : ''}" onclick="playVideo('${v.id}', '${v.title.replace(/'/g, "\\'")}', '${v.cat}', this)">
            <div class="video-thumb-img">
                <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="${v.title}" loading="lazy">
                <div class="video-thumb-play"><i class="fas fa-play"></i></div>
            </div>
            <div class="video-thumb-info">
                <div class="video-thumb-title">${v.title}</div>
                <div class="video-thumb-cat">${v.cat}</div>
            </div>
        </div>
    `).join('');
}

window.playVideo = function(id, title, cat, el) {
    const player = document.getElementById('ytPlayer');
    const titleEl = document.getElementById('videoTitle');
    const catEl = document.getElementById('videoCat');

    if (player) player.src = 'https://www.youtube.com/embed/' + id + '?rel=0&autoplay=1';
    if (titleEl) titleEl.textContent = title;
    if (catEl) catEl.textContent = cat;

    document.querySelectorAll('.video-thumb').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addCustomVideo = async function() {
    const urlInput = document.getElementById('videoUrlInput');
    const nameInput = document.getElementById('videoNameInput');
    const url = urlInput.value.trim();
    const name = nameInput.value.trim() || 'Video personalizado';

    // Extract YouTube ID
    let videoId = '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    if (match) videoId = match[1];

    if (!videoId) {
        window.app.showNotification(t('videos.invalid_url'), 'error');
        return;
    }

    // Save to DB so it persists on refresh
    try {
        const session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
        const token = session.accessToken;
        const res = await fetch('/api/content/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': 'Bearer ' + token } : {}) },
            body: JSON.stringify({ title: name, video_url: url, style: 'Video' })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error guardando');

        // Add to top of list with DB id
        window._videoList.unshift({ id: videoId, title: name, cat: 'Video', dbId: data.song?.id });
        renderVideoList();
        playVideo(videoId, name, 'Video', document.querySelector('.video-thumb'));
        urlInput.value = '';
        nameInput.value = '';
        window.app.showNotification('✅ Video guardado en la videoteca', 'success');
    } catch (err) {
        // Still add to UI even if DB fails
        window._videoList.unshift({ id: videoId, title: name, cat: 'Personalizado' });
        renderVideoList();
        playVideo(videoId, name, 'Personalizado', document.querySelector('.video-thumb'));
        urlInput.value = '';
        nameInput.value = '';
        window.app.showNotification('⚠️ Video añadido (sin guardar: ' + err.message + ')', 'warning');
    }
};

// ===================================
// GALLERY SECTION — Full Photo Library
// ===================================
window.loadGalleryContent = function() {
    const container = document.getElementById('galleryContent');
    const isAuth = window.authClient && window.authClient.isAuthenticated();

    container.innerHTML = `
    <style>
        .gal-wrap { max-width: var(--container-max); margin: 0 auto; padding: 2rem; }
        .gal-header { text-align: center; margin-bottom: 2rem; padding-top: 1rem; }
        .gal-header h1 { font-family: var(--font-display); font-size: clamp(2rem,5vw,3.5rem); color: var(--gold-primary); }
        .gal-header p  { color: var(--gray-400); margin-top: .4rem; }

        /* Upload */
        .gal-dropzone { border: 2px dashed rgba(255,184,0,0.35); border-radius: 16px; padding: 2rem; text-align: center; cursor: pointer; background: rgba(255,184,0,0.03); transition: all .3s; margin-bottom: 1.5rem; }
        .gal-dropzone.drag-over { border-color: var(--gold-primary); background: rgba(255,184,0,0.08); }
        .gal-dropzone i { font-size: 2rem; color: var(--gold-primary); opacity: .7; }
        .gal-dropzone p { color: var(--gray-400); margin: .4rem 0 0; font-size: .9rem; }
        .gal-dropzone small { color: var(--gray-600); font-size: .75rem; }
        .gal-upload-row { display: flex; gap: .75rem; align-items: center; margin-top: .75rem; flex-wrap: wrap; justify-content: center; }
        .gal-cat-input { padding: .55rem .9rem; background: rgba(255,255,255,.06); border: 1px solid rgba(255,184,0,.2); color: var(--white); border-radius: 8px; font-size: .85rem; width: 180px; }
        .gal-upload-btn { padding: .55rem 1.5rem; background: var(--gold-primary); color: var(--black); border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: none; }
        .gal-upload-btn:disabled { opacity: .5; cursor: not-allowed; }
        .gal-preview-strip { display: flex; gap: .4rem; flex-wrap: wrap; margin-top: .75rem; max-height: 80px; overflow: hidden; }
        .gal-preview-thumb { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,184,0,.2); }
        .gal-progress-bar { width: 100%; height: 4px; background: var(--gray-800); border-radius: 2px; margin-top: .6rem; display: none; }
        .gal-progress-fill { height: 100%; background: var(--gold-primary); border-radius: 2px; transition: width .3s; width: 0%; }
        .gal-progress-label { font-size: .75rem; color: var(--gray-500); text-align: center; margin-top: .25rem; }

        /* Controls */
        .gal-controls { display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; margin-bottom: 1.5rem; }
        .gal-search { flex: 1; min-width: 180px; padding: .6rem 1rem; background: rgba(255,255,255,.05); border: 1px solid rgba(255,184,0,.2); color: var(--white); border-radius: 8px; font-size: .9rem; }
        .gal-search:focus { outline: none; border-color: var(--gold-primary); }
        .gal-chips { display: flex; gap: .35rem; flex-wrap: wrap; }
        .gal-chip { padding: .3rem .8rem; border-radius: 20px; border: 1px solid rgba(255,184,0,.25); background: transparent; color: var(--gray-400); cursor: pointer; font-size: .76rem; transition: all .2s; }
        .gal-chip.active, .gal-chip:hover { background: var(--gold-primary); border-color: var(--gold-primary); color: var(--black); font-weight: 600; }
        .gal-sort-btn { padding: .35rem .75rem; background: rgba(255,255,255,.05); border: 1px solid rgba(255,184,0,.2); color: var(--gray-300); border-radius: 8px; cursor: pointer; font-size: .8rem; }
        .gal-count { color: var(--gray-500); font-size: .8rem; margin-left: auto; }

        /* Grid */
        .gal-grid { columns: 4 200px; gap: 1rem; }
        .gal-item { break-inside: avoid; margin-bottom: 1rem; border-radius: 10px; overflow: hidden; position: relative; cursor: pointer; border: 1px solid rgba(255,184,0,.1); transition: all .3s; }
        .gal-item:hover { border-color: rgba(255,184,0,.4); transform: scale(1.02); box-shadow: 0 8px 24px rgba(0,0,0,.5); }
        .gal-item img { width: 100%; display: block; }
        .gal-item-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: .75rem; background: linear-gradient(transparent 40%, rgba(0,0,0,.85)); opacity: 0; transition: opacity .3s; }
        .gal-item:hover .gal-item-overlay { opacity: 1; }
        .gal-item-title { color: #fff; font-size: .82rem; font-weight: 600; }
        .gal-item-cat { color: var(--gold-primary); font-size: .7rem; }
        .gal-item-del { position: absolute; top: .4rem; right: .4rem; width: 26px; height: 26px; background: rgba(220,53,69,.85); border: none; border-radius: 50%; color: #fff; cursor: pointer; font-size: .75rem; display: none; align-items: center; justify-content: center; }
        .gal-item:hover .gal-item-del { display: flex; }

        /* Pagination */
        .gal-pagination { display: flex; align-items: center; justify-content: center; gap: .5rem; margin-top: 2rem; }
        .gal-page-btn { padding: .35rem .75rem; border: 1px solid rgba(255,184,0,.2); background: transparent; color: var(--gray-400); border-radius: 6px; cursor: pointer; font-size: .8rem; }
        .gal-page-btn.active, .gal-page-btn:hover { background: var(--gold-primary); border-color: var(--gold-primary); color: var(--black); font-weight: 700; }
        .gal-page-btn:disabled { opacity: .3; cursor: not-allowed; }

        /* Lightbox */
        .gal-lb { position: fixed; inset: 0; background: rgba(0,0,0,.95); z-index: 9000; display: flex; align-items: center; justify-content: center; }
        .gal-lb-img { max-width: 90vw; max-height: 88vh; border-radius: 8px; object-fit: contain; box-shadow: 0 24px 80px rgba(0,0,0,.8); }
        .gal-lb-close { position: absolute; top: 1rem; right: 1.5rem; font-size: 2rem; color: #fff; cursor: pointer; opacity: .7; }
        .gal-lb-close:hover { opacity: 1; }
        .gal-lb-prev, .gal-lb-next { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,.1); border: none; color: #fff; font-size: 1.5rem; padding: .75rem 1rem; cursor: pointer; border-radius: 8px; transition: background .2s; }
        .gal-lb-prev { left: 1rem; } .gal-lb-next { right: 1rem; }
        .gal-lb-prev:hover, .gal-lb-next:hover { background: rgba(255,184,0,.3); }
        .gal-lb-info { position: absolute; bottom: 1rem; text-align: center; width: 100%; color: var(--gray-400); font-size: .85rem; }
        .gal-lb-del { position: absolute; top: 1rem; left: 1.5rem; background: rgba(220,53,69,.8); border: none; color: #fff; padding: .35rem .85rem; border-radius: 8px; cursor: pointer; font-size: .8rem; display: none; }

        .gal-empty { text-align: center; padding: 4rem 2rem; color: var(--gray-500); }
        .gal-empty i { font-size: 3rem; color: var(--gold-primary); opacity: .25; display: block; margin-bottom: 1rem; }

        @media(max-width:768px) { .gal-grid { columns: 2 140px; } }
    </style>

    <div class="gal-wrap">
        <div class="gal-header">
            <h1>📸 Galería</h1>
            <p>Fotos e imágenes del Mariachi México Madeira</p>
        </div>

        ${isAuth ? `
        <div class="gal-dropzone" id="galDropzone">
            <i class="fas fa-camera"></i>
            <p>Arrastra fotos aquí o <strong style="color:var(--gold-primary)">haz clic para seleccionar</strong></p>
            <small>JPG · PNG · WEBP · GIF — hasta 30 fotos · 10MB por imagen</small>
            <input type="file" id="galFileInput" multiple accept="image/*" style="display:none">
            <div class="gal-preview-strip" id="galPreviewStrip"></div>
            <div class="gal-upload-row">
                <input class="gal-cat-input" id="galCategory" placeholder="Categoría (ej. Concierto)" list="galCatList">
                <datalist id="galCatList"></datalist>
                <button class="gal-upload-btn" id="galUploadBtn" onclick="galBatchUpload()">
                    <i class="fas fa-upload"></i> <span id="galBtnLabel">Subir</span>
                </button>
            </div>
            <div class="gal-progress-bar" id="galProgressBar"><div class="gal-progress-fill" id="galProgressFill"></div></div>
            <div class="gal-progress-label" id="galProgressLabel"></div>
        </div>
        ` : `<p style="text-align:center;color:var(--gray-500);margin-bottom:1.5rem;">
            <a href="#" onclick="app.showAuthModal()" style="color:var(--gold-primary)">Inicia sesión</a> para subir fotos
        </p>`}

        <!-- Tab Strip -->
        <div style="display:flex;gap:.5rem;margin-bottom:1.5rem;border-bottom:1px solid rgba(255,184,0,.15);padding-bottom:.5rem;">
            <button id="galTabPhotos" class="gal-tab" onclick="galShowPhotosTab()"
                style="padding:.45rem 1.1rem;border:none;background:transparent;color:var(--gold-primary);font-weight:700;cursor:pointer;border-bottom:2px solid var(--gold-primary);font-size:.9rem;">&#128247; Fotos</button>
            <button id="galTabAlbums" class="gal-tab" onclick="galShowAlbums()"
                style="padding:.45rem 1.1rem;border:none;background:transparent;color:var(--gray-400);font-weight:600;cursor:pointer;border-bottom:2px solid transparent;font-size:.9rem;">&#128194; &#193;lbumes</button>
        </div>

        <div id="galTabContent">
            <div class="gal-controls">
                <input class="gal-search" id="galSearch" placeholder="Buscar..." oninput="galFilter()">
                <div class="gal-chips" id="galCatChips">
                    <button class="gal-chip active" onclick="galSetCat('all',this)">Todas</button>
                </div>
                <button class="gal-sort-btn" id="galSortBtn" onclick="galToggleSort()">&#x1F550; Recientes</button>
                <span class="gal-count" id="galCount">Cargando...</span>
            </div>

            <div class="gal-grid" id="galGrid">
                <div class="gal-empty"><i class="fas fa-spinner fa-spin"></i><p>Cargando galer&#237;a...</p></div>
            </div>
            <div class="gal-pagination" id="galPagination"></div>
        </div>
    </div>
    `;

    window._galState = { cat: 'all', search: '', sort: 'created_at', order: 'DESC', page: 0, pageSize: 40, total: 0 };
    window._galImages = [];
    galLoadCategories();
    galLoadData();

    if (isAuth) {
        const dz = document.getElementById('galDropzone');
        const inp = document.getElementById('galFileInput');
        dz.addEventListener('click', e => { if (!['BUTTON','INPUT'].includes(e.target.tagName) && e.target.id !== 'galBtnLabel') inp.click(); });
        dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
        dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
        dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('drag-over'); galHandleFiles(Array.from(e.dataTransfer.files)); });
        inp.addEventListener('change', () => galHandleFiles(Array.from(inp.files)));
    }
};

function galHandleFiles(files) {
    if (!files.length) return;
    window._galPendingFiles = files;
    const strip = document.getElementById('galPreviewStrip');
    const btn = document.getElementById('galUploadBtn');
    const lbl = document.getElementById('galBtnLabel');
    strip.innerHTML = files.slice(0, 12).map(f => {
        const url = URL.createObjectURL(f);
        return `<img class="gal-preview-thumb" src="${url}">`;
    }).join('') + (files.length > 12 ? `<span style="color:var(--gray-500);font-size:.8rem;align-self:center;">+${files.length-12} más</span>` : '');
    lbl.textContent = `Subir ${files.length} foto${files.length > 1 ? 's' : ''}`;
    btn.style.display = 'inline-block';
}

window.galBatchUpload = async function() {
    const files = window._galPendingFiles;
    if (!files || !files.length) return;
    const btn = document.getElementById('galUploadBtn');
    const bar = document.getElementById('galProgressBar');
    const fill = document.getElementById('galProgressFill');
    const label = document.getElementById('galProgressLabel');
    const cat = document.getElementById('galCategory').value.trim() || 'General';
    const session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    const token = session.accessToken;

    btn.disabled = true; bar.style.display = 'block';
    const fd = new FormData();
    files.forEach(f => fd.append('files', f));
    fd.append('category', cat);
    label.textContent = `Subiendo ${files.length} imagen${files.length > 1 ? 'es' : ''}...`;
    fill.style.width = '25%';

    try {
        const res = await fetch('/api/uploads/gallery-batch', {
            method: 'POST',
            headers: token ? { 'Authorization': 'Bearer ' + token } : {},
            body: fd
        });
        fill.style.width = '90%';
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error de servidor');
        fill.style.width = '100%';
        label.textContent = `✅ ${data.uploaded} subida${data.uploaded > 1 ? 's' : ''}${data.errors > 0 ? ` · ⚠️ ${data.errors} error${data.errors > 1 ? 'es' : ''}` : ''}`;
        window.app && window.app.showNotification(`${data.uploaded} foto${data.uploaded > 1 ? 's' : ''} guardada${data.uploaded > 1 ? 's' : ''}`, 'success');
        document.getElementById('galPreviewStrip').innerHTML = '';
        btn.style.display = 'none';
        window._galPendingFiles = [];
        setTimeout(() => { bar.style.display = 'none'; fill.style.width = '0%'; label.textContent = ''; }, 3000);
        galLoadCategories();
        galLoadData();
    } catch (err) {
        fill.style.background = '#ef4444'; fill.style.width = '100%';
        label.textContent = '❌ ' + err.message;
        btn.disabled = false;
    }
};

function galLoadCategories() {
    fetch('/api/content/gallery/categories')
        .then(r => r.json())
        .then(data => {
            const chips = document.getElementById('galCatChips');
            const datalist = document.getElementById('galCatList');
            if (!chips) return;
            const active = window._galState.cat;
            let html = `<button class="gal-chip ${active === 'all' ? 'active' : ''}" onclick="galSetCat('all',this)">Todas</button>`;
            (data.categories || []).forEach(c => {
                html += `<button class="gal-chip ${active === c.category ? 'active' : ''}" onclick="galSetCat('${c.category}',this)">${c.category} <span style="opacity:.6">(${c.count})</span></button>`;
            });
            chips.innerHTML = html;
            if (datalist) datalist.innerHTML = (data.categories || []).map(c => `<option value="${c.category}">`).join('');
        }).catch(() => {});
}

window.galLoadData = function() {
    const s = window._galState;
    const params = new URLSearchParams({
        sort: s.sort, order: s.order, limit: s.pageSize, offset: s.page * s.pageSize,
        ...(s.search ? { search: s.search } : {}),
        ...(s.cat && s.cat !== 'all' ? { category: s.cat } : {})
    });
    fetch('/api/content/gallery?' + params)
        .then(r => r.json())
        .then(data => {
            s.total = data.total || 0;
            window._galImages = data.images || [];
            document.getElementById('galCount').textContent = s.total + ' foto' + (s.total !== 1 ? 's' : '');
            galRenderGrid(window._galImages);
            galRenderPagination();
        })
        .catch(() => {
            document.getElementById('galGrid').innerHTML = '<div class="gal-empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando galería</p></div>';
        });
};

function galRenderGrid(images) {
    const grid = document.getElementById('galGrid');
    const userId = window.authClient && window.authClient.user ? window.authClient.user.id : null;
    const isAdmin = window.authClient && window.authClient.isSuperAdmin && window.authClient.isSuperAdmin();

    if (!images.length) {
        grid.innerHTML = '<div class="gal-empty"><i class="fas fa-camera"></i><p>No hay fotos aún. ¡Sé el primero en subir!</p></div>';
        return;
    }

    grid.innerHTML = images.map((img, idx) => {
        const canDel = isAdmin || (userId && img.uploaded_by === userId);
        return `
        <div class="gal-item" onclick="galOpenLightbox(${idx})">
            <img src="${img.image_url}" alt="${img.title || ''}" loading="lazy">
            <div class="gal-item-overlay">
                <div class="gal-item-title">${img.title || 'Sin título'}</div>
                <div class="gal-item-cat">${img.category || ''}</div>
            </div>
            ${canDel ? `<button class="gal-item-del" onclick="event.stopPropagation();galDelete('${img.id}')">✕</button>` : ''}
        </div>`;
    }).join('');
}

window.galOpenLightbox = function(idx) {
    const existing = document.getElementById('galLightbox');
    if (existing) existing.remove();
    const imgs = window._galImages;
    let cur = idx;
    const isAdmin = window.authClient && window.authClient.isSuperAdmin && window.authClient.isSuperAdmin();
    const userId = window.authClient && window.authClient.user ? window.authClient.user.id : null;

    function render() {
        const img = imgs[cur];
        lb.innerHTML = `
            <span class="gal-lb-close" onclick="document.getElementById('galLightbox').remove()">✕</span>
            ${(isAdmin || (userId && img.uploaded_by === userId)) ? `<button class="gal-lb-del" id="galLbDel" onclick="galDelete('${img.id}', true)" style="display:block">🗑️ Eliminar</button>` : ''}
            <button class="gal-lb-prev" onclick="event.stopPropagation();galLbGo(-1)" ${cur===0?'disabled':''}>‹</button>
            <img class="gal-lb-img" src="${img.image_url}" alt="${img.title || ''}">
            <button class="gal-lb-next" onclick="event.stopPropagation();galLbGo(1)" ${cur===imgs.length-1?'disabled':''}>›</button>
            <div class="gal-lb-info">${img.title || 'Sin título'} ${img.category ? '· ' + img.category : ''} · ${cur+1}/${imgs.length}</div>
        `;
    }

    const lb = document.createElement('div');
    lb.id = 'galLightbox'; lb.className = 'gal-lb';
    lb.onclick = e => { if (e.target === lb) lb.remove(); };
    document.body.appendChild(lb);
    render();

    window.galLbGo = d => {
        cur = Math.max(0, Math.min(imgs.length - 1, cur + d));
        render();
    };

    const keyHandler = e => {
        if (!document.getElementById('galLightbox')) { document.removeEventListener('keydown', keyHandler); return; }
        if (e.key === 'ArrowLeft') galLbGo(-1);
        if (e.key === 'ArrowRight') galLbGo(1);
        if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', keyHandler); }
    };
    document.addEventListener('keydown', keyHandler);
};

window.galDelete = async function(id, fromLightbox = false) {
    if (!confirm('¿Eliminar esta foto permanentemente?')) return;
    const session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    const token = session.accessToken;
    const res = await fetch('/api/content/gallery/' + id, {
        method: 'DELETE', headers: token ? { 'Authorization': 'Bearer ' + token } : {}
    });
    if (res.ok) {
        if (fromLightbox) document.getElementById('galLightbox')?.remove();
        window.app && window.app.showNotification('Foto eliminada', 'success');
        galLoadData();
    } else window.app && window.app.showNotification('Error al eliminar', 'error');
};

window.galFilter = function() { window._galState.search = document.getElementById('galSearch').value; window._galState.page = 0; galLoadData(); };
window.galSetCat = function(cat, el) {
    window._galState.cat = cat; window._galState.page = 0;
    document.querySelectorAll('.gal-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active'); galLoadData();
};
window.galToggleSort = function() {
    const s = window._galState;
    const modes = [['created_at','DESC','🕐 Recientes'], ['created_at','ASC','🕐 Antiguas'], ['title','ASC','🔠 A → Z']];
    const cur = modes.findIndex(m => m[0] === s.sort && m[1] === s.order);
    const next = modes[(cur + 1) % modes.length];
    s.sort = next[0]; s.order = next[1]; s.page = 0;
    document.getElementById('galSortBtn').textContent = next[2];
    galLoadData();
};

function galRenderPagination() {
    const s = window._galState;
    const pages = Math.ceil(s.total / s.pageSize);
    const pg = document.getElementById('galPagination');
    if (!pg || pages <= 1) { if (pg) pg.innerHTML = ''; return; }
    let html = `<button class="gal-page-btn" ${s.page===0?'disabled':''} onclick="galGoPage(${s.page-1})">◀</button>`;
    for (let i = 0; i < pages; i++) {
        if (i < 3 || i > pages - 3 || Math.abs(i - s.page) <= 1) {
            html += `<button class="gal-page-btn ${i===s.page?'active':''}" onclick="galGoPage(${i})">${i+1}</button>`;
        } else if (Math.abs(i - s.page) === 2) html += '<span style="color:var(--gray-600);padding:0 .25rem">…</span>';
    }
    html += `<button class="gal-page-btn" ${s.page>=pages-1?'disabled':''} onclick="galGoPage(${s.page+1})">▶</button>`;
    pg.innerHTML = html;
}
window.galGoPage = function(p) { window._galState.page = p; galLoadData(); document.getElementById('galGrid')?.scrollIntoView({behavior:'smooth', block:'start'}); };

// ===================================
// GALLERY PHOTO TAB (restore photo view)
// ===================================
window.galShowPhotosTab = function() {
    document.querySelectorAll('.gal-tab').forEach(function(t) {
        t.style.color = 'var(--gray-400)';
        t.style.borderBottom = '2px solid transparent';
        t.style.fontWeight = '600';
    });
    var tab = document.getElementById('galTabPhotos');
    if (tab) {
        tab.style.color = 'var(--gold-primary)';
        tab.style.borderBottom = '2px solid var(--gold-primary)';
        tab.style.fontWeight = '700';
    }
    var tc = document.getElementById('galTabContent');
    if (!tc) return;
    tc.innerHTML = '<div class="gal-controls">' +
        '<input class="gal-search" id="galSearch" placeholder="Buscar..." oninput="galFilter()">' +
        '<div class="gal-chips" id="galCatChips"><button class="gal-chip active" onclick="galSetCat(\'all\',this)">Todas</button></div>' +
        '<button class="gal-sort-btn" id="galSortBtn" onclick="galToggleSort()">&#x1F550; Recientes</button>' +
        '<span class="gal-count" id="galCount">Cargando...</span>' +
        '</div>' +
        '<div class="gal-grid" id="galGrid"><div class="gal-empty"><i class="fas fa-spinner fa-spin"></i><p>Cargando galer&#237;a...</p></div></div>' +
        '<div class="gal-pagination" id="galPagination"></div>';
    galLoadCategories();
    galLoadData();
};

// ===================================
// ALBUMS TAB (gallery sub-section)
// ===================================
window.galShowAlbums = function() {
    var container = document.getElementById('galTabContent');
    if (!container) return;
    var isAuth = window.authClient && window.authClient.isAuthenticated();
    var isAdmin = window.authClient && window.authClient.isSuperAdmin && window.authClient.isSuperAdmin();
    document.querySelectorAll('.gal-tab').forEach(function(t) {
        t.style.color = 'var(--gray-400)';
        t.style.borderBottom = '2px solid transparent';
        t.style.fontWeight = '600';
    });
    var ta = document.getElementById('galTabAlbums');
    if (ta) { ta.style.color = 'var(--gold-primary)'; ta.style.borderBottom = '2px solid var(--gold-primary)'; ta.style.fontWeight = '700'; }
    container.innerHTML = '<div style="margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;">' +
        (isAuth ? '<button onclick="galCreateAlbumModal()" style="padding:.55rem 1.25rem;background:var(--gold-primary);color:var(--black);border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:.9rem;">+ Crear &#193;lbum</button>' : '') +
        (isAdmin ? '<button onclick="galAdminAlbums()" style="padding:.55rem 1.25rem;background:rgba(255,184,0,.1);border:1px solid rgba(255,184,0,.3);color:var(--gold-primary);border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem;">&#x1F6E1;&#xFE0F; Revisar pendientes</button>' : '') +
        '<span id="albumCount" style="color:var(--gray-500);font-size:.82rem;margin-left:auto;"></span>' +
        '</div>' +
        '<div id="albumGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;">' +
        '<div class="gal-empty"><i class="fas fa-spinner fa-spin"></i><p>Cargando &#225;lbumes...</p></div>' +
        '</div>';
    galLoadAlbums();
};

function galLoadAlbums() {
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    fetch('/api/content/albums?limit=50', { headers: token ? { 'Authorization': 'Bearer ' + token } : {} })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        var el = document.getElementById('albumCount');
        if (el) el.textContent = data.total + ' \u00e1lbum' + (data.total !== 1 ? 'es' : '');
        galRenderAlbums(data.albums || []);
    })
    .catch(function() {
        var g = document.getElementById('albumGrid');
        if (g) g.innerHTML = '<div class="gal-empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando \u00e1lbumes</p></div>';
    });
}

function galRenderAlbums(albums) {
    var grid = document.getElementById('albumGrid');
    if (!grid) return;
    var isAdmin = window.authClient && window.authClient.isSuperAdmin && window.authClient.isSuperAdmin();
    var userId = window.authClient && window.authClient.user ? window.authClient.user.id : null;
    if (!albums.length) {
        grid.innerHTML = '<div class="gal-empty"><i class="fas fa-images"></i><p>No hay \u00e1lbumes a\u00fan. \u00a1Crea el primero!</p></div>';
        return;
    }
    var badges = {
        approved: '<span style="background:rgba(34,197,94,.15);color:#4ade80;padding:.15rem .5rem;border-radius:10px;font-size:.7rem;font-weight:700;">&#x2705; Aprobado</span>',
        pending:  '<span style="background:rgba(234,179,8,.15);color:#facc15;padding:.15rem .5rem;border-radius:10px;font-size:.7rem;font-weight:700;">&#x1F7E1; Pendiente</span>',
        rejected: '<span style="background:rgba(239,68,68,.15);color:#f87171;padding:.15rem .5rem;border-radius:10px;font-size:.7rem;font-weight:700;">&#x274C; Rechazado</span>'
    };
    grid.innerHTML = albums.map(function(a) {
        var isOwn = a.created_by === userId;
        var canManage = isAdmin || isOwn;
        return '<div style="background:var(--gray-900);border:1px solid rgba(255,184,0,' + (a.status === 'approved' ? '.2' : '.08') + ');border-radius:14px;overflow:hidden;cursor:pointer;" onclick="galOpenAlbum(\'' + a.id + '\')">'+
            '<div style="width:100%;height:160px;background:var(--gray-800);position:relative;overflow:hidden;">'+
            (a.cover_url ? '<img src="' + a.cover_url + '" style="width:100%;height:100%;object-fit:cover;" loading="lazy">' : '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--gray-600);font-size:3rem;">&#x1F5BC;&#xFE0F;</div>') +
            '<div style="position:absolute;top:.5rem;right:.5rem;">' + (badges[a.status] || '') + '</div>'+
            '</div><div style="padding:1rem;">'+
            '<div style="color:var(--white);font-weight:600;font-size:.95rem;margin-bottom:.25rem;">' + a.title + '</div>'+
            '<div style="color:var(--gray-500);font-size:.75rem;margin-bottom:.5rem;">' + (a.creator_name || '') + ' &middot; ' + (a.photo_count || 0) + ' foto' + (a.photo_count != 1 ? 's' : '') + '</div>'+
            (a.description ? '<div style="color:var(--gray-400);font-size:.8rem;line-height:1.4;">' + a.description + '</div>' : '') +
            (a.status === 'rejected' && a.reject_reason ? '<div style="margin-top:.5rem;font-size:.75rem;color:#f87171;">&#x21A9; ' + a.reject_reason + '</div>' : '') +
            (canManage ? '<div style="display:flex;gap:.4rem;margin-top:.75rem;" onclick="event.stopPropagation()">'+
                ((isOwn || isAdmin) ? '<button onclick="galOpenAlbum(\'' + a.id + '\')" style="flex:1;padding:.35rem;background:rgba(255,184,0,.1);border:1px solid rgba(255,184,0,.25);color:var(--gold-primary);border-radius:6px;cursor:pointer;font-size:.75rem;font-weight:600;">&#x1F4F7; Fotos</button>' : '') +
                (isAdmin && a.status === 'pending' ?
                    '<button onclick="galReviewAlbum(\'' + a.id + '\',\'approve\')" style="flex:1;padding:.35rem;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:#4ade80;border-radius:6px;cursor:pointer;font-size:.75rem;font-weight:600;">&#x2705; Aprobar</button>'+
                    '<button onclick="galReviewAlbum(\'' + a.id + '\',\'reject\')" style="flex:1;padding:.35rem;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:6px;cursor:pointer;font-size:.75rem;font-weight:600;">&#x274C; Rechazar</button>' : '') +
                '<button onclick="galDeleteAlbum(\'' + a.id + '\')" style="padding:.35rem .6rem;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:6px;cursor:pointer;font-size:.75rem;">&#x1F5D1;</button>'+
            '</div>' : '') +
            '</div></div>';
    }).join('');
}

window.galCreateAlbumModal = function() {
    var m = document.createElement('div');
    m.id = 'albumCreateModal';
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;';
    m.innerHTML = '<div style="background:#111;border:1px solid rgba(255,184,0,.3);border-radius:16px;padding:2rem;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;">'+
        '<h3 style="color:var(--gold-primary);margin-bottom:1.25rem;font-size:1.2rem;">&#x1F4C2; Crear Nuevo &#193;lbum</h3>'+
        '<p style="color:var(--gray-500);font-size:.82rem;margin-bottom:1.25rem;">El &#225;lbum quedar&#225; <strong style="color:#facc15">pendiente de aprobaci&#243;n</strong> hasta que el administrador lo revise.</p>'+
        '<div style="display:flex;flex-direction:column;gap:.75rem;">'+
        '<input id="albumTitle" placeholder="T&#237;tulo del &#225;lbum *" maxlength="200" style="padding:.7rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,184,0,.2);color:#fff;border-radius:8px;">'+
        '<textarea id="albumDesc" placeholder="Descripci&#243;n (opcional)" rows="3" style="padding:.7rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,184,0,.2);color:#fff;border-radius:8px;resize:vertical;font-family:inherit;"></textarea>'+
        '<label style="color:var(--gray-400);font-size:.82rem;">URL de portada (opcional)<input id="albumCover" placeholder="https://..." style="margin-top:.25rem;width:100%;box-sizing:border-box;padding:.7rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,184,0,.2);color:#fff;border-radius:8px;"></label>'+
        '</div>'+
        '<div style="display:flex;gap:.75rem;margin-top:1.25rem;">'+
        '<button onclick="galSubmitCreateAlbum()" style="flex:1;padding:.7rem;background:var(--gold-primary);border:none;border-radius:8px;font-weight:700;cursor:pointer;">Enviar para aprobaci&#243;n</button>'+
        '<button onclick="document.getElementById(\'albumCreateModal\').remove()" style="padding:.7rem 1.25rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);color:#fff;border-radius:8px;cursor:pointer;">Cancelar</button>'+
        '</div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', function(e) { if (e.target === m) m.remove(); });
};

window.galSubmitCreateAlbum = async function() {
    var title = document.getElementById('albumTitle').value.trim();
    var description = document.getElementById('albumDesc').value.trim();
    var cover_url = document.getElementById('albumCover').value.trim();
    if (!title) { document.getElementById('albumTitle').style.borderColor = '#ef4444'; return; }
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    try {
        var res = await fetch('/api/content/albums', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ title: title, description: description || null, cover_url: cover_url || null })
        });
        var data = await res.json();
        if (!res.ok) throw new Error(data.error);
        document.getElementById('albumCreateModal').remove();
        window.app && window.app.showNotification('\u1F7E1 \u00c1lbum enviado - esperando aprobaci\u00f3n del admin', 'success');
        galLoadAlbums();
    } catch(err) { window.app && window.app.showNotification('Error: ' + err.message, 'error'); }
};

window.galReviewAlbum = async function(id, action) {
    var reason = null;
    if (action === 'reject') {
        reason = prompt('Motivo del rechazo (opcional):');
        if (reason === null) return;
    }
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    try {
        var res = await fetch('/api/content/albums/' + id + '/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ action: action, reason: reason })
        });
        var data = await res.json();
        if (!res.ok) throw new Error(data.error);
        window.app && window.app.showNotification(action === 'approve' ? '\u2705 \u00c1lbum aprobado' : '\u274c \u00c1lbum rechazado', 'success');
        galLoadAlbums();
    } catch(err) { window.app && window.app.showNotification('Error: ' + err.message, 'error'); }
};

window.galAdminAlbums = function() {
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    fetch('/api/content/albums?status=pending&limit=50', { headers: token ? { 'Authorization': 'Bearer ' + token } : {} })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (!data.total) { window.app && window.app.showNotification('No hay \u00e1lbumes pendientes', 'success'); return; }
        var el = document.getElementById('albumCount');
        if (el) el.textContent = data.total + ' pendiente' + (data.total !== 1 ? 's' : '');
        galRenderAlbums(data.albums || []);
    });
};

window.galDeleteAlbum = async function(id) {
    if (!confirm('\u00bfEliminar este \u00e1lbum? Las fotos no se eliminar\u00e1n.')) return;
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    var res = await fetch('/api/content/albums/' + id, { method: 'DELETE', headers: token ? { 'Authorization': 'Bearer ' + token } : {} });
    if (res.ok) { window.app && window.app.showNotification('\u00c1lbum eliminado', 'success'); galLoadAlbums(); }
    else window.app && window.app.showNotification('Error al eliminar', 'error');
};

window.galOpenAlbum = async function(id) {
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    var r = await fetch('/api/content/albums/' + id, { headers: token ? { 'Authorization': 'Bearer ' + token } : {} });
    var data = await r.json();
    if (!r.ok) return;
    var album = data.album;
    var photos = data.photos || [];
    var tc = document.getElementById('galTabContent');
    if (!tc) return;
    var userId = window.authClient && window.authClient.user ? window.authClient.user.id : null;
    var isAdmin = window.authClient && window.authClient.isSuperAdmin && window.authClient.isSuperAdmin();
    var canManage = isAdmin || album.created_by === userId;
    var photoGrid = photos.length
        ? '<div style="columns:3 150px;gap:.75rem;">' + photos.map(function(p, i) {
            return '<div style="break-inside:avoid;margin-bottom:.75rem;border-radius:8px;overflow:hidden;position:relative;border:1px solid rgba(255,184,0,.1);">'+
                '<img src="' + p.image_url + '" style="width:100%;display:block;" loading="lazy" onclick="galOpenLightbox(' + i + ')">'+
                (canManage ? '<button onclick="galRemoveFromAlbum(\'' + album.id + '\',\'' + p.id + '\')" style="position:absolute;top:.3rem;right:.3rem;width:22px;height:22px;background:rgba(239,68,68,.85);border:none;border-radius:50%;color:#fff;cursor:pointer;font-size:.7rem;">&#x2715;</button>' : '') +
                '</div>';
          }).join('') + '</div>'
        : '<div class="gal-empty"><i class="fas fa-camera"></i><p>\u00c1lbum vac\u00edo. \u00a1A\u00f1ade fotos!</p></div>';
    tc.innerHTML = '<div style="margin-bottom:1.25rem;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;">'+
        '<button onclick="galShowAlbums()" style="padding:.4rem .9rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,184,0,.2);color:var(--gray-300);border-radius:8px;cursor:pointer;font-size:.82rem;">&#x2190; Volver</button>'+
        '<h2 style="color:var(--gold-primary);font-family:var(--font-display);font-size:1.5rem;margin:0;">' + album.title + '</h2>'+
        (canManage ? '<button onclick="galPickPhotosForAlbum(\'' + album.id + '\')" style="margin-left:auto;padding:.45rem 1rem;background:var(--gold-primary);color:var(--black);border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:.82rem;">&#x2795; A\u00f1adir fotos</button>' : '') +
        '</div>' +
        (album.description ? '<p style="color:var(--gray-400);margin-bottom:1.25rem;font-size:.9rem;">' + album.description + '</p>' : '') +
        '<div id="albumDetailPhotos">' + photoGrid + '</div>';
    window._galImages = photos;
};

window.galRemoveFromAlbum = async function(albumId, photoId) {
    if (!confirm('\u00bfQuitar esta foto del \u00e1lbum?')) return;
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    var res = await fetch('/api/content/albums/' + albumId + '/photos/' + photoId, { method: 'DELETE', headers: token ? { 'Authorization': 'Bearer ' + token } : {} });
    if (res.ok) { window.app && window.app.showNotification('Foto quitada del \u00e1lbum', 'success'); galOpenAlbum(albumId); }
};

window.galPickPhotosForAlbum = async function(albumId) {
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    var r = await fetch('/api/content/gallery?limit=100&sort=created_at&order=DESC', { headers: token ? { 'Authorization': 'Bearer ' + token } : {} });
    var data = await r.json();
    var photos = data.images || [];
    if (!photos.length) { window.app && window.app.showNotification('No tienes fotos. Sube fotos primero.', 'error'); return; }
    var m = document.createElement('div');
    m.id = 'albumPickModal';
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;';
    m.innerHTML = '<div style="background:#111;border:1px solid rgba(255,184,0,.3);border-radius:16px;padding:1.5rem;width:100%;max-width:650px;max-height:90vh;display:flex;flex-direction:column;gap:1rem;">'+
        '<div style="display:flex;align-items:center;gap:.75rem;">'+
        '<h3 style="color:var(--gold-primary);margin:0;flex:1;">&#x2795; Selecciona fotos para el \u00e1lbum</h3>'+
        '<button onclick="document.getElementById(\'albumPickModal\').remove()" style="background:none;border:none;color:var(--gray-400);font-size:1.5rem;cursor:pointer;">&#x2715;</button>'+
        '</div>'+
        '<div style="overflow-y:auto;flex:1;"><div id="pickGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:.5rem;">'+
        photos.map(function(p) {
            return '<div class="pick-item" data-id="' + p.id + '" onclick="this.classList.toggle(\'selected\');this.style.outline=this.classList.contains(\'selected\')?\' 2px solid var(--gold-primary)\':\' none\';" style="border-radius:8px;overflow:hidden;cursor:pointer;aspect-ratio:1;border:1px solid rgba(255,184,0,.1);">'+
                '<img src="' + p.image_url + '" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>';
        }).join('') +
        '</div></div>'+
        '<div style="display:flex;gap:.75rem;">'+
        '<button onclick="galConfirmPickPhotos(\'' + albumId + '\')" style="flex:1;padding:.65rem;background:var(--gold-primary);border:none;border-radius:8px;font-weight:700;cursor:pointer;">A\u00f1adir seleccionadas</button>'+
        '<button onclick="document.getElementById(\'albumPickModal\').remove()" style="padding:.65rem 1rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);color:#fff;border-radius:8px;cursor:pointer;">Cancelar</button>'+
        '</div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', function(e) { if (e.target === m) m.remove(); });
};

window.galConfirmPickPhotos = async function(albumId) {
    var selected = Array.from(document.querySelectorAll('.pick-item.selected')).map(function(el) { return el.dataset.id; });
    if (!selected.length) { window.app && window.app.showNotification('Selecciona al menos una foto', 'error'); return; }
    var session = JSON.parse(localStorage.getItem('mariachi_session') || '{}');
    var token = session.accessToken;
    var res = await fetch('/api/content/albums/' + albumId + '/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ photo_ids: selected })
    });
    var data = await res.json();
    document.getElementById('albumPickModal').remove();
    if (res.ok) {
        window.app && window.app.showNotification(data.added + ' foto' + (data.added !== 1 ? 's' : '') + ' a\u00f1adida' + (data.added !== 1 ? 's' : '') + ' al \u00e1lbum', 'success');
        galOpenAlbum(albumId);
    } else window.app && window.app.showNotification('Error: ' + data.error, 'error');
};

window.loadEstilosContent = function() {
    const container = document.getElementById('estilosContent');
    container.innerHTML = `
        <style>
            .estilos-section { max-width: var(--container-max); margin: 0 auto; padding: 2rem; }
            .estilos-header { text-align: center; margin-bottom: 3rem; padding-top: 1rem; }
            .estilos-header h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); color: var(--gold-primary); }
            .estilos-header p { color: var(--gray-400); font-size: 1.1rem; margin-top: 0.5rem; }

            .estilos-timeline { position: relative; padding-left: 2.5rem; }
            .estilos-timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--gold-primary), rgba(255,184,0,0.1)); border-radius: 3px; }

            .estilo-item { position: relative; margin-bottom: 2.5rem; }
            .estilo-item::before { content: ''; position: absolute; left: -2.5rem; top: 1.5rem; width: 14px; height: 14px; background: var(--gold-primary); border-radius: 50%; border: 3px solid var(--gray-900); z-index: 1; }

            .estilo-card { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.12); border-radius: 16px; overflow: hidden; transition: all 0.3s; cursor: pointer; }
            .estilo-card:hover { border-color: var(--gold-primary); box-shadow: 0 10px 40px rgba(255,184,0,0.1); }
            .estilo-card.open .estilo-detail { display: block; }

            .estilo-card-head { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem 2rem; }
            .estilo-icon { font-size: 2.5rem; flex-shrink: 0; }
            .estilo-info { flex: 1; }
            .estilo-name { font-family: var(--font-display); font-size: 1.5rem; color: var(--white); margin-bottom: 0.25rem; }
            .estilo-meta { display: flex; gap: 1rem; flex-wrap: wrap; }
            .estilo-tag { font-size: 0.75rem; padding: 0.2rem 0.6rem; background: rgba(255,184,0,0.1); color: var(--gold-primary); border-radius: 6px; font-weight: 600; }
            .estilo-toggle { font-size: 1.2rem; color: var(--gray-400); transition: transform 0.3s; flex-shrink: 0; }
            .estilo-card.open .estilo-toggle { transform: rotate(180deg); }

            .estilo-summary { padding: 0 2rem 1.5rem; color: var(--gray-400); font-size: 0.95rem; line-height: 1.6; }

            .estilo-detail { display: none; padding: 0 2rem 2rem; border-top: 1px solid rgba(255,255,255,0.06); }
            .estilo-detail-inner { padding-top: 1.5rem; }
            .estilo-detail h4 { color: var(--gold-primary); font-size: 1.1rem; margin: 1.2rem 0 0.5rem; }
            .estilo-detail p { color: var(--gray-300); font-size: 0.95rem; line-height: 1.7; margin-bottom: 0.75rem; }
            .estilo-detail ul { margin: 0.5rem 0 1rem 1.2rem; color: var(--gray-300); }
            .estilo-detail li { margin-bottom: 0.4rem; font-size: 0.95rem; line-height: 1.5; }

            .estilo-songs { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.75rem; }
            .estilo-song-chip { padding: 0.4rem 1rem; background: rgba(255,184,0,0.08); border: 1px solid rgba(255,184,0,0.15); border-radius: 20px; color: var(--gray-300); font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; }
            .estilo-song-chip i { color: var(--gold-primary); font-size: 0.75rem; }

            .estilos-counter { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 3rem; }
            .estilos-counter-item { text-align: center; }
            .estilos-counter-num { font-size: 2.5rem; font-weight: 800; color: var(--gold-primary); font-family: var(--font-display); }
            .estilos-counter-label { font-size: 0.85rem; color: var(--gray-400); }

            @media (max-width: 768px) {
                .estilo-card-head { padding: 1.2rem 1.5rem; gap: 1rem; }
                .estilo-name { font-size: 1.2rem; }
                .estilos-timeline { padding-left: 2rem; }
            }
        </style>

        <div class="estilos-section">
            <div class="estilos-header">
                <h1>${t('estilos.page_title')}</h1>
                <p>${t('estilos.page_subtitle')}</p>
            </div>

            <div class="estilos-counter">
                <div class="estilos-counter-item">
                    <div class="estilos-counter-num">10</div>
                    <div class="estilos-counter-label">${t('estilos.genres')}</div>
                </div>
                <div class="estilos-counter-item">
                    <div class="estilos-counter-num">200+</div>
                    <div class="estilos-counter-label">${t('estilos.years')}</div>
                </div>
                <div class="estilos-counter-item">
                    <div class="estilos-counter-num" id="estilosSongCount">...</div>
                    <div class="estilos-counter-label">${t('estilos.songs_db')}</div>
                </div>
            </div>

            <div class="estilos-timeline" id="estilosTimeline"></div>
        </div>
    `;

    const estilos = [
        { icon: '🎵', name: 'Son Jalisciense', period: 'Siglo XVIII', compas: '6/8 - 3/4', origin: 'Jalisco', desc: 'El género fundacional del mariachi. Ritmos vivos con zapateo, coplas cantadas y secciones instrumentales virtuosas donde los músicos demuestran su habilidad.', detail: '<h4>Características</h4><p>Compás alternante entre 6/8 y 3/4 (sesquiáltera). Estructura de copla-estribillo con interludios instrumentales. El zapateo sobre tarima es parte esencial de la interpretación.</p><h4>Subgéneros</h4><ul><li><strong>Son abajeño</strong> — De la región de Jalisco y Colima</li><li><strong>Son calentano</strong> — De Tierra Caliente, Michoacán</li><li><strong>Son planeco</strong> — De la meseta purépecha</li></ul>', songs: ['El Son de la Negra', 'El Cascabel', 'La Negra', 'Guadalajara'] },
        { icon: '🤠', name: 'Ranchera', period: '1910-1920', compas: '2/4 - 3/4 - 4/4', origin: 'Nacional', desc: 'El género vocal por excelencia del mariachi. Expresa sentimientos profundos de amor, desamor, orgullo patrio y nostalgia con una intensidad emocional única.', detail: '<h4>Tipos de Ranchera</h4><ul><li><strong>Ranchera lenta</strong> — Baladas de amor y despedida, en 4/4</li><li><strong>Ranchera rápida</strong> — Canciones alegres y festivas, en 2/4</li><li><strong>Ranchera bravía</strong> — Temas de valentía, orgullo, en 3/4</li><li><strong>Ranchera vals</strong> — En compás de 3/4, romántica</li></ul><h4>El Rey de la Ranchera</h4><p>José Alfredo Jiménez compuso más de 1,000 rancheras y es considerado el máximo exponente del género. Sus temas son interpretados por mariachis en todo el mundo.</p>', songs: ['El Rey', 'Volver Volver', 'Ella', 'Paloma Negra', 'Cielo Rojo'] },
        { icon: '💘', name: 'Bolero Ranchero', period: '1940-1950', compas: '4/4', origin: 'Cuba → México', desc: 'Fusión del bolero cubano con la instrumentación mariachi. Baladas románticas profundas que combinan la elegancia del bolero con la pasión mexicana.', detail: '<h4>Fusión Cultural</h4><p>El bolero llegó de Cuba a México en los años 1930-1940 y fue rápidamente adoptado por los mariachis. La fusión creó un género único que combina la estructura armónica del bolero con la expresividad del mariachi.</p><h4>Máximos Exponentes</h4><ul><li><strong>Pedro Infante</strong> — El ídolo del pueblo</li><li><strong>Javier Solís</strong> — "El Rey del Bolero Ranchero"</li><li><strong>Luis Miguel</strong> — Modernizador del género</li></ul>', songs: ['Sabor a Mí', 'La Bikina', 'Si Nos Dejan', 'Solamente Una Vez'] },
        { icon: '💃', name: 'Huapango', period: 'Siglo XVIII', compas: '6/8', origin: 'Huasteca', desc: 'Género virtuoso de la región Huasteca con uso del falsete, ritmos complejos y zapateado sobre tarima de madera. Requiere gran habilidad técnica.', detail: '<h4>La Tradición Huasteca</h4><p>El huapango nace en la Huasteca (Veracruz, San Luis Potosí, Tamaulipas, Hidalgo). Se distingue por el uso del falsete, improvisación poética (versada) y el zapateado virtuoso sobre tarima.</p><h4>En la Orquesta</h4><p>El "Huapango de Moncayo" (1941) es la obra sinfónica mexicana más famosa, basada en tres sones huastecos: "El Siquisirí", "El Balajú" y "El Gavilancito".</p>', songs: ['El Huapango de Moncayo', 'La Malagueña', 'La Bamba'] },
        { icon: '📯', name: 'Corrido', period: '1910', compas: '3/4 - 2/4', origin: 'Nacional', desc: 'Narrativa musical mexicana que cuenta historias de héroes, batallas, eventos históricos y la vida del pueblo. El "periodismo musical" de México.', detail: '<h4>El Periodismo Musical</h4><p>Durante la Revolución Mexicana (1910-1920), el corrido fue el principal medio de comunicación popular. Narraba batallas, hazañas de héroes como Pancho Villa y Emiliano Zapata, y crónicas del pueblo.</p><h4>Estructura</h4><ul><li>Saludo o presentación del tema</li><li>Narración cronológica de eventos</li><li>Moraleja o despedida</li></ul>', songs: ['La Cucaracha', 'Caminos de Guanajuato'] },
        { icon: '🎼', name: 'Canción Mexicana', period: '1900+', compas: '4/4 - 3/4', origin: 'Nacional', desc: 'Género amplio que engloba canciones populares mexicanas que no encajan en otros estilos específicos. Incluye canciones patrióticas, infantiles y festivas.', detail: '<h4>Versatilidad</h4><p>La canción mexicana es un término paraguas para composiciones que mezclan elementos de varios géneros. Incluye canciones de cuna, patrióticas, infantiles y de tema libre.</p><h4>Compositores Notables</h4><p>Agustín Lara, Gonzalo Curiel, María Grever y Consuelo Velázquez crearon canciones mexicanas que trascendieron fronteras.</p>', songs: ['Las Mañanitas', 'México Lindo y Querido', 'Cielito Lindo'] },
        { icon: '🎻', name: 'Vals Mexicano', period: '1850+', compas: '3/4', origin: 'Europa → México', desc: 'Adaptación mexicana del vals europeo. Más lento y sentimental que el vals vienés, con letras poéticas sobre amor y nostalgia.', detail: '<h4>El Vals en México</h4><p>Llegó a México con la influencia francesa en el siglo XIX, especialmente durante el Imperio de Maximiliano. Los compositores mexicanos lo adaptaron con letras en español y un tempo más pausado.</p><h4>Uso en el Mariachi</h4><p>El vals es esencial en quinceañeras (vals de la festejada) y bodas (vals de los novios). También se toca en serenatas románticas.</p>', songs: ['Sobre las Olas', 'Alejandra'] },
        { icon: '🪗', name: 'Polka Norteña', period: '1860+', compas: '2/4', origin: 'Centroeuropa → Norte de México', desc: 'Ritmo bailable de origen europeo adoptado en el norte de México. Aunque más asociada al norteño, algunos mariachis la incluyen en su repertorio.', detail: '<h4>Origen</h4><p>La polka llegó a México con los inmigrantes centroeuropeos (checos, polacos, alemanes) en el siglo XIX. Se arraigó especialmente en los estados del norte: Nuevo León, Tamaulipas, Chihuahua.</p><h4>En el Mariachi</h4><p>Aunque la polka es más típica del conjunto norteño, mariachis versátiles la incluyen para ampliar su repertorio en fiestas y eventos.</p>', songs: [] },
        { icon: '🌺', name: 'Jarabe', period: 'Siglo XVIII', compas: 'Variable', origin: 'Jalisco', desc: 'Suite de sones bailables que se interpretan sin interrupción. El Jarabe Tapatío es considerado el baile nacional de México.', detail: '<h4>El Baile Nacional</h4><p>El jarabe es una secuencia de sones que se bailan de forma continua. El más famoso es el Jarabe Tapatío, que representa el cortejo entre un charro y una china poblana.</p><h4>Historia</h4><p>Fue prohibido durante la Colonia por considerarse "inmoral" por las autoridades españolas. Tras la Independencia se convirtió en símbolo de identidad nacional.</p>', songs: ['Jarabe Tapatío'] },
        { icon: '🎭', name: 'Balada Ranchera', period: '1970+', compas: '4/4', origin: 'Nacional', desc: 'Evolución moderna de la ranchera que incorpora elementos del pop y la balada. Juan Gabriel fue su máximo innovador.', detail: '<h4>La Modernización</h4><p>A partir de los años 1970, compositores como Juan Gabriel y Marco Antonio Solís fusionaron la ranchera con la balada pop, creando un género híbrido que conquistó nuevas audiencias.</p><h4>Juan Gabriel</h4><p>El "Divo de Juárez" revolucionó la música mexicana con composiciones que combinaban la emotividad de la ranchera con arreglos modernos. "Amor Eterno" es considerada su obra maestra.</p>', songs: ['Amor Eterno', 'La Negra Noche'] },
    ];

    const timeline = document.getElementById('estilosTimeline');
    timeline.innerHTML = estilos.map((e, i) => `
        <div class="estilo-item">
            <div class="estilo-card" id="estilo-${i}" onclick="toggleEstilo(${i})">
                <div class="estilo-card-head">
                    <div class="estilo-icon">${e.icon}</div>
                    <div class="estilo-info">
                        <div class="estilo-name">${e.name}</div>
                        <div class="estilo-meta">
                            <span class="estilo-tag">${e.period}</span>
                            <span class="estilo-tag">${e.compas}</span>
                            <span class="estilo-tag">${e.origin}</span>
                        </div>
                    </div>
                    <div class="estilo-toggle"><i class="fas fa-chevron-down"></i></div>
                </div>
                <div class="estilo-summary">${e.desc}</div>
                <div class="estilo-detail">
                    <div class="estilo-detail-inner">
                        ${e.detail}
                        ${e.songs.length > 0 ? `
                            <h4>${t('estilos.featured_songs')}</h4>
                            <div class="estilo-songs">
                                ${e.songs.map(s => `<span class="estilo-song-chip"><i class="fas fa-music"></i> ${s}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Load real song count
    if (window.API) {
        API.stats().then(data => {
            const el = document.getElementById('estilosSongCount');
            if (el && data) el.textContent = data.songs || 0;
        });
    }
};

window.toggleEstilo = function(idx) {
    const card = document.getElementById('estilo-' + idx);
    if (!card) return;
    card.classList.toggle('open');
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
                <button class="wiki-cat-btn active" onclick="filterWikiCat('all',this)">${t('wiki.cat_all')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('instrumentos',this)">🎻 ${t('wiki.cat_instruments')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('historia',this)">📜 ${t('wiki.cat_history')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('estilos',this)">🎵 ${t('wiki.cat_styles')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('cultura',this)">🇲🇽 ${t('wiki.cat_culture')}</button>
                <button class="wiki-cat-btn" onclick="filterWikiCat('tecnica',this)">🎓 ${t('wiki.cat_technique')}</button>
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

window.filterWikiCat = function(cat, el) {
    document.querySelectorAll('.wiki-cat-btn').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');

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
            .chat-section { padding: 2rem; max-width: 900px; margin: 0 auto; min-height: calc(100vh - var(--nav-height) - 100px); display: flex; flex-direction: column; }
            .chat-header { text-align: center; margin-bottom: 2rem; padding-top: 2rem; }
            .chat-header h1 { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); color: var(--gold-primary); margin-bottom: 0.5rem; }
            .chat-header p { color: var(--gray-400); font-size: 1.1rem; }

            .chat-capabilities { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
            .chat-cap { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--gray-400); padding: 0.4rem 0.8rem; background: rgba(255,184,0,0.05); border: 1px solid rgba(255,184,0,0.1); border-radius: 20px; }
            .chat-cap i { color: var(--gold-primary); }

            .chat-window { flex: 1; background: var(--gray-900); border: 1px solid rgba(255,184,0,0.2); border-radius: 16px; display: flex; flex-direction: column; min-height: 500px; overflow: hidden; }
            .chat-messages { flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
            .chat-messages::-webkit-scrollbar { width: 6px; }
            .chat-messages::-webkit-scrollbar-track { background: transparent; }
            .chat-messages::-webkit-scrollbar-thumb { background: var(--gray-700); border-radius: 3px; }

            .chat-msg { max-width: 80%; padding: 1rem 1.5rem; border-radius: 16px; line-height: 1.6; font-size: 0.95rem; word-wrap: break-word; position: relative; }
            .chat-msg.user { align-self: flex-end; background: linear-gradient(135deg, rgba(255,184,0,0.15), rgba(255,184,0,0.08)); border: 1px solid rgba(255,184,0,0.2); color: var(--white); }
            .chat-msg.bot { align-self: flex-start; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--gray-200); }
            .msg-label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--gold-primary); margin-bottom: 0.5rem; }
            .msg-image { max-width: 100%; max-height: 200px; border-radius: 8px; margin-bottom: 0.5rem; cursor: pointer; }
            .msg-video-badge { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(255,184,0,0.12); border: 1px solid rgba(255,184,0,0.3); border-radius: 8px; padding: 0.3rem 0.7rem; font-size: 0.85rem; color: var(--gold-primary); margin-bottom: 0.4rem; }

            .msg-actions { display: flex; gap: 0.5rem; margin-top: 0.75rem; justify-content: flex-end; }
            .msg-action-btn { padding: 0.3rem 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: var(--gray-400); font-size: 0.75rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.3rem; }
            .msg-action-btn:hover { background: rgba(255,184,0,0.1); border-color: var(--gold-primary); color: var(--gold-primary); }
            .msg-action-btn.speaking { background: rgba(255,184,0,0.2); border-color: var(--gold-primary); color: var(--gold-primary); }

            .chat-suggestions { display: flex; flex-wrap: wrap; gap: 0.75rem; padding: 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .chat-suggestion { padding: 0.6rem 1.2rem; background: rgba(255,184,0,0.08); border: 1px solid rgba(255,184,0,0.15); color: var(--gold-primary); border-radius: 20px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
            .chat-suggestion:hover { background: rgba(255,184,0,0.15); border-color: var(--gold-primary); }

            .chat-input-area { display: flex; gap: 0.75rem; padding: 1.5rem 2rem; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); align-items: flex-end; }
            .chat-input-tools { display: flex; gap: 0.5rem; }
            .chat-tool-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,184,0,0.2); background: rgba(255,255,255,0.05); color: var(--gray-400); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: all 0.2s; flex-shrink: 0; }
            .chat-tool-btn:hover { border-color: var(--gold-primary); color: var(--gold-primary); background: rgba(255,184,0,0.1); }
            .chat-tool-btn.recording { border-color: var(--red-mariachi); color: var(--red-mariachi); background: rgba(220,38,38,0.15); animation: pulse-rec 1s infinite; }
            @keyframes pulse-rec { 0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); } 50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); } }

            .chat-input { flex: 1; padding: 0.8rem 1.2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,184,0,0.2); color: var(--white); border-radius: 12px; font-size: 1rem; font-family: var(--font-primary); outline: none; }
            .chat-input:focus { border-color: var(--gold-primary); }
            .chat-send-btn { padding: 0.8rem 1.5rem; background: var(--gold-primary); color: var(--black); border: none; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; flex-shrink: 0; }
            .chat-send-btn:hover { background: var(--gold-light); }
            .chat-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

            .typing-dots { display: flex; gap: 4px; padding: 0.5rem 0; }
            .typing-dots span { width: 8px; height: 8px; background: var(--gold-primary); border-radius: 50%; animation: typing 1.2s ease-in-out infinite; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typing { 0%, 100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-4px); } }

            .chat-error { text-align: center; padding: 1rem; color: var(--red-mariachi); background: rgba(220,38,38,0.08); border-radius: 12px; font-size: 0.9rem; }

            .chat-image-preview { padding: 0.75rem 2rem; border-top: 1px solid rgba(255,255,255,0.05); display: none; }
            .chat-image-preview-inner { display: flex; align-items: center; gap: 0.75rem; background: rgba(255,184,0,0.05); padding: 0.5rem; border-radius: 8px; }
            .chat-image-preview img { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; }
            .chat-image-preview-info { flex: 1; color: var(--gray-300); font-size: 0.85rem; }
            .chat-image-preview-remove { color: var(--gray-400); cursor: pointer; font-size: 1.2rem; padding: 0.25rem; }
            .chat-image-preview-remove:hover { color: var(--red-mariachi); }

            @media (max-width: 768px) {
                .chat-section { padding: 1rem; }
                .chat-messages { padding: 1rem; }
                .chat-msg { max-width: 90%; }
                .chat-input-area { padding: 1rem; gap: 0.5rem; }
                .chat-send-btn span { display: none; }
                .chat-capabilities { gap: 0.75rem; }
            }
        </style>
        
        <div class="chat-section">
            <div class="chat-header">
                <h1>${t('chatbot.ui_title')}</h1>
                <p>${t('chatbot.ui_subtitle')}</p>
            </div>

            <div class="chat-capabilities">
                <div class="chat-cap"><i class="fas fa-comment"></i> ${t('chatbot.cap_text')}</div>
                <div class="chat-cap"><i class="fas fa-camera"></i> ${t('chatbot.cap_vision')}</div>
                <div class="chat-cap"><i class="fas fa-microphone"></i> ${t('chatbot.cap_voice')}</div>
                <div class="chat-cap"><i class="fas fa-volume-up"></i> ${t('chatbot.cap_speak')}</div>
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
                        <span class="msg-label">Mariachi Bot</span>
                        ${t('chatbot.welcome')}
                    </div>
                </div>

                <div class="chat-image-preview" id="chatImagePreview">
                    <div class="chat-image-preview-inner">
                        <img id="chatImageThumb" src="" alt="preview">
                        <div class="chat-image-preview-info" id="chatImageInfo">${t('chatbot.image_attached')}</div>
                        <span class="chat-image-preview-remove" onclick="removeChatImage()">&times;</span>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="chat-input-tools">
                        <button class="chat-tool-btn" id="chatCameraBtn" onclick="openChatCamera()" title="${t('chatbot.btn_camera')}">
                            <i class="fas fa-camera"></i>
                        </button>
                        <button class="chat-tool-btn" id="chatVideoBtn" onclick="openChatVideo()" title="Subir video">
                            <i class="fas fa-video"></i>
                        </button>
                        <button class="chat-tool-btn" id="chatMicBtn" onclick="toggleVoiceInput()" title="${t('chatbot.btn_mic')}">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <input type="file" id="chatImageInput" accept="image/*" capture="environment" style="display:none" onchange="handleChatImage(this)">
                        <input type="file" id="chatVideoInput" accept="video/*" style="display:none" onchange="handleChatVideo(this)">
                    </div>
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
window._chatImageData = null;
window._chatVideoData = null;

window.chatSendSuggestion = function(text) {
    document.getElementById('chatInput').value = text;
    var suggestions = document.getElementById('chatSuggestions');
    if (suggestions) suggestions.style.display = 'none';
    chatSend();
};

// IMAGE VISION
window.openChatCamera = function() {
    document.getElementById('chatImageInput').click();
};

window.handleChatImage = function(input) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var dataUrl = e.target.result;
        var base64 = dataUrl.split(',')[1];
        window._chatImageData = { data: base64, type: file.type || 'image/jpeg' };
        var preview = document.getElementById('chatImagePreview');
        var thumb = document.getElementById('chatImageThumb');
        var info = document.getElementById('chatImageInfo');
        thumb.src = dataUrl;
        info.textContent = file.name + ' (' + (file.size / 1024).toFixed(0) + ' KB)';
        preview.style.display = 'block';
        document.getElementById('chatInput').focus();
        document.getElementById('chatInput').placeholder = t('chatbot.image_placeholder');
    };
    reader.readAsDataURL(file);
    input.value = '';
};

window.removeChatImage = function() {
    window._chatImageData = null;
    window._chatVideoData = null;
    document.getElementById('chatImagePreview').style.display = 'none';
    document.getElementById('chatInput').placeholder = t('chatbot.placeholder');
};

// VIDEO SUPPORT
window.openChatVideo = function() {
    var sizeLimit = 20 * 1024 * 1024; // 20MB Gemini inline limit
    document.getElementById('chatVideoInput').click();
};

window.handleChatVideo = function(input) {
    var file = input.files[0];
    if (!file) return;
    var MAX_SIZE = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_SIZE) {
        window.app.showNotification('El video es demasiado grande (máx. 20MB). Usa un clip corto. 🎬', 'error');
        input.value = '';
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var dataUrl = e.target.result;
        var base64 = dataUrl.split(',')[1];
        window._chatVideoData = { data: base64, type: file.type || 'video/mp4' };
        window._chatImageData = null; // Clear image if video selected
        // Reuse image preview area to show video info
        var preview = document.getElementById('chatImagePreview');
        var thumb = document.getElementById('chatImageThumb');
        var info = document.getElementById('chatImageInfo');
        // Show video icon instead of image thumbnail
        thumb.src = '';
        thumb.style.display = 'none';
        info.innerHTML = '<i class="fas fa-video" style="color:var(--gold);margin-right:6px;"></i>' +
            file.name + ' (' + (file.size / 1024 / 1024).toFixed(1) + ' MB) — Mariachi Bot analizará este video 🎬';
        preview.style.display = 'block';
        document.getElementById('chatInput').placeholder = 'Pregunta algo sobre este video...';
        document.getElementById('chatInput').focus();
    };
    reader.readAsDataURL(file);
    input.value = '';
};

// VOICE INPUT (Speech-to-Text)
window._recognition = null;

window.toggleVoiceInput = function() {
    var btn = document.getElementById('chatMicBtn');
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        window.app.showNotification(t('chatbot.voice_unsupported'), 'error');
        return;
    }
    if (window._recognition && btn.classList.contains('recording')) {
        window._recognition.stop();
        btn.classList.remove('recording');
        btn.innerHTML = '<i class="fas fa-microphone"></i>';
        return;
    }
    window._recognition = new SpeechRecognition();
    window._recognition.lang = window.i18n ? (window.i18n.currentLang === 'en' ? 'en-US' : window.i18n.currentLang === 'pt' ? 'pt-PT' : 'es-MX') : 'es-MX';
    window._recognition.interimResults = true;
    window._recognition.continuous = false;
    var input = document.getElementById('chatInput');
    btn.classList.add('recording');
    btn.innerHTML = '<i class="fas fa-stop"></i>';
    window._recognition.onresult = function(event) {
        var transcript = '';
        for (var i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        input.value = transcript;
    };
    window._recognition.onend = function() {
        btn.classList.remove('recording');
        btn.innerHTML = '<i class="fas fa-microphone"></i>';
        if (input.value.trim()) chatSend();
    };
    window._recognition.onerror = function(e) {
        btn.classList.remove('recording');
        btn.innerHTML = '<i class="fas fa-microphone"></i>';
        if (e.error !== 'no-speech') window.app.showNotification(t('chatbot.voice_error'), 'error');
    };
    window._recognition.start();
    window.app.showNotification(t('chatbot.voice_listening'), 'info');
};

// Init voices ahead of time to fix Chrome bug
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = function() { window._voices = window.speechSynthesis.getVoices(); };
    window._voices = window.speechSynthesis.getVoices();
}

// TEXT-TO-SPEECH
window.speakText = function(text, btnEl) {
    if (!window.speechSynthesis) {
        window.app.showNotification(t('chatbot.voice_unsupported'), 'error');
        return;
    }
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        document.querySelectorAll('.msg-action-btn.speaking').forEach(function(b) { b.classList.remove('speaking'); });
        return;
    }
    var clean = text
        .replace(/<[^>]*>/g, '') // Strip HTML
        .replace(/&[^;]+;/g, '') // Strip entities
        .replace('Mariachi Bot', '')
        .replace(/\p{Emoji_Presentation}/gu, '') // Use modern Regex for presentation emojis
        .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/gu, '') // Fallback Strip Emojis
        .replace(/[*_~`#\[\]()]/g, ''); // Strip Markdown
    var utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = window.i18n ? (window.i18n.currentLang === 'en' ? 'en-US' : window.i18n.currentLang === 'pt' ? 'pt-PT' : 'es-MX') : 'es-MX';
    
    var voices = window._voices || window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        // 1. Prioritize exact locale match (e.g. 'pt-PT' or 'pt_PT')
        var targetVoices = voices.filter(v => v.lang === utterance.lang || v.lang.replace('_', '-') === utterance.lang);
        
        // 2. Fallback to language prefix, but strictly block Brazilian if pt-PT
        if (targetVoices.length === 0) {
            var langPrefix = utterance.lang.split('-')[0];
            targetVoices = voices.filter(v => v.lang.startsWith(langPrefix));
            if (utterance.lang === 'pt-PT') {
                targetVoices = targetVoices.filter(v => !v.lang.toUpperCase().includes('BR') && !v.name.toUpperCase().includes('BRASIL'));
            }
        }

        // 3. Select best quality voice from available target voices
        // Prefer Microsoft/Apple native over basic Google
        var premiumVoice = targetVoices.find(v => v.name.includes('Natural')) ||
                           targetVoices.find(v => v.name.includes('Premium')) ||
                           targetVoices.find(v => v.name.includes('Microsoft')) ||
                           targetVoices.find(v => v.name.includes('Google') && !v.name.toUpperCase().includes('BRASIL')) ||
                           targetVoices.find(v => v.name.includes('Online')) ||
                           targetVoices[0];
                           
        if (premiumVoice) utterance.voice = premiumVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.05; // Slightly higher pitch for clarity
    if (btnEl) btnEl.classList.add('speaking');
    utterance.onend = function() { if (btnEl) btnEl.classList.remove('speaking'); };
    utterance.onerror = function() { if (btnEl) btnEl.classList.remove('speaking'); };
    window.speechSynthesis.speak(utterance);
};

// SEND MESSAGE (text + vision)
window.chatSend = async function() {
    var input = document.getElementById('chatInput');
    var btn = document.getElementById('chatSendBtn');
    var messages = document.getElementById('chatMessages');
    var suggestions = document.getElementById('chatSuggestions');
    var msg = input.value.trim();
    var hasImage = !!window._chatImageData;
    var hasVideo = !!window._chatVideoData;
    var hasMedia = hasImage || hasVideo;
    
    if (!msg && !hasMedia) return;
    if (btn.disabled) return;
    if (suggestions) suggestions.style.display = 'none';
    
    var userMsgHtml = '';
    if (hasImage) {
        var thumb = document.getElementById('chatImageThumb');
        userMsgHtml += '<img class="msg-image" src="' + thumb.src + '">';
    }
    if (hasVideo) {
        userMsgHtml += '<div class="msg-video-badge"><i class="fas fa-video"></i> Video adjunto 🎬</div>';
    }
    if (msg) {
        userMsgHtml += escapeHtml(msg);
    } else if (hasMedia) {
        userMsgHtml += '<em style="color:var(--gray-400);">' + (hasVideo ? 'Video enviado para análisis' : t('chatbot.image_sent')) + '</em>';
    }
    
    messages.innerHTML += '<div class="chat-msg user">' + userMsgHtml + '</div>';
    input.value = '';
    btn.disabled = true;
    var capturedImageData = window._chatImageData;
    var capturedVideoData = window._chatVideoData;
    
    // NOW we can clear the UI and globals
    removeChatImage();
    
    messages.innerHTML += '<div class="chat-msg bot typing" id="typingIndicator"><span class="msg-label">Mariachi Bot</span><div class="typing-dots"><span></span><span></span><span></span></div></div>';
    messages.scrollTop = messages.scrollHeight;
    
    window._chatHistory.push({ role: 'user', content: msg || (hasVideo ? '[Video enviado]' : '[Imagen enviada]') });
    
    try {
        var lang = window.i18n ? window.i18n.currentLang : 'es';
        var body = { message: msg || '', lang: lang, history: window._chatHistory.slice(-10) };
        
        if (hasImage && capturedImageData) {
            body.image = capturedImageData;
        }
        if (hasVideo && capturedVideoData) {
            body.image = capturedVideoData; // reuse image field — server handles both via mimeType
        }

        
        var response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        var typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        
        if (!response.ok) {
            var errData = await response.json().catch(function() { return {}; });
            throw new Error(errData.error || 'Error ' + response.status);
        }
        
        var data = await response.json();
        var reply = data.reply;
        window._chatHistory.push({ role: 'assistant', content: reply });
        
        var formatted = escapeHtml(reply).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        var msgId = 'botMsg_' + Date.now();
        
        messages.innerHTML += '<div class="chat-msg bot" id="' + msgId + '">' +
            '<span class="msg-label">Mariachi Bot</span>' +
            '<div class="msg-body" id="body_' + msgId + '">' + formatted + '</div>' +
            '<div class="msg-actions">' +
            '<button class="msg-action-btn" onclick="speakText(document.getElementById(\'body_' + msgId + '\').innerText, this)" title="' + t('chatbot.btn_listen') + '"><i class="fas fa-volume-up"></i> ' + t('chatbot.btn_listen') + '</button>' +
            '<button class="msg-action-btn" onclick="navigator.clipboard.writeText(document.getElementById(\'body_' + msgId + '\').innerText.trim());window.app.showNotification(\'' + t('chatbot.copied') + '\',\'success\')" title="' + t('chatbot.btn_copy') + '"><i class="fas fa-copy"></i></button>' +
            '</div></div>';
    } catch (err) {
        var typing2 = document.getElementById('typingIndicator');
        if (typing2) typing2.remove();
        var errorKey = err.message === 'API key not configured' ? 'chatbot.error_nokey' : 'chatbot.error_general';
        messages.innerHTML += '<div class="chat-error">' + t(errorKey) + '</div>';
    }
    
    btn.disabled = false;
    messages.scrollTop = messages.scrollHeight;
    input.focus();
};

function escapeHtml(text) {
    var div = document.createElement('div');
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
            if (data.courses.length === 0) {
                grid.innerHTML = `<div style="text-align:center;padding:4rem 2rem;color:var(--gray-400);grid-column:1/-1;">
                    <div style="font-size:3rem;margin-bottom:1rem;opacity:0.5;">🎓</div>
                    <h3 style="color:var(--white);font-family:var(--font-display);font-size:1.5rem;margin-bottom:0.5rem;">Aún no hay cursos</h3>
                    <p>Pronto agregaremos nuevo contenido a la academia.</p>
                </div>`;
                return;
            }
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

// ===================================
// DESTACADOS HOME SECTION
// ===================================
function homeLoadDestacados() {
    // Inject the Destacados container after stats-grid
    var statsGrid = document.getElementById('homeStats');
    if (!statsGrid || document.getElementById('homeDestacados')) return;

    var section = document.createElement('div');
    section.id = 'homeDestacados';
    section.className = 'reveal-up';
    section.innerHTML = '<div style="max-width:var(--container-max);margin:0 auto;padding:4rem 2rem;">' +
        '<div style="text-align:center;margin-bottom:2.5rem;">' +
            '<div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,184,0,.08);border:1px solid rgba(255,184,0,.2);padding:.4rem 1.2rem;border-radius:50px;color:var(--gold-primary);font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;margin-bottom:1rem;">' +
            '&#x2726; Destacados del Portal</div>' +
            '<h2 style="font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.8rem);background:linear-gradient(135deg,var(--gold-primary),var(--gold-light),var(--white));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem;">Lo Mejor del Mariachi</h2>' +
            '<p style="color:var(--gray-400);font-size:.95rem;">Selecci&#243;n editorial actualizada en tiempo real</p>' +
        '</div>' +
        '<div id="destCardsGrid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;"></div>' +
    '</div>';
    statsGrid.after(section);

    // Trigger reveal animation
    setTimeout(function() { section.classList.add('visible'); }, 100);

    // Fetch content in parallel
    var token = (JSON.parse(localStorage.getItem('mariachi_session') || '{}')).accessToken;
    var headers = token ? { 'Authorization': 'Bearer ' + token } : {};
    var cards = [];

    Promise.allSettled([
        fetch('/api/content/songs?sort=score_rating&order=DESC&limit=1').then(function(r){return r.json();}),
        fetch('/api/content/blog?limit=1&sort=created_at&order=DESC').then(function(r){return r.json();}),
        fetch('/api/content/partituras?limit=1&sort=created_at&order=DESC').then(function(r){return r.json();}),
        fetch('/api/content/gallery?limit=1&sort=created_at&order=DESC').then(function(r){return r.json();})
    ]).then(function(results) {
        var songsData  = results[0].status === 'fulfilled' ? results[0].value : null;
        var blogData   = results[1].status === 'fulfilled' ? results[1].value : null;
        var scoreData  = results[2].status === 'fulfilled' ? results[2].value : null;
        var galData    = results[3].status === 'fulfilled' ? results[3].value : null;

        // Top song card
        var song = songsData && songsData.songs && songsData.songs[0];
        if (song) {
            cards.push(homeDestCard(
                '&#x1F3B5;',
                'Canci&#243;n Destacada',
                song.title,
                (song.composer || 'Tradicional') + (song.style ? ' &middot; ' + song.style : ''),
                song.score_rating ? song.score_rating + '/10' : null,
                '#repertorio', 'repertorio'
            ));
        }

        // Latest blog post
        var post = blogData && blogData.posts && blogData.posts[0];
        if (post) {
            cards.push(homeDestCard(
                '&#x1F4DD;',
                '&#218;ltimo Art&#237;culo',
                post.title,
                post.excerpt ? post.excerpt.substring(0, 70) + (post.excerpt.length > 70 ? '&#x2026;' : '') : '',
                null,
                '#blog', 'blog'
            ));
        }

        // Latest partitura
        var score = scoreData && scoreData.partituras && scoreData.partituras[0];
        if (score) {
            cards.push(homeDestCard(
                '&#x1F4C4;',
                'Nueva Partitura',
                score.title || score.original_filename,
                (score.composer ? score.composer + ' &middot; ' : '') + (score.file_type || '').toUpperCase(),
                null,
                '#partituras', 'partituras'
            ));
        }

        // Latest gallery image
        var img = galData && galData.images && galData.images[0];
        if (img) {
            cards.push(homeDestCard(
                img.image_url ? null : '&#x1F4F8;',
                'Foto Reciente',
                img.title || 'Sin t&#237;tulo',
                img.category || 'Galer&#237;a',
                null,
                '#gallery', 'gallery',
                img.image_url
            ));
        }

        // Fallback: always show at least "chatbot" card
        if (!cards.length) {
            cards.push(homeDestCard('&#x1F916;', 'Chatbot IA', 'Pregunta sobre Mariachi', 'Potenciado por Gemini 2.0 Flash', null, '#chatbot', 'chatbot'));
        }

        var grid = document.getElementById('destCardsGrid');
        if (grid) grid.innerHTML = cards.join('');
    });
}


window.loadBlogContent = function() {
    const container = document.getElementById('blogContent');
    const isAdmin = window.authClient && (window.authClient.isSuperAdmin() || (window.authClient.user && window.authClient.user.email.toLowerCase().includes('jorge')));
    
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
            if (data.posts.length === 0) {
                grid.innerHTML = `<div style="text-align:center;padding:4rem 2rem;color:var(--gray-400);grid-column:1/-1;">
                    <div style="font-size:3rem;margin-bottom:1rem;opacity:0.5;">📝</div>
                    <h3 style="color:var(--white);font-family:var(--font-display);font-size:1.5rem;margin-bottom:0.5rem;">Aún no hay artículos</h3>
                    <p>Próximamente publicaremos artículos en el blog.</p>
                </div>`;
                return;
            }
            grid.innerHTML = data.posts.map(post => `
                <div class="blog-card" onclick="openBlogPost('${post.slug}')" style="cursor: pointer;">
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

// ===================================
// WIKI MODE & COMMENTS UI
// ===================================

let currentBlogPost = null;

window.openBlogPost = async function(slug) {
    const container = document.getElementById('blogGrid');
    container.innerHTML = '<div style="text-align:center; padding: 4rem; color: var(--gold-primary);"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
    
    // Hide generator if exists
    const genDiv = document.querySelector('.blog-ai-generator');
    if (genDiv) genDiv.style.display = 'none';

    try {
        const postData = await API.get('/blog/' + slug);
        if (!postData || !postData.post) throw new Error('Post no encontrado');
        currentBlogPost = postData.post;

        const commentsData = await API.get('/blog/' + slug + '/comments');
        const comments = commentsData && commentsData.comments ? commentsData.comments : [];

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; background: var(--gray-900); border: 1px solid rgba(255,184,0,0.15); border-radius: 16px; padding: 2rem; position: relative;">
                <button class="btn btn-outline" onclick="window.app.loadSection('blog')" style="margin-bottom: 2rem;">
                    <i class="fas fa-arrow-left"></i> Volver al Blog
                </button>
                
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${currentBlogPost.icon || '📖'}</div>
                    <h1 style="color: var(--gold-primary); font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 1rem;">${currentBlogPost.title}</h1>
                    <div style="color: var(--gray-400); font-size: 0.9rem;">
                        <span>Por ${currentBlogPost.author_name}</span> | 
                        <span>${currentBlogPost.published_at ? new Date(currentBlogPost.published_at).toLocaleDateString() : ''}</span>
                    </div>
                    ${currentBlogPost.is_ai_generated ? '<div style="margin-top:0.5rem;"><span class="admin-badge admin-badge-gold" style="font-size:0.7rem;">Doble Chequeo IA</span></div>' : ''}
                </div>

                <div class="blog-article-content" id="blogArticleContent" style="color: var(--gray-200); line-height: 1.8; font-size: 1.1rem; margin-bottom: 3rem;">
                    ${currentBlogPost.content}
                </div>

                <!-- Wiki Edit Button -->
                <div style="text-align: right; margin-bottom: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                    <p style="color: var(--gray-400); font-size: 0.85rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-info-circle"></i> Este portal es una Wiki Comunitaria verificada por Inteligencia Artificial.
                    </p>
                    <button class="btn btn-primary" onclick="openWikiEditor()" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
                        <i class="fas fa-edit"></i> Sugerir Corrección Histórica
                    </button>
                </div>

                <!-- Wiki Editor Modal (Hidden by default) -->
                <div id="wikiEditorSection" style="display:none; background: rgba(255,184,0,0.05); border: 1px solid var(--gold-primary); border-radius: 12px; padding: 1.5rem; margin-bottom: 3rem;">
                    <h3 style="color: var(--gold-primary); margin-bottom: 1rem;"><i class="fas fa-robot"></i> Auditor IA de Correcciones</h3>
                    <p style="color: var(--gray-300); font-size: 0.9rem; margin-bottom: 1rem;">Modifica el texto. Tu nueva versión pasará un estricto filtro de verificación histórica por Inteligencia Artificial antes de ser enviada al administrador.</p>
                    <textarea id="wikiEditContent" style="width: 100%; height: 300px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: var(--white); padding: 1rem; font-family: monospace; font-size: 0.9rem; margin-bottom: 1rem;"></textarea>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <button class="btn btn-primary" id="wikiSubmitBtn" onclick="submitWikiCorrection()">Verificar con IA y Enviar</button>
                        <button class="btn btn-outline" onclick="document.getElementById('wikiEditorSection').style.display='none'">Cancelar</button>
                        <span id="wikiStatus" style="font-size: 0.85rem; color: var(--gray-400);"></span>
                    </div>
                </div>

                <!-- Comments Section -->
                <div>
                    <h3 style="color: var(--white); margin-bottom: 1.5rem;">Comentarios (${comments.length})</h3>
                    
                    ${window.authClient && window.authClient.isAuthenticated() ? `
                        <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                            <input type="text" id="newCommentText" placeholder="Escribe un comentario respetuoso..." style="flex: 1; min-width: 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); padding: 0.75rem 1rem; border-radius: 8px; color: var(--white);">
                            <button class="btn btn-primary" onclick="submitBlogComment()">Enviar</button>
                        </div>
                    ` : `
                        <p style="color: var(--gray-400); margin-bottom: 2rem; font-size: 0.9rem;">
                            <i class="fas fa-lock"></i> Inicia sesión para dejar un comentario.
                        </p>
                    `}

                    <div id="blogCommentsList" style="display: flex; flex-direction: column; gap: 1rem;">
                        ${comments.map(c => `
                            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 1rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <strong style="color: var(--gold-light); font-size: 0.9rem;">${c.user_name}</strong>
                                    <span style="color: var(--gray-500); font-size: 0.8rem;">${new Date(c.created_at).toLocaleDateString()}</span>
                                </div>
                                <p style="color: var(--gray-300); font-size: 0.95rem; margin: 0;">${c.content}</p>
                            </div>
                        `).join('')}
                        ${comments.length === 0 ? '<p style="color: var(--gray-500); text-align: center; padding: 2rem 0;">Sé el primero en comentar.</p>' : ''}
                    </div>
                </div>
            </div>
        `;

    } catch (err) {
        container.innerHTML = `<div style="text-align:center; padding: 4rem; color: var(--red-mariachi);">${err.message}</div>`;
    }
};

window.openWikiEditor = function() {
    if (!window.authClient || !window.authClient.isAuthenticated()) {
        window.app.showNotification('Debes iniciar sesión para sugerir correcciones.', 'error');
        return;
    }
    const section = document.getElementById('wikiEditorSection');
    const textarea = document.getElementById('wikiEditContent');
    textarea.value = currentBlogPost.content;
    section.style.display = 'block';
    textarea.focus();
};

window.submitWikiCorrection = async function() {
    if (!currentBlogPost) return;
    const content = document.getElementById('wikiEditContent').value.trim();
    if (!content) return;

    if (content === currentBlogPost.content) {
        window.app.showNotification('No has hecho ningún cambio.', 'info');
        return;
    }

    const btn = document.getElementById('wikiSubmitBtn');
    const status = document.getElementById('wikiStatus');
    
    btn.disabled = true;
    status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> La IA está auditando los hechos históricos...';
    status.style.color = 'var(--gold-primary)';

    try {
        const res = await fetch('/api/blog-ai/corrections/' + currentBlogPost.slug, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.authClient.getToken()
            },
            body: JSON.stringify({ proposed_content: content })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            status.innerHTML = '<i class="fas fa-times"></i> Rechazado por IA: ' + (data.feedback || data.error);
            status.style.color = 'var(--red-mariachi)';
            window.app.showNotification('Corrección rechazada por el Verificador de Hechos.', 'error');
        } else {
            status.innerHTML = '<i class="fas fa-check"></i> ' + data.message;
            status.style.color = 'var(--green-mariachi)';
            document.getElementById('wikiEditContent').value = '';
            setTimeout(() => {
                document.getElementById('wikiEditorSection').style.display = 'none';
                window.app.showNotification('Corrección enviada a revisión exitosamente.', 'success');
            }, 3000);
        }
    } catch (err) {
        status.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error de conexión.';
        status.style.color = 'var(--red-mariachi)';
    }
    
    btn.disabled = false;
};

window.submitBlogComment = async function() {
    if (!currentBlogPost) return;
    const input = document.getElementById('newCommentText');
    const content = input.value.trim();
    if (!content) return;

    try {
        const res = await fetch('/api/content/blog/' + currentBlogPost.slug + '/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.authClient.getToken()
            },
            body: JSON.stringify({ content })
        });
        
        if (res.ok) {
            input.value = '';
            // Refresh post to see new comment
            window.openBlogPost(currentBlogPost.slug);
        } else {
            const data = await res.json();
            window.app.showNotification(data.error || 'Error enviando comentario', 'error');
        }
    } catch (err) {
        window.app.showNotification('Error de red', 'error');
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

// ── Anuncios Section (Tablón) ────────────────────────────────────────────────
window.loadAnunciosContent = () => {
    const container = document.getElementById('anunciosContent');
    if (!container) return;

    container.innerHTML = `
        <section class="section-premium mt-navbar">
            <div class="container">
                <div class="section-header reveal-up">
                    <span class="badge-premium">${t('nav.anuncios')}</span>
                    <h2>Tablón de Anuncios</h2>
                    <p>Encuentra ofertas de trabajo, compra/venta de instrumentos y servicios para mariachis</p>
                </div>
                
                <div class="filters-container reveal-up" style="margin-bottom: 2rem;">
                    <button class="filter-btn active" data-filter="all">Todos</button>
                    <button class="filter-btn" data-filter="jobs">Trabajo</button>
                    <button class="filter-btn" data-filter="instruments">Instrumentos</button>
                    <button class="filter-btn" data-filter="services">Servicios</button>
                </div>
                
                <div class="cards-grid" id="anunciosGrid">
                    <!-- Ejemplos Demo -->
                    <div class="repertorio-card category-jobs reveal-up">
                        <div class="card-content">
                            <span class="card-badge" style="background:var(--mariachi-red)">Se Busca</span>
                            <h3>Vihuelista con experiencia</h3>
                            <p class="card-meta">📍 Ciudad de México • 🕒 Planta</p>
                            <p style="margin-bottom:1rem;color:var(--text-light)">Mariachi Nuevo Sol busca vihuelista para trabajo de planta turno vespertino. Disponibilidad inmediata.</p>
                            <button class="btn-premium btn-small"><i class="fab fa-whatsapp"></i> Contactar</button>
                        </div>
                    </div>
                    
                    <div class="repertorio-card category-instruments reveal-up">
                        <div class="card-content">
                            <span class="card-badge">Venta</span>
                            <h3>Trompeta Yamaha Xeno</h3>
                            <p class="card-meta">📍 Guadalajara • 💰 $25,000</p>
                            <p style="margin-bottom:1rem;color:var(--text-light)">Trompeta en excelente estado, servicio recién hecho. Incluye estuche rígido y boquilla Bach.</p>
                            <button class="btn-premium btn-small"><i class="fas fa-eye"></i> Ver detalles</button>
                        </div>
                    </div>
                    
                    <div class="repertorio-card category-services reveal-up">
                        <div class="card-content">
                            <span class="card-badge" style="background:var(--gold-primary);color:black">Servicio</span>
                            <h3>Arreglos Musicales</h3>
                            <p class="card-meta">🌐 Online • ⏱️ Rápido</p>
                            <p style="margin-bottom:1rem;color:var(--text-light)">Realizo arreglos a la medida para dotación completa. Partituras profesionales en PDF y Finale.</p>
                            <button class="btn-premium btn-small"><i class="fas fa-envelope"></i> Mensaje</button>
                        </div>
                    </div>
                </div>
                
                <div class="text-center reveal-up" style="margin-top: 3rem;">
                    <button class="btn-premium btn-large"><i class="fas fa-plus"></i> Publicar Anuncio</button>
                </div>
            </div>
        </section>
    `;
    
    // Funcionalidad de filtros simple
    const btns = container.querySelectorAll('.filter-btn');
    const cards = container.querySelectorAll('.repertorio-card');
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.classList.contains('category-' + filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            // Refrescar GSAP ScrollTrigger al cambiar filtros
            if(window.ScrollTrigger) window.ScrollTrigger.refresh();
        });
    });
};

console.log('✅ Premium sections loaded');
