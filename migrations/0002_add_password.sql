-- Add password hash column to users
alter table users add column if not exists password_hash text;

-- Ensure not null by defaulting empty for existing, then set not null
update users set password_hash = coalesce(password_hash, '') where password_hash is null;

alter table users alter column password_hash set not null;


