// ===================================
// SECURE DIRECTORY ISOLATED MODULE
// ===================================

window.loadDirectoryContent = async function() {
    const container = document.getElementById('directoryContent');
    if (!container) return;

    container.innerHTML = `
        <section class="section">
            <div class="row align-center" style="margin-bottom: 3rem;">
                <div class="col-8">
                    <h2 class="section-title reveal-up">Directorio Mundial de <span>Mariachis</span></h2>
                    <p class="section-subtitle reveal-up">Encuentra a las mejores agrupaciones o inscribe a la tuya. Los datos de contacto están protegidos contra robo por Inteligencia Artificial y Bots.</p>
                </div>
                <div class="col-4" style="text-align: right;">
                    <button class="btn btn-primary reveal-left" onclick="showMariachiRegistration()">
                        <i class="fas fa-plus"></i> Inscribe a tu Mariachi
                    </button>
                </div>
            </div>
            
            <div id="directoryGrid" class="row">
                <div class="col-12" style="text-align:center; padding: 4rem;">
                    <i class="fas fa-spinner fa-spin fa-2x" style="color:var(--gold-primary);"></i>
                </div>
            </div>
        </section>

        <!-- Profile Modal -->
        <div class="modal" id="mariachiProfileModal">
            <div class="modal-content" style="max-width: 800px; padding: 0;">
                <span class="modal-close" onclick="document.getElementById('mariachiProfileModal').classList.remove('active')">&times;</span>
                <div id="mariachiProfileBody"></div>
            </div>
        </div>

        <!-- Registration Modal -->
        <div class="modal" id="mariachiRegisterModal">
            <div class="modal-content" style="max-width: 700px;">
                <span class="modal-close" onclick="document.getElementById('mariachiRegisterModal').classList.remove('active')">&times;</span>
                <h2 style="color: var(--gold-primary); margin-bottom: 1.5rem;"><i class="fas fa-music"></i> Registro Oficial de Agrupación</h2>
                <p style="color: var(--gray-400); font-size: 0.9rem; margin-bottom: 2rem;">Tus datos de contacto (WhatsApp y Email) estarán <strong>encriptados y protegidos</strong> en nuestro servidor. Solo usuarios registrados podrán verlos bajo un límite estricto de seguridad.</p>
                
                <form id="mariachiRegisterForm" onsubmit="submitMariachiRegistration(event)">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <input type="text" id="dir_group_name" placeholder="Nombre de la Agrupación *" required class="form-input" style="grid-column: 1 / -1;">
                        <input type="number" id="dir_members" placeholder="Número de Integrantes" min="1" class="form-input">
                        <input type="text" id="dir_location" placeholder="Ciudad, País *" required class="form-input">
                        
                        <input type="url" id="dir_image" placeholder="URL de Imagen / Logo" class="form-input">
                        <input type="url" id="dir_video" placeholder="URL de Video (YouTube/Vimeo)" class="form-input">
                        
                        <input type="text" id="dir_contact_name" placeholder="Nombre del Representante *" required class="form-input" style="grid-column: 1 / -1;">
                        <input type="tel" id="dir_whatsapp" placeholder="WhatsApp con código de país (+52...) *" required class="form-input">
                        <input type="email" id="dir_email" placeholder="Correo Electrónico" class="form-input">
                        
                        <textarea id="dir_bio" placeholder="Semblanza / Biografía (Opcional)" class="form-input" rows="3" style="grid-column: 1 / -1;"></textarea>
                        <textarea id="dir_repertoire" placeholder="Repertorio Destacado (Opcional)" class="form-input" rows="2" style="grid-column: 1 / -1;"></textarea>
                        <textarea id="dir_technical" placeholder="Requerimientos Técnicos (Opcional)" class="form-input" rows="2" style="grid-column: 1 / -1;"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;" id="dirSubmitBtn">Enviar al Congreso para Revisión</button>
                </form>
            </div>
        </div>
    `;

    try {
        const data = await API.get('/directory');
        const grid = document.getElementById('directoryGrid');
        
        if (!data || !data.directory || data.directory.length === 0) {
            grid.innerHTML = '<div class="col-12" style="text-align:center; padding: 4rem; color:var(--gray-500);">Aún no hay mariachis inscritos. ¡Sé el primero!</div>';
            return;
        }

        window.cachedDirectory = data.directory; // Guardar temporalmente para abrir el modal

        grid.innerHTML = data.directory.map(m => `
            <div class="col-4">
                <div class="collection-card" onclick="openMariachiProfile('${m.id}')" style="cursor: pointer; background: var(--gray-900); border: 1px solid rgba(255,255,255,0.05); padding: 1.5rem; text-align: center;">
                    <div style="width: 100px; height: 100px; border-radius: 50%; background: url('${m.image_url || 'https://via.placeholder.com/150'}') center/cover; margin: 0 auto 1rem;"></div>
                    <h3 style="color: var(--white); font-family: var(--font-display); margin-bottom: 0.5rem;">${m.group_name}</h3>
                    <p style="color: var(--gray-400); font-size: 0.9rem; margin-bottom: 1rem;"><i class="fas fa-map-marker-alt"></i> ${m.location || 'Ubicación no especificada'}</p>
                    <div style="color: var(--gold-primary); font-size: 0.8rem;">
                        ${m.members_count || 1} integrantes
                    </div>
                </div>
            </div>
        `).join('');

    } catch (err) {
        document.getElementById('directoryGrid').innerHTML = `<div class="col-12" style="text-align:center; color:var(--red-mariachi);">Error al cargar directorio</div>`;
    }
};

