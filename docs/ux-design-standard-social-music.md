# UX Design Standard - Social Music Platform

*Inspired by Synthopic.ai's modern creative aesthetic*

## Overview

This UX design standard defines the visual identity and interaction patterns for Social Music, a platform that helps music producers create social media content automatically. The design draws inspiration from Synthopic.ai's clean, modern aesthetic while adapting it for our music-focused use case.

## Design Philosophy

**Core Principles:**
- **Creative & Professional**: Balance artistic expression with business functionality
- **Music-First**: Every design decision serves the music producer's workflow
- **Effortless Automation**: Complex processes feel simple and intuitive
- **Modern & Bold**: Contemporary design that stands out in the creative space

## Color Palette

### Primary Colors
- **Primary Purple**: `#8B5CF6` (Violet-500)
- **Primary Blue**: `#3B82F6` (Blue-500)
- **Gradient**: Linear gradient from Purple to Blue (`#8B5CF6` → `#3B82F6`)

### Secondary Colors
- **Accent Cyan**: `#06B6D4` (Cyan-500)
- **Accent Pink**: `#EC4899` (Pink-500)
- **Accent Green**: `#10B981` (Emerald-500)

### Neutral Colors
- **Background**: `#FFFFFF` (White)
- **Surface**: `#F8FAFC` (Slate-50)
- **Border**: `#E2E8F0` (Slate-200)
- **Text Primary**: `#0F172A` (Slate-900)
- **Text Secondary**: `#64748B` (Slate-500)
- **Text Muted**: `#94A3B8` (Slate-400)

### Status Colors
- **Success**: `#10B981` (Emerald-500)
- **Warning**: `#F59E0B` (Amber-500)
- **Error**: `#EF4444` (Red-500)
- **Info**: `#3B82F6` (Blue-500)

## Typography

### Font Family
- **Primary**: Inter (Modern, clean sans-serif)
- **Secondary**: SF Pro Display (Apple system font for consistency)
- **Monospace**: JetBrains Mono (for code/technical content)

### Type Scale
```css
/* Headings */
h1: 3rem (48px) - Font Weight: 700 - Line Height: 1.1
h2: 2.25rem (36px) - Font Weight: 600 - Line Height: 1.2
h3: 1.875rem (30px) - Font Weight: 600 - Line Height: 1.3
h4: 1.5rem (24px) - Font Weight: 600 - Line Height: 1.4
h5: 1.25rem (20px) - Font Weight: 500 - Line Height: 1.4
h6: 1.125rem (18px) - Font Weight: 500 - Line Height: 1.4

/* Body Text */
body-large: 1.125rem (18px) - Font Weight: 400 - Line Height: 1.6
body: 1rem (16px) - Font Weight: 400 - Line Height: 1.5
body-small: 0.875rem (14px) - Font Weight: 400 - Line Height: 1.4
caption: 0.75rem (12px) - Font Weight: 400 - Line Height: 1.3
```

## Spacing System

### Base Unit: 4px
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
5xl: 128px
```

### Component Spacing
- **Card Padding**: 24px (lg)
- **Section Spacing**: 64px (3xl)
- **Button Padding**: 12px vertical, 24px horizontal
- **Form Field Spacing**: 16px (md)

## Layout & Grid

### Container Widths
- **Mobile**: 100% width, 16px padding
- **Tablet**: 768px max-width, 24px padding
- **Desktop**: 1200px max-width, 32px padding
- **Large Desktop**: 1400px max-width, 40px padding

### Grid System
- **Mobile**: 1 column
- **Tablet**: 2-3 columns
- **Desktop**: 4-6 columns
- **Gap**: 24px (lg)

## Component Design

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #8B5CF6, #3B82F6)
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 600
font-size: 16px
box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3)
```

#### Secondary Button
```css
background: transparent
color: #8B5CF6
border: 2px solid #8B5CF6
padding: 10px 22px
border-radius: 8px
font-weight: 600
font-size: 16px
```

#### Ghost Button
```css
background: transparent
color: #64748B
padding: 12px 24px
border-radius: 8px
font-weight: 500
font-size: 16px
```

### Cards

#### Standard Card
```css
background: white
border: 1px solid #E2E8F0
border-radius: 12px
padding: 24px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

#### Elevated Card
```css
background: white
border: none
border-radius: 16px
padding: 32px
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12)
```

### Forms

#### Input Fields
```css
background: white
border: 2px solid #E2E8F0
border-radius: 8px
padding: 12px 16px
font-size: 16px
transition: border-color 0.2s ease

