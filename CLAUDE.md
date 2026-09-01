# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TipTap — a simple tip calculator built with Expo (React Native + TypeScript). Built for a class presentation, so the code in `App.tsx` is intentionally kept beginner-friendly and easy to explain.

## Commands

- `npx expo start` — start the dev server; scan the QR code with Expo Go (iOS/Android) to run the app
- `npx expo start --ios` / `npx expo start --android` — start and target a specific platform/simulator
- `npx tsc --noEmit` — type-check the project (there is no separate lint or test setup)
- `npx expo-doctor` — check the Expo project/SDK health
- `npx expo install --fix` — realign dependency versions to the installed Expo SDK after any manual version edits

## Architecture

This is a single-screen Expo managed-workflow app with no navigation, backend, or state management library beyond React's `useState`.

- `index.ts` — entry point; registers `App` as the root component via `registerRootComponent`
- `App.tsx` — the entire app: UI and tip-calculation logic in one file
- `app.json` — Expo config (app name/slug, icons, platform settings)

The Expo SDK version is pinned deliberately (currently SDK 54) to stay compatible with the published Expo Go app on the App Store — do not bump `expo` to `latest` without checking Expo Go compatibility first, since newer SDKs are often ahead of what the App Store build of Expo Go supports.

## Project tracking files

- `bugs.md` — known bugs and unexpected behavior
- `features.md` — planned feature ideas (not yet implemented)
- `changelog.md` — completed changes and implemented features

### Stale entry reminders

Whenever working on this project, check `bugs.md` and `features.md` for entries with a "Date added" older than 30 days from today that are still marked unresolved/unimplemented (e.g. status "Open" or "Not started"). If any are found, mention them to the user as a reminder before starting new work.
