import { Badge, Progress } from "@radix-ui/themes";
import { Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export function WeeklyTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMonday = new Date();

      const daysUntilNextMonday = (1 - now.getDay() + 7) % 7 || 7;
      nextMonday.setDate(now.getDate() + daysUntilNextMonday);
      nextMonday.setHours(0, 0, 0, 0);

      const diff = nextMonday.getTime() - now.getTime();

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      {/* Main Content Card */}
      <div className="border rounded-md overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-10">
          {/* Left: Thumbnail */}
          <div className="relative aspect-4/3 lg:aspect-auto lg:h-full min-h-[280px] bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Week 8 Project"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Right: Information */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" />
                2026년 2월 3일 - 2월 9일
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                AI와 함께하는 CS학습:
                <br />
                프롬프트 학습
              </h2>

              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                프롬프트 학습을 통해 CS 지식을 습득합니다. 또한 프롬프트
                엔지니어링 기초를 배웁니다. 또한 AI와 함께하는 CS학습을 통해 CS
                지식을 습득합니다. 또한 프롬프트 엔지니어링 기초를 배웁니다.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge size="3">AI</Badge>
                <Badge size="3">CS</Badge>
                <Badge size="3">Prompt</Badge>
              </div>
            </div>

            <div>
              {/* Timer */}
              <div className="mb-6">
                <div className="text-sm opacity-75 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  다음 주 콘텐츠 오픈까지
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{timeLeft.days}</div>
                    <div className="text-xs opacity-75 mt-1">일</div>
                  </div>
                  <div className="text-2xl opacity-50">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-75 mt-1">시간</div>
                  </div>
                  <div className="text-2xl opacity-50">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-75 mt-1">분</div>
                  </div>
                  <div className="text-2xl opacity-50">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-75 mt-1">초</div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="opacity-90">이번 주 진행률</span>
                  <span className="font-bold">3/7 완료</span>
                </div>
                <Progress value={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
