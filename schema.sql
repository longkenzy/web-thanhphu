CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  categoryName TEXT NOT NULL,
  client TEXT,
  location TEXT,
  year TEXT,
  value TEXT,
  scale TEXT,
  thumbnail TEXT,
  gallery TEXT,
  description TEXT,
  highlights TEXT,
  featured INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  categoryName TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  date TEXT,
  author TEXT,
  thumbnail TEXT,
  featured INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  salary TEXT,
  deadline TEXT,
  working_hours TEXT,
  type TEXT,
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  active INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS slides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  tag TEXT,
  image TEXT NOT NULL,
  projectLink TEXT,
  stats TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO users (id, username, password_hash, name, role)
VALUES (
  'user-admin-1',
  'admin',
  '03f2abc18e5d21007000b9c04c17edfea0800450ab1198a72fc535d589baf506',
  'Quản Trị Viên Thành Phú',
  'admin'
);

CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  logo TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
