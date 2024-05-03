import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='container flex flex-col items-center gap-4 my-12'>
      {children}
    </main>
  );
}
