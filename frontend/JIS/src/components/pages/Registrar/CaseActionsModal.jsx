import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const CaseActionsModal = ({ cin, type, onClose, refresh }) => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const getTitle = () => {
    switch (type) {
      case "hearing":
        return "Add Hearing Date";
      case "adjourn":
        return "Add Adjournment";
      case "summary":
        return "Add Court Summary";
      case "close":
        return "Close Case with Judgment";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    let body = {};

    try {
      if (type === "hearing") {
        url = `/api/cases/update-hearing/${cin}`;
        body = { newDate: date };
      } else if (type === "adjourn") {
        url = `/api/cases/adjourn/${cin}`;
        body = { reason: input, newDate: date };
      } else if (type === "summary") {
        url = `/api/cases/add-summary/${cin}`;
        body = { summary: input };
      } else if (type === "close") {
        url = `/api/cases/close/${cin}`;
        body = { judgmentSummary: input };
      }

      await axios.patch(`${BASE_URL}${url}`, body, {
        withCredentials: true,
      });

      refresh();
      onClose();
    } catch (err) {
      console.error("Action failed:", err);
      alert("Action failed. Check console.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {getTitle()} ({cin})
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(type === "adjourn" || type === "summary" || type === "close") && (
            <textarea
              placeholder={
                type === "adjourn"
                  ? "Enter reason for adjournment"
                  : type === "summary"
                  ? "Enter hearing summary"
                  : "Enter final judgment"
              }
              rows="3"
              className="w-full border rounded p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          )}

          {(type === "hearing" || type === "adjourn") && (
            <input
              type="date"
              className="w-full border rounded p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseActionsModal;
