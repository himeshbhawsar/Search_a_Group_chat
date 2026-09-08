import React, { useState, useMemo } from "react";
export const CorpusExplorer = ({ corpus, onOpenContext }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(corpus.length / itemsPerPage);
  const paginatedMessages = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return corpus.slice(startIndex, startIndex + itemsPerPage);
  }, [corpus, page]);
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Corpus Explorer</h2>
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * itemsPerPage + 1} to{" "}
          {Math.min(page * itemsPerPage, corpus.length)} of {corpus.length}
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {paginatedMessages.map((msg) => (
          <div
            key={msg.id}
            className="p-3 border border-gray-100 rounded bg-gray-50 flex items-start gap-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => onOpenContext(msg)}
          >
            <div className="min-w-[100px] text-xs font-semibold text-gray-700">
              {msg.sender}
            </div>
            <div className="text-sm text-gray-800 flex-1">{msg.text}</div>
            <div className="text-xs text-gray-400 whitespace-nowrap">
              {new Date(msg.timestamp).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};