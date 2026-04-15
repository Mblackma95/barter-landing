import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Survey data was not readable." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        message:
          "Survey page is ready. Add GOOGLE_SHEETS_WEBHOOK_URL to save responses in Google Sheets.",
      },
      { status: 503 },
    );
  }

  let response: Response;

  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
    });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the Google Sheets webhook URL." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const details = await response.text();

    return NextResponse.json(
      {
        message: `Google Sheets did not accept this response yet. Status: ${response.status}. ${details.slice(0, 180)}`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message:
      "Survey saved. Thank you for helping shape where BarterTogether goes next.",
  });
}
