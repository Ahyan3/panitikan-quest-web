/* ============================================================
   PANITIKAN QUEST — prototype app logic
   All data lives in localStorage. No names/ages/personal info
   are ever collected — only a self-chosen IGN.
   ============================================================ */

const STORAGE_KEYS = {
  ign: 'pq_ign',
  xp: 'pq_xp',
  progress: 'pq_progress',        // { questId: bestScore }
  answerLog: 'pq_answer_log',     // { questId: [{qIndex, chosen, correct, skill}] } — powers Review + Recommendations
  leaderboardLocal: 'pq_lb_local',// this device's own best (used to simulate the "server" leaderboard)
  pendingSync: 'pq_pending_sync', // scores earned offline, waiting to sync
  bgm: 'pq_bgm'                   // background music on/off preference
};

/* ------------------------------------------------------------
   SAMPLE QUEST / PASSAGE DATA
   Question counts now scale progressively (3 → 4 → 5 → 5 → 6 → 7 = 30
   total), and harder chapters add a countdown timer per question.
   Each question carries a `skill` tag used by the recommendations
   engine at game completion.
   ------------------------------------------------------------ */
const QUESTS = [
  {
    id: 'q1',
    icon: '🧵',
    title: 'The Weaver\'s Bargain',
    level: 'Chapter 1 · Literal Recall',
    difficulty: 'Easy',
    timeLimit: null,
    xp: 40,
    text: `In the village of Tinabon, an old weaver named Amang Isko was known for cloth that never faded. Every morning, before the roosters called, he walked to the river to soak his threads in its cool water. He believed the river gave the cloth its lasting color.

One dry season, the river shrank to a trickle. Amang Isko still walked down at dawn, carrying his threads in a clay jar. The villagers laughed, saying an old man's habit could not fill an empty river. But Isko simply knelt where the water remained, soaked his threads as always, and returned to his loom.

When the rains finally came, his cloth was already finished, wound in bright bolts on the market table. The other weavers, who had waited for the river to rise before starting their own work, were left with pale, unfinished cloth. Isko's bargain, it turned out, was never with the river at all — it was with the habit of showing up before anyone else did.`,
    questions: [
      { q: 'Where did Amang Isko soak his threads?', choices: ['In a clay jar at home', 'In the river', 'In rainwater collected on the roof', 'In a well behind his house'], correct: 1, skill: 'literal' },
      { q: 'What happened to the river during the dry season?', choices: ['It flooded the village', 'It shrank to a trickle', 'It changed color', 'It froze over'], correct: 1, skill: 'literal' },
      { q: 'What does the story suggest Isko\'s real "bargain" was?', choices: ['A bargain with the river spirits', 'A habit of starting his work early, rain or not', 'A secret dye recipe', 'A trade agreement with the market'], correct: 1, skill: 'inference' }
    ]
  },
  {
    id: 'q2',
    icon: '🕯️',
    title: 'The Lighthouse That Lied',
    level: 'Chapter 2 · Inference',
    difficulty: 'Easy',
    timeLimit: null,
    xp: 55,
    text: `Keeper Bantay had tended the lighthouse at Punta Ilaw for eleven years without missing a single night. Fishermen said his light was steadier than the stars — until the week it began to flicker at odd hours, dimming just before midnight and flaring again before dawn.

Rumors spread that the lighthouse was haunted, that something offshore was tampering with the flame. Boats grew cautious, some refusing to sail past dusk. Trade slowed. The town council sent a young engineer, Divina, to investigate.

Divina climbed the tower and found no ghost — only a cracked lens, letting wind gust directly onto the flame each time the tide pushed air through a gap in the old stone. She also found something else: Keeper Bantay's logbook, its last week of entries shakier than the rest, the ink smudged as if his hand had trembled while writing.

She said nothing about the logbook to the council. She repaired the lens, and the light steadied again. But she quietly arranged for a young assistant to be assigned to the tower — "to learn the trade," she told everyone, though she never explained why an eleven-year keeper suddenly needed a student.`,
    questions: [
      { q: 'What physically caused the lighthouse light to flicker?', choices: ['A ghost blowing out the flame', 'Wind entering through a cracked lens', 'Someone deliberately sabotaging it', 'A shortage of oil'], correct: 1, skill: 'literal' },
      { q: 'What effect did the flickering light have on the town?', choices: ['Nothing changed at all', 'Trade slowed as boats became cautious', 'The council closed the lighthouse permanently', 'Fishermen built a new lighthouse'], correct: 1, skill: 'literal' },
      { q: 'What is the most likely reason Bantay\'s handwriting became shakier?', choices: ['He was learning to write for the first time', 'He may have been growing ill or unsteady', 'He was writing with his non-dominant hand for fun', 'The ink had gone bad'], correct: 1, skill: 'inference' },
      { q: 'Why did Divina arrange for an assistant to be assigned?', choices: ['Random hiring order from the council', 'To quietly prepare for the day Bantay can no longer manage alone', 'Because the tower needed more workers for cleaning', 'Because Bantay requested a friend'], correct: 1, skill: 'inference' }
    ]
  },
  {
    id: 'q3',
    icon: '📖',
    title: 'The Last Page',
    level: 'Chapter 3 · Main Idea & Vocabulary',
    difficulty: 'Medium',
    timeLimit: 60,
    xp: 80,
    text: `Every book in Aling Puring's sari-sari store library was missing its last page. She tore it out herself before lending any title, and pinned the loose pages to a corkboard behind the counter, sorted by book, never read aloud.

Children who borrowed her books came back annoyed, then curious, then — after a few weeks — inventive. They began writing their own endings in the blank notebooks she sold beside the corkboard. Some endings were clumsy. Some were stranger and better than what the actual authors had written. A boy named Emil once ended a mystery novel with the detective becoming friends with the thief; his ending became so popular that other children copied it into their own notebooks before reading the real one.

Aling Puring never explained her rule, even when parents complained that she was "vandalizing" perfectly good books. But regulars noticed that the children who used to return books unread, calling them "boring," were now the ones lingering longest at the counter, arguing about which ending was truer to the story.

She was, in her quiet and stubborn way, teaching them that reading was not just about arriving at an ending someone else had already decided — it was about caring enough to imagine one yourself.`,
    questions: [
      { q: 'What did Aling Puring do to every book before lending it?', choices: ['She wrote her own notes in the margins', 'She tore out the last page', 'She translated it into another language', 'She rebound it in a new cover'], correct: 1, skill: 'literal' },
      { q: 'As used in the passage, what does "inventive" most nearly mean?', choices: ['Angry and destructive', 'Imaginative and creative', 'Careless and lazy', 'Confused and lost'], correct: 1, skill: 'vocabulary' },
      { q: 'What change did the children go through, in order?', choices: ['Curious, then annoyed, then bored', 'Annoyed, then curious, then inventive', 'Inventive, then annoyed, then curious', 'Bored, then angry, then inventive'], correct: 1, skill: 'literal' },
      { q: 'What is the best statement of the passage\'s main idea?', choices: ['Torn books are more valuable than whole ones', 'Removing a story\'s ending can push readers to engage more deeply and imagine their own', 'Children always prefer their own stories to published ones', 'Aling Puring disliked the authors of the books she sold'], correct: 1, skill: 'main_idea' },
      { q: 'Why did parents complain to Aling Puring?', choices: ['They thought she was damaging the books', 'They wanted more books in the store', 'They disliked the children\'s notebooks', 'They thought the store was too crowded'], correct: 0, skill: 'literal' }
    ]
  },
  {
    id: 'q4',
    icon: '🎙️',
    title: 'The Sound Collector',
    level: 'Chapter 4 · Author\'s Purpose & Vocabulary',
    difficulty: 'Medium',
    timeLimit: 45,
    xp: 70,
    text: `In Barangay Malinis, a boy named Julio carried an old cassette recorder everywhere: to the market at dawn, to the chapel bell at noon, to the roof during a storm. He was building an archive, he told his classmates, of "every sound the barangay makes before it forgets how to make it quietly."

No one understood what he meant until the highway construction began. Trucks arrived, followed by drills, and within a month the market's morning chatter had to compete with diesel engines. Julio played his tapes for his Lola Fely, who was slowly losing her hearing; through his recordings, she said, she could still hear the barangay the way she remembered it — rooster crows sharp and rain hushed, not swallowed by machinery.

Julio never explained his hobby as an act of preservation. He called it, simply, "collecting," as if sound were something you could put in a jar and open later. But when the town council debated whether to pave over the old market entirely, it was Julio's tapes — not photographs, not petitions — that convinced the oldest council members to vote against it. They said the recordings made them homesick for a place they were still standing in.`,
    questions: [
      { q: 'What did Julio do with his cassette recorder?', choices: ['He sold it to tourists', 'He recorded everyday sounds around the barangay', 'He used it to record music for a band', 'He gave it away to his Lola'], correct: 1, skill: 'literal' },
      { q: 'Why did Julio\'s hobby become more meaningful after highway construction began?', choices: ['The construction paid him for the recordings', 'The construction changed the sounds of daily life he had been recording', 'He stopped recording once construction began', 'The construction destroyed his recorder'], correct: 1, skill: 'inference' },
      { q: 'What is Lola Fely\'s connection to the recordings?', choices: ['She helped Julio build the recorder', 'She was losing her hearing and the tapes let her recall familiar sounds', 'She recorded the tapes herself', 'She disapproved of Julio\'s hobby'], correct: 1, skill: 'literal' },
      { q: 'Why might Julio prefer the word "collecting" over "preserving"?', choices: ['"Collecting" sounds more modest, less like making a grand statement about saving something', '"Preserving" is a word he didn\'t know', '"Collecting" means the sounds are for sale', 'There is no real difference between the two words'], correct: 0, skill: 'vocabulary' },
      { q: 'What is the best statement of the passage\'s main idea?', choices: ['Cassette recorders are outdated technology', 'Small, ordinary sounds can hold onto a sense of place even as that place changes', 'Highway construction always destroys communities', 'Council members preferred photographs over recordings'], correct: 1, skill: 'main_idea' }
    ]
  },
  {
    id: 'q5',
    icon: '✉️',
    title: 'Letters to No One',
    level: 'Chapter 5 · Figurative Language & Imagery',
    difficulty: 'Hard',
    timeLimit: 35,
    xp: 90,
    text: `Every Sunday, Marisola wrote a letter to someone she had never met: the person who would someday live in her childhood home after her family moved away. She never mailed these letters — there was no address for a stranger who did not exist yet — so she kept them folded into a shoebox under her bed, growing thicker each year.

In the letters, she described small things a new owner might never notice: which floorboard creaked like an old man clearing his throat, how the mango tree in the yard dropped fruit "like the earth was returning a favor," and the exact hour the afternoon light turned the kitchen the color of weak tea.

When her family finally did move, years later than she'd once imagined, Marisola left the shoebox behind — not hidden, but placed deliberately on the closet shelf, as if she had been writing toward this moment the entire time. She never learned who moved in after her, or whether they found the letters at all. But she said, packing the last box into the truck, that it no longer mattered whether the letters were ever read. Writing them had been her way of holding the house a little longer before she had to let it go.`,
    questions: [
      { q: 'Who did Marisola write letters to?', choices: ['A childhood friend who moved away', 'A future stranger who would someday live in her home', 'Her own future self', 'A pen pal from another country'], correct: 1, skill: 'literal' },
      { q: 'What does "like the earth was returning a favor" suggest about the falling mangoes?', choices: ['The mangoes were rotten and should be thrown away', 'The tree\'s fruit felt like a natural, generous gift back to the family', 'The earth was punishing the family', 'The mangoes fell only due to bad weather'], correct: 1, skill: 'vocabulary' },
      { q: 'What did Marisola do with the letters when her family moved?', choices: ['She burned them', 'She mailed them to a random address', 'She left them deliberately on a closet shelf', 'She brought them along in a suitcase'], correct: 2, skill: 'literal' },
      { q: 'Why does the passage suggest the letters mattered, even unread?', choices: ['Writing them helped her process saying goodbye to her home', 'She hoped to sell them someday', 'She wanted to prove she was a good writer', 'She was required to write them for school'], correct: 0, skill: 'inference' },
      { q: 'What is "the color of weak tea" most likely describing?', choices: ['A pale, warm afternoon light in the kitchen', 'The taste of the family\'s actual tea', 'The color of the letters\' paper', 'The mango tree\'s bark'], correct: 0, skill: 'vocabulary' },
      { q: 'What tone best describes the letters Marisola wrote?', choices: ['Angry and resentful', 'Nostalgic and tender', 'Humorous and playful', 'Formal and businesslike', 'Confused and uncertain'], correct: 1, skill: 'inference' }
    ]
  },
  {
    id: 'q6',
    icon: '🏛️',
    title: 'The Debate at Barangay Hall',
    level: 'Chapter 6 · Claims, Evidence & Counterclaims',
    difficulty: 'Hard',
    timeLimit: 25,
    xp: 110,
    text: `At the barangay hall, two neighbors stood to speak about the cracked basketball court where every teenager in Malinis had learned to play. Mang Ronnie argued that the court should be rebuilt as a covered multipurpose hall, pointing out that games were cancelled every rainy season and that a covered hall could also host assemblies, feeding programs, and typhoon evacuations. He cited the barangay next door, which had built one two years prior and reported near-daily use, rain or shine.

Aling Ditas countered that the court held memories a new hall could not replace — three decades of championship banners, hand-painted lines redone by volunteers every summer, a mural of local basketball heroes on the perimeter wall. She agreed the rain was a real problem but proposed a middle path: build a simple roof over the existing court rather than demolish it, preserving the mural and banners while solving the weather issue at a lower cost.

The council did not decide that night. But several residents who arrived expecting a straightforward yes-or-no vote left instead debating Aling Ditas's compromise, turning the meeting from a disagreement between two positions into a search for a third one nobody had proposed before it was said aloud.`,
    questions: [
      { q: 'What was Mang Ronnie\'s main proposal?', choices: ['Close the court permanently', 'Replace the court with a fully covered multipurpose hall', 'Move the court to another barangay', 'Charge fees to use the court'], correct: 1, skill: 'literal' },
      { q: 'What evidence did Mang Ronnie use to support his argument?', choices: ['A survey of teenagers\' opinions', 'A neighboring barangay\'s similar hall being used nearly every day', 'A newspaper article about basketball courts', 'His own personal preference only'], correct: 1, skill: 'argument' },
      { q: 'What was Aling Ditas\'s central concern about tearing down the old court?', choices: ['The cost of construction', 'Losing sentimental features like the mural and championship banners', 'She disliked basketball', 'She wanted a swimming pool instead'], correct: 1, skill: 'argument' },
      { q: 'What compromise did Aling Ditas propose?', choices: ['Build a roof over the existing court instead of demolishing it', 'Cancel the entire renovation project', 'Build a second court elsewhere', 'Let residents vote online'], correct: 0, skill: 'literal' },
      { q: 'What is the best description of how the meeting ended?', choices: ['The council immediately approved Mang Ronnie\'s plan', 'No resolution was reached, but the discussion led to a new, third idea', 'Aling Ditas\'s plan was rejected outright', 'The meeting ended in an argument with no further discussion'], correct: 1, skill: 'main_idea' },
      { q: 'What rhetorical strategy did Mang Ronnie primarily use to support his position?', choices: ['An emotional appeal only', 'Citing a real example from a neighboring barangay', 'Personal attacks on Aling Ditas', 'Ignoring the rain issue entirely', 'Promising financial rewards', 'Refusing to answer questions'], correct: 1, skill: 'argument' },
      { q: 'Which best describes the relationship between the two arguments?', choices: ['They fully agreed on every point', 'They agreed the rain was a problem but disagreed on the solution', 'They agreed on the solution but disagreed on the problem', 'Neither acknowledged the other\'s argument', 'They insulted each other\'s credibility', 'The debate had no shared ground at all'], correct: 1, skill: 'argument' }
    ]
  }
];

