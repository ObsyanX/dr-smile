import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // load .env

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing supabase credentials in env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
  }
});

async function run() {
  console.log("Signing in...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: "roy.tamaall@gmail.com",
    password: "Admin@123456",
  });

  if (authError) {
    console.error("Auth Error:", authError);
    return;
  }
  
  console.log("Sign in successful, user ID:", authData.user.id);
  
  console.log("Fetching user role...");
  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", authData.user.id)
    .maybeSingle();
    
  if (roleError) {
    console.error("Role Error:", roleError);
  } else {
    console.log("Role Data:", roleData);
  }
}

run();
