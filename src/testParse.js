import parseFigmaUrl from "./utils/parseFigmaUrl.js"; // Import the parseFigmaUrl function from the utils folder

const figmaUrl =
  "https://www.figma.com/design/lZzaANEmEWvRsAG9ASPPQI/Hero-Banner?node-id=1-4&t=m9YT5urAJNuc1KPF-0"; // Example Figma URL for testing

try {
  const result = parseFigmaUrl(figmaUrl); // Call the function with the test URL

  console.log("Parsed Figma URL:"); // Log the result to the console
  console.log(result);
} catch (error) {
  console.error("Error:", error.message);
}