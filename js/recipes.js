document.addEventListener("DOMContentLoaded", function() {
  
  fetch("../data/recipes.json")
    .then(r => r.json())
    .then(recipes => {
      renderCards(recipes);

      
      document.getElementById("search-input").addEventListener("input", e => {
        const q = e.target.value.toLowerCase().trim();
        const filtered = recipes.filter(r =>
          r.title.toLowerCase().includes(q) ||
          (r.description || "").toLowerCase().includes(q)
        );
        renderCards(filtered);
      });

      
      document.getElementById("category-filter").addEventListener("change", e => {
        const cat = e.target.value;
        const filtered = cat === "all" ? recipes : recipes.filter(r => r.category === cat);
        renderCards(filtered);
      });
    })
    .catch(err => console.error("recipes.json load error:", err));

 
  function renderCards(list) {
    const wrap = document.getElementById("recipe-list");
    wrap.innerHTML = "";
    if (!list.length) {
      wrap.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    list.forEach(r => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${r.image}" alt="${r.title}">
        <h3>${r.title}</h3>
        <p>${r.description || ""}</p>
      `;
      card.addEventListener("click", () => openModal(r)); 
      wrap.appendChild(card);
    });
  }


  function openModal(recipe) {
    const modal = document.getElementById("recipe-modal");
    modal.style.display = "flex"; 
    document.body.classList.add("modal-open");

   
    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-ingredients").innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join("");
    document.getElementById("recipe-steps").innerHTML = recipe.steps.map(s => `<li>${s}</li>`).join("");

    const n = recipe.nutrition || {};
    const table = document.getElementById("nutrition-table");

    table.innerHTML = `
      <thead>
        <tr>
          <th style="text-align:left;">Nutrient</th>
          <th style="text-align:left;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(n)
          .map(([k, v]) => `<tr><td>${prettyKey(k)}</td><td>${v}</td></tr>`)
          .join("")}
      </tbody>
    `;
  }

  
  function prettyKey(k) {
    return String(k)
      .replace(/_/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  
  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  const modal = document.getElementById("recipe-modal");
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target.id === "recipe-modal") closeModal(); 
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal(); 
  });

 
  function closeModal() {
    const modal = document.getElementById("recipe-modal");
    if (modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  }


  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});
