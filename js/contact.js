document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  
  const feedback = {
    name,
    email,
    message
  };

  localStorage.setItem("feedback", JSON.stringify(feedback));

  
  document.getElementById("confirmation").textContent = 
    `Thank you ${name}, we have received your message. We'll get back to you at ${email} as soon as possible.`;

  
  document.getElementById("contactForm").reset();
});


document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.nextElementSibling.classList.toggle("show");
  });
});


const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
