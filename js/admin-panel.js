/**
 * MARIACHI PORTAL - Admin Panel
 * Full content management for super_admin users
 */

window.loadAdminPanel = function() {
    const container = document.getElementById('adminContent');
    if (!container) return;

    container.innerHTML = `
        <style>
            .admin-panel { max-width: 1200px; margin: 0 auto; padding: 2rem; }
            .admin-header { text-align: center; margin-bottom: 2rem; padding-top: 1rem; }
            .admin-header h1 { font-family: var(--font-display); font-size: 2.5rem; color: var(--gold-primary); }
            .admin-header p { color: var(--gray-400); margin-top: 0.5rem; }

            .admin-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
            .admin-stat { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.15); border-radius: 12px; padding: 1.5rem; text-align: center; }
            .admin-stat-num { font-size: 2rem; font-weight: 800; color: var(--gold-primary); }
            .admin-stat-label { font-size: 0.85rem; color: var(--gray-400); margin-top: 0.25rem; }

            .admin-tabs { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
            .admin-tab { padding: 0.75rem 1.5rem; background: var(--gray-900); border: 1px solid rgba(255,184,0,0.15); color: var(--gray-300); border-radius: 10px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.2s; }
            .admin-tab:hover { border-color: var(--gold-primary); color: var(--white); }
            .admin-tab.active { background: rgba(255,184,0,0.15); border-color: var(--gold-primary); color: var(--gold-primary); }

            .admin-content { background: var(--gray-900); border: 1px solid rgba(255,184,0,0.15); border-radius: 16px; padding: 2rem; min-height: 400px; }

            .admin-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
            .admin-toolbar h2 { font-family: var(--font-display); font-size: 1.5rem; color: var(--white); }

            .admin-btn { padding: 0.6rem 1.2rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; display: inline-flex; align-items: center; gap: 0.5rem; }
            .admin-btn-primary { background: var(--gold-primary); color: var(--black); }
            .admin-btn-primary:hover { background: var(--gold-light); }
            .admin-btn-danger { background: rgba(220,38,38,0.15); color: var(--red-mariachi); border: 1px solid rgba(220,38,38,0.3); }
            .admin-btn-danger:hover { background: rgba(220,38,38,0.25); }
            .admin-btn-small { padding: 0.4rem 0.8rem; font-size: 0.8rem; }

            .admin-table { width: 100%; border-collapse: collapse; }
            .admin-table th { text-align: left; padding: 0.75rem 1rem; color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.1); }
            .admin-table td { padding: 0.75rem 1rem; color: var(--gray-200); font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: middle; }
            .admin-table tr:hover td { background: rgba(255,184,0,0.03); }

            .admin-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
            .admin-badge-gold { background: rgba(255,184,0,0.15); color: var(--gold-primary); }
            .admin-badge-green { background: rgba(5,150,105,0.15); color: var(--green-mariachi); }
            .admin-badge-red { background: rgba(220,38,38,0.15); color: var(--red-mariachi); }

            .admin-form { display: flex; flex-direction: column; gap: 1rem; max-width: 600px; }
            .admin-form label { font-size: 0.85rem; color: var(--gray-300); font-weight: 500; }
            .admin-form input, .admin-form textarea, .admin-form select {
                padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,184,0,0.2);
                color: var(--white); border-radius: 8px; font-size: 0.95rem; font-family: var(--font-primary);
            }
            .admin-form input:focus, .admin-form textarea:focus, .admin-form select:focus { outline: none; border-color: var(--gold-primary); }
            .admin-form textarea { min-height: 100px; resize: vertical; }
            .admin-form select option { background: var(--gray-900); }

            .admin-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
            .admin-form-actions { display: flex; gap: 1rem; margin-top: 0.5rem; }

            .admin-empty { text-align: center; padding: 3rem; color: var(--gray-500); }
            .admin-loading { text-align: center; padding: 2rem; color: var(--gray-400); }

            .admin-back { cursor: pointer; color: var(--gold-primary); font-size: 0.9rem; margin-bottom: 1rem; display: inline-flex; align-items: center; gap: 0.5rem; }
            .admin-back:hover { text-decoration: underline; }

            @media (max-width: 768px) {
                .admin-panel { padding: 1rem; }
                .admin-form-row { grid-template-columns: 1fr; }
                .admin-table { font-size: 0.8rem; }
                .admin-table th, .admin-table td { padding: 0.5rem; }
            }
        </style>

        <div class="admin-panel">
            <div class="admin-header">
                <h1>👑 Panel de Administración</h1>
                <p>Gestiona todo el contenido del portal</p>
            </div>

            <div class="admin-stats" id="adminStats">
                <div class="admin-stat"><div class="admin-stat-num" id="aStatSongs">...</div><div class="admin-stat-label">Canciones</div></div>
                <div class="admin-stat"><div class="admin-stat-num" id="aStatMariachis">...</div><div class="admin-stat-label">Mariachis</div></div>
                <div class="admin-stat"><div class="admin-stat-num" id="aStatCollections">...</div><div class="admin-stat-label">Colecciones</div></div>
                <div class="admin-stat"><div class="admin-stat-num" id="aStatCourses">...</div><div class="admin-stat-label">Cursos</div></div>
                <div class="admin-stat"><div class="admin-stat-num" id="aStatUsers">...</div><div class="admin-stat-label">Usuarios</div></div>
            </div>

            <div class="admin-tabs">
                <button class="admin-tab active" onclick="adminTab('songs')">🎵 Canciones</button>
                <button class="admin-tab" onclick="adminTab('mariachis')">🎺 Mariachis</button>
                <button class="admin-tab" onclick="adminTab('collections')">📂 Colecciones</button>
                <button class="admin-tab" onclick="adminTab('courses')">🎓 Cursos</button>
                <button class="admin-tab" onclick="adminTab('blog')">📝 Blog</button>
                <button class="admin-tab" onclick="adminTab('users')">👥 Usuarios</button>
            </div>

            <div class="admin-content" id="adminTabContent">
                <div class="admin-loading">Cargando...</div>
            </div>
        </div>
    `;

    // Load stats
    API.stats().then(data => {
        if (!data) return;
        const el = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
        el('aStatSongs', data.songs || 0);
        el('aStatMariachis', data.mariachis || 0);
        el('aStatCollections', data.collections || 0);
        el('aStatCourses', data.courses || 0);
        el('aStatUsers', data.users || 0);
    });

    // Load default tab
    adminTab('songs');
};

