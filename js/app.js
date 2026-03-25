let state = {
  mode: 'all',
  deck: [],
  idx: 0,
  correct: 0,
  wrong: 0,
  skipped: 0,
  answered: false,
  results: [],   // {qid, userAnswer, correct, wasCorrect}
  wrongIds: [],
};

// ══════════════════════════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════════════════════════
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getMessageForScore(pct) {
  if (pct >= 90) return "Outstanding! You're ready to sit the exam. 🎯";
  if (pct >= 75) return "Great work! A bit more review on your weak areas and you'll be set.";
  if (pct >= 60) return "Good foundation. Focus on the elements where you struggled most.";
  if (pct >= 50) return "Keep studying! Review the explanations for the questions you missed.";
  return "Keep going — every question you review brings you closer to passing.";
}

// ══════════════════════════════════════════════════════════════════
//  BUILD DECK
// ══════════════════════════════════════════════════════════════════
function buildDeck() {
  const hist     = STORE.load('ciro_s1_history', {});
  const answered = new Set(Object.keys(hist).map(Number));
  const selected = efGetSelected('s1');

  // Filter by selected elements first, then unseen
  const byElement = OFFICIAL_QUESTIONS.filter(q => selected.has(q.element));
  const unseen    = byElement.filter(q => !answered.has(q.id));
  const pool      = unseen.length ? unseen : byElement; // fallback to all in selected elements

  if (state.mode === 'all')      return shuffle(pool);
  if (state.mode === 'random20') return shuffle(pool).slice(0, 20);
  if (state.mode === 'wrongonly') {
    const wrongSet = state.wrongIds.length ? state.wrongIds : pool.map(q => q.id);
    const wp = pool.filter(q => wrongSet.includes(q.id));
    return shuffle(wp.length ? wp : pool);
  }
  return shuffle(pool);
}

// ══════════════════════════════════════════════════════════════════
//  RENDER QUESTION
// ══════════════════════════════════════════════════════════════════
function renderQuestion() {
  const q = state.deck[state.idx];
  const total = state.deck.length;

  // Progress
  document.getElementById('s1-progress-fill').style.width = `${(state.idx / total) * 100}%`;
  document.getElementById('s1-hdr-q').textContent = state.idx + 1;
  document.getElementById('s1-hdr-total').textContent = total;
  document.getElementById('s1-hdr-score').textContent =
    `${state.correct}/${state.idx} (${state.idx ? Math.round(state.correct/state.idx*100) : 0}%)`;
  document.getElementById('s1-live-score').textContent =
    `✓ ${state.correct}   ✗ ${state.wrong}`;

  // Meta
  document.getElementById('s1-q-counter').textContent = `Question ${state.idx + 1} of ${total}`;
  document.getElementById('s1-q-element').textContent = `Element ${q.element}`;
  document.getElementById('s1-question-text').textContent = q.q;

  // Options
  const list = document.getElementById('s1-options-list');
  list.innerHTML = '';
  Object.entries(q.options).forEach(([key, text]) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.key = key;
    btn.innerHTML = `<span class="opt-letter">${key}</span><span>${text}</span>`;
    btn.addEventListener('click', () => handleAnswer(key));
    list.appendChild(btn);
  });

  // Hide feedback + next
  const fb = document.getElementById('s1-feedback-panel');
  fb.style.display = 'none';
  fb.className = 'feedback-panel';
  const btnNext = document.getElementById('s1-btn-next');
  btnNext.classList.remove('visible');

  // Re-animate card
  const card = document.getElementById('s1-question-card');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = '';

  state.answered = false;

  // Prev button visibility
  document.getElementById('s1-btn-prev').style.display = state.idx > 0 ? 'inline-flex' : 'none';
  // Always show skip when rendering fresh
  document.getElementById('s1-btn-skip').style.display = '';

  // If navigating back into an already-answered question, restore its state
  if (state.idx < state.results.length) {
    restoreS1AnswerState();
  }
}

// ══════════════════════════════════════════════════════════════════
//  HANDLE ANSWER
// ══════════════════════════════════════════════════════════════════
function handleAnswer(selected) {
  if (state.answered) return;
  state.answered = true;

  const q = state.deck[state.idx];
  const isCorrect = selected === q.answer;

  // Style buttons
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(btn => {
    btn.disabled = true;
    const k = btn.dataset.key;
    if (k === q.answer) {
      btn.classList.add('correct');
    } else if (k === selected && !isCorrect) {
      btn.classList.add('wrong');
    } else {
      btn.classList.add('dimmed');
    }
  });

  // Update state
  if (isCorrect) {
    state.correct++;
  } else {
    state.wrong++;
    if (!state.wrongIds.includes(q.id)) state.wrongIds.push(q.id);
  }

  state.results.push({
    qid: q.id, q: q.q, options: q.options,
    userAnswer: selected, correctAnswer: q.answer,
    wasCorrect: isCorrect,
    explanation: q.explanation,
    wrongExp: isCorrect ? null : (q.wrongExplanations?.[selected] ?? null),
    correctText: q.options[q.answer],
    userText: q.options[selected],
  });

  // Show feedback
  showFeedback(isCorrect, q, selected);

  // Show next button
  document.getElementById('s1-btn-next').classList.add('visible');

  // Header score update
  document.getElementById('s1-hdr-score').textContent =
    `${state.correct}/${state.idx + 1} (${Math.round(state.correct/(state.idx+1)*100)}%)`;
  document.getElementById('s1-live-score').textContent =
    `✓ ${state.correct}   ✗ ${state.wrong}`;
}

function showFeedback(isCorrect, q, selected) {
  const panel = document.getElementById('s1-feedback-panel');
  const fbIcon = document.getElementById('s1-fb-icon');
  const fbResult = document.getElementById('s1-fb-result');
  const fbBody = document.getElementById('s1-fb-body');
  const fbCorrect = document.getElementById('s1-fb-correct-answer');
  const fbCorrectText = document.getElementById('s1-fb-correct-text');

  panel.style.display = 'block';

  if (isCorrect) {
    panel.className = 'feedback-panel correct-fb';
    fbIcon.textContent = '✓';
    fbResult.textContent = 'Correct!';
    fbBody.textContent = q.explanation;
    fbCorrect.style.display = 'none';
  } else if (selected === null) {
    panel.className = 'feedback-panel wrong-fb';
    fbIcon.textContent = '↷';
    fbResult.textContent = 'Skipped';
    fbBody.textContent = '';
    fbCorrect.style.display = 'block';
    fbCorrectText.textContent = `${q.answer}: ${q.options[q.answer]} — ${q.explanation}`;
  } else {
    panel.className = 'feedback-panel wrong-fb';
    fbIcon.textContent = '✗';
    fbResult.textContent = 'Not quite.';

    // Why the selected answer is wrong
    const wrongExp = q.wrongExplanations?.[selected];
    fbBody.textContent = wrongExp
      ? `Why ${selected} is wrong: ${wrongExp}`
      : `The correct answer is ${q.answer}.`;

    // Show correct answer with explanation
    fbCorrect.style.display = 'block';
    fbCorrectText.textContent = `${q.answer}: ${q.options[q.answer]} — ${q.explanation}`;
  }
}

function restoreS1AnswerState() {
  const r = state.results[state.idx];
  if (!r) return;
  state.answered = true;
  const q = state.deck[state.idx];
  document.querySelectorAll('#s1-options-list .option-btn').forEach(btn => {
    btn.disabled = true;
    const k = btn.dataset.key;
    if (k === q.answer) btn.classList.add('correct');
    else if (k === r.userAnswer && !r.wasCorrect) btn.classList.add('wrong');
    else btn.classList.add('dimmed');
  });
  showFeedback(r.wasCorrect, q, r.userAnswer);
  document.getElementById('s1-btn-next').classList.add('visible');
  document.getElementById('s1-btn-skip').style.display = 'none';
}

function prevQuestion() {
  if (state.idx === 0) return;
  state.idx--;
  renderQuestion();
}