/* ------------------------------------------------------------
   RECOMMENDATIONS — keyed by skill tag, shown on the Game
   Completion screen based on which skills the student missed
   most across the whole playthrough, plus a general note based
   on total score band (out of 30).
   ------------------------------------------------------------ */
const RECOMMENDATIONS = {
  literal: {
    title: 'Sharpen Literal Recall',
    suggestion: 'Try reading "Ibong Adarna" one stanza at a time, pausing after each to restate — out loud or in writing — exactly what just happened before moving on.'
  },
  inference: {
    title: 'Practice Reading Between the Lines',
    suggestion: 'Nick Joaquin\'s "May Day Eve" is great inference practice — after each scene, ask yourself "why did this character just do that?" before reading on.'
  },
  vocabulary: {
    title: 'Build Context-Clue Skills',
    suggestion: 'While reading a chapter of Jose Rizal\'s "Noli Me Tangere," pick five unfamiliar words and guess their meaning from context before checking a dictionary.'
  },
  main_idea: {
    title: 'Practice Summarizing',
    suggestion: 'After each canto of "Florante at Laura," write the main idea in a single sentence — if you need two sentences, you\'re including too much detail.'
  },
  argument: {
    title: 'Strengthen Argument Analysis',
    suggestion: 'Read a local newspaper editorial or opinion column and identify its claim, its evidence, and any counterclaim it responds to.'
  }
};

