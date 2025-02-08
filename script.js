document.getElementById("promptform").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const userPrompt = document.getElementById("prompt").value;
    const prompt = `t-shirt design: ${userPrompt}`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
  
    const spinner = document.getElementById("loadingSpinner");
    const card = document.getElementById("generatedImage");// made my me
    const img = document.getElementById("generatedImageImg");
    const downloadButton = document.getElementById("downloadButton");
  
    spinner.classList.remove("d-none");
    card.classList.remove("d-none"); 
    img.classList.add("d-none");
    downloadButton.classList.add("d-none");
  
    try {
      const imageElement = new Image();
      imageElement.src = imageUrl;
      await imageElement.decode();
  
      spinner.classList.add("d-none");
      img.src = imageUrl;
      img.classList.remove("d-none");
      downloadButton.classList.remove("d-none");
  
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


function switchStyle() {

    const styleSheet = document.getElementById("styleSheet");
  
    if (styleSheet.href.includes("styles.css")) {
  
      styleSheet.href = "styles2.css"; // Switch to style2.css
  
    } else {
  
      styleSheet.href = "styles.css"; // Switch back to style1.css
  
    }
  
  }
