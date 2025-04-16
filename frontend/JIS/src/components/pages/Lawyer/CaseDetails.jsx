import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const CaseDetails = () => {
  const { cin } = useParams();
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        // ✅ Get full case details
        const res = await axios.get(`${BASE_URL}/api/cases/status/${cin}`, {
          withCredentials: true,
        });
        setCaseData(res.data);

        // ✅ Increment lawyer/judge view count
        await axios.patch(
          `${BASE_URL}/api/cases/viewed-case`,
          {},
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.error("Error fetching case details:", err);
      }
    };

    fetchCase();
  }, [cin]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  if (!caseData) return <p className="p-4">Loading case details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Case Details – {caseData.cin}
      </h2>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Defendant Name:</strong> {caseData.defendantName}
        </p>
        <p>
          <strong>Address:</strong> {caseData.address}
        </p>
        <p>
          <strong>Crime Type:</strong> {caseData.crimeType}
        </p>
        <p>
          <strong>Crime Date:</strong> {formatDate(caseData.crimeDate)}
        </p>
        <p>
          <strong>Crime Location:</strong>{" "}
          {caseData.location || caseData.crimeLocation}
        </p>
        <p>
          <strong>Arresting Officer:</strong> {caseData.arrestingOfficer}
        </p>
        <p>
          <strong>Arrest Date:</strong> {formatDate(caseData.arrestDate)}
        </p>
        <p>
          <strong>Presiding Judge:</strong> {caseData.presidingJudge}
        </p>
        <p>
          <strong>Public Prosecutor:</strong> {caseData.publicProsecutor}
        </p>
        <p>
          <strong>Starting Date:</strong> {formatDate(caseData.startingDate)}
        </p>
        <p>
          <strong>Expected Completion Date:</strong>{" "}
          {formatDate(caseData.expectedCompletionDate)}
        </p>
        <p>
          <strong>Status:</strong> {caseData.status}
        </p>
        <p>
          <strong>Judgment Summary:</strong> {caseData.judgmentSummary || "N/A"}
        </p>

        <div>
          <p>
            <strong>Hearing Dates:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            {caseData.hearingDates?.length > 0 ? (
              caseData.hearingDates.map((date, i) => (
                <li key={i}>{formatDate(date)}</li>
              ))
            ) : (
              <li>No hearing dates recorded</li>
            )}
          </ul>
        </div>

        <div>
          <p>
            <strong>Court Summary:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            {caseData.courtSummary?.length > 0 ? (
              caseData.courtSummary.map((s, i) => <li key={i}>{s}</li>)
            ) : (
              <li>No court summary available</li>
            )}
          </ul>
        </div>

        <div>
          <p>
            <strong>Adjournments:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            {caseData.adjournments?.length > 0 ? (
              caseData.adjournments.map((a, i) => (
                <li key={i}>
                  <strong>Reason:</strong> {a.reason} —{" "}
                  <strong>New Date:</strong> {formatDate(a.newDate)}
                </li>
              ))
            ) : (
              <li>No adjournments recorded</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
