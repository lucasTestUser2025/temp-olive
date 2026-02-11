import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LearningHeader } from "./components/LearningHeader";
import { WeeklyTimer } from "./components/CourseContentPage/WeeklyTimer";
import { UpcomingContent } from "./components/CourseContentPage/UpcomingContent";
import { Theme } from "@radix-ui/themes";
import { RecommendCourse } from "./components/RecommendCourse";
import { RecommendCourseEnhanced } from "./components/RecommendCourseEnhanced";
import { RecommendLearningPath } from "./components/RecommendLearningPath";
import { WeeklyCourseCatalog } from "./components/WeeklyCourseCatalog";
import { TimedCourseHub } from "./components/TimedCourseHub";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { CourseContentPage } from "./components/CourseContentPage/CourseContentPage";
import { TaskContentPage } from "./components/TaskContentPage/TaskContentPage";

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

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === "/onboarding";

  return (
    <div className="min-h-screen bg-neutral-50">
      {!hideHeader && <LearningHeader />}
      <main className={hideHeader ? "" : "max-w-7xl mx-auto px-6 lg:px-8 py-8"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/course/:id/task/:step"
            element={<TaskContentPage key={location.pathname} />}
          />
          <Route path="/course/:id/1" element={<CourseContentPage />} />
          <Route path="/course/:id/2" element={<CoursePage />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Theme appearance="light">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Theme>
  );
}
