/* ============================================================
   PANITIKAN QUEST — prototype app logic
   All data lives in localStorage. No names/ages/personal info
   are ever collected — only a self-chosen IGN.
   ============================================================ */

const STORAGE_KEYS = {
  ign: 'pq_ign',
  xp: 'pq_xp',
  progress: 'pq_progress',       // { questId: bestScore }
  leaderboardLocal: 'pq_lb_local', // this device's own best (used to simulate the "server" leaderboard)
  pendingSync: 'pq_pending_sync'  // scores earned offline, waiting to sync
};

/* ------------------------------------------------------------
   SAMPLE QUEST / PASSAGE DATA
   In a real deployment these would come from a database seeded
   by the reading teacher; here they are static for demo purposes.
   ------------------------------------------------------------ */
const QUESTS = [
  {
    id: 'q1',
    icon: '🧵',
    title: 'The Weaver\'s Bargain',
    level: 'Chapter 1 · Literal Recall',
    xp: 40,
    text: `In the village of Tinabon, an old weaver named Amang Isko was known for cloth that never faded. Every morning, before the roosters called, he walked to the river to soak his threads in its cool water. He believed the river gave the cloth its lasting color.

One dry season, the river shrank to a trickle. Amang Isko still walked down at dawn, carrying his threads in a clay jar. The villagers laughed, saying an old man's habit could not fill an empty river. But Isko simply knelt where the water remained, soaked his threads as always, and returned to his loom.

When the rains finally came, his cloth was already finished, wound in bright bolts on the market table. The other weavers, who had waited for the river to rise before starting their own work, were left with pale, unfinished cloth. Isko's bargain, it turned out, was never with the river at all — it was with the habit of showing up before anyone else did.`,
    questions: [
      { q: 'Where did Amang Isko soak his threads?', choices: ['In a clay jar at home', 'In the river', 'In rainwater collected on the roof', 'In a well behind his house'], correct: 1 },
      { q: 'What happened to the river during the dry season?', choices: ['It flooded the village', 'It shrank to a trickle', 'It changed color', 'It froze over'], correct: 1 },
      { q: 'Why did the other villagers laugh at Isko?', choices: ['He sang while he worked', 'He continued his routine despite the low water', 'He sold his cloth too cheaply', 'He refused to use the river at all'], correct: 1 },
      { q: 'What was different about the other weavers\' approach?', choices: ['They used a different river', 'They waited for the river to rise before starting', 'They did not use thread at all', 'They worked only at night'], correct: 1 },
      { q: 'What does the story suggest Isko\'s real "bargain" was?', choices: ['A bargain with the river spirits', 'A habit of starting his work early, rain or not', 'A secret dye recipe', 'A trade agreement with the market'], correct: 1 }
    ]
  },
  {
    id: 'q2',
    icon: '🕯️',
    title: 'The Lighthouse That Lied',
    level: 'Chapter 2 · Inference',
    xp: 60,
    text: `Keeper Bantay had tended the lighthouse at Punta Ilaw for eleven years without missing a single night. Fishermen said his light was steadier than the stars — until the week it began to flicker at odd hours, dimming just before midnight and flaring again before dawn.

Rumors spread that the lighthouse was haunted, that something offshore was tampering with the flame. Boats grew cautious, some refusing to sail past dusk. Trade slowed. The town council sent a young engineer, Divina, to investigate.

Divina climbed the tower and found no ghost — only a cracked lens, letting wind gust directly onto the flame each time the tide pushed air through a gap in the old stone. She also found something else: Keeper Bantay's logbook, its last week of entries shakier than the rest, the ink smudged as if his hand had trembled while writing.

She said nothing about the logbook to the council. She repaired the lens, and the light steadied again. But she quietly arranged for a young assistant to be assigned to the tower — "to learn the trade," she told everyone, though she never explained why an eleven-year keeper suddenly needed a student.`,
    questions: [
      { q: 'What physically caused the lighthouse light to flicker?', choices: ['A ghost blowing out the flame', 'Wind entering through a cracked lens', 'Someone deliberately sabotaging it', 'A shortage of oil'], correct: 1 },
      { q: 'What effect did the flickering light have on the town?', choices: ['Nothing changed at all', 'Trade slowed as boats became cautious', 'The council closed the lighthouse permanently', 'Fishermen built a new lighthouse'], correct: 1 },
      { q: 'What is the most likely reason Bantay\'s handwriting became shakier?', choices: ['He was learning to write for the first time', 'He may have been growing ill or unsteady', 'He was writing with his non-dominant hand for fun', 'The ink had gone bad'], correct: 1 },
      { q: 'Why did Divina stay quiet about the logbook?', choices: ['She hadn\'t noticed it', 'She likely wanted to protect Bantay from being replaced or judged', 'She thought it was unimportant', 'She was told to hide it by the council'], correct: 1 },
      { q: 'Why did Divina arrange for an assistant to be assigned?', choices: ['Random hiring order from the council', 'To quietly prepare for the day Bantay can no longer manage alone', 'Because the tower needed more workers for cleaning', 'Because Bantay requested a friend'], correct: 1 }
    ]
  },
  {
    id: 'q3',
    icon: '📖',
    title: 'The Last Page',
    level: 'Chapter 3 · Main Idea & Vocabulary',
    xp: 80,
    text: `Every book in Aling Puring's sari-sari store library was missing its last page. She tore it out herself before lending any title, and pinned the loose pages to a corkboard behind the counter, sorted by book, never read aloud.

Children who borrowed her books came back annoyed, then curious, then — after a few weeks — inventive. They began writing their own endings in the blank notebooks she sold beside the corkboard. Some endings were clumsy. Some were stranger and better than what the actual authors had written. A boy named Emil once ended a mystery novel with the detective becoming friends with the thief; his ending became so popular that other children copied it into their own notebooks before reading the real one.

Aling Puring never explained her rule, even when parents complained that she was "vandalizing" perfectly good books. But regulars noticed that the children who used to return books unread, calling them "boring," were now the ones lingering longest at the counter, arguing about which ending was truer to the story.

She was, in her quiet and stubborn way, teaching them that reading was not just about arriving at an ending someone else had already decided — it was about caring enough to imagine one yourself.`,
    questions: [
      { q: 'What did Aling Puring do to every book before lending it?', choices: ['She wrote her own notes in the margins', 'She tore out the last page', 'She translated it into another language', 'She rebound it in a new cover'], correct: 1 },
      { q: 'As used in the passage, what does "inventive" most nearly mean?', choices: ['Angry and destructive', 'Imaginative and creative', 'Careless and lazy', 'Confused and lost'], correct: 1 },
      { q: 'What change did the children go through, in order?', choices: ['Curious, then annoyed, then bored', 'Annoyed, then curious, then inventive', 'Inventive, then annoyed, then curious', 'Bored, then angry, then inventive'], correct: 1 },
      { q: 'What is the best statement of the passage\'s main idea?', choices: ['Torn books are more valuable than whole ones', 'Removing a story\'s ending can push readers to engage more deeply and imagine their own', 'Children always prefer their own stories to published ones', 'Aling Puring disliked the authors of the books she sold'], correct: 1 },
      { q: 'Why did parents complain to Aling Puring?', choices: ['They thought she was damaging the books', 'They wanted more books in the store', 'They disliked the children\'s notebooks', 'They thought the store was too crowded'], correct: 0 }
    ]
  }
];

