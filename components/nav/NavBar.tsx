'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import ThemeSwitch from "../togglers/ThemeSwitch";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../togglers/LocaleSwitcher";
import { Link } from "@/navigation";
import { LoginButton } from "../auth/login-button";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const t = useTranslations("NavBar");

  return (
    <nav className="md:w-10/12 mx-auto flex items-center justify-between p-4 bg-transparent">
      {/* Logo */}
      <div className="text-xl font-bold text-black dark:text-white">
        <Link href={"/"}>
          Stockify
        </Link>
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-black dark:text-white focus:outline-none"
        >
          {isOpen ? (
            <FiX className="w-8 h-8 transition-transform transform rotate-180 duration-300" />
          ) : (
            <FiMenu className="w-8 h-8 transition-transform transform rotate-0 duration-300" />
          )}
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <LoginButton>
          <Button variant={"link"}>
            {t("connectNow")}
          </Button>
        </LoginButton>

        <div className="flex items-center space-x-4">
          <div className="rounded-lg bg-transparent focus:outline-none">
            <ThemeSwitch />
          </div>
          <div className="rounded-lg bg-transparent focus:outline-none">
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="absolute top-0 right-0 w-3/4 h-screen bg-white shadow-xl dark:bg-black p-4 flex flex-col space-y-6 z-50"
            >
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="text-black dark:text-white focus:outline-none"
                >
                  <FiX className="w-8 h-8" />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-center text-black dark:text-white"
              >
                <h2 className="text-2xl font-bold">{t("welcome")}</h2>
                <p className="text-sm"> {t("description")} </p>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full border-t border-gray-300 dark:border-gray-600 my-4"
              />

              <LoginButton>
                <Button className="w-full rounded-full px-6 py-3 font-semibold text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 transition-all shadow-lg">
                  {t("connectNow")}
                </Button>
              </LoginButton>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="rounded-lg bg-transparent focus:outline-none">
                  <ThemeSwitch />
                </div>
                <div className="rounded-lg bg-transparent focus:outline-none">
                  <LocaleSwitcher />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
