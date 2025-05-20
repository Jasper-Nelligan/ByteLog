"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type SetStateAction } from "react";
import LoginDialog from "./loginDialog";
import AddPostDialog from "./addPostDialog";
import { api } from "@/trpc/react";
import Post from "./post";
import Analytics from "./analytics";
import type { FrontendPost } from "@/types";

export default function ClientHome() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddPostDialog, setShowAddPostDialog] = useState(false);

  const { data, isLoading } = api.post.getAll.useQuery();
  const posts: FrontendPost[] | undefined = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
  }

  const renderPosts = () => {
    return (
      <div className="flex flex-col space-y-2 w-full">
        {posts?.map(post => {
          return <Post key={post.id} title={post.title} message={post.message} date={post.createdAt} />
        })}
      </div>
    )
  }

  const renderAuthButtons = () => {
    if (!isLoggedIn) {
      return (
        <Button
          variant="outline"
          onClick={() => setShowLoginDialog(true)}
        >
          Log In
        </Button>
      )
    }

    return (
      <div className="flex items-center space-x-3">
        <p>Welcome, userId</p>
        <Button
          variant="outline"
          onClick={() => { setIsLoggedIn(false) }}
        >
          Log Out
        </Button>
      </div>
    )
  }

  const renderPage = () => {
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
        <LoginDialog open={showLoginDialog} setOpen={setShowLoginDialog} onLoginSuccess={onLoginSuccess} />
        <AddPostDialog open={showAddPostDialog} setOpen={setShowAddPostDialog} onAddPost={() => { }} />
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
              {renderAuthButtons()}
            </div>
          </div>
        </header>
        <div className="flex flex-col lg:flex-row items-start justify-between w-full px-4 py-6 bg-custom-background-gray">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between border-b pb-2">
              <p className="text-primary text-4xl font-semibold">Your Updates ({posts?.length || 0})</p>
              {isLoggedIn && <Button onClick={() => { setShowAddPostDialog(true) }}>Add update</Button>}
            </div>
            <div className="mt-10">
              {(!isLoggedIn || (posts?.length === undefined || posts.length <= 0)) && (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/no_updates.png"
                    alt="No updates posted yet"
                  />
                  <p className="text-muted-foreground mt-3">{isLoggedIn ? "You haven't posted any updates yet" : "Please log in to post updates"}</p>
                  <div className="mt-5">
                    {!isLoggedIn && <Button onClick={() => setShowLoginDialog(true)}>Log In</Button>}
                  </div>
                </div>
              )}
              {posts && isLoggedIn && renderPosts()}
            </div>
          </div>

          <div className="w-full lg:w-1/2 pl-4">
            {isLoggedIn && <Analytics posts={posts}/>}
          </div>
        </div>
      </main>
    )
  }

  return renderPage();
}
