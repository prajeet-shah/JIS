import React, { useState } from "react";
import { useNavigate } from "react-router";
import CaseActionsModal from "./CaseActionsModal";

const CaseTable = ({ cases, refresh }) => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();

  const openModal = (c, type) => {
    setSelectedCase(c);
    setActionType(type);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-2 text-center ">CIN</th>
            <th className="border px-4 py-2 ">Defendant</th>
            <th className="border px-4 py-2 text-center">Status</th>
            <th className="border px-2 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c._id}>
              <td className="border px-4 py-2 text-center">{c.cin}</td>
              <td className="border px-4 py-2 ">{c.defendantName}</td>
              <td className="border px-4 py-2 text-center">{c.status}</td>
              <td className="border py-2 text-center">
                <div className=" inline-flex flex-wrap gap-1">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                    onClick={() => navigate(`/registrar/case/${c.cin}`)}
                  >
                    View
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => openModal(c, "hearing")}
                  >
                    +Hearing
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => openModal(c, "adjourn")}
                  >
                    Adjourn
                  </button>
                  <button
                    className="bg-purple-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => openModal(c, "summary")}
                  >
                    +Summary
                  </button>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => openModal(c, "close")}
                  >
                    Close
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reusable Modal */}
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
