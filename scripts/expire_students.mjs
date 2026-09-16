import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://qjzoncdhfbeyvtiabsdk.supabase.co';
const SERVICE_KEY = process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
  console.error("Please set SERVICE_ROLE_KEY in .env.local or environment.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const THOR_ID = '7ba50a09-985b-4edd-a679-799f79d02353';
const AUGUST_2027_EXPIRY = new Date('2027-08-31T23:59:59.999Z');

async function processExpirations() {
  console.log('--- Checking Student Expirations ---');
  const now = new Date();
  console.log('Current time:', now.toISOString());
  console.log('Cutoff time:', AUGUST_2027_EXPIRY.toISOString());

  const { data: usersData, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (error) {
    console.error('Error listing users:', error);
    return;
  }

  let expiredCount = 0;
  for (const u of usersData.users) {
    // Safety check: Never expire Thor
    if (u.id === THOR_ID || u.email.toLowerCase() === 'thor@musictechguru.com') {
      continue;
    }

    const expiresAt = u.user_metadata?.expires_at;
    if (expiresAt && new Date(expiresAt) < now) {
      console.log(`Expiring user: ${u.email} (Expired at: ${expiresAt})`);
      
      const { error: updateErr } = await supabase
        .from('profiles')
        .update({
          is_premium: false
        })
        .eq('id', u.id);

      if (updateErr) {
        console.error(`Failed to update profile for ${u.email}:`, updateErr.message);
      } else {
        expiredCount++;
      }
    }
  }

  console.log(`\nDone. Expired ${expiredCount} student account(s).`);
}

processExpirations().catch(console.error);
