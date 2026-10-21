// api.js
document.addEventListener("DOMContentLoaded", () => {
  // Run only on final page
  if (!window.location.pathname.includes("final")) return;

  const container = document.getElementById("finalResults");
  const results = JSON.parse(localStorage.getItem("processedResults"));

  if (!results || results.length === 0) {
    container.innerHTML = "<p class='soft-text'>No results available.</p>";
    return;
  }

  // Render final results
  results.forEach(result => {
    const box = document.createElement("div");
    box.className = "example-box";
    box.style.marginBottom = "16px";

    box.innerHTML = `
      <strong>${result.role}</strong><br/>
      <span class="soft-text">${result.reason || ""}</span>
    `;

    container.appendChild(box);
  });

  // Placeholder for backend API call
  /*
  fetch("/api/process", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(results)
  });
  */
});
