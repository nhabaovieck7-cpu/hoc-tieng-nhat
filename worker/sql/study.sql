-- Theo dõi thời gian học (31/10/2026). Idempotent; Worker cũng tự tạo khi chạy (ensureStudy).
CREATE TABLE IF NOT EXISTS study_sessions(
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  started_at INTEGER NOT NULL,
  last_ping INTEGER NOT NULL,
  ended_at INTEGER,
  active_sec INTEGER NOT NULL DEFAULT 0,
  page TEXT, lesson TEXT,
  device TEXT
);
CREATE INDEX IF NOT EXISTS idx_ss_user ON study_sessions(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_ss_open ON study_sessions(ended_at, last_ping);
CREATE TABLE IF NOT EXISTS study_daily(
  user_id TEXT NOT NULL,
  day TEXT NOT NULL,
  active_sec INTEGER NOT NULL DEFAULT 0,
  sessions INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(user_id, day)
);
