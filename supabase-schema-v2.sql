-- Run this in your Supabase SQL editor

-- Add type to repair_requests (repair | sell_offer)
ALTER TABLE repair_requests
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'repair';

-- Services / pricing table
CREATE TABLE IF NOT EXISTS services (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        text NOT NULL,
  description text NOT NULL DEFAULT '',
  price       text NOT NULL,
  sort_order  int  NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read services"   ON services FOR SELECT TO anon      USING (true);
CREATE POLICY "Admins can insert services" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update services" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can delete services" ON services FOR DELETE TO authenticated USING (true);

-- 3. Boards for sale table
CREATE TABLE IF NOT EXISTS boards_for_sale (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text    NOT NULL,
  size       text    NOT NULL DEFAULT '',
  condition  text    NOT NULL DEFAULT '',
  price      text    NOT NULL,
  visible    boolean NOT NULL DEFAULT true,
  sort_order int     NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE boards_for_sale ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible boards"  ON boards_for_sale FOR SELECT TO anon      USING (visible = true);
CREATE POLICY "Admins can read all boards"      ON boards_for_sale FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert boards"        ON boards_for_sale FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update boards"        ON boards_for_sale FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can delete boards"        ON boards_for_sale FOR DELETE TO authenticated USING (true);

-- 4. Seed services with current pricing
INSERT INTO services (name, description, price, sort_order) VALUES
  ('Small ding repair',     'Single pressure ding or small crack, up to 3cm',          '$20',      1),
  ('Medium ding repair',    'Larger crack, multiple dings, or rail damage',             '$40',      2),
  ('Large ding / deep crack','Deep structural cracks or heavy impact damage',           '$60–$90',  3),
  ('Delamination (small)',  'Bubbling or lifted fibreglass, palm-sized area',           '$50',      4),
  ('Delamination (large)',  'Extensive delam covering a large section',                 'Quote',    5),
  ('Snap repair',           'Full board snap — structural resin and glass work',        'Quote',    6),
  ('Fin box repair',        'Loose, cracked, or fully removed fin box',                 '$35–$60',  7),
  ('Full board respray',    'Sanded back and reglassed. New life, new look.',           'Quote',    8);

-- 5. Seed boards for sale
INSERT INTO boards_for_sale (name, size, condition, price, sort_order) VALUES
  ('Various shortboards',    '5''8″ – 6''4″', 'Repaired / good', 'From $150', 1),
  ('Mid-lengths',            '6''6″ – 7''6″', 'Repaired / good', 'From $200', 2),
  ('Longboards',             '8''0″+',         'Repaired / good', 'From $250', 3),
  ('Foamies / learner boards','Various',        'Good condition',  'From $100', 4);
