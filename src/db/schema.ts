import { pgTable, text, integer, bigint, boolean, timestamp, numeric, uuid, primaryKey, customType, index } from 'drizzle-orm/pg-core';

// Custom pgvector type (768 dims — legacy standard)
const vector = customType<{ data: number[] }>({
  dataType() {
    return 'vector(768)';
  },
  toDriver(value) {
    return `[${value.join(',')}]`;
  },
});

// ===================================
// USERS & AUTH
// ===================================

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('user'),
  avatarUrl: text('avatar_url'),
  telegramChatId: bigint('telegram_chat_id', { mode: 'number' }),
  isActive: boolean('is_active').default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  refreshToken: text('refresh_token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ===================================
// SONGS
// ===================================

export const songs = pgTable('songs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  composer: text('composer'),
  style: text('style'),
  year: text('year'),
  badge: text('badge'),
  description: text('description'),
  lyrics: text('lyrics'),
  audioUrl: text('audio_url'),
  scoreUrl: text('score_url'),
  videoUrl: text('video_url'),
  thumbnailUrl: text('thumbnail_url'),
  createdBy: uuid('created_by').references(() => users.id),
  scoreRating: numeric('score_rating'),
  voteCount: integer('vote_count').default(0),
  playCount: integer('play_count').default(0),
  isFeatured: boolean('is_featured').default(false),
  embedding: vector('embedding'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('idx_songs_style').on(table.style),
  index('idx_songs_featured').on(table.isFeatured),
  index('idx_songs_score').on(table.scoreRating),
]);

// ===================================
// COLLECTIONS (Playlists temáticas)
// ===================================

export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  category: text('category'),
  description: text('description'),
  icon: text('icon').default('🎵'),
  coverUrl: text('cover_url'),
  isPublic: boolean('is_public').default(true),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const collectionSongs = pgTable('collection_songs', {
  collectionId: uuid('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
  songId: uuid('song_id').notNull().references(() => songs.id, { onDelete: 'cascade' }),
  position: integer('position').default(0),
  addedAt: timestamp('added_at').defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.collectionId, table.songId] }),
]);

// ===================================
// MARIACHIS (Hall of Fame)
// ===================================

export const mariachis = pgTable('mariachis', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  type: text('type'),
  location: text('location'),
  description: text('description'),
  logoUrl: text('logo_url'),
  website: text('website'),
  phone: text('phone'),
  email: text('email'),
  presentations: integer('presentations').default(0),
  awards: integer('awards').default(0),
  isPro: boolean('is_pro').default(false),
  embedding: vector('embedding'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ===================================
// MARIACHI DIRECTORY (Directorio oficial)
// ===================================

export const mariachiDirectory = pgTable('mariachi_directory', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  groupName: text('group_name').notNull(),
  membersCount: integer('members_count').default(1),
  location: text('location'),
  imageUrl: text('image_url'),
  videoUrl: text('video_url'),
  bio: text('bio'),
  repertoire: text('repertoire'),
  technicalRequirements: text('technical_requirements'),
  contactName: text('contact_name'),
  whatsapp: text('whatsapp'),
  email: text('email'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ===================================
// BLOG
// ===================================

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  coverUrl: text('cover_url'),
  icon: text('icon').default('📖'),
  authorId: uuid('author_id').references(() => users.id),
  authorName: text('author_name'),
  status: text('status').default('draft'),
  isAiGenerated: boolean('is_ai_generated').default(false),
  embedding: vector('embedding'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('idx_blog_posts_status').on(table.status),
  index('idx_blog_posts_slug').on(table.slug),
]);

export const blogComments = pgTable('blog_comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  status: text('status').default('approved'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const blogCorrections = pgTable('blog_corrections', {
  id: uuid('id').defaultRandom().primaryKey(),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  proposedContent: text('proposed_content').notNull(),
  aiVerifiedStatus: text('ai_verified_status').default('pending'),
  adminStatus: text('admin_status').default('pending'),
  aiFeedback: text('ai_feedback'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ===================================
// ACADEMY COURSES
// ===================================

export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  instructorName: text('instructor_name'),
  description: text('description'),
  icon: text('icon').default('🎵'),
  lessons: integer('lessons').default(0),
  hours: numeric('hours').default('0'),
  rating: numeric('rating'),
  studentCount: integer('student_count').default(0),
  price: numeric('price').default('0'),
  isFree: boolean('is_free').default(true),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ===================================
// GALLERY & ALBUMS
// ===================================

export const gallery = pgTable('gallery', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title'),
  category: text('category'),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  originalFilename: text('original_filename'),
  fileSizeBytes: bigint('file_size_bytes', { mode: 'number' }),
  uploadedBy: uuid('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('idx_gallery_category').on(table.category),
]);

export const albums = pgTable('albums', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  coverUrl: text('cover_url'),
  status: text('status').default('pending'),
  rejectReason: text('reject_reason'),
  createdBy: uuid('created_by').references(() => users.id),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('idx_albums_status').on(table.status),
]);

export const albumPhotos = pgTable('album_photos', {
  albumId: uuid('album_id').notNull().references(() => albums.id, { onDelete: 'cascade' }),
  photoId: uuid('photo_id').notNull().references(() => gallery.id, { onDelete: 'cascade' }),
  position: integer('position').default(0),
  addedAt: timestamp('added_at').defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.albumId, table.photoId] }),
]);

// ===================================
// PARTITURAS (Sheet Music)
// ===================================

export const partituras = pgTable('partituras', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  composer: text('composer'),
  style: text('style'),
  instrument: text('instrument'),
  tonality: text('tonality'),
  description: text('description'),
  fileUrl: text('file_url').notNull(),
  fileType: text('file_type').notNull().default('pdf'),
  originalFilename: text('original_filename'),
  fileSizeBytes: bigint('file_size_bytes', { mode: 'number' }),
  uploadedBy: uuid('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('idx_partituras_style').on(table.style),
  index('idx_partituras_file_type').on(table.fileType),
]);

// ===================================
// UPLOADS (File registry)
// ===================================

export const uploads = pgTable('uploads', {
  id: uuid('id').defaultRandom().primaryKey(),
  filename: text('filename').notNull(),
  originalName: text('original_name'),
  mimeType: text('mime_type'),
  sizeBytes: bigint('size_bytes', { mode: 'number' }),
  url: text('url').notNull(),
  uploadType: text('upload_type'),
  relatedId: uuid('related_id'),
  relatedType: text('related_type'),
  uploadedBy: uuid('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('idx_uploads_related').on(table.relatedType, table.relatedId),
]);

// ===================================
// USER INTERACTIONS: Favorites & Votes
// ===================================

export const favorites = pgTable('favorites', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  songId: uuid('song_id').notNull().references(() => songs.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.songId] }),
]);

export const songVotes = pgTable('song_votes', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  songId: uuid('song_id').notNull().references(() => songs.id, { onDelete: 'cascade' }),
  score: integer('score').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.songId] }),
]);

// ===================================
// ANUNCIOS (Clasificados)
// ===================================

export const anuncios = pgTable('anuncios', {
  id: uuid('id').defaultRandom().primaryKey(),
  category: text('category').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  price: numeric('price'),
  currency: text('currency').default('EUR'),
  contactName: text('contact_name'),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  contactWhatsapp: text('contact_whatsapp'),
  imageUrl: text('image_url'),
  location: text('location'),
  status: text('status').default('pending'),
  rejectReason: text('reject_reason'),
  expiresAt: timestamp('expires_at'),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  reviewedBy: uuid('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('idx_anuncios_category').on(table.category),
  index('idx_anuncios_status').on(table.status),
]);
