"use client";

import ImageUploader from "./image-uploader";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { updateUser } from "@/actions/users";
import { Loader } from "lucide-react";

interface IUpdateUser {
  userHandle: string;
  nickName: string;
  email: string;
  image: string;
  bio: string;
  tel: number;
}

interface IUser {
  initialData: {
    id: string;
    userHandle: string;
    email: string;
    nickName: string;
    image: string;
    bio: string;
    tel: number;
  };
}

export default function OnBoardForm({ initialData }: IUser) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUpdateUser>({
    defaultValues: {
      ...initialData,
    },
  });

  const [imageUrl, setImageUrl] = useState(initialData.image || "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(data: IUpdateUser) {
    data.image = imageUrl;

    try {
      setLoading(true);

      const res: any = await updateUser(initialData?.id, data);

      
      if (!res) {
        toast.error("Something went wrong, Please kindly retry.");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        toast.success("We got everything, routing you to start creating");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid w-full items-start gap-6'
    >
      <fieldset className='grid gap-6 rounded-lg border p-4'>
        <legend className='-ml-1 px-1 text-sm font-medium'>
          User Settings
        </legend>

        <ImageUploader
          label='User Public Image:'
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint='userProfileImage'
        />

        <div className='flex justify-between w-full space-x-2'>
          <div className='flex w-full flex-col space-y-2'>
            <Label htmlFor='userHandle'>User Handle:</Label>
            <Input
              {...register("userHandle", { required: true })}
              id='userHandle'
              type='userHandle'
              placeholder='linker.com/'
            />
            {errors.userHandle && (
              <small className='text-primary text-sm'>
                User Handle Required
              </small>
            )}
          </div>
          <div className='flex w-full flex-col space-y-2'>
            <Label htmlFor='nickName'>User Name (Public):</Label>
            <Input
              {...register("nickName", { required: true })}
              id='nickName'
              type='text'
              placeholder='Uncle Moses'
            />
            {errors.nickName && (
              <small className='text-primary text-sm'>Nick Name Required</small>
            )}
          </div>
        </div>

        <div className='flex justify-between w-full space-x-2'>
          <div className='flex w-full flex-col space-y-2'>
            <Label htmlFor='email'>Email:</Label>
            <Input
              {...register("email", { required: false })}
              id='email'
              type='email'
              disabled={true}
              placeholder='kiskayemoses@gmail.com'
            />
          </div>
          <div className='flex w-full flex-col space-y-2'>
            <Label htmlFor='tel'>Tel:</Label>
            <Input
              {...register("tel", { required: true })}
              id='tel'
              type='tel'
              placeholder='+256-770-981-193'
            />
            {errors.tel && (
              <small className='text-primary text-sm'>
                You must provide a telephone
              </small>
            )}
          </div>
        </div>
        <div className='grid gap-3'>
          <Label htmlFor='bio'>Bio</Label>
          <Textarea
            {...register("bio", { required: true })}
            id='bio'
            placeholder='You are a...'
            className='min-h-[9.5rem]'
          />
          {errors.bio && (
            <small className='text-primary text-sm'>
              You need to add something to your Bio
            </small>
          )}
        </div>
        <Button type='submit' className='w-full flex items-center gap-2'>
          {loading && <Loader className='size-4 animate-spin' />}
          Submit
        </Button>
      </fieldset>
    </form>
  );
}