/* ------------------------------------------------------------
   STATE
   ------------------------------------------------------------ */
let state = {
  ign: null,
  xp: 0,
  progress: {},
  activeQuest: null,
  quizIndex: 0,
  quizScore: 0,
  quizStart: null
};

/* ------------------------------------------------------------
   UTIL: storage helpers (all local — this is the "offline" store)
   ------------------------------------------------------------ */
function loadState(){
  state.ign = localStorage.getItem(STORAGE_KEYS.ign);
  state.xp = parseInt(localStorage.getItem(STORAGE_KEYS.xp) || '0', 10);
  state.progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || '{}');
}
function saveXP(){ localStorage.setItem(STORAGE_KEYS.xp, String(state.xp)); }
function saveProgress(){ localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress)); }

function getLocalLeaderboard(){
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.leaderboardLocal) || '[]');
}
function setLocalLeaderboard(list){
  localStorage.setItem(STORAGE_KEYS.leaderboardLocal, JSON.stringify(list));
}
function getPending(){
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.pendingSync) || '[]');
}
function setPending(list){
  localStorage.setItem(STORAGE_KEYS.pendingSync, JSON.stringify(list));
}

/* ------------------------------------------------------------
   SEED a believable leaderboard the first time, so the Hall of
   Legends never looks empty (mirrors a live class/school setting).
   ------------------------------------------------------------ */
function seedLeaderboardIfEmpty(){
  if(getLocalLeaderboard().length > 0) return;
  const seedNames = ['NightOwl27','ReadingRhea','QuietFalcon','SigeBasa','TalaTala',
                      'PaperCrane_09','InkAndIce','BasangBata','MangoMonarch','SilentSage'];
  const seeded = seedNames.map((n,i) => ({ name:n, xp: 480 - i*35 }));
  setLocalLeaderboard(seeded);
}

/* ------------------------------------------------------------
   SCREEN NAV
   ------------------------------------------------------------ */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ------------------------------------------------------------
   IGN SCREEN
   ------------------------------------------------------------ */
