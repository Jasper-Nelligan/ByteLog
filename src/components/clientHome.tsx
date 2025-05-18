"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ClientHome() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(true)

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderPage = () => {
    console.log(mounted)
    if (!mounted) {
      return null;
    }

    if (showVideo) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <video
            className="w-100 h-100 object-contain"
            src={theme === "light" ? "bytelog_logo_animated_light.mp4" : "bytelog_logo_animated_dark.mp4"}
            autoPlay
            muted
            onEnded={() => setShowVideo(false)}
          />
        </div>
      );
    }

    return (
      <main className="p-2 flex flex-col min-h-screen w-full items-center justify-start">
        <header className="flex justify-between items-center w-full">
          <img
            src={theme === "light" ? "ByteLog_logo_light.png" : "ByteLog_logo_dark.png"}
            alt="ByteLog logo"
            className="max-w-[12rem] md:max-w-[16rem] h-auto"
          />
          <div className="flex items-center justify-center md:mt-0 mr-10">
            <div className="flex space-x-4 mt-3 md:mt-0 md:mr-4">
              <Button onClick={handleThemeChange} variant="ghost" size="icon">
                <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button
                onClick={() =>
                  window.open("https://github.com/Jasper-Nelligan/hireup-full-stack-challenge", "_blank")
                }
                variant="ghost"
                size="icon"
              >
                <img
                  src={theme === "light" ? "/github_logo_light.png" : "/github_logo_dark.png"}
                  alt="GitHub"
                  className="h-8 w-8"
                />
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-col lg:flex-row items-start justify-between w-full px-4 py-6 bg-custom-background-gray">
          <div className="w-full lg:w-1/2">
            <p className="text-primary text-4xl font-semibold">Your Updates</p>
          </div>

          <div className="w-full lg:w-1/2">
            {/* Content */}
          </div>
        </div>
      </main>
    )
  }

  return renderPage();
}
