import { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import './App.css';

const ContactSection = lazy(() => import("./components/ContactSection"));

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={`app-container ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Navigation />

      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <main id="main" className="main-content" role="main">
        <AboutSection />
        <ProjectsSection />

        <Suspense fallback={<div>Loading contact form...</div>}>
          <ContactSection />
        </Suspense>
      </main>

      <footer className="footer" role="contentinfo">
        <p>&copy; 2025 My Accessible Portfolio</p>
      </footer>
    </div>
  );
}