const ignInput = document.getElementById('ignInput');
const enterBtn = document.getElementById('enterBtn');
const ignHint = document.getElementById('ignHint');

function validateIGN(value){
  return /^[A-Za-z0-9_]{2,16}$/.test(value);
}
ignInput.addEventListener('input', () => {
  const ok = validateIGN(ignInput.value.trim());
  enterBtn.disabled = !ok;
  ignHint.style.color = ignInput.value.length === 0 || ok ? '' : 'var(--ember)';
});
enterBtn.addEventListener('click', () => {
  const ign = ignInput.value.trim();
  if(!validateIGN(ign)) return;
  state.ign = ign;
  localStorage.setItem(STORAGE_KEYS.ign, ign);
  enterHub();
});

/* ------------------------------------------------------------
   LEVEL / XP MATH
   ------------------------------------------------------------ */
const LEVEL_TITLES = ['Apprentice Reader','Page Turner','Story Tracker','Lore Keeper','Master Chronicler'];
function levelFromXP(xp){
  const level = Math.min(LEVEL_TITLES.length, Math.floor(xp / 100) + 1);
  const floor = (level - 1) * 100;
  const pct = Math.min(100, Math.round(((xp - floor) / 100) * 100));
  return { level, title: LEVEL_TITLES[level - 1], floor, pct, xpIntoLevel: xp - floor };
}

function renderHub(){
  document.getElementById('ignDisplay').textContent = state.ign;
  const { level, title, pct, xpIntoLevel } = levelFromXP(state.xp);
  document.getElementById('levelLabel').textContent = `${title} · Lv.${level}`;
  document.getElementById('xpNumbers').textContent = `${xpIntoLevel} / 100 XP`;
  document.getElementById('xpFill').style.width = pct + '%';

  // Quest list
  const list = document.getElementById('questList');
  list.innerHTML = '';
  QUESTS.forEach((quest, i) => {
    const prevDone = i === 0 || (QUESTS[i-1].id in state.progress);
    const best = state.progress[quest.id];
    const card = document.createElement('div');
    card.className = 'quest-card' + (prevDone ? '' : ' locked');
    card.innerHTML = `
      <div class="quest-icon">${quest.icon}</div>
      <div class="quest-info">
        <h4>${quest.title}</h4>
        <p>${quest.level}</p>
      </div>
      <div class="quest-meta">${best !== undefined ? best + '/5 best' : (prevDone ? 'New' : 'Locked')}
        <small>${quest.xp} XP</small>
      </div>`;
    if(prevDone){
      card.addEventListener('click', () => openStory(quest));
    }
    list.appendChild(card);
  });

  renderLeaderboard();
  renderSyncStatus();
}

function renderLeaderboard(){
  const lb = getLocalLeaderboard().slice();
  // fold current player's xp into the display without duplicating server logic
  const mine = { name: state.ign, xp: state.xp, isMe: true };
  const merged = [...lb.filter(p => p.name !== state.ign), mine]
    .sort((a,b) => b.xp - a.xp)
    .slice(0, 10);

  const ol = document.getElementById('leaderboard');
  ol.innerHTML = '';
  merged.forEach((p, i) => {
    const li = document.createElement('li');
    if(p.isMe) li.classList.add('me');
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i+1);
    li.innerHTML = `<span class="lb-rank">${medal}</span><span class="lb-name">${p.name}${p.isMe ? ' (you)' : ''}</span><span class="lb-score">${p.xp} XP</span>`;
    ol.appendChild(li);
  });
}

function renderSyncStatus(){
  const pending = getPending();
  const syncText = document.getElementById('syncText');
  const pendingList = document.getElementById('pendingList');
  pendingList.innerHTML = '';
  if(!navigator.onLine){
    syncText.textContent = 'Offline — quest results are being saved on this device only.';
  } else if(pending.length > 0){
    syncText.textContent = 'Back online. Syncing results earned while offline…';
  } else {
    syncText.textContent = 'All quests synced.';
  }
  pending.forEach(p => {
    const div = document.createElement('div');
    div.className = 'pending-item';
    div.textContent = `${p.questTitle} — ${p.score}/5 (earned offline)`;
    pendingList.appendChild(div);
  });
}

function enterHub(){
  renderHub();
  showScreen('screen-hub');
}

/* ------------------------------------------------------------
   STORY SCREEN
   ------------------------------------------------------------ */
function openStory(quest){
  state.activeQuest = quest;
  document.getElementById('storyEyebrow').textContent = quest.level;
  document.getElementById('storyTitle').textContent = quest.title;
  document.getElementById('storyText').textContent = quest.text;
  showScreen('screen-story');
}
document.getElementById('backFromStory').addEventListener('click', enterHub);
document.getElementById('toAssessmentBtn').addEventListener('click', () => {
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizStart = Date.now();
  showScreen('screen-assessment');
  renderQuestion();
});

