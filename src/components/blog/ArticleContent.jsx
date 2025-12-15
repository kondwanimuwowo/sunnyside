// ============================================================================
// FILE: src/components/blog/ArticleContent.jsx
// Beautiful blog content renderer with proper styling
// ============================================================================

import React from "react";

const ArticleContent = ({ content }) => {
  // Parse the markdown-like content
  const parseContent = (text) => {
    const lines = text.trim().split("\n");
    const elements = [];
    let currentList = [];
    let listType = null;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-2 my-6 ml-6">
            {currentList.map((item, idx) => (
              <li
                key={idx}
                className="text-gray-700 leading-relaxed pl-2 relative before:content-['•'] before:absolute before:left-[-1rem] before:text-[#32cd32] before:font-bold"
              >
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) {
        flushList();
        return;
      }

      // H1
      if (trimmed.startsWith("# ")) {
        flushList();
        elements.push(
          <h1
            key={`h1-${index}`}
            className="text-4xl font-bold text-gray-900 mb-6 mt-8"
          >
            {trimmed.substring(2)}
          </h1>
        );
      }
      // H2
      else if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-3xl font-bold text-gray-900 mb-4 mt-8"
          >
            {trimmed.substring(3)}
          </h2>
        );
      }
      // H3
      else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-2xl font-bold text-gray-900 mb-3 mt-6"
          >
            {trimmed.substring(4)}
          </h3>
        );
      }
      // List item
      else if (trimmed.startsWith("- ")) {
        currentList.push(trimmed.substring(2));
      }
      // Numbered list
      else if (/^\d+\./.test(trimmed)) {
        flushList();
        const text = trimmed.replace(/^\d+\.\s*/, "");
        if (listType !== "ol") {
          flushList();
          listType = "ol";
        }
        currentList.push(text);
      }
      // Paragraph
      else {
        flushList();
        // Check for bold text **text**
        const parts = trimmed.split(/(\*\*.*?\*\*)/g);
        const formatted = parts.map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={idx} className="font-bold text-gray-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        elements.push(
          <p
            key={`p-${index}`}
            className="text-gray-700 leading-relaxed mb-4 text-lg"
          >
            {formatted}
          </p>
        );
      }
    });

    // Flush any remaining list
    flushList();

    return elements;
  };

  return (
    <article className="prose prose-lg max-w-none">
      {parseContent(content)}
    </article>
  );
};

export default ArticleContent;
