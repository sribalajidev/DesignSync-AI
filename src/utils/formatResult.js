function formatResult(result) {
  const score = parseFloat(result.matchScore);

  let status = "Good";
  if (score === 100) status = "Perfect Match";
  else if (score > 90) status = "Excellent";
  else if (score > 75) status = "Needs Improvement";
  else status = "Poor Match";

  console.log("\n==============================");
  console.log("UI Validation Result");
  console.log("==============================\n");

  console.log(`Match Score: ${result.matchScore}% (${status})`);
  console.log(`Mismatch: ${result.mismatchPercentage}%\n`);

  console.log("Diff Image:");
  console.log(result.diffPath + "\n");

  if (result.aiAudit) {
    console.log("AI UI Audit:\n");

    // Clean up formatting
    const cleaned = result.aiAudit
      .replace(/\*\*/g, "")       // remove markdown bold
      .replace(/\\n/g, "\n");     // fix newline

    console.log(cleaned);
  }

  console.log("\n==============================\n");
}

export default formatResult;