"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import paragraphs from "../../../public/paragraph.json";

function TestSpace() {
  interface ParagraphObject {
    paragraphs: string[];
  }

  const singleParagraphs: ParagraphObject = paragraphs;
  // console.log(singleParagraphs.paragraphs[0]);


  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute default
  const [isTestActive, setIsTestActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize with a random paragraph
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * singleParagraphs.paragraphs.length);
    setCurrentParagraph(singleParagraphs.paragraphs[randomIndex]);
  }, []);

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
      setUserInput("");
      setWpm(0);
      setAccuracy(0);
      if (inputRef.current) {
        inputRef.current.focus();
      }
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
    const randomIndex = Math.floor(Math.random() * singleParagraphs.paragraphs.length);
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
    
    // Calculate accuracy
    let correctChars = 0;
    const minLength = Math.min(userInput.length, currentParagraph.length);
    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === currentParagraph[i]) {
        correctChars++;
      }
    }
    const accuracyValue = minLength > 0 ? Math.round((correctChars / minLength) * 100) : 0;
    
    setWpm(wpmValue);
    setAccuracy(accuracyValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    // Start the test on first keystroke
    if (!isTestActive && value.length > 0) {
      startTest();
    }
    
    // End test if user has typed the entire paragraph
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
    <section className="flex flex-col w-full">
      {/* Timer and test controls */}
      <div className="flex gap-2 p-5 justify-center">
        <button 
          className={`p-3 border-2 rounded-xl ${timeLeft === 30 ? 'bg-cyan-500 text-white' : 'border-cyan-500'}`}
          onClick={() => setTimeLimit(30)}
          disabled={isTestActive}
        >
          30s
        </button>
        <button 
          className={`p-3 border-2 rounded-xl ${timeLeft === 60 ? 'bg-cyan-500 text-white' : 'border-cyan-500'}`}
          onClick={() => setTimeLimit(60)}
          disabled={isTestActive}
        >
          1min
        </button>
        <button 
          className={`p-3 border-2 rounded-xl ${timeLeft === 120 ? 'bg-cyan-500 text-white' : 'border-cyan-500'}`}
          onClick={() => setTimeLimit(120)}
          disabled={isTestActive}
        >
          2min
        </button>
        <div className="p-3 border-2 border-cyan-500 rounded-xl">
          {timeLeft}s
        </div>
      </div>

      {/* Stats display during test */}
      {isTestActive && (
        <div className="flex justify-center gap-10 p-3">
          <div className="text-xl text-white">
            Time: {timeLeft}s
          </div>
          <div className="text-xl text-white">
            WPM: {wpm}
          </div>
          <div className="text-xl text-white">
            Accuracy: {accuracy}%
          </div>
        </div>
      )}

      {/* Results display after test */}
      {testCompleted && (
        <div className="flex flex-col items-center p-5 bg-gray-800 rounded-lg m-5">
          <h2 className="text-2xl font-bold text-white mb-3">Test Results</h2>
          <div className="flex gap-10">
            <div className="text-xl text-white">
              WPM: <span className="font-bold">{wpm}</span>
            </div>
            <div className="text-xl text-white">
              Accuracy: <span className="font-bold">{accuracy}%</span>
            </div>
            <div className="text-xl text-white">
              Time: <span className="font-bold">{Math.round((endTime - startTime) / 1000)}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Paragraph display */}
      <div className="text-xl text-white text-left p-5 bg-gray-800 rounded-lg m-5 min-h-[120px]">
        {currentParagraph.split('').map((char, index) => {
          let color = 'text-white';
          if (index < userInput.length) {
            color = userInput[index] === char ? 'text-green-500' : 'text-red-500';
          } else if (index === userInput.length) {
            color = 'text-yellow-400';
          }
          return (
            <span key={index} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      {/* User input area */}
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        disabled={testCompleted}
        className="text-xl p-5 m-5 bg-gray-800 text-white rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder={isTestActive ? "" : "Start typing to begin the test..."}
      />

      {/* Action buttons */}
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
