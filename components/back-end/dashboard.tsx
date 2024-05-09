"use client";

import { Loader, PlusCircle } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ShadSelectInput from "./shad-select-input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createLink } from "@/actions/links";
import { getCurrentUser } from "@/lib/auth-provider";

interface ILinks {
  title: string;
  description: string;
  callToAction: string;
  socialMediaName?: string;
  userId: string;
}

export function Dashboard({ initialData }: { initialData?: any }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ILinks>();

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialData?.id || "");
  const [links, setLinks] = useState([
    { platform: "", title: "", description: "", url: "", callToAction: "" },
  ]);

  const addLink = () => {
    setLinks([
      ...links,
      { platform: "", title: "", description: "", url: "", callToAction: "" },
    ]);
  };

  const socialMediaPlatforms = [
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedIn", label: "LinkedIn" },
    { value: "tiktok", label: "Tik-Tok" },
    { value: "instagram", label: "Instagram" },
    { value: "github", label: "Github" },
    { value: "youtube", label: "Youtube" },
    { value: "dribble", label: "Dribble" },
    { value: "behance", label: "Behance" },
  ];

  async function onSubmit(data: ILinks) {
    const user: any = await getCurrentUser();
    data.socialMediaName = selectedOption;
    data.userId = user.id;

    console.log(data);
    try {
      setLoading(true);
      const res = await createLink(data);
      // console.log(data);
      if (!res) {
        toast.error("Link creation failed. Please cross-check the data again.");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        toast.success("Link has been added successfully");
        reset();
        // router.push(`/wizard`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setLoading(false);
      toast.error("It seems you have a network error, please try again");
    }
  }
  return (
    <div className='grid h-screen w-full pl-[56px]'>
      <div className='flex flex-col'>
        <main className='grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
          <div
            className='relative flex-col items-start gap-8 md:flex'
            x-chunk='dashboard-03-chunk-0'
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='grid w-full items-start gap-6'
            >
              <fieldset className='grid gap-6 rounded-lg border p-4'>
                <legend className='-ml-1 px-1 text-sm font-medium'>
                  Choose Social Media to be displayed
                </legend>
                <div>
                  {links.map((link, index) => (
                    <div key={index} className='my-4 border rounded p-4'>
                      <h3 className='text-lg font-semibold mb-2'>
                        Link {index + 1}
                      </h3>
                      <div className='flex flex-col space-y-2'>
                        <ShadSelectInput
                          label='Social Media Platform'
                          optionTitle='Choose platform'
                          options={socialMediaPlatforms}
                          selectedOption={selectedOption}
                          setSelectedOption={setSelectedOption}
                          initialData={initialData?.id}
                        />
                        <div className='flex pt-2 flex-col justify-between w-full space-y-4'>
                          <div className='flex w-full flex-col space-y-2'>
                            <Label htmlFor='title'>Link Title:</Label>
                            <Input
                              {...register("title", { required: true })}
                              id='title'
                              type='text'
                              placeholder='My LinkedIn Link'
                            />
                            {errors.title && (
                              <small className='text-primary text-sm'>
                                Please you must provide a link title
                              </small>
                            )}
                          </div>

                          <div className='flex w-full flex-col space-y-2'>
                            <Label htmlFor='description'>
                              Link Description:
                            </Label>

                            <Textarea
                              {...register("description", { required: true })}
                              id='description'
                              placeholder='You can add any description here and that will be attached on the link'
                            />
                            {errors.description && (
                              <small className='text-primary text-sm'>
                                Please you must provide a brief description
                              </small>
                            )}
                          </div>

                          <div className='flex w-full flex-col space-y-2'>
                            <Label htmlFor='callToAction'>Link Url:</Label>
                            <Input
                              {...register("callToAction", { required: true })}
                              id='callToAction'
                              type='url'
                              placeholder='eg: https:x.com/bantu_creative'
                            />
                            {errors.callToAction && (
                              <small className='text-primary text-sm'>
                                Please you must provide a Link (call-to-action)
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='space-y-2'>
                    <Button
                      type='button'
                      onClick={addLink}
                      variant='outline'
                      className='flex w-full items-center justify-between text-primary mt-4'
                    >
                      <PlusCircle className='mr-1' size={18} />
                      Add Link
                    </Button>
                    <Button
                      type='submit'
                      className='w-full flex items-center gap-2'
                    >
                      {loading && <Loader className='size-4 animate-spin' />}
                      {loading ? "Saving" : "Save"}
                    </Button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>

          <div className='relative hidden md:flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
            <Badge variant='outline' className='absolute right-3 top-3'>
              Output
            </Badge>
            <div className='flex-1' />
          </div>
        </main>
      </div>
    </div>
  );
}
