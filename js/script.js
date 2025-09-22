document.addEventListener("DOMContentLoaded", function() {
  
  const slogans = [
    "Eat Clean,Live Green.",
    "Fuel your body, fuel your life",
    "Healthy living starts today",
    "Mindful eating, mindful living",
    "Strong body, calm mind"
  ];

  let sloganIndex = 0;
  const sloganElement = document.getElementById("slogan");

  setInterval(() => {
    
    sloganElement.classList.add("slogan-fade");
    setTimeout(() => {
      
      sloganIndex = (sloganIndex + 1) % slogans.length;
      sloganElement.textContent = slogans[sloganIndex];
      
      sloganElement.classList.remove("slogan-fade");
    }, 600);
  }, 3000); 

  
  const tips = [
    "Drink at least 8 glasses of water daily.",
    "Take a 10-minute walk after each meal.",
    "Eat more whole foods and fewer processed ones.",
    "Practice deep breathing for 5 minutes daily.",
    "Sleep 7-8 hours to recharge your body."
  ];

  const today = new Date().getDate();
  document.getElementById("daily-tip").textContent =
    tips[today % tips.length];

  
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("newsletter-email").value;
      if (email) {
        localStorage.setItem("newsletterEmail", email);
        alert("Thank you for subscribing! 🎉");
        newsletterForm.reset();
      }
    });
  }

  
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});