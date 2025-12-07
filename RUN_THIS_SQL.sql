-- ============================================
-- RUN THIS SQL IN YOUR PostgreSQL DATABASE
-- ============================================

-- Connect to database: volunteer_hub
-- Then run this:

ALTER TABLE users ADD COLUMN user_type VARCHAR(20) NOT NULL DEFAULT 'VOLUNTEER';

-- Update existing users based on is_admin
UPDATE users SET user_type = 'ADMIN' WHERE is_admin = true;
UPDATE users SET user_type = 'VOLUNTEER' WHERE is_admin = false;

-- Verify the result
SELECT user_id, email, full_name, is_admin, user_type FROM users;

-- ============================================
-- HOW TO RUN:
-- ============================================
-- Option 1: pgAdmin
--   1. Open pgAdmin
--   2. Connect to volunteer_hub database
--   3. Open Query Tool (Tools > Query Tool)
--   4. Copy paste this SQL
--   5. Click Execute (F5)
--
-- Option 2: DBeaver
--   1. Open DBeaver
--   2. Connect to volunteer_hub
--   3. Open SQL Editor
--   4. Copy paste this SQL
--   5. Execute (Ctrl+Enter)
--
-- Option 3: Command line (if psql is in PATH)
--   psql -U postgres -d volunteer_hub -f RUN_THIS_SQL.sql
-- ============================================
