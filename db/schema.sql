CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  lang text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Rate limiting: one row per contact attempt, keyed by a hashed IP.
CREATE TABLE IF NOT EXISTS contact_attempts (
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_attempts_ip_idx ON contact_attempts (ip_hash, created_at);
