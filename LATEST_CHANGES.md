# Latest Updates — User Requested Changes

## ✅ 1. Removed Hero Image (index.html)

**What Changed:**
- Removed the hero panel photo from the homepage
- Changed grid layout from 2-column (1fr 44%) to single column (1fr)
- Content now takes full width

**Files Modified:**
- `index.html` — Hero grid layout, hidden hero-panel

**Visual Impact:**
- Homepage is now full-width with just the text content
- More breathing room for headline and CTA
- Faster page load (no hero image)

---

## ✅ 2. Fixed Custom Cursor (index.html)

**What Changed:**
- Added `display: block/none` toggling for cursor elements
- Cursor now always visible when mouse is over the page
- Cursor disappears cleanly when mouse leaves the page
- Improved theme color caching for cursor ring

**Technical Details:**
- Cursor dot (#cur) and ring (#cur-ring) are now explicitly shown/hidden
- Added `mouseleave`/`mouseenter` event listeners to manage visibility
- Fixed accent color caching to update on theme change
- Cursor no longer flickers or disappears unexpectedly

**Files Modified:**
- `index.html` — JavaScript cursor tracking logic

**Impact:**
- Smooth, consistent cursor behavior
- No more disappearing/flickering
- Ring properly expands on hover over interactive elements

---

## ✅ 3. Simplified Case Study Indicators (style-case.css + all case study files)

**What Changed:**
- **Removed**: Inline horizontal section strip (numbered tabs at top)
- **Kept**: Left-side section dots as the only indicator
- **Repositioned**: Dots moved inside the margin (not at screen edge)
- **Cleaner**: Single navigation pattern reduces visual clutter

**Details:**
- Section dots now positioned with `left: clamp(24px, 3vw, 48px)` (inside margin)
- Moved breakpoint from 1100px to 1200px for larger screens
- Removed all `.cs-strip` styling (~20 lines of CSS)
- Removed strip animation and reduced motion rules
- Removed `<div class="cs-strip">` markup from all case study files

**Files Modified:**
- `style-case.css` — Removed strip CSS, repositioned dots
- `usbank.html` — Removed inline strip navigation
- `verizon.html` — Removed inline strip navigation
- `lpl.html` — Removed inline strip navigation
- `citi.html` — Removed inline strip navigation

**Visual Impact:**
- Cleaner, less cluttered case study pages
- Single source of navigation (left-side dots)
- Dots positioned thoughtfully inside the margin, not at screen edge
- Reduced distraction from content
- Better mobile experience (dots hide at 1200px breakpoint)

---

## Summary

| Feature | Before | After |
|---|---|---|
| **Hero Image** | Full-width with photo | Hidden, content full-width |
| **Cursor** | Flickering/disappearing | Smooth, always visible |
| **Case Study Nav** | 2 indicator types (strip + dots) | 1 type (dots only) |
| **Case Study Dots** | Far left edge (24px) | Inside margin (clamp) |
| **CSS Size** | Larger (strip rules) | Smaller (~20 lines removed) |

All changes are backward-compatible and visually cohesive. The portfolio now has a cleaner, more focused presentation.
