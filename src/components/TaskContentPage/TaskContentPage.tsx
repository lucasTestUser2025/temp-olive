import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Zap,
  Send,
  ChevronDown,
  ChevronUp,
  FileText,
  Award,
} from "lucide-react";
import { Badge, Button } from "@radix-ui/themes";
import { getCourseById } from "../../data/courseContent";
import { AITutor } from "./AITutor";

const TYPE_ICONS = {
  read: BookOpen,
  mission: Zap,
  submit: Send,
  feedback: Award,
};

const TYPE_LABELS = {
  read: "콘텐츠 학습",
  mission: "미션 수행",
  submit: "제출",
  feedback: "AI 피드백",
};

function CollapsibleHint({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="border border-neutral-200 rounded-lg overflow-hidden"
      open={open}
    >
      <summary
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 list-none"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <span className="font-medium text-neutral-800">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-neutral-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        )}
      </summary>
      <div className="px-4 pb-4 pt-0 border-t border-neutral-100">
        <p className="text-sm text-neutral-600 whitespace-pre-wrap mt-3">
          {content}
        </p>
      </div>
    </details>
  );
}

export function TaskContentPage() {
  const { id, step } = useParams<{ id: string; step: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : undefined;
  const stepIndex = step ? parseInt(step, 10) : 1;
  const tasks = course?.tasks ?? [];
  const currentTask = tasks[stepIndex - 1];
  const isFirst = stepIndex <= 1;
  const isLast = stepIndex >= tasks.length;

  const [feedbackRevealed, setFeedbackRevealed] = useState(false);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-neutral-600">콘텐츠를 찾을 수 없어요</p>
        <Button onClick={() => navigate("/")}>목록으로 돌아가기</Button>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-neutral-600">단계를 찾을 수 없어요</p>
        <Button onClick={() => navigate(`/course/${course.id}/2`)}>
          코스로 돌아가기
        </Button>
      </div>
    );
  }

  const TypeIcon = TYPE_ICONS[currentTask.type] ?? FileText;

  return (
    <div className="max-w-3xl mx-auto mb-16">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(`/course/${course.id}/2`)}
          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-violet-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {course.title}
        </button>
        <span className="text-sm text-neutral-500">
          {stepIndex} / {tasks.length}
        </span>
      </div>

      {/* 진행 인디케이터 */}
      <div className="flex gap-1 mb-8">
        {tasks.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i + 1 <= stepIndex ? "bg-violet-500" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>

      {/* 본문 콘텐츠 */}
      <article className="bg-white rounded-2xl border-2 border-neutral-200 p-8 lg:p-12 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <TypeIcon className="w-5 h-5 text-violet-600" />
          </div>
          <Badge size="2" variant="soft" color={course.topicColor}>
            {TYPE_LABELS[currentTask.type]}
          </Badge>
          <span className="text-sm text-neutral-500">+{currentTask.xp} XP</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold mb-8">
          {currentTask.title}
        </h1>

        {/* read 타입 */}
        {currentTask.type === "read" && (
          <div className="space-y-8">
            {currentTask.content?.map((p, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed">
                {p}
              </p>
            ))}
            {currentTask.concepts?.map((concept, i) => (
              <div key={i}>
                <h3 className="font-bold text-lg mb-2">{concept.title}</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  {concept.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            {currentTask.references && currentTask.references.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">참고 자료</h3>
                <ul className="space-y-1">
                  {currentTask.references.map((ref, i) => (
                    <li key={i}>
                      <a
                        href={ref.url}
                        className="text-violet-600 hover:underline"
                      >
                        {ref.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-6 border-t border-neutral-200">
              <h3 className="font-bold mb-2">💬 코멘트 남기기</h3>
              <p className="text-sm text-neutral-500 mb-3">
                학습한 내용에 대해 자유롭게 코멘트를 남겨보세요.
              </p>
              <textarea
                rows={3}
                placeholder="새롭게 알게 된 점, 의문이 드는 점, 실무에서 써본 경험 등..."
                className="w-full p-4 border-2 border-neutral-200 rounded-xl resize-y focus:border-violet-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* mission 타입 */}
        {currentTask.type === "mission" && (
          <div className="space-y-8">
            {currentTask.content?.map((p, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed">
                {p}
              </p>
            ))}
            {currentTask.sampleEmail && (
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <h3 className="font-bold mb-2">샘플 이메일</h3>
                <p className="text-sm font-medium text-neutral-700 mb-2">
                  제목: {currentTask.sampleEmail.subject}
                </p>
                <pre className="text-sm text-neutral-600 whitespace-pre-wrap font-sans">
                  {currentTask.sampleEmail.body}
                </pre>
              </div>
            )}
            {currentTask.missionConditions &&
              currentTask.missionConditions.length > 0 && (
                <div>
                  <h3 className="font-bold mb-2">미션 조건</h3>
                  <ul className="list-disc list-inside space-y-1 text-neutral-600">
                    {currentTask.missionConditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            {currentTask.hints && currentTask.hints.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">💡 힌트</h3>
                <div className="space-y-2">
                  {currentTask.hints.map((hint, i) => (
                    <CollapsibleHint
                      key={i}
                      title={hint.title}
                      content={hint.content}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* submit 타입 */}
        {currentTask.type === "submit" && currentTask.formFields && (
          <div className="space-y-6">
            <SubmitForm
              formFields={currentTask.formFields}
              onSubmit={() =>
                navigate(`/course/${course.id}/task/${stepIndex + 1}`)
              }
            />
            <AITutor />
          </div>
        )}

        {/* feedback 타입 */}
        {currentTask.type === "feedback" && (
          <div className="space-y-6">
            {/* 제출한 내용 - 이전 단계(submit)의 formFields defaultValue */}
            {(() => {
              const submitTask = tasks[stepIndex - 2];
              const fields =
                submitTask?.type === "submit" ? submitTask.formFields : [];
              return fields && fields.length > 0 ? (
                <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                  <h3 className="font-bold mb-4">📤 제출한 내용</h3>
                  <div className="space-y-4">
                    {fields.map((field, i) => (
                      <div key={i}>
                        <p className="font-medium text-neutral-700 mb-2">
                          {field.label}
                        </p>
                        <pre className="text-sm text-neutral-600 whitespace-pre-wrap p-4 bg-white rounded-lg border border-neutral-200 font-sans">
                          {field.defaultValue}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
            {!feedbackRevealed ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Button
                  size="3"
                  color="violet"
                  onClick={() => setFeedbackRevealed(true)}
                  className="flex items-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  피드백 받기
                </Button>
                <p className="text-sm text-neutral-500 mt-4">
                  버튼을 누르면 AI 피드백과 리워드를 확인할 수 있어요
                </p>
              </div>
            ) : (
              <>
                <div className="p-6 bg-violet-50 rounded-xl border-2 border-violet-200">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-violet-600" />
                    AI 피드백
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {currentTask.feedbackContent}
                  </p>
                </div>
                {currentTask.rewards && currentTask.rewards.length > 0 && (
                  <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                    <h3 className="font-bold mb-3">🏅 리워드</h3>
                    <ul className="space-y-2">
                      {currentTask.rewards.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-neutral-700"
                        >
                          <span className="font-bold text-amber-600">
                            +{r.xp} XP
                          </span>
                          <span>{r.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </article>

      {/* 하단 네비게이션 */}
      <div className="flex items-center justify-between mt-8 gap-4">
        <Button
          size="3"
          variant="soft"
          color="gray"
          disabled={isFirst}
          onClick={() =>
            !isFirst && navigate(`/course/${course.id}/task/${stepIndex - 1}`)
          }
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          이전
        </Button>

        {currentTask.type === "submit" ? (
          <Button
            size="3"
            color="violet"
            onClick={() =>
              navigate(`/course/${course.id}/task/${stepIndex + 1}`)
            }
          >
            제출하기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : isLast ? (
          <Button
            size="3"
            color="violet"
            onClick={() => navigate(`/course/${course.id}/2`)}
          >
            완료하고 돌아가기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            size="3"
            color="violet"
            onClick={() =>
              navigate(`/course/${course.id}/task/${stepIndex + 1}`)
            }
          >
            다음
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

function SubmitForm({
  formFields,
  onSubmit,
}: {
  formFields: { label: string; defaultValue: string }[];
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-6">
      {formFields.map((field, i) => (
        <div key={i}>
          <label className="block font-medium text-neutral-700 mb-2">
            {field.label}
          </label>
          <textarea
            defaultValue={field.defaultValue}
            rows={8}
            className="w-full p-4 border-2 border-neutral-200 rounded-xl resize-y focus:border-violet-400 focus:outline-none text-neutral-700"
            placeholder="내용을 입력하세요"
          />
        </div>
      ))}
      <Button size="3" className="w-full" color="violet" onClick={onSubmit}>
        <Send className="w-4 h-4 mr-2" />
        제출하기
      </Button>
    </div>
  );
}