const SKILL_LABELS = {
  literal: 'Literal Recall',
  inference: 'Inference',
  vocabulary: 'Vocabulary',
  main_idea: 'Main Idea',
  argument: 'Argument Analysis'
};

const TOTAL_QUESTIONS = QUESTS.reduce((sum, q) => sum + q.questions.length, 0);

function scoreTierMessage(totalCorrect){
  const pct = totalCorrect / TOTAL_QUESTIONS;
  if(pct < 0.5) return { tier: 'Foundational', note: 'Focus on the basics for now: re-read passages slowly, keep a small glossary of new words, and don\'t hesitate to reread a paragraph twice before answering.' };
  if(pct < 0.8) return { tier: 'Intermediate', note: 'You\'re building solid comprehension. Try short stories slightly above your usual level, paying close attention to inference and vocabulary-in-context.' };
  return { tier: 'Advanced', note: 'Excellent comprehension overall. Try more advanced texts and opinion/debate-style articles to keep sharpening argument analysis.' };
}

/* ------------------------------------------------------------
   BADGES — derived entirely from existing progress/xp state,
   so no new persistence is needed. Gives students more to chase
   beyond raw leaderboard rank.
   ------------------------------------------------------------ */
const BADGES = [
  {
    id: 'first_steps',
    icon: '🥾',
    title: 'First Steps',
    desc: 'Complete your first quest.',
    isUnlocked: (progress, xp) => Object.keys(progress).length >= 1
  },
  {
    id: 'perfect_recall',
    icon: '🌟',
    title: 'Perfect Recall',
    desc: 'Get every question right in any single quest.',
    isUnlocked: (progress, xp) => QUESTS.some(quest => progress[quest.id] === quest.questions.length)
  },
  {
    id: 'halfway_hero',
    icon: '🗺️',
    title: 'Halfway Hero',
    desc: 'Attempt at least half of all quests.',
    isUnlocked: (progress, xp) => Object.keys(progress).length >= Math.ceil(QUESTS.length / 2)
  },
  {
    id: 'bookworm',
    icon: '📚',
    title: 'Bookworm',
    desc: 'Attempt every quest at least once.',
    isUnlocked: (progress, xp) => Object.keys(progress).length >= QUESTS.length
  },
  {
    id: 'chronicler',
    icon: '👑',
    title: 'Master Chronicler',
    desc: 'Reach the top level (400 XP).',
    isUnlocked: (progress, xp) => xp >= 400
  }
];

