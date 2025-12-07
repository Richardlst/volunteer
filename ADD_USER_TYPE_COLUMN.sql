-- SQL Script to add user_type column to users table
-- Run this in your PostgreSQL database

-- Add user_type column
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) NOT NULL DEFAULT 'VOLUNTEER';

-- Update existing users based on is_admin flag
UPDATE users SET user_type = 'ADMIN' WHERE is_admin = true;
UPDATE users SET user_type = 'VOLUNTEER' WHERE is_admin = false;

-- Verify the changes
SELECT user_id, email, full_name, is_admin, user_type FROM users;
