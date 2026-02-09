import { Bell, Trophy, Menu, Flame } from "lucide-react";
import { Avatar, IconButton } from "@radix-ui/themes";

export function LearningHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="text-2xl font-bold tracking-tight flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg" />
              <span>LearnHub</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#learn"
                className="text-sm font-medium hover:text-violet-600 transition-colors"
              >
                학습하기
              </a>
              <a
                href="#community"
                className="text-sm hover:text-violet-600 transition-colors"
              >
                커뮤니티
              </a>
              <a
                href="#progress"
                className="text-sm hover:text-violet-600 transition-colors"
              >
                내 진도
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-bold text-orange-700">
                7일 연속
              </span>
            </div>

            {/* Points */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
              <Trophy className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">1,250</span>
            </div>

            <IconButton variant="ghost" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </IconButton>

            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              className="w-9 h-9 cursor-pointer ring-2 ring-violet-200 hover:ring-violet-400 transition-all"
              fallback="ME"
            />

            <IconButton variant="ghost" className="md:hidden">
              <Menu className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
