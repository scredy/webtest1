document.getElementById("calcForm").addEventListener("submit", e => {
  e.preventDefault();

  const age = +document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const height = +document.getElementById("height").value;
  const weight = +document.getElementById("weight").value;
  const activity = +document.getElementById("activity").value;

  
  let BMR = 10 * weight + 6.25 * height - 5 * age + (gender === "Male" ? 5 : -161);
  let TDEE = BMR * activity;

  
  const carbs = Math.round((TDEE * 0.5) / 4);   
  const protein = Math.round((TDEE * 0.2) / 4); 
  const fat = Math.round((TDEE * 0.3) / 9);    

 
  document.getElementById("bmrOut").textContent = BMR.toFixed(0);
  document.getElementById("tdeeOut").textContent = TDEE.toFixed(0);

  document.getElementById("carbG").textContent = `${carbs}g`;
  document.getElementById("proteinG").textContent = `${protein}g`;
  document.getElementById("fatG").textContent = `${fat}g`;

  
  const maxCarbs = 400;   
  const maxProtein = 200;
  const maxFat = 120;

  document.getElementById("carbBar").style.width = `${Math.min((carbs / maxCarbs) * 100, 100)}%`;
  document.getElementById("proteinBar").style.width = `${Math.min((protein / maxProtein) * 100, 100)}%`;
  document.getElementById("fatBar").style.width = `${Math.min((fat / maxFat) * 100, 100)}%`;
});

const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

