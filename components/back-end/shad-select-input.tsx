import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slack,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Dribbble,
  Globe,
  Github,
  Linkedin,
  Figma,
} from "lucide-react";

type SelectInputProps = {
  label: string;
  optionTitle: string;
  className?: string;
  options: SelectOption[];
  selectedOption: any;
  setSelectedOption: any;
  initialData?: any;
};

export type SelectOption = {
  value: string;
  label: string;
};

export default function ShadSelectInput({
  label,
  className = "sm:col-span-2",
  optionTitle,
  options = [],
  selectedOption,
  setSelectedOption,
  initialData,
}: SelectInputProps) {
  const icons = [
    {
      value: "facebook",
      icon: <Facebook className='w-5 h-5' />,
    },
    {
      value: "twitter",
      icon: <Twitter className='w-5 h-5' />,
    },
    {
      value: "youtube",
      icon: <Youtube className='w-5 h-5' />,
    },
    {
      value: "instagram",
      icon: <Instagram className='w-5 h-5' />,
    },
    {
      value: "dribble",
      icon: <Dribbble className='w-5 h-5' />,
    },
    {
      value: "behance",
      icon: <Globe className='w-5 h-5' />,
    },
    {
      value: "github",
      icon: <Github className='w-5 h-5' />,
    },
    {
      value: "tiktok",
      icon: <Figma className='w-5 h-5' />,
    },
    {
      value: "linkedIn",
      icon: <Linkedin className='w-5 h-5' />,
    },
  ];

  return (
    <div className={className}>
      <label
        htmlFor={label}
        className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2'
      >
        {label}
      </label>
      <div className='mt-2'>
        <Select
          onValueChange={(value) => setSelectedOption(value)}
          defaultValue={initialData}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={`Select ${optionTitle}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{optionTitle}</SelectLabel>
              {options.map((item) => {
                const icon = icons.find((icon) => icon.value === item.value);
                return (
                  <SelectItem key={item.value} value={item.value}>
                    <span className='flex items-center gap-2'>
                      {icon && icon.icon}
                      {item.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
