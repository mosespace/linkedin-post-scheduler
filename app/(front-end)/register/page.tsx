import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
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
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Register an Account</h1>
            <p className='text-balance text-muted-foreground'>
              Enter details below to register to an account
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='first-name'>First name</Label>
                  <Input id='first-name' placeholder='John' required />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='last-name'>Last name</Label>
                  <Input id='last-name' placeholder='Doe' required />
                </div>
              </div>
            </div>
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
                  href='/forgot-password'
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
              Login with  LinkedIn
            </Button>
          </div>
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
