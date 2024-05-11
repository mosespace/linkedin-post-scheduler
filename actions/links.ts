"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface ILinks {
  title: string;
  description: string;
  callToAction: string;
  socialMediaName?: string;
}

export async function createLink(data: any) {
  try {
    if (!data) {
      throw new Error("Data is undefined");
    }

    // Check if user with the same email already exists
    //   const existingUser = await db.link.findUnique({
    //     where: { id: data.id },
    //   });

    // If user with the same email already exists, return an error response
    //   if (existingUser) {
    //     return NextResponse.json(
    //       {
    //         data: null,
    //         message: `User with this email already exists`,
    //       },
    //       { status: 409 }
    //     );
    //   }

    // Correctly structure the data for creating a new user
    const link = await db.link.create({
      data: {
        ...data,
      },
    });
    revalidatePath("/dashboard");
    return link;
  } catch (error: any) {
    console.log(error);
    throw error; // It's generally a good idea to re-throw the error or handle it appropriately
  }
}
