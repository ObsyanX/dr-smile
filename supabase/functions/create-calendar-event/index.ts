import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Parse time string like "10:30 AM" to hours and minutes
function parseTime(timeStr: string): { hours: number; minutes: number } {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return { hours: 10, minutes: 0 };
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const credsJson = Deno.env.get('GOOGLE_CALENDAR_CREDENTIALS');
  if (!credsJson) {
    return new Response(JSON.stringify({ error: 'GOOGLE_CALENDAR_CREDENTIALS not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const creds = JSON.parse(credsJson);
    const { patient } = await req.json();

    // Create JWT for Google API
    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const now = Math.floor(Date.now() / 1000);
    const claimSet = {
      iss: creds.client_email,
      scope: 'https://www.googleapis.com/auth/calendar',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
      sub: creds.client_email,
    };
    const claim = btoa(JSON.stringify(claimSet));

    // Import private key and sign
    const pemContents = creds.private_key
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\n/g, '');
    const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
      'pkcs8', binaryKey, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']
    );

    const signInput = new TextEncoder().encode(`${header}.${claim}`);
    const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, signInput);
    const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const jwt = `${header}.${claim}.${sig}`;

    // Get access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      throw new Error(`Token error: ${JSON.stringify(tokenData)}`);
    }

    // Create calendar event
    const date = patient.preferred_date || new Date().toISOString().split('T')[0];
    const { hours, minutes } = parseTime(patient.appointment_time || '10:00 AM');
    const startDate = new Date(`${date}T00:00:00+05:30`);
    startDate.setHours(hours, minutes, 0, 0);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 min appointment

    const event = {
      summary: `Dental: ${patient.treatment} - ${patient.name}`,
      description: `Patient: ${patient.name}\nPhone: ${patient.phone}\nTreatment: ${patient.treatment}\nClinic: ${patient.clinic_location || 'TBD'}`,
      start: { dateTime: startDate.toISOString(), timeZone: 'Asia/Kolkata' },
      end: { dateTime: endDate.toISOString(), timeZone: 'Asia/Kolkata' },
    };

    const calRes = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const calData = await calRes.json();
    if (!calRes.ok) {
      throw new Error(`Calendar API error [${calRes.status}]: ${JSON.stringify(calData)}`);
    }

    return new Response(JSON.stringify({ success: true, eventId: calData.id }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Calendar error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
