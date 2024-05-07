"use client";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader } from "lucide-react";

interface IRegisterInputs {
  email: string;
  password: string;
}

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/@")) {
    return null;
  }
  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState(false);

  const toggleCurrentPassword: any = () => {
    setCurrentPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRegisterInputs>();

  const router = useRouter();

  async function onSubmit(data: IRegisterInputs) {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      // console.log(data);
      if (!res?.ok) {
        toast.error("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        toast.success("Login has been created successfully");
        reset();
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setLoading(false);
      toast.error("It seems you have a network error, please try again");
    }
  }

  return (
    <div className='container z-50 fixed top-t inset-x-0 flex flex-col items-center gap-4 my-12'>
      <header className='w-full flex items-center justify-between'>
        <Link href='/' className='text-xl font-bold'>
          Linker🔥
          {/* <span className='text-sm font-bold'>poLinkedin🔥</span> */}
        </Link>
        <div className='flex gap-2 items-center'>
          <ThemeToggle />
          {/* <Button variant='default'>Sign in</Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='default'>Sign In</Button>
            </DialogTrigger>
            <DialogContent className='mx-auto max-w-md'>
              <Card className='mt-4'>
                {/* <CardHeader>
                  <CardTitle className='text-2xl'>Login</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader> */}
                <CardContent>
                  <div className='grid gap-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mx-auto grid w-[350px] gap-6'>
                        <div className='grid mt-4 gap-2 text-center'>
                          <h1 className='text-3xl font-bold'>
                            Log into our Account
                          </h1>
                          <p className='text-balance text-muted-foreground'>
                            Enter the details below to login into your account
                          </p>
                        </div>
                        <div className='grid gap-4'>
                          {/* enter-email */}
                          <div className='grid gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                              {...register("email", { required: true })}
                              id='email'
                              type='email'
                              placeholder='linker@example.com'
                            />
                            {errors.email && (
                              <small className='text-primary text-sm'>
                                Email Required
                              </small>
                            )}
                          </div>

                          {/* enter-password */}
                          <div className='grid gap-2'>
                            <div className='flex items-center'>
                              <Label htmlFor='password'>Password</Label>
                            </div>
                            <div className='relative'>
                              <Input
                                {...register("password", { required: true })}
                                id='password'
                                type={currentPassword ? "text" : "password"}
                              />
                              {errors.password && (
                                <small className='text-primary text-sm'>
                                  You must provide a strong password
                                </small>
                              )}
                              <button
                                type='button'
                                className='absolute right-0 top-0 mr-2 mt-2'
                                onClick={toggleCurrentPassword}
                                aria-label={
                                  currentPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                {currentPassword ? (
                                  <Eye className='size-4' />
                                ) : (
                                  <EyeOff className='size-4' />
                                )}
                              </button>
                            </div>
                          </div>
                          <Button
                            type='submit'
                            className='w-full flex items-center gap-2'
                          >
                            {loading && (
                              <Loader className='size-4 animate-spin' />
                            )}
                            Login
                          </Button>
                          <Button variant='outline' className='w-full'>
                            Login with Google
                          </Button>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                          Don&apos;t have an account?{" "}
                          <Link href='/register' className='underline'>
                            Sign up
                          </Link>
                        </div>
                      </div>
                    </form>
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
