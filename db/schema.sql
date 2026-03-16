-- Portal del Mariachi - Full Database Schema
-- Phase 1: Users + Auth
-- Phase 2: Content + Uploads

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
    published_at TIMESTAMPTZ,
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
