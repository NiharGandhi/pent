-- Users table for custom authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notes table for storing student pages
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content JSONB NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Images table for storing image metadata
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(500),
  hidden_message TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_images_note_id ON images(note_id);
CREATE INDEX IF NOT EXISTS idx_notes_position ON notes(position);
CREATE INDEX IF NOT EXISTS idx_images_position ON images(position);

-- Add Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Users policies - allow anyone to insert (signup) and read
CREATE POLICY users_insert_policy ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY users_select_policy ON users
  FOR SELECT USING (true);

CREATE POLICY users_update_own ON users
  FOR UPDATE USING (true);

-- Notes policies - allow all operations for now (can be restricted later)
CREATE POLICY notes_insert_policy ON notes
  FOR INSERT WITH CHECK (true);

CREATE POLICY notes_select_policy ON notes
  FOR SELECT USING (true);

CREATE POLICY notes_update_policy ON notes
  FOR UPDATE USING (true);

CREATE POLICY notes_delete_policy ON notes
  FOR DELETE USING (true);

-- Images policies - allow all operations
CREATE POLICY images_insert_policy ON images
  FOR INSERT WITH CHECK (true);

CREATE POLICY images_select_policy ON images
  FOR SELECT USING (true);

CREATE POLICY images_update_policy ON images
  FOR UPDATE USING (true);

CREATE POLICY images_delete_policy ON images
  FOR DELETE USING (true);
