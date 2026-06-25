import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BookingsTable from "@/components/admin/BookingsTable";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = bookings.map((b) => ({
    ...b,
    preferredDate: b.preferredDate.toISOString(),
    createdAt: b.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-ink px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="mono-label text-teal block mb-2">Admin</span>
            <h1 className="font-display text-2xl text-parchment">Charter requests</h1>
          </div>
          <LogoutButton />
        </div>

        <BookingsTable initialBookings={serialized} />
      </div>
    </div>
  );
}
