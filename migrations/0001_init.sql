-- Products table
create table if not exists products (
  id text primary key,
  name text not null,
  description text not null,
  price numeric(12,2) not null,
  image_url text not null,
  category text not null,
  in_stock boolean not null default true,
  stock_quantity integer not null default 0,
  instagram_post_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Users table
create table if not exists users (
  id text primary key,
  email text not null unique,
  name text not null,
  role text not null check (role in ('admin','customer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger to update updated_at on update (products)
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at before update on products
for each row execute procedure set_updated_at();

drop trigger if exists users_set_updated_at on users;
create trigger users_set_updated_at before update on users
for each row execute procedure set_updated_at();


