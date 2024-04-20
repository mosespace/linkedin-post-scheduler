"use client";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <div className='container z-50 fixed top-t inset-x-0 flex flex-col items-center gap-4 my-12'>
      <header className='w-full flex items-center justify-between'>
        <Link href='/' className='text-xl font-bold'>
          PoLinkedin🔥
          {/* <span className='text-sm font-bold'>poLinkedin🔥</span> */}
        </Link>
        <div className='flex gap-2 items-center'>
          <ThemeToggle />
          {/* <Button variant='default'>Sign in</Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='default'>Sign In</Button>
            </DialogTrigger>
            <DialogContent className='mx-auto max-w-sm'>
              <Card className='mt-4'>
                <CardHeader>
                  <CardTitle className='text-2xl'>Login</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
                      />
                    </div>
                    <div className='grid gap-2'>
                      <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                        <Link
                          href='#'
                          className='ml-auto inline-block text-sm underline'
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input id='password' type='password' required />
                    </div>
                    <Button type='submit' className='w-full'>
                      Login
                    </Button>
                    <Button variant='outline' className='w-full'>
                      Login with LinkedIn
                    </Button>
                  </div>
                  <div className='mt-4 text-center text-sm'>
                    Don&apos;t have an account?{" "}
                    <Link href='/register' className='underline'>
                      Sign up
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </div>
  );
}
