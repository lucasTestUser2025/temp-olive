import {
  ArrowRight,
  Sparkles,
  Wand2,
  Lightbulb,
  Rocket,
  Clock,
  Users,
  CheckCircle2,
  Play,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

// 주제별 빠른 학습 - 30분 이내로 완료 가능한 독립 주제
const quickTopics = [
  {
    icon: Sparkles,
    title: "Git 브랜치 전략",
    subtitle: "실무에서 쓰는 Git Flow 이해하기",
    topic: "개발 도구",
    duration: "25분",
    difficulty: "보통",
    color: "from-blue-500 to-cyan-500",
    format: "영상 + 실습",
    participants: 456,
    completed: 389,
    discussions: 23,
  },
  {
    icon: Wand2,
    title: "Tailwind CSS 마법",
    subtitle: "유틸리티 퍼스트로 빠르게 스타일링",
    topic: "CSS",
    duration: "20분",
    difficulty: "쉬움",
    color: "from-cyan-500 to-teal-500",
    format: "인터랙티브",
    participants: 523,
    completed: 467,
    discussions: 34,
  },
  {
    icon: Lightbulb,
    title: "API 설계 원칙",
    subtitle: "RESTful API 베스트 프랙티스",
    topic: "백엔드",
    duration: "30분",
    difficulty: "보통",
    color: "from-violet-500 to-purple-500",
    format: "아티클",
    participants: 234,
    completed: 189,
    discussions: 45,
  },
  {
    icon: Rocket,
    title: "성능 최적화 팁",
    subtitle: "웹 성능을 2배 향상시키는 방법",
    topic: "최적화",
    duration: "25분",
    difficulty: "보통",
    color: "from-orange-500 to-red-500",
    format: "영상",
    participants: 345,
    completed: 278,
    discussions: 56,
  },
];

export function RecommendCourseEnhanced() {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">30분 퀵 러닝</h2>
        <p className="text-sm text-neutral-600">
          점심시간에 끝내는 핵심 개념 학습
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {quickTopics.map((topic, index) => {
          const Icon = topic.icon;

          return (
            <div
              key={index}
              className="group relative bg-white border-2 border-neutral-200 hover:border-violet-300 rounded-xl p-4 transition-all hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/course`)}
            >
              {/* 헤더 */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <Badge size="1" className="mb-1">
                    {topic.topic}
                  </Badge>
                  <h3 className="text-base font-bold mb-0.5 group-hover:text-violet-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-neutral-600">{topic.subtitle}</p>
                </div>
              </div>

              {/* 형식 & 시간 */}
              <div className="flex items-center gap-2 mb-3">
                <Badge size="2" color="blue">
                  <Play className="w-3 h-3 mr-1" />
                  {topic.format}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-neutral-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-semibold">{topic.duration}</span>
                </div>
                <Badge size="1">{topic.difficulty}</Badge>
              </div>

              {/* 통계 */}
              <div className="flex items-center gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1 text-neutral-600">
                  <Users className="w-3.5 h-3.5" />
                  <span>{topic.participants}명</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{topic.completed}명</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{topic.discussions}</span>
                </div>
              </div>

              <Badge size="3">
                바로 시작
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
