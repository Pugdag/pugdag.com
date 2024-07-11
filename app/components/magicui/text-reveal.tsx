"use client";

import { cn } from "../../lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { FC, ReactNode, useRef, useEffect, useState } from "react";

interface TextRevealByWordProps {
  children: ReactNode;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ children, className }) => {
  const paragraphs = React.Children.toArray(children);

  return (
    <div className={cn("relative z-0", className)}>
      {paragraphs.map((paragraph, index) => (
        <ParagraphReveal key={index}>{paragraph}</ParagraphReveal>
      ))}
    </div>
  );
};

interface ParagraphRevealProps {
  children: ReactNode;
}

const ParagraphReveal: FC<ParagraphRevealProps> = ({ children }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState("200vh");

  useEffect(() => {
    const handleResize = () => {
      if (targetRef.current) {
        const textHeight = targetRef.current.clientHeight;
        setContainerHeight(`${textHeight * 0.8}px`); 
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], 
  });

  const lines = React.Children.toArray(children)
    .flatMap((child) => (typeof child === "string" ? child.split("\n") : [child]))
    .map((line) => (typeof line === "string" ? line.split(" ") : [line]));

  return (
    <div className="relative z-0" style={{ minHeight: containerHeight }}>
      <div ref={targetRef} className="sticky top-0 mx-auto flex w-full items-center px-4 py-10"> 
        <div className="flex flex-col space-y-4 text-lg font-bold text-[#273c75] md:text-xl lg:text-2xl xl:text-3xl"> 
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex flex-wrap">
              {line.map((word, wordIndex) => {
                const start = (lineIndex * line.length + wordIndex) / lines.flat().length;
                const end = start + 1 / lines.flat().length;
                return (
                  <Word key={wordIndex} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 2]);
  return (
    <motion.span style={{ opacity }} className="mx-1">
      {children}{' '}
    </motion.span>
  );
};

export default TextRevealByWord;
