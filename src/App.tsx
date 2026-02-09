import { LearningHeader } from "./components/LearningHeader";
import { WeeklyTimer } from "./components/WeeklyTimer";
import { WeeklyGoals } from "./components/WeeklyGoals";
import { UpcomingContent } from "./components/UpcomingContent";
import { TopicSection } from "./components/TopicSection";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <LearningHeader />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <WeeklyTimer />
        <WeeklyGoals />
        <UpcomingContent />
        <TopicSection />
      </main>
    </div>
  );
}
