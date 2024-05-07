"use server";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth-options";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}