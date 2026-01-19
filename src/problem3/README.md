## Issues Found in the Original Code

- Incorrect variable usage (`lhsPriority` is undefined).
- Inefficient repeated calls to `getPriority` inside `filter` and `sort`.
- Incorrect `useMemo` dependencies (included `prices` without usage).
- Unsafe TypeScript usage (`any`, incorrect type assertions).
- Dead code (`formattedBalances` created but never used).
- Using array index as React key.
- Incomplete `sort` comparator (no equality handling).
- Missing defensive checks for missing price data.
- Heavy logic executed during render phase.

---

## What I Changed / Improved

- Refactored data processing into a single memoized pipeline (`map → filter → sort`).
- Cached derived values (`priority`, `formatted`, `usdValue`) to avoid repeated computation.
- Fixed TypeScript types and removed unsafe `any` usage.
- Replaced index-based keys with stable composite keys.
- Added defensive handling for missing prices.
- Simplified render logic by keeping components purely presentational.
- Organized code into clear, maintainable modules (`constants`, `utils`, `types`, hooks).

