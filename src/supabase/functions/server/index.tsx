import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase clients
const getSupabaseAdmin = () => createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const getSupabaseClient = () => createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-76a1e259/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-76a1e259/signup", async (c) => {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ error: "Missing required fields: name, email, password" }, 400);
    }

    const supabase = getSupabaseAdmin();
    
    // Create user with auto-confirmed email
    const { data: userData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (authError) {
      console.error("Signup error while creating user:", authError);
      return c.json({ error: `Authentication error: ${authError.message}` }, 400);
    }

    if (!userData.user) {
      return c.json({ error: "Failed to create user" }, 500);
    }

    // Store user profile in KV store
    const userProfile = {
      id: userData.user.id,
      name,
      email,
      xp: 0,
      career: null,
      careerName: null,
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${userData.user.id}`, userProfile);

    return c.json({ 
      success: true, 
      user: userProfile,
      message: "User registered successfully" 
    });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: `Server error during signup: ${error.message}` }, 500);
  }
});

// Sign in endpoint
app.post("/make-server-76a1e259/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Missing required fields: email, password" }, 400);
    }

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      return c.json({ error: `Authentication error: ${error.message}` }, 401);
    }

    if (!data.session) {
      return c.json({ error: "No session created" }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${data.user.id}`);

    return c.json({ 
      success: true,
      accessToken: data.session.access_token,
      user: userProfile,
      message: "Signed in successfully"
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return c.json({ error: `Server error during sign in: ${error.message}` }, 500);
  }
});

// Get user profile (requires auth)
app.get("/make-server-76a1e259/user-profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error("Auth error while fetching user profile:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);

    if (!userProfile) {
      return c.json({ error: "User profile not found" }, 404);
    }

    return c.json({ success: true, user: userProfile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return c.json({ error: `Server error fetching profile: ${error.message}` }, 500);
  }
});

// Update career (requires auth)
app.post("/make-server-76a1e259/update-career", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error("Auth error while updating career:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { career, careerName } = await c.req.json();

    if (!career || !careerName) {
      return c.json({ error: "Missing required fields: career, careerName" }, 400);
    }

    const userProfile = await kv.get(`user:${user.id}`);

    if (!userProfile) {
      return c.json({ error: "User profile not found" }, 404);
    }

    const updatedProfile = {
      ...userProfile,
      career,
      careerName,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${user.id}`, updatedProfile);

    return c.json({ success: true, user: updatedProfile });
  } catch (error) {
    console.error("Error updating career:", error);
    return c.json({ error: `Server error updating career: ${error.message}` }, 500);
  }
});

// Update XP (requires auth)
app.post("/make-server-76a1e259/update-xp", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error("Auth error while updating XP:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { xpToAdd } = await c.req.json();

    if (typeof xpToAdd !== 'number' || xpToAdd < 0) {
      return c.json({ error: "Invalid XP value" }, 400);
    }

    const userProfile = await kv.get(`user:${user.id}`);

    if (!userProfile) {
      return c.json({ error: "User profile not found" }, 404);
    }

    const updatedProfile = {
      ...userProfile,
      xp: (userProfile.xp || 0) + xpToAdd,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${user.id}`, updatedProfile);

    return c.json({ 
      success: true, 
      user: updatedProfile,
      message: `Added ${xpToAdd} XP`
    });
  } catch (error) {
    console.error("Error updating XP:", error);
    return c.json({ error: `Server error updating XP: ${error.message}` }, 500);
  }
});

// Update learning progress (requires auth)
app.post("/make-server-76a1e259/update-progress", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error("Auth error while updating progress:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { type, itemId, progress } = await c.req.json();

    if (!type || !itemId) {
      return c.json({ error: "Missing required fields: type, itemId" }, 400);
    }

    const progressKey = `progress:${user.id}:${type}:${itemId}`;
    const progressData = {
      userId: user.id,
      type,
      itemId,
      progress,
      updatedAt: new Date().toISOString()
    };

    await kv.set(progressKey, progressData);

    return c.json({ 
      success: true, 
      progress: progressData,
      message: "Progress updated successfully"
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return c.json({ error: `Server error updating progress: ${error.message}` }, 500);
  }
});

// Get user progress (requires auth)
app.get("/make-server-76a1e259/progress/:type", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error("Auth error while fetching progress:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const type = c.req.param('type');
    const progressPrefix = `progress:${user.id}:${type}:`;
    
    const progressItems = await kv.getByPrefix(progressPrefix);

    return c.json({ 
      success: true, 
      progress: progressItems 
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return c.json({ error: `Server error fetching progress: ${error.message}` }, 500);
  }
});

// Sign out endpoint
app.post("/make-server-76a1e259/signout", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.auth.admin.signOut(accessToken);

    if (error) {
      console.error("Sign out error:", error);
      return c.json({ error: `Sign out error: ${error.message}` }, 400);
    }

    return c.json({ 
      success: true,
      message: "Signed out successfully" 
    });
  } catch (error) {
    console.error("Sign out error:", error);
    return c.json({ error: `Server error during sign out: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);
