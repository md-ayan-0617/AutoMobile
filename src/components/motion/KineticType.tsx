import React, { useState, useEffect } from 'react';

interface KineticTypeProps {
  phrases?: string[];
  singleText?: string;
  className?: string;
  speed?: number;
  pauseTime?: number;
  loop?: boolean;
}

export const KineticType: React.FC<KineticTypeProps> = ({
  phrases = [
    'ENGINEERED TO BE REMEMBERED.',
    'FORM FOLLOWS DESIRE.',
    'SILENCE IS THE NEW POWER.',
    'EVERY MILLIMETER HAS A JOB.'
  ],
  singleText,
  className = '',
  speed = 45,
  pauseTime = 2200,
  loop = true
}) => {
  const words = singleText ? [singleText] : phrases;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = words[currentWordIndex];

    if (!isDeleting && displayText === fullText) {
      if (!loop && currentWordIndex === words.length - 1) return;
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setDisplayText((prev) =>
          isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
        );
      },
      isDeleting ? speed * 0.5 : speed
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words, speed, pauseTime, loop]);

  return (
    <span className={`kinetic-type-container ${className}`}>
      <span>{displayText}</span>
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
};
