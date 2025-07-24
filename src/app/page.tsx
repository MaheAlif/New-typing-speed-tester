"use client";
import TestSpace from "./components/TestSpace";
import ThemeSelector from "./components/ThemeSelector";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";

const PageContent = () => {
  const { theme } = useTheme();

  interface Theme {
    background?: string;
    text?: string;
    button?: string;
    containerBg?: string;
    containerBorder?: string;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <section
        className="flex flex-col w-full max-w-4xl items-center glassmorphism p-4 md:p-8 rounded-lg"
        style={{
          backgroundColor: theme.containerBg,
          border: theme.containerBorder ?? "1px solid #ccc",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // for Safari
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0)",
        }}
      >
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ color: theme.text }}
        >
          *** Star Typer ***
        </h1>
        <p className="mt-2 md:mt-4 text-lg" style={{ color: theme.text }}>
          A typing game to test your skills.
        </p>
        <ThemeSelector />
        <TestSpace />
      </section>
    </main>
  );
};

export default function Home() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
