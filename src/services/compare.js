import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

function compareImages({
  img1Path,
  img2Path,
  diffPath = "temp/diff.png",
}) {
  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));

  // 🔥 Ensure same dimensions
  const width = Math.min(img1.width, img2.width);
  const height = Math.min(img1.height, img2.height);

  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1, // sensitivity (tune later)
    }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const mismatchPercentage = (mismatchedPixels / totalPixels) * 100;

  const matchScore = 100 - mismatchPercentage;

  return {
    mismatchPercentage: mismatchPercentage.toFixed(2),
    matchScore: matchScore.toFixed(2),
    diffPath,
  };
}

export default compareImages;