window.showMariachiRegistration = function() {
    if (!window.authClient || !window.authClient.isAuthenticated()) {
        window.app.showNotification('Debes iniciar sesión para inscribir o reclamar tu perfil de Mariachi.', 'error');
        const modal = document.getElementById('loginModal');
        if (modal) modal.classList.add('active');
        return;
    }
    document.getElementById('mariachiRegisterModal').classList.add('active');
};

window.submitMariachiRegistration = async function(e) {
    e.preventDefault();
    const btn = document.getElementById('dirSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';

    const payload = {
        group_name: document.getElementById('dir_group_name').value,
        members_count: document.getElementById('dir_members').value,
        location: document.getElementById('dir_location').value,
        image_url: document.getElementById('dir_image').value,
        video_url: document.getElementById('dir_video').value,
        contact_name: document.getElementById('dir_contact_name').value,
        whatsapp: document.getElementById('dir_whatsapp').value,
        email: document.getElementById('dir_email').value,
        bio: document.getElementById('dir_bio').value,
        repertoire: document.getElementById('dir_repertoire').value,
        technical_requirements: document.getElementById('dir_technical').value
    };

    try {
        const res = await fetch('/api/content/directory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.authClient.getToken()
            },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (res.ok) {
            window.app.showNotification(data.message || 'Registro exitoso.', 'success');
            document.getElementById('mariachiRegisterModal').classList.remove('active');
            document.getElementById('mariachiRegisterForm').reset();
        } else {
            window.app.showNotification(data.error || 'Error al enviar inscripción', 'error');
        }
    } catch (err) {
        window.app.showNotification('Error de conexión', 'error');
    }
    
    btn.disabled = false;
    btn.textContent = 'Enviar al Congreso para Revisión';
};

window.openMariachiProfile = function(id) {
    const m = window.cachedDirectory.find(x => x.id === id);
    if (!m) return;

    const body = document.getElementById('mariachiProfileBody');
    body.innerHTML = `
        <div style="background: url('${m.image_url || 'https://via.placeholder.com/800x400'}') center/cover; height: 250px; position: relative;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);">
                <h2 style="color: var(--white); font-family: var(--font-display); font-size: 2.5rem; margin: 0;">${m.group_name}</h2>
                <div style="color: var(--gold-light);"><i class="fas fa-map-marker-alt"></i> ${m.location || 'S/U'} | <i class="fas fa-users"></i> ${m.members_count || 1} integrantes</div>
            </div>
        </div>
        <div style="padding: 2rem; background: var(--gray-900);">
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                <div>
                    <h4 style="color: var(--gold-primary); margin-bottom: 0.5rem;">Semblanza</h4>
                    <p style="color: var(--gray-300); line-height: 1.6;">${m.bio || 'Sin semblanza registrada.'}</p>
                    
                    <h4 style="color: var(--gold-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Repertorio</h4>
                    <p style="color: var(--gray-300); line-height: 1.6;">${m.repertoire || 'No especificado.'}</p>
                </div>
                <div>
                    <div style="background: rgba(255,184,0,0.05); border: 1px solid var(--gold-primary); border-radius: 12px; padding: 1.5rem; text-align: center;">
                        <h4 style="color: var(--gold-primary); margin-bottom: 1rem;"><i class="fas fa-shield-alt"></i> Contacto Seguro</h4>
                        <p style="font-size: 0.8rem; color: var(--gray-400); margin-bottom: 1rem;">Oculto por seguridad anti-spam.</p>
                        <div id="contactRevealZone_${id}">
                            <button class="btn btn-outline" onclick="revealMariachiContact('${id}')" style="width: 100%; font-size: 0.85rem;">
                                <i class="fas fa-lock"></i> Revelar Contacto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('mariachiProfileModal').classList.add('active');
};

window.revealMariachiContact = async function(id) {
    if (!window.authClient || !window.authClient.isAuthenticated()) {
        window.app.showNotification('Debes iniciar sesión para ver los datos de contacto directos.', 'error');
        return;
    }

    const zone = document.getElementById('contactRevealZone_' + id);
    zone.innerHTML = '<i class="fas fa-spinner fa-spin" style="color: var(--gold-primary);"></i> Verificando seguridad...';

    try {
        const res = await fetch('/api/content/directory/' + id + '/contact', {
            headers: {
                'Authorization': 'Bearer ' + window.authClient.getToken()
            }
        });
        
        const data = await res.json();
        
        if (res.ok && data.contact) {
            zone.innerHTML = `
                <div style="text-align: left; background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 8px;">
                    <div style="margin-bottom: 0.5rem;">
                        <span style="font-size:0.75rem; color:var(--gray-500); display:block;">Representante:</span>
                        <strong style="color:var(--white);">${data.contact.contact_name || 'No provisto'}</strong>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <span style="font-size:0.75rem; color:var(--gray-500); display:block;"><i class="fab fa-whatsapp" style="color:#25D366;"></i> WhatsApp:</span>
                        <a href="https://wa.me/${(data.contact.whatsapp||'').replace(/[^0-9]/g, '')}" target="_blank" style="color:var(--gold-light); font-weight:bold; text-decoration:none;">${data.contact.whatsapp} <i class="fas fa-external-link-alt" style="font-size:0.7rem;"></i></a>
                    </div>
                    <div>
                        <span style="font-size:0.75rem; color:var(--gray-500); display:block;"><i class="fas fa-envelope"></i> Correo:</span>
                        <a href="mailto:${data.contact.email}" style="color:var(--gold-light); font-weight:bold; text-decoration:none;">${data.contact.email || 'N/A'}</a>
                    </div>
                </div>
            `;
        } else {
            zone.innerHTML = `<span style="color: var(--red-mariachi); font-size: 0.85rem;">${data.error || 'Error al obtener contacto'}</span>`;
        }
    } catch (err) {
        zone.innerHTML = `<span style="color: var(--red-mariachi); font-size: 0.85rem;">Error de red</span>`;
    }
};
