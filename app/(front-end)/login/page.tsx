"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/auth-provider";
import { Eye, EyeOff, Loader } from "lucide-react";

interface IRegisterInputs {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser: any = await getCurrentUser();
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

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

  if (user) {
    router.push("/dashboard");
  }

  return (
    <div className='w-full lg:grid lg:min-h-screen lg:grid-cols-2'>
      <div className='hidden bg-muted lg:block'>
        <Image
          src='/placeholder.svg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <div className='flex items-center justify-center py-12'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mx-auto grid w-[350px] gap-6'>
            <div className='grid gap-2 text-center'>
              <h1 className='text-3xl font-bold'>Log into our Account</h1>
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
                  <small className='text-primary text-sm'>Email Required</small>
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
                      currentPassword ? "Hide password" : "Show password"
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
              <Button type='submit' className='w-full flex items-center gap-2'>
                {loading && <Loader className='size-4 animate-spin' />}
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
    </div>
  );
}
