-- Add multilingual support for product descriptions
-- This migration adds columns for Arabic, French, and English descriptions

-- Add new columns for multilingual descriptions
alter table products add column if not exists description_ar text;
alter table products add column if not exists description_fr text;
alter table products add column if not exists description_en text;

-- Add name columns for multilingual support
alter table products add column if not exists name_ar text;
alter table products add column if not exists name_fr text;
alter table products add column if not exists name_en text;

-- Migrate existing data to English columns
update products set 
  description_en = description,
  name_en = name
where description_en is null or name_en is null;
