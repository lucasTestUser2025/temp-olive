import { Badge, Button } from "@radix-ui/themes";
import { Clock, Sparkles, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { courseContents } from "../../data/courseContent";

export function UpcomingContent() {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-1">목록</h2>
      </div>

      {/* 카드 그리드 - 배너와 동일 레벨의 시각적 톤 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseContents.map((item, index) => {
          const ACTIVE_INDEX = 1;
          const isPast = index < ACTIVE_INDEX;
          const isActive = index === ACTIVE_INDEX;
          const isUpcoming = index > ACTIVE_INDEX;

          return (
            <div
              key={index}
              onClick={() => isActive && navigate(`/course/${item.id}`)}
              className={`
                group relative rounded-2xl border-2 overflow-hidden
                transition-all duration-300
                ${isPast ? "border-neutral-200 opacity-75" : ""}
                ${isActive ? "cursor-pointer hover:shadow-xl hover:-translate-y-1 border-violet-400 shadow-lg ring-2 ring-violet-200 ring-offset-2" : ""}
                ${isUpcoming ? "border-neutral-200" : ""}
              `}
            >
              <div className="relative p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3
                    className={`font-bold text-lg leading-snug pr-2 ${
                      isPast ? "text-neutral-500" : "text-neutral-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {isActive && (
                    <Badge color="violet" size="2">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Now
                    </Badge>
                  )}
                </div>

                <Badge
                  variant="soft"
                  color={
                    isPast
                      ? "gray"
                      : (item.topicColor as "purple" | "pink" | "blue")
                  }
                  size="1"
                  className="mb-3"
                >
                  {item.topic}
                </Badge>

                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    isPast ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  {item.description}
                </p>

                <div
                  className={`flex items-center gap-2 text-xs pt-3 border-t ${
                    isPast
                      ? "text-neutral-400 border-neutral-200"
                      : "text-neutral-500 border-neutral-200/60"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.duration}</span>
                  <span className="text-neutral-300">·</span>
                  <span>
                    {item.unlockDate} {item.unlockTime} 오픈
                  </span>
                </div>
                {isPast && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 p-6">
                    <p className="text-sm font-medium text-neutral-600 text-center">
                      학습 일자가 지났어요
                    </p>
                    <Button size="3" color="violet">
                      <UserPlus className="w-4 h-4 mr-2" />
                      구독 하고 미리보기
                    </Button>
                  </div>
                )}
                {/* 이후 콘텐츠: blur + 멤버 가입 버튼 오버레이 */}
                {isUpcoming && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 p-6 bg-white/40">
                    <p className="text-sm font-medium text-neutral-600 text-center">
                      아직 오픈 전이에요
                    </p>
                    <Button size="3" color="violet">
                      <UserPlus className="w-4 h-4 mr-2" />
                      구독 하고 복습하기
                    </Button>
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