/* ------------------------------------------------------------
   SOUND EFFECTS — synthesized live with the Web Audio API, so
   there are no audio files to download or bundle (keeps the app
   lightweight, works offline, loads instantly).
   ------------------------------------------------------------ */
const soundManager = (() => {
  let ctx = null;
  let bgmOn = JSON.parse(localStorage.getItem(STORAGE_KEYS.bgm) || 'false');
  let bgmOsc = null, bgmGain = null;

  function getCtx(){
    if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if(ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, startOffset, duration, type = 'sine', peakVol = 0.18){
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t0 = c.currentTime + startOffset;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peakVol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  function playCorrect(){
    tone(880, 0, 0.14, 'sine', 0.2);
    tone(1318.5, 0.09, 0.18, 'sine', 0.2);
  }

  function playWrong(){
    tone(180, 0, 0.28, 'sawtooth', 0.12);
  }

  function playFanfare(){
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => tone(freq, i * 0.12, 0.22, 'triangle', 0.18));
  }

  function playTick(){
    tone(1000, 0, 0.05, 'square', 0.05);
  }

  function startBgm(){
    if(bgmOsc) return;
    const c = getCtx();
    bgmOsc = c.createOscillator();
    const bgmOsc2 = c.createOscillator();
    bgmGain = c.createGain();
    bgmOsc.type = 'sine'; bgmOsc.frequency.value = 130.81; // C3, soft drone
    bgmOsc2.type = 'sine'; bgmOsc2.frequency.value = 196.00; // G3
    bgmGain.gain.value = 0.035;
    bgmOsc.connect(bgmGain);
    bgmOsc2.connect(bgmGain);
    bgmGain.connect(c.destination);
    bgmOsc.start(); bgmOsc2.start();
    bgmOsc._partner = bgmOsc2;
  }

  function stopBgm(){
    if(!bgmOsc) return;
    try {
      bgmOsc.stop(); bgmOsc._partner.stop();
    } catch(e) { /* already stopped */ }
    bgmOsc = null; bgmGain = null;
  }

  function toggleBgm(){
    bgmOn = !bgmOn;
    localStorage.setItem(STORAGE_KEYS.bgm, JSON.stringify(bgmOn));
    if(bgmOn) startBgm(); else stopBgm();
    return bgmOn;
  }

  function initIfNeeded(){
    if(bgmOn) startBgm();
  }

  return { playCorrect, playWrong, playFanfare, playTick, toggleBgm, isBgmOn: () => bgmOn, initIfNeeded };
})();

/* ------------------------------------------------------------
   STATE
   ------------------------------------------------------------ */
let state = {
  ign: null,
  xp: 0,
  progress: {},
  answerLog: {},
  activeQuest: null,
  quizIndex: 0,
  quizScore: 0,
  quizStart: null,
  currentAnswers: [],
  timerInterval: null,
  timeRemaining: 0
};

/* ------------------------------------------------------------
   UTIL: storage helpers (all local — this is the "offline" store)
   ------------------------------------------------------------ */
function loadState(){
  state.ign = localStorage.getItem(STORAGE_KEYS.ign);
  state.xp = parseInt(localStorage.getItem(STORAGE_KEYS.xp) || '0', 10);
  state.progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || '{}');
  state.answerLog = JSON.parse(localStorage.getItem(STORAGE_KEYS.answerLog) || '{}');
}
function saveXP(){ localStorage.setItem(STORAGE_KEYS.xp, String(state.xp)); }
function saveProgress(){ localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress)); }
function saveAnswerLog(){ localStorage.setItem(STORAGE_KEYS.answerLog, JSON.stringify(state.answerLog)); }

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
  soundManager.initIfNeeded();
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

