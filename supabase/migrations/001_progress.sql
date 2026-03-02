CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  module_slug TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  UNIQUE(user_id, module_slug)
);
