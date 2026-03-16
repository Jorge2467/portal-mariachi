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
                            <span class="score-number">9.2</span>
                            <span class="score-max">/10</span>
                        </div>
                        <button class="vote-btn">
                            <i class="fas fa-heart"></i> ${t('home.vote_now')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">🎵</div>
                <div class="stat-number">500+</div>
                <div class="stat-label">${t('stats.songs')}</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🎧</div>
                <div class="stat-number">200+</div>
                <div class="stat-label">${t('stats.audios')}</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📄</div>
                <div class="stat-number">150+</div>
                <div class="stat-label">${t('stats.scores')}</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-number">50+</div>
                <div class="stat-label">${t('stats.styles')}</div>
            </div>
        </div>
    `;
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
    
    const songs = [
        { title: 'El Son de la Negra', composer: 'Tradicional', emoji: '🎺', score: 9.2, type: 'Son Jalisciense', badge: t('awards.badge_winner') },
        { title: 'La Bikina', composer: 'Rubén Fuentes', emoji: '🎻', score: 8.9, type: 'Bolero Ranchero', badge: t('awards.badge_nominee') },
        { title: 'El Rey', composer: 'José Alfredo Jiménez', emoji: '🎸', score: 9.5, type: 'Ranchera', badge: t('awards.badge_top') },
        { title: 'Cielito Lindo', composer: 'Quirino Mendoza', emoji: '🎤', score: 9.0, type: 'Son Huasteco', badge: t('awards.badge_classic') },
        { title: 'Las Mañanitas', composer: 'Tradicional', emoji: '🎵', score: 8.7, type: 'Canción Mexicana', badge: t('awards.badge_popular') },
        { title: 'Volver Volver', composer: 'Fernando Z. Maldonado', emoji: '🎺', score: 9.1, type: 'Ranchera', badge: t('awards.badge_trending') }
    ];
    
    grid.innerHTML = songs.map(song => `
        <div class="award-card" onclick="app.loadSection('repertorio')">
            <div class="award-card-image">
                ${song.emoji}
                <div class="award-card-badge">${song.badge}</div>
            </div>
            <div class="award-card-content">
                <div class="award-card-type">${song.type}</div>
                <h3 class="award-card-title">${song.title}</h3>
                <p class="award-card-author">${t('awards.by')} ${song.composer}</p>
                <div class="award-card-score">
                    <div class="score-badge">
                        <i class="fas fa-star"></i> ${song.score}
                    </div>
                    <button class="view-btn">${t('awards.view_details')}</button>
                </div>
            </div>
        </div>
    `).join('');
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
            
            <!-- Filter section will be added here -->
            
            <div class="cards-grid" id="repertorioGrid"></div>
        </div>
    `;
    
    loadAwardCards('repertorio', 'repertorioGrid'); // Reuse card layout
};

// Additional section loaders...
window.loadAudiosContent = function() {
    document.getElementById('audiosContent').innerHTML = `<div class="section-premium"><h1 class="section-title">🎧 ${t('audios.title')}</h1></div>`;
};

window.loadPartiturasContent = function() {
    document.getElementById('partiturasContent').innerHTML = `<div class="section-premium"><h1 class="section-title">📄 ${t('partituras.title')}</h1></div>`;
};

window.loadEstilosContent = function() {
    document.getElementById('estilosContent').innerHTML = `<div class="section-premium"><h1 class="section-title">📚 ${t('estilos.title')}</h1></div>`;
};

window.loadWikiContent = function() {
    document.getElementById('wikiContent').innerHTML = `<div class="section-premium"><h1 class="section-title">📖 ${t('wiki.title')}</h1></div>`;
};

