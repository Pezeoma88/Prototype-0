# Changelog

This file tracks completed changes and implemented features for TipTap.

## 2026-09-02

- Fixed the 20% tip calculation bug: the `TIP_RATES` lookup used `0.02` instead of `0.20`, causing selecting 20% to massively undercalculate the tip. Corrected to `0.20`.

## 2026-09-01

- Built the initial TipTap app (renamed from the "Hello World" starter).
- Added bill amount input with a `$` prefix.
- Added selectable tip options: 15%, 18%, and 20%, with the selected option visually highlighted.
- Added a "Calculate Tip" button.
- Added a results section showing Bill Amount, Tip Amount, and Total.
- Added a Reset button that clears the input, selected tip, and results.
- Added basic handling for empty or invalid bill amounts so the app shows a message instead of crashing.