// ══════════════════════════════════════════════════════════════════
//  NEXT / SKIP
// ══════════════════════════════════════════════════════════════════
function nextQuestion() {
  state.idx++;
  if (state.idx >= state.deck.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function skipQuestion() {
  if (state.answered) { nextQuestion(); return; }
  state.skipped++;
  const q = state.deck[state.idx];
  state.results.push({
    qid: q.id, q: q.q, options: q.options,
    userAnswer: null, correctAnswer: q.answer,
    wasCorrect: false, explanation: q.explanation,
    wrongExp: 'Question was skipped.',
    correctText: q.options[q.answer], userText: 'Skipped',
  });
  if (!state.wrongIds.includes(q.id)) state.wrongIds.push(q.id);
  state.idx++;
  if (state.idx >= state.deck.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

// ══════════════════════════════════════════════════════════════════
//  RESULTS
// ══════════════════════════════════════════════════════════════════
function showResults() {
  document.getElementById('s1-screen-quiz').style.display = 'none';
  const rs = document.getElementById('s1-screen-results');
  rs.style.display = 'block';

  const total = state.results.length;
  const pct = total ? Math.round(state.correct / total * 100) : 0;

  // Ring animation
  const circumference = 439.8;
  const offset = circumference - (pct / 100) * circumference;
  const ring = document.getElementById('s1-ring-fill');
  ring.style.stroke = pct >= 75 ? '#4ade80' : pct >= 50 ? '#facc15' : '#f87171';
  setTimeout(() => { ring.style.strokeDashoffset = offset; }, 100);
  document.getElementById('s1-ring-pct').textContent = pct + '%';

  // Stats
  document.getElementById('s1-res-correct').textContent = state.correct;
  document.getElementById('s1-res-wrong').textContent = state.wrong;
  document.getElementById('s1-res-skipped').textContent = state.skipped;

  document.getElementById('s1-result-title').textContent =
    pct >= 75 ? 'Well Done!' : pct >= 50 ? 'Good Effort' : 'Keep Studying';
  document.getElementById('s1-result-sub').textContent = getMessageForScore(pct);

  const ELEMENT_NAMES = {
    1:'The Client Relationship', 2:'Regulatory Documentation',
    3:'Types & Features', 4:'Derivative Pricing',
    5:'Trading, Clearing & Settlement', 6:'Strategies & Hedging',
    7:'Market Integrity', 8:'Standards of Conduct'
  };

  const breakdown = document.getElementById('s1-element-breakdown');
  const answeredEls = {};
  state.results.forEach(r => {
    const q = OFFICIAL_QUESTIONS.find(q => q.id === r.qid);
    if (q) {
      if (!answeredEls[q.element]) answeredEls[q.element] = { correct: 0, wrong: 0, skipped: 0, total: 0 };
      answeredEls[q.element].total++;
      if (r.wasCorrect) answeredEls[q.element].correct++;
      else if (r.userAnswer === null) answeredEls[q.element].skipped++;
      else answeredEls[q.element].wrong++;
    }
  });

  breakdown.innerHTML = `<div class="eb-title">Performance by Element</div>` +
    Object.entries(answeredEls).sort((a,b)=>+a[0]-+b[0]).map(([el, data]) => {
      const p = data.total ? Math.round(data.correct/data.total*100) : 0;
      return `<div class="eb-row">
        <div class="eb-label">El. ${el} – ${ELEMENT_NAMES[el]||''}</div>
        <div class="eb-counts"><span class="eb-c">✓${data.correct}</span><span class="eb-w">✗${data.wrong}</span><span class="eb-s">↷${data.skipped}</span></div>
        <div class="eb-bar-wrap"><div class="eb-bar-fill" style="width:${p}%;background:${p>=75?'#4ade80':p>=50?'#facc15':'#f87171'}"></div></div>
        <div class="eb-pct">${p}%</div>
      </div>`;
    }).join('');

  // Trigger bar animations
  setTimeout(() => {
    document.querySelectorAll('.eb-bar-fill').forEach(b => { b.style.width = b.style.width; });
  }, 300);
}

function buildReviewList() {
  const list = document.getElementById('s1-review-list');
  const wrongResults = state.results.filter(r => !r.wasCorrect);
  if (!wrongResults.length) {
    list.innerHTML = '<p style="color:#4ade80;text-align:center;padding:20px">Perfect score! No wrong answers to review.</p>';
    list.style.display = 'block';
    return;
  }
  list.style.display = 'flex';
  list.innerHTML = `<h2 style="font-family:'DM Serif Display',serif;color:var(--white);font-size:1.3rem;margin-bottom:4px">Wrong Answers — Review</h2>` +
    wrongResults.map((r, i) => `
      <div class="review-item r-wrong">
        <div class="review-q">Q${i+1}: ${r.q}</div>
        <div class="review-answer">
          Your answer: <span class="wrong-a">${r.userAnswer || 'Skipped'}: ${r.userText}</span><br>
          Correct answer: <span class="correct-a">${r.correctAnswer}: ${r.correctText}</span>
        </div>
        ${r.wrongExp ? `<div class="review-exp"><strong>Why your answer was wrong:</strong> ${r.wrongExp}<br><br><strong>Explanation:</strong> ${r.explanation}</div>` :
          `<div class="review-exp">${r.explanation}</div>`}
      </div>
    `).join('');
}

// ══════════════════════════════════════════════════════════════════
//  START
// ══════════════════════════════════════════════════════════════════
function startQuiz() {
  state.deck = buildDeck();
  state.idx = 0;
  state.correct = 0;
  state.wrong = 0;
  state.skipped = 0;
  state.answered = false;
  state.results = [];

  document.getElementById('s1-screen-start').style.display = 'none';
  document.getElementById('s1-screen-results').style.display = 'none';
  document.getElementById('s1-screen-quiz').style.display = 'block';
  document.getElementById('s1-review-list').style.display = 'none';
  document.getElementById('s1-hdr-total').textContent = state.deck.length;

  renderQuestion();
}

// ══════════════════════════════════════════════════════════════════
//  EVENT LISTENERS
// ══════════════════════════════════════════════════════════════════
document.querySelectorAll('#s1-mode-picker .mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#s1-mode-picker .mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.mode = btn.dataset.mode;
  });
});

document.getElementById('s1-btn-start').addEventListener('click', startQuiz);
document.getElementById('s1-btn-next').addEventListener('click', nextQuestion);
document.getElementById('s1-btn-skip').addEventListener('click', skipQuestion);
document.getElementById('s1-btn-prev').addEventListener('click', prevQuestion);

document.getElementById('s1-btn-retry').addEventListener('click', () => {
  document.getElementById('s1-screen-results').style.display = 'none';
  document.getElementById('s1-screen-start').style.display = 'block';
});

document.getElementById('s1-btn-review-wrongs').addEventListener('click', () => {
  buildReviewList();
  document.getElementById('s1-btn-review-wrongs').textContent = 'Hide Review';
  document.getElementById('s1-btn-review-wrongs').onclick = () => {
    document.getElementById('s1-review-list').style.display = 'none';
    document.getElementById('s1-btn-review-wrongs').textContent = 'Review Wrong Answers';
    document.getElementById('s1-btn-review-wrongs').onclick = null;
    document.getElementById('s1-btn-review-wrongs').addEventListener('click', arguments.callee);
  };
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  const screen = document.getElementById('s1-screen-quiz');
  if (screen.style.display === 'none') return;

  if (['a','b','c','d'].includes(e.key.toLowerCase()) && !state.answered) {
    handleAnswer(e.key.toUpperCase());
  }
  if ((e.key === 'Enter' || e.key === 'ArrowRight') && state.answered) {
    nextQuestion();
  }
  if (e.key === 's' && !state.answered) skipQuestion();
});


// ══════════════════════════════════════════════════════════════════
//  TAB SWITCHING
// ══════════════════════════════════════════════════════════════════
document.querySelectorAll('.site-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.site;
    document.querySelectorAll('.site-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.site-container').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
    window.scrollTo(0, 0);
    if (target === 'site3') window.initPayoffCharts && window.initPayoffCharts();
  });
});

