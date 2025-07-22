"use client";
import React from "react";
import paragraphs from "../../../public/paragraph.json";

function TestSpace() {
  interface ParagraphObject {
    paragraphs: string[];
  }

  const singleParagraphs: ParagraphObject = paragraphs;

  // console.log(singleParagraphs.paragraphs[0]);

  return (
    <section className="flex flex-col">
      <div className="flex gap-2 p-10">
        <button className="p-5 border-2 border-cyan-500 rounded-xl">30s</button>
        <button className="p-5 border-2 border-cyan-500 rounded-xl">1min</button>
        <button className="p-5 border-2 border-cyan-500 rounded-xl">2min</button>
        <button className="p-5 border-2 border-cyan-500 rounded-xl">0/1</button>
      </div>
      <p className="text-xl text-white text-left p-5">
        {singleParagraphs.paragraphs[0]}
      </p>
      <div className="flex gap-2 p-10">
        <button className="p-5 border-2 border-cyan-500 rounded-xl">retake</button>
        <button className="p-5 border-2 border-cyan-500 rounded-xl">next</button>
      </div>
    </section>
  );
}

export default TestSpace;
