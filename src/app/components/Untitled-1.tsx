"use client";
import React from 'react';
import paragraphs from '../../../public/paragraph.json';

function TestSpace() {

  interface Paragraph {
    paragraph: string[];
  }
  // Type assertion to treat paragraphs as an array of Paragraph objects
  const singleParagraph = (paragraphs as Paragraph[])[0].paragraph;

  console.log(singleParagraph); 
  
  return (
    <section>
      <p className='text-5xl font-bold'>Hello</p>
      
    </section>
  );
}

export default TestSpace;
