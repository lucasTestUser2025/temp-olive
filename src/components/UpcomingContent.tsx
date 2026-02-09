import { Clock, Calendar } from "lucide-react";
import { Badge } from "@radix-ui/themes";

const upcomingItems = [
  {
    title: "프롬프트 엔지니어링 기초",
    topic: "AI & 머신러닝",
    unlockDate: "2026-02-09",
    unlockTime: "09:00",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "사용자 리서치 실전 가이드",
    topic: "UI/UX 디자인",
    unlockDate: "2026-02-10",
    unlockTime: "09:00",
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "Next.js 14 새로운 기능",
    topic: "프론트엔드 개발",
    unlockDate: "2026-02-11",
    unlockTime: "09:00",
    color: "bg-blue-100 text-blue-700",
  },
];

export function UpcomingContent() {
  return (
    <div className="bg-neutral-50 rounded-3xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-neutral-600" />
        <h3 className="text-lg font-bold">다음에 열릴 콘텐츠</h3>
      </div>
      <div className="space-y-3">
        {upcomingItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <Badge
                variant="soft"
                className={`text-xs ${item.color} border-0`}
              >
                {item.topic}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Clock className="w-4 h-4" />
              <span>
                {item.unlockDate} {item.unlockTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
