"use client";
import React, { createContext, useContext, useState } from "react";
import Stars from "../Backgrounds/Stars";

// Define the shape of a theme
interface Theme {
  background: string;
  text?: string;
  button?: string;
  containerBg?: string;
  containerBorder?: string;
}

// All available themes
const themes = {
  default: {
    background: "#0f172a",
    text: "#f8fafc",
  },
  light: {
    background: "#f8fafc",
    text: "#1e293b",
  },
  neon: {
    background: "#0f0f0f",
    text: "#00ff00",
    button: "#ff8c00",
    containerBg: "rgba(255, 255, 255, 0.1)",
    containerBorder: "1px solid rgba(255, 255, 255, 0.2)",
  },
  stars: {
    background: "transparent",
    text: "#f8fafc",
    containerBg: "rgba(15, 23, 42, 0.05)", // dark semi-transparent
    containerBorder: "1px solid rgba(255, 255, 255, 0.1)",
  },
};

// Context value type
interface ThemeContextType {
  theme: Theme;
  setTheme: (name: keyof typeof themes) => void;
}

// Create context with proper default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.default,
  setTheme: () => {},
});

// Provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<keyof typeof themes>("default");

  const setTheme = (name: keyof typeof themes) => {
    setThemeName(name);
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {themeName === "stars" && <Stars />}
      <div
        style={{
          background: theme.background,
          color: theme.text,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing the context
export const useTheme = () => useContext(ThemeContext);
