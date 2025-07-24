'use client';
import React from 'react';
import { useTheme } from '../Context/ThemeContext';

const themes = {
  default: { background: "#0f172a", text: "#f8fafc" },
  light: { background: "#f8fafc", text: "#1e293b" },
  neon: { background: "#0f0f0f7d", text: "#39ff14" },
  stars: { background: "transparent", text: "#f8fafc" },
};

const ThemeSelector = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-2 mt-4">
      {Object.keys(themes).map((themeName) => (
        <button
          key={themeName}
          onClick={() => setTheme(themeName as keyof typeof themes)}
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: themes[themeName as keyof typeof themes].background, border: '1px solid #fff' }}
        >
          {themeName}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
