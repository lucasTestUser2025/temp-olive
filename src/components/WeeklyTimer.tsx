import { Calendar } from "lucide-react";
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
      nextMonday.setDate(now.getDate() + 5);
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
    <div className="bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-3xl p-8 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">이번 주 학습</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Week 8: 실전 프로젝트</h2>
          <p className="text-sm opacity-90">
            독립적인 학습 콘텐츠로 자유롭게 학습하세요
          </p>
        </div>

        <div className="flex items-center gap-6">
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

      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-90">이번 주 진행률</span>
          <span className="font-bold">3/7 완료</span>
        </div>
        <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: "42.8%" }}
          />
        </div>
      </div>
    </div>
  );
}
