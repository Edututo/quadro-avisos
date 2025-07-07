-- Create database schema for TV Bulletin Board System

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    transition_type VARCHAR(50) DEFAULT 'fade',
    slide_duration INTEGER DEFAULT 5,
    auto_play BOOLEAN DEFAULT true,
    show_clock BOOLEAN DEFAULT false,
    background_color VARCHAR(7) DEFAULT '#000000',
    html_template TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TVs table
CREATE TABLE IF NOT EXISTS tvs (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    template_id INTEGER REFERENCES templates(id),
    status VARCHAR(20) DEFAULT 'offline',
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size BIGINT,
    file_path VARCHAR(500) NOT NULL,
    folder_path VARCHAR(500) DEFAULT '/',
    mime_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Slides table (content assigned to TVs)
CREATE TABLE IF NOT EXISTS slides (
    id SERIAL PRIMARY KEY,
    tv_id VARCHAR(50) REFERENCES tvs(id),
    file_id INTEGER REFERENCES files(id),
    slide_order INTEGER NOT NULL,
    duration INTEGER DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Folders table
CREATE TABLE IF NOT EXISTS folders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_path VARCHAR(500) DEFAULT '/',
    full_path VARCHAR(500) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tvs_template_id ON tvs(template_id);
CREATE INDEX IF NOT EXISTS idx_slides_tv_id ON slides(tv_id);
CREATE INDEX IF NOT EXISTS idx_slides_file_id ON slides(file_id);
CREATE INDEX IF NOT EXISTS idx_files_folder_path ON files(folder_path);
CREATE INDEX IF NOT EXISTS idx_folders_parent_path ON folders(parent_path);
