import { createClient } from '@supabase/supabase-js'
import.meta.env
// Directly paste your URL and anon key here from Supabase dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
