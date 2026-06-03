-- Run this in the Supabase SQL editor to lock down repair_requests.
-- After running, anonymous users can only INSERT (submit requests),
-- while authenticated admins can SELECT, UPDATE, and DELETE.

-- Enable RLS on the table
ALTER TABLE repair_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a repair request
CREATE POLICY "Public can insert"
  ON repair_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (admins) can read all requests
CREATE POLICY "Admins can select"
  ON repair_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update status
CREATE POLICY "Admins can update"
  ON repair_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Admins can delete"
  ON repair_requests
  FOR DELETE
  TO authenticated
  USING (true);
