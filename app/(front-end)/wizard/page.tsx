import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-provider";
import OnBoardForm from "@/components/back-end/on-board-form";
import { getSingleUser } from "@/actions/users";

export default async function page() {
  const user: any = await getCurrentUser();
  const nickName = user?.nickName;
  const userId = user?.id;

  if (nickName) {
    redirect("/dashboard");
  }
  const fetchUser: any = await getSingleUser(userId as string);
  // console.log(fetchUser);

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='mx-auto mt-[20rem] flex justify-center px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8'>
        <OnBoardForm initialData={fetchUser} />
      </div>
    </div>
  );
}
