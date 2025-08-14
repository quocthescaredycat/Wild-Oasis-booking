"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
  updateGuest as updateGuestapi,
  updateBooking as updateBookingapi,
  createBooking as createBookingapi,
  deleteBooking,
  getBookings,
} from "./data-service";
import { revalidatePath } from "next/cache";

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be signed in!");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  await createBookingapi(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  const session = await auth();
  if (!session) throw new Error("You must be signed in!");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You do not have permission to update this booking");

  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  await updateBookingapi(bookingId, updatedFields);

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be signed in!");
  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("You do not have permission to delete this reservation");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be signed in!");
  const nationalID = formData.get("nationalID");

  if (!/^\d{6,12}$/.test(nationalID))
    throw new Error(
      "National ID must be a numeric value between 6 and 12 digits"
    );

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const updatedFields = {
    nationalID,
    nationality,
    countryFlag,
  };
  const data = await updateGuestapi(session.user.guestId, updatedFields);
  if (!data) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
  redirect("/account/profile");
}