// ══════════════════════════════════════════════════════════════════
//  SITE 2 ENGINE (mirrors site 1 engine with s2 prefix)
// ══════════════════════════════════════════════════════════════════
let s2 = {
  mode: 'all', deck: [], idx: 0, correct: 0, wrong: 0, skipped: 0,
  answered: false, results: [], wrongIds: [],
};

function s2shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function s2buildDeck() {
  const hist     = STORE.load('ciro_s2_history', {});
  const answered = new Set(Object.keys(hist).map(Number));
  const selected = efGetSelected('s2');

  const byElement = NOTES_QUESTIONS.filter(q => selected.has(q.element));
  const unseen    = byElement.filter(q => !answered.has(q.id));
  const pool      = unseen.length ? unseen : byElement;

  if (s2.mode==='all')      return s2shuffle(pool);
  if (s2.mode==='random20') return s2shuffle(pool).slice(0,20);
  if (s2.mode==='wrongonly'){
    const ids=s2.wrongIds.length?s2.wrongIds:pool.map(q=>q.id);
    const wp=pool.filter(q=>ids.includes(q.id));
    return s2shuffle(wp.length?wp:pool);
  }
  return s2shuffle(pool);
}

function s2render() {
  const q=s2.deck[s2.idx], total=s2.deck.length;
  document.getElementById('s2-progress-fill').style.width=`${(s2.idx/total)*100}%`;
  document.getElementById('s2-hdr-q').textContent=s2.idx+1;
  document.getElementById('s2-hdr-total').textContent=total;
  document.getElementById('s2-hdr-score').textContent=`${s2.correct}/${s2.idx} (${s2.idx?Math.round(s2.correct/s2.idx*100):0}%)`;
  document.getElementById('s2-live-score').textContent=`✓ ${s2.correct}   ✗ ${s2.wrong}`;
  document.getElementById('s2-q-counter').textContent=`Question ${s2.idx+1} of ${total}`;
  document.getElementById('s2-q-element').textContent=`Element ${q.element}`;
  document.getElementById('s2-question-text').textContent=q.q;
  const list=document.getElementById('s2-options-list');
  list.innerHTML='';
  Object.entries(q.options).forEach(([key,text])=>{
    const btn=document.createElement('button');
    btn.className='option-btn'; btn.dataset.key=key;
    btn.innerHTML=`<span class="opt-letter">${key}</span><span>${text}</span>`;
    btn.addEventListener('click',()=>s2answer(key));
    list.appendChild(btn);
  });
  const fb=document.getElementById('s2-feedback-panel');
  fb.style.display='none'; fb.className='feedback-panel';
  document.getElementById('s2-btn-next').classList.remove('visible');
  const card=document.getElementById('s2-question-card');
  card.style.animation='none'; card.offsetHeight; card.style.animation='';
  s2.answered=false;

  document.getElementById('s2-btn-prev').style.display = s2.idx > 0 ? 'inline-flex' : 'none';
  document.getElementById('s2-btn-skip').style.display = '';
  if (s2.idx < s2.results.length) { s2restoreAnswerState(); }
}

function s2answer(selected) {
  if(s2.answered)return;
  s2.answered=true;
  const q=s2.deck[s2.idx];
  const isCorrect=selected===q.answer;
  document.querySelectorAll('#s2-options-list .option-btn').forEach(btn=>{
    btn.disabled=true;
    const k=btn.dataset.key;
    if(k===q.answer)btn.classList.add('correct');
    else if(k===selected&&!isCorrect)btn.classList.add('wrong');
    else btn.classList.add('dimmed');
  });
  if(isCorrect)s2.correct++;
  else{s2.wrong++;if(!s2.wrongIds.includes(q.id))s2.wrongIds.push(q.id);}
  s2.results.push({qid:q.id,q:q.q,options:q.options,userAnswer:selected,correctAnswer:q.answer,wasCorrect:isCorrect,explanation:q.explanation,wrongExp:isCorrect?null:(q.wrongExplanations?.[selected]??null),correctText:q.options[q.answer],userText:q.options[selected]});
  // Show feedback
  const panel=document.getElementById('s2-feedback-panel');
  const fbIcon=document.getElementById('s2-fb-icon');
  const fbResult=document.getElementById('s2-fb-result');
  const fbBody=document.getElementById('s2-fb-body');
  const fbCorrect=document.getElementById('s2-fb-correct-answer');
  const fbCorrectText=document.getElementById('s2-fb-correct-text');
  panel.style.display='block';
  if(isCorrect){
    panel.className='feedback-panel correct-fb';
    fbIcon.textContent='✓'; fbResult.textContent='Correct!';
    fbBody.textContent=q.explanation; fbCorrect.style.display='none';
  } else {
    panel.className='feedback-panel wrong-fb';
    fbIcon.textContent='✗'; fbResult.textContent='Not quite.';
    const wrongExp=q.wrongExplanations?.[selected];
    fbBody.textContent=wrongExp?`Why ${selected} is wrong: ${wrongExp}`:`The correct answer is ${q.answer}.`;
    fbCorrect.style.display='block';
    fbCorrectText.textContent=`${q.answer}: ${q.options[q.answer]} — ${q.explanation}`;
  }
  document.getElementById('s2-btn-next').classList.add('visible');
  document.getElementById('s2-hdr-score').textContent=`${s2.correct}/${s2.idx+1} (${Math.round(s2.correct/(s2.idx+1)*100)}%)`;
  document.getElementById('s2-live-score').textContent=`✓ ${s2.correct}   ✗ ${s2.wrong}`;
}

function s2restoreAnswerState() {
  const r = s2.results[s2.idx];
  if (!r) return;
  s2.answered = true;
  const q = s2.deck[s2.idx];
  document.querySelectorAll('#s2-options-list .option-btn').forEach(btn => {
    btn.disabled = true;
    const k = btn.dataset.key;
    if (k === q.answer) btn.classList.add('correct');
    else if (k === r.userAnswer && !r.wasCorrect) btn.classList.add('wrong');
    else btn.classList.add('dimmed');
  });
  const panel=document.getElementById('s2-feedback-panel');
  const fbIcon=document.getElementById('s2-fb-icon');
  const fbResult=document.getElementById('s2-fb-result');
  const fbBody=document.getElementById('s2-fb-body');
  const fbCorrect=document.getElementById('s2-fb-correct-answer');
  const fbCorrectText=document.getElementById('s2-fb-correct-text');
  panel.style.display='block';
  if (r.wasCorrect) {
    panel.className='feedback-panel correct-fb';
    fbIcon.textContent='✓'; fbResult.textContent='Correct!';
    fbBody.textContent=q.explanation; fbCorrect.style.display='none';
  } else if (r.userAnswer === null) {
    panel.className='feedback-panel wrong-fb';
    fbIcon.textContent='↷'; fbResult.textContent='Skipped';
    fbBody.textContent=''; fbCorrect.style.display='block';
    fbCorrectText.textContent=`${q.answer}: ${q.options[q.answer]} — ${q.explanation}`;
  } else {
    panel.className='feedback-panel wrong-fb';
    fbIcon.textContent='✗'; fbResult.textContent='Not quite.';
    const wrongExp=q.wrongExplanations?.[r.userAnswer];
    fbBody.textContent=wrongExp?`Why ${r.userAnswer} is wrong: ${wrongExp}`:`The correct answer is ${q.answer}.`;
    fbCorrect.style.display='block';
    fbCorrectText.textContent=`${q.answer}: ${q.options[q.answer]} — ${q.explanation}`;
  }
  document.getElementById('s2-btn-next').classList.add('visible');
  document.getElementById('s2-btn-skip').style.display='none';
}

function s2prev() {
  if (s2.idx === 0) return;
  s2.idx--;
  s2render();
}

function s2next() {
  s2.idx++;
  if(s2.idx>=s2.deck.length)s2results();
  else s2render();
}

