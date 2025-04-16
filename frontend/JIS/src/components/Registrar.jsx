import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseTable from "./CaseTable";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Registrar = () => {
  const [cases, setCases] = useState([]);
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
      setLoading(false);
    } catch (err) {
      console.error("Error fetching pending cases", err);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/cases/search?keyword=${search}`,
        {
          withCredentials: true,
        }
      );
      setCases(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    fetchPendingCases();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        Registrar Dashboard
      </h1>

      <div className="flex mb-4 gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full sm:w-80"
          placeholder="Search resolved cases (keyword)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleSearch}
        >
          Search
        </button>

        <button
          onClick={() => navigate("/registrar/register-case")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        >
          Register New case
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CaseTable cases={cases} refresh={fetchPendingCases} />
      )}
    </div>
  );
};

export default Registrar;
