# frostor-xyz

Landing page for the [frostor.xyz](https://frostor.xyz) [ar.io](https://ar.io)
gateway, operated by [Memetic Block](https://memeticblock.com).

It's a single static page: a logo, a splash animation, and live gateway
**Status** and **Release**, which it reads at runtime from the gateway's own
`/ar-io/info` endpoint. There is no framework and no server — the build emits
plain HTML/CSS/JS that can be served from anywhere (including Arweave).

## Stack

- [Vite](https://vite.dev/) — static build + dev server
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [htmx](https://htmx.org/)

The only runtime dependency is `htmx.org`; everything else is build tooling.
This is a deliberate rebuild from an earlier Vue + `vite-ssg` + `@ar.io/sdk`
version that carried a large, vulnerable dependency tree (26 audit findings,
including a critical). Dropping the framework and the on-page stake query — the
one feature that required `@ar.io/sdk` and a Node `crypto` polyfill — took the
shipped bundle to ~19 kB gzipped (essentially just htmx) and the audit to a
single build-time-only finding.

## Prerequisites

[Bun](https://bun.sh/) (the repo is locked with `bun.lock`).

## Develop

```bash
bun install

# serve with hot reload at http://localhost:5173
bun run dev

# type-check + static production build into dist/
bun run build

# preview the production build locally
bun run preview
```

## Project structure

```
index.html            # the page — static markup with Tailwind classes
src/
  main.ts             # entry: imports htmx + styles, fetches /ar-io/info
  style.css           # Tailwind import, Berkeley Mono @font-face, theme
public/               # static assets (favicon, fonts, splash gif) — copied as-is
vite.config.ts
tsconfig.json
operations/
  scripts/deploy.ts   # Arweave deploy script (see Deployment, below)
  *.hcl               # Nomad job spec
```

## How the live data works

[src/main.ts](src/main.ts) does a single `fetch` to
`https://frostor.xyz/ar-io/info` on load:

- success → **Status: Online** and the reported **Release**
- non-OK response or network error → **Status: Offline**

The "Stake your $ARIO" item is a plain link to the ar.io gateway registry — it
makes no on-chain query.

## Deployment

Two paths, both building `dist/` first (`bun run build`):

- **Arweave** — `bun run deploy:arweave` runs
  [operations/scripts/deploy.ts](operations/scripts/deploy.ts), which uploads
  `dist/` via Turbo and points the ANT undername at the new manifest. It reads
  `PRIVATE_KEY_BASE64` (required), `PROCESS_ID`, `PHASE`/`UNDERNAME`, `GATEWAY`,
  and `BUNDLER` from the environment.

  > **Note:** this script's deploy dependencies (`@ardrive/turbo-sdk`,
  > `arweave`, `@ar.io/sdk`) were removed from `package.json` during the rebuild
  > and the script is kept for reference. Re-add them before running it.

- **Static host** — `bun run deploy:static` publishes via
  `wrangler pages deploy` (expects `PROJECT_NAME`; the path is set for the
  container build).

## License

AGPL-3.0-only
