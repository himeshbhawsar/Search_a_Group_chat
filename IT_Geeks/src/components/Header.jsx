import React from "react";
import { Search, BarChart3, MessageSquareText, Cpu, User } from "lucide-react";
export const Header = ({ activeTab, setActiveTab, totalMessages }) => {
  return (
    <div className="sticky top-4 z-40 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between p-3 sm:px-5 gap-4">
          { }
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">
                  Group Chat Search
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-700 border border-blue-200">
                  Hybrid Engine
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                <span className="flex items-center gap-1 font-medium">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  Himesh bhawsar
                </span>
                <span>•</span>
                <span>Full-Stack + AI Engineer</span>
              </div>
            </div>
          </div>
          { }
          <nav className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setActiveTab("search")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "search"
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button
              onClick={() => setActiveTab("benchmark")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "benchmark"
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Benchmark</span>
            </button>
            <button
              onClick={() => setActiveTab("explorer")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "explorer"
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Explorer</span>
            </button>
            <button
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "sandbox"
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Sandbox</span>
            </button>
          </nav>
          { }
          <div className="hidden lg:flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>
              Index:{" "}
              <strong className="text-gray-900">
                {totalMessages.toLocaleString()}
              </strong>{" "}
              msgs
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};