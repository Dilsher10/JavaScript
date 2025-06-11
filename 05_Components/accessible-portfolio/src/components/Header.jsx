export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header" role="banner">
      <div className="header-container">
        <h1 className="site-title">My Accessible Portfolio</h1>
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="theme-toggle"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </header>
  );
}
