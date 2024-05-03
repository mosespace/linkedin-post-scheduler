"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DropdownMenuFrontEnd from "@/components/front-end/drop-down";

export default function page({
  params: { userhandle },
}: {
  params: { userhandle: string };
}) {
  // Decode the user handle before using it
  const decodedUserHandle = decodeURIComponent(userhandle).substring(1);

  interface LinkI {
    id: string;
    name?: string;
    title?: string;
    description?: string;
    callToAction?: string;
    image?: string;
  }

  const links: LinkI[] = [
    {
      id: "1",
      name: "",
      title: "LinkedIn",
      callToAction: "/",
    },
    {
      id: "2",
      name: "",
      title: "Twitter",
      callToAction: "/",
    },
    {
      id: "3",
      name: "",
      title: "Instagram",
      callToAction: "/",
    },
    {
      id: "4",
      name: "",
      title: "Facebook",
      callToAction: "/",
    },
    {
      id: "5",
      name: "",
      title: "Github",
      callToAction: "/",
    },
  ];

  const otherLinks: LinkI[] = [
    {
      id: "1",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, nobis molestiae. Cum molestiae non deserunt atque repellendus nisi, vel, ullam error exercitationem quia perspiciatis cumque veritatis obcaecati aut deleniti quibusdam!",
      callToAction: "#",
      image: "/vercel.svg",
    },
    {
      id: "2",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, minima Perferendis!",
      callToAction: "#",
      image: "/next.svg",
    },
    {
      id: "3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, minima Perferendis!",
      callToAction: "#",
      image: "/placeholder.jpg",
    },
  ];

  const router = useRouter();
  const [showDiv, setShowDiv] = React.useState<boolean>(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowDiv(true); // Show the div when scrolled 200 pixels
    } else {
      setShowDiv(false); // Hide the div when scrolled back to top
    }
  };

  React.useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      {showDiv && (
        <div className='w-full'>
          <div className='justify-between z-50 fixed top-8 inset-x-4 lg:inset-x-0 flex items-center gap-4 my-12 rounded-full p-4 bg-white/30 backdrop-blur-md mx-auto max-w-xl'>
            <Image
              width={400}
              height={400}
              src='/placeholder.jpg'
              alt={`${decodedUserHandle}`}
              className='size-12 ring-4 object-cover object-center ring-primary shadow-lg rounded-full'
            />
            <h2 className='font-bold text-lg text-black'>
              @{decodedUserHandle}
            </h2>
            <DropdownMenuFrontEnd />
          </div>
        </div>
      )}

      <div className='w-full flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center gap-3'>
          <Image
            width={400}
            height={400}
            src='/placeholder.jpg'
            alt={`${decodedUserHandle}`}
            className='size-36 ring-4 object-cover object-center ring-primary shadow-lg rounded-full'
          />
          <h2 className='font-black text-3xl uppercase'>{decodedUserHandle}</h2>
          <p className='max-w-md text-center'>
            Learn All the Latest UI/UX Design, Fronted, and Backend Development
            Skills.
          </p>
        </div>

        {links.map((item) => {
          const renderIcon = (title: string) => {
            if (title.toLowerCase().includes("facebook")) {
              return <Facebook className='w-6 h-6' />;
            } else if (title.toLowerCase().includes("instagram")) {
              return <Instagram className='w-6 h-6' />;
            } else if (title.toLowerCase().includes("linkedin")) {
              return <Linkedin className='w-6 h-6' />;
            } else if (title.toLowerCase().includes("twitter")) {
              return <Twitter className='w-6 h-6' />;
            } else if (title.toLowerCase().includes("github")) {
              return <Github className='w-6 h-6' />;
            }
          };
          return (
            <div
              key={item.id}
              className='space-y-4 w-full mt-4 max-w-xl flex flex-col gap-4'
            >
              <Link
                href={item.callToAction as string}
                className='group w-full relative inline-flex p-4 items-center justify-between overflow-hidden rounded-2xl border bg-transparent font-medium transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]'
              >
                <span>{renderIcon(item.title as string)}</span>

                <span>Checkout My {item.title}</span>
              </Link>
            </div>
          );
        })}

        <div className='space-y-2 mt-8 max-w-xl'>
          <div className='space-y-3'>
            <h2 className='font-bold mb-2 text-center'>
              Subscribe to {decodedUserHandle} YT channel
            </h2>
          </div>
          {otherLinks.map((item) => {
            return (
              <div
                key={item.id}
                className='cursor-pointer rounded-md flex border px-2 py-4 space-x-3 relative transform transition-transform duration-300 hover:scale-105'
              >
                <Image
                  width={400}
                  height={400}
                  src={item.image as string}
                  alt={item.description as string}
                  className='bg-cover bg-center bg-white size-10'
                />
                <p className='line-clamp-2 pr-8 font-bold dark:font-normal'>
                  {item.description}
                </p>

                <div className='absolute left-[84%] md:left-[91%] top-0 bottom-0 flex items-center'>
                  <button
                    onClick={() => router.push(`${item.callToAction}`)}
                    className='flex rounded-r-md items-center justify-center h-full px-2 bg-primary py-4 focus:ring transition-colors'
                  >
                    <ArrowRight className='size-6 text-white' />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => router.push(`/`)}
          className='font-black relative mt-8 z-0 h-12 rounded-full bg-primary px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-primary hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500'
        >
          🔥 Create your Linker
        </button>
      </div>
    </>
  );
}
