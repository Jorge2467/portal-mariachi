-- Portal del Mariachi - Full Database Schema
-- Phase 1: Users + Auth
-- Phase 2: Content + Uploads

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- ===================================
-- PHASE 1: USERS & AUTH
-- ===================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    avatar_url VARCHAR(500),
    telegram_chat_id BIGINT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- ===================================
-- PHASE 2: CONTENT
-- ===================================

-- Songs / Canciones
CREATE TABLE IF NOT EXISTS songs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    composer VARCHAR(500),
    style VARCHAR(100),
    year VARCHAR(50),
    description TEXT,
    lyrics TEXT,
    audio_url VARCHAR(1000),
    score_url VARCHAR(1000),
    video_url VARCHAR(1000),
    thumbnail_url VARCHAR(1000),
    score_rating DECIMAL(3,1) DEFAULT 0,
    vote_count INTEGER DEFAULT 0,
    play_count INTEGER DEFAULT 0,
    badge VARCHAR(50),
    is_featured BOOLEAN DEFAULT false,
    embedding vector(768),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);




-- Albums / �lbumes de fotos
CREATE TABLE IF NOT EXISTS albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    cover_url VARCHAR(1000),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
    reject_reason TEXT,
    created_by UUID REFERENCES users(id),
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_albums_status ON albums(status);
CREATE INDEX IF NOT EXISTS idx_albums_created_by ON albums(created_by);

-- Album <-> Gallery photo junction
CREATE TABLE IF NOT EXISTS album_photos (
    album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
    photo_id  UUID NOT NULL REFERENCES gallery(id) ON DELETE CASCADE,
    position  INTEGER DEFAULT 0,
    added_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (album_id, photo_id)
);
-- Gallery / Galer�a de fotos
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500),
    category VARCHAR(100),
    description TEXT,
    image_url VARCHAR(1000) NOT NULL,
    original_filename VARCHAR(500),
    file_size_bytes BIGINT,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_created ON gallery(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_title ON gallery(LOWER(title));
-- Partituras / Sheet Music Library
CREATE TABLE IF NOT EXISTS partituras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    composer VARCHAR(500),
    style VARCHAR(100),
    instrument VARCHAR(200),
    tonality VARCHAR(50),
    description TEXT,
    file_url VARCHAR(1000) NOT NULL,
    file_type VARCHAR(20) NOT NULL DEFAULT 'pdf',
    original_filename VARCHAR(500),
    file_size_bytes BIGINT,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_partituras_title ON partituras(LOWER(title));
CREATE INDEX IF NOT EXISTS idx_partituras_style ON partituras(style);
CREATE INDEX IF NOT EXISTS idx_partituras_file_type ON partituras(file_type);
CREATE INDEX IF NOT EXISTS idx_partituras_composer ON partituras(LOWER(composer));
-- Collections / Colecciones
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    icon VARCHAR(10) DEFAULT '🎵',
    cover_url VARCHAR(1000),
    is_public BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Collection <-> Song junction
CREATE TABLE IF NOT EXISTS collection_songs (
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    position INTEGER DEFAULT 0,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (collection_id, song_id)
);

-- Mariachis / Directory
CREATE TABLE IF NOT EXISTS mariachis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(500) NOT NULL,
    type VARCHAR(100),
    location VARCHAR(500),
    description TEXT,
    logo_url VARCHAR(1000),
    website VARCHAR(500),
    phone VARCHAR(50),
    email VARCHAR(255),
    presentations INTEGER DEFAULT 0,
    awards INTEGER DEFAULT 0,
    is_pro BOOLEAN DEFAULT false,
    embedding vector(768),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_url VARCHAR(1000),
    icon VARCHAR(10) DEFAULT '📖',
    author_id UUID REFERENCES users(id),
    author_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'draft',
    is_ai_generated BOOLEAN DEFAULT false,
    embedding vector(768),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog comments (Community Discussion)
CREATE TABLE IF NOT EXISTS blog_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'approved',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog Wiki Corrections (User proposed edits)
CREATE TABLE IF NOT EXISTS blog_corrections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    proposed_content TEXT NOT NULL,
    ai_verified_status VARCHAR(50) DEFAULT 'pending', -- pending, passed, rejected_by_ai
    admin_status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    ai_feedback TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Secure Official Mariachi Directory
CREATE TABLE IF NOT EXISTS mariachi_directory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Who registered the group
    group_name VARCHAR(255) NOT NULL,
    members_count INTEGER DEFAULT 1,
    location VARCHAR(255),
    image_url VARCHAR(1000),
    video_url VARCHAR(1000),
    bio TEXT,
    repertoire TEXT,
    technical_requirements TEXT,
    contact_name VARCHAR(255),
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Academy courses
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    instructor_name VARCHAR(255),
    description TEXT,
    icon VARCHAR(10) DEFAULT '🎵',
    lessons INTEGER DEFAULT 0,
    hours DECIMAL(5,1) DEFAULT 0,
    rating DECIMAL(3,1) DEFAULT 0,
    student_count INTEGER DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0,
    is_free BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Uploads / Files
CREATE TABLE IF NOT EXISTS uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(500) NOT NULL,
    original_name VARCHAR(500),
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    url VARCHAR(1000) NOT NULL,
    upload_type VARCHAR(50),
    related_id UUID,
    related_type VARCHAR(50),
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, song_id)
);

