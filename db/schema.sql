-- SG Explorer Database Schema
-- Run this in the Neon SQL Editor to create all tables.

CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT,
  full_desc TEXT,
  image TEXT,
  location TEXT,
  duration TEXT,
  price TEXT,
  tags TEXT[] DEFAULT '{}',
  lat REAL,
  lng REAL,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  tab TEXT NOT NULL CHECK (tab IN ('week', 'month', 'recurring')),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  time TEXT,
  price TEXT,
  date_month TEXT,
  date_day TEXT,
  date_label TEXT,
  image TEXT,
  full_desc TEXT,
  tags TEXT[] DEFAULT '{}',
  lat REAL,
  lng REAL,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  meta TEXT,
  transport TEXT NOT NULL,
  image TEXT,
  vibe TEXT,
  description TEXT,
  getting_there TEXT,
  things_to_do TEXT[] DEFAULT '{}',
  lat REAL,
  lng REAL,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  name TEXT,
  description TEXT,
  url TEXT,
  email TEXT,
  payload JSONB,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
