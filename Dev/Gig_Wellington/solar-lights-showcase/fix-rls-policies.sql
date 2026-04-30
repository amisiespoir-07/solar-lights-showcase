-- Fix Row Level Security policies for products table to allow delete

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated delete" ON products;
DROP POLICY IF EXISTS "Allow authenticated update" ON products;
DROP POLICY IF EXISTS "Allow authenticated insert" ON products;

-- Recreate policies with correct permissions
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Verify RLS is enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
