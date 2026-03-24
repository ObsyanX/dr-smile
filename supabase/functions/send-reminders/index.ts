import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
<<<<<<< HEAD
=======
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

<<<<<<< HEAD
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Missing environment variables' }), {
=======
  // ── Environment Variables ──────────────────────────────────────────────────
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const GMAIL_USER = Deno.env.get('GMAIL_USER');
  const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Missing Supabase environment variables' }), {
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

<<<<<<< HEAD
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find confirmed appointments happening in the next 24 hours that haven't been reminded
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    const today = new Date();
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    const todayDate = today.toISOString().split('T')[0];
=======
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Gmail credentials not configured — reminder emails cannot be sent');
    return new Response(JSON.stringify({ error: 'Gmail credentials not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  // ──────────────────────────────────────────────────────────────────────────

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find confirmed appointments happening in the next 24 hours that haven't been reminded.
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const todayDate = now.toISOString().split('T')[0];
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'confirmed')
      .eq('reminder_sent', false)
      .gte('preferred_date', todayDate)
      .lte('preferred_date', tomorrowDate);

    if (error) throw error;
<<<<<<< HEAD
=======

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
    if (!appointments || appointments.length === 0) {
      return new Response(JSON.stringify({ success: true, message: 'No reminders to send', count: 0 }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let sentCount = 0;

<<<<<<< HEAD
    for (const apt of appointments) {
      try {
        // Send reminder email
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dr. Smile Dental <onboarding@resend.dev>',
            to: [apt.email],
            subject: '⏰ Appointment Reminder – Dr. Smile Dental',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2FB4C7;">Appointment Reminder</h2>
                <p>Dear <strong>${apt.name}</strong>,</p>
                <p>This is a friendly reminder about your upcoming dental appointment:</p>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Treatment</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.treatment}</td></tr>
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Date</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.preferred_date}</td></tr>
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Time</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.appointment_time || 'TBD'}</td></tr>
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Clinic</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.clinic_location || 'TBD'}</td></tr>
                </table>
                <p>Need to reschedule? Call us at <strong>+91 9804214790</strong>.</p>
                <p style="color: #666; font-size: 12px;">– Dr. Smile Dental Clinic</p>
              </div>
            `,
          }),
        });

        if (res.ok) {
          // Mark reminder as sent
          await supabase
            .from('appointments')
            .update({ reminder_sent: true })
            .eq('id', apt.id);
          sentCount++;
        }
      } catch (e) {
        console.error(`Failed to send reminder for ${apt.id}:`, e);
      }
    }

    return new Response(JSON.stringify({ success: true, count: sentCount }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Reminder error:', error);
=======
    // Create a single SMTP client and reuse it for all reminders (more efficient).
    const client = new SMTPClient({
      connection: {
        hostname: 'smtp.gmail.com',
        port: 465,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_APP_PASSWORD,
        },
      },
    });

    for (const apt of appointments) {
      try {
        // Skip appointments with no email address.
        if (!apt.email) {
          console.warn(`Skipping reminder for appointment ${apt.id} — no email on record`);
          continue;
        }

        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2FB4C7;">⏰ Appointment Reminder</h2>
            <p>Dear <strong>${apt.name}</strong>,</p>
            <p>This is a friendly reminder that your dental appointment is <strong>tomorrow</strong>.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Treatment</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.treatment}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Date</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.preferred_date || 'TBD'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Time</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.appointment_time || 'TBD'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Clinic</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${apt.clinic_location || 'TBD'}</td></tr>
            </table>
            <p>Need to reschedule? Call us at <strong>+91 9804214790</strong>.</p>
            <p style="color: #666; font-size: 12px;">– Dr. Smile Dental Clinic</p>
          </div>
        `;

        await client.send({
          from: GMAIL_USER,
          to: apt.email,
          subject: '⏰ Appointment Reminder – Dr. Smile Dental',
          content: 'Please view this email in an HTML-capable client.',
          html,
        });

        // Mark reminder as sent so it is not resent on the next trigger.
        await supabase
          .from('appointments')
          .update({ reminder_sent: true })
          .eq('id', apt.id);

        sentCount++;
        console.log(`Reminder sent for appointment ${apt.id} → ${apt.email}`);
      } catch (e) {
        // Log individual failures but continue processing the rest.
        console.error(`Failed to send reminder for appointment ${apt.id}:`, e);
      }
    }

    try {
      await client.close();
    } catch (_) {
      // Ignore close errors — all emails were already sent.
    }

    return new Response(JSON.stringify({ success: true, count: sentCount, total: appointments.length }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('send-reminders error:', error);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
