import { Ollama } from "ollama";
import fs from "fs";
import process from "process";

// Ensure the script receives the image file path as an argument
if (process.argv.length !== 3) {
  console.error("Usage: node app.js <image-file>");
  process.exit(1);
}

const imageFilePath = process.argv[2];

// Check if the file exists
if (!fs.existsSync(imageFilePath)) {
  console.error("File not found:", imageFilePath);
  process.exit(1);
}

// Create an instance of the Ollama client
const ollama = new Ollama({ host: "http://localhost:11434" });

// Function to describe the image
async function describeImage(filePath) {
  // Read the image file as a binary buffer
  const imageBuffer = fs.readFileSync(filePath);

  // Encode the image buffer as a Base64 string
  const imageBase64 = imageBuffer.toString("base64");

  // Send the request to the Ollama server
  try {
    const output = await ollama.generate({
      model: "llava:34b",
      prompt: "Describe this image.",
      images: [imageBase64],
    });

    // Log the output
    console.log(output.response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to describe the image
describeImage(imageFilePath);
