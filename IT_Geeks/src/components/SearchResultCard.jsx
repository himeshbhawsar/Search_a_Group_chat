import React from "react";
import { PARTICIPANTS } from "../data/chatGenerator";
import {
  MessageSquare,
  Calendar,
  Zap,
  Sparkles,
  CheckCircle2,
  FileText,
} from "lucide-react";
export const SearchResultCard = ({ result, onOpenContext }) => {
  const {
    message,
    score,
    matchType,
    vectorSimilarity,
    bm25Score,
    attributedBoost,
    temporalBoost,
  } = result;
  const participant = PARTICIPANTS.find(
    (p) => p.name.toLowerCase() === message.sender.toLowerCase(),
  ) || {
    name: message.sender,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100",
    color: "#06b6d4",
    role: "Participant",
  };
  const formattedDate = new Date(message.timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
      {}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={participant.avatar}
            alt={participant.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900 text-sm">
                {participant.name}
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded font-medium"
                style={{
                  backgroundColor: `${participant.color}15`,
                  color: participant.color,
                  border: `1px solid ${participant.color}30`,
                }}
              >
                {participant.role || "Participant"}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-0.5">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        {}
        <div className="flex items-center space-x-2">
          <span
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border ${
              matchType === "semantic"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : matchType === "attributed"
                  ? "bg-pink-50 text-pink-700 border-pink-200"
                  : matchType === "temporal"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="capitalize">{matchType}</span>
          </span>
          <div className="bg-gray-50 px-3 py-1 rounded border border-gray-200 flex items-center space-x-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-gray-500">Score:</span>
            <strong className="text-blue-600 font-mono font-bold">
              {(score * 100).toFixed(1)}%
            </strong>
          </div>
        </div>
      </div>
      {}
      {message.isDecision && (
        <div className="mb-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span>Decision Anchor</span>
        </div>
      )}
      {}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-sm text-gray-800 leading-relaxed">
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
      {}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-md border border-gray-100">
        <div>
          <span className="block mb-0.5">Vector Similarity</span>
          <span className="font-mono text-purple-600 font-semibold">
            {(vectorSimilarity * 100).toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="block mb-0.5">Keyword Overlap</span>
          <span className="font-mono text-blue-600 font-semibold">
            {(bm25Score * 100).toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="block mb-0.5">Attributed Boost</span>
          <span className="font-mono text-pink-600 font-semibold">
            +{attributedBoost * 100}%
          </span>
        </div>
        <div>
          <span className="block mb-0.5">Temporal Window</span>
          <span className="font-mono text-amber-600 font-semibold">
            +{temporalBoost * 100}%
          </span>
        </div>
      </div>
      {}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          <span>
            ID: <code className="font-mono">{message.id}</code>
          </span>
        </div>
        <button
          onClick={() => onOpenContext(message)}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>View Context</span>
        </button>
      </div>
    </div>
  );
};