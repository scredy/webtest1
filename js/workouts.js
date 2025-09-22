

let WORKOUTS = [];
let CURRENT_PLAN = [];


const $ = (sel) => document.querySelector(sel);

function shuffle(arr) {
  return arr
    .map(v => [Math.random(), v])
    .sort((a, b) => a[0] - b[0])
    .map(pair => pair[1]);
}

function pickRandom(list, n) {
  return shuffle(list).slice(0, n);
}


function startTimer(seconds, labelEl, barEl) {
  return new Promise((resolve) => {
    const beep = $("#beep");
    let t = seconds;
    labelEl.textContent = `Time: ${t}s`;
    barEl.style.width = "0%";

    const total = seconds;
    const iv = setInterval(() => {
      t--;
      labelEl.textContent = `Time: ${t}s`;
      const pct = Math.max(0, Math.min(100, ((total - t) / total) * 100));
      barEl.style.width = pct + "%";

      if (t <= 0) {
        clearInterval(iv);
        labelEl.textContent = "Done!";
        barEl.style.width = "100%";
        if (beep) beep.play();
        resolve();
      }
    }, 1000);
  });
}


fetch("/data/workouts.json")
  .then(res => res.json())
  .then(data => {
    WORKOUTS = Array.isArray(data) ? data : [];
   
    CURRENT_PLAN = pickRandom(WORKOUTS, 5);
    displayPlan(CURRENT_PLAN);
  })
  .catch(err => {
    console.error("Failed to load /data/workouts.json", err);
    $("#workoutPlan").innerHTML = "<p>Couldn't load workouts.</p>";
  });


$("#workoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const bodyPart = $("#bodyPart").value;     
  const equipment = $("#equipment").value;  

  const filtered = WORKOUTS.filter(w =>
    (bodyPart === "Full Body" || w.bodyPart === bodyPart) &&
    (equipment === "None" ? w.equipment === "None" : w.equipment === "Dumbbells")
  );

  
  CURRENT_PLAN = pickRandom(filtered.length ? filtered : WORKOUTS, 6);
  displayPlan(CURRENT_PLAN);
});


$("#startWorkoutBtn").addEventListener("click", async () => {
  if (!CURRENT_PLAN.length) return;

  
  document.querySelectorAll(".ex-start").forEach(b => b.disabled = true);
  $("#startWorkoutBtn").disabled = true;

 
  for (let i = 0; i < CURRENT_PLAN.length; i++) {
    const id = CURRENT_PLAN[i].id;
    const label = document.getElementById(`t_${id}`);
    const bar   = document.getElementById(`p_${id}`);
    const row   = document.getElementById(`card_${id}`);

   
    row.style.boxShadow = "0 0 0 3px rgba(25,169,116,.2)";
    await startTimer(CURRENT_PLAN[i].duration || 30, label, bar);
    row.style.boxShadow = ""; 
    await new Promise(r => setTimeout(r, 700)); 
  }

  document.querySelectorAll(".ex-start").forEach(b => b.disabled = false);
  $("#startWorkoutBtn").disabled = false;
});


function displayPlan(plan) {
  const wrap = $("#workoutPlan");
  wrap.innerHTML = "";

  if (!plan.length) {
    wrap.innerHTML = "<p>No workouts found. Try a different selection.</p>";
    return;
  }

  plan.forEach(ex => {
    
    const dur = ex.duration || 30;

    const card = document.createElement("div");
    card.className = "w-card";
    card.id = `card_${ex.id}`;

    
    card.innerHTML = `
      <div class="thumb" style="margin:-16px -16px 12px;">
        <img src="${ex.image}" alt="${ex.name}"
             style="width:100%; height:180px; object-fit:cover; display:block; border-radius:12px 12px 0 0;">
      </div>

      <div class="w-head" style="display:flex;align-items:center;gap:8px;">
        <span class="w-icon" style="color:#19a974;font-size:1.1rem;">${ex.icon || ""}</span>
        <h4 style="margin:0;">${ex.name}</h4>
      </div>

      <p class="sets" style="color:#19a974; margin:6px 0;">${ex.sets || `${dur}s`}</p>
      <p class="desc" style="color:#555; font-size:.9rem;">${ex.details || ""}</p>

      <div style="display:flex;align-items:center;gap:10px; margin-top:10px;">
        <button class="btn-green ex-start" data-id="${ex.id}" style="padding:8px 12px;">Start ${dur}s</button>
        <span id="t_${ex.id}" style="min-width:70px;">Ready</span>
      </div>

      <div style="height:8px;background:#eee;border-radius:6px;overflow:hidden;margin-top:8px;">
        <div id="p_${ex.id}" style="height:100%;width:0;background:#19a974;transition:width .3s;"></div>
      </div>
    `;

    wrap.appendChild(card);
  });

  
  document.querySelectorAll(".ex-start").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const ex = plan.find(x => String(x.id) === String(id));
      if (!ex) return;

      btn.disabled = true;
      const label = document.getElementById(`t_${id}`);
      const bar   = document.getElementById(`p_${id}`);
      await startTimer(ex.duration || 30, label, bar);
      btn.disabled = false;
    };
  });
}


const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
