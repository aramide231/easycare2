import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

interface FlagReport {
  id: number;
  date: string;
  time: string;
  comment: string;
  flaggedBy: string;
}

export default function FlagProfileReport() {
  // const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const patient = state?.patient;

  const [commentInput, setCommentInput] = useState("");
  const [reports, setReports] = useState<FlagReport[]>([
    {
      id: 1,
      date: "14-Feb-2020",
      time: "10:25 AM",
      comment:
        "The patient was flagged due to a significant change in their vital signs, indicating a potential risk that requires immediate attention.",
      flaggedBy: `${patient.staffName}`,
    },
    {
      id: 2,
      date: "15-Feb-2020",
      time: "10:25 AM",
      comment:
        "We flagged this patient because their recent lab results showed elevated levels that could suggest a serious condition.",
      flaggedBy: `${patient.staffName}`,
    },
    {
      id: 3,
      date: "16-Feb-2020",
      time: "10:25 AM",
      comment:
        "This patient was marked for review as they exhibited symptoms that are concerning and may require further evaluation.",
      flaggedBy: `${patient.staffName}`,
    },
    {
      id: 4,
      date: "17-Feb-2020",
      time: "11:00 AM",
      comment:
        "The reason for flagging this patient is due to their history of non-compliance with treatment, which poses a risk to their health.",
      flaggedBy: `${patient.staffName}`,
    },
  ]);

  const handleSaveComment = () => {
    if (!commentInput.trim()) return;

    const newReport: FlagReport = {
      id: reports.length + 1,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      comment: commentInput.trim(),
      flaggedBy: `${patient.staffName}`,
    };

    setReports([newReport, ...reports]);
    setCommentInput("");
  };

  const handleDelete = (id: number) => {
    setReports(reports.filter((r) => r.id !== id));
  };

//   // If page was refreshed and state is gone → optionally fetch by ID
//   useEffect(() => {
//     if (!patient && id) {
//       // TODO: Fetch patient details here from your backend if needed
//       console.warn("Patient state missing. Fetch by ID if your API allows it.");
//     }
//   }, [patient, id]);

//   if (!patient) {
//     return (
//       <div className="p-6">
//         <p className="text-gray-600">Loading patient information...</p>
//       </div>
//     );
//   }

  return (
    <div className="w-full p-6">
      {/* A back button */}
      {/* <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          ←
        </button>
      </div> */}

      {/* Comment Section */}
      <label className="font-semibold text-gray-700">COMMENTS</label>

      <textarea
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Enter Comment Here"
        className="w-full border border-gray-300 rounded-lg p-3 mt-2 h-32 resize-none focus:ring-purple-600 focus:border-purple-600"
      />

      <button
        onClick={handleSaveComment}
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Save Comment
      </button>

      {/* Table Section */}
      <div className="mt-10 bg-white w-full border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-4">
          PROFILE FLAG REPORT
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600 bg-gray-100 border-b">
                <th className="p-3 w-12 text-center">SN</th>
                <th className="p-3">DATE | TIME</th>
                <th className="p-3 w-[45%]">COMMENT</th>
                <th className="p-3">FLAGGED BY</th>
                <th className="p-3 text-center">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-center">{idx + 1}</td>

                  <td className="p-3">
                    <div>{item.date}</div>
                    <div className="text-gray-500 text-sm">{item.time}</div>
                  </td>

                  <td className="p-3 text-sm text-gray-700">{item.comment}</td>

                  <td className="p-3">{item.flaggedBy}</td>

                  <td className="p-3 text-center flex gap-3 justify-center">
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md border border-green-300">
                      EDIT
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md border border-red-300"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}