function s2skip() {
  if(s2.answered){s2next();return;}
  s2.skipped++;
  const q=s2.deck[s2.idx];
  s2.results.push({qid:q.id,q:q.q,options:q.options,userAnswer:null,correctAnswer:q.answer,wasCorrect:false,explanation:q.explanation,wrongExp:'Question was skipped.',correctText:q.options[q.answer],userText:'Skipped'});
  if(!s2.wrongIds.includes(q.id))s2.wrongIds.push(q.id);
  s2.idx++;
  if(s2.idx>=s2.deck.length)s2results();
  else s2render();
}

const ELEMENT_NAMES_S2={1:'The Client Relationship',2:'Regulatory Documentation',3:'Types & Features',4:'Derivative Pricing',5:'Trading, Clearing & Settlement',6:'Strategies & Hedging',7:'Market Integrity',8:'Standards of Conduct'};

function s2results() {
  document.getElementById('s2-screen-quiz').style.display='none';
  const rs=document.getElementById('s2-screen-results');
  rs.style.display='block';
  const total=s2.results.length, pct=total?Math.round(s2.correct/total*100):0;
  const ring=document.getElementById('s2-ring-fill');
  const circ=439.8, offset=circ-(pct/100)*circ;
  ring.style.stroke=pct>=75?'#4ade80':pct>=50?'#facc15':'#f87171';
  setTimeout(()=>{ring.style.strokeDashoffset=offset;},100);
  document.getElementById('s2-ring-pct').textContent=pct+'%';
  document.getElementById('s2-res-correct').textContent=s2.correct;
  document.getElementById('s2-res-wrong').textContent=s2.wrong;
  document.getElementById('s2-res-skipped').textContent=s2.skipped;
  document.getElementById('s2-result-title').textContent=pct>=75?'Well Done!':pct>=50?'Good Effort':'Keep Studying';
  document.getElementById('s2-result-sub').textContent=pct>=90?"Outstanding! Your notes knowledge is excellent."
    :pct>=75?"Great work! Focus on the elements where you struggled most."
    :pct>=60?"Good foundation. Review the explanations for questions you missed."
    :"Keep going — the explanations after each answer will build your understanding.";
  const answeredEls={};
  s2.results.forEach(r=>{
    const q=NOTES_QUESTIONS.find(q=>q.id===r.qid);
    if(q){
      if(!answeredEls[q.element])answeredEls[q.element]={correct:0,wrong:0,skipped:0,total:0};
      answeredEls[q.element].total++;
      if(r.wasCorrect)answeredEls[q.element].correct++;
      else if(r.userAnswer===null)answeredEls[q.element].skipped++;
      else answeredEls[q.element].wrong++;
    }
  });
  document.getElementById('s2-element-breakdown').innerHTML=`<div class="eb-title">Performance by Element</div>`+
    Object.entries(answeredEls).sort((a,b)=>+a[0]-+b[0]).map(([el,data])=>{
      const p=data.total?Math.round(data.correct/data.total*100):0;
      return `<div class="eb-row"><div class="eb-label">El. ${el} – ${ELEMENT_NAMES_S2[el]||''}</div><div class="eb-counts"><span class="eb-c">✓${data.correct}</span><span class="eb-w">✗${data.wrong}</span><span class="eb-s">↷${data.skipped}</span></div><div class="eb-bar-wrap"><div class="eb-bar-fill" style="width:${p}%;background:${p>=75?'#4ade80':p>=50?'#facc15':'#f87171'}"></div></div><div class="eb-pct">${p}%</div></div>`;
    }).join('');
}

function s2startQuiz() {
  s2.deck=s2buildDeck(); s2.idx=0; s2.correct=0; s2.wrong=0; s2.skipped=0;
  s2.answered=false; s2.results=[];
  document.getElementById('s2-screen-start').style.display='none';
  document.getElementById('s2-screen-results').style.display='none';
  document.getElementById('s2-screen-quiz').style.display='block';
  document.getElementById('s2-review-list').style.display='none';
  document.getElementById('s2-hdr-total').textContent=s2.deck.length;
  s2render();
}

// Site 2 events
document.querySelectorAll('#s2-mode-picker .mode-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#s2-mode-picker .mode-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); s2.mode=btn.dataset.mode;
  });
});
document.getElementById('s2-btn-start').addEventListener('click',s2startQuiz);
document.getElementById('s2-btn-next').addEventListener('click',s2next);
document.getElementById('s2-btn-skip').addEventListener('click',s2skip);
document.getElementById('s2-btn-prev').addEventListener('click',s2prev);
document.getElementById('s2-btn-retry').addEventListener('click',()=>{
  document.getElementById('s2-screen-results').style.display='none';
  document.getElementById('s2-screen-start').style.display='block';
});
document.getElementById('s2-btn-review-wrongs').addEventListener('click',()=>{
  const list=document.getElementById('s2-review-list');
  const wrongResults=s2.results.filter(r=>!r.wasCorrect);
  if(!wrongResults.length){
    list.innerHTML='<p style="color:#4ade80;text-align:center;padding:20px">Perfect score! No wrong answers to review.</p>';
  } else {
    list.style.display='flex';
    list.innerHTML=`<h2 style="font-family:'DM Serif Display',serif;color:var(--white);font-size:1.3rem;margin-bottom:4px">Wrong Answers — Review</h2>`+
    wrongResults.map((r,i)=>`
      <div class="review-item r-wrong">
        <div class="review-q">Q${i+1}: ${r.q}</div>
        <div class="review-answer">
          Your answer: <span class="wrong-a">${r.userAnswer||'Skipped'}: ${r.userText}</span><br>
          Correct answer: <span class="correct-a">${r.correctAnswer}: ${r.correctText}</span>
        </div>
        ${r.wrongExp?`<div class="review-exp"><strong>Why your answer was wrong:</strong> ${r.wrongExp}<br><br><strong>Explanation:</strong> ${r.explanation}</div>`
          :`<div class="review-exp">${r.explanation}</div>`}
      </div>`).join('');
  }
  list.style.display='flex';
});

// Keyboard shortcuts (context-aware)
document.addEventListener('keydown', e => {
  const activeSite = document.querySelector('.site-container.active').id;
  if (activeSite === 'site1') {
    const screen = document.getElementById('s1-screen-quiz');
    if (!screen || screen.style.display === 'none') return;
    if (['a','b','c','d'].includes(e.key.toLowerCase()) && !state.answered) handleAnswer(e.key.toUpperCase());
    if ((e.key === 'Enter' || e.key === 'ArrowRight') && state.answered) nextQuestion();
    if (e.key === 'ArrowLeft') prevQuestion();
    if (e.key === 's' && !state.answered) skipQuestion();
  } else {
    const screen = document.getElementById('s2-screen-quiz');
    if (!screen || screen.style.display === 'none') return;
    if (['a','b','c','d'].includes(e.key.toLowerCase()) && !s2.answered) s2answer(e.key.toUpperCase());
    if ((e.key === 'Enter' || e.key === 'ArrowRight') && s2.answered) s2next();
    if (e.key === 'ArrowLeft') s2prev();
    if (e.key === 's' && !s2.answered) s2skip();
  }
});


// ══════════════════════════════════════════════════════════════════
//  PERSISTENCE — localStorage layer
//  Keys:
//    ciro_s1_history  : { [qid]: { attempts, correct, lastSeen } }
//    ciro_s1_sessions : [ { date, score, total, pct } ]  (last 20)
//    ciro_s1_wrongIds : [qid, ...]
//    ciro_s2_history  : same structure for site 2
//    ciro_s2_sessions : same
//    ciro_s2_wrongIds : same
// ══════════════════════════════════════════════════════════════════

const STORE = {
  load(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e) { return fallback; }
  },
  save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  },
  clear(prefix) {
    ['history','sessions','wrongIds'].forEach(k => {
      try { localStorage.removeItem(prefix + k); } catch(e) {}
    });
  }
};

