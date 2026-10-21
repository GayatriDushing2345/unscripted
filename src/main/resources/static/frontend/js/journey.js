// journey.js
document.addEventListener("DOMContentLoaded", () => {
  const continueBtn = document.querySelector(".primary-btn");

  continueBtn.addEventListener("click", () => {
    const interests = [];
    const skills = [];
    let level = null;

    document.querySelectorAll("input[type='checkbox']").forEach(input => {
      if (input.checked) {
        if (
          ["Technology", "Design", "Business", "Healthcare", "Environment"]
          .includes(input.value)
        ) {
          interests.push(input.value);
        } else {
          skills.push(input.value);
        }
      }
    });

    document.querySelectorAll("input[type='radio']").forEach(input => {
      if (input.checked) {
        level = input.value;
      }
    });

    const userData = {
      interests,
      skills,
      level
    };

    localStorage.setItem("userJourneyData", JSON.stringify(userData));
    window.location.href = "dashboard.html";
  });
});
