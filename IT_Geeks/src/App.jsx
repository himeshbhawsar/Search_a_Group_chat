import React, { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { SearchView } from "./components/SearchView";
import { BenchmarkView } from "./components/BenchmarkView";
import { CorpusExplorer } from "./components/CorpusExplorer";
import { EmbeddingSandbox } from "./components/EmbeddingSandbox";
import { ContextModal } from "./components/ContextModal";
import { generateSyntheticGroupChat } from "./data/chatGenerator";
export const App = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [activeContextMessage, setActiveContextMessage] = useState(null);
  const corpus = useMemo(() => {
    return generateSyntheticGroupChat();
  }, []);
  const handleOpenContext = (msg) => {
    setActiveContextMessage(msg);
  };
  const handleCloseContext = () => {
    setActiveContextMessage(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/50 to-white text-gray-900 flex flex-col font-sans relative">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-violet-100/50 to-transparent pointer-events-none"></div>
      {}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalMessages={corpus.length}
      />
      {}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "search" && (
          <SearchView corpus={corpus} onOpenContext={handleOpenContext} />
        )}
        {activeTab === "benchmark" && <BenchmarkView corpus={corpus} />}
        {activeTab === "explorer" && (
          <CorpusExplorer corpus={corpus} onOpenContext={handleOpenContext} />
        )}
        {activeTab === "sandbox" && <EmbeddingSandbox />}
      </main>
      {}
      <ContextModal
        activeMessage={activeContextMessage}
        corpus={corpus}
        onClose={handleCloseContext}
      />
      {}
      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Search a Group Chat Properly — Built by{" "}
            <strong className="text-gray-900">Himesh bhawsar</strong>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 font-mono text-[11px]">
            <span>FastAPI + React</span>
            <span>•</span>
            <span>TF-IDF RRF</span>
            <span>•</span>
            <span>4,120 Messages</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;