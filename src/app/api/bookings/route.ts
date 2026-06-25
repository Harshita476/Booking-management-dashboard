import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation";

// Very basic in-memory rate limiting per IP (resets on server restart).
// Good enough to stop accidental double-submits / light abuse on a small site.
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 30_000;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const lastSubmit = recentSubmissions.get(ip);
    const now = Date.now();
    if (lastSubmit && now - lastSubmit < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        { error: "Please wait a moment before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Invalid input.", fieldErrors }, { status: 400 });
    }

    const { name, email, preferredDate, partySize, details } = parsed.data;

    const booking = await prisma.bookingRequest.create({
      data: {
        name,
        email,
        preferredDate: new Date(preferredDate + "T00:00:00"),
        partySize,
        details,
      },
    });

    recentSubmissions.set(ip, now);

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          name: booking.name,
          email: booking.email,
          preferredDate: booking.preferredDate,
          partySize: booking.partySize,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Booking creation failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