// ===================================
// TAB NAVIGATION
// ===================================
window.adminTab = function(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(t => {
        if (t.textContent.toLowerCase().includes(tab.substring(0, 4))) t.classList.add('active');
    });

    const content = document.getElementById('adminTabContent');
    content.innerHTML = '<div class="admin-loading">Cargando...</div>';

    switch(tab) {
        case 'songs': loadAdminSongs(); break;
        case 'mariachis': loadAdminMariachis(); break;
        case 'collections': loadAdminCollections(); break;
        case 'courses': loadAdminCourses(); break;
        case 'blog': loadAdminBlog(); break;
        case 'users': loadAdminUsers(); break;
    }
};

// ===================================
// HELPER: API call with admin token
// ===================================
async function adminAPI(method, endpoint, body) {
    const token = window.authClient ? window.authClient.getToken() : null;
    if (!token) return { error: 'No token' };

    const opts = {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    };
    if (body) opts.body = JSON.stringify(body);

    try {
        const res = await fetch(endpoint, opts);
        return await res.json();
    } catch (err) {
        return { error: err.message };
    }
}

// ===================================
// SONGS TAB
// ===================================
async function loadAdminSongs() {
    const content = document.getElementById('adminTabContent');
    const data = await API.songs({ limit: 50, sort: 'created_at', order: 'DESC' });

    if (!data || !data.songs) {
        content.innerHTML = '<div class="admin-empty">Error cargando canciones</div>';
        return;
    }

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>🎵 Canciones (${data.total})</h2>
            <button class="admin-btn admin-btn-primary" onclick="showSongForm()"><i class="fas fa-plus"></i> Agregar Canción</button>
        </div>
        <div id="songFormArea"></div>
        <table class="admin-table">
            <thead><tr>
                <th>Título</th><th>Compositor</th><th>Estilo</th><th>Score</th><th>Badge</th><th>Acciones</th>
            </tr></thead>
            <tbody>
                ${data.songs.map(s => `
                    <tr>
                        <td><strong>${s.title}</strong></td>
                        <td>${s.composer || '-'}</td>
                        <td>${s.style || '-'}</td>
                        <td><span class="admin-badge admin-badge-gold">${s.score_rating || 0}</span></td>
                        <td>${s.badge ? '<span class="admin-badge admin-badge-green">' + s.badge + '</span>' : '-'}</td>
                        <td>
                            <button class="admin-btn admin-btn-danger admin-btn-small" onclick="deleteSong('${s.id}')"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

window.showSongForm = function(song) {
    const area = document.getElementById('songFormArea');
    area.innerHTML = `
        <div style="background:rgba(255,184,0,0.05);border:1px solid rgba(255,184,0,0.2);border-radius:12px;padding:2rem;margin-bottom:1.5rem;">
            <h3 style="color:var(--gold-primary);margin-bottom:1rem;">${song ? 'Editar' : 'Nueva'} Canción</h3>
            <div class="admin-form">
                <div class="admin-form-row">
                    <div><label>Título *</label><input id="sf_title" value="${song ? song.title : ''}" placeholder="El Son de la Negra"></div>
                    <div><label>Compositor</label><input id="sf_composer" value="${song ? song.composer || '' : ''}" placeholder="José Alfredo Jiménez"></div>
                </div>
                <div class="admin-form-row">
                    <div><label>Estilo</label>
                        <select id="sf_style">
                            <option value="">Seleccionar...</option>
                            <option value="Son Jalisciense">Son Jalisciense</option>
                            <option value="Ranchera">Ranchera</option>
                            <option value="Bolero Ranchero">Bolero Ranchero</option>
                            <option value="Son Huasteco">Son Huasteco</option>
                            <option value="Huapango">Huapango</option>
                            <option value="Corrido">Corrido</option>
                            <option value="Canción Mexicana">Canción Mexicana</option>
                            <option value="Balada Ranchera">Balada Ranchera</option>
                            <option value="Polka">Polka</option>
                            <option value="Vals">Vals</option>
                        </select>
                    </div>
                    <div><label>Año</label><input id="sf_year" value="${song ? song.year || '' : ''}" placeholder="1971"></div>
                </div>
                <div><label>Descripción</label><textarea id="sf_desc" placeholder="Breve descripción de la canción...">${song ? song.description || '' : ''}</textarea></div>
                <div class="admin-form-row">
                    <div><label>Badge</label>
                        <select id="sf_badge">
                            <option value="">Sin badge</option>
                            <option value="GANADOR">GANADOR</option>
                            <option value="NOMINADO">NOMINADO</option>
                            <option value="TOP #1">TOP #1</option>
                            <option value="CLÁSICO">CLÁSICO</option>
                            <option value="POPULAR">POPULAR</option>
                            <option value="TRENDING">TRENDING</option>
                        </select>
                    </div>
                    <div><label>URL Audio (opcional)</label><input id="sf_audio" value="${song ? song.audio_url || '' : ''}" placeholder="https://..."></div>
                </div>
                <div class="admin-form-actions">
                    <button class="admin-btn admin-btn-primary" onclick="saveSong()"><i class="fas fa-save"></i> Guardar</button>
                    <button class="admin-btn" style="background:var(--gray-700);color:var(--white);" onclick="document.getElementById('songFormArea').innerHTML=''">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    if (song && song.style) document.getElementById('sf_style').value = song.style;
    if (song && song.badge) document.getElementById('sf_badge').value = song.badge;
};

window.saveSong = async function() {
    const title = document.getElementById('sf_title').value.trim();
    if (!title) { alert('El título es obligatorio'); return; }

    const body = {
        title,
        composer: document.getElementById('sf_composer').value.trim(),
        style: document.getElementById('sf_style').value,
        year: document.getElementById('sf_year').value.trim(),
        description: document.getElementById('sf_desc').value.trim(),
        badge: document.getElementById('sf_badge').value,
        audio_url: document.getElementById('sf_audio').value.trim()
    };

    const result = await adminAPI('POST', '/api/content/songs', body);
    if (result.error) { alert('Error: ' + result.error); return; }

    document.getElementById('songFormArea').innerHTML = '';
    loadAdminSongs();
};

window.deleteSong = async function(id) {
    if (!confirm('¿Eliminar esta canción?')) return;
    await adminAPI('DELETE', '/api/content/songs/' + id);
    loadAdminSongs();
};

// ===================================
// MARIACHIS TAB
// ===================================
async function loadAdminMariachis() {
    const content = document.getElementById('adminTabContent');
    const data = await API.mariachis({ limit: 50 });

    if (!data || !data.mariachis) {
        content.innerHTML = '<div class="admin-empty">Error cargando mariachis</div>';
        return;
    }

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>🎺 Mariachis (${data.total})</h2>
            <button class="admin-btn admin-btn-primary" onclick="showMariachiForm()"><i class="fas fa-plus"></i> Agregar Mariachi</button>
        </div>
        <div id="mariachiFormArea"></div>
        <table class="admin-table">
            <thead><tr><th>Nombre</th><th>Tipo</th><th>Ubicación</th><th>Premios</th><th>Pro</th><th>Acciones</th></tr></thead>
            <tbody>
                ${data.mariachis.map(m => `
                    <tr>
                        <td><strong>${m.name}</strong></td>
                        <td>${m.type || '-'}</td>
                        <td>${m.location || '-'}</td>
                        <td>${m.awards || 0}</td>
                        <td>${m.is_pro ? '<span class="admin-badge admin-badge-gold">PRO</span>' : '-'}</td>
                        <td><button class="admin-btn admin-btn-danger admin-btn-small" onclick="deleteMariachi('${m.id}')"><i class="fas fa-trash"></i></button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

window.showMariachiForm = function() {
    document.getElementById('mariachiFormArea').innerHTML = `
        <div style="background:rgba(255,184,0,0.05);border:1px solid rgba(255,184,0,0.2);border-radius:12px;padding:2rem;margin-bottom:1.5rem;">
            <h3 style="color:var(--gold-primary);margin-bottom:1rem;">Nuevo Mariachi</h3>
            <div class="admin-form">
                <div class="admin-form-row">
                    <div><label>Nombre *</label><input id="mf_name" placeholder="Mariachi Sol de México"></div>
                    <div><label>Tipo</label>
                        <select id="mf_type">
                            <option value="Agrupación Profesional">Agrupación Profesional</option>
                            <option value="Agrupación Internacional">Agrupación Internacional</option>
                            <option value="Agrupación Tradicional">Agrupación Tradicional</option>
                            <option value="Agrupación Regional">Agrupación Regional</option>
                            <option value="Solista">Solista</option>
                        </select>
                    </div>
                </div>
                <div class="admin-form-row">
                    <div><label>Ubicación</label><input id="mf_location" placeholder="Guadalajara, Jalisco"></div>
                    <div><label>Website</label><input id="mf_website" placeholder="https://..."></div>
                </div>
                <div><label>Descripción</label><textarea id="mf_desc" placeholder="Descripción del grupo..."></textarea></div>
                <div class="admin-form-actions">
                    <button class="admin-btn admin-btn-primary" onclick="saveMariachi()"><i class="fas fa-save"></i> Guardar</button>
                    <button class="admin-btn" style="background:var(--gray-700);color:var(--white);" onclick="document.getElementById('mariachiFormArea').innerHTML=''">Cancelar</button>
                </div>
            </div>
        </div>
    `;
};

window.saveMariachi = async function() {
    const name = document.getElementById('mf_name').value.trim();
    if (!name) { alert('El nombre es obligatorio'); return; }

    const result = await adminAPI('POST', '/api/content/mariachis', {
        name,
        type: document.getElementById('mf_type').value,
        location: document.getElementById('mf_location').value.trim(),
        website: document.getElementById('mf_website').value.trim(),
        description: document.getElementById('mf_desc').value.trim()
    });

    if (result.error) { alert('Error: ' + result.error); return; }
    document.getElementById('mariachiFormArea').innerHTML = '';
    loadAdminMariachis();
};

window.deleteMariachi = async function(id) {
    if (!confirm('¿Eliminar este mariachi?')) return;
    await adminAPI('DELETE', '/api/content/mariachis/' + id);
    loadAdminMariachis();
};

// ===================================
// COLLECTIONS TAB
// ===================================
async function loadAdminCollections() {
    const content = document.getElementById('adminTabContent');
    const data = await API.collections();

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>📂 Colecciones (${data && data.collections ? data.collections.length : 0})</h2>
            <button class="admin-btn admin-btn-primary" onclick="showCollectionForm()"><i class="fas fa-plus"></i> Agregar</button>
        </div>
        <div id="collectionFormArea"></div>
        <table class="admin-table">
            <thead><tr><th>Icono</th><th>Título</th><th>Categoría</th><th>Canciones</th></tr></thead>
            <tbody>
                ${(data && data.collections ? data.collections : []).map(c => `
                    <tr><td>${c.icon || '🎵'}</td><td><strong>${c.title}</strong></td><td>${c.category || '-'}</td><td>${c.song_count || 0}</td></tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

window.showCollectionForm = function() {
    document.getElementById('collectionFormArea').innerHTML = `
        <div style="background:rgba(255,184,0,0.05);border:1px solid rgba(255,184,0,0.2);border-radius:12px;padding:2rem;margin-bottom:1.5rem;">
            <h3 style="color:var(--gold-primary);margin-bottom:1rem;">Nueva Colección</h3>
            <div class="admin-form">
                <div class="admin-form-row">
                    <div><label>Título *</label><input id="cf_title" placeholder="Boleros Clásicos"></div>
                    <div><label>Categoría</label><input id="cf_cat" placeholder="Baladas Románticas"></div>
                </div>
                <div class="admin-form-row">
                    <div><label>Icono (emoji)</label><input id="cf_icon" value="🎵" maxlength="4"></div>
                    <div></div>
                </div>
                <div><label>Descripción</label><textarea id="cf_desc" placeholder="Descripción de la colección..."></textarea></div>
                <div class="admin-form-actions">
                    <button class="admin-btn admin-btn-primary" onclick="saveCollection()"><i class="fas fa-save"></i> Guardar</button>
                    <button class="admin-btn" style="background:var(--gray-700);color:var(--white);" onclick="document.getElementById('collectionFormArea').innerHTML=''">Cancelar</button>
                </div>
            </div>
        </div>
    `;
};

window.saveCollection = async function() {
    const title = document.getElementById('cf_title').value.trim();
    if (!title) { alert('El título es obligatorio'); return; }
    const result = await adminAPI('POST', '/api/content/collections', {
        title, category: document.getElementById('cf_cat').value.trim(),
        icon: document.getElementById('cf_icon').value.trim(),
        description: document.getElementById('cf_desc').value.trim()
    });
    if (result.error) { alert('Error: ' + result.error); return; }
    document.getElementById('collectionFormArea').innerHTML = '';
    loadAdminCollections();
};

// ===================================
// COURSES TAB
// ===================================
async function loadAdminCourses() {
    const content = document.getElementById('adminTabContent');
    const data = await API.courses();

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>🎓 Cursos (${data && data.courses ? data.courses.length : 0})</h2>
            <button class="admin-btn admin-btn-primary" onclick="showCourseForm()"><i class="fas fa-plus"></i> Agregar</button>
        </div>
        <div id="courseFormArea"></div>
        <table class="admin-table">
            <thead><tr><th>Icono</th><th>Título</th><th>Instructor</th><th>Lecciones</th><th>Rating</th><th>Estudiantes</th></tr></thead>
            <tbody>
                ${(data && data.courses ? data.courses : []).map(c => `
                    <tr>
                        <td>${c.icon || '🎵'}</td>
                        <td><strong>${c.title}</strong></td>
                        <td>${c.instructor_name || '-'}</td>
                        <td>${c.lessons || 0}</td>
                        <td><span class="admin-badge admin-badge-gold">${c.rating || 0}</span></td>
                        <td>${c.student_count || 0}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

window.showCourseForm = function() {
    document.getElementById('courseFormArea').innerHTML = `
        <div style="background:rgba(255,184,0,0.05);border:1px solid rgba(255,184,0,0.2);border-radius:12px;padding:2rem;margin-bottom:1.5rem;">
            <h3 style="color:var(--gold-primary);margin-bottom:1rem;">Nuevo Curso</h3>
            <div class="admin-form">
                <div class="admin-form-row">
                    <div><label>Título *</label><input id="crf_title" placeholder="Guitarra Mariachi Básico"></div>
                    <div><label>Instructor</label><input id="crf_instructor" placeholder="Maestro..."></div>
                </div>
                <div class="admin-form-row">
                    <div><label>Lecciones</label><input id="crf_lessons" type="number" value="10"></div>
                    <div><label>Horas</label><input id="crf_hours" type="number" value="5"></div>
                </div>
                <div class="admin-form-row">
                    <div><label>Icono (emoji)</label><input id="crf_icon" value="🎵" maxlength="4"></div>
                    <div><label>Gratis</label><select id="crf_free"><option value="true">Sí</option><option value="false">No</option></select></div>
                </div>
                <div><label>Descripción</label><textarea id="crf_desc" placeholder="Descripción del curso..."></textarea></div>
                <div class="admin-form-actions">
                    <button class="admin-btn admin-btn-primary" onclick="saveCourse()"><i class="fas fa-save"></i> Guardar</button>
                    <button class="admin-btn" style="background:var(--gray-700);color:var(--white);" onclick="document.getElementById('courseFormArea').innerHTML=''">Cancelar</button>
                </div>
            </div>
        </div>
    `;
};

window.saveCourse = async function() {
    const title = document.getElementById('crf_title').value.trim();
    if (!title) { alert('El título es obligatorio'); return; }
    const result = await adminAPI('POST', '/api/content/courses', {
        title, instructor_name: document.getElementById('crf_instructor').value.trim(),
        lessons: parseInt(document.getElementById('crf_lessons').value) || 0,
        hours: parseInt(document.getElementById('crf_hours').value) || 0,
        icon: document.getElementById('crf_icon').value.trim(),
        is_free: document.getElementById('crf_free').value === 'true',
        description: document.getElementById('crf_desc').value.trim()
    });
    if (result.error) { alert('Error: ' + result.error); return; }
    document.getElementById('courseFormArea').innerHTML = '';
    loadAdminCourses();
};

// ===================================
// BLOG TAB
// ===================================
async function loadAdminBlog() {
    const content = document.getElementById('adminTabContent');
    const data = await API.blog({ limit: 50 });

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>📝 Blog (${data ? data.total : 0} artículos)</h2>
            <button class="admin-btn admin-btn-primary" onclick="window.app.loadSection('blog')"><i class="fas fa-magic"></i> Ir a Blog AI Generator</button>
        </div>
        <table class="admin-table">
            <thead><tr><th>Icono</th><th>Título</th><th>Autor</th><th>Fecha</th><th>IA</th></tr></thead>
            <tbody>
                ${(data && data.posts ? data.posts : []).map(p => `
                    <tr>
                        <td>${p.icon || '📖'}</td>
                        <td><strong>${p.title}</strong></td>
                        <td>${p.author_name || '-'}</td>
                        <td>${p.published_at ? new Date(p.published_at).toLocaleDateString() : '-'}</td>
                        <td>${p.is_ai_generated ? '<span class="admin-badge admin-badge-gold">IA</span>' : '-'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===================================
// USERS TAB
// ===================================
async function loadAdminUsers() {
    const content = document.getElementById('adminTabContent');
    const data = await adminAPI('GET', '/api/admin/users');

    if (data.error) {
        content.innerHTML = '<div class="admin-empty">Error: ' + data.error + '</div>';
        return;
    }

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>👥 Usuarios (${data.users ? data.users.length : 0})</h2>
        </div>
        <table class="admin-table">
            <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Registro</th><th>Último login</th></tr></thead>
            <tbody>
                ${(data.users || []).map(u => `
                    <tr>
                        <td><strong>${u.name}</strong></td>
                        <td>${u.email}</td>
                        <td><span class="admin-badge ${u.role === 'super_admin' ? 'admin-badge-gold' : 'admin-badge-green'}">${u.role}</span></td>
                        <td>${new Date(u.created_at).toLocaleDateString()}</td>
                        <td>${u.last_login ? new Date(u.last_login).toLocaleDateString() : 'Nunca'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
