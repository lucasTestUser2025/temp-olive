import {
  ArrowRight,
  Clock,
  Calendar,
  Users,
  Lock,
  Unlock,
  Sparkles,
  Code,
  Palette,
  Brain,
  Database,
  CheckCircle2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { Badge, Button, type BadgeProps } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// 큰 주제 (고정)
interface Topic {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  linearColor: string;
  color: BadgeProps["color"];
  category: string;
}

// 시간 제한이 있는 콘텐츠 (주제 내에서 변경됨)
interface TimedContent {
  id: string;
  topicId: string; // 어떤 주제에 속하는지
  title: string;
  subtitle: string;
  description: string;

  // 시간 제한
  startDate: Date;
  endDate: Date;

  // 콘텐츠 정보
  weekNumber: number; // 몇 주차
  difficulty: "초급" | "중급" | "고급";
  dailyTime: string;

  // 통계
  stats: {
    enrolled: number;
    completed: number;
    activeNow: number;
  };

  // 상태
  status: "upcoming" | "active" | "ending-soon" | "expired";
}

// 고정된 큰 주제들
const topics: Topic[] = [
  {
    id: "frontend",
    name: "프론트엔드",
    description: "웹 개발의 최전선",
    icon: Code,
    linearColor: "from-blue-500 to-cyan-500",
    color: "blue",
    category: "개발",
  },
  {
    id: "ai",
    name: "AI & 머신러닝",
    description: "인공지능의 세계",
    icon: Brain,
    linearColor: "from-purple-500 to-pink-500",
    color: "purple",
    category: "AI",
  },
  {
    id: "design",
    name: "디자인",
    description: "아름다운 경험 만들기",
    icon: Palette,
    linearColor: "from-pink-500 to-rose-500",
    color: "pink",
    category: "디자인",
  },
  {
    id: "data",
    name: "데이터 분석",
    description: "데이터로 말하기",
    icon: Database,
    linearColor: "from-amber-500 to-orange-500",
    color: "amber",
    category: "데이터",
  },
];

// 현재 날짜 기준으로 동적 날짜 생성
const getThisWeekDates = () => {
  const today = new Date();
  const monday = new Date(today);
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 이번 주 월요일
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { start: monday, end: sunday };
};

const getNextWeekDates = () => {
  const { start } = getThisWeekDates();
  const nextMonday = new Date(start);
  nextMonday.setDate(start.getDate() + 7);

  const nextSunday = new Date(nextMonday);
  nextSunday.setDate(nextMonday.getDate() + 6);
  nextSunday.setHours(23, 59, 59, 999);

  return { start: nextMonday, end: nextSunday };
};

const thisWeek = getThisWeekDates();
const nextWeek = getNextWeekDates();

// 시간별로 변경되는 콘텐츠들
const timedContents: TimedContent[] = [
  // 프론트엔드 - 이번 주
  {
    id: "fe-week-1",
    topicId: "frontend",
    title: "React Hooks 완전 정복",
    subtitle: "useState부터 Custom Hooks까지",
    description: "7일간의 집중 학습으로 React Hooks 마스터하기",
    startDate: thisWeek.start,
    endDate: thisWeek.end,
    weekNumber: 1,
    difficulty: "중급",
    dailyTime: "하루 20분",
    stats: {
      enrolled: 234,
      completed: 89,
      activeNow: 145,
    },
    status: "active",
  },
  // 프론트엔드 - 다음 주 (곧 공개)
  {
    id: "fe-week-2",
    topicId: "frontend",
    title: "Next.js 14 신기능",
    subtitle: "App Router와 Server Components",
    description: "최신 Next.js로 풀스택 앱 만들기",
    startDate: nextWeek.start,
    endDate: nextWeek.end,
    weekNumber: 2,
    difficulty: "고급",
    dailyTime: "하루 25분",
    stats: {
      enrolled: 0,
      completed: 0,
      activeNow: 0,
    },
    status: "upcoming",
  },
  // AI - 이번 주
  {
    id: "ai-week-1",
    topicId: "ai",
    title: "프롬프트 엔지니어링 입문",
    subtitle: "ChatGPT를 200% 활용하기",
    description: "효과적인 프롬프트 작성법과 실전 예제",
    startDate: thisWeek.start,
    endDate: thisWeek.end,
    weekNumber: 1,
    difficulty: "초급",
    dailyTime: "하루 15분",
    stats: {
      enrolled: 456,
      completed: 234,
      activeNow: 222,
    },
    status: "ending-soon",
  },
  // 디자인 - 이번 주
  {
    id: "design-week-1",
    topicId: "design",
    title: "Figma 컴포넌트 시스템",
    subtitle: "재사용 가능한 디자인 시스템 만들기",
    description: "실무에서 바로 쓰는 컴포넌트 라이브러리 구축",
    startDate: thisWeek.start,
    endDate: thisWeek.end,
    weekNumber: 1,
    difficulty: "중급",
    dailyTime: "하루 20분",
    stats: {
      enrolled: 189,
      completed: 67,
      activeNow: 122,
    },
    status: "active",
  },
  // 데이터 - 이번 주
  {
    id: "data-week-1",
    topicId: "data",
    title: "Python 데이터 분석 기초",
    subtitle: "Pandas로 데이터 다루기",
    description: "실제 데이터로 배우는 데이터 분석의 기초",
    startDate: thisWeek.start,
    endDate: thisWeek.end,
    weekNumber: 1,
    difficulty: "초급",
    dailyTime: "하루 20분",
    stats: {
      enrolled: 345,
      completed: 123,
      activeNow: 222,
    },
    status: "active",
  },
];

export function TimedCourseHub() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  // 1초마다 시간 업데이트 (카운트다운용)
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 남은 시간 계산
  const getTimeRemaining = (endDate: Date) => {
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isExpired: diff <= 0 };
  };

  // 시작까지 남은 시간 계산
  const getTimeUntilStart = (startDate: Date) => {
    const diff = startDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  // 각 주제별 활성 콘텐츠 찾기
  const getTopicContent = (topicId: string) => {
    return timedContents.filter((content) => content.topicId === topicId);
  };

  return (
    <div className="mb-8">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">이번 주 학습 트랙</h2>
        </div>
        <p className="text-sm text-neutral-600 mb-3">
          매주 새로운 주제가 공개됩니다!
        </p>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Clock className="w-4 h-4" />
          <span>
            이번 주차 콘텐츠는{" "}
            {thisWeek.end.toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
              weekday: "short",
            })}{" "}
            자정까지
          </span>
        </div>
      </div>

      {/* 주제별 콘텐츠 */}
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic) => {
          const Icon = topic.icon;
          const contents = getTopicContent(topic.id);
          const activeContent = contents.find(
            (c) => c.status === "active" || c.status === "ending-soon",
          );
          const upcomingContent = contents.find((c) => c.status === "upcoming");

          if (!activeContent) return null;

          const timeRemaining = getTimeRemaining(activeContent.endDate);
          const isEndingSoon = timeRemaining.days < 2;

          return (
            <div
              key={topic.id}
              className="relative bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden"
            >
              {/* 주제 헤더 (고정) */}
              <div
                className={`relative bg-linear-to-br ${topic.linearColor} p-6`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <Badge
                        className={`mb-2`}
                        color={topic.color}
                        variant="solid"
                      >
                        {topic.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {topic.name}
                      </h3>
                      <p className="text-sm text-white/90">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 현재 활성 콘텐츠 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-bold">
                        {activeContent.title}
                      </h4>
                      {isEndingSoon && (
                        <Badge color="red" className="animate-pulse">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          마감 임박
                        </Badge>
                      )}
                    </div>
                    <p
                      className={`text-sm text-${topic.color}-600 font-medium mb-2`}
                    >
                      {activeContent.subtitle}
                    </p>
                    <p className="text-sm text-neutral-600 mb-4">
                      {activeContent.description}
                    </p>
                  </div>
                </div>

                {/* 기간 & 카운트다운 */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* 기간 정보 */}
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      <span className="text-xs font-semibold text-neutral-600">
                        학습 기간
                      </span>
                    </div>
                    <div className="text-sm">
                      {activeContent.startDate.toLocaleDateString("ko-KR")} ~{" "}
                      {activeContent.endDate.toLocaleDateString("ko-KR")}
                    </div>
                  </div>

                  {/* 카운트다운 */}
                  {!timeRemaining.isExpired ? (
                    <div
                      className={`p-4 rounded-lg border-2 ${
                        isEndingSoon
                          ? "bg-red-50 border-red-200"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock
                          className={`w-4 h-4 ${isEndingSoon ? "text-red-600" : "text-blue-600"}`}
                        />
                        <span
                          className={`text-xs font-semibold ${isEndingSoon ? "text-red-600" : "text-blue-600"}`}
                        >
                          남은 시간
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-bold">
                        <span>{timeRemaining.days}일</span>
                        <span className="text-neutral-400">:</span>
                        <span>
                          {String(timeRemaining.hours).padStart(2, "0")}시간
                        </span>
                        <span className="text-neutral-400">:</span>
                        <span>
                          {String(timeRemaining.minutes).padStart(2, "0")}분
                        </span>
                        <span className="text-neutral-400">:</span>
                        <span>
                          {String(timeRemaining.seconds).padStart(2, "0")}초
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <Badge color="gray">종료됨</Badge>
                    </div>
                  )}
                </div>

                {/* 통계 */}
                <div className="flex items-center gap-6 mb-4 pb-4 border-b border-neutral-200">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">
                      {activeContent.stats.enrolled}명
                    </span>
                    <span className="text-neutral-500">참여</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">
                      {activeContent.stats.completed}명
                    </span>
                    <span className="text-neutral-500">완료</span>
                  </div>

                  <div className="ml-auto">
                    <Badge>{activeContent.difficulty}</Badge>
                  </div>
                </div>

                {/* 액션 */}
                <div className="flex items-center gap-3">
                  {!timeRemaining.isExpired ? (
                    <>
                      <Button
                        size="3"
                        className="flex-1"
                        onClick={() => navigate(`/course`)}
                      >
                        <Unlock className="w-4 h-4 mr-2" />
                        지금 시작하기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>

                      {upcomingContent && (
                        <Button
                          size="3"
                          variant="soft"
                          color="gray"
                          onClick={() =>
                            navigate(`/preview/${upcomingContent.id}`)
                          }
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          다음 주 미리보기
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      size="3"
                      variant="soft"
                      color="gray"
                      disabled
                      className="flex-1"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      종료된 콘텐츠
                    </Button>
                  )}
                </div>

                {/* 다음 주 콘텐츠 미리보기 */}
                {upcomingContent && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-violet-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-violet-900">
                            다음 주 예고
                          </span>
                          <Badge size="1" color="violet">
                            {getTimeUntilStart(upcomingContent.startDate)}일 후
                          </Badge>
                        </div>
                        <p className="text-sm text-violet-700 font-medium">
                          {upcomingContent.title}
                        </p>
                        <p className="text-xs text-violet-600 mt-1">
                          {upcomingContent.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
