// App: top-level screen router (home / quiz / practice) and the glue between
// persistent progress and live quiz sessions.

import { useState, useCallback } from "react";
import HomePage from "./pages/HomePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { useProgress } from "./hooks/useProgress.js";
import "leaflet/dist/leaflet.css";
import "./styles/global.css";
import "./styles/app.css";

export default function App() {
  const progress = useProgress();
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("normal");
  const [sessionKey, setSessionKey] = useState(0);

  const startQuiz = useCallback(() => {
    setMode("normal");
    setSessionKey((k) => k + 1);
    setScreen("quiz");
  }, []);

  const startPractice = useCallback(() => {
    setMode("practice");
    setSessionKey((k) => k + 1);
    setScreen("quiz");
  }, []);

  const goHome = useCallback(() => setScreen("home"), []);

  const handleComplete = useCallback(
    (finalScore) => {
      progress.recordQuizScore(finalScore);
    },
    [progress]
  );

  return (
    <div className="app-shell">
      <ErrorBoundary onReset={goHome}>
        {screen === "home" && (
          <HomePage
            progress={progress}
            onStart={startQuiz}
            onPracticeMistakes={startPractice}
          />
        )}

        {screen === "quiz" && (
          <QuizPage
            key={sessionKey}
            stats={progress.streetStats}
            bestScore={progress.global.bestScore}
            mode={mode}
            restrictTo={mode === "practice" ? progress.mistakeStreetIds : null}
            onAnswer={progress.recordAnswer}
            onComplete={handleComplete}
            onExit={goHome}
            onPlayAgain={startQuiz}
            onPracticeMistakes={startPractice}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}
