import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const GMAIL_USER = Deno.env.get('GMAIL_USER');
  const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Gmail credentials not configured');
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, patient } = await req.json();

    let subject: string;
    let html: string;

    if (type === 'confirmed') {
      subject = '✅ Appointment Confirmed – Dr. Smile Dental';
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2FB4C7;">Appointment Confirmed</h2>
          <p>Dear <strong>${patient.name}</strong>,</p>
          <p>Your dental appointment has been confirmed with the following details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Treatment</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.treatment}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Date</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.preferred_date || 'TBD'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Time</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.appointment_time}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Clinic</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.clinic_location || 'TBD'}</td></tr>
          </table>
          <p>If you need to reschedule, please contact us at <strong>+91 9804214790</strong>.</p>
          <p style="color: #666; font-size: 12px;">– Dr. Smile Dental Clinic</p>
        </div>
      `;
    } else if (type === 'reminder') {
      subject = '⏰ Appointment Reminder – Dr. Smile Dental';
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2FB4C7;">Appointment Reminder</h2>
          <p>Dear <strong>${patient.name}</strong>,</p>
          <p>This is a friendly reminder that your dental appointment is <strong>tomorrow</strong>.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Treatment</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.treatment}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Date</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.preferred_date || 'TBD'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Time</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.appointment_time || 'TBD'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Clinic</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${patient.clinic_location || 'TBD'}</td></tr>
          </table>
          <p>If you need to reschedule, please contact us at <strong>+91 9804214790</strong>.</p>
          <p style="color: #666; font-size: 12px;">– Dr. Smile Dental Clinic</p>
        </div>
      `;
    } else {
      subject = '❌ Appointment Update – Dr. Smile Dental';
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #e74c3c;">Appointment Update</h2>
          <p>Dear <strong>${patient.name}</strong>,</p>
          <p>Unfortunately, your appointment for <strong>${patient.treatment}</strong> on <strong>${patient.preferred_date || 'the requested date'}</strong> could not be scheduled at this time.</p>
          <p>Please rebook at your convenience by visiting our website or calling us at <strong>+91 9804214790</strong>.</p>
          <p>We apologize for any inconvenience.</p>
          <p style="color: #666; font-size: 12px;">– Dr. Smile Dental Clinic</p>
        </div>
      `;
    }

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_APP_PASSWORD,
        },
      },
    });

    await client.send({
      from: GMAIL_USER,
      to: patient.email,
      subject,
      content: "Please view this email in an HTML-capable client.",
      html,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email send error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
