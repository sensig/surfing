// supabaseClient.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://iowivkgrejrwddohzemm.supabase.co'
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvd2l2a2dyZWpyd2Rkb2h6ZW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNDMxMTcsImV4cCI6MjAyNTYxOTExN30.yNQrYr2UpH2mggu0_ha06fuiL0Wx44772rEaBtTRRdU'

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
