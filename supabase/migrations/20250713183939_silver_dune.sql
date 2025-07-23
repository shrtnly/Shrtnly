/*
  # Fix user signup trigger

  1. Database Functions
    - Create `handle_new_user` function to automatically create user profiles
    - This function runs when a new user signs up via Supabase Auth

  2. Triggers
    - Create trigger on `auth.users` table to call the function
    - Ensures user profile is created automatically on signup

  3. Security
    - Function runs with security definer privileges
    - Handles the user profile creation safely
*/

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

-- Create trigger to automatically call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();