function allQuestsComplete(){
  return QUESTS.every(quest => quest.id in state.progress);
}

function renderHub(){
  document.getElementById('ignDisplay').textContent = state.ign;
  const { level, title, pct, xpIntoLevel } = levelFromXP(state.xp);
  document.getElementById('levelLabel').textContent = `${title} · Lv.${level}`;
  document.getElementById('xpNumbers').textContent = `${xpIntoLevel} / 100 XP`;
  document.getElementById('xpFill').style.width = pct + '%';

  // Music toggle label
  const musicBtn = document.getElementById('musicToggleBtn');
  if(musicBtn) musicBtn.textContent = soundManager.isBgmOn() ? '🎵 Music: On' : '🔇 Music: Off';

  // Completion banner
  const banner = document.getElementById('completionBanner');
  if(banner){
    banner.style.display = allQuestsComplete() ? 'flex' : 'none';
  }

  // Quest list
  const list = document.getElementById('questList');
  list.innerHTML = '';
  QUESTS.forEach((quest, i) => {
    const prevDone = i === 0 || (QUESTS[i-1].id in state.progress);
    const completed = quest.id in state.progress;
    const best = state.progress[quest.id];
    const card = document.createElement('div');
    card.className = 'quest-card' + (prevDone ? '' : ' locked') + (completed ? ' completed' : '');
    const metaText = completed
      ? `${best}/${quest.questions.length} · Review`
      : (prevDone ? 'New' : 'Locked');
    card.innerHTML = `
      <div class="quest-icon">${quest.icon}</div>
      <div class="quest-info">
        <h4>${quest.title}</h4>
        <p>${quest.level} <span class="diff-chip diff-${quest.difficulty.toLowerCase()}">${quest.difficulty}</span></p>
      </div>
      <div class="quest-meta">${metaText}
        <small>${quest.xp} XP${quest.timeLimit ? ' · ' + quest.timeLimit + 's/q' : ''}</small>
      </div>`;
    if(completed){
      card.addEventListener('click', () => openReview(quest));
    } else if(prevDone){
      card.addEventListener('click', () => openStory(quest));
    }
    list.appendChild(card);
  });

  renderLeaderboard();
  renderBadges();
  renderSyncStatus();
}

