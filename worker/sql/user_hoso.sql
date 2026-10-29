-- Hồ sơ cá nhân theo tài khoản (GET/POST/DELETE /hoso). Riêng tư, chỉ chủ tài khoản.
CREATE TABLE IF NOT EXISTS user_hoso (
  user_id    TEXT NOT NULL,
  pkey       TEXT NOT NULL,
  value      TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (user_id, pkey)
);