window.loadChatbotContent = function() {
    document.getElementById('chatbotContent').innerHTML = `<div class="section-premium"><h1 class="section-title">🤖 ${t('chatbot.title')}</h1></div>`;
};

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
            
            <div class="cards-grid">
                <div class="academy-card">
                    <div class="academy-card-image">🎻</div>
                    <div class="academy-card-content">
                        <p class="academy-card-instructor">${t('academy.by_maestro')} ${t('academy.instructor1')}</p>
                        <h3 class="academy-card-title">${t('academy.course1')}</h3>
                        <div class="academy-card-rating">
                            <span class="rating-stars">★★★★★</span>
                            <span class="rating-number">5.0</span>
                            <span class="meta-info">(234 ${t('academy.students')})</span>
                        </div>
                        <div class="academy-card-meta">
                            <span class="meta-info">12 ${t('academy.lessons')} · 8 ${t('academy.hours')}</span>
                            <span class="price">${t('academy.free')}</span>
                        </div>
                    </div>
                </div>
                
                <div class="academy-card">
                    <div class="academy-card-image">🎺</div>
                    <div class="academy-card-content">
                        <p class="academy-card-instructor">${t('academy.by_maestra')} ${t('academy.instructor2')}</p>
                        <h3 class="academy-card-title">${t('academy.course2')}</h3>
                        <div class="academy-card-rating">
                            <span class="rating-stars">★★★★★</span>
                            <span class="rating-number">4.9</span>
                            <span class="meta-info">(189 ${t('academy.students')})</span>
                        </div>
                        <div class="academy-card-meta">
                            <span class="meta-info">20 ${t('academy.lessons')} · 12 ${t('academy.hours')}</span>
                            <span class="price">${t('academy.free')}</span>
                        </div>
                    </div>
                </div>
                
                <div class="academy-card">
                    <div class="academy-card-image">🎸</div>
                    <div class="academy-card-content">
                        <p class="academy-card-instructor">${t('academy.by_maestro')} ${t('academy.instructor3')}</p>
                        <h3 class="academy-card-title">${t('academy.course3')}</h3>
                        <div class="academy-card-rating">
                            <span class="rating-stars">★★★★★</span>
                            <span class="rating-number">5.0</span>
                            <span class="meta-info">(312 ${t('academy.students')})</span>
                        </div>
                        <div class="academy-card-meta">
                            <span class="meta-info">15 ${t('academy.lessons')} · 10 ${t('academy.hours')}</span>
                            <span class="price">${t('academy.free')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
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
            
            <div class="cards-grid">
                <div class="collection-card">
                    <div class="collection-icon">🎵</div>
                    <h3 class="collection-title">${t('collections.col1_title')}</h3>
                    <p class="collection-category">${t('collections.col1_cat')}</p>
                    <p style="color: var(--gray-400); margin-bottom: 1rem;">
                        ${t('collections.col1_desc')}
                    </p>
                    <div class="collection-stats">
                        <div class="stat-item">
                            <i class="fas fa-music"></i>
                            <span class="stat-number">45</span> ${t('collections.songs')}
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span class="stat-number">+1,546</span> ${t('collections.favorites')}
                        </div>
                    </div>
                </div>
                
                <div class="collection-card">
                    <div class="collection-icon">🎺</div>
                    <h3 class="collection-title">${t('collections.col2_title')}</h3>
                    <p class="collection-category">${t('collections.col2_cat')}</p>
                    <p style="color: var(--gray-400); margin-bottom: 1rem;">
                        ${t('collections.col2_desc')}
                    </p>
                    <div class="collection-stats">
                        <div class="stat-item">
                            <i class="fas fa-music"></i>
                            <span class="stat-number">62</span> ${t('collections.songs')}
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span class="stat-number">+2,318</span> ${t('collections.favorites')}
                        </div>
                    </div>
                </div>
                
                <div class="collection-card">
                    <div class="collection-icon">💚</div>
                    <h3 class="collection-title">${t('collections.col3_title')}</h3>
                    <p class="collection-category">${t('collections.col3_cat')}</p>
                    <p style="color: var(--gray-400); margin-bottom: 1rem;">
                        ${t('collections.col3_desc')}
                    </p>
                    <div class="collection-stats">
                        <div class="stat-item">
                            <i class="fas fa-music"></i>
                            <span class="stat-number">38</span> ${t('collections.songs')}
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span class="stat-number">+892</span> ${t('collections.favorites')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
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
            
            <div style="max-width: var(--container-max); margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="directory-card">
                    <div class="directory-logo">🎺</div>
                    <div class="directory-info">
                        <h3 class="directory-name">Mariachi Vargas de Tecalitlán</h3>
                        <p class="directory-type">${t('directory.pro_group')}</p>
                        <div class="directory-meta">
                            <span><i class="fas fa-music"></i> 250+ ${t('directory.presentations')}</span>
                            <span><i class="fas fa-trophy"></i> 12 ${t('directory.awards')}</span>
                            <span><i class="fas fa-map-marker-alt"></i> Tecalitlán, Jalisco</span>
                        </div>
                    </div>
                    <div class="directory-actions">
                        <span class="count-badge">PRO</span>
                    </div>
                </div>
                
                <div class="directory-card">
                    <div class="directory-logo">🎻</div>
                    <div class="directory-info">
                        <h3 class="directory-name">Mariachi Sol de México</h3>
                        <p class="directory-type">${t('directory.intl_group')}</p>
                        <div class="directory-meta">
                            <span><i class="fas fa-music"></i> 180+ ${t('directory.presentations')}</span>
                            <span><i class="fas fa-trophy"></i> 8 ${t('directory.awards')}</span>
                            <span><i class="fas fa-map-marker-alt"></i> Ciudad de México</span>
                        </div>
                    </div>
                    <div class="directory-actions">
                        <span class="count-badge">PRO</span>
                    </div>
                </div>
                
                <div class="directory-card">
                    <div class="directory-logo">🎸</div>
                    <div class="directory-info">
                        <h3 class="directory-name">Mariachi Los Camperos</h3>
                        <p class="directory-type">${t('directory.trad_group')}</p>
                        <div class="directory-meta">
                            <span><i class="fas fa-music"></i> 300+ ${t('directory.presentations')}</span>
                            <span><i class="fas fa-trophy"></i> 15 ${t('directory.awards')}</span>
                            <span><i class="fas fa-map-marker-alt"></i> Los Angeles, USA</span>
                        </div>
                    </div>
                    <div class="directory-actions">
                        <span class="count-badge">PRO</span>
                    </div>
                </div>
                
                <div class="directory-card">
                    <div class="directory-logo">🎤</div>
                    <div class="directory-info">
                        <h3 class="directory-name">Mariachi Nuevo Tecalitlán</h3>
                        <p class="directory-type">${t('directory.reg_group')}</p>
                        <div class="directory-meta">
                            <span><i class="fas fa-music"></i> 95+ ${t('directory.presentations')}</span>
                            <span><i class="fas fa-trophy"></i> 5 ${t('directory.awards')}</span>
                            <span><i class="fas fa-map-marker-alt"></i> Guadalajara, Jalisco</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.loadBlogContent = function() {
    const container = document.getElementById('blogContent');
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
        </style>
        
        <div class="section-premium">
            <div class="section-header">
                <h1 class="section-title">📝 ${t('blog.title')}</h1>
                <p class="section-subtitle">${t('blog.subtitle')}</p>
            </div>
            
            <div class="cards-grid">
                <div class="blog-card">
                    <div class="blog-card-image">📖</div>
                    <div class="blog-card-content">
                        <p class="blog-card-date">${t('blog.date1')}</p>
                        <h3 class="blog-card-title">${t('blog.post1_title')}</h3>
                        <p class="blog-card-excerpt">
                            ${t('blog.post1_excerpt')}
                        </p>
                        <div class="blog-card-footer">
                            <div class="blog-author">
                                <div class="blog-author-avatar"></div>
                                <span>Jorge L. Garcia</span>
                            </div>
                            <span class="read-more">
                                ${t('blog.read_more')} <i class="fas fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="blog-card">
                    <div class="blog-card-image">🎺</div>
                    <div class="blog-card-content">
                        <p class="blog-card-date">${t('blog.date2')}</p>
                        <h3 class="blog-card-title">${t('blog.post2_title')}</h3>
                        <p class="blog-card-excerpt">
                            ${t('blog.post2_excerpt')}
                        </p>
                        <div class="blog-card-footer">
                            <div class="blog-author">
                                <div class="blog-author-avatar"></div>
                                <span>Ana M. Hernández</span>
                            </div>
                            <span class="read-more">
                                ${t('blog.read_more')} <i class="fas fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="blog-card">
                    <div class="blog-card-image">🎻</div>
                    <div class="blog-card-content">
                        <p class="blog-card-date">${t('blog.date3')}</p>
                        <h3 class="blog-card-title">${t('blog.post3_title')}</h3>
                        <p class="blog-card-excerpt">
                            ${t('blog.post3_excerpt')}
                        </p>
                        <div class="blog-card-footer">
                            <div class="blog-author">
                                <div class="blog-author-avatar"></div>
                                <span>Carlos Mendoza</span>
                            </div>
                            <span class="read-more">
                                ${t('blog.read_more')} <i class="fas fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.loadAdminContent = function() {
    document.getElementById('adminContent').innerHTML = `<div class="section-premium"><h1 class="section-title">👑 ${t('admin.title')}</h1></div>`;
};

console.log('✅ Premium sections loaded');
