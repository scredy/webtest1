
const minutesInput = document.getElementById('minutes');
const minutesLabel = document.getElementById('minutesLabel');
const timeDisplay  = document.getElementById('timeDisplay');
const startBtn     = document.getElementById('startBtn');
const resetBtn     = document.getElementById('resetBtn');
const tabMedit     = document.getElementById('tabMeditation');
const tabPomo      = document.getElementById('tabPomodoro');
const beep         = document.getElementById('beep');

let mode = 'meditation';         
let running = false;
let remaining = +minutesInput.value * 60;
let tick = null;

function format(s){
  const m = Math.floor(s/60).toString().padStart(2,'0');
  const sec = (s%60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}
function render(){
  minutesLabel.textContent = minutesInput.value;
  timeDisplay.textContent  = format(remaining);
}
function setFromSlider(){
  if (!running) {
    remaining = +minutesInput.value * 60;
    render();
  }
}
function setMode(next){
  if (running) return; 
  mode = next;
  tabMedit.classList.toggle('active', mode === 'meditation');
  tabPomo.classList.toggle('active',  mode === 'pomodoro');

  
  minutesInput.value = mode === 'pomodoro' ? 25 : 15;
  remaining = +minutesInput.value * 60;
  render();
}
function onFinish(){
  
  beep && beep.play();
  saveSession(mode, minutesInput.value);
  renderSessions();

 
  remaining = +minutesInput.value * 60;
  render();
}
function start(){
  if (running) {             
    clearInterval(tick); tick = null; running = false;
    startBtn.innerHTML = `<i class="bi bi-play-fill"></i> Start`;
    return;
  }
 
  running = true;
  startBtn.innerHTML = `<i class="bi bi-pause-fill"></i> Pause`;

  
  clearInterval(tick);
  tick = setInterval(() => {
    remaining = Math.max(remaining - 1, 0);
    render();

    if (remaining <= 0) {
      clearInterval(tick); tick = null; running = false;
      startBtn.innerHTML = `<i class="bi bi-play-fill"></i> Start`;
      onFinish();
    }
  }, 1000);
}
function reset(){
  clearInterval(tick); tick = null; running = false;
  startBtn.innerHTML = `<i class="bi bi-play-fill"></i> Start`;
  remaining = +minutesInput.value * 60;
  render();
}


minutesInput.addEventListener('input', setFromSlider);
tabMedit.addEventListener('click', () => setMode('meditation'));
tabPomo .addEventListener('click', () => setMode('pomodoro'));
startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);
render();


const ambient   = document.getElementById('ambient');
const soundGrid = document.getElementById('soundGrid');

soundGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.sound-btn');
  if (!btn) return;

  
  document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');


  if (btn.dataset.silent) {
    ambient.pause();
    ambient.removeAttribute('src');
    return;
  }

  
  const src = btn.dataset.src;
  if (!src) return;
  ambient.src = src;
  ambient.volume = 0.6; 
  ambient.play().catch(() => {  });
});


function saveSession(type, minutes){
  const list = JSON.parse(localStorage.getItem('sessions') || '[]');
  list.unshift({
    type,
    minutes,
    date: new Date().toISOString().split('T')[0]
  });
  
  localStorage.setItem('sessions', JSON.stringify(list.slice(0, 20)));
}
function renderSessions(){
  const list = JSON.parse(localStorage.getItem('sessions') || '[]');
  const ul = document.getElementById('sessionList');
  if (!ul) return;
  ul.innerHTML = list.map(s => `
    <li>
      <div class="session-info">
        <span>${s.type.charAt(0).toUpperCase() + s.type.slice(1)}</span>
        <span>${s.date}</span>
      </div>
      <div class="session-meta">
        <span class="duration">${s.minutes} min</span>
        <span class="badge">${s.type}</span>
      </div>
    </li>
  `).join('');
}
renderSessions();

const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

