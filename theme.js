const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const savedTheme = localStorage.getItem("pryon-theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const initialTheme =
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : systemPrefersDark
      ? "dark"
      : "light";

function setTheme(theme) {
  document.documentElement.setAttribute(
    "data-theme",
    theme
  );
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    theme === "dark"
      ? "Prepnúť na svetlý režim"
      : "Prepnúť na tmavý režim"
  );

  themeToggle.setAttribute(
    "aria-pressed",
    String(theme === "dark")
  );
}

setTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  const newTheme =
    currentTheme === "dark" ? "light" : "dark";

  setTheme(newTheme);

  localStorage.setItem("pryon-theme", newTheme);
});

