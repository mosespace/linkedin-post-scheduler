// import { fetchUsers } from "@/actions/users";
// import NavBar from "@/components/Dashboard/NavBar";
// import Sidebar from "@/components/Dashboard/Sidebar";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import React, { ReactNode } from "react";

// export default async function Layout({ children }: { children: ReactNode }) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     redirect("/login");
//   }
//   const user = session.user;

//   const users = await fetchUsers();
//   return (
//     <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
//       <Sidebar users={users} />
//       <div className='flex flex-col'>
//         <NavBar session={session} />
//         <div className='flex min-h-screen w-full flex-col'>{children}</div>
//       </div>
//     </div>
//   );
// }

import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