// ── Load persisted wrong IDs into state on boot ────────────────────────────
state.wrongIds = STORE.load('ciro_s1_wrongIds', []);
s2.wrongIds    = STORE.load('ciro_s2_wrongIds', []);

// ── Save wrong IDs whenever they change ───────────────────────────────────
function persistWrongIds(prefix, ids) {
  STORE.save('ciro_' + prefix + '_wrongIds', ids);
}

// ── Record a question result in history ───────────────────────────────────
function recordResult(prefix, qid, wasCorrect) {
  const hist = STORE.load('ciro_' + prefix + '_history', {});
  if (!hist[qid]) hist[qid] = { attempts: 0, correct: 0, lastSeen: null };
  hist[qid].attempts++;
  if (wasCorrect) hist[qid].correct++;
  hist[qid].lastSeen = new Date().toISOString();
  STORE.save('ciro_' + prefix + '_history', hist);
}

// ── Record a completed session ─────────────────────────────────────────────
function recordSession(prefix, correct, total) {
  const sessions = STORE.load('ciro_' + prefix + '_sessions', []);
  sessions.unshift({
    date: new Date().toLocaleDateString('en-CA', {month:'short',day:'numeric',year:'numeric'}),
    time: new Date().toLocaleTimeString('en-CA', {hour:'2-digit',minute:'2-digit'}),
    correct, total,
    pct: total ? Math.round(correct / total * 100) : 0,
  });
  STORE.save('ciro_' + prefix + '_sessions', sessions.slice(0, 30));
}

// ── Render the stats panel on the start screen ─────────────────────────────
function renderStats(prefix, totalQs) {
  const hist     = STORE.load('ciro_' + prefix + '_history', {});
  const sessions = STORE.load('ciro_' + prefix + '_sessions', []);
  const panel    = document.getElementById(prefix + '-persist-stats');
  if (!panel) return;

  const attempted = Object.keys(hist).length;
  const correct   = Object.values(hist).reduce((s, q) => s + q.correct, 0);
  const wrong     = Object.values(hist).reduce((s, q) => s + (q.attempts - q.correct), 0);
  const bestPct   = sessions.length ? Math.max(...sessions.map(s => s.pct)) : null;
  const seenPct   = Math.round((attempted / totalQs) * 100);

  document.getElementById(prefix + '-ps-attempted').textContent = attempted;
  document.getElementById(prefix + '-ps-correct').textContent   = correct;
  document.getElementById(prefix + '-ps-wrong').textContent     = wrong;
  document.getElementById(prefix + '-ps-pct').textContent       = bestPct !== null ? bestPct + '%' : '—';
  document.getElementById(prefix + '-ps-seen').textContent      = attempted;
  document.getElementById(prefix + '-ps-bar').style.width       = seenPct + '%';

  panel.style.display = attempted > 0 ? 'block' : 'none';
}

// ── Reset button handlers ──────────────────────────────────────────────────
document.getElementById('s1-ps-reset').addEventListener('click', () => {
  if (!confirm('Reset all Site 1 progress? This cannot be undone.')) return;
  STORE.clear('ciro_s1_');
  state.wrongIds = [];
  renderStats('s1', 120);
  document.getElementById('s1-persist-stats').style.display = 'none';
});
document.getElementById('s2-ps-reset').addEventListener('click', () => {
  if (!confirm('Reset all Site 2 progress? This cannot be undone.')) return;
  STORE.clear('ciro_s2_');
  s2.wrongIds = [];
  renderStats('s2', 80);
  document.getElementById('s2-persist-stats').style.display = 'none';
});

// ── Hook into Site 1 answer handler ───────────────────────────────────────
const _origHandleAnswer = handleAnswer;
window.handleAnswer = function(selected) {
  _origHandleAnswer(selected);
  // After the original runs, persist the result
  const q = state.deck[state.idx];
  if (q) {
    const wasCorrect = selected === q.answer;
    recordResult('s1', q.id, wasCorrect);
    if (!wasCorrect && !state.wrongIds.includes(q.id)) {
      state.wrongIds.push(q.id);
    }
    persistWrongIds('s1', state.wrongIds);
    // Update streak badge
    updateStreakBadge('s1');
  }
};

// ── Hook into Site 2 answer handler ───────────────────────────────────────
const _origS2Answer = s2answer;
window.s2answer = function(selected) {
  _origS2Answer(selected);
  const q = s2.deck[s2.idx];
  if (q) {
    const wasCorrect = selected === q.answer;
    recordResult('s2', q.id, wasCorrect);
    if (!wasCorrect && !s2.wrongIds.includes(q.id)) {
      s2.wrongIds.push(q.id);
    }
    persistWrongIds('s2', s2.wrongIds);
    updateStreakBadge('s2');
  }
};

// ── Hook into results screens to save session ─────────────────────────────
const _origShowResults = showResults;
window.showResults = function() {
  _origShowResults();
  recordSession('s1', state.correct, state.results.length);
  renderStats('s1', 120);
  appendSessionHistory('s1');
};

const _origS2Results = s2results;
window.s2results = function() {
  _origS2Results();
  recordSession('s2', s2.correct, s2.results.length);
  renderStats('s2', 80);
  appendSessionHistory('s2');
};

// ── Session history table on results screen ───────────────────────────────
function appendSessionHistory(prefix) {
  const sessions = STORE.load('ciro_' + prefix + '_sessions', []);
  if (sessions.length < 2) return; // only show if there's history to compare
  const breakdown = document.getElementById(prefix === 's1' ? 'element-breakdown' : prefix + '-element-breakdown');
  if (!breakdown) return;

  let html = `<div style="margin-top:28px">
    <div class="eb-title" style="margin-bottom:14px">📅 Session History</div>
    <table style="width:100%;border-collapse:collapse;font-family:'DM Mono',monospace;font-size:0.75rem;">
      <tr style="color:#64748b;text-align:left;border-bottom:1px solid #ffffff10">
        <th style="padding:6px 10px;font-weight:500">Date</th>
        <th style="padding:6px 10px;font-weight:500">Time</th>
        <th style="padding:6px 10px;font-weight:500">Score</th>
        <th style="padding:6px 10px;font-weight:500">Result</th>
      </tr>`;
  sessions.slice(0, 10).forEach((s, i) => {
    const col = s.pct >= 75 ? '#4ade80' : s.pct >= 50 ? '#facc15' : '#f87171';
    html += `<tr style="border-bottom:1px solid #ffffff08;${i===0?'background:#ffffff05':''}">
      <td style="padding:7px 10px;color:#94a3b8">${s.date}</td>
      <td style="padding:7px 10px;color:#64748b">${s.time||''}</td>
      <td style="padding:7px 10px;color:${col};font-weight:500">${s.pct}% (${s.correct}/${s.total})</td>
      <td style="padding:7px 10px">
        <div style="height:6px;width:${s.pct}%;background:${col};border-radius:99px;min-width:2px"></div>
      </td>
    </tr>`;
  });
  html += '</table></div>';

  const existing = breakdown.querySelector('.session-history-wrap');
  if (existing) existing.remove();
  const wrap = document.createElement('div');
  wrap.className = 'session-history-wrap';
  wrap.innerHTML = html;
  breakdown.appendChild(wrap);
}

// ── Streak badge in quiz header ────────────────────────────────────────────
function updateStreakBadge(prefix) {
  const results = prefix === 's1' ? state.results : s2.results;
  let streak = 0;
  for (let i = results.length - 1; i >= 0; i--) {
    if (results[i].wasCorrect) streak++; else break;
  }
  const counter = document.getElementById(prefix === 's1' ? 's1-q-counter' : 's2-q-counter');
  if (!counter) return;
  let badge = counter.querySelector('.streak-badge');
  if (streak >= 3) {
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'streak-badge';
      counter.appendChild(badge);
    }
    badge.textContent = '🔥 ' + streak + ' streak';
  } else if (badge) {
    badge.remove();
  }
}