/* ------------------------------------------------------------
   ASSESSMENT SCREEN
   ------------------------------------------------------------ */
function renderQuestion(){
  const quest = state.activeQuest;
  const q = quest.questions[state.quizIndex];
  document.getElementById('qCounter').textContent = `${state.quizIndex + 1} / ${quest.questions.length}`;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('qFeedback').textContent = '';

  const wrap = document.getElementById('choices');
  wrap.innerHTML = '';
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(idx, btn));
    wrap.appendChild(btn);
  });
}

function selectAnswer(idx, btnEl){
  const quest = state.activeQuest;
  const q = quest.questions[state.quizIndex];
  const allBtns = document.querySelectorAll('#choices .choice-btn');
  allBtns.forEach(b => b.disabled = true);

  const correct = idx === q.correct;
  if(correct){
    state.quizScore++;
    btnEl.classList.add('correct');
    document.getElementById('qFeedback').textContent = 'Correct — the story confirms that.';
  } else {
    btnEl.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
    document.getElementById('qFeedback').textContent = 'Not quite — re-reading that part might help next time.';
  }

  setTimeout(() => {
    state.quizIndex++;
    if(state.quizIndex < quest.questions.length){
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 1100);
}

function finishQuiz(){
  const quest = state.activeQuest;
  const seconds = Math.max(1, Math.round((Date.now() - state.quizStart) / 1000));
  const scoreRatio = state.quizScore / quest.questions.length;
  const earnedXP = Math.round(quest.xp * scoreRatio);

  // Update best score
  const prevBest = state.progress[quest.id] || 0;
  if(state.quizScore > prevBest){
    state.progress[quest.id] = state.quizScore;
    saveProgress();
  }

  state.xp += earnedXP;
  saveXP();

  // Record to leaderboard / offline queue
  const record = { questTitle: quest.title, score: state.quizScore, xp: earnedXP, ts: Date.now() };
  if(navigator.onLine){
    pushToLeaderboard();
  } else {
    const pending = getPending();
    pending.push(record);
    setPending(pending);
  }

  document.getElementById('resultBadge').textContent = quest.title;
  document.getElementById('resultHeadline').textContent =
    scoreRatio === 1 ? 'Perfect Recall!' : scoreRatio >= 0.6 ? 'Well Read.' : 'Keep Practicing.';
  document.getElementById('resultScore').textContent = `${state.quizScore}/${quest.questions.length}`;
  document.getElementById('resultXP').textContent = `+${earnedXP}`;
  document.getElementById('resultTime').textContent = `${seconds}s`;
  document.getElementById('resultNote').textContent = navigator.onLine
    ? 'Your score has been added to the Hall of Legends.'
    : 'You\'re offline — this result is saved on your device and will sync once you reconnect.';

  showScreen('screen-results');
}

function pushToLeaderboard(){
  const lb = getLocalLeaderboard();
  const existing = lb.find(p => p.name === state.ign);
  if(existing){ existing.xp = state.xp; }
  else { lb.push({ name: state.ign, xp: state.xp }); }
  setLocalLeaderboard(lb);
}

document.getElementById('continueBtn').addEventListener('click', enterHub);
document.getElementById('resetBtn').addEventListener('click', () => {
  if(confirm('Clear all local progress and IGN? This cannot be undone.')){
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    location.reload();
  }
});

/* ------------------------------------------------------------
   OFFLINE / ONLINE HANDLING
   ------------------------------------------------------------ */
function updateConnBadge(){
  const badge = document.getElementById('connBadge');
  const text = document.getElementById('connText');
  if(navigator.onLine){
    badge.classList.remove('conn-offline');
    badge.classList.add('conn-online');
    text.textContent = 'Online';
  } else {
    badge.classList.remove('conn-online');
    badge.classList.add('conn-offline');
    text.textContent = 'Offline · saving locally';
  }
}

function syncPending(){
  const pending = getPending();
  if(pending.length === 0) return;
  // Simulate a sync: fold every pending offline result into the "server" leaderboard
  pushToLeaderboard();
  setPending([]);
  if(document.getElementById('screen-hub').classList.contains('active')){
    renderHub();
  }
}

window.addEventListener('online', () => {
  updateConnBadge();
  syncPending();
});
window.addEventListener('offline', updateConnBadge);

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */
function init(){
  loadState();
  seedLeaderboardIfEmpty();
  updateConnBadge();

  if(state.ign){
    enterHub();
  } else {
    showScreen('screen-ign');
  }
}
init();
