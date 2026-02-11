import { Badge, Button, Progress } from "@radix-ui/themes";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getFeaturedCourse,
  getThisWeekDateRange,
} from "../../data/courseContent";

const TOPIC_LABELS: Record<string, { title: string; desc: string }> = {
  ai: { title: "AI & 프롬프트", desc: "인공지능의 세계" },
  data: { title: "데이터 분석", desc: "데이터로 말하기" },
  design: { title: "디자인", desc: "아름다운 경험 만들기" },
  frontend: { title: "프론트엔드", desc: "웹 개발의 최전선" },
};

export function WeeklyTimer() {
  const navigate = useNavigate();
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

  const course = getFeaturedCourse();
  const weekRange = getThisWeekDateRange();
  const topicLabel = TOPIC_LABELS[course.topicId] ?? {
    title: course.topic,
    desc: "",
  };

  return (
    <div className="mb-8">
      <Link to="/course/ai-email-summary/1">
        <Button color="violet">Ver.2</Button>
      </Link>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-1">
          {topicLabel.title}
        </h2>
        <p className="text-sm text-neutral-500">{topicLabel.desc}</p>
      </div>
      {/* Main Content Card - Image as background with gradient overlay */}
      <div className="relative rounded-2xl overflow-hidden min-h-[400px]">
        {/* Background Image */}
        <img
          src={course.imageUrl}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay - 어두워지는 방향으로 텍스트 가독성 확보 */}
        <div
          className="absolute inset-0 bg-linear-to-r from-black/30 to-black/85"
          aria-hidden
        />

        {/* Content on top */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 lg:p-10 min-h-[400px]">
          <div className="hidden lg:block" />
          <div className="flex flex-col justify-between text-white">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" />
                {weekRange.start.toLocaleDateString("ko-KR")} -{" "}
                {weekRange.end.toLocaleDateString("ko-KR")}
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {course.title}
              </h2>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white/90">
                {course.subtitle}
              </h3>

              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} size="3" color="gray">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              {/* Timer */}
              <div className="mb-6">
                <div className="text-sm text-white/75 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  다음 콘텐츠 오픈까지
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-4 justify-between">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">
                        {timeLeft.days}
                      </div>
                      <div className="text-xs text-white/75 mt-1">일</div>
                    </div>
                    <div className="text-2xl text-white/50">:</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-white/75 mt-1">시간</div>
                    </div>
                    <div className="text-2xl text-white/50">:</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-white/75 mt-1">분</div>
                    </div>
                    <div className="text-2xl text-white/50">:</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-white/75 mt-1">초</div>
                    </div>
                  </div>
                  <Button
                    size="3"
                    color="violet"
                    onClick={() => navigate(`/course/${course.id}/task/1`)}
                  >
                    학습하러 가기
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm mb-2 text-white/90">
                  <span>이번 주 진행률</span>
                  <span className="font-bold">0/3 완료</span>
                </div>
                <Progress value={0} color="gray" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
