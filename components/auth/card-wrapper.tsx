import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import BackButton from "./back-button";
import Header from "./header";
import Social from "./social";
import { motion } from 'framer-motion';
import Image from "next/image";
import lightAuthImage from "@/public/light-auth.webp";
import darkAuthImage from "@/public/dark-auth.webp";
import { useTheme } from "next-themes";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);  // Wait until the theme is mounted
  }, []);

  if (!mounted) {
    // Avoid rendering any image if the theme is not ready
    return null;
  }

  // Determine which image to show based on the theme
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Card className="max-w-[95%] sm:w-[450px] md:w-[700px] lg:w-[850px] shadow-lg lg:shadow-xl rounded-none p-4 lg:p-6 mx-auto bg-white dark:bg-gray-950 dark:border-none  flex flex-col lg:flex-row-reverse">

      <motion.div
        className="hidden lg:flex w-full lg:w-1/2 relative justify-center items-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={currentTheme === "light" ? lightAuthImage : darkAuthImage}
          alt="Authentication Image"
          className="w-full h-auto object-cover rounded-lg"
          priority
        />
      </motion.div>

      <div className="w-full lg:w-1/2 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <CardHeader>
            <Header label={headerLabel} />
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {children}
          </CardContent>

          {showSocial && (
            <CardFooter className="mt-4">
              <Social />
            </CardFooter>
          )}

          <CardFooter className="mt-4">
            <BackButton href={backButtonHref} label={backButtonLabel} />
          </CardFooter>
        </motion.div>
      </div>
    </Card>
  );
};
