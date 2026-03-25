// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');

    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured in Supabase Edge Function Secrets.");
    }

    const { prompt, keywords, tone } = await req.json();

    if (!prompt) {
      throw new Error("Missing 'prompt' in request body.");
    }

    const systemPrompt = `
You are an expert dental SEO copywriter for Dr. Tamal Roy from ToothZone Dental Clinic.
Your goal is to write a highly engaging, medically accurate, and SEO-optimized blog post.
The tone should be ${tone || 'professional, empathetic, and authoritative'}.

CRITICAL INSTRUCTIONS:
1. Output ONLY valid HTML formatting (use <h2>, <h3>, <p>, <ul>, <li>, <strong>).
2. DO NOT wrap the output in markdown code blocks (\`\`\`html) or include any introductory text like "Here is the blog".
3. Naturally include the target keywords: ${keywords || 'best dentist'}.
4. Aim for around 800 - 1000 words for maximum SEO value.
5. Include a strong concluding paragraph with a Call to Action (CTA) to book an appointment at ToothZone Dental Clinic in Madhyamgram/Dum Dum.
`;

    // Make request to Groq OpenAI-compatible endpoint
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Using the highly capable 70B model for rich text
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Write a complete dental blog post about: ${prompt}` }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      throw new Error(`Groq API Failed: ${response.status}`);
    }

    const data = await response.json();
    let generatedHtml = data.choices[0]?.message?.content || "";

    // Clean up if the AI accidentally wrapped it in markdown anyway
    generatedHtml = generatedHtml.replace(/```html/g, '').replace(/```/g, '').trim();

    return new Response(JSON.stringify({ content: generatedHtml }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
