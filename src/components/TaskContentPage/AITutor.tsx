import { useState } from "react";
import { Bot, Send, User, X } from "lucide-react";
import { Button } from "@radix-ui/themes";

// 목데이터: 키워드 → AI 응답 매핑 (추후 AI 에이전트로 교체)
const MOCK_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["길어", "줄이", "길다", "짧게", "결과"],
    response:
      '좋은 질문이에요! 결과가 길다는 건 "제약 조건"이 부족할 수 있어요. 혹시 프롬프트에 글자 수나 줄 수 제한을 넣어보셨나요? "100자 이내로" 또는 "3줄로"처럼 구체적인 숫자를 넣어보면 어떨까요?',
  },
  {
    keywords: ["차이", "버전", "비슷", "같다", "다르지"],
    response:
      '차이가 적을 수도 있어요. 그런 경우에는 프롬프트를 좀 더 극단적으로 바꿔보는 것도 방법이에요. 예를 들어 역할을 "CEO 비서"로 바꾸면 요약 관점이 확 달라질 수 있어요. 한번 시도해볼래요?',
  },
  {
    keywords: ["역할", "역할 부여"],
    response:
      '"당신은 바쁜 마케팅팀 팀원의 비서입니다"처럼 구체적인 역할을 주면, AI가 그 관점에서 정보를 걸러내요. 수신자(나)의 직무나 상황을 넣을수록 맞춤 요약이 됩니다.',
  },
  {
    keywords: ["형식", "출력 형식", "포맷"],
    response:
      '"- 📅 일정 / 🎯 핵심 안건 / ✅ 할 일"처럼 항목을 미리 정해두면 일관된 결과를 얻을 수 있어요. 이모지로 구분하면 한눈에 들어오기도 좋아요.',
  },
  {
    keywords: ["시작", "어떻게", "모르겠"],
    response:
      '먼저 "아래 이메일을 요약해줘"처럼 가장 단순하게 시작해보세요. 그 결과를 보고 "뭐가 부족하지?"를 생각하면 다음 버전이 자연스럽게 나와요.',
  },
];

const FALLBACK_RESPONSE =
  '미션 수행 중 막히는 부분이 있다면 구체적으로 질문해주세요! 예: "결과가 너무 길어요", "역할 부여가 뭔가요?" 등';

const SUGGESTED_QUESTIONS = [
  "프롬프트 결과가 너무 길어요. 어떻게 줄이죠?",
  "버전 A랑 B 차이가 별로 없는데 괜찮은가요?",
  "역할 부여가 정확히 뭔가요?",
];

function findMockResponse(userInput: string): string {
  const lower = userInput.trim().toLowerCase();
  if (!lower) return "질문을 입력해주세요.";

  for (const { keywords, response } of MOCK_RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return response;
    }
  }
  return FALLBACK_RESPONSE;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AITutorProps {
  className?: string;
}

export function AITutor({ className = "" }: AITutorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "미션 수행 중 막히는 부분이 있으면 질문해주세요. 정답을 알려주진 않지만, 방향을 잡아드릴게요!",
    },
  ]);
  const [input, setInput] = useState("");

  const sendQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 목데이터 기반 응답 (추후 API 호출로 교체)
    setTimeout(() => {
      const aiResponse = findMockResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    }, 600);
  };

  const handleSend = () => sendQuestion(input);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ${className}`}
    >
      {/* 채팅 패널 (열렸을 때) */}
      {isOpen && (
        <div className="w-[500px] rounded-xl border-2 border-violet-200 bg-white overflow-hidden shadow-xl animate-fade-in">
          <div className="p-4 bg-violet-50 border-b border-violet-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-violet-600" />
              <h3 className="font-bold text-violet-900">
                AI 조교에게 물어보기
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-violet-200/60 text-violet-700 transition-colors"
              aria-label="채팅창 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                    msg.role === "user" ? "bg-violet-500" : "bg-violet-100"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-violet-600" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 ${
                    msg.role === "user"
                      ? "bg-violet-500 text-white"
                      : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-neutral-200">
            <div className="flex flex-wrap gap-2 mb-3">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendQuestion(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="질문을 입력하세요..."
                className="flex-1 px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:border-violet-400 focus:outline-none text-sm"
              />
              <Button size="2" color="violet" onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-14 h-14 rounded-full bg-violet-500 hover:bg-violet-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${!isOpen ? "animate-float" : ""}`}
        aria-label={isOpen ? "채팅창 닫기" : "AI 조교 열기"}
      >
        <Bot className="w-7 h-7" />
      </button>
    </div>
  );
}
