import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rjpwhlvfrafytdkjvxdp.supabase.co'
const supabaseKey = 'sb_publishable_ihEzf6DQd_MziSBVHYxLZw_cuHrf9eJ'

export const supabase = createClient(supabaseUrl, supabaseKey)