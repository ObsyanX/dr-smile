// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Missing environment variables' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find confirmed appointments happening in the next 24 hours that haven't been reminded
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    const today = new Date();
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    const todayDate = today.toISOString().split('T')[0];

    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'confirmed')
      .eq('reminder_sent', false)
      .gte('preferred_date', todayDate)
      .lte('preferred_date', tomorrowDate);

    if (error) throw error;
    if (!appointments || appointments.length === 0) {
      return new Response(JSON.stringify({ success: true, message: 'No reminders to send', count: 0 }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let sentCount = 0;

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
            subject: '⏰ Appointment Reminder – ToothZone Dental Clinic',
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
                <p style="color: #666; font-size: 12px;">– Dr. Tamal Roy </br> From ToothZone Dental Clinic</p>
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
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
