-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Insert sample products (first 30 marketing images)
INSERT INTO products (name, description, category, image_url) VALUES
  ('Solar Street Light Model 001', 'High-efficiency solar street light with advanced LED technology', 'Street Lights', '/marketing_images/product_001.png'),
  ('Solar Street Light Model 002', 'Durable outdoor solar lighting solution', 'Street Lights', '/marketing_images/product_002.png'),
  ('Solar Street Light Model 003', 'Premium solar street light with motion sensor', 'Street Lights', '/marketing_images/product_003.png'),
  ('Solar Street Light Model 004', 'Compact solar light for residential areas', 'Street Lights', '/marketing_images/product_004.png'),
  ('Solar Street Light Model 005', 'Industrial-grade solar street lighting', 'Street Lights', '/marketing_images/product_005.png'),
  ('Solar Street Light Model 006', 'Smart solar street light with remote control', 'Street Lights', '/marketing_images/product_006.png'),
  ('Solar Street Light Model 007', 'Eco-friendly solar lighting solution', 'Street Lights', '/marketing_images/product_007.png'),
  ('Solar Street Light Model 008', 'All-weather solar street light', 'Street Lights', '/marketing_images/product_008.png'),
  ('Solar Street Light Model 009', 'High-power solar street light', 'Street Lights', '/marketing_images/product_009.png'),
  ('Solar Street Light Model 010', 'Energy-efficient solar street light', 'Street Lights', '/marketing_images/product_010.png'),
  ('Solar Accessory Model 011', 'Solar panel mounting bracket', 'Accessories', '/marketing_images/product_011.png'),
  ('Solar Accessory Model 012', 'Battery backup system', 'Accessories', '/marketing_images/product_012.png'),
  ('Solar Accessory Model 013', 'Solar charge controller', 'Accessories', '/marketing_images/product_013.png'),
  ('Solar Accessory Model 014', 'LED driver module', 'Accessories', '/marketing_images/product_014.png'),
  ('Solar Accessory Model 015', 'Weatherproof junction box', 'Accessories', '/marketing_images/product_015.png'),
  ('Solar Street Light Model 016', 'Decorative solar garden light', 'Street Lights', '/marketing_images/product_016.png'),
  ('Solar Street Light Model 017', 'Pathway solar light', 'Street Lights', '/marketing_images/product_017.png'),
  ('Solar Street Light Model 018', 'Commercial solar street light', 'Street Lights', '/marketing_images/product_018.png'),
  ('Solar Street Light Model 019', 'Solar flood light', 'Street Lights', '/marketing_images/product_019.png'),
  ('Solar Street Light Model 020', 'Solar security light', 'Street Lights', '/marketing_images/product_020.png'),
  ('Solar Accessory Model 021', 'Solar panel cleaning kit', 'Accessories', '/marketing_images/product_021.png'),
  ('Solar Accessory Model 022', 'Mounting pole for solar lights', 'Accessories', '/marketing_images/product_022.png'),
  ('Solar Accessory Model 023', 'Remote control system', 'Accessories', '/marketing_images/product_023.png'),
  ('Solar Accessory Model 024', 'Battery management system', 'Accessories', '/marketing_images/product_024.png'),
  ('Solar Accessory Model 025', 'Solar panel extension cable', 'Accessories', '/marketing_images/product_025.png'),
  ('Solar Street Light Model 026', 'Solar bollard light', 'Street Lights', '/marketing_images/product_026.png'),
  ('Solar Street Light Model 027', 'Solar wall light', 'Street Lights', '/marketing_images/product_027.png'),
  ('Solar Street Light Model 028', 'Solar parking lot light', 'Street Lights', '/marketing_images/product_028.png'),
  ('Solar Street Light Model 029', 'Solar area light', 'Street Lights', '/marketing_images/product_029.png'),
  ('Solar Street Light Model 030', 'Solar landscape light', 'Street Lights', '/marketing_images/product_030.png');