-- Song votes
CREATE TABLE IF NOT EXISTS song_votes (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, song_id)
);


-- Anuncios (classifieds: jobs, instruments, services, general)
CREATE TABLE IF NOT EXISTS anuncios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('empleo','instrumentos','servicios','general')),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    currency VARCHAR(10) DEFAULT 'EUR',
    contact_name VARCHAR(200),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_whatsapp VARCHAR(50),
    image_url VARCHAR(1000),
    location VARCHAR(300),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','expired')),
    reject_reason TEXT,
    expires_at TIMESTAMPTZ,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_anuncios_category ON anuncios(category);
CREATE INDEX IF NOT EXISTS idx_anuncios_status ON anuncios(status);
CREATE INDEX IF NOT EXISTS idx_anuncios_created ON anuncios(created_at DESC);

-- ===================================
-- INDEXES
-- ===================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_refresh_token ON sessions(refresh_token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_songs_style ON songs(style);
CREATE INDEX IF NOT EXISTS idx_songs_featured ON songs(is_featured);
CREATE INDEX IF NOT EXISTS idx_songs_score ON songs(score_rating DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_uploads_related ON uploads(related_type, related_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_song ON favorites(song_id);

-- ===================================
-- TRIGGERS
-- ===================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON users;
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS songs_updated_at ON songs;
CREATE TRIGGER songs_updated_at BEFORE UPDATE ON songs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS collections_updated_at ON collections;
CREATE TRIGGER collections_updated_at BEFORE UPDATE ON collections FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS mariachis_updated_at ON mariachis;
CREATE TRIGGER mariachis_updated_at BEFORE UPDATE ON mariachis FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS courses_updated_at ON courses;
CREATE TRIGGER courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ===================================
-- SEED DATA: Demo Mariachi Directory Listings
-- (Auto-approved for demo purposes)
-- ===================================
INSERT INTO mariachi_directory (group_name, members_count, location, image_url, bio, repertoire, contact_name, whatsapp, email, status)
VALUES
(
    'Mariachi Internacional México Madeira',
    12,
    'Ciudad de México, México',
    'https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?w=400&q=80',
    'Agrupación de mariachi con más de 30 años de trayectoria internacional. Hemos actuado en más de 40 países representando la música mexicana con orgullo y tradición.',
    'Cielito Lindo, La Bamba, Guadalajara, El Rey, Volver Volver, Cucurrucucú Paloma, Las Mañanitas',
    'Carlos Mendoza Rivas',
    '+52 55 8120 4455',
    'contacto@mariachimexicomadeira.com',
    'approved'
),
(
    'Mariachi Garibaldi de Jalisco',
    8,
    'Guadalajara, Jalisco, México',
    'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80',
    'Directamente de la cuna del mariachi, Jalisco. Especializados en sones, huapangos y rancheras auténticas del repertorio tradicional jalisciense.',
    'El Son de la Negra, La Negra, Jarabe Tapatio, Alla en el Rancho Grande, La Malagueña',
    'Alejandro Torres',
    '+52 33 9856 2211',
    'mariachi.garibaldi.jalisco@gmail.com',
    'approved'
),
(
    'Mariachi Madeira Portugal',
    6,
    'Lisboa, Portugal',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    'El único mariachi profesional de Portugal. Llevamos la música mexicana a Europa con un sabor auténtico y un servicio de cinco estrellas para bodas, eventos corporativos y celebraciones.',
    'Bésame Mucho, Granada, Sabor a Mí, El Rancho Grande, Las Golondrinas, Ay Jalisco No Te Rajes',
    'María João Santos',
    '+351 91 234 5678',
    'mariachi.madeira.pt@gmail.com',
    'approved'
)
ON CONFLICT DO NOTHING;
