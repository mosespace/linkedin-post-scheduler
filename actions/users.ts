"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { IUser } from "@/types/user";
import { User } from "@prisma/client";

interface IRegisterInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function createUser(data: IRegisterInputs) {
  try {
    if (!data) {
      throw new Error("Data is undefined");
    }

    // Check if user with the same email already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    // If user with the same email already exists, return an error response
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User with this email already exists`,
        },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Correctly structure the data for creating a new user
    const user = await db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
    });
    revalidatePath("/dashboard");
    return user;
  } catch (error: any) {
    console.log(error);
    throw error; // It's generally a good idea to re-throw the error or handle it appropriately
  }
}

export async function getSingleUser(id: any) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(id: string, data: any) {
  try {
    // Retrieve the user from the database using the id
    const user = await db.user.findUnique({
      where: { id },
    });

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Remove the id field from the data object
    const { id: userId, ...userData } = data;

    // Proceed with updating the user
    const updatedUser = await db.user.update({
      where: { id },
      data: userData, // Use the modified data object
    });

    // Perform any necessary post-update actions
    revalidatePath("/dashboard");

    console.log(updatedUser);
    return updatedUser;
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw error;
  }
}
