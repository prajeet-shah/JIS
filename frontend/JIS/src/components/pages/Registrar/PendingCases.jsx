import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from "react-router";

const PendingCases = () => {
  const [cases, setCases] = useState([]);
  const [crimeType, setCrimeType] = useState("");
  const navigate = useNavigate();

  const fetchPendingCases = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cases/pending`, {
        withCredentials: true,
      });
      setCases(res.data);
    } catch (err) {
      console.error("Failed to fetch pending cases:", err);
    }
  };

  useEffect(() => {
    fetchPendingCases();
  }, []);

  const handleSearch = () => {
    const filtered = cases.filter((c) =>
      c.crimeType?.toLowerCase().includes(crimeType.toLowerCase())
    );
    setCases(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-yellow-700 mb-4">
        Judge Dashboard – Pending Cases
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by crime type..."
          className="border p-2 rounded w-full sm:w-80"
          value={crimeType}
          onChange={(e) => setCrimeType(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">CIN</th>
              <th className="border px-4 py-2">Defendant</th>
              <th className="border px-4 py-2">Next Hearing Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c._id}>
                <td className="border px-4 py-2">{c.cin}</td>
                <td className="border px-4 py-2">{c.defendantName}</td>
                <td className="border px-4 py-2">
                  {c.hearingDates && c.hearingDates.length > 0
                    ? new Date(c.hearingDates[0]).toLocaleDateString()
                    : "No Hearing Date"}
                </td>
                <td className="border px-4 py-2">{c.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/registrar/case/${c.cin}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {cases.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No pending cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingCases;
