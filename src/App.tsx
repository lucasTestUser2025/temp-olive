import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LearningHeader } from "./components/LearningHeader";
import { WeeklyTimer } from "./components/WeeklyTimer";
import { UpcomingContent } from "./components/UpcomingContent";
import { Theme } from "@radix-ui/themes";
import { RecommendCourse } from "./components/RecommendCourse";
import { RecommendCourseEnhanced } from "./components/RecommendCourseEnhanced";
import { RecommendLearningPath } from "./components/RecommendLearningPath";

import { WeeklyCourseCatalog } from "./components/WeeklyCourseCatalog";
import { TimedCourseHub } from "./components/TimedCourseHub";

// 메인 홈 페이지 컴포넌트
function CoursePage() {
  return (
    <>
      <WeeklyTimer />
      <UpcomingContent />
    </>
  );
}

// About 페이지 예시
function HomePage() {
  return (
    <>
      <TimedCourseHub />
      <RecommendCourse />
      <RecommendCourseEnhanced />
      <RecommendLearningPath />
      <WeeklyCourseCatalog />
    </>
  );
}

export default function App() {
  return (
    <Theme appearance="light">
      <BrowserRouter>
        <div className="min-h-screen bg-neutral-50">
          <LearningHeader />
          <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/course" element={<CoursePage />} />
              {/* 여기에 더 많은 라우트를 추가할 수 있습니다 */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Theme>
  );
}
