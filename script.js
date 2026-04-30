// Scroll fade-in
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('show'), i * 90);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade').forEach(el => obs.observe(el));

// BMI Calculator
function calcBMI() {
  var name = document.getElementById('uname').value.trim();
  var age  = parseInt(document.getElementById('uage').value);
  var h    = parseFloat(document.getElementById('uheight').value);
  var w    = parseFloat(document.getElementById('uweight').value);
  var goal = document.getElementById('ugoal').value;
  var msg  = document.getElementById('fmsg');

  if (!name || !age || !h || !w) { msg.textContent = '⚠️ Please fill in all fields.'; return; }
  msg.textContent = '';

  var bmi = (w / ((h / 100) * (h / 100))).toFixed(1);
  var cat, diet, workout;

  if (bmi < 18.5) {
    cat = '🔵 UNDERWEIGHT';
    diet = ['High-calorie diet: 2800–3200 kcal/day', 'Protein: 1.8g per kg bodyweight', 'Eat every 3 hrs — 5 meals/day', 'Add nuts, avocado, whole milk', 'Carbs: rice, oats, sweet potato', 'Avoid skipping meals'];
    workout = ['Focus: Strength & mass building', 'Compound lifts 4x per week', 'Squats, deadlifts, bench press', 'Minimal cardio (15 min/session)', 'Progressive overload each week', 'Rest 8+ hours every night'];
  } else if (bmi < 25) {
    cat = '🟢 HEALTHY';
    diet = ['Balanced diet: 2000–2400 kcal/day', 'Protein: 1.4g per kg bodyweight', 'Include veggies in every meal', 'Lean meats, eggs, legumes', 'Limit processed sugar & junk', 'Stay hydrated: 3L water/day'];
    workout = ['Focus: Tone & maintain fitness', 'Mix cardio + strength 5x/week', 'HIIT sessions 2x per week', 'Core and flexibility training', 'Swimming or cycling for cardio', '7–8 hours sleep recommended'];
  } else if (bmi < 30) {
    cat = '🟡 OVERWEIGHT';
    diet = ['Calorie deficit: 1600–1900 kcal/day', 'High protein: fills you up longer', 'No sugary drinks or fast food', 'Eat salads before main meals', 'Cut refined carbs and bread', 'Intermittent fasting (16:8) option'];
    workout = ['Focus: Fat burn & cardio', '45-min cardio 5x per week', 'Brisk walking, cycling, swimming', 'Light weights + high reps', 'Avoid heavy lifting early on', 'Track steps — aim for 10,000/day'];
  } else {
    cat = '🔴 OBESE';
    diet = ['Low calorie: 1200–1500 kcal/day', 'Strictly avoid sugar & fried food', 'Protein-heavy, low-fat meals', 'Vegetables as primary bulk', 'Consult a dietitian for full plan', 'No alcohol or carbonated drinks'];
    workout = ['Focus: Low-impact fat loss', 'Walking 30 min daily to start', 'Water aerobics or swimming', 'No high-impact jumping exercises', 'Gradually increase intensity', 'Consult a trainer before lifting'];
  }

  if (goal === 'gain' && bmi >= 18.5) { diet[0] = 'Add 300–500 extra kcal for muscle gain'; }
  if (goal === 'lose' && bmi < 25) { diet[0] = 'Slight deficit: 200–300 kcal below maintenance'; }

  document.getElementById('bmi-value').textContent = bmi;
  document.getElementById('bmi-cat').textContent = cat;
  document.getElementById('bmi-note').textContent = 'Hello ' + name + ', age ' + age + ' — here is your personalised plan.';
  document.getElementById('result-intro').textContent = 'Based on your inputs, here is everything you need to reach your goal, ' + name + '.';

  var dList = document.getElementById('diet-list');
  var wList = document.getElementById('workout-list');
  dList.innerHTML = ''; wList.innerHTML = '';
  diet.forEach(d => { dList.innerHTML += '<li>' + d + '</li>'; });
  workout.forEach(w => { wList.innerHTML += '<li>' + w + '</li>'; });

  var rs = document.getElementById('result-section');
  rs.style.display = 'block';
  setTimeout(() => rs.querySelectorAll('.fade').forEach(el => el.classList.add('show')), 50);
  rs.scrollIntoView({ behavior: 'smooth' });
}

// Contact form
function sendMsg() {
  var n = document.getElementById('cname').value.trim();
  var e = document.getElementById('cemail').value.trim();
  var m = document.getElementById('cmsg').value.trim();
  var msg = document.getElementById('fmsg');
  if (!n || !e || !m) { showMsg('⚠️ Fill in all fields.', '#c0392b'); return; }
  showMsg('✅ Message sent! We will reply within 24 hours.', '#d4a017');
  document.getElementById('cname').value=''; document.getElementById('cemail').value=''; document.getElementById('cmsg').value='';
}

// Login
function doLogin() {
  var e = document.getElementById('lemail').value.trim();
  var p = document.getElementById('lpass').value;
  if (!e || !p) { showMsg('⚠️ Please fill in all fields.', '#c0392b'); return; }
  if (!e.includes('@')) { showMsg('⚠️ Enter a valid email.', '#c0392b'); return; }
  if (p.length < 6) { showMsg('⚠️ Password too short.', '#c0392b'); return; }
  showMsg('✅ Login successful! Welcome back.', '#d4a017');
}

function showMsg(text, color) {
  var el = document.getElementById('fmsg');
  if (!el) return;
  el.textContent = text; el.style.color = color;
}
