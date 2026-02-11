import {
  ArrowRight,
  Zap,
  Target,
  Lightbulb,
  Puzzle,
  Clock,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Badge, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

// 일일 챌린지 - 매일 15분으로 해결 가능한 작은 주제들
const dailyChallenges = [
  {
    icon: Zap,
    title: "오늘의 CSS 트릭",
    description: "10분이면 배우는 유용한 CSS 한 가지",
    topic: "CSS Grid 중앙 정렬",
    difficulty: "쉬움",
    timeRequired: "10분",
    color: "from-blue-500 to-cyan-500",
    participants: 234,
    completed: 189,
    tips: 3,
  },
  {
    icon: Target,
    title: "JavaScript 원리 한 입",
    description: "헷갈리는 개념을 명쾌하게 이해하기",
    topic: "클로저(Closure) 완벽 이해",
    difficulty: "보통",
    timeRequired: "15분",
    color: "from-amber-500 to-orange-500",
    participants: 189,
    completed: 145,
    tips: 5,
  },
  {
    icon: Lightbulb,
    title: "디자인 팁 배우기",
    description: "오늘부터 바로 쓸 수 있는 디자인 노하우",
    topic: "색상 대비 완벽 가이드",
    difficulty: "쉬움",
    timeRequired: "12분",
    color: "from-pink-500 to-rose-500",
    participants: 156,
    completed: 134,
    tips: 4,
  },
  {
    icon: Puzzle,
    title: "알고리즘 문제 하나",
    description: "매일 한 문제씩 실력 쌓기",
    topic: "투 포인터 알고리즘",
    difficulty: "보통",
    timeRequired: "20분",
    color: "from-green-500 to-emerald-500",
    participants: 298,
    completed: 201,
    tips: 6,
  },
];

export function RecommendCourse() {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">오늘의 학습 챌린지</h2>
        <p className="text-sm text-neutral-600">
          매일 10-20분, 간단한 주제 하나씩 마스터하세요
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {dailyChallenges.map((challenge, index) => {
          const Icon = challenge.icon;

          return (
            <div
              key={index}
              className="group relative overflow-hidden bg-white border-2 border-neutral-200 hover:border-violet-300 rounded-xl p-5 transition-all hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/course`)}
            >
              {/* 배경 데코 */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${challenge.color} opacity-10 rounded-full -mr-12 -mt-12`}
              />

              {/* 헤더 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-10 h-10 bg-linear-to-br ${challenge.color} rounded-lg flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold mb-0.5`}>
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-neutral-600">
                      {challenge.description}
                    </p>
                  </div>
                </div>
                <Badge size="1">{challenge.difficulty}</Badge>
              </div>

              {/* 주제 */}
              <div className="mb-3 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <p className="text-xs font-semibold text-neutral-700">
                  📌 {challenge.topic}
                </p>
              </div>

              {/* 정보 */}
              <div className="flex items-center gap-3 mb-3 text-xs text-neutral-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{challenge.timeRequired}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{challenge.participants}명</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span>{challenge.completed}명 완료</span>
                </div>
              </div>

              {/* 버튼 */}
              <Flex justify="end" className="w-full">
                <Badge size="3">
                  도전하기
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Badge>
              </Flex>
            </div>
          );
        })}
      </div>
    </div>
  );
}
