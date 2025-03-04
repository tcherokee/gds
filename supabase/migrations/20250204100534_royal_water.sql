/*
  # Create game chat table

  1. New Tables
    - `game_chat`
      - `id` (uuid, primary key)
      - `game_id` (text, required)
      - `user_id` (uuid, required)
      - `username` (text, required)
      - `content` (text, required)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `game_chat` table
    - Add policies for authenticated users to:
      - Read messages for their game
      - Insert their own messages
*/

CREATE TABLE IF NOT EXISTS game_chat (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  username text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_chat ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read messages for their game
CREATE POLICY "Users can read game chat"
  ON game_chat
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert their own messages
CREATE POLICY "Users can insert their own messages"
  ON game_chat
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);