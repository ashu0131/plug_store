import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yqmniirjoydgufqijxis.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbW5paXJqb3lkZ3VmcWlqeGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTQyODAsImV4cCI6MjA4OTM5MDI4MH0.rbZg0crucn1bICeudtICqH8f7iJKi5YrgQDhOX1Uj7I";

export const supabase = createClient(supabaseUrl, supabaseKey);