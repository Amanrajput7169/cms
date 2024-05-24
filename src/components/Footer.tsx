"use client";
import { FOOTER_CONTACT_INFO, SOCIALS } from "@/constant";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roadmapsResponse, projectsResponse] = await Promise.all([
          axios.get("https://sqilco-api.onrender.com/api/roadmaps"),
          axios.get("https://sqilco-api.onrender.com/api/projects"),
        ]);

        setRoadmaps(roadmapsResponse.data.data);
        setProjects(projectsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className= " w-full bg-neutral-900 text-zinc-800 dark:text-white xs:p-8 sm:p-16 md:py-10 md:px-20">
      <div className="px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center h-8">
              <h1 className='font-bold text-[#fa859d] text-xl leading-[1.75rem] m-2' > CoLabCrafters</h1>
          </Link>
      </div>
      <div className="border-t border-zinc-300 dark:border-zinc-700 pt-8 mt-6"></div>

      <div className="grid grid-cols-2 max-container mx-auto md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        <div>
          <h5 className="text-white text-xl font-['Lato'] leading-normal mb-4 font-bold">
            Roadmaps
          </h5>
          {roadmaps.map((item) => (
            <div key={item.id} className="flex flex-row mb-6">
              <Link
                href={`/roadmap`}
                className="inline-flex items-center text-neutral-400 text-base font-normal josefin-sans-font leading-tight"
              >
                <h1>{item.title}</h1>
              </Link>
            </div>
          ))}
        </div>

        <div className="ml-4 md:ml-0">
          <h5 className="text-white text-xl font-bold font-['Lato'] leading-normal mb-4">
            Projects
          </h5>
          {projects.map((item) => (
            <div key={item.id} className="flex flex-row mb-6">
              <Link
                href={{
                  pathname: "/",
                  query: { _id: item._id },
                }}
                className="inline-flex items-center text-neutral-400 text-base font-normal josefin-sans-font leading-tight"
              >
                <h1>{item.title}</h1>
              </Link>
            </div>
          ))}
        </div>

        <div>
          <h5 className="text-white text-xl font-bold font-['Lato'] leading-normal mb-4">
            Company
          </h5>
          {FOOTER_CONTACT_INFO.links.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              className="flex flex-row mb-6 text-neutral-400 text-base font-normal josefin-sans-font leading-tight"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-4 md:ml-0">
          <h5 className="text-white text-xl font-bold font-['Lato'] leading-normal mb-4">
            Find us on
          </h5>
          <div className="flex items-center mb-6">
            {SOCIALS.links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                aria-label={`${link.name} link`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={link.icon}
                  alt={`${link.name} icon`}
                  width={20}
                  height={20}
                  className="mr-4"
                />
              </Link>
            ))}
          </div>

          <Link
            href="mailto:reach@amarraj8571841168@gmail.com"
            className="text-white flex flex-row mb-6 text-base font-normal josefin-sans-font leading-tight"
          >
            reach@CoLabCrafters.com
          </Link>
        </div>
      </div>

      <div className="border-t border-zinc-300 dark:border-zinc-700 pt-8 mt-8"></div>
      <p className="text-white josefin-sans-font px-4 text-xs sm:text-base text-center">
        Copyright CoLabCrafters©2024 All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
