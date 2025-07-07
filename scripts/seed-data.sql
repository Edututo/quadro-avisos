-- Insert sample data for TV Bulletin Board System

-- Insert sample templates
INSERT INTO templates (name, description, transition_type, slide_duration, auto_play, show_clock, background_color) VALUES
('Slideshow Padrão', 'Template básico de slideshow com transições suaves', 'fade', 5, true, false, '#000000'),
('Exibição de Notícias', 'Template com ticker de notícias e conteúdo rotativo', 'slide', 8, true, true, '#1a1a1a'),
('Sala de Conferência', 'Template profissional para salas de reunião', 'fade', 10, true, true, '#2c3e50');

-- Insert sample TVs
INSERT INTO tvs (id, name, template_id, status, last_seen) VALUES
('tv-001', 'Tela do Lobby', 1, 'online', CURRENT_TIMESTAMP),
('tv-002', 'Sala de Conferência A', 2, 'online', CURRENT_TIMESTAMP - INTERVAL '5 minutes'),
('tv-003', 'Tela do Refeitório', 1, 'offline', CURRENT_TIMESTAMP - INTERVAL '1 hour');

-- Insert sample folders
INSERT INTO folders (name, parent_path, full_path) VALUES
('Imagens', '/', '/Imagens/'),
('Videos', '/', '/Videos/'),
('Documentos', '/', '/Documentos/'),
('Anuncios', '/Imagens/', '/Imagens/Anuncios/'),
('Eventos', '/Imagens/', '/Imagens/Eventos/');

-- Insert sample files
INSERT INTO files (name, original_name, file_type, file_size, file_path, folder_path, mime_type) VALUES
('banner-boas-vindas.jpg', 'banner-boas-vindas.jpg', 'image', 2457600, '/uploads/banner-boas-vindas.jpg', '/Imagens/', 'image/jpeg'),
('noticias-empresa.mp4', 'noticias-empresa.mp4', 'video', 47185920, '/uploads/noticias-empresa.mp4', '/Videos/', 'video/mp4'),
('lembrete-seguranca.png', 'lembrete-seguranca.png', 'image', 1843200, '/uploads/lembrete-seguranca.png', '/Imagens/Anuncios/', 'image/png'),
('eventos-proximos.jpg', 'eventos-proximos.jpg', 'image', 3276800, '/uploads/eventos-proximos.jpg', '/Imagens/Eventos/', 'image/jpeg'),
('cronograma-reunioes.png', 'cronograma-reunioes.png', 'image', 2048000, '/uploads/cronograma-reunioes.png', '/Imagens/', 'image/png');

-- Insert sample slides (content assignments)
INSERT INTO slides (tv_id, file_id, slide_order, duration, is_active) VALUES
-- Conteúdo da TV-001 (Tela do Lobby)
('tv-001', 1, 1, 5, true),
('tv-001', 3, 2, 8, true),
('tv-001', 4, 3, 10, true),

-- Conteúdo da TV-002 (Sala de Conferência A)  
('tv-002', 5, 1, 15, true),
('tv-002', 2, 2, 30, true),

-- Conteúdo da TV-003 (Tela do Refeitório)
('tv-003', 1, 1, 5, true),
('tv-003', 4, 2, 8, true);