// ── Patch skip functions to record skipped questions ──────────────────────
const _origSkip = skipQuestion;
window.skipQuestion = function() {
  const q = state.deck[state.idx];
  _origSkip();
  if (q && !state.answered) { // was not answered before skip
    // already pushed to results in original skipQuestion
    persistWrongIds('s1', state.wrongIds);
  }
};
const _origS2Skip = s2skip;
window.s2skip = function() {
  const q = s2.deck[s2.idx];
  _origS2Skip();
  if (q) persistWrongIds('s2', s2.wrongIds);
};

// ── On page load stats calls moved to end of script ──────────────────────


// ── NOTES TAB: search + scroll spy ──────────────────────────────
(function() {
  const searchInput = document.getElementById('notes-search');
  const navItems    = document.querySelectorAll('.notes-nav-item');
  const sections    = document.querySelectorAll('.notes-section');
  const content     = document.getElementById('notes-content');

  // Returns the active scroll container (desktop: notes-content, mobile: window)
  function scrollEl() {
    return content.offsetHeight < content.scrollHeight ? content : window;
  }

  // Smooth scroll from sidebar nav links
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute('href'));
      if (!target || !content) return;
      const scroller = scrollEl();
      if (scroller === window) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        const top = target.getBoundingClientRect().top
                  - content.getBoundingClientRect().top
                  + content.scrollTop - 20;
        content.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Scroll spy — highlight active nav item
  function runSpy() {
    const scroller = scrollEl();
    const offset   = scroller === window ? 100 : 80;
    let current = sections.length ? sections[0].id : '';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= offset) current = sec.id;
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + current);
    });
  }
  if (content) {
    content.addEventListener('scroll', runSpy, { passive: true });
    window.addEventListener('scroll', () => {
      if (document.getElementById('site3').classList.contains('active')) runSpy();
    }, { passive: true });
    runSpy();
  }

  // Live search — highlight matching text and jump to first result
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        // Remove old highlights by restoring text nodes
        document.querySelectorAll('.search-highlight').forEach(el => {
          const parent = el.parentNode;
          if (parent) { parent.replaceChild(document.createTextNode(el.textContent), el); parent.normalize(); }
        });
        const q = searchInput.value.trim();
        if (!q || q.length < 2) return;
        const qLower = q.toLowerCase();
        let firstMatch = null;
        sections.forEach(sec => {
          const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT, null, false);
          const nodes = [];
          let node;
          while ((node = walker.nextNode())) nodes.push(node);
          nodes.forEach(textNode => {
            const par = textNode.parentNode;
            if (!par || !content.contains(par)) return;
            if (['SCRIPT','STYLE','INPUT'].includes(par.tagName)) return;
            const text = textNode.textContent;
            const idx  = text.toLowerCase().indexOf(qLower);
            if (idx === -1) return;
            const hl   = document.createElement('mark');
            hl.className = 'search-highlight';
            hl.textContent = text.slice(idx, idx + q.length);
            const after  = document.createTextNode(text.slice(idx + q.length));
            const before = document.createTextNode(text.slice(0, idx));
            par.replaceChild(after, textNode);
            par.insertBefore(hl, after);
            par.insertBefore(before, hl);
            if (!firstMatch) firstMatch = hl;
          });
        });
        if (firstMatch && content) {
          setTimeout(() => firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
        }
      }, 280);
    });
  }
})();


// ══════════════════════════════════════════════════════════════════
//  SITE 4 — MATH DRILL ENGINE
// ══════════════════════════════════════════════════════════════════

function rnd(min,max,step){step=step||1;const steps=Math.floor((max-min)/step)+1;return min+Math.floor(Math.random()*steps)*step;}
function rndArr(arr){return arr[Math.floor(Math.random()*arr.length)];}
function fmt(n){if(n>=1000000)return'$'+(n/1000000).toFixed(1).replace(/\.0$/,'')+'M';if(n>=1000)return'$'+n.toLocaleString();return'$'+n;}
function fmtN(n){return n.toLocaleString();}
function shuffle4(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}

function makeOptions(correct,wrongs,fmt_fn){
  fmt_fn=fmt_fn||(x=>'$'+x.toLocaleString());
  const wrongSet=shuffle4(wrongs.filter(w=>w!==correct)).slice(0,3);
  const all=shuffle4([correct,...wrongSet]);
  const letters=['A','B','C','D'];
  const opts={};let correctKey='';
  all.forEach((val,i)=>{opts[letters[i]]=fmt_fn(val);if(val===correct)correctKey=letters[i];});
  return{options:opts,answer:correctKey};
}


// ── PERSISTENCE ─────────────────────────────────────────────────────────────
const mathState={mode:'unseen',deck:[],idx:0,correct:0,wrong:0,skipped:0,answered:false,results:[],wrongIds:[],generatedQs:[]};
function mathSave(k,v){try{localStorage.setItem('ciro_math_'+k,JSON.stringify(v));}catch(e){}}
function mathLoad(k,fb){try{const v=localStorage.getItem('ciro_math_'+k);return v?JSON.parse(v):fb;}catch(e){return fb;}}
mathState.wrongIds=mathLoad('wrongIds',[]);

function mathRecordResult(id,ok){const h=mathLoad('history',{});if(!h[id])h[id]={attempts:0,correct:0};h[id].attempts++;if(ok)h[id].correct++;mathSave('history',h);}
function mathRecordSession(c,t){const s=mathLoad('sessions',[]);s.unshift({date:new Date().toLocaleDateString('en-CA',{month:'short',day:'numeric',year:'numeric'}),time:new Date().toLocaleTimeString('en-CA',{hour:'2-digit',minute:'2-digit'}),correct:c,total:t,pct:t?Math.round(c/t*100):0});mathSave('sessions',s.slice(0,30));}

function mathRenderStats(){
  const h=mathLoad('history',{}),s=mathLoad('sessions',[]),tot=MATH_TEMPLATES.length,seen=Object.keys(h).length;
  const cor=Object.values(h).reduce((a,q)=>a+q.correct,0),wrg=Object.values(h).reduce((a,q)=>a+(q.attempts-q.correct),0);
  const best=s.length?Math.max(...s.map(x=>x.pct)):null;
  document.getElementById('m-stat-total').textContent=tot;
  document.getElementById('m-stat-done').textContent=seen;
  document.getElementById('m-stat-remaining').textContent=Math.max(0,tot-seen);
  const panel=document.getElementById('m-persist-stats');
  if(seen>0){panel.style.display='block';
    document.getElementById('m-ps-attempted').textContent=Object.values(h).reduce((a,q)=>a+q.attempts,0);
    document.getElementById('m-ps-correct').textContent=cor;
    document.getElementById('m-ps-wrong').textContent=wrg;
    document.getElementById('m-ps-pct').textContent=best!==null?best+'%':'—';
    document.getElementById('m-ps-seen').textContent=seen;
    document.getElementById('m-ps-total-label').textContent=tot;
    document.getElementById('m-ps-bar').style.width=Math.round(seen/tot*100)+'%';}
}

document.getElementById('m-ps-reset').addEventListener('click',()=>{
  if(!confirm('Reset all math progress?'))return;
  ['history','sessions','wrongIds'].forEach(k=>{try{localStorage.removeItem('ciro_math_'+k);}catch(e){}});
  mathState.wrongIds=[];mathRenderStats();
  document.getElementById('m-persist-stats').style.display='none';
  document.getElementById('m-stat-done').textContent='0';
  document.getElementById('m-stat-remaining').textContent=MATH_TEMPLATES.length;
});

function mathShuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function mathBuildDeck(){
  const h        = mathLoad('history',{});
  const selected = efGetSelected('m');
  const elMap    = getMathElementMap();

  // Filter by selected elements, then unseen
  const byElement = MATH_TEMPLATES.filter(t => selected.has(elMap[t.topic]));
  const unseen    = byElement.filter(t => !h[t.id]);
  const base      = unseen.length ? unseen : byElement;

  let tpls;
  if(mathState.mode==='wrongonly'){
    const ids=mathState.wrongIds.length?mathState.wrongIds:base.map(t=>t.id);
    const pool=base.filter(t=>ids.includes(t.id));
    tpls=mathShuffle(pool.length?pool:base);
  } else {
    tpls=mathShuffle(base);
  }
  return tpls.map(t=>{const q=t.generate();q.templateId=t.id;q.topic=t.topic;return q;});
}

