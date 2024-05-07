"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser } from "@/actions/users";

interface IRegisterInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRegisterInputs>();

  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const confirmedPassword = watch("confirmPassword", "");

  // Add an effect to update the 'passwordMatch' state based on the comparison
  useEffect(() => {
    setPasswordMatch(confirmedPassword === watch("password"));
  }, [confirmedPassword, watch]);

  const toggleCurrentPassword = () => {
    setCurrentPassword((prevState) => !prevState);
  };

  const toggleConfirmPassword = () => {
    setConfirmPassword((prevState) => !prevState);
  };

  const router = useRouter();

  async function onSubmit(data: IRegisterInputs) {
    if (passwordMatch) {
      const { confirmPassword, ...finalData } = data;
      // console.log(finalData);

      try {
        setLoading(true);
        const response = await createUser(finalData);

        if (response) {
          setLoading(false);
          reset();

          toast.success(`New User Created Successfully`);
          reset();
          router.push(`/login`);
        } else {
          setLoading(false);
          toast.error(`Failed to create user`);
          console.error("Failed to create user");
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(`Error in apiRequest: ${error.message}`);
        console.error("Error in apiRequest:", error);
      }
    } else {
      toast.error(`Something Went Wrong Preventing Creation`);
    }

    // const newStudentId = response.id;
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
        <div className='mx-auto grid w-[380px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Register an Account</h1>
            <p className='text-balance text-muted-foreground'>
              Enter details below to register an account with us
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              {/* create-first-and-last-name */}
              <div className='grid gap-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='first-name'>First name</Label>
                    <Input
                      {...register("firstName", { required: true })}
                      id='firstName'
                      placeholder='John'
                    />
                    {errors.firstName && (
                      <small className='text-primary text-sm'>
                        First Name Required
                      </small>
                    )}
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='last-name'>Last name</Label>
                    <Input
                      {...register("lastName", { required: true })}
                      id='last-name'
                      placeholder='Doe'
                    />
                    {errors.lastName && (
                      <small className='text-primary text-sm'>
                        Last Name Required
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* create-email */}
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

              {/* create-password */}
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

              {/* confirm-password */}
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='confirm-password'>Confirm Password</Label>
                </div>
                <div className='relative'>
                  <Input
                    {...register("confirmPassword", { required: true })}
                    id='confirmPassword'
                    type={confirmPassword ? "text" : "password"}
                  />
                  {!passwordMatch && (
                    <small className='text-primary text-sm'>
                      Passwords must be matching.
                    </small>
                  )}
                  <button
                    type='button'
                    className='absolute right-0 top-0 mr-2 mt-2'
                    onClick={toggleConfirmPassword}
                    aria-label={
                      confirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {confirmPassword ? (
                      <Eye className='size-4' />
                    ) : (
                      <EyeOff className='size-4' />
                    )}
                  </button>
                </div>
              </div>
              <Button type='submit' className='w-full flex items-center gap-2'>
                {loading && <Loader className='size-4 animate-spin' />}
                Create Account
              </Button>
              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm'>
            Have an account?&nbsp;
            <Link href='/login' className='underline'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
