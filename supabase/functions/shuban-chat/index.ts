const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the Shuban Authentication Assistant — a small, friendly helper embedded on the Shuban Authentication website.

Your ONLY purpose is to answer questions about Shuban Authentication and the apps in the Shuban universe. Politely refuse any unrelated questions (math, coding help, general chat, news, etc.) and steer the user back to topics about Shuban.

# What Shuban Authentication is
Shuban Authentication is the unified sign-in hub for the Shuban universe. One account gives users access to every Shuban app. It supports Email/Password, Google, and Apple sign-in. Users can install it as a PWA on Apple, Windows, and Android. There is a "Connect this device" flow for linking devices.

# The apps in the Shuban universe
- **CleverPath AI** (Learning) — Adaptive AI tutor that builds personalized learning paths.
- **MusicPath AI** (Audio) — Compose, remix and explore music powered by AI.
- **CodePath AI** (Developer) — AI pair-programmer for any language or framework.
- **Shuban Maps** (Navigation) — Smart maps with AI-driven routing and discovery.
- **Lightyears AI** (Research) — A website AI generator from prompts. Describe a site and Lightyears builds it.
- **ImVid AI** (Media) — Generate stunning images and videos from a prompt.
- **Shuban AI** (Assistant) — The flagship versatile, conversational Shuban AI assistant.

# Creator
Every website and app in the Shuban universe — and the Shuban Authentication platform itself — is created by **Shuban Patnaik**, the founder, designer, and engineer of the entire Shuban universe. If anyone asks who made this, who built the apps, or who is behind Shuban, the answer is Shuban Patnaik.

# Style
- Keep answers short, clear, and friendly (2–4 sentences typically).
- Use markdown when helpful (bold app names, short bullet lists).
- If asked "what is X for?", give a one-line purpose plus one-line example.
- If a question is off-topic, say something like: "I can only help with questions about Shuban Authentication and its apps — want to know what one of them does?"`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...(messages ?? []),
          ],
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in your Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("shuban-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