/* Focus State */
border-color: #8B5CF6
box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1)
```

#### Labels
```css
color: #0F172A
font-weight: 500
font-size: 14px
margin-bottom: 8px
```

### Navigation

#### Header
- **Height**: 72px
- **Background**: White with subtle border
- **Logo**: Left-aligned, 32px height
- **Navigation**: Center-aligned, 16px font
- **Actions**: Right-aligned (Login/Get Started)

#### Sidebar (Dashboard)
- **Width**: 256px
- **Background**: #F8FAFC
- **Active State**: Purple background with white text
- **Hover State**: Light purple background

## Visual Effects

### Gradients
- **Primary Gradient**: `linear-gradient(135deg, #8B5CF6, #3B82F6)`
- **Subtle Gradient**: `linear-gradient(135deg, #F8FAFC, #F1F5F9)`
- **Accent Gradient**: `linear-gradient(135deg, #06B6D4, #EC4899)`

### Shadows
```css
/* Subtle */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

/* Medium */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)

/* Large */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12)

/* Colored (Purple) */
box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3)
```

### Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px
- **Extra Large**: 16px
- **Pill**: 9999px

## Animation & Transitions

### Timing Functions
- **Ease**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Ease In**: `cubic-bezier(0.4, 0, 1, 1)`
- **Ease Out**: `cubic-bezier(0, 0, 0.2, 1)`

### Durations
- **Fast**: 150ms
- **Normal**: 300ms
- **Slow**: 500ms

### Common Animations
```css
/* Hover Effects */
transition: all 0.2s ease

/* Button Press */
transform: scale(0.98)

/* Loading Spinner */
animation: spin 1s linear infinite

/* Fade In */
animation: fadeIn 0.3s ease
```

## Music-Specific Components

### Track Player Card
```css
background: white
border-radius: 12px
padding: 20px
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
border-left: 4px solid #8B5CF6
```

### SoundCloud Integration Badge
```css
background: #FF5500
color: white
padding: 4px 12px
border-radius: 20px
font-size: 12px
font-weight: 600
```

### Video Generation Status
```css
/* Processing */
background: #FEF3C7
color: #92400E
border: 1px solid #F59E0B

/* Complete */
background: #D1FAE5
color: #065F46
border: 1px solid #10B981

/* Error */
background: #FEE2E2
color: #991B1B
border: 1px solid #EF4444
```

## Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1400px) { }
```

### Mobile Adaptations
- **Navigation**: Hamburger menu
- **Cards**: Full-width, stacked
- **Buttons**: Full-width on mobile
- **Typography**: Slightly smaller on mobile
- **Spacing**: Reduced padding/margins

## Accessibility

### Color Contrast
- **AA Compliance**: Minimum 4.5:1 ratio for normal text
- **AAA Compliance**: Minimum 7:1 ratio for large text
- **Focus Indicators**: 3px solid outline with 2px offset

### Interactive Elements
- **Minimum Touch Target**: 44px × 44px
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Reader**: Proper ARIA labels and roles

## Implementation Notes

### CSS Variables
```css
:root {
  --primary-purple: #8B5CF6;
  --primary-blue: #3B82F6;
  --gradient-primary: linear-gradient(135deg, #8B5CF6, #3B82F6);
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --surface: #F8FAFC;
  --border: #E2E8F0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

### Design System Integration
- **Tailwind CSS**: Use custom color palette
- **Component Library**: Build reusable components
- **Icon System**: Feather Icons or Heroicons
- **Illustrations**: Custom music-themed graphics

## Brand Voice & Tone

### Visual Personality
- **Modern**: Clean lines, contemporary aesthetics
- **Creative**: Bold gradients, artistic elements
- **Professional**: Consistent spacing, readable typography
- **Approachable**: Friendly colors, intuitive interactions

### Content Guidelines
- **Headlines**: Bold, benefit-focused
- **Body Text**: Clear, conversational
- **CTAs**: Action-oriented, encouraging
- **Error Messages**: Helpful, solution-focused

---

*This design standard serves as the foundation for all Social Music platform interfaces. It ensures consistency while allowing for creative expression within the music production workflow.*

## Design System and Component Usage Standard

### Mandate: Mantine-Only Components

- All UI components in product code must use Mantine as the sole component framework.
- Do not import or add alternative UI libraries (e.g., Material UI, Chakra, AntD, Radix primitives directly) in product code.
- Tailwind utility classes may be used for layout and spacing, but not to construct bespoke components that duplicate Mantine components.

### Wrappers and Abstractions

- Create thin wrapper components in `components/ui/` to encapsulate common patterns and project-specific defaults (variants, spacing, motion, analytics hooks).
- Wrapper names should align with Mantine semantics (e.g., `UiButton` wrapping `@mantine/core` `Button`).
- Expose only project-approved props from wrappers to prevent style drift.

### Theming & Tokens

- Centralize theme in a single Mantine theme provider with brand tokens mapped to the Color Palette and Typography defined above.
- Store tokens in a `theme/` module and apply via Mantine theme overrides (colors, radius, shadows, spacing, headings).
- Do not hardcode colors, radii, or shadows in components—use theme references.

### Layout Rules

- Use Mantine layout primitives (`Container`, `Stack`, `Group`, `Grid`, `SimpleGrid`) to implement Layout & Grid guidance.
- Spacing must follow the 4px scale via theme spacing keys.
- Responsive behavior should use Mantine’s responsive props and hooks; avoid custom media queries unless necessary.

### Accessibility

- Prefer Mantine components for accessible defaults. If building custom patterns, maintain WCAG AA minimums defined above and preserve keyboard support and focus outlines.

### Exceptions Policy

- Approved exceptions require an ADR (`docs/architecture/adr-*.md`) with:
  - Rationale for deviation
  - Alternatives considered
  - Sunset/migration plan back to Mantine
- Exceptions must be signed off by UX Designer and Architect.

### Compliance & Governance

- PR Checklist additions:
  - Uses Mantine components or approved wrappers only
  - No new UI library imports
  - Theme tokens used (no hardcoded styles)
  - A11y verified (labels, roles, focus)
- CI (recommended): lint rule to reject imports from disallowed UI packages and detect unapproved component directories.

### Documentation & Examples

- Provide canonical examples in Storybook using Mantine and project wrappers for:
  - Buttons, Inputs, Forms, Cards, Navigation, Tables, Modals, Toasts
  - Music-specific components (Track Player Card, Video Generation Status)
- Stories demonstrate light/dark modes, responsive breakpoints, and a11y states.

### Migration Guidance

- New code follows Mantine-only mandate immediately.
- Legacy components should be migrated opportunistically when touched, or via scheduled refactors prioritized by impact.

### Versioning

- Lock Mantine major version in `package.json`.
- Changes to theme tokens or wrapper APIs require a minor version bump in internal design system notes and a brief changelog entry.
