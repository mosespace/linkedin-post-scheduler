"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";

export default function ImageUploader({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint = "",
}: {
  label: string;
  imageUrl: string;
  setImageUrl: (url: string) => void; // Corrected prop type
  className?: string;
  endpoint: string;
}) {
  return (
    <div className={className}>
      <div className='flex justify-between items-center mb-4'>
        <Label htmlFor={label}>{label}</Label>

        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type='button'
            className='flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4'
          >
            <Pencil className='w-5 h-5' />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={label}
          width={1000}
          height={667}
          className='w-full h-64 object-contain'
        />
      ) : (
        <UploadDropzone
          className='mt-4 ut-label:text-primary ut-button:!cursor-pointer ut-label:hover:text-primary/50 ut-button:bg-primary ut-button:ut-readying:bg-[#b50027]/50'
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
            // Do something with the response
            toast.success("Image Upload completed successfully");
            // console.log("Files: ", res);
            // console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            toast.error("Image Upload Failed, Try Again");
            // Do something with the error.
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}
