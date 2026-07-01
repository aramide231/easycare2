import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  buildMockFlagReports,
  formatFlagDate,
  formatFlagTime,
  type FlagReport,
} from "../data/mockFlagReports";

const FlagProfileReport = () => {
  const { user } = useAuth();
  const flaggedByName = user?.fullName ?? "Chibuzor Oladele";

  const [commentInput, setCommentInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reports, setReports] = useState<FlagReport[]>(() =>
    buildMockFlagReports(flaggedByName),
  );

  const handleSaveComment = () => {
    const trimmed = commentInput.trim();
    if (!trimmed) return;

    if (editingId) {
      setReports((prev) =>
        prev.map((report) =>
          report.id === editingId ? { ...report, comment: trimmed } : report,
        ),
      );
      setEditingId(null);
      setCommentInput("");
      return;
    }

    const now = new Date();
    const newReport: FlagReport = {
      id: `flag-${Date.now()}`,
      date: formatFlagDate(now),
      time: formatFlagTime(now),
      comment: trimmed,
      flaggedBy: flaggedByName,
    };

    setReports((prev) => [newReport, ...prev]);
    setCommentInput("");
  };

  const handleEdit = (report: FlagReport) => {
    setEditingId(report.id);
    setCommentInput(report.comment);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCommentInput("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCommentInput("");
  };

  return (
    <div className="space-y-8">
      <section>
        <label
          htmlFor="flag-comment"
          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-800"
        >
          Comments
        </label>
        <textarea
          id="flag-comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Enter Comment Here"
          className="min-h-[140px] w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
        />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleSaveComment}
            className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b0]"
          >
            {editingId ? "Update Comment" : "Save Comment"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
          Profile Flag Report
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center font-medium">SN</th>
                <th className="px-4 py-3 font-medium">Date | Time</th>
                <th className="px-4 py-3 font-medium">Comment</th>
                <th className="px-4 py-3 font-medium">Flagged By</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#D4D4D4] bg-white"
                  >
                    <td className="px-4 py-3 text-center font-medium">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div>{item.date}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </td>
                    <td className="max-w-xl px-4 py-3 text-gray-700">
                      {item.comment}
                    </td>
                    <td className="px-4 py-3">{item.flaggedBy}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="rounded-md border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold uppercase text-green-700 hover:bg-green-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-md border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold uppercase text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    No flag comments yet. Add a comment above to flag this
                    profile.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FlagProfileReport;
