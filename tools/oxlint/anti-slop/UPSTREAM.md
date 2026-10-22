# Upstream provenance

- Source repository: <https://github.com/dmmulroy/anti-slop>
- Source commit: `13909c9e07590f5a85d93c62712259fe14a883f7` (verified against `main` on 2026-10-22).
- Installed generic plugin entry point: `tools/oxlint/anti-slop/index.ts`.
- Bundled but not enabled: `tools/oxlint/anti-slop/effect/index.ts` (the project does not declare `effect` directly).
- The files provided by the install skill match the upstream `src/` files byte-for-byte at this commit. The bundle omits upstream rule test files; no runtime source changes were made.
- `vendor/eslint-stylistic/` retains its own upstream and license record.
