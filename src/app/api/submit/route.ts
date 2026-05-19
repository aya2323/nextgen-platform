import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const required = ["name", "company", "whatsapp"];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const submissionId = `NG-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const submission = {
      id: submissionId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    console.log("[NEXTGEN] New submission:", JSON.stringify(submission, null, 2));

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Project data received successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
