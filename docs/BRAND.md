# The Study Hive — Brand Guide

This document defines the visual and verbal identity for the Study Hive website. Any new component, page, or content edit should follow these rules. If something isn't covered here, mirror the patterns of existing components.

## 1. Brand essence

The Study Hive is a network of post-graduate and medical-student tutors led by Bee. The brand is warm, confident, and grounded — the opposite of corporate ed-tech polish. It speaks to parents and students, not to recruiters or investors.

- **Personality:** warm, encouraging, knowledgeable, calm
- **Voice:** direct, plain English, never salesy, never preachy
- **Audience:** parents (primary), students aged 11–18 (secondary)

## 2. Logo

The logo is a black-outline bee reading a book, framed by the words "THE STUDY HIVE" in an arc above and below. It always appears in full colour on light backgrounds.

- Primary location: top-left of the header (on all pages **except** the home page — the home page hero shows the larger version, so the header logo is omitted there to avoid duplication)
- Minimum width: 80px
- Always preserve clear space equal to half the logo's height on all sides

## 3. Colour palette

Warm honey / cocoa palette. All UI uses these tokens — no off-palette colours.

| Token | Hex | Usage |
|---|---|---|
| `honey-50` | `#FEF8E7` | Lightest backgrounds, hover states |
| `honey-100` | `#FDEFC2` | Card backgrounds, subtle fills |
| `honey-200` | `#F9E197` | Section dividers |
| `honey-300` | `#F5D7A1` | **Main page background** |
| `honey-400` | `#F0C46D` | Accent fills |
| `honey-500` | `#E8A93C` | **Primary button fill** |
| `honey-600` | `#C8861E` | Primary button hover |
| `cocoa-700` | `#5C3A1F` | Secondary text, button borders |
| `cocoa-800` | `#3D2614` | Headings on light backgrounds |
| `cocoa-900` | `#2D1F0F` | **Body text** |
| `cream` | `#FFFAF0` | Testimonial cards, contrast sections |

All colour tokens are declared in `app/globals.css` under the `@theme` directive. Use as Tailwind classes: `bg-honey-300`, `text-cocoa-900`, etc. These values are an initial approximation of the WordPress design — once Bee's logo file arrives, we will eyedropper the canonical bee yellow and adjust.

## 4. Typography

Two fonts, both via `next/font/google`:

- **Headings:** Fraunces (variable weight, warm modern serif) — class `font-display`
- **Body:** Inter (variable weight, clean sans) — default font

### Type scale

| Use | Class | Size |
|---|---|---|
| Hero heading (H1) | `font-display text-5xl md:text-6xl font-semibold` | 48–60px |
| Section heading (H2) | `font-display text-3xl md:text-4xl font-semibold` | 30–36px |
| Subsection (H3) | `font-display text-xl md:text-2xl font-semibold` | 20–24px |
| Body | `text-base md:text-lg` | 16–18px |
| Small / meta | `text-sm` | 14px |

All subtitles on the site are Title Case (e.g. "How It Works", not "How it works"). See CONTENT.md for exact wording.

## 5. Buttons

Two button styles:

- **Primary** (`bg-honey-500 text-cocoa-900`) — filled honey amber, dark brown text. For main CTAs ("Book Now", "Submit").
- **Secondary** (`border-2 border-cocoa-800 text-cocoa-900`) — outline only, transparent fill. For secondary actions ("View Subjects", "See Full Fees").

Both buttons share:
- Padding: `px-6 py-3`
- Rounded: `rounded-lg`
- Font weight: `font-semibold`
- Hover: primary darkens to `bg-honey-600`, secondary fills with `bg-cocoa-800 text-cream`
- Transitions: 150ms ease

## 6. Layout & spacing

- Max content width: `max-w-6xl` (72rem) centred with `mx-auto`
- Horizontal page padding: `px-6 md:px-8`
- Section vertical padding: `py-16 md:py-24`
- Card padding: `p-6 md:p-8`
- Section dividers: a thin honeycomb SVG separator (`<HoneycombDivider />`) between major sections

## 7. Decorative elements

- **Honeycomb pattern** — used as a subtle background texture in section dividers and behind decorative areas. Defined as a reusable SVG component.
- **Bee illustration** — the hero bee from the logo can be used at large scale in the home hero, as a decorative element. Never use bee imagery as decorative noise — it must always have meaning.

## 8. Voice & content rules

- Plain English. No jargon, no marketing-speak.
- **Avoid:** "empower", "transformative", "holistic", "unlock potential", "leverage", "passionate" (overused), "journey" (overused).
- **Prefer:** specific verbs ("we match", "we recommend", "we explain") and concrete nouns ("exam confidence", "structured lessons").
- Sentence case in body text. Title Case in headings and CTAs.
- Em-dashes ( — ) only where they replace a comma or colon, never as decorative pause.
- "We" refers to the Study Hive collectively. "Bee" refers to the founder by name.

## 9. Forms

- Labels above inputs, never floating
- Required fields marked with `*` next to label
- Submit button is always primary style
- Success message: green text below form, no toast
- Error message: red text below the field
- Validation runs on submit, not on blur

## 10. Accessibility

- All interactive elements keyboard-accessible (tab order natural)
- Focus rings visible: `focus-visible:ring-2 focus-visible:ring-cocoa-800`
- All images have meaningful alt text
- Colour contrast meets WCAG AA at minimum (cocoa-900 on honey-300 passes)
- Flashcards: full card is the button + `aria-expanded` reflects state
