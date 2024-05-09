import { getUserByUserHandle } from "@/actions/users";
import UserProfile from "@/components/front-end/userprofile";
import React from "react";

export default async function page({
  params: { userhandle },
}: {
  params: { userhandle: string };
}) {
  // Decode the user handle before using it
  const decodedUserHandle = decodeURIComponent(userhandle).substring(1);
  const user = await getUserByUserHandle(decodedUserHandle as string);
  // console.log(user?.links);
  return (
    <>
      <UserProfile user={user} />
    </>
  );
}
