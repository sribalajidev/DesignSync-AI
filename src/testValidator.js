import validateUI from "./core/validator.js";

const figmaUrl = "https://www.figma.com/design/lZzaANEmEWvRsAG9ASPPQI/Hero-Banner?node-id=122-2&t=zQExel4ez2DuRwRH-0";
const pageUrl = "http://localhost:5500/";
const token = "figd_LX-p2nbHHct3Hr1V2CZRvkfc2Q16EIqErFzS5pb_";

async function run() {
  try {
    const result = await validateUI({
      figmaUrl,
      pageUrl,
      token,
    });

    console.log("Validation result:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();