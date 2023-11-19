import { createSignal, createEffect, onMount, Show } from "solid-js";

export const prerender = false;

// themeCookie is the cookie Value
export default function ThemeToggle({ themeCookie }: { themeCookie?: string }) {

  const initialTheme = import.meta.env.SSR ? (themeCookie ?? 'light') : (localStorage.getItem("theme") ?? "light");

  const [theme, setTheme] = createSignal(
    initialTheme
  );

  const [mounted, setMounted] = createSignal(false);

  const handleClick = () => {
    const nextTheme = theme() === "light" ? "dark" : "light"
    setTheme(nextTheme);
    document.cookie = `theme=${nextTheme}; path=/`;
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
    <Show
      when={mounted()}
      fallback={
        <button onClick={handleClick}>
          {themeCookie === "dark" ? "🌞" : "🌙"  }
        </button>
      }
    >
      <button onClick={handleClick}>{theme() === "light" ? "🌙" : "🌞"}</button>
    </Show>
  );
}
