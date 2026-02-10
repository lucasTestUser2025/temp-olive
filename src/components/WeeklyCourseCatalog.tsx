import {
  ArrowRight,
  BookOpen,
  Headphones,
  Video,
  FileText,
  Clock,
  Users,
  CheckCircle2,
  MessageSquare,
  ThumbsUp,
  Sparkles,
} from "lucide-react";
import { Badge, Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

// 콘텐츠 타입별 학습 자료 - 각각 독립적이고 가벼움
interface ContentItem {
  icon: any;
  title: string;
  description: string;
  type: "영상" | "글" | "오디오" | "퀴즈";
  topic: string;
  duration: string;
  difficulty: "쉬움" | "보통";
  color: string;
  views: number;
  completed: number;
  likes: number;
  comments: number;
}

const contentItems: ContentItem[] = [
  {
    icon: Video,
    title: "useEffect 의존성 배열",
    description: "왜 필요하고 어떻게 쓰는지 명확하게",
    type: "영상",
    topic: "React",
    duration: "7분",
    difficulty: "쉬움",
    color: "from-red-500 to-pink-500",
    views: 1234,
    completed: 890,
    likes: 234,
    comments: 45,
  },
  {
    icon: FileText,
    title: "TypeScript any vs unknown",
    description: "헷갈리는 타입, 이제 확실하게 구분하기",
    type: "글",
    topic: "TypeScript",
    duration: "5분",
    difficulty: "쉬움",
    color: "from-blue-500 to-indigo-500",
    views: 987,
    completed: 756,
    likes: 189,
    comments: 34,
  },
  {
    icon: Headphones,
    title: "디자인 원칙 5가지",
    description: "출퇴근길에 듣는 디자인 핵심 개념",
    type: "오디오",
    topic: "디자인",
    duration: "10분",
    difficulty: "쉬움",
    color: "from-pink-500 to-rose-500",
    views: 654,
    completed: 543,
    likes: 145,
    comments: 23,
  },
  {
    icon: BookOpen,
    title: "SQL 조인 완전 정복",
    description: "INNER, LEFT, RIGHT JOIN을 시각적으로 이해하기",
    type: "퀴즈",
    topic: "데이터베이스",
    duration: "12분",
    difficulty: "보통",
    color: "from-green-500 to-teal-500",
    views: 876,
    completed: 678,
    likes: 234,
    comments: 56,
  },
  {
    icon: Video,
    title: "CSS 변수 활용법",
    description: "다크모드 구현이 이렇게 쉬웠다니",
    type: "영상",
    topic: "CSS",
    duration: "8분",
    difficulty: "쉬움",
    color: "from-cyan-500 to-blue-500",
    views: 1456,
    completed: 1123,
    likes: 345,
    comments: 67,
  },
  {
    icon: FileText,
    title: "API 에러 핸들링",
    description: "try-catch를 넘어선 우아한 에러 처리",
    type: "글",
    topic: "JavaScript",
    duration: "10분",
    difficulty: "보통",
    color: "from-amber-500 to-orange-500",
    views: 765,
    completed: 543,
    likes: 167,
    comments: 34,
  },
];

export function WeeklyCourseCatalog() {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold">인기 콘텐츠</h2>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
        <p className="text-sm text-neutral-600">
          지금 가장 많이 보는 5-10분 학습 자료
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {contentItems.map((item, index) => {
          const Icon = item.icon;
          const completionRate = Math.round((item.completed / item.views) * 100);

          return (
            <div
              key={index}
              className="group relative bg-white border-2 border-neutral-200 hover:border-violet-300 rounded-xl p-4 transition-all hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/content/${index}`)}
            >
              {/* 타입 뱃지 */}
              <div className="flex items-center justify-between mb-3">
                <Badge size="2" color="violet">
                  <Icon className="w-3.5 h-3.5 mr-1" />
                  {item.type}
                </Badge>
                <Badge size="1">{item.topic}</Badge>
              </div>

              {/* 제목 */}
              <h3 className="text-sm font-bold mb-1.5 group-hover:text-violet-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* 시간 & 난이도 */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-semibold">{item.duration}</span>
                </div>
                <Badge size="1" color="gray">{item.difficulty}</Badge>
              </div>

              {/* 통계 */}
              <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b text-xs">
                <div className="flex items-center gap-1 text-neutral-600">
                  <Users className="w-3.5 h-3.5" />
                  <span>{item.views}</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.completed}</span>
                </div>
                <div className="flex items-center gap-1 text-pink-600">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{item.comments}</span>
                </div>
              </div>

              {/* 버튼 */}
              <Button size="1" variant="soft" className="w-full">
                보기
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
