import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, patient } = await req.json();
    // type: 'confirmed' | 'cancelled'
    // patient: { name, email, phone, treatment, preferred_date, appointment_time, clinic_location }

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

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dr. Smile Dental <onboarding@resend.dev>',
        to: [patient.email],
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, data }), {
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
