import TestSpace from "./components/TestSpace";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 md:p-8">
      <section className="flex flex-col w-full max-w-4xl border-2 border-gray-700 items-center bg-gray-800 p-4 md:p-8 rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome to Star Typer!</h1>
        <p className="mt-2 md:mt-4 text-lg text-gray-300">A typing game to test your skills.</p>
        <TestSpace />
      </section>
    </main>
  );
}
