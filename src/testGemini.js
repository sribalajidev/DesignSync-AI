import "dotenv/config";
import { generateUIAudit } from "./services/gemini.js";

async function run() {
  try {
    console.log("Running Gemini UI Audit (local images)...");

    const result = await generateUIAudit({
      figmaPath: "temp/figma.png",
      pagePath: "temp/page.png",
      diffPath: "temp/diff.png",
      matchScore: "90.82", 
    });

    console.log("\n AI UI Audit Result:\n");
    console.log(result);

  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();