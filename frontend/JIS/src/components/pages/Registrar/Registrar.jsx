import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseTable from "./CaseTable";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from "react-router";

const Registrar = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchPendingCases = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/cases/pending`, {
        withCredentials: true,
      });
      setCases(res.data);
      setFilteredCases(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching pending cases", err);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const result = cases.filter((c) =>
      c.cin.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCases(result);
  };

  useEffect(() => {
    fetchPendingCases();
  }, []);

  // 🔁 Reset to all cases when search is cleared
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCases(cases);
    }
  }, [search, cases]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        Registrar Dashboard
      </h1>

      <div className="flex mb-4 gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full sm:w-80"
          placeholder="Search pending cases by CIN number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CaseTable cases={filteredCases} refresh={fetchPendingCases} />
      )}
    </div>
  );
};

export default Registrar;
