# Portfolio Website

Personal portfolio site for Gautam Nair, deployed at https://g23.dev

## Tech Stack

- **Framework**: React 19 with Vite 7
- **Styling**: Tailwind CSS 4
- **Animation**: Motion (Framer Motion), GSAP, Anime.js, tsParticles
- **Routing**: React Router DOM 7
- **Icons**: Lucide React, React Icons
- **External Services**: EmailJS (contact form), Vercel Analytics, Calendly

## Development Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── assets/           # Images, SVGs
├── components/
│   ├── ui/           # Reusable UI components (3d-card, vanish-input)
│   ├── Navbar.jsx    # Navigation with theme toggle
│   ├── Hero.jsx      # Landing section
│   ├── AboutMe.jsx   # Profile section
│   ├── Experience.jsx # Work history timeline
│   ├── Projects.jsx  # Project showcase grid
│   ├── Skills.jsx    # Skills tags
│   ├── Contact.jsx   # Contact form with EmailJS
│   ├── Library.jsx   # Resource/article links
│   ├── SnakeGame.jsx # Easter egg (3 clicks on logo)
│   └── SplashLoader.jsx
├── App.jsx           # Main app, theme context, particle config
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Key Patterns

### Theme System
- Context API at App.jsx level (`ThemeContext`)
- Persisted to localStorage
- Dark/light mode affects all components and particle background
- Access via `useContext(ThemeContext)` → `{ darkMode, setDarkMode }`

### Animation Conventions
- Use `motion` from "motion/react" for component animations
- Prefer `whileInView` with `viewport={{ once: true }}` for scroll-triggered animations
- Staggered children animations via `staggerChildren` in parent variants
- Spring physics for natural motion: `type: "spring", stiffness: X, damping: Y`

### Styling Conventions
- Tailwind CSS utility classes
- Color palette: `#b8f2e6` (accent cyan), `#aed9e0` (secondary), `#5e6472` (muted), `#1c1c1c` (dark bg)
- Dark mode: conditional classes based on `darkMode` state
- Glass-morphism: `backdrop-blur` + semi-transparent backgrounds

### Form Security (Contact.jsx)
- Input sanitization against XSS (strips HTML tags)
- Character limits: 100 for name/email, 1000 for message
- Email validation with regex

## Environment Variables

Required in `.env.local` (VITE_ prefix for client access):
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_MY_EMAIL`

## Testing

No test framework currently configured. When adding tests:
- Consider Vitest (integrates with Vite)
- Component tests for form validation logic
- Snapshot tests for UI components

## Deployment

- Hosted on Vercel
- Config in `vercel.json` (SPA routing rewrites)
- Analytics via `@vercel/analytics`

## Notes

- No TypeScript - pure JSX
- Easter egg: Click logo 3 times to trigger SnakeGame
- Mobile-responsive with hamburger menu
- Particle background adjusts to theme and has interactive hover effects
