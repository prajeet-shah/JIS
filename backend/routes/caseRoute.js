const express = require("express");
const { body, validationResult } = require("express-validator");
const Case = require("../models/Case");
const User = require("../models/User");
const generateCIN = require("../utils/generateCIN");
const { AuthUser } = require("../middlewares/Auth"); // use your AuthUser

const caseRouter = express.Router();

// POST /api/cases/register
caseRouter.post(
  "/register",
  AuthUser, // ✅ your existing middleware
  [
    body("defendantName").notEmpty().withMessage("Defendant name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("crimeType").notEmpty().withMessage("Crime type is required"),
    body("crimeDate")
      .isISO8601()
      .withMessage("Crime date must be a valid date"),
    body("crimeLocation").notEmpty().withMessage("Crime location is required"),
    body("arrestingOfficer")
      .notEmpty()
      .withMessage("Arresting officer is required"),
    body("arrestDate")
      .isISO8601()
      .withMessage("Arrest date must be a valid date"),
    body("presidingJudge")
      .notEmpty()
      .withMessage("Presiding judge is required"),
    body("publicProsecutor")
      .notEmpty()
      .withMessage("Public prosecutor is required"),
    body("startingDate").isISO8601().withMessage("Starting date must be valid"),
    body("expectedCompletionDate")
      .isISO8601()
      .withMessage("Expected completion date must be valid"),
  ],
  async (req, res) => {
    // ✅ Registrar check
    if (req.user?.role !== "registrar") {
      return res.status(403).json({ message: "Access denied: Registrar only" });
    }

    // ✅ Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        defendantName,
        address,
        crimeType,
        crimeDate,
        crimeLocation,
        arrestingOfficer,
        arrestDate,
        presidingJudge,
        publicProsecutor,
        startingDate,
        expectedCompletionDate,
      } = req.body;

      const cin = await generateCIN();

      const newCase = new Case({
        cin,
        defendantName,
        address,
        crimeType,
        crimeDate,
        crimeLocation,
        arrestingOfficer,
        arrestDate,
        presidingJudge,
        publicProsecutor,
        startingDate,
        expectedCompletionDate,
        status: "Pending",
      });

      await newCase.save();

      res.status(201).json({
        message: "Court case registered successfully",
        cin,
      });
    } catch (err) {
      console.error("Case registration error:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

caseRouter.patch("/viewed-case", AuthUser, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user || (user.role !== "lawyer" && user.role !== "judge")) {
      return res
        .status(403)
        .json({ message: "Only lawyers or judges can view cases." });
    }

    user.viewedCases = (user.viewedCases || 0) + 1;
    await user.save();

    res.status(200).json({
      message: "Viewed case recorded.",
      totalViewed: user.viewedCases,
    });
  } catch (err) {
    console.error("Error updating viewedCases:", err.message);
    res
      .status(500)
      .json({ message: "Server error while updating viewedCases." });
  }
});
// pending cases
caseRouter.get("/pending", AuthUser, async (req, res) => {
  try {
    const cases = await Case.find({ status: "Pending" }).sort({ cin: 1 });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
caseRouter.get("/due", AuthUser, async (req, res) => {
  try {
    const cases = await Case.find({ status: "Due" }).sort({ cin: 1 });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

caseRouter.get("/resolved", AuthUser, async (req, res) => {
  try {
    const { from, to } = req.query;

    const cases = await Case.find({
      status: "Closed",
      startingDate: { $gte: new Date(from), $lte: new Date(to) },
    }).sort({ startingDate: 1 });

    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

caseRouter.get("/due/:date", AuthUser, async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const cases = await Case.find({ hearingDates: date });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

caseRouter.get("/status/:cin", AuthUser, async (req, res) => {
  try {
    const courtCase = await Case.findOne({ cin: req.params.cin });

    if (!courtCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(courtCase); // ✅ return the full case details
  } catch (err) {
    console.error("Error fetching case:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// search by keyword
caseRouter.get("/search", AuthUser, async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const results = await Case.find({
      status: "Closed",
      judgmentSummary: { $regex: keyword, $options: "i" },
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

caseRouter.patch("/update-hearing/:cin", AuthUser, async (req, res) => {
  try {
    if (req.user.role !== "registrar") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { newDate } = req.body;
    const updatedCase = await Case.findOneAndUpdate(
      { cin: req.params.cin },
      { $push: { hearingDates: newDate }, status: "Due" },
      { new: true }
    );

    res.json({ message: "Hearing date added", updatedCase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

caseRouter.patch("/adjourn/:cin", AuthUser, async (req, res) => {
  try {
    if (req.user.role !== "registrar") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { reason, newDate } = req.body;

    const updatedCase = await Case.findOneAndUpdate(
      { cin: req.params.cin },
      {
        $push: {
          adjournments: { reason, newDate },
          hearingDates: newDate,
        },
        status: "Due",
      },
      { new: true }
    );

    res.json({ message: "Adjournment added", updatedCase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

caseRouter.patch("/add-summary/:cin", AuthUser, async (req, res) => {
  try {
    if (req.user.role !== "registrar") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { summary } = req.body;

    const updatedCase = await Case.findOneAndUpdate(
      { cin: req.params.cin },
      { $push: { courtSummary: summary } },
      { new: true }
    );

    res.json({ message: "Court summary updated", updatedCase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

caseRouter.patch("/close/:cin", AuthUser, async (req, res) => {
  try {
    if (req.user.role !== "registrar") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { judgmentSummary } = req.body;

    const updatedCase = await Case.findOneAndUpdate(
      { cin: req.params.cin },
      {
        judgmentSummary,
        status: "Closed",
      },
      { new: true }
    );

    res.json({ message: "Case closed and judgment added", updatedCase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = caseRouter;
