"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { updateGuest as updateGuestapi } from "./data-service";
import { revalidatePath } from "next/cache";

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
