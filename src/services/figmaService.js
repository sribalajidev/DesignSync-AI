const FigmaAPIBase = 'https:/api.figma.com/v1';

// Helper function to handle rate limits with retries
function formatTime(ms) {
  if (!ms || ms < 0) return "00:00:00";

  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

async function getFigmaImageUrl({ fileKey, nodeId, token }) {
  try {
    const url = `${FigmaAPIBase}/images/${fileKey}?ids=${nodeId}&format=png&scale=1`;

    console.log("Fetching Figma image...");

    const response = await fetch(url, {
      headers: {
        "X-Figma-Token": token,
      },
    });

    // Handle rate limit
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");

      let delayMs = 0;

      if (retryAfter) {
        if (!isNaN(retryAfter)) {
          // seconds format
          delayMs = parseInt(retryAfter) * 1000;
        } else {
          // date format
          const retryDate = new Date(retryAfter);
          delayMs = retryDate - new Date();
        }
      }

      const formattedTime = formatTime(delayMs);

      throw new Error(
        `Figma API rate limit exceeded. Retry after ${formattedTime} (HH:MM:SS)`
      );
    }

    if (!response.ok) {
      throw new Error(
        `Figma API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    const imageUrl = data.images?.[nodeId];

    if (!imageUrl) {
      throw new Error("Figma image not found for given nodeId");
    }

    console.log("Figma image URL:", imageUrl);

    return imageUrl;
  } catch (error) {
    throw new Error(`Failed to fetch Figma image: ${error.message}`);
  }
}

export default getFigmaImageUrl;