# Plan for Integrating Neon Vibe into Star-Typer's Neon Mode

This plan outlines the steps to integrate the "Neon vibe" styling from `keyboard-game` into `star-typer`'s "Neon mode" while preserving existing styling for other themes.

## 1. Update `star-typer/src/app/Context/ThemeContext.tsx`

-   Modify the `neon` theme object to use the new Tailwind class names for `button`, `containerBg`, and `containerBorder`.
-   Adjust the main `div` in `ThemeProvider` to conditionally apply these classes when the `neon` theme is active.

**Current `neon` theme object (before change):**
```typescript
  neon: {
    background: "#0f0f0f",
    text: "#00ff00",
    button: "#ff8c00",
    containerBg: "rgba(255, 255, 255, 0.1)",
    containerBorder: "1px solid rgba(255, 255, 255, 0.2)",
  },
```

**Proposed `neon` theme object (after change):**
```typescript
  neon: {
    background: "#18122B", // primary-dark from keyboard-game
    text: "#f8fafc", // light text for dark background
    button: "bg-gradient-neon", // Tailwind class for neon button
    containerBg: "bg-glass", // Tailwind class for glass effect background
    containerBorder: "shadow-glass rounded-2xl backdrop-blur-md", // Tailwind classes for glass effect border/shadow
  },
```

**Proposed change to `ThemeProvider`'s main `div`:**
```typescript
      <div
        style={{
          background: theme.background,
          color: theme.text,
          minHeight: "100vh",
        }}
        className={`${theme.containerBg} ${theme.containerBorder}`} // Conditionally apply classes
      >
        {children}
      </div>
```

## 2. Update `star-typer/src/app/globals.css`

-   Add an `@import` statement for `star-typer/src/app/neon-components.css`. This will make the `glass-card` and `neon-btn` Tailwind classes available for use.

**Proposed change to `globals.css`:**
```css
@import "tailwindcss";
@import "./neon-components.css"; // New import

/* ... existing styles ... */
```

## 3. Update `star-typer/src/app/components/ThemeSelector.tsx`

-   Modify the button's `className` to conditionally apply `neon-btn` when the `neon` theme is selected.

**Proposed change to `ThemeSelector.tsx`:**
```typescript
        <button
          key={themeName}
          onClick={() => setTheme(themeName as keyof typeof themes)}
          className={`px-4 py-2 rounded-md text-white ${themeName === 'neon' ? 'neon-btn' : ''}`} // Apply neon-btn conditionally
          style={{
            backgroundColor: themes[themeName as keyof typeof themes].button || themes[themeName as keyof typeof themes].background,
            border: '1px solid #fff',
            color: themes[themeName as keyof typeof themes].text
          }}
        >
          {themeName}
        </button>
```

## 4. Update `star-typer/src/app/components/TestSpace.tsx`

-   Import `useTheme` hook.
-   Modify the main container `div` to conditionally apply `glass-card` when the `neon` theme is selected.

**Proposed change to `TestSpace.tsx`:**
```typescript
import { useTheme } from "../Context/ThemeContext"; // New import

function TestSpace() {
  const { theme } = useTheme(); // Get current theme

  // ... existing state and effects ...

  return (
    <section ref={containerRef} className="flex flex-col w-full" tabIndex={0}>
      {/* ... existing time limit buttons ... */}

      <div
        className={`relative max-w-3xl mx-auto w-full p-6 rounded-lg my-5 min-h-[150px] cursor-text select-none font-mono whitespace-pre-wrap ${
          theme.containerBg === 'bg-glass' ? 'glass-card' : 'bg-gray-800' // Conditionally apply glass-card
        }`}
        tabIndex={0}
        onClick={() => inputRef.current?.focus()}
      >
        {/* ... paragraph rendering and input ... */}
      </div>

      {/* ... existing action buttons ... */}
    </section>
  );
}
```

This detailed plan ensures that the neon styling is only applied when the "neon" theme is explicitly chosen, maintaining the integrity of your other themes.
