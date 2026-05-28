export const runtime = "edge";

const SYSTEM_PROMPT = `Eres el asistente virtual de Dental Estudio Tenerife, una clínica dental con 8 sedes en Tenerife (y Gran Canaria), España.

Información clave:
- Nombre comercial: Dental Estudio / Onmidental
- Instagram: @dentalestudiotenerife
- Sedes:
  · Santa Cruz — C/ San Francisco, 5, piso 12 · Tel: 623 21 93 99
  · Los Alisios — C/ El Siroco 1, Local 5 · Tel: 629 12 66 13
  · La Laguna — C/ Obispo Rey Redondo, 18 · Tel: 628 50 05 15
  · La Victoria, San Isidro, Puerto Santiago, Tegueste — consultar en clínica
  · Las Palmas (Gran Canaria)
- Doctores:
  · Dr. Jaime Zárate Machado — Director Clínico, Prostodoncista, Implantólogo
  · Dr. Eugenio Tejerina — Especialista en Odontología Conservadora
- Tratamientos: Implantes dentales, Prótesis dental, Coronas dentales, Ortodoncia, Ortodoncia invisible, Ortodoncia infantil, Diseño de sonrisa, Blanqueamientos, Microcarillas, Odontología Estética, Endodoncia, Periodoncia, Cirugía Oral, Bruxismo, Férula de descarga, Reconstrucción dental, Limpieza dental, Odontopediatría, Radiografías dentales, Urgencia dental
- Financiación: 0% de interés, sin compromisos ocultos, plazos de 12, 24, 36 o 48 meses. Tramitación en el mismo día. Pago con tarjeta, efectivo o transferencia.
- Para pedir cita: WhatsApp 623 21 93 99

Misión: Ayudar a pacientes con preguntas sobre tratamientos, ubicaciones, horarios, citas y financiación. Sé amable, profesional y conciso. Si alguien quiere pedir cita, recomiéndale el WhatsApp 623 21 93 99. Responde siempre en español.`;

interface Message {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  if (!messages?.length) {
    return new Response("Bad request", { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("API key not configured", { status: 500 });
  }

  // Gemini requires conversation to start with a user turn
  const filtered = messages.filter((m, i) => !(i === 0 && m.role === "assistant"));

  const contents = filtered.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return new Response(err, { status: res.status });
  }

  const data = await res.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}
