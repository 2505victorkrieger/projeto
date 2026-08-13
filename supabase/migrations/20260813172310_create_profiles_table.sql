/*
# Create profiles table for NexerX CRM

## Purpose
Stores user profile data (name, avatar) linked 1:1 to Supabase auth.users.
This extends the built-in auth.users table with app-specific fields needed
by the CRM (display name, avatar URL).

## New Tables
- `profiles`
  - `id` (uuid, primary key) — references auth.users(id), ON DELETE CASCADE
  - `name` (text) — display name shown in the UI
  - `avatar_url` (text, nullable) — optional profile picture URL
  - `created_at` (timestamptz) — row creation time
  - `updated_at` (timestamptz) — row last update time

## Security (RLS)
- Row Level Security enabled on `profiles`.
- Users can SELECT only their own profile row.
- Users can INSERT only their own profile row (checked via WITH CHECK).
- Users can UPDATE only their own profile row (USING + WITH CHECK).
- Users can DELETE only their own profile row.
- All policies scoped to `TO authenticated` using `auth.uid() = id`.

## Important Notes
1. The `id` column defaults to `auth.uid()` so that an insert omitting `id`
   is automatically scoped to the signed-in user.
2. A trigger auto-creates a profile row whenever a new auth.users row is
   inserted, using the user's metadata `name` if available.
3. An `updated_at` trigger keeps the `updated_at` column current on UPDATE.
*/

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: users can read only their own profile
DROP POLICY IF EXISTS "select_own_profile" ON public.profiles;
CREATE POLICY "select_own_profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- INSERT: users can insert only their own profile
DROP POLICY IF EXISTS "insert_own_profile" ON public.profiles;
CREATE POLICY "insert_own_profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- UPDATE: users can update only their own profile
DROP POLICY IF EXISTS "update_own_profile" ON public.profiles;
CREATE POLICY "update_own_profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE: users can delete only their own profile
DROP POLICY IF EXISTS "delete_own_profile" ON public.profiles;
CREATE POLICY "delete_own_profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Auto-create a profile row when a new auth.users row is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at on profile changes
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
