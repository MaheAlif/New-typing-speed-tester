import Image from "next/image";
import TestSpace from "./components/TestSpace";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24 bg-green-900">
      <section className="flex flex-col  max-w-[800px] border-2 border-red-500 items-center bg-gray-700 p-10">
        <h1 className="text-4xl font-bold">Welcome to Star Typer!</h1>
        <p className="mt-4 text-lg">A typing game to test your skills.</p>
        <TestSpace />
      </section>
    </main>
  );
}
