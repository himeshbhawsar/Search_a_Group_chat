import React, { useState } from "react";
import { BENCHMARK_QUERIES } from "../data/benchmarkQueries";
import { executeSearch } from "../engine/searchEngine";
export const BenchmarkView = ({ corpus }) => {
  const [results, setResults] = useState([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const runEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const evals = BENCHMARK_QUERIES.map((q) => {
        const res = executeSearch(corpus, q.query, { searchMode: "hybrid" });
        const rank =
          res.findIndex((r) => r.message.id === q.groundTruthMessageId) + 1;
        const txtRes = executeSearch(corpus, q.query, {
          searchMode: "keyword",
        });
        const txtRank =
          txtRes.findIndex((r) => r.message.id === q.groundTruthMessageId) + 1;
        return {
          query: q,
          retrieved: res[0]?.message,
          rank: rank > 0 ? rank : null,
          isTop1: rank === 1,
          isTop5: rank > 0 && rank <= 5,
          mrr: rank > 0 ? 1 / rank : 0,
          txtRank: txtRank > 0 ? txtRank : null,
        };
      });
      setResults(evals);
      setIsEvaluating(false);
    }, 100);
  };
  const top1Count = results.filter((r) => r.isTop1).length;
  const top5Count = results.filter((r) => r.isTop5).length;
  const mrrTotal = results.reduce((acc, r) => acc + r.mrr, 0);
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Evaluation Benchmark</h2>
        <p className="text-gray-600 mb-4">
          Run the test suite to evaluate search accuracy.
        </p>
        <button
          onClick={runEvaluation}
          disabled={isEvaluating}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-700"
        >
          {isEvaluating ? "Running..." : "Run Benchmark"}
        </button>
      </div>
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-gray-500 text-sm">Top-1 Accuracy</h3>
            <div className="text-2xl font-bold text-blue-600">
              {((top1Count / results.length) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-gray-500 text-sm">Top-5 Recall</h3>
            <div className="text-2xl font-bold text-green-600">
              {((top5Count / results.length) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-gray-500 text-sm">MRR</h3>
            <div className="text-2xl font-bold text-purple-600">
              {(mrrTotal / results.length).toFixed(3)}
            </div>
          </div>
        </div>
      )}
      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3">Query</th>
                <th className="p-3">Type</th>
                <th className="p-3">Result Rank</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="p-3">{r.query.query}</td>
                  <td className="p-3">{r.query.queryShape}</td>
                  <td className="p-3 font-bold">
                    {r.rank ? `#${r.rank}` : "Miss"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};