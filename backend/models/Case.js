const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  cin: { type: String, unique: true },
  defendantName: String,
  address: String,
  crimeType: String,
  crimeDate: Date,
  location: String,
  arrestingOfficer: String,
  arrestDate: Date,
  presidingJudge: String,
  publicProsecutor: String,
  startingDate: Date,
  expectedCompletionDate: Date,
  hearingDates: [Date],
  status: { type: String, enum: ["Pending", "Closed", "Due"] },
  judgmentSummary: String,
  courtSummary: [String],
  adjournments: [{ reason: String, newDate: Date }],
});

module.exports = mongoose.model("Case", caseSchema);