function mathRender(){
  const q=mathState.generatedQs[mathState.idx],tot=mathState.generatedQs.length;
  document.getElementById('m-progress-fill').style.width=`${(mathState.idx/tot)*100}%`;
  document.getElementById('m-hdr-q').textContent=mathState.idx+1;
  document.getElementById('m-hdr-total').textContent=tot;
  document.getElementById('m-hdr-score').textContent=`${mathState.correct}/${mathState.idx} (${mathState.idx?Math.round(mathState.correct/mathState.idx*100):0}%)`;
  document.getElementById('m-live-score').textContent=`✓ ${mathState.correct}   ✗ ${mathState.wrong}`;
  document.getElementById('m-q-counter').textContent=`Question ${mathState.idx+1} of ${tot}`;
  document.getElementById('m-q-topic').textContent=q.topic;
  document.getElementById('m-question-text').textContent=q.q;
  const hint=document.getElementById('m-formula-hint');
  if(q.formulaHint){hint.style.display='block';hint.textContent='📐  '+q.formulaHint;}else hint.style.display='none';
  const list=document.getElementById('m-options-list');list.innerHTML='';
  Object.entries(q.options).forEach(([k,t])=>{const btn=document.createElement('button');btn.className='option-btn';btn.dataset.key=k;btn.innerHTML=`<span class="opt-letter">${k}</span><span>${t}</span>`;btn.addEventListener('click',()=>mathAnswer(k));list.appendChild(btn);});
  document.getElementById('m-feedback-panel').style.display='none';
  document.getElementById('m-feedback-panel').className='feedback-panel';
  document.getElementById('m-btn-next').classList.remove('visible');
  const card=document.getElementById('m-question-card');card.style.animation='none';card.offsetHeight;card.style.animation='';
  mathState.answered=false;
}

function mathAnswer(sel){
  if(mathState.answered)return;mathState.answered=true;
  const q=mathState.generatedQs[mathState.idx],ok=sel===q.answer;
  document.querySelectorAll('#m-options-list .option-btn').forEach(btn=>{btn.disabled=true;const k=btn.dataset.key;if(k===q.answer)btn.classList.add('correct');else if(k===sel&&!ok)btn.classList.add('wrong');else btn.classList.add('dimmed');});
  if(ok)mathState.correct++;else{mathState.wrong++;if(!mathState.wrongIds.includes(q.templateId))mathState.wrongIds.push(q.templateId);}
  mathState.results.push({templateId:q.templateId,q:q.q,options:q.options,userAnswer:sel,correctAnswer:q.answer,wasCorrect:ok,working:q.working,correctText:q.options[q.answer],userText:q.options[sel]});
  mathRecordResult(q.templateId,ok);mathSave('wrongIds',mathState.wrongIds);
  const panel=document.getElementById('m-feedback-panel');panel.style.display='block';
  if(ok){panel.className='feedback-panel correct-fb';document.getElementById('m-fb-icon').textContent='✓';document.getElementById('m-fb-result').textContent='Correct!';document.getElementById('m-fb-body').textContent='Well done! Step-by-step working:';document.getElementById('m-fb-correct-answer').style.display='block';document.getElementById('m-fb-correct-text').textContent=q.working;}
  else{panel.className='feedback-panel wrong-fb';document.getElementById('m-fb-icon').textContent='✗';document.getElementById('m-fb-result').textContent='Not quite.';document.getElementById('m-fb-body').textContent=`You selected ${sel}: ${q.options[sel]}. Correct: ${q.answer}: ${q.options[q.answer]}.`;document.getElementById('m-fb-correct-answer').style.display='block';document.getElementById('m-fb-correct-text').textContent=q.working;}
  document.getElementById('m-btn-next').classList.add('visible');
  document.getElementById('m-hdr-score').textContent=`${mathState.correct}/${mathState.idx+1} (${Math.round(mathState.correct/(mathState.idx+1)*100)}%)`;
  document.getElementById('m-live-score').textContent=`✓ ${mathState.correct}   ✗ ${mathState.wrong}`;
}

function mathNext(){mathState.idx++;if(mathState.idx>=mathState.generatedQs.length)mathResults();else mathRender();}
function mathSkip(){
  if(mathState.answered){mathNext();return;}
  mathState.skipped++;const q=mathState.generatedQs[mathState.idx];
  mathState.results.push({templateId:q.templateId,q:q.q,options:q.options,userAnswer:null,correctAnswer:q.answer,wasCorrect:false,working:q.working,correctText:q.options[q.answer],userText:'Skipped'});
  if(!mathState.wrongIds.includes(q.templateId))mathState.wrongIds.push(q.templateId);
  mathSave('wrongIds',mathState.wrongIds);mathState.idx++;
  if(mathState.idx>=mathState.generatedQs.length)mathResults();else mathRender();
}

function mathResults(){
  document.getElementById('m-screen-quiz').style.display='none';document.getElementById('m-screen-results').style.display='block';
  const tot=mathState.results.length,pct=tot?Math.round(mathState.correct/tot*100):0;
  const ring=document.getElementById('m-ring-fill');ring.style.stroke=pct>=75?'#4ade80':pct>=50?'#facc15':'#f87171';
  setTimeout(()=>{ring.style.strokeDashoffset=439.8-(pct/100)*439.8;},100);
  document.getElementById('m-ring-pct').textContent=pct+'%';
  document.getElementById('m-res-correct').textContent=mathState.correct;document.getElementById('m-res-wrong').textContent=mathState.wrong;document.getElementById('m-res-skipped').textContent=mathState.skipped;
  document.getElementById('m-result-title').textContent=pct>=80?'Excellent!':pct>=60?'Good Work!':'Keep Practising';
  document.getElementById('m-result-sub').textContent=pct>=80?'Strong calculation skills — the exam math should feel familiar.':pct>=60?'Review the step-by-step working for questions you missed.':'Focus on the formula hints — each type always follows the same method.';
  mathRecordSession(mathState.correct,tot);mathRenderStats();
  const topicMap={};
  mathState.results.forEach(r=>{if(!topicMap[r.templateId])topicMap[r.templateId]={topic:MATH_TEMPLATES.find(t=>t.id===r.templateId)?.topic||r.templateId,correct:0,total:0};topicMap[r.templateId].total++;if(r.wasCorrect)topicMap[r.templateId].correct++;});
  document.getElementById('m-element-breakdown').innerHTML='<div class="eb-title">Performance by Question Type</div>'+Object.values(topicMap).map(t=>{const p=t.total?Math.round(t.correct/t.total*100):0;return`<div class="eb-row"><div class="eb-label" style="width:260px;font-size:0.75rem">${t.topic}</div><div class="eb-bar-wrap"><div class="eb-bar-fill" style="width:${p}%;background:${p>=75?'#4ade80':p>=50?'#facc15':'#f87171'}"></div></div><div class="eb-pct">${p}%</div></div>`;}).join('');
  const wr=mathState.results.filter(r=>!r.wasCorrect);
  if(wr.length){const rv=document.getElementById('m-review-list');rv.style.display='flex';rv.innerHTML='<h2 style="font-family:\'DM Serif Display\',serif;color:var(--white);font-size:1.3rem;margin-bottom:4px">Step-by-Step Working — Wrong Answers</h2>'+wr.map((r,i)=>`<div class="review-item r-wrong"><div class="review-q">Q${i+1}: ${r.q}</div><div class="review-answer">Your: <span class="wrong-a">${r.userAnswer||'Skipped'}: ${r.userText}</span><br>Correct: <span class="correct-a">${r.correctAnswer}: ${r.correctText}</span></div><div class="review-exp" style="white-space:pre-wrap"><strong>Working:</strong>\n${r.working}</div></div>`).join('');}
}