function renderBadges(){
  const wrap = document.getElementById('badgeGrid');
  if(!wrap) return;
  wrap.innerHTML = '';
  BADGES.forEach(badge => {
    const unlocked = badge.isUnlocked(state.progress, state.xp);
    const cell = document.createElement('div');
    cell.className = 'badge-cell' + (unlocked ? ' unlocked' : '');
    cell.title = badge.desc;
    cell.innerHTML = `
      <span class="badge-icon">${badge.icon}</span>
      <span class="badge-title">${badge.title}</span>`;
    wrap.appendChild(cell);
  });
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
    div.textContent = `${p.questTitle} — ${p.score} (earned offline)`;
    pendingList.appendChild(div);
  });
}

function enterHub(){
  renderHub();
  showScreen('screen-hub');
}

document.getElementById('musicToggleBtn')?.addEventListener('click', () => {
  const on = soundManager.toggleBgm();
  document.getElementById('musicToggleBtn').textContent = on ? '🎵 Music: On' : '🔇 Music: Off';
});

document.getElementById('completionBanner')?.addEventListener('click', () => showCompletion());

/* ------------------------------------------------------------
   STORY SCREEN
   ------------------------------------------------------------ */
function openStory(quest){
  state.activeQuest = quest;
  document.getElementById('storyEyebrow').textContent = quest.level;
  document.getElementById('storyTitle').textContent = quest.title;
  document.getElementById('storyText').textContent = quest.text;
  document.getElementById('toAssessmentBtn').style.display = '';
  showScreen('screen-story');
}
document.getElementById('backFromStory').addEventListener('click', enterHub);
document.getElementById('toAssessmentBtn').addEventListener('click', () => {
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizStart = Date.now();
  state.currentAnswers = [];
  showScreen('screen-assessment');
  renderQuestion();
});

