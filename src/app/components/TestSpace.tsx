"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import paragraphs from "../../../public/paragraph.json";

function TestSpace() {
  interface ParagraphObject {
    paragraphs: string[];
  }

  const singleParagraphs: ParagraphObject = paragraphs;

  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute default
  const [isTestActive, setIsTestActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Changed from HTMLTextAreaElement to HTMLInputElement
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize with a random paragraph
  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * singleParagraphs.paragraphs.length
    );
    setCurrentParagraph(singleParagraphs.paragraphs[randomIndex]);
  }, []);

  // Add keydown listener to start test on any key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !isTestActive &&
        !testCompleted &&
        !["Tab", "Shift", "Control", "Alt", "Meta"].includes(e.key)
      ) {
        startTest();
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isTestActive, testCompleted]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTestActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isTestActive && timeLeft === 0) {
      endTest();
    }
    return () => clearTimeout(timer);
  }, [isTestActive, timeLeft]);

  const startTest = () => {
    if (!isTestActive) {
      setStartTime(Date.now());
      setIsTestActive(true);
      setTestCompleted(false);
      setWpm(0);
      setAccuracy(0);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const endTest = () => {
    if (isTestActive) {
      setEndTime(Date.now());
      setIsTestActive(false);
      setTestCompleted(true);
      calculateResults();
    }
  };

  const resetTest = () => {
    const randomIndex = Math.floor(
      Math.random() * singleParagraphs.paragraphs.length
    );
    setCurrentParagraph(singleParagraphs.paragraphs[randomIndex]);
    setUserInput("");
    setTimeLeft(60);
    setIsTestActive(false);
    setTestCompleted(false);
    setWpm(0);
    setAccuracy(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateResults = () => {
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const words = userInput.trim().split(/\s+/).length;
    const wpmValue = Math.round(words / timeInMinutes);

    let correctChars = 0;
    const minLength = Math.min(userInput.length, currentParagraph.length);
    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === currentParagraph[i]) {
        correctChars++;
      }
    }
    const accuracyValue =
      minLength > 0 ? Math.round((correctChars / minLength) * 100) : 0;

    setWpm(wpmValue);
    setAccuracy(accuracyValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Changed from HTMLTextAreaElement to HTMLInputElement
    const value = e.target.value;
    setUserInput(value);

    if (!isTestActive && value.length > 0) {
      startTest();
    }

    if (value.length >= currentParagraph.length) {
      endTest();
    }
  };

  const setTimeLimit = (seconds: number) => {
    if (!isTestActive) {
      setTimeLeft(seconds);
    }
  };

  return (
    <section ref={containerRef} className="flex flex-col w-full" tabIndex={0}>
      <div className="flex gap-2 p-5 justify-center">
        <button
          className={`p-3 border-2 rounded-xl ${
            timeLeft === 30 ? "bg-cyan-500 text-white" : "border-cyan-500"
          }`}
          onClick={() => setTimeLimit(30)}
          disabled={isTestActive}
        >
          30s
        </button>
        <button
          className={`p-3 border-2 rounded-xl ${
            timeLeft === 60 ? "bg-cyan-500 text-white" : "border-cyan-500"
          }`}
          onClick={() => setTimeLimit(60)}
          disabled={isTestActive}
        >
          1min
        </button>
        <button
          className={`p-3 border-2 rounded-xl ${
            timeLeft === 120 ? "bg-cyan-500 text-white" : "border-cyan-500"
          }`}
          onClick={() => setTimeLimit(120)}
          disabled={isTestActive}
        >
          2min
        </button>
        <div className="p-3 border-2 border-cyan-500 rounded-xl">
          {timeLeft}s
        </div>
      </div>

      {isTestActive && (
        <div className="flex justify-center gap-10 p-3">
          <div className="text-xl text-white p-5 rounded-lg">
            Time: {timeLeft}s
          </div>
          <div className="text-xl text-white p-5 rounded-lg">WPM: {wpm}</div>
          <div className="text-xl text-white p-5 rounded-lg">
            Accuracy: {accuracy}%
          </div>
        </div>
      )}

      {testCompleted && (
        <div className="flex flex-col items-center p-5 bg-gray-800 rounded-lg m-5">
          <h2 className="text-2xl font-bold text-white mb-3">Test Results</h2>
          <div className="flex gap-10">
            <div className="text-xl text-white p-5 rounded-lg">
              WPM: <span className="font-bold">{wpm}</span>
            </div>
            <div className="text-xl text-white p-5 rounded-lg">
              Accuracy: <span className="font-bold">{accuracy}%</span>
            </div>
            <div className="text-xl text-white p-5 rounded-lg">
              Time:{" "}
              <span className="font-bold">
                {Math.round((endTime - startTime) / 1000)}s
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className="relative max-w-3xl mx-auto w-full p-6 bg-gray-800 rounded-lg my-5 min-h-[150px] cursor-text select-none font-mono whitespace-pre-wrap"
        tabIndex={0}
        onClick={() => inputRef.current?.focus()}
      >
        {currentParagraph.split("").map((char, index) => {
          let style = "text-gray-500";
          if (index < userInput.length) {
            style =
              userInput[index] === char ? "text-green-500" : "text-red-500";
          } else if (
            index === userInput.length &&
            isTestActive &&
            !testCompleted
          ) {
            style = "text-white bg-yellow-400 animate-pulse";
          } else if (!isTestActive && !testCompleted) {
            style = "text-gray-500";
          }
          return (
            <span key={index} className={style}>
              {char}
            </span>
          );
        })}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="absolute opacity-0 pointer-events-none h-0 w-0"
          tabIndex={-1}
          autoFocus
          disabled={testCompleted}
        />
      </div>

      <div className="flex gap-2 p-5 justify-center">
        <button
          className="p-3 border-2 border-cyan-500 rounded-xl text-white hover:bg-cyan-500 transition-colors"
          onClick={resetTest}
        >
          Retake
        </button>
        <button
          className="p-3 border-2 border-cyan-500 rounded-xl text-white hover:bg-cyan-500 transition-colors"
          onClick={resetTest}
        >
          Next
        </button>
        {isTestActive && (
          <button
            className="p-3 border-2 border-red-500 rounded-xl text-white hover:bg-red-500 transition-colors"
            onClick={endTest}
          >
            End Test
          </button>
        )}
      </div>
    </section>
  );
}

export default TestSpace;
