-- Ensure pgcrypto for gen_random_uuid
create extension if not exists pgcrypto;

-- Users: make id uuid with default
alter table users
  alter column id type uuid using (case when id ~* '^[0-9a-f-]{8}-[0-9a-f-]{4}-[0-9a-f-]{4}-[0-9a-f-]{4}-[0-9a-f-]{12}$' then id::uuid else gen_random_uuid() end);
alter table users alter column id set default gen_random_uuid();

-- Products: make id uuid with default
alter table products
  alter column id type uuid using (case when id ~* '^[0-9a-f-]{8}-[0-9a-f-]{4}-[0-9a-f-]{4}-[0-9a-f-]{4}-[0-9a-f-]{12}$' then id::uuid else gen_random_uuid() end);
alter table products alter column id set default gen_random_uuid();


