# Bugs

This file tracks known bugs and unexpected behavior in TipTap.

## 1. 20% tip calculates incorrectly

- **Status:** Resolved
- **Date added:** 2026-09-01
- **Date resolved:** 2026-09-02
- **Description:** Selecting the 20% tip option currently uses 0.02 instead of 0.20 in the calculation. For example, a $50 bill with 20% selected gives a $1 tip and $51 total, instead of the correct $10 tip and $60 total. The 15% and 18% options calculate correctly.
- **Cause:** The `TIP_RATES` lookup in `App.tsx` had `20: 0.02` instead of `20: 0.20`, so the 20% option was undercalculating the tip by a factor of 10.
- **Fix:** Corrected the value to `20: 0.20` in `App.tsx`.
