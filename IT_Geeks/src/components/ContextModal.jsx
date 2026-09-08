import React from "react";
export const ContextModal = ({ activeMessage, corpus, onClose }) => {
  if (!activeMessage) return null;
  const targetIndex = corpus.findIndex((m) => m.id === activeMessage.id);
  if (targetIndex === -1) return null;
  const startIndex = Math.max(0, targetIndex - 5);
  const endIndex = Math.min(corpus.length - 1, targetIndex + 5);
  const contextMessages = corpus.slice(startIndex, endIndex + 1);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">
            Conversation Context
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-gray-50">
          {contextMessages.map((msg) => {
            const isTarget = msg.id === activeMessage.id;
            return (
              <div
                key={msg.id}
                className={`p-3 rounded border ${isTarget ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`font-semibold text-sm ${isTarget ? "text-blue-700" : "text-gray-700"}`}
                  >
                    {msg.sender}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-800">{msg.text}</p>
                {isTarget && (
                  <div className="mt-2 text-xs font-semibold text-blue-600 uppercase">
                    Target Match
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium"
          >
            Close Context
          </button>
        </div>
      </div>
    </div>
  );
};