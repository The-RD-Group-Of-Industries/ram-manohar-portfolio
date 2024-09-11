/**
 * A custom React hook that manages the progress value for a skill level.
 *
 * The hook takes a `type` parameter that determines the target progress value and the increment/interval settings for the animation.
 *
 * The hook returns an object with two properties:
 * - `value`: the current progress value, which is animated from 0 to the target value
 * - `elementRef`: a ref to the HTML element that the progress animation should be applied to
 *
 * The progress animation is triggered when the element becomes visible in the viewport, using the IntersectionObserver API.
 *
 * @param type - The skill level type, which can be 'beginner', 'intermediate', or 'advance'.
 * @returns An object with the current progress value and a ref to the element.
 */
"use client";
import { useState, useEffect, useRef } from 'react';

function useProgressValue(type: string) {
  let initialValue = 0;
  let targetValue = 0;
  let increment = 0;
  let intervalTime = 0;

  // Define initial values and increment logic based on the type
  switch (type) {
    case 'beginner':
      targetValue = 50;
      increment = 1; // Increment value can be adjusted based on preference
      intervalTime = 20; // Interval time can be adjusted based on preference
      break;
    case 'intermediate':
      targetValue = 80;
      increment = 2;
      intervalTime = 15;
      break;
    case 'advance':
      targetValue = 100;
      increment = 3;
      intervalTime = 10;
      break;
    default:
      targetValue = 0; // Default case, no progress
      increment = 0;
      intervalTime = 0;
  }

  const [value, setValue] = useState(initialValue);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.1, // Adjust this value based on when you want the animation to start
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const interval = setInterval(() => {
      setValue((prev) => {
        const newValue = prev + increment;
        if (newValue >= targetValue) {
          clearInterval(interval); // Stop incrementing when it reaches the target value
          setHasAnimated(true);
          return targetValue;
        }
        return newValue;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isVisible, intervalTime, increment, hasAnimated, targetValue]);

  return { value, elementRef };
}

export default useProgressValue;
