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
                <button class="admin-tab" onclick="adminTab('directory')">📌 Directorio</button>
                <button class="admin-tab" onclick="adminTab('collections')">📂 Colecciones</button>
                <button class="admin-tab" onclick="adminTab('courses')">🎓 Cursos</button>
                <button class="admin-tab" onclick="adminTab('blog')">📝 Blog</button>
                <button class="admin-tab" onclick="adminTab('wiki')">🛡️ Correcciones Wiki</button>
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
        if (tab === 'wiki' && t.textContent.toLowerCase().includes('correcciones')) t.classList.add('active');
        else if (tab !== 'wiki' && t.textContent.toLowerCase().includes(tab.substring(0, 4))) t.classList.add('active');
    });

    const content = document.getElementById('adminTabContent');
    content.innerHTML = '<div class="admin-loading">Cargando...</div>';

    switch(tab) {
        case 'songs': loadAdminSongs(); break;
        case 'mariachis': loadAdminMariachis(); break;
        case 'directory': loadAdminDirectory(); break;
        case 'collections': loadAdminCollections(); break;
        case 'courses': loadAdminCourses(); break;
        case 'blog': loadAdminBlog(); break;
        case 'wiki': loadAdminWikiCorrections(); break;
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
    const data = await adminAPI('GET', '/api/content/admin/blog');

    if (data.error) {
        content.innerHTML = '<div class="admin-empty">Error cargando blog: ' + data.error + '</div>';
        return;
    }

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>📝 Blog (${data.total || 0} artículos)</h2>
            <button class="admin-btn admin-btn-primary" onclick="window.app.loadSection('blog')"><i class="fas fa-magic"></i> Ir a Blog AI Generator</button>
        </div>
        <table class="admin-table">
            <thead><tr><th>Icono</th><th>Título</th><th>Estado</th><th>IA Verificada</th><th>Acciones</th></tr></thead>
            <tbody>
                ${(data.posts || []).map(p => {
                    const isDraft = p.status === 'draft';
                    const statusBadge = isDraft ? '<span class="admin-badge admin-badge-red">Borrador</span>' : '<span class="admin-badge admin-badge-green">Publicado</span>';
                    const aiBadge = p.is_ai_generated ? '<span class="admin-badge admin-badge-gold">Doble Chequeo IA</span>' : '-';
                    const toggleBtn = isDraft
                        ? `<button class="admin-btn admin-badge-green" onclick="togglePostStatus('${p.id}', 'published')"><i class="fas fa-check"></i> Aprobar / Publicar</button>`
                        : `<button class="admin-btn admin-badge-red" onclick="togglePostStatus('${p.id}', 'draft')"><i class="fas fa-eye-slash"></i> Ocultar / Borrador</button>`;

                    return `
                    <tr>
                        <td>${p.icon || '📖'}</td>
                        <td><strong>${p.title}</strong></td>
                        <td>${statusBadge}</td>
                        <td>${aiBadge}</td>
                        <td>${toggleBtn}</td>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

window.togglePostStatus = async function(id, newStatus) {
    const result = await adminAPI('PUT', '/api/content/blog/' + id + '/status', { status: newStatus });
    if (result.error) {
        alert('Error cambiando estado: ' + result.error);
        return;
    }
    loadAdminBlog();
};

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

// ===================================
// WIKI CORRECTIONS TAB
// ===================================
async function loadAdminWikiCorrections() {
    const content = document.getElementById('adminTabContent');
    const data = await adminAPI('GET', '/api/content/admin/corrections');

    if (data.error) {
        content.innerHTML = '<div class="admin-empty">Error: ' + data.error + '</div>';
        return;
    }

    const corrections = data.corrections || [];

    content.innerHTML = `
        <div class="admin-toolbar">
            <h2>🛡️ Correcciones Wiki Pendientes (${corrections.length})</h2>
            <p style="color: var(--gray-400); font-size: 0.9rem;">Estas ediciones han sido sugeridas por usuarios y <strong>aprobadas por el Auditor IA</strong> por su rigor histórico. Revísalas final antes de aplicar.</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            ${corrections.map(c => `
                <div style="background: rgba(255,184,0,0.05); border: 1px solid var(--gold-primary); border-radius: 12px; padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items:flex-start; margin-bottom: 1rem;">
                        <div>
                            <h3 style="color: var(--white); margin-bottom: 0.25rem;">📝 Edit en: <em>${c.post_title}</em></h3>
                            <span style="color: var(--gray-400); font-size: 0.85rem;">Por <strong>${c.user_name}</strong> el ${new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <button class="admin-btn admin-btn-primary" onclick="approveWikiEdit('${c.id}')"><i class="fas fa-check"></i> Aprobar y Sobrescribir</button>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <span style="color: var(--gold-light); display:block; margin-bottom: 0.5rem; font-size: 0.85rem;"><i class="fas fa-robot"></i> <strong>Feedback IA:</strong> ${c.ai_feedback}</span>
                        <div style="color: var(--gray-300); font-family: monospace; font-size: 0.85rem; max-height: 200px; overflow-y: auto; white-space: pre-wrap;">${c.proposed_content}</div>
                    </div>
                </div>
            `).join('')}
            ${corrections.length === 0 ? '<div class="admin-empty"><i class="fas fa-check-circle fa-3x" style="color:var(--green-mariachi); margin-bottom:1rem;"></i><br>Todo está al día. No hay sugerencias pendientes.</div>' : ''}
        </div>
    `;
}

window.approveWikiEdit = async function(id) {
    if (!confirm('¿Estás seguro de que quieres reemplazar el artículo original con esta versión comunitaria?')) return;
    const result = await adminAPI('PUT', '/api/content/admin/corrections/' + id + '/approve');
    if (result.error) {
        alert('Error aprobando la edición: ' + result.error);
        return;
    }
    loadAdminWikiCorrections();
};

// ===================================
// MARIACHI DIRECTORY TAB (Admin Full CRUD)
// ===================================
async function loadAdminDirectory() {
    const content = document.getElementById('adminTabContent');
    const data = await adminAPI('GET', '/api/content/admin/directory');

    if (data.error) {
        content.innerHTML = '<div class="admin-empty">Error: ' + data.error + '</div>';
        return;
    }

    const directory = data.directory || [];

    content.innerHTML = `
        <div class="admin-toolbar" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
            <div>
                <h2>📌 Gestión del Directorio Mundial</h2>
                <p style="color: var(--gray-400); font-size: 0.9rem;">Revisa las agrupaciones. <strong>Tú tienes acceso completo</strong> a WhatsApp y Correos. Los bots públicos no.</p>
            </div>
            <button class="admin-btn admin-btn-primary" onclick="openDirectoryForm(null)" style="white-space:nowrap;">
                <i class="fas fa-plus"></i> Nuevo Mariachi
            </button>
        </div>

        <!-- Admin Directory Form Modal -->
        <div id="dirAdminModal" style="display:none; background:rgba(0,0,0,0.8); position:fixed; inset:0; z-index:9999; overflow-y:auto; padding:2rem;">
            <div style="max-width:700px; margin:0 auto; background:var(--gray-900); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                    <h3 id="dirModalTitle" style="color:var(--gold-primary);">Nuevo Mariachi</h3>
                    <button onclick="document.getElementById('dirAdminModal').style.display='none'" style="background:none; border:none; color:var(--gray-400); font-size:1.5rem; cursor:pointer;">&times;</button>
                </div>
                <form id="dirAdminForm" onsubmit="saveDirectoryEntry(event)">
                    <input type="hidden" id="dirAdminId">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                        <input type="text" id="da_group_name" placeholder="Nombre de la Agrupación *" required class="form-input" style="grid-column:1/-1;">
                        <input type="number" id="da_members" placeholder="N° Integrantes" min="1" class="form-input">
                        <input type="text" id="da_location" placeholder="Ciudad, País" class="form-input">
                        <input type="text" id="da_contact_name" placeholder="Nombre del Representante" class="form-input" style="grid-column:1/-1;">
                        <input type="tel" id="da_whatsapp" placeholder="WhatsApp (+52...)" class="form-input">
                        <input type="email" id="da_email" placeholder="Correo Electrónico" class="form-input">
                        <input type="url" id="da_image" placeholder="URL de Imagen / Logo" class="form-input" style="grid-column:1/-1;">
                        <input type="url" id="da_video" placeholder="URL de Video (YouTube)" class="form-input" style="grid-column:1/-1;">
                        <select id="da_status" class="form-input">
                            <option value="approved">Aprobado (visible al público)</option>
                            <option value="pending">Pendiente de revisión</option>
                            <option value="rejected">Rechazado (oculto)</option>
                        </select>
                        <div style="grid-column:1/-1;"></div>
                        <textarea id="da_bio" placeholder="Semblanza / Biografía" class="form-input" rows="3" style="grid-column:1/-1;"></textarea>
                        <textarea id="da_repertoire" placeholder="Repertorio Destacado" class="form-input" rows="2" style="grid-column:1/-1;"></textarea>
                        <textarea id="da_technical" placeholder="Requerimientos Técnicos" class="form-input" rows="2" style="grid-column:1/-1;"></textarea>
                    </div>
                    <button type="submit" class="admin-btn admin-btn-primary" style="width:100%; margin-top:1.5rem;" id="dirAdminSaveBtn">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                </form>
            </div>
        </div>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>Estatus</th>
                    <th>Agrupación</th>
                    <th>Ciudad</th>
                    <th>Contacto</th>
                    <th>WhatsApp</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${directory.map(m => `
                    <tr>
                        <td>
                            <span class="admin-badge ${m.status === 'approved' ? 'admin-badge-green' : (m.status === 'rejected' ? 'admin-badge-red' : 'admin-badge-gold')}">
                                ${m.status.toUpperCase()}
                            </span>
                        </td>
                        <td><strong>${m.group_name}</strong><br><small>${m.members_count || 1} integrantes</small></td>
                        <td>${m.location || '-'}</td>
                        <td>${m.contact_name || '-'}</td>
                        <td><a href="https://wa.me/${(m.whatsapp||'').replace(/[^0-9]/g,'')}" target="_blank" style="color:var(--gold-light);">${m.whatsapp || '-'}</a></td>
                        <td>
                            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                                <button class="admin-btn" style="background:rgba(255,184,0,0.15); color:var(--gold-primary);" onclick="openDirectoryForm(${JSON.stringify(m).replace(/"/g,'&quot;')})" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                ${m.status !== 'approved' ? `<button class="admin-btn admin-btn-primary" onclick="updateDirectoryStatus('${m.id}', 'approved')" title="Aprobar"><i class="fas fa-check"></i></button>` : `<button class="admin-btn" style="background:rgba(0,0,0,0.3); color:var(--gray-500); cursor:default;" title="Ya aprobado"><i class="fas fa-check"></i></button>`}
                                ${m.status !== 'rejected' ? `<button class="admin-btn admin-btn-danger" onclick="updateDirectoryStatus('${m.id}', 'rejected')" title="Rechazar"><i class="fas fa-times"></i></button>` : `<button class="admin-btn" style="background:rgba(0,0,0,0.3); color:var(--gray-500); cursor:default;" title="Ya rechazado"><i class="fas fa-times"></i></button>`}
                            </div>
                        </td>
                    </tr>
                `).join('')}
                ${directory.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No hay agrupaciones registradas.</td></tr>' : ''}
            </tbody>
        </table>
    `;
}

window.openDirectoryForm = function(mariachi) {
    const modal = document.getElementById('dirAdminModal');
    document.getElementById('dirModalTitle').textContent = mariachi ? 'Editar Mariachi' : 'Nuevo Mariachi';
    document.getElementById('dirAdminId').value = mariachi ? mariachi.id : '';
    document.getElementById('da_group_name').value = mariachi ? (mariachi.group_name || '') : '';
    document.getElementById('da_members').value = mariachi ? (mariachi.members_count || '') : '';
    document.getElementById('da_location').value = mariachi ? (mariachi.location || '') : '';
    document.getElementById('da_contact_name').value = mariachi ? (mariachi.contact_name || '') : '';
    document.getElementById('da_whatsapp').value = mariachi ? (mariachi.whatsapp || '') : '';
    document.getElementById('da_email').value = mariachi ? (mariachi.email || '') : '';
    document.getElementById('da_image').value = mariachi ? (mariachi.image_url || '') : '';
    document.getElementById('da_video').value = mariachi ? (mariachi.video_url || '') : '';
    document.getElementById('da_bio').value = mariachi ? (mariachi.bio || '') : '';
    document.getElementById('da_repertoire').value = mariachi ? (mariachi.repertoire || '') : '';
    document.getElementById('da_technical').value = mariachi ? (mariachi.technical_requirements || '') : '';
    document.getElementById('da_status').value = mariachi ? (mariachi.status || 'pending') : 'approved';
    modal.style.display = 'block';
};

window.saveDirectoryEntry = async function(e) {
    e.preventDefault();
    const btn = document.getElementById('dirAdminSaveBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

    const id = document.getElementById('dirAdminId').value;
    const payload = {
        group_name: document.getElementById('da_group_name').value,
        members_count: document.getElementById('da_members').value || 1,
        location: document.getElementById('da_location').value,
        contact_name: document.getElementById('da_contact_name').value,
        whatsapp: document.getElementById('da_whatsapp').value,
        email: document.getElementById('da_email').value,
        image_url: document.getElementById('da_image').value,
        video_url: document.getElementById('da_video').value,
        bio: document.getElementById('da_bio').value,
        repertoire: document.getElementById('da_repertoire').value,
        technical_requirements: document.getElementById('da_technical').value,
        status: document.getElementById('da_status').value
    };

    let result;
    if (id) {
        result = await adminAPI('PUT', '/api/content/admin/directory/' + id, payload);
    } else {
        result = await adminAPI('POST', '/api/content/admin/directory', payload);
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Guardar';

    if (result.error) {
        alert('Error: ' + result.error);
        return;
    }

    document.getElementById('dirAdminModal').style.display = 'none';
    loadAdminDirectory();
};

window.updateDirectoryStatus = async function(id, status) {
    if (!confirm('¿Cambiar el estatus de este Mariachi a ' + status + '?')) return;
    const result = await adminAPI('PUT', '/api/content/admin/directory/' + id + '/status', { status });
    if (result.error) {
        alert('Error: ' + result.error);
        return;
    }
    loadAdminDirectory();
};
