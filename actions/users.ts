"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

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

// export async function getUser(id: any) {
//   try {
//     const user = await db.user.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     return user;
//   } catch (error: any) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function getUsers() {
//   try {
//     const users = await db.user.findMany({
//       include: {
//         resources: true,
//         categories: true,
//       },
//     });
//     return users;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function updateUser(id: any, data: any) {
//   try {
//     // Retrieve the user from the database using both id and userId
//     const user = await db.user.findUnique({
//       where: { id },
//     });
//     // console.log(`original user: ${user}`);
//     // Check if the user exists
//     if (!user) {
//       throw new Error("User not found");
//     }

//     // If the user matches, proceed with updating the it
//     const updateUser = await db.user.update({
//       where: { id },
//       data,
//     });

//     // Perform any necessary post-deletion actions
//     revalidatePath("/dashboard");

//     console.log(updateUser);
//     return updateUser;
//   } catch (error: any) {
//     console.error("Error updating user:", error);
//     throw error;
//   }
// }
