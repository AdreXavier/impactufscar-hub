CREATE TABLE lessons_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  area_slug TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  completed_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, area_slug, lesson_slug)
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  area_slug TEXT NOT NULL,
  answer TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT now()
);