/* ------------------------------------------------------------
   ASSESSMENT SCREEN (with optional per-question timer)
   ------------------------------------------------------------ */
function clearTimer(){
  if(state.timerInterval){
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

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

  const timerWrap = document.getElementById('timerWrap');
  clearTimer();
  if(quest.timeLimit){
    timerWrap.style.display = '';
    state.timeRemaining = quest.timeLimit;
    updateTimerDisplay(quest.timeLimit);
    state.timerInterval = setInterval(() => {
      state.timeRemaining--;
      updateTimerDisplay(quest.timeLimit);
      if(state.timeRemaining <= 5 && state.timeRemaining > 0) soundManager.playTick();
      if(state.timeRemaining <= 0){
        clearTimer();
        selectAnswer(-1, null); // time's up — counts as no answer / wrong
      }
    }, 1000);
  } else {
    timerWrap.style.display = 'none';
  }
}

function updateTimerDisplay(max){
  const bar = document.getElementById('timerBarFill');
  const text = document.getElementById('timerText');
  if(!bar || !text) return;
  const pct = Math.max(0, (state.timeRemaining / max) * 100);
  bar.style.width = pct + '%';
  bar.style.background = state.timeRemaining <= 5 ? 'var(--ember)' : 'var(--gold)';
  text.textContent = `⏱ ${Math.max(0, state.timeRemaining)}s`;
}

function selectAnswer(idx, btnEl){
  clearTimer();
  const quest = state.activeQuest;
  const q = quest.questions[state.quizIndex];
  const allBtns = document.querySelectorAll('#choices .choice-btn');
  allBtns.forEach(b => b.disabled = true);

  const correct = idx === q.correct;
  if(correct){
    state.quizScore++;
    soundManager.playCorrect();
    if(btnEl) btnEl.classList.add('correct');
    document.getElementById('qFeedback').textContent = 'Correct — the story confirms that.';
  } else {
    soundManager.playWrong();
    if(btnEl) btnEl.classList.add('wrong');
    // Answer Visibility: always reveal the correct choice immediately, even on timeout.
    allBtns[q.correct].classList.add('correct');
    document.getElementById('qFeedback').textContent = idx === -1
      ? '⏱ Time\'s up — here\'s the correct answer.'
      : 'Not quite — the correct answer is highlighted above.';
  }

  state.currentAnswers.push({ qIndex: state.quizIndex, chosen: idx, correct, skill: q.skill });

  setTimeout(() => {
    state.quizIndex++;
    if(state.quizIndex < quest.questions.length){
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 1300);
}

function finishQuiz(){
  const quest = state.activeQuest;
  const seconds = Math.max(1, Math.round((Date.now() - state.quizStart) / 1000));
  const scoreRatio = state.quizScore / quest.questions.length;
  const earnedXP = Math.round(quest.xp * scoreRatio);

  // Update best score + persist the answer log for Review
  const prevBest = state.progress[quest.id] || 0;
  if(state.quizScore >= prevBest){
    state.progress[quest.id] = state.quizScore;
    state.answerLog[quest.id] = state.currentAnswers;
    saveProgress();
    saveAnswerLog();
  }

  state.xp += earnedXP;
  saveXP();

  // Record to leaderboard / offline queue
  const record = { questTitle: quest.title, score: `${state.quizScore}/${quest.questions.length}`, xp: earnedXP, ts: Date.now() };
  if(navigator.onLine){
    pushToLeaderboard();
  } else {
    const pending = getPending();
    pending.push(record);
    setPending(pending);
  }

  soundManager.playFanfare();

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

document.getElementById('continueBtn').addEventListener('click', () => {
  if(allQuestsComplete()){
    showCompletion();
  } else {
    enterHub();
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if(confirm('Clear all local progress and IGN? This cannot be undone.')){
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    location.reload();
  }
});

/* ------------------------------------------------------------
   REVIEW SCREEN — completed quests can be reviewed (read-only)
   but not replayed unless the whole game is reset.
   ------------------------------------------------------------ */
function openReview(quest){
  document.getElementById('reviewEyebrow').textContent = quest.level;
  document.getElementById('reviewTitle').textContent = quest.title;
  const score = state.progress[quest.id];
  document.getElementById('reviewScore').textContent = `Best score: ${score}/${quest.questions.length}`;

  const log = state.answerLog[quest.id] || [];
  const wrap = document.getElementById('reviewList');
  wrap.innerHTML = '';
  quest.questions.forEach((q, i) => {
    const entry = log.find(l => l.qIndex === i);
    const item = document.createElement('div');
    item.className = 'review-item';
    const chosenText = entry && entry.chosen >= 0 ? q.choices[entry.chosen] : '(no answer — time ran out)';
    const gotItRight = entry ? entry.correct : false;
    item.innerHTML = `
      <p class="review-q">${i + 1}. ${q.q}</p>
      <p class="review-answer ${gotItRight ? 'right' : 'wrong'}">Your answer: ${chosenText}</p>
      ${!gotItRight ? `<p class="review-answer right">Correct answer: ${q.choices[q.correct]}</p>` : ''}
    `;
    wrap.appendChild(item);
  });

  showScreen('screen-review');
}
document.getElementById('backFromReview')?.addEventListener('click', enterHub);

/* ------------------------------------------------------------
   GAME COMPLETION + RECOMMENDATIONS
   ------------------------------------------------------------ */
function showCompletion(){
  const totalCorrect = Object.values(state.progress).reduce((a, b) => a + b, 0);

  document.getElementById('completionScore').textContent = `${totalCorrect} / ${TOTAL_QUESTIONS}`;
  document.getElementById('completionXP').textContent = `${state.xp} XP total`;

  // Tally wrong answers by skill across every stored quest attempt
  const missCounts = {};
  Object.values(state.answerLog).forEach(log => {
    log.forEach(entry => {
      if(!entry.correct){
        missCounts[entry.skill] = (missCounts[entry.skill] || 0) + 1;
      }
    });
  });
  const weakSkills = Object.entries(missCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([skill]) => skill);

  const tier = scoreTierMessage(totalCorrect);
  document.getElementById('completionTier').textContent = `${tier.tier} Reader`;
  document.getElementById('completionTierNote').textContent = tier.note;

  const recWrap = document.getElementById('recommendationList');
  recWrap.innerHTML = '';
  if(weakSkills.length === 0){
    const div = document.createElement('div');
    div.className = 'rec-card';
    div.innerHTML = `<h4>Well-rounded reader!</h4><p>You didn't miss enough questions in any one area to flag a specific weak spot — nice work. Keep challenging yourself with more advanced texts.</p>`;
    recWrap.appendChild(div);
  } else {
    weakSkills.forEach(skill => {
      const rec = RECOMMENDATIONS[skill];
      if(!rec) return;
      const div = document.createElement('div');
      div.className = 'rec-card';
      div.innerHTML = `<h4>${rec.title} <span class="rec-tag">${SKILL_LABELS[skill]}</span></h4><p>${rec.suggestion}</p>`;
      recWrap.appendChild(div);
    });
  }

  showScreen('screen-completion');
}
document.getElementById('completionContinueBtn')?.addEventListener('click', enterHub);

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