function mathStartQuiz(){
  mathState.generatedQs=mathBuildDeck();mathState.idx=0;mathState.correct=0;mathState.wrong=0;mathState.skipped=0;mathState.answered=false;mathState.results=[];
  document.getElementById('m-screen-start').style.display='none';document.getElementById('m-screen-results').style.display='none';document.getElementById('m-screen-quiz').style.display='block';document.getElementById('m-review-list').style.display='none';
  document.getElementById('m-hdr-total').textContent=mathState.generatedQs.length;mathRender();
}

document.querySelectorAll('#m-mode-picker .mode-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('#m-mode-picker .mode-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');mathState.mode=btn.dataset.mode;});});
document.getElementById('m-btn-start').addEventListener('click',mathStartQuiz);
document.getElementById('m-btn-next').addEventListener('click',mathNext);
document.getElementById('m-btn-skip').addEventListener('click',mathSkip);
document.getElementById('m-btn-retry').addEventListener('click',()=>{document.getElementById('m-screen-results').style.display='none';document.getElementById('m-screen-start').style.display='block';mathRenderStats();});
document.getElementById('m-btn-review-wrongs').addEventListener('click',()=>{const rv=document.getElementById('m-review-list');rv.style.display=rv.style.display==='none'?'flex':'none';});



// ══════════════════════════════════════════════════════════════════
//  ELEMENT FILTER — shared helpers
// ══════════════════════════════════════════════════════════════════

function efToggle(btn) {
  btn.classList.toggle('active');
  efUpdateCount(btn.dataset.site);
}
function efSelectAll(siteId) {
  document.querySelectorAll(`#${siteId}-ef-pills .ef-pill`).forEach(b => b.classList.add('active'));
  efUpdateCount(siteId);
}
function efClearAll(siteId) {
  document.querySelectorAll(`#${siteId}-ef-pills .ef-pill`).forEach(b => b.classList.remove('active'));
  efUpdateCount(siteId);
}
function efGetSelected(siteId) {
  const active = document.querySelectorAll(`#${siteId}-ef-pills .ef-pill.active`);
  if (!active.length) {
    // nothing selected — treat as all selected
    efSelectAll(siteId);
    return efGetSelected(siteId);
  }
  return new Set([...active].map(b => parseInt(b.dataset.el)));
}
function efUpdateCount(siteId) {
  const selected = efGetSelected(siteId);
  const countEl  = document.getElementById(`${siteId}-ef-count`);
  if (!countEl) return;

  // Calculate available question count for that site
  let pool;
  if (siteId === 's1') {
    const hist = STORE.load('ciro_s1_history', {});
    const answered = new Set(Object.keys(hist).map(Number));
    pool = OFFICIAL_QUESTIONS.filter(q => selected.has(q.element) && !answered.has(q.id));
    if (!pool.length) pool = OFFICIAL_QUESTIONS.filter(q => selected.has(q.element));
  } else if (siteId === 's2') {
    const hist = STORE.load('ciro_s2_history', {});
    const answered = new Set(Object.keys(hist).map(Number));
    pool = NOTES_QUESTIONS.filter(q => selected.has(q.element) && !answered.has(q.id));
    if (!pool.length) pool = NOTES_QUESTIONS.filter(q => selected.has(q.element));
  } else if (siteId === 'm') {
    const hist = mathLoad('history', {});
    const MATH_EL_MAP = getMathElementMap();
    pool = MATH_TEMPLATES.filter(t => {
      const el = MATH_EL_MAP[t.topic];
      return selected.has(el) && !hist[t.id];
    });
    if (!pool.length) pool = MATH_TEMPLATES.filter(t => selected.has(getMathElementMap()[t.topic]));
  }
  const n = pool ? pool.length : 0;
  countEl.innerHTML = `<span>${n}</span> question${n !== 1 ? 's' : ''} available`;
}

function getMathElementMap() {
  return {
    'Long Futures P&L': 6, 'Short Futures P&L': 6,
    'Call Option — Intrinsic & Time Value': 4, 'Put Option — Intrinsic & Time Value': 4,
    'Long Call P&L at Expiry': 6, 'Long Put P&L at Expiry': 6,
    'Option Breakeven Price': 6, 'Option Leverage Ratio': 3,
    'Delta Hedge — Contracts to Write': 6, 'Bond Futures Duration Hedge': 6,
    'Beta Hedge — Equity Portfolio': 6, 'Interest Rate Swap — Net Payment': 3,
    'Equity Swap — Net Cash Flow': 3, 'Interest Rate Parity — Forward Rate': 4,
    'Futures Fair Value — Arbitrage Direction': 4, 'Margin Call Amount': 5,
    'CFD Margin Call': 3, 'Put-Call Parity — Find Put Price': 4,
    'Bull Call Spread — Max Profit': 6, 'Long Straddle — Upper Breakeven': 6,
    'Index Futures P&L': 6, 'Leveraged Return on Futures': 3,
    'Naked Put Margin Calculation': 5, 'Concentration Margin — Additional Required': 5,
    'Forward Contract — Profit at Expiry': 3, 'Commodity Swap — Net Settlement': 3,
    'Commodity Futures — Contracts to Hedge': 6, 'Round-Trip Commission Costs': 5,
  };
}


// ── BACK BUTTONS ──────────────────────────────────────────────
function goBackToStart(prefix, stateObj) {
  // If mid-quiz (questions answered), ask for confirmation
  if (stateObj.results && stateObj.results.length > 0) {
    if (!confirm('Go back to the start screen? Your current session progress will be lost.')) return;
  }
  const screens = ['quiz','results'];
  screens.forEach(s => {
    const el = document.getElementById(prefix + '-screen-' + s);
    if (el) el.style.display = 'none';
  });
  const startEl = document.getElementById(prefix + '-screen-start');
  if (startEl) startEl.style.display = 'block';
  // Refresh stats panel
  if (prefix === 's1') renderStats('s1', 120);
  else if (prefix === 's2') renderStats('s2', 80);
  else if (prefix === 'm') mathRenderStats();
}

// Site 1
document.getElementById('s1-btn-back').addEventListener('click', () => goBackToStart('s1', state));
document.getElementById('s1-btn-back-results').addEventListener('click', () => goBackToStart('s1', state));

// Site 2
document.getElementById('s2-btn-back').addEventListener('click', () => goBackToStart('s2', s2));
document.getElementById('s2-btn-back-results').addEventListener('click', () => goBackToStart('s2', s2));

// Math
document.getElementById('m-btn-back').addEventListener('click', () => goBackToStart('m', mathState));
document.getElementById('m-btn-back-results').addEventListener('click', () => goBackToStart('m', mathState));

// ── Boot: run after ALL declarations are complete ──────────────────────────
renderStats('s1', 120);
renderStats('s2', 80);
mathRenderStats();

// ── Table scroll wrappers ─────────────────────────────────────────────────
document.querySelectorAll('.n-table').forEach(t => {
  if (t.parentElement.classList.contains('n-table-wrap')) return;
  const w = document.createElement('div');
  w.className = 'n-table-wrap';
  t.parentNode.insertBefore(w, t);
  w.appendChild(t);
});

// ── Notes sidebar mobile drawer ───────────────────────────────────────────
(function() {
  const sidebar   = document.getElementById('notes-sidebar');
  const backdrop  = document.getElementById('notes-backdrop');
  const openBtn   = document.getElementById('notes-mob-toggle');
  const closeBtn  = document.getElementById('notes-mob-close');
  if (!sidebar || !openBtn) return;

  function openDrawer()  { sidebar.classList.add('mob-open'); backdrop.classList.add('mob-open'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { sidebar.classList.remove('mob-open'); backdrop.classList.remove('mob-open'); document.body.style.overflow = ''; }

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close drawer when a nav link is tapped
  sidebar.querySelectorAll('.notes-nav-item').forEach(a => a.addEventListener('click', closeDrawer));
})();
