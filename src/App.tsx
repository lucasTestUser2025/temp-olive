import { LearningHeader } from "./components/LearningHeader";
import { WeeklyTimer } from "./components/WeeklyTimer";

import { UpcomingContent } from "./components/UpcomingContent";

import { Theme } from "@radix-ui/themes";

export default function App() {
  return (
    <Theme appearance="light">
      <div className="min-h-screen bg-neutral-50">
        <LearningHeader />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <WeeklyTimer />

          <UpcomingContent />
        </main>
      </div>
    </Theme>
  );
}
