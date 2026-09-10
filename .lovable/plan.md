# Refine portfolio typography and motion

## Scope
- Reduce the existing hero, section, card, and prominent supporting text sizes without changing fonts, copy, colors, layout, or visual direction.
- Add polished 150–400ms interactions for navigation, buttons, pills, cards, links, icons, and project imagery.
- Add viewport-based reveal motion for existing sections and content groups, including subtle staggering where appropriate.
- Smooth the mobile menu’s open/close and menu-icon transitions while preserving its current behavior.
- Keep all motion disabled or minimized under `prefers-reduced-motion`.

## Technical approach
- Use a small reusable intersection-observer reveal wrapper and active-section tracking within the existing portfolio component.
- Keep the mobile menu mounted during its exit animation and use state-driven CSS classes for visible/hidden states.
- Consolidate motion timing and easing in the existing stylesheet; preserve all current design tokens and visual treatments.
- Validate rendering and interactions at desktop, tablet, and mobile sizes, plus reduced-motion behavior.
