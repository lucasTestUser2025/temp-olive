import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Palette,
  Smartphone,
  Brain,
  Database,
  Rocket,
  BookOpen,
  Clock,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Microchip,
  Scale,
  Coffee,
  Hamburger,
  TramFront,
  Moon,
  Flame,
} from "lucide-react";
import { Button, Badge } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

interface OnboardingData {
  skillLevel: string;
  interests: string[];
  learningStyle: string;
  dailyGoal: string;
}

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    skillLevel: "",
    interests: [],
    learningStyle: "",
    dailyGoal: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // 완료 후 홈으로
      console.log("온보딩 완료:", data);
      navigate("/");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.skillLevel !== "";
      case 2:
        return data.interests.length > 0;
      case 3:
        return data.learningStyle !== "";
      case 4:
        return data.dailyGoal !== "";
      default:
        return false;
    }
  };

  const toggleInterest = (interest: string) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* 진행 바 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-neutral-600">
              {step} / {totalSteps}
            </span>
            <span className="text-sm text-neutral-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 메인 카드 */}
        <div className="bg-white border-2 border-neutral-200 rounded-3xl p-8 shadow-xl">
          {/* Step 1: 개발 숙련도 */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-linear-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Microchip className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  현재 실력은 어느 정도인가요?
                </h2>
                <p className="text-sm text-neutral-600">
                  당신의 수준에 맞는 콘텐츠를 추천해드릴게요
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    value: "absolute-beginner",
                    label: "입문",
                    desc: "프로그래밍이 처음이에요",
                    icon: BookOpen,
                  },
                  {
                    value: "beginner",
                    label: "초급",
                    desc: "간단한 코드를 읽을 수 있어요",
                    icon: Code,
                  },
                  {
                    value: "elementary",
                    label: "중급",
                    desc: "기본 문법과 개념을 알아요",
                    icon: Lightbulb,
                  },
                  {
                    value: "intermediate",
                    label: "고급",
                    desc: "혼자 프로젝트를 만들 수 있어요",
                    icon: Rocket,
                  },
                ].map((level) => {
                  const Icon = level.icon;
                  return (
                    <button
                      key={level.value}
                      onClick={() =>
                        setData({ ...data, skillLevel: level.value })
                      }
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 hover:cursor-pointer ${
                        data.skillLevel === level.value
                          ? "border-violet-500 bg-violet-50"
                          : "border-neutral-200 hover:border-violet-300 bg-white"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          data.skillLevel === level.value
                            ? "bg-violet-500"
                            : "bg-neutral-100"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            data.skillLevel === level.value
                              ? "text-white"
                              : "text-neutral-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-base mb-0.5">
                          {level.label}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {level.desc}
                        </div>
                      </div>
                      {data.skillLevel === level.value && (
                        <CheckCircle2 className="w-6 h-6 text-violet-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: 관심 주제 */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  어떤 주제에 관심있나요?
                </h2>
                <p className="text-sm text-neutral-600">
                  여러 개 선택 가능해요 (최소 1개)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "web", label: "웹 개발", icon: Code, color: "blue" },
                  {
                    value: "mobile",
                    label: "모바일",
                    icon: Smartphone,
                    color: "green",
                  },
                  { value: "ai", label: "AI/ML", icon: Brain, color: "purple" },
                  {
                    value: "design",
                    label: "디자인",
                    icon: Palette,
                    color: "pink",
                  },
                  {
                    value: "data",
                    label: "데이터",
                    icon: Database,
                    color: "amber",
                  },
                  {
                    value: "cs",
                    label: "CS/알고리즘",
                    icon: Rocket,
                    color: "red",
                  },
                ].map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = data.interests.includes(interest.value);

                  return (
                    <button
                      key={interest.value}
                      onClick={() => toggleInterest(interest.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? `border-${interest.color}-200 bg-${interest.color}-50`
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 mx-auto mb-2 ${
                          isSelected
                            ? `text-${interest.color}-600`
                            : "text-neutral-400"
                        }`}
                      />
                      <div className="text-sm font-bold text-center">
                        {interest.label}
                      </div>
                      {isSelected && (
                        <CheckCircle2
                          className={`w-5 h-5 text-${interest.color}-500 mx-auto mt-2`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 text-center">
                <Badge size="2" color="violet">
                  {data.interests.length}개 선택됨
                </Badge>
              </div>
            </div>
          )}

          {/* Step 3: 학습 성향 */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  어떻게 배우는 걸 선호하세요?
                </h2>
                <p className="text-sm text-neutral-600">
                  학습 스타일에 맞는 콘텐츠를 추천해드릴게요
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    value: "theory-first",
                    label: "이론 먼저",
                    desc: "개념을 충분히 이해한 후 실습해요",
                    icon: BookOpen,
                  },
                  {
                    value: "practice-first",
                    label: "실습 먼저",
                    desc: "일단 해보고 막히면 찾아봐요",
                    icon: Rocket,
                  },
                  {
                    value: "balanced",
                    label: "균형잡힌",
                    desc: "이론과 실습을 병행해요",
                    icon: Scale,
                  },
                ].map((style) => (
                  <button
                    key={style.value}
                    onClick={() =>
                      setData({ ...data, learningStyle: style.value })
                    }
                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                      data.learningStyle === style.value
                        ? "border-violet-500 bg-violet-50"
                        : "border-neutral-200 hover:border-violet-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3">
                        <style.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">
                          {style.label}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {style.desc}
                        </div>
                      </div>
                      {data.learningStyle === style.value && (
                        <CheckCircle2 className="w-6 h-6 text-violet-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: 일일 목표 시간 */}
          {step === 4 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  하루에 얼마나 학습하시겠어요?
                </h2>
                <p className="text-sm text-neutral-600">
                  꾸준함이 중요해요. 무리하지 않는 목표를 세워보세요
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    value: "10",
                    label: "10분",
                    desc: "짧지만 매일",
                    icon: Coffee,
                    color: "green",
                  },
                  {
                    value: "20",
                    label: "20분",
                    desc: "점심시간 활용",
                    icon: Hamburger,
                    color: "blue",
                  },
                  {
                    value: "30",
                    label: "30분",
                    desc: "출퇴근 시간",
                    icon: TramFront,
                    color: "violet",
                  },
                  {
                    value: "60",
                    label: "1시간",
                    desc: "저녁 시간 활용",
                    icon: Moon,
                    color: "amber",
                  },
                  {
                    value: "120",
                    label: "2시간+",
                    desc: "집중 학습",
                    icon: Flame,
                    color: "red",
                  },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setData({ ...data, dailyGoal: goal.value })}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      data.dailyGoal === goal.value
                        ? `border-${goal.color}-200 bg-${goal.color}-50`
                        : "border-neutral-200 hover:border-violet-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3">
                        <goal.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-0.5">
                          {goal.label}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {goal.desc}
                        </div>
                      </div>
                      {data.dailyGoal === goal.value && (
                        <CheckCircle2
                          className={`w-6 h-6 text-${goal.color}-500`}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 네비게이션 버튼 */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-300">
            <Button size="3" onClick={handleBack} disabled={step === 1}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              이전
            </Button>

            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i + 1 === step
                      ? "bg-violet-500 w-8"
                      : i + 1 < step
                        ? "bg-violet-300"
                        : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>

            <Button size="3" onClick={handleNext} disabled={!canProceed()}>
              {step === totalSteps ? "완료" : "다음"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* 하단 힌트 */}
        <div className="text-center mt-6">
          <p className="text-sm text-neutral-500">
            나중에 설정에서 언제든 변경할 수 있어요
          </p>
        </div>
      </div>
    </div>
  );
}
