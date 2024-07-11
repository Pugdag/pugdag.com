"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
  subItems,
}: {
  setActive?: (item: string | null) => void;
  active?: string | null;
  item: string;
  href?: string;
  children?: React.ReactNode;
  subItems?: { name: string; href: string; icon: React.ComponentType<{ size: number; className?: string }> }[];
}) => {
  const isCommunity = item === "Community";
  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (isCommunity && setActive) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setActive(item);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (isCommunity && setActive) {
      timeoutRef.current = setTimeout(() => {
        if (modalRef.current && !modalRef.current.contains(event.relatedTarget as Node)) {
          setActive(null);
        }
      }, 100); // Small delay to allow for mouse movements between elements
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {href ? (
        <Link href={href} passHref legacyBehavior>
          <a
            target={href.startsWith('http') ? "_blank" : "_self"}
            rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
            className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
          >
            <motion.p transition={{ duration: 0.3 }}>{item}</motion.p>
          </a>
        </Link>
      ) : (
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
        >
          {item}
        </motion.p>
      )}
      {isCommunity && active === item && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute left-1/2 transform -translate-x-1/2 pt-4"
          style={{ top: 'calc(100% + 1.2rem)' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            transition={transition}
            layoutId="active"
            className="bg-[#273c75] backdrop-blur-sm rounded-2xl overflow-hidden border shadow-xl"
          >
            <motion.div layout className="w-max h-full p-4">
              {subItems?.map((subItem) => (
                <HoveredLink
                  key={subItem.name}
                  href={subItem.href}
                  className="flex items-center"
                >
                  <subItem.icon size={20} className="mr-2" />
                  <span>{subItem.name}</span>
                </HoveredLink>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div className="bg-white dark:bg-[#273c75] shadow-lg flex justify-between items-center space-x-4 px-6 py-4 rounded-full border border-[#273c75]/[0.2] dark:border-white/[0.2] mt-8 lg:mt-6 lg:px-12 lg:py-8">
        <div className="text-xl font-bold relative z-50">
          <img src="/logo.webp" alt="logo" className="w-10 h-10 block lg:hidden" />
        </div>
        <div className="hidden md:flex space-x-4 lg:space-x-8">{children}</div>
        <button
          className="md:hidden text-white relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              width="46"
              height="46"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          ) : (
            <svg
              width="46"
              height="46"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 12h18"></path>
              <path d="M3 6h18"></path>
              <path d="M3 18h18"></path>
            </svg>
          )}
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#273c75] bg-opacity-75 flex items-start justify-center z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white dark:bg-[#273c75] p-6 rounded-lg w-11/12 max-w-lg mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center space-y-6">{children}</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-[#273c75] dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, href, target, rel, ...rest }: any) => {
  return (
    <Link href={href} passHref target={target} rel={rel} {...rest} className="text-neutral-700 dark:text-neutral-200 mt-2 w-40 flex items-center hover:scale-105 transition-transform duration-200">
      {children}
    </Link>
  );
};


