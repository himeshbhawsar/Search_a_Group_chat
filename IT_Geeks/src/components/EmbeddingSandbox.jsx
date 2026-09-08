import React, { useState } from "react";
export const EmbeddingSandbox = () => {
  const [inputText, setInputText] = useState("");
  const [embedding, setEmbedding] = useState(null);
  const handleGenerate = () => {
    if (!inputText.trim()) {
      setEmbedding(null);
      return;
    }
    const mockVector = Array.from({ length: 15 }, () =>
      parseFloat((Math.random() * 2 - 1).toFixed(4)),
    );
    setEmbedding(mockVector);
  };
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm text-center py-10 max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Embedding Sandbox
      </h2>
      <p className="text-gray-500 mb-6">
        Test vector embeddings interactively. Enter any text to see its vector
        representation.
      </p>
      <div className="space-y-4 text-left">
        <textarea
          className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          rows={3}
          placeholder="e.g. 'manali trip plan'"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Generate Embedding
        </button>
        {embedding && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Vector Representation (Mock 15-D):
            </h3>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-xs text-gray-600 break-all leading-relaxed">
              [{" "}
              {embedding
                .map((n) => (n > 0 ? ` ${n.toFixed(4)}` : n.toFixed(4)))
                .join(", ")}{" "}
              ]
            </div>
          </div>
        )}
      </div>
    </div>
  );
};