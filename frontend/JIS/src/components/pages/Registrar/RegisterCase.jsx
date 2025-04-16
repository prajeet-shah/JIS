import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../../utils/constants";

const RegisterCase = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    defendantName: "",
    address: "",
    crimeType: "",
    crimeDate: "",
    crimeLocation: "",
    arrestingOfficer: "",
    arrestDate: "",
    presidingJudge: "",
    publicProsecutor: "",
    startingDate: "",
    expectedCompletionDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/cases/register`, formData, {
        withCredentials: true,
      });

      alert("Case registered successfully.");
      navigate("/registrar");
    } catch (err) {
      console.error("Register case error:", err);
      alert("Error registering case.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Register New Court Case
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {[
          ["defendantName", "Defendant Name"],
          ["address", "Address"],
          ["crimeType", "Crime Type"],
          ["crimeDate", "Crime Date", "date"],
          ["crimeLocation", "Crime Location"],
          ["arrestingOfficer", "Arresting Officer"],
          ["arrestDate", "Arrest Date", "date"],
          ["presidingJudge", "Presiding Judge"],
          ["publicProsecutor", "Public Prosecutor"],
          ["startingDate", "Starting Date", "date"],
          ["expectedCompletionDate", "Expected Completion Date", "date"],
        ].map(([name, label, type = "text"]) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              required
              className="w-full border rounded px-3 py-2"
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="col-span-1 sm:col-span-2 text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Register Case
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCase;
