---------- Day 01 -------------------------
feat: initialize Vaad — schema, navigation, home screen

- PostgreSQL schema: debates, participants, turns, highlights, votes
- Row-level constraints and foreign keys on all tables
- Realtime publication on debates, participants, turns
- Private storage bucket with authenticated upload policy
- Expo Stack Navigator for all 6 screens
- Home screen: amber wordmark, CTA button, debate feed
- Structure of Create Debate Screen
- Color palette established.


---------- Day 02 ----------------------
feat: create debate screen with Supabase insert + secure lifecycle

-Anonymous Supabase auth initialized on app start with session persistence
-Profile auto-created on first anonymous login (RLS-safe upsert)
-CreateDebateScreen implemented with:
--Topic input (multiline, 200 char limit + counter)
--Name input (40 char limit)
--Format selector (Quick / Standard / Deep with durations)
--Loading + disabled button state
--Input validation for topic and name
--Debate creation flow redesigned with safe lifecycle:
    Debate inserted as draft
    Proposition participant row inserted
    Debate status updated to waiting only after successful participant insert
    Automatic rollback (delete draft) on failure to prevent zombie debates
--Proper foreign key alignment with new schema:
    debate_participants used instead of old participants
    profile_id + display_name aligned with DB schema
--RLS hardened:
    Profiles insert policy added
    Debate creator read policy added
    Participant insert policy scoped to debate creator
    All related tables updated with consistent ownership rules
--Navigation to Lobby with debateId + participantId params

App initialization now blocks rendering until auth + profile guaranteed (race condition removed)