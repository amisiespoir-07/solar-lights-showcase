-- Create page_content table for managing all page content
CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL,
  section_name VARCHAR(100) NOT NULL,
  content_key VARCHAR(100) NOT NULL,
  content_value TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'text',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_name, section_name, content_key)
);

-- Create settings table for global settings
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) DEFAULT 'text',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add show_price column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS show_price BOOLEAN DEFAULT false;

-- Enable Row Level Security
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON page_content
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access" ON settings
  FOR SELECT
  USING (true);

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated insert" ON page_content
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON page_content
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON page_content
  FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON settings
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON settings
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON settings
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert default page content for Info page
INSERT INTO page_content (page_name, section_name, content_key, content_value) VALUES
  ('info', 'hero', 'title', 'About Solar Lumina'),
  ('info', 'mission', 'title', 'Our Mission'),
  ('info', 'mission', 'content', 'At Solar Lumina, we''re committed to providing sustainable lighting solutions that harness the power of the sun. Our mission is to make renewable energy accessible and affordable for everyone, reducing carbon footprints while providing reliable illumination for communities worldwide. We believe in quality, innovation, and environmental responsibility. Every product we offer is carefully selected to meet the highest standards of performance and durability.'),
  ('info', 'expertise', 'title', 'Years of Expertise'),
  ('info', 'expertise', 'content', 'With over 15 years of experience in the renewable energy industry, our business has successfully completed hundreds of projects across residential, commercial, and industrial sectors. Our expertise extends beyond solar lighting to a comprehensive range of sustainable energy solutions.'),
  ('info', 'expertise', 'subcontent', 'We pride ourselves on delivering quality products and exceptional service. Our portfolio includes various accessories and complementary products that enhance your solar lighting systems.'),
  ('info', 'contact', 'title', 'Contact Us'),
  ('info', 'contact', 'description', 'Have questions about our products or need help with your solar lighting project? Our team of experts is here to help you make the right choice.'),
  ('info', 'contact', 'email', 'info@solarlumina.com'),
  ('info', 'contact', 'phone', '+1 (555) 123-4567'),
  ('info', 'contact', 'address', '123 Solar Street, Green City, GC 12345'),
  ('info', 'contact', 'hours', 'Monday - Friday: 9AM - 6PM');

-- Insert default page content for Home page
INSERT INTO page_content (page_name, section_name, content_key, content_value) VALUES
  ('home', 'hero', 'title', 'Illuminate Your World with Solar Power'),
  ('home', 'hero', 'subtitle', 'Sustainable, Efficient, and Reliable Solar Lighting Solutions'),
  ('home', 'products', 'title', 'Featured Products'),
  ('home', 'products', 'description', 'Explore our range of high-quality solar lighting solutions and accessories');

-- Insert default page content for Street Lights page
INSERT INTO page_content (page_name, section_name, content_key, content_value) VALUES
  ('street-lights', 'hero', 'title', 'Solar Street Lights'),
  ('street-lights', 'hero', 'description', 'Professional-grade solar street lighting solutions for any application');

-- Insert default page content for Accessories page
INSERT INTO page_content (page_name, section_name, content_key, content_value) VALUES
  ('accessories', 'hero', 'title', 'Solar Accessories & Components'),
  ('accessories', 'hero', 'description', 'Complete your solar lighting system with our premium accessories');

-- Insert global settings
INSERT INTO settings (setting_key, setting_value, setting_type) VALUES
  ('site_name', 'SOLAR LUMINA', 'text'),
  ('show_prices_globally', 'false', 'boolean'),
  ('whatsapp_number', '', 'text')
ON CONFLICT (setting_key) DO NOTHING;
