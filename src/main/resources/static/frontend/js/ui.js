// ui.js
document.addEventListener("DOMContentLoaded", () => {
  // Run only on dashboard page
  if (!window.location.pathname.includes("dashboard")) return;

  const data = JSON.parse(localStorage.getItem("journeyData"));
  if (!data) return;

  const container = document.getElementById("appliedResults");

  const results = [];

  if (data.interests.includes("Technology")) {
    results.push({
      role: "Frontend Developer",
      reason: "Interest in technology and logical problem solving"
    });
  }

  if (data.interests.includes("Design")) {
    results.push({
      role: "UI Designer",
      reason: "Interest in design and visual thinking"
    });
  }

  results.forEach(r => {
    const div = document.createElement("div");
    div.className = "example-box";
    div.innerHTML = `
      <strong>${r.role}</strong><br/>
      ${r.reason}
    `;
    container.appendChild(div);
  });

  // Save for final page / API
  localStorage.setItem("processedResults", JSON.stringify(results));
});
