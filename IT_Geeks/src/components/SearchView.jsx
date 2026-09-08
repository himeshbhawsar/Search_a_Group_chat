import React, { useState, useMemo } from "react";
import { executeSearch, parseQueryIntent } from "../engine/searchEngine";
import { SearchResultCard } from "./SearchResultCard";
import { PARTICIPANTS } from "../data/chatGenerator";
import { BENCHMARK_QUERIES } from "../data/benchmarkQueries";
import {
  Search,
  X,
  Zap,
  SlidersHorizontal,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
export const SearchView = ({ corpus, onOpenContext }) => {
  const [query, setQuery] = useState("when did we decide on the trip");
  const [filters, setFilters] = useState({
    searchMode: "hybrid",
    sender: "",
    startDate: "",
    endDate: "",
    threadId: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const detectedIntent = useMemo(() => parseQueryIntent(query), [query]);
  const results = useMemo(() => {
    return executeSearch(corpus, query, filters);
  }, [corpus, query, filters]);
  const semanticGapPresetQueries = BENCHMARK_QUERIES.filter(
    (q) => q.isSemanticGap,
  ).slice(0, 8);
  return (
    <div className="space-y-6">
      {}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Search by Meaning & Intent
            </h2>
            <p className="text-sm text-gray-500">
              Understands Hinglish, code-mixing, typos, attributed questions,
              and natural date references.
            </p>
          </div>
          {}
          <div className="relative">
            <div className="relative flex items-center bg-white rounded-lg border border-gray-300 p-1 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'when did we decide on the trip'..."
                className="w-full bg-transparent px-3 py-3 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium ml-2 transition ${
                  showFilters || filters.sender || filters.startDate
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
          {}
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Detected:</span>
              <span
                className={`px-2.5 py-1 rounded font-semibold text-xs flex items-center gap-1.5 border ${
                  detectedIntent.shape === "semantic"
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : detectedIntent.shape === "attributed"
                      ? "bg-pink-50 text-pink-700 border-pink-200"
                      : detectedIntent.shape === "temporal"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{detectedIntent.shape}</span>
              </span>
              {detectedIntent.sender && (
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 border border-gray-200 text-xs">
                  User: <strong>{detectedIntent.sender}</strong>
                </span>
              )}
              {detectedIntent.dateRange && (
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 border border-gray-200 text-xs">
                  Dates:{" "}
                  <strong>
                    {detectedIntent.dateRange.start} to{" "}
                    {detectedIntent.dateRange.end}
                  </strong>
                </span>
              )}
            </div>
            {}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-200 text-sm">
              <button
                onClick={() => setFilters({ ...filters, searchMode: "hybrid" })}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  filters.searchMode === "hybrid"
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Hybrid
              </button>
              <button
                onClick={() =>
                  setFilters({ ...filters, searchMode: "semantic" })
                }
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  filters.searchMode === "semantic"
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Vector Only
              </button>
              <button
                onClick={() =>
                  setFilters({ ...filters, searchMode: "keyword" })
                }
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  filters.searchMode === "keyword"
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Exact Text
              </button>
            </div>
          </div>
          {}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Filter by Participant
                </label>
                <select
                  value={filters.sender || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, sender: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Participants</option>
                  {PARTICIPANTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
          {}
          <div className="pt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-2 font-medium">
              <span>Try Examples:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {semanticGapPresetQueries.map((bq) => (
                <button
                  key={bq.id}
                  onClick={() => setQuery(bq.query)}
                  className={`text-sm px-3 py-1.5 rounded-md border transition-all duration-200 text-left ${
                    query.toLowerCase() === bq.query.toLowerCase()
                      ? "bg-blue-50 text-blue-700 border-blue-200 font-medium"
                      : "bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  "{bq.query}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <span>
            Found{" "}
            <strong className="text-gray-900 font-bold">
              {results.length}
            </strong>{" "}
            matching messages
          </span>
        </div>
        {filters.searchMode === "keyword" && (
          <span className="text-amber-700 text-xs flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Warning: Exact text mode will miss semantic matches!
          </span>
        )}
      </div>
      {}
      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((res, index) => (
            <SearchResultCard
              key={`${res.message.id}_${index}`}
              result={res}
              onOpenContext={onOpenContext}
            />
          ))
        ) : (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200 space-y-3 shadow-sm">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-lg font-medium text-gray-900">
              No matching messages found
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Try rephrasing your search query or switching from Exact Text mode
              to Hybrid.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};