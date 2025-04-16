const Case = require("../models/Case");

const generateCIN = async () => {
  const lastCase = await Case.findOne().sort({ _id: -1 });

  let nextNumber = 1;
  if (lastCase && lastCase.cin) {
    const lastCIN = parseInt(lastCase.cin.replace("CIN", ""), 10);
    if (!isNaN(lastCIN)) nextNumber = lastCIN + 1;
  }

  const padded = String(nextNumber).padStart(4, "0");
  return `CIN${padded}`;
};

module.exports = generateCIN;
