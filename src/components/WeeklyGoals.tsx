import { Target, Award, Users, Zap } from "lucide-react";
import { Progress } from "@radix-ui/themes";

export function WeeklyGoals() {
  const goals = [
    {
      icon: Target,
      title: "주간 학습 목표",
      current: 3,
      target: 7,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
    {
      icon: Zap,
      title: "연속 학습일",
      current: 7,
      target: 7,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      title: "커뮤니티 참여",
      current: 12,
      target: 15,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Award,
      title: "주간 포인트",
      current: 850,
      target: 1000,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {goals.map((goal, index) => {
        const Icon = goal.icon;
        const percentage = (goal.current / goal.target) * 100;

        return (
          <div key={index} className="bg-white border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 ${goal.bgColor} rounded-xl flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${goal.color}`} />
              </div>
              <span className="text-xs font-medium text-neutral-500">
                {goal.current}/{goal.target}
              </span>
            </div>
            <h3 className="text-sm font-semibold mb-2">{goal.title}</h3>
            <Progress value={percentage} className="h-2" />
          </div>
        );
      })}
    </div>
  );
}
