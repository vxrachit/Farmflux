from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Use service role key for backend operations
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
