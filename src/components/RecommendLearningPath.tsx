import {
  ArrowRight,
  Wrench,
  Zap,
  Target,
  Trophy,
  Clock,
  Code,
  Palette,
  Brain,
  UserCheck2,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@radix-ui/themes";

// 스킬 카드 - 작고 구체적인 스킬 하나씩
interface Skill {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  duration: string; // 매우 짧은 시간
  difficulty: "입문" | "초급" | "중급";
  color: string;
  bgColor: string;
  learned: number; // 배운 사람 수
  practicing: number; // 연습 중
  xp: number; // 획득 XP
}

const skills: Skill[] = [
  {
    icon: Code,
    title: "Array.map() 완벽 활용",
    description: "배열 메서드 하나만 제대로 알아도 코드가 달라집니다",
    category: "JavaScript",
    duration: "8분",
    difficulty: "입문",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    learned: 1234,
    practicing: 89,
    xp: 50,
  },
  {
    icon: Palette,
    title: "색상 대비 체크하기",
    description: "접근성 높은 색상 조합을 고르는 법",
    category: "디자인",
    duration: "10분",
    difficulty: "입문",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    learned: 892,
    practicing: 67,
    xp: 60,
  },
  {
    icon: Wrench,
    title: "Flexbox 중앙 정렬",
    description: "더 이상 헤매지 않는 완벽한 정렬 방법",
    category: "CSS",
    duration: "7분",
    difficulty: "입문",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    learned: 2345,
    practicing: 123,
    xp: 40,
  },
  {
    icon: Zap,
    title: "async/await 이해하기",
    description: "비동기 처리를 깔끔하게",
    category: "JavaScript",
    duration: "12분",
    difficulty: "초급",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    learned: 1567,
    practicing: 234,
    xp: 80,
  },
  {
    icon: Brain,
    title: "프롬프트 작성 공식",
    description: "AI에게 정확히 원하는 답 받기",
    category: "AI",
    duration: "10분",
    difficulty: "입문",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    learned: 3456,
    practicing: 456,
    xp: 70,
  },
  {
    icon: Target,
    title: "Git 커밋 메시지 잘 쓰기",
    description: "협업을 위한 명확한 커밋 작성법",
    category: "개발 도구",
    duration: "6분",
    difficulty: "입문",
    color: "text-green-600",
    bgColor: "bg-green-50",
    learned: 1890,
    practicing: 178,
    xp: 50,
  },
];

export function RecommendLearningPath() {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">스킬 카드</h2>
        <p className="text-sm text-neutral-600">
          5-10분이면 배우는 실용적인 작은 스킬들
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <div
              key={index}
              className="group relative bg-white border-2 border-neutral-200 hover:border-violet-300 rounded-xl p-4 transition-all hover:shadow-lg cursor-pointer"
            >
              {/* 아이콘 & 카테고리 */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 ${skill.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${skill.color}`} />
                </div>
                <Badge size="1">{skill.category}</Badge>
              </div>

              {/* 제목 */}
              <h3 className="text-sm font-bold mb-1 group-hover:text-violet-600 transition-colors">
                {skill.title}
              </h3>
              <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                {skill.description}
              </p>

              {/* 시간 & 난이도 */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-semibold">{skill.duration}</span>
                </div>
                <Badge size="1" color="gray">
                  {skill.difficulty}
                </Badge>
              </div>

              {/* 통계 */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b text-xs border-neutral-200">
                <div className="flex items-center gap-1 text-violet-600">
                  <UserCheck2 className="w-3.5 h-3.5" />
                  <span className="font-semibold">{skill.practicing}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Trophy className="w-3.5 h-3.5" />
                  <span className="font-semibold">+{skill.xp} XP</span>
                </div>
              </div>

              {/* 버튼 */}
              <Badge size="2">
                배우기
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
