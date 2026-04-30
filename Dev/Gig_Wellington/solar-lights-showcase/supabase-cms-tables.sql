-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON testimonials
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access" ON faqs
  FOR SELECT
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Allow authenticated insert" ON testimonials
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON testimonials
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON testimonials
  FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON faqs
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON faqs
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON faqs
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content, rating) VALUES
  ('Michael Chen', 'Property Manager', 'Solar Lumina transformed our parking lot lighting. The installation was seamless, and we''ve seen a 70% reduction in energy costs. Highly recommended!', 5),
  ('Sarah Johnson', 'Homeowner', 'I installed their solar garden lights around my property. They look beautiful and work perfectly every night. No more electricity bills for outdoor lighting!', 5),
  ('David Martinez', 'City Council Member', 'We equipped our community park with Solar Lumina street lights. The quality is outstanding and the environmental impact is exactly what we needed.', 5);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, order_index) VALUES
  ('How long do solar lights last?', 'Our solar lights are designed to last 5-10 years with proper maintenance. The LED bulbs can last up to 50,000 hours, and the solar panels maintain 80% efficiency after 25 years.', 1),
  ('Do solar lights work in cloudy weather?', 'Yes! Solar lights can charge even on cloudy days, though they may not reach full capacity. The built-in batteries store energy for multiple days of operation, ensuring consistent lighting.', 2),
  ('What maintenance is required?', 'Minimal maintenance is needed. Simply clean the solar panels every few months to remove dust and debris. Check batteries every 2-3 years and replace if necessary.', 3),
  ('How bright are solar street lights?', 'Our solar street lights range from 2,000 to 10,000 lumens depending on the model, providing excellent illumination comparable to traditional street lights.', 4),
  ('Can I install solar lights myself?', 'Yes! Most of our solar lights are designed for easy DIY installation. They require no wiring or electrical work. Simply mount them in a sunny location and they''re ready to go.', 5),
  ('What warranty do you offer?', 'We offer a 2-year warranty on all products covering manufacturing defects. Extended warranties are available for commercial installations.', 6);
