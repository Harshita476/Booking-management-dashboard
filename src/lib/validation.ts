import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().email("That email doesn't look right.").max(160),
  preferredDate: z
    .string()
    .min(1, "Pick a preferred date.")
    .refine((val) => {
      const date = new Date(val + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Pick a date from today onward."),
  partySize: z.enum(["1–2 guests", "3–6 guests", "7–12 guests"], {
    errorMap: () => ({ message: "Select a party size." }),
  }),
  details: z
    .string()
    .trim()
    .min(8, "Tell us a bit more (route, occasion, etc).")
    .max(2000),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const statusUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "confirmed", "declined"]),
});
