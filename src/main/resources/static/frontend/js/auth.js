// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".primary-btn");

  button.addEventListener("click", () => {
    // Placeholder authentication
    // Replace with real auth API later

    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "journey.html";
  });
});
