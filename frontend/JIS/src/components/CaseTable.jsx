import React, { useState } from "react";
import CaseActionsModal from "./CaseActionsModal";

const CaseTable = ({ cases, refresh }) => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [actionType, setActionType] = useState("");

  const openModal = (c, type) => {
    setSelectedCase(c);
    setActionType(type);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">CIN</th>
            <th className="border px-4 py-2">Defendant</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c._id}>
              <td className="border px-4 py-2">{c.cin}</td>
              <td className="border px-4 py-2">{c.defendantName}</td>
              <td className="border px-4 py-2">{c.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => openModal(c, "hearing")}
                >
                  + Hearing
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => openModal(c, "adjourn")}
                >
                  Adjourn
                </button>
                <button
                  className="bg-purple-600 text-white px-2 py-1 rounded"
                  onClick={() => openModal(c, "summary")}
                >
                  + Summary
                </button>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded"
                  onClick={() => openModal(c, "close")}
                >
                  Close
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reusable modal */}
      {selectedCase && (
        <CaseActionsModal
          cin={selectedCase.cin}
          type={actionType}
          onClose={() => setSelectedCase(null)}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default CaseTable;
