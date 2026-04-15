import "dotenv/config";
import { getUserInput } from "./cli/interactive.js";
import { runValidation } from "./core/runner.js";
import formatResult from "./utils/formatResult.js";

async function main() {
  const mode = process.argv[2];

  if (mode === "ui") {
    const input = await getUserInput();

    const result = await runValidation({
      pageUrl: input.url,
      figmaUrl: input.figmaUrl,
      figmaFilePath: input.filePath,
      device: input.device,
      enableAI: input.enableAI,
      token: process.env.FIGMA_TOKEN, // Pass Figma token from env
    });

    formatResult(result);
  } else {
    console.log("Use: npm run validate ui");
  }
}

main();