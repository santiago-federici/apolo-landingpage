"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import Button from "./Button";

import CloseIcon from "../icons/CloseIcons";
import MenuIcon from "../icons/MenuIcon";

const navLinks = [
  { href: "#features", text: "Features" },
  { href: "#pricing", text: "Pricing" },
  { href: "#about", text: "About" },
];

const menuVars = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const mobileNavLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 xl:px-36">
      <img
        src="/logo.png"
        alt="logo"
        className="aspect-square size-16 cursor-pointer"
      />
      <nav className="flex items-center gap-4 max-md:hidden [&>a]:transition-colors [&>a]:duration-200">
        {navLinks.map((link) => (
          <a
            href={link.href}
            className="hover:cursor-pointer hover:text-primary"
          >
            {link.text}
          </a>
        ))}
        <div className="flex gap-2">
          <Button variant="ghost">Log In</Button>
          <Button variant="primary">Sign Up</Button>
        </div>
      </nav>
      <MenuIcon
        className="size-8 cursor-pointer md:hidden"
        onClick={toggleMenu}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-full origin-top bg-gradient-to-b from-card to-background px-6 py-4 md:hidden"
          >
            <div className="flex items-center justify-between">
              <img
                src="/logo.png"
                alt="logo"
                className="aspect-square size-16 cursor-pointer"
              />
              <CloseIcon
                className="size-8 cursor-pointer md:hidden"
                onClick={toggleMenu}
              />
            </div>
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="mt-16 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <div key={link.text} className="overflow-hidden pb-1">
                  <MobileNavLink title={link.text} href={link.href} />
                </div>
              ))}

              <div className="overflow-hidden">
                <MobileButton variant="secondary" text="Log In" />
                <MobileButton variant="primary" text="Sign Up" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const MobileNavLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <motion.div
      variants={mobileNavLinkVars}
      className="text-center text-4xl transition-colors duration-200 hover:cursor-pointer hover:text-primary"
    >
      <a href={href}>{title}</a>
    </motion.div>
  );
};

const MobileButton = ({
  text,
  variant,
}: {
  text: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
}) => {
  return (
    <motion.div
      variants={mobileNavLinkVars}
      className="text-center text-4xl transition-colors duration-200 hover:cursor-pointer hover:text-primary"
    >
      <Button variant={variant} className="w-full">
        {text}
      </Button>
    </motion.div>
  );
};
