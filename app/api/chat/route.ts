import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body?.messages) {
    return NextResponse.json(
      { error: "Missing messages" },
      { status: 400 }
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      messages: body.messages
    })
  });

  const data = await response.json();
  return NextResponse.json(data);
}
