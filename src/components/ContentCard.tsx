import {
  CheckCircle2,
  Lock,
  Clock,
  Users,
  MessageSquare,
  Play,
} from "lucide-react";
import { Button, Badge, Avatar } from "@radix-ui/themes";

type ContentStatus = "completed" | "available" | "locked" | "upcoming";

interface ContentCardProps {
  title: string;
  description: string;
  duration: string;
  status: ContentStatus;
  learners: number;
  comments: number;
  unlockDate?: string;
  avatars: string[];
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "완료",
    labelColor: "bg-green-100 text-green-700",
  },
  available: {
    icon: Play,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    label: "학습 가능",
    labelColor: "bg-violet-100 text-violet-700",
  },
  locked: {
    icon: Lock,
    color: "text-neutral-400",
    bgColor: "bg-neutral-50",
    borderColor: "border-neutral-200",
    label: "잠김",
    labelColor: "bg-neutral-100 text-neutral-600",
  },
  upcoming: {
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    label: "곧 열림",
    labelColor: "bg-orange-100 text-orange-700",
  },
};

export function ContentCard({
  title,
  description,
  duration,
  status,
  learners,
  comments,
  unlockDate,
  avatars,
}: ContentCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const isClickable = status === "available" || status === "completed";

  return (
    <div
      className={`group relative bg-white border-2 ${config.borderColor} rounded-2xl p-6 transition-all duration-300 ${
        isClickable
          ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          : "opacity-75"
      }`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <Badge className={`${config.labelColor} border-0`}>
          <Icon className="w-3 h-3 mr-1" />
          {config.label}
        </Badge>
        <div
          className={`w-10 h-10 ${config.bgColor} rounded-full flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2 group-hover:text-violet-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 line-clamp-2">{description}</p>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{learners.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          <span>{comments}</span>
        </div>
      </div>

      {/* Collaborators */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {avatars.slice(0, 4).map((avatar, index) => (
              <Avatar
                key={index}
                className="w-8 h-8 border-2 border-white"
                fallback={`U${index + 1}`}
                src={avatar}
              />
            ))}
          </div>
          {avatars.length > 4 && (
            <span className="ml-2 text-xs text-neutral-500">
              +{avatars.length - 4}명이 학습중
            </span>
          )}
        </div>

        {unlockDate && status === "upcoming" && (
          <span className="text-xs text-neutral-500">{unlockDate} 오픈</span>
        )}
      </div>

      {/* Action Button */}
      {isClickable && (
        <Button
          className="w-full mt-4"
          variant={status === "completed" ? "soft" : "solid"}
        >
          {status === "completed" ? "다시 보기" : "학습 시작"}
        </Button>
      )}
    </div>
  );
}
