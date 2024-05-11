import DashboardHeader from "@/components/back-end/dashboard-header";
import DashboardSidebar from "@/components/back-end/dashboard-sidebar";
import { getCurrentUser } from "@/lib/auth-provider";
import { notFound, redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  const router = redirect;
  if (!user) {
    router("/");
    return notFound();
  }
  return (
    <div className='overflow-hiddens'>
      <DashboardHeader />
      <DashboardSidebar />
      <div className='overflow-hiddens'>{children}</div>
    </div>
  );
}
