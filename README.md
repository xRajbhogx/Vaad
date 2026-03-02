# Vaad — One Good Argument

## Philosophy

Online debate is broken by format, not by people.

Twitter rewards the most outrageous take, not the most reasoned one. WhatsApp groups dissolve into interruptions. YouTube comments are performance, not argument. The problem is not that people are wrong — it is that the format punishes careful reasoning and rewards noise.

Vaad fixes the format.

Two participants. One topic. Timed turns. No interruptions possible — the microphone cuts off when your time is up. Every turn is transcribed automatically and preserved. Readers evaluate argument quality across four dimensions: logic, evidence, engagement, and cross-examination quality.

The core belief behind Vaad:

> Argument quality and winning are not the same thing.

A person can dominate a room without making a single good argument. Vaad does not declare winners. It exposes structure and lets readers judge quality.

Every design decision in this codebase exists to serve that belief.

---

## What It Is

Vaad is structured debate infrastructure. Built for FOSS Hack 2026 by **[your name]**, team mama.

### Core Features

- Create a debate with a clearly defined topic
- Anonymous authentication (no signup friction)
- Invite an opponent via deep link
- Four structured rounds:
  - Opening Statement
  - Cross-Examination
  - Rebuttal
  - Closing Statement
- Hard timer enforcement (microphone cuts at zero)
- Automatic transcription using Whisper
- Public debate pages with structured transcripts
- Four-dimension voting system (no winner declared)

---

## Architecture Overview

Vaad is built with:

- React Native (Expo)
- Supabase (PostgreSQL + Realtime + Storage)
- Supabase Anonymous Auth
- Row-Level Security (RLS) enforced on all tables
- Whisper (self-hosted) for transcription

### Debate Lifecycle

Debates move through structured states:
draft → waiting → active → completed → published
↘ cancelled


- `draft` prevents zombie debates
- `waiting` means lobby open
- `active` means debate in progress
- `completed` means all turns finished
- `published` makes debate publicly readable

This lifecycle keeps the database consistent and safe.

---

## Authentication Model

Vaad uses **Supabase Anonymous Auth** for MVP.

- No email required
- Each device gets a unique `auth.users` ID
- A matching `profiles` row is auto-created
- Full RLS enforcement enabled from Day 1

This allows:

- Debate ownership tracking
- One vote per user per debate
- Secure data access
- Future upgrade to real accounts without migration

---

## Database Design

The schema is designed for long-term expansion.

It already supports:

- Async debates (MVP)
- Future live audio (WebRTC)
- Future video debates
- Friend system
- Direct invites
- Comments
- AI summaries
- Event logging

### Core Tables

- `profiles`
- `debates`
- `debate_participants`
- `turns`
- `media_assets`
- `debate_votes`
- `highlights`
- `comments`
- `friendships`
- `debate_invites`
- `debate_events`

All tables use strict Row-Level Security.

---

## How to Run Locally

### Prerequisites

- Node.js 18+
- Expo CLI  
  ```bash
  npm install -g expo

  iOS Simulator / Android Emulator / Expo Go

Create a new project at https://supabase.com

Open SQL Editor

Copy and run the contents of:

supabase/schema.sql

Then copy and run:

supabase/policies.sql

This creates all tables, enums, and RLS policies.

4. Storage Setup

Go to Storage

Create a bucket named:

debate-audio

Set it to Private

Add the storage policies from:

supabase/storage.sql
5. Enable Realtime

In Supabase → Database → Replication:

Enable Realtime for:

debates

debate_participants

turns

6. Start the App
npx expo start
Security Model
### Vaad enforces strict Row-Level Security:

Users can only manage debates they created

Users can only insert themselves as participants

Users can vote only once per debate

Public users can read only published debates

No table is globally writable

--The database enforces these guarantees — not the frontend.

### Voting System

Each voter submits one vote per debate.

Each vote rates both participants across four dimensions:

Logical reasoning

Evidence-based argument

Engagement with opponent

Cross-examination sharpness

No winner is declared. Only structured quality metrics.

### Future Roadmap

Designed but not yet implemented:

Live audio streaming (WebRTC)

Video debates

Friend system

Direct debate challenges

Real-time partial transcription

AI summaries per round

Debate analytics dashboard

Trending debates algorithm

The schema already supports these without migration.

Repository Structure
supabase/
  schema.sql
  policies.sql
  storage.sql

All database setup is fully reproducible. No hidden dashboard configuration required.