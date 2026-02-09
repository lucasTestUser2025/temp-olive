import { ContentCard } from "./ContentCard";
import { Code, Palette, Sparkles, type LucideIcon } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  contents: Content[];
}
interface Content {
  title: string;
  description: string;
  duration: string;
  status: "completed" | "available" | "locked" | "upcoming";
  learners: number;
  comments: number;
  avatars: string[];
  type: "video" | "article" | "quiz";
  unlockDate?: string;
}

const topics: Topic[] = [
  {
    id: "frontend",
    title: "프론트엔드 개발",
    icon: Code,
    color: "bg-blue-500",
    contents: [
      {
        title: "React Hooks 완벽 이해하기",
        description:
          "useState, useEffect부터 커스텀 훅까지 실전에서 활용하는 방법을 배웁니다.",
        duration: "25분",
        status: "completed",
        learners: 1247,
        comments: 89,
        avatars: [
          "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
        ],
        type: "video",
      },
      {
        title: "TypeScript 타입 시스템 마스터",
        description:
          "제네릭과 고급 타입을 활용해 안전한 코드를 작성하는 방법을 학습합니다.",
        duration: "30분",
        status: "available",
        learners: 892,
        comments: 56,
        avatars: [
          "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
        ],
        type: "video",
      },
      {
        title: "성능 최적화 실전 가이드",
        description:
          "React 애플리케이션의 성능을 측정하고 개선하는 구체적인 방법을 다룹니다.",
        duration: "35분",
        status: "available",
        learners: 654,
        comments: 42,
        avatars: [
          "https://api.dicebear.com/7.x/avataaars/svg?seed=9",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=10",
        ],
        type: "video",
      },
    ],
  },
  {
    id: "design",
    title: "UI/UX 디자인",
    icon: Palette,
    color: "bg-pink-500",
    contents: [
      {
        title: "디자인 시스템 구축하기",
        description:
          "일관성 있는 디자인을 위한 컴포넌트 라이브러리를 만드는 방법을 배웁니다.",
        duration: "40분",
        status: "completed",
        learners: 1523,
        comments: 112,
        avatars: [
          "https://api.dicebear.com/7.x/avataaars/svg?seed=11",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=12",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=13",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=14",
        ],
        type: "video",
      },
      {
        title: "Figma Auto Layout 활용법",
        description:
          "Auto Layout을 마스터하여 반응형 디자인을 빠르게 작업하는 방법을 학습합니다.",
        duration: "20분",
        status: "completed",
        learners: 987,
        comments: 67,
        avatars: [
          "https://api.dicebear.com/7.x/avataaars/svg?seed=15",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=16",
        ],
        type: "article",
      },
      {
        title: "사용자 리서치 실전 가이드",
        description:
          "효과적인 사용자 인터뷰와 데이터 분석을 통해 인사이트를 도출하는 방법을 다룹니다.",
        duration: "45분",
        status: "upcoming",
        learners: 234,
        comments: 12,
        unlockDate: "2026-02-10",
        avatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=17"],
        type: "video",
      },
    ],
  },
  {
    id: "ai",
    title: "AI & 머신러닝",
    icon: Sparkles,
    color: "bg-purple-500",
    contents: [
      {
        title: "ChatGPT API 실전 활용",
        description:
          "OpenAI API를 사용하여 실제 서비스에 AI 기능을 통합하는 방법을 배웁니다.",
        duration: "50분",
        status: "available",
        learners: 2134,
        comments: 178,
        avatars: [
          "https://api.dicebear.com/7.x/avataaars/svg?seed=18",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=19",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=20",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=21",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=22",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=23",
        ],
        type: "video",
      },
      {
        title: "프롬프트 엔지니어링 기초",
        description:
          "AI로부터 원하는 결과를 얻기 위한 효과적인 프롬프트 작성법을 학습합니다.",
        duration: "15분",
        status: "upcoming",
        learners: 456,
        comments: 23,
        unlockDate: "2026-02-09",
        avatars: [
          "https://api.dicebear.com/7.x/avataaars/svg?seed=24",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=25",
        ],
        type: "article",
      },
      {
        title: "RAG 시스템 구축하기",
        description:
          "Retrieval-Augmented Generation을 활용한 지능형 챗봇을 만드는 방법을 다룹니다.",
        duration: "60분",
        status: "locked",
        learners: 89,
        comments: 5,
        avatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=26"],
        type: "video",
      },
    ],
  },
];

export function TopicSection() {
  return (
    <div className="space-y-12">
      {topics.map((topic) => {
        const Icon = topic.icon;
        return (
          <div key={topic.id}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-12 h-12 ${topic.color} rounded-2xl flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{topic.title}</h2>
                <p className="text-sm text-neutral-500">
                  {
                    topic.contents.filter((c) => c.status === "completed")
                      .length
                  }
                  /{topic.contents.length} 완료
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topic.contents.map((content, index) => (
                <ContentCard key={index} {...content} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
