'use client'

import { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
}

export default function TypewriterEffect({ texts, speed = 150 }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = texts[currentTextIndex];
      
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentCharIndex > 0) {
          setDisplayText(currentText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTextIndex, isDeleting, texts, speed]);

  return (
    <span className="text-2xl md:text-3xl font-light mb-8 text-slate-300">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
