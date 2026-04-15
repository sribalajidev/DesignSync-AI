import takeScreenshot from "./services/screenshot.js"; // Import the takeScreenshot function from the services folder

async function run() {
  try {
    const filePath = await takeScreenshot({
      url: "http://localhost:5500/", // change if needed
      outputPath: "temp/page.png",
    });

    console.log("Screenshot captured at:", filePath);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();