# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` holds route entrypoints (Astro, MDX, React islands). Keep page-level logic minimal and delegate to components.
- `src/content/` stores markdown collections; blog entries live under `src/content/blog/` with MDX frontmatter for `title`, `pubDate`, `description`.
- `src/components/` and `src/layouts/` contain reusable UI; prefer PascalCase filenames (`ArticleCard.astro`). Shared utilities belong in `src/lib/`.
- `src/assets/` and `public/` serve images, fonts, and other static files. Use `src/assets/` for pipeline-processed media, `public/` for passthrough files.
- `plugins/` houses custom Astro integrations; document new hooks inline.

## Build, Test, and Development Commands
- `pnpm install` — bootstrap dependencies after cloning or pulling new integrations.
- `pnpm dev` — start the Astro dev server with hot reload at `http://localhost:4321`.
- `pnpm build` — generate the production bundle (runs type-safe Astro compile).
- `pnpm preview` — serve the built output locally to validate deployment artifacts.
- `pnpm typecheck` — run `astro check` for TypeScript and schema issues.
- `pnpm prettier` — format the repo using Prettier + `prettier-plugin-astro`.

## Coding Style & Naming Conventions
- Follow Prettier defaults (2-space indent, single quotes in templates) and let Tailwind utility order come from the official plugin.
- Components and layouts use PascalCase; helper modules in `src/lib/` use camelCase filenames. CSS modules and global styles use kebab-case.
- Prefer TypeScript in components; annotate props and exported functions. Keep MDX frontmatter keys lowercase with hyphenated names (`hero-image`).

## Testing Guidelines
- No dedicated unit-test harness exists yet; treat `pnpm build` and `pnpm typecheck` as the minimum gate before pushing.
- Manually inspect generated pages via `pnpm preview` when touching routing, content collections, or Astro integrations.
- Add regression checks with Playwright or Vitest under `src/lib/__tests__/` if new features warrant automation; document setup in PR descriptions.

## Commit & Pull Request Guidelines
- Match the existing short, imperative commit style (`fix theme`, `style: remove tailwind/topology`). Optional prefixes (`feat:`, `chore:`) are welcome when scoped.
- Keep PRs focused; describe intent, summarize testing (`pnpm build`, browser checks), and link relevant issues or content cards.
- Include screenshots or GIFs for visual changes and note any required config or content migrations.
