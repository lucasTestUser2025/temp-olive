import { Bell } from "lucide-react";
import { Avatar, IconButton } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export function LearningHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-lg" />
              <span>LearnHub</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium hover:text-violet-600 transition-colors"
              >
                학습하기
              </Link>
              <Link
                to="/#about"
                className="text-sm hover:text-violet-600 transition-colors"
              >
                소개
              </Link>
              <a
                href="#progress"
                className="text-sm hover:text-violet-600 transition-colors"
              >
                내 진도
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <IconButton variant="ghost" className="relative" size="3">
                <Bell />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </IconButton>
            </div>

            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              size="3"
              className="border-1"
              fallback="ME"
              radius="full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
