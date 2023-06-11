import { createSignal, createEffect, onMount, Show } from "solid-js";

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal(
    localStorage.getItem("theme") ?? "light"
  );
  const [mounted, setMounted] = createSignal(false);

  const handleClick = () => {
    setTheme(theme() === "light" ? "dark" : "light");
  };

  createEffect(() => {
    if (theme() === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme());
  });

  onMount(() => {
    setMounted(true);
  });

  return (
    <Show when={mounted()}>
      <button onClick={handleClick}>{theme() === "light" ? "🌙" : "🌞"}</button>
    </Show>
  );
}
