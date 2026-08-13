// IMPORTANTE: Sem "use client". Este componente deve ser um Server Component.
export function ThemeInitializer() {
  const themeScript = `
    (function() {
      try {
        var root = document.documentElement;
        var savedTheme = localStorage.getItem("theme");
        var systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

        if (currentTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        root.style.colorScheme = currentTheme;
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}