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

      // addding a weatermarker rem
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

      // Enable download button with improved functionality
      document.getElementById("downloadButton").onclick = () => {
        try {
          // Create a sanitized filename from the user prompt
          const promptText = userPrompt.trim();
          const sanitizedPrompt = promptText.replace(/[^a-z0-9]/gi, '_').substring(0, 30);
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
          const filename = `tshirt_design_${sanitizedPrompt}_${timestamp}.png`;
          
          // Create download link
          const a = document.createElement("a");
          a.href = imageUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          
          // Show success message
          const successMsg = document.createElement("div");
          successMsg.className = "alert alert-success mt-2";
          successMsg.textContent = "Image downloaded successfully!";
          document.getElementById("outer").appendChild(successMsg);
          
          // Remove success message after 3 seconds
          setTimeout(() => {
            successMsg.remove();
          }, 3000);
        } catch (error) {
          console.error("Download error:", error);
          alert("Failed to download the image. Please try again.");
        }
      };
      
  } catch (error) {
      console.error("Error loading image:", error);
      spinner.classList.add("d-none");
      alert("Failed to generate the design. Please try again.");
  }
});

  







  function switchStyle() {
    const styleSheet = document.getElementById("styleSheet");

    if (styleSheet.href.includes("styles.css")) {
        styleSheet.href = "styles2.css";
        localStorage.setItem("theme", "styles2.css"); // Store in localStorage
    } else {
        styleSheet.href = "styles.css";
        localStorage.setItem("theme", "styles.css"); // Store in localStorage
    }
}

// Load stored theme on page load
window.onload = function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.getElementById("styleSheet").href = savedTheme;
    }
};
