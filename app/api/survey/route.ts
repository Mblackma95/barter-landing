import { NextResponse } from "next/server";

const requiredFields = ["city", "country", "expansionCity"] as const;

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

  const missingField = requiredFields.find((field) => !payload[field]);

  if (missingField) {
    return NextResponse.json(
      { message: "Please add your city, country, and expansion city." },
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

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Google Sheets did not accept this response yet." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message:
      "Survey saved. Thank you for helping shape where BarterTogether goes next.",
  });
}
