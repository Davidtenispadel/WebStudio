import React from "react";
import { splitIntoSentences } from "../utils/textEngine";

interface Props {
  text: string;
  className?: string;
}

const TextReveal: React.FC<Props> = ({ text, className }) => {
  const sentences = splitIntoSentences(text);

  return (
    <div className={className}>
      {sentences.map((sentence, i) => (
        <p
          key={i}
          className="reveal-line"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {sentence}
        </p>
      ))}
    </div>
  );
};

export default TextReveal;
