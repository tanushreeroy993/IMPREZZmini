document.getElementById("promptform").addEventListener("submit", async function(event) {
  event.preventDefault();

  const userPrompt = document.getElementById("prompt").value;
  const prompt = `t-shirt design: ${userPrompt}`;
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

  const spinner = document.getElementById("loadingSpinner");
  const card = document.getElementById("generatedImage");
  const img = document.getElementById("generatedImageImg");
  const downloadButton = document.getElementById("downloadButton");

  // Show loading spinner and hide image
  spinner.classList.remove("d-none");
  card.classList.remove("d-none"); 
  img.classList.add("d-none");
  downloadButton.classList.add("d-none");

  try {
      // Create a new image and wait for it to load
      img.src = imageUrl;
      img.onload = function () {
          spinner.classList.add("d-none");
          img.classList.remove("d-none");
          downloadButton.classList.remove("d-none");
      };

      img.onerror = function () {
          spinner.classList.add("d-none");
          alert("Failed to load image. Please try again.");
      };

      // Enable download button
      downloadButton.onclick = () => {
          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = "generated-design.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      };
      
  } catch (error) {
      console.error("Error loading image:", error);
      spinner.classList.add("d-none");
      alert("Failed to generate the design. Please try again.");
  }
});
