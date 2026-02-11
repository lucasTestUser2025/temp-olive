import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  Play,
  ChevronRight,
} from "lucide-react";
import { Badge, Button, Progress } from "@radix-ui/themes";
import { getCourseById } from "../../data/courseContent";

export function CourseContentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : undefined;

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-neutral-600">콘텐츠를 찾을 수 없어요</p>
        <Button onClick={() => navigate("/course")}>목록으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <Link to="/course/ai-email-summary/2">
        <Button color="violet">Ver.1</Button>
      </Link>

      {/* 히어로 섹션 - 배경 이미지 + 그라데이션 */}
      <div className="relative rounded-2xl overflow-hidden min-h-[320px] mb-8">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-black/40 via-black/60 to-black/90"
          aria-hidden
        />

        <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-end min-h-[320px]">
          <Badge
            variant="soft"
            color={course.topicColor}
            size="2"
            className="w-fit mb-3"
          >
            {course.topic}
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            {course.title}
          </h1>
          <p className="text-lg text-white/90 mb-6">{course.subtitle}</p>

          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {course.unlockDate} 오픈
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {course.stats.enrolled}명 참여
            </span>
          </div>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 상세 설명 */}
          <section>
            <h2 className="text-xl font-bold mb-4">이번 주 배우는 내용</h2>
            <p className="text-neutral-600 leading-relaxed">
              {course.longDescription}
            </p>
          </section>

          {/* 학습 단계 */}
          <section>
            <h2 className="text-xl font-bold mb-4">학습 단계</h2>
            <ul className="space-y-3">
              {course.tasks.map((task, i) => (
                <Link
                  key={i}
                  to={`/course/${course.id}/task/${i + 1}`}
                  className="block"
                >
                  <li className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-violet-300 hover:bg-violet-50/50 transition-colors cursor-pointer">
                    <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 font-bold text-sm flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-medium">{task.title}</span>
                    <span className="text-neutral-400 text-sm">
                      +{task.xp} XP
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-400 ml-auto shrink-0" />
                  </li>
                </Link>
              ))}
            </ul>
          </section>

          {/* 배울 내용 */}
          <section>
            <h2 className="text-xl font-bold mb-4">이런 걸 배워요</h2>
            <div className="flex flex-wrap gap-2">
              {course.whatYouLearn.map((item, i) => (
                <Badge key={i} size="2" variant="soft" color="violet">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {item}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* 진행률 */}
            <div className="p-6 rounded-2xl border-2 border-neutral-200 bg-white">
              <h3 className="font-bold mb-4">이번 주 진행률</h3>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-neutral-600">완료</span>
                <span className="font-bold">0/3</span>
              </div>
              <Progress value={0} className="mb-6" />

              <Button
                size="3"
                className="w-full"
                color="violet"
                onClick={() => navigate(`/course/${course.id}/task/1`)}
              >
                <Play className="w-4 h-4 mr-2" />
                학습 시작하기
              </Button>
            </div>

            {/* 통계 */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
              <h3 className="font-bold mb-4">참여 현황</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">참여자</span>
                  <span className="font-semibold">
                    {course.stats.enrolled}명
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">완료</span>
                  <span className="font-semibold text-green-600">
                    {course.stats.completed}명
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">진행 중</span>
                  <span className="font-semibold text-violet-600">
                    {course.stats.activeNow}명
                  </span>
                </div>
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} size="2">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
