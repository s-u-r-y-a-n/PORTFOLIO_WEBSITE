# Fix first-load animation and scrolling lifecycle

## Scope
- Preserve every existing animation style, section layout, theme, cursor, navbar, and interaction.
- Make smooth scrolling and viewport reveals ready together on the first hydrated render.
- Keep the Hero outside the viewport-reveal system and ensure its entrance/typewriter sequence runs once per page load.

## Implementation
- Consolidate scroll/reveal startup into a single client lifecycle so listeners and observers attach once and initial viewport state is evaluated immediately.
- Harden the custom smooth-scroll controller against effect remounts, competing animation frames, stale scroll targets, browser scroll restoration, and anchor-click duplication.
- Remove the extra scroll-based reveal fallback listener by performing an immediate reveal pass and using IntersectionObserver for subsequent entries.
- Separate active-section tracking from reveal state without adding per-frame React updates.
- Make Hero load animation state explicit so hydration or development effect remounts cannot replay CSS entrance animations or restart typing.
- Preserve native touch scrolling and make reduced-motion content immediately visible.

## Verification
- Test a cold page load and browser reload before any interaction.
- Confirm the first wheel input is damped, Hero animation runs once, and reveal observers are active immediately.
- Scroll top-to-bottom and bottom-to-top on desktop and mobile, checking section reveals, fixed navigation, overflow, and console errors.
- Repeat with reduced motion enabled.
