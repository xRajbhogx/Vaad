-- Before running these, make sure:

-- Enable RLS on all tables first
ALTER TABLE debates ENABLE ROW LEVEL SECURITY;
ALTER TABLE debate_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE debate_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE turns ENABLE ROW LEVEL SECURITY;

-- For storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- 🟣 1️⃣ debate_participants Policies
-- Creator inserts participants
CREATE POLICY "Creator inserts participants"
ON debate_participants
FOR INSERT
WITH CHECK (
  auth.uid() = profile_id
  AND EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = debate_participants.debate_id
    AND debates.created_by = auth.uid()
  )
);

-- Public reads published participants
CREATE POLICY "Public reads published participants"
ON debate_participants
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = debate_participants.debate_id
    AND debates.is_public = true
  )
);

-- Creator reads own participants
CREATE POLICY "Creator reads own participants"
ON debate_participants
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = debate_participants.debate_id
    AND debates.created_by = auth.uid()
  )
);


--🟣 2️⃣ debate_votes Policies
-- User inserts vote
CREATE POLICY "User inserts vote"
ON debate_votes
FOR INSERT
WITH CHECK (
  auth.uid() = voter_id
);

-- User reads votes
CREATE POLICY "User reads votes"
ON debate_votes
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = debate_votes.debate_id
    AND debates.is_public = true
  )
);
-- 🟣 3️⃣ debates Policies
-- Creator updates own debates
CREATE POLICY "Creator updates own debates"
ON debates
FOR UPDATE
USING (auth.uid() = created_by);

-- Creator reads own debates
CREATE POLICY "Creator reads own debates"
ON debates
FOR SELECT
USING (auth.uid() = created_by);

-- Creator inserts debate
CREATE POLICY "Creator inserts debate"
ON debates
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Public reads published debates
CREATE POLICY "Public reads published debates"
ON debates
FOR SELECT
USING (is_public = true);

--🟣 4️⃣ media_assets Policies
-- Creator inserts media
CREATE POLICY "Creator inserts media"
ON media_assets
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = media_assets.debate_id
    AND debates.created_by = auth.uid()
  )
);

-- Public reads published media
CREATE POLICY "Public reads published media"
ON media_assets
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = media_assets.debate_id
    AND debates.is_public = true
  )
);

-- Creator reads own media
CREATE POLICY "Creator reads own media"
ON media_assets
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = media_assets.debate_id
    AND debates.created_by = auth.uid()
  )
);


-- 🟣 5️⃣ profiles Policies
-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Users can read own profile
CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);

-- 🟣 6️⃣ turns Policies
-- Creator inserts turns
CREATE POLICY "Creator inserts turns"
ON turns
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = turns.debate_id
    AND debates.created_by = auth.uid()
  )
);

-- Public reads published turns
CREATE POLICY "Public reads published turns"
ON turns
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = turns.debate_id
    AND debates.is_public = true
  )
);

-- Creator reads own turns
CREATE POLICY "Creator reads own turns"
ON turns
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM debates
    WHERE debates.id = turns.debate_id
    AND debates.created_by = auth.uid()
  )
);

--🟣 7️⃣ storage.objects Policies
-- Authenticated users can upload audio
CREATE POLICY "Authenticated users can upload audio"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'debate-audio');

-- Participants can read their debate audio
CREATE POLICY "Participants can read their debate audio"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'debate-audio');