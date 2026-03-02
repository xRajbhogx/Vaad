-- =====================================================
--  VAAD FINAL PRODUCTION SCHEMA
--  Supabase PostgreSQL
-- =====================================================

-- -------------------------------
-- EXTENSIONS
-- -------------------------------
create extension if not exists "pgcrypto";

-- -------------------------------
-- CLEAN EXISTING PUBLIC TABLES
-- -------------------------------

do $$
declare
    r record;
begin
    -- disable RLS first
    for r in (select tablename from pg_tables where schemaname = 'public')
    loop
        execute 'alter table public.' || quote_ident(r.tablename) || ' disable row level security';
    end loop;

    -- drop all tables
    for r in (select tablename from pg_tables where schemaname = 'public')
    loop
        execute 'drop table if exists public.' || quote_ident(r.tablename) || ' cascade';
    end loop;
end $$;

-- drop custom types
do $$
declare
    r record;
begin
    for r in (
        select typname 
        from pg_type 
        where typnamespace = (select oid from pg_namespace where nspname = 'public')
    )
    loop
        execute 'drop type if exists public.' || quote_ident(r.typname) || ' cascade';
    end loop;
end $$;

-- =====================================================
-- ENUM TYPES
-- =====================================================

create type debate_status as enum (
  'draft',
  'waiting',
  'active',
  'completed',
  'published',
  'cancelled'
);

create type debate_mode as enum (
  'async',
  'live'
);

create type media_type_enum as enum (
  'audio',
  'video'
);

create type participant_side as enum (
  'proposition',
  'opposition'
);

create type turn_status as enum (
  'scheduled',
  'recording',
  'processing',
  'done',
  'failed'
);

create type friendship_status as enum (
  'pending',
  'accepted',
  'blocked'
);

create type invite_status as enum (
  'pending',
  'accepted',
  'declined',
  'expired'
);

-- =====================================================
-- IDENTITY LAYER
-- =====================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);

-- =====================================================
-- DEBATE CORE
-- =====================================================

create table debates (
  id uuid primary key default gen_random_uuid(),

  topic text not null,
  category text default 'general',

  format text not null check (format in ('quick','standard','deep')),

  mode debate_mode default 'async',
  media_type media_type_enum default 'audio',

  status debate_status default 'draft',

  created_by uuid not null references profiles(id),

  is_public boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index debates_status_idx on debates(status);
create index debates_public_idx on debates(is_public);

-- =====================================================
-- PARTICIPANTS
-- =====================================================

create table debate_participants (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,
  profile_id uuid references profiles(id),
  display_name text not null,
  side participant_side not null,

  joined_at timestamptz default now(),

  unique (debate_id, side)
);

create index debate_participants_debate_idx on debate_participants(debate_id);

-- =====================================================
-- TURNS
-- =====================================================

create table turns (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,
  participant_id uuid not null references debate_participants(id) on delete cascade,

  round text not null,
  turn_order integer not null,
  duration_seconds integer not null,

  status turn_status default 'scheduled',

  transcript_partial text,
  transcript_final text,

  started_at timestamptz,
  ended_at timestamptz,

  created_at timestamptz default now(),

  unique (debate_id, turn_order)
);

create index turns_debate_idx on turns(debate_id);

-- =====================================================
-- MEDIA ASSETS (Audio / Video Future-Proof)
-- =====================================================

create table media_assets (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,
  turn_id uuid not null references turns(id) on delete cascade,

  type media_type_enum not null,

  storage_path text not null,
  duration_seconds integer,

  created_at timestamptz default now()
);

create index media_turn_idx on media_assets(turn_id);

-- =====================================================
-- VOTING (ONE VOTE PER USER PER DEBATE)
-- =====================================================

create table debate_votes (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,
  voter_id uuid not null references profiles(id) on delete cascade,

  -- proposition ratings
  prop_logical integer not null check (prop_logical between 1 and 5),
  prop_evidence integer not null check (prop_evidence between 1 and 5),
  prop_engaged integer not null check (prop_engaged between 1 and 5),
  prop_cross integer not null check (prop_cross between 1 and 5),

  -- opposition ratings
  opp_logical integer not null check (opp_logical between 1 and 5),
  opp_evidence integer not null check (opp_evidence between 1 and 5),
  opp_engaged integer not null check (opp_engaged between 1 and 5),
  opp_cross integer not null check (opp_cross between 1 and 5),

  created_at timestamptz default now(),

  unique (debate_id, voter_id)
);

create index debate_votes_debate_idx on debate_votes(debate_id);

-- =====================================================
-- HIGHLIGHTS
-- =====================================================

create table highlights (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,
  turn_id uuid not null references turns(id) on delete cascade,
  created_by uuid references profiles(id),

  text text not null,

  created_at timestamptz default now()
);

-- =====================================================
-- COMMENTS (Future)
-- =====================================================

create table comments (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,
  profile_id uuid references profiles(id),

  parent_comment_id uuid references comments(id) on delete cascade,

  content text not null,

  created_at timestamptz default now()
);

-- =====================================================
-- FRIENDSHIPS (Future Social Layer)
-- =====================================================

create table friendships (
  id uuid primary key default gen_random_uuid(),

  requester_id uuid not null references profiles(id) on delete cascade,
  addressee_id uuid not null references profiles(id) on delete cascade,

  status friendship_status default 'pending',

  created_at timestamptz default now(),

  unique (requester_id, addressee_id)
);

-- =====================================================
-- DEBATE INVITES (Future)
-- =====================================================

create table debate_invites (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,
  sender_id uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,

  status invite_status default 'pending',

  created_at timestamptz default now()
);

-- =====================================================
-- DEBATE EVENTS (AI / Replay / Logs)
-- =====================================================

create table debate_events (
  id uuid primary key default gen_random_uuid(),

  debate_id uuid not null references debates(id) on delete cascade,

  type text not null,
  payload jsonb,

  created_at timestamptz default now()
);

-- =====================================================
-- AUTO UPDATE updated_at ON debates
-- =====================================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
   new.updated_at = now();
   return new;
end;
$$ language plpgsql;

create trigger update_debates_updated_at
before update on debates
for each row
execute function update_updated_at_column();
