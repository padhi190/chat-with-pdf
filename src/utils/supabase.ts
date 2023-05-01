import { SupabaseClient, createClient } from '@supabase/supabase-js';

export class Supabase extends SupabaseClient {
  private static instance: SupabaseClient;

  private constructor() {
    // Initialize the singleton instance
    const privateKey = process.env.SUPABASE_PRIVATE_KEY;
    if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

    const url = process.env.SUPABASE_URL;
    if (!url) throw new Error(`Expected env var SUPABASE_URL`);
    
      Supabase.instance = createClient(url, privateKey);
      super(url, privateKey);
  }

  static getInstance():  SupabaseClient {
    if (!Supabase.instance) {
      Supabase.instance = new Supabase();
    }

    return Supabase.instance;
  }

  // Other methods and properties of the singleton class
}
