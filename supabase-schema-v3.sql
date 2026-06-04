-- Add image_url column to boards_for_sale
ALTER TABLE boards_for_sale
  ADD COLUMN IF NOT EXISTS image_url text;
