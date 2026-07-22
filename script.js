/* ============================================================
   PANITIKAN QUEST — prototype app logic
   Fully local: no server, no "online" concept. Every reader who
   types an IGN on this device gets their own local save profile.
   No names/ages/personal info are ever collected — only a
   self-chosen IGN.
   ============================================================ */

const STORAGE_KEYS = {
  currentIgn: 'pq_current_ign',
  profiles: 'pq_profiles',   // { [ign]: ProfileShape }
  bgm: 'pq_bgm'               // device-level music preference (not per-profile)
};

/* ------------------------------------------------------------
   QUEST / PASSAGE DATA — unchanged content from the last update
   (3 -> 4 -> 5 -> 5 -> 6 -> 7 = 30 questions across 6 chapters).
   The engine below supports any number of additional chapters —
   adding more is purely a data-authoring task, not a code change.
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

const RECOMMENDATIONS = {
  literal: { title: 'Sharpen Literal Recall', suggestion: 'Try reading "Ibong Adarna" one stanza at a time, pausing after each to restate what just happened before moving on.' },
  inference: { title: 'Practice Reading Between the Lines', suggestion: 'Nick Joaquin\'s "May Day Eve" is great inference practice — after each scene, ask yourself why a character just did that.' },
  vocabulary: { title: 'Build Context-Clue Skills', suggestion: 'While reading a chapter of Jose Rizal\'s "Noli Me Tangere," pick five unfamiliar words and guess their meaning from context.' },
  main_idea: { title: 'Practice Summarizing', suggestion: 'After each canto of "Florante at Laura," write the main idea in a single sentence.' },
  argument: { title: 'Strengthen Argument Analysis', suggestion: 'Read a local newspaper editorial and identify its claim, its evidence, and any counterclaim it responds to.' }
};
const SKILL_LABELS = { literal: 'Literal Recall', inference: 'Inference', vocabulary: 'Vocabulary', main_idea: 'Main Idea', argument: 'Argument Analysis' };
const TOTAL_QUESTIONS = QUESTS.reduce((sum, q) => sum + q.questions.length, 0);

function scoreTierMessage(totalCorrect){
  const pct = totalCorrect / TOTAL_QUESTIONS;
  if(pct < 0.5) return { tier: 'Foundational', note: 'Focus on the basics for now: re-read passages slowly, keep a small glossary of new words, and don\'t hesitate to reread a paragraph twice.' };
  if(pct < 0.8) return { tier: 'Intermediate', note: 'You\'re building solid comprehension. Try short stories slightly above your usual level, paying close attention to inference and vocabulary-in-context.' };
  return { tier: 'Advanced', note: 'Excellent comprehension overall. Try more advanced texts and opinion/debate-style articles to keep sharpening argument analysis.' };
}

/* ------------------------------------------------------------
   SHOP ITEMS — bought with coins, used during a quiz
   ------------------------------------------------------------ */
const SHOP_ITEMS = [
  { id: 'magnify', icon: '🔍', name: 'Magnifying Glass', cost: 15, desc: 'Eliminates 2 wrong choices from your current question.' },
  { id: 'scroll', icon: '📜', name: 'Scroll of Insight', cost: 20, desc: 'Reveals what kind of thinking the question is testing, as a clue.' },
  { id: 'revive', icon: '❤️', name: 'Revive Charm', cost: 30, desc: 'Instantly refill your hearts if you run out mid-quiz.' },
  { id: 'skip', icon: '⏭️', name: 'Skip Token', cost: 25, desc: 'Skip the current question with no heart lost.' },
  { id: 'doubleXp', icon: '✨', name: 'Double XP Elixir', cost: 40, desc: 'Doubles the XP you earn from your next completed chapter.' }
];

/* ------------------------------------------------------------
   BADGES — read from the active profile. Newly-unlocked badges
   trigger a celebration toast + coin bonus.
   ------------------------------------------------------------ */
const BADGES = [
  { id: 'first_steps', icon: '🥾', title: 'First Steps', desc: 'Complete your first quest.', isUnlocked: p => Object.keys(p.progress).length >= 1 },
  { id: 'perfect_recall', icon: '🌟', title: 'Perfect Recall', desc: 'Get every question right in any single quest.', isUnlocked: p => QUESTS.some(q => p.progress[q.id] === q.questions.length) },
  { id: 'halfway_hero', icon: '🗺️', title: 'Halfway Hero', desc: 'Attempt at least half of all quests.', isUnlocked: p => Object.keys(p.progress).length >= Math.ceil(QUESTS.length / 2) },
  { id: 'bookworm', icon: '📚', title: 'Bookworm', desc: 'Attempt every quest at least once.', isUnlocked: p => Object.keys(p.progress).length >= QUESTS.length },
  { id: 'chronicler', icon: '👑', title: 'Master Chronicler', desc: 'Reach the top level (400 XP).', isUnlocked: p => p.xp >= 400 },
  { id: 'on_fire', icon: '🔥', title: 'On Fire', desc: 'Reach a 3-day play streak.', isUnlocked: p => p.streak >= 3 },
  { id: 'coin_collector', icon: '🪙', title: 'Coin Collector', desc: 'Earn 100 coins total (lifetime, not current balance).', isUnlocked: p => p.totalCoinsEarned >= 100 }
];

/* ------------------------------------------------------------
   SOUND EFFECTS — synthesized live (no audio files to bundle).
   Softer, friendlier tones than a typical harsh quiz-app buzzer.
   ------------------------------------------------------------ */
const soundManager = (() => {
  let ctx = null;
  let bgmOn = JSON.parse(localStorage.getItem(STORAGE_KEYS.bgm) || 'false');
  let bgmLoopTimer = null;

  function getCtx(){
    if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if(ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, startOffset, duration, type = 'sine', peakVol = 0.16){
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t0 = c.currentTime + startOffset;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peakVol, t0 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }
  function playCorrect(){ tone(880, 0, 0.14, 'sine', 0.18); tone(1318.5, 0.09, 0.18, 'sine', 0.18); }
  // Gentle, friendly "not quite" tone — a soft two-note dip, not a harsh buzzer.
  function playWrong(){ tone(392, 0, 0.16, 'sine', 0.1); tone(329.6, 0.1, 0.22, 'sine', 0.1); }
  function playFanfare(){ [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 0.22, 'triangle', 0.16)); }
  function playTick(){ tone(1000, 0, 0.05, 'sine', 0.04); }
  function playCoin(){ tone(1567.98, 0, 0.08, 'sine', 0.12); tone(2093, 0.05, 0.1, 'sine', 0.1); }
  function playPurchase(){ tone(660, 0, 0.08, 'triangle', 0.12); tone(880, 0.06, 0.12, 'triangle', 0.12); }
  function playHeartLose(){ tone(220, 0, 0.2, 'sine', 0.09); }

  function startBgm(){
    if(bgmLoopTimer) return;
    scheduleBgmLoop();
  }
  function stopBgm(){
    if(bgmLoopTimer){ clearTimeout(bgmLoopTimer); bgmLoopTimer = null; }
  }
  // Original 8-bit "quest adventure" loop — square-wave lead over a punchy
  // triangle bass with a light hi-hat pulse. No licensed music is bundled;
  // this is composed fresh so there's nothing to clear rights on.
  const MELODY = [261.63,329.63,392.00,523.25,392.00,329.63,293.66,329.63,
                   261.63,329.63,392.00,523.25,392.00,329.63,293.66,261.63];
  const BASS = [130.81,130.81,130.81,130.81,196.00,196.00,130.81,130.81];
  const STEP = 0.2; // seconds per eighth note (~150 BPM feel)
  function scheduleBgmLoop(){
    if(!bgmOn) return;
    MELODY.forEach((freq, i) => tone(freq, i * STEP, STEP * 0.92, 'square', 0.05));
    BASS.forEach((freq, i) => tone(freq, i * STEP * 2, STEP * 1.8, 'triangle', 0.07));
    for(let i = 1; i < MELODY.length; i += 2) tone(5200, i * STEP, 0.03, 'square', 0.015);
    const loopSeconds = MELODY.length * STEP;
    bgmLoopTimer = setTimeout(scheduleBgmLoop, loopSeconds * 1000);
  }
  function toggleBgm(){
    bgmOn = !bgmOn;
    localStorage.setItem(STORAGE_KEYS.bgm, JSON.stringify(bgmOn));
    if(bgmOn) startBgm(); else stopBgm();
    return bgmOn;
  }
  function initIfNeeded(){ if(bgmOn) startBgm(); }

  return { playCorrect, playWrong, playFanfare, playTick, playCoin, playPurchase, playHeartLose, toggleBgm, isBgmOn: () => bgmOn, initIfNeeded };
})();

/* ------------------------------------------------------------
   PROFILES — one local save-slot per IGN. The Hall of Legends is
   simply every profile ever created on this device, so it starts
   genuinely empty and fills up only with real readers.
   ------------------------------------------------------------ */
function defaultProfile(){
  return {
    xp: 0,
    coins: 0,
    totalCoinsEarned: 0,
    progress: {},
    answerLog: {},
    inventory: { magnify: 0, scroll: 0, revive: 0, skip: 0, doubleXp: 0 },
    streak: 0,
    lastPlayedDate: null,
    celebratedBadges: []
  };
}
function loadAllProfiles(){ return JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles) || '{}'); }
function saveAllProfiles(all){ localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(all)); }
function profileExists(ign){ const all = loadAllProfiles(); return Object.prototype.hasOwnProperty.call(all, ign); }
function getOrCreateProfile(ign){
  const all = loadAllProfiles();
  if(!all[ign]) all[ign] = defaultProfile();
  return all[ign];
}
function saveCurrentProfile(){
  const all = loadAllProfiles();
  all[state.ign] = state.profile;
  saveAllProfiles(all);
}
function todayString(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function applyDailyStreak(){
  const today = todayString();
  const p = state.profile;
  if(p.lastPlayedDate === today) return; // already counted today
  if(p.lastPlayedDate){
    const prev = new Date(p.lastPlayedDate);
    const diffDays = Math.round((new Date(today) - prev) / 86400000);
    p.streak = diffDays === 1 ? p.streak + 1 : 1;
  } else {
    p.streak = 1;
  }
  p.lastPlayedDate = today;
  const bonus = Math.min(50, p.streak * 5);
  addCoins(bonus, false);
  queueToast(`🔥 Day ${p.streak} streak! +${bonus} coins`, false);
  saveCurrentProfile();
}
function addCoins(amount, playSound = true){
  state.profile.coins += amount;
  state.profile.totalCoinsEarned += amount;
  if(playSound) soundManager.playCoin();
}

/* ------------------------------------------------------------
   TOASTS — generic notification + celebratory achievement popups
   ------------------------------------------------------------ */
let toastQueue = [];
let toastShowing = false;
function queueToast(text, celebration){
  toastQueue.push({ text, celebration: !!celebration });
  processToastQueue();
}
function processToastQueue(){
  if(toastShowing || toastQueue.length === 0) return;
  toastShowing = true;
  const { text, celebration } = toastQueue.shift();
  const container = document.getElementById('toastContainer');
  const div = document.createElement('div');
  div.className = 'toast' + (celebration ? ' toast-celebrate' : '');
  div.textContent = text;
  container.appendChild(div);
  requestAnimationFrame(() => div.classList.add('show'));
  const dwell = celebration ? 2800 : 2000;
  setTimeout(() => {
    div.classList.remove('show');
    setTimeout(() => { div.remove(); toastShowing = false; processToastQueue(); }, 350);
  }, dwell);
}
function celebrateNewBadges(beforeProfileSnapshot){
  const newly = BADGES.filter(b => b.isUnlocked(state.profile) && !b.isUnlocked(beforeProfileSnapshot));
  newly.forEach(b => {
    if(!state.profile.celebratedBadges.includes(b.id)){
      state.profile.celebratedBadges.push(b.id);
      addCoins(20, false);
      queueToast(`🎉 Achievement Unlocked: ${b.title}! (+20 coins)`, true);
    }
  });
  if(newly.length) saveCurrentProfile();
}
function snapshotProfile(){ return JSON.parse(JSON.stringify(state.profile)); }

/* ------------------------------------------------------------
   STATE
   ------------------------------------------------------------ */
let state = {
  ign: null,
  profile: null,
  activeQuest: null,
  quizIndex: 0,
  quizScore: 0,
  quizStart: null,
  currentAnswers: [],
  hearts: 3,
  currentOrder: [],
  eliminated: [],
  hintShown: false,
  doubleXpArmed: false,
  timerInterval: null,
  timeRemaining: 0
};

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ------------------------------------------------------------
   IGN SCREEN (login / resume)
   ------------------------------------------------------------ */
const ignInput = document.getElementById('ignInput');
const enterBtn = document.getElementById('enterBtn');
const ignHint = document.getElementById('ignHint');
const ignResumeNote = document.getElementById('ignResumeNote');

function validateIGN(value){ return /^[A-Za-z0-9_]{2,16}$/.test(value); }
ignInput.addEventListener('input', () => {
  const val = ignInput.value.trim();
  const ok = validateIGN(val);
  enterBtn.disabled = !ok;
  ignHint.style.color = ignInput.value.length === 0 || ok ? '' : 'var(--ember)';
  if(ok && profileExists(val)){
    ignResumeNote.textContent = '👋 Welcome back! This name has saved progress on this device.';
    enterBtn.textContent = 'Resume Your Scroll';
  } else {
    ignResumeNote.textContent = ok ? '✨ New reader — you\'ll start fresh under this name.' : '';
    enterBtn.textContent = 'Seal Your Scroll';
  }
});
enterBtn.addEventListener('click', () => {
  const ign = ignInput.value.trim();
  if(!validateIGN(ign)) return;
  loginAs(ign);
});
function loginAs(ign){
  state.ign = ign;
  state.profile = getOrCreateProfile(ign);
  localStorage.setItem(STORAGE_KEYS.currentIgn, ign);
  saveCurrentProfile();
  soundManager.initIfNeeded();
  const before = snapshotProfile();
  applyDailyStreak();
  celebrateNewBadges(before);
  enterHub();
}

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
function allQuestsComplete(){ return QUESTS.every(quest => quest.id in state.profile.progress); }
function heartLossFor(quest){ return quest.difficulty === 'Hard' ? 2 : 1; }

function renderHub(){
  const p = state.profile;
  document.getElementById('ignDisplay').textContent = state.ign;
  const { level, title, pct, xpIntoLevel } = levelFromXP(p.xp);
  document.getElementById('levelLabel').textContent = `${title} · Lv.${level}`;
  document.getElementById('xpNumbers').textContent = `${xpIntoLevel} / 100 XP`;
  document.getElementById('xpFill').style.width = pct + '%';
  document.getElementById('coinBalance').textContent = `🪙 ${p.coins}`;
  document.getElementById('streakBadgeText').textContent = p.streak > 0 ? `🔥 ${p.streak}-day streak` : '🔥 Start a streak today';

  const musicBtn = document.getElementById('musicToggleBtn');
  if(musicBtn) musicBtn.textContent = soundManager.isBgmOn() ? '🎵 Music: On' : '🔇 Music: Off';

  const resetBtn = document.getElementById('resetBtn');
  const complete = allQuestsComplete();
  resetBtn.disabled = !complete;
  resetBtn.title = complete ? 'Start this profile over from scratch' : 'Complete every chapter first to unlock Reset';

  const banner = document.getElementById('completionBanner');
  if(banner) banner.style.display = complete ? 'flex' : 'none';

  const list = document.getElementById('questList');
  list.innerHTML = '';
  QUESTS.forEach((quest, i) => {
    const prevDone = i === 0 || (QUESTS[i-1].id in p.progress);
    const completed = quest.id in p.progress;
    const best = p.progress[quest.id];
    const card = document.createElement('div');
    card.className = 'quest-card' + (prevDone ? '' : ' locked') + (completed ? ' completed' : '');
    const metaText = completed ? `${best}/${quest.questions.length} · Review` : (prevDone ? 'New' : 'Locked');
    card.innerHTML = `
      <div class="quest-icon">${quest.icon}</div>
      <div class="quest-info">
        <h4>${quest.title}</h4>
        <p>${quest.level} <span class="diff-chip diff-${quest.difficulty.toLowerCase()}">${quest.difficulty}</span></p>
      </div>
      <div class="quest-meta">${metaText}
        <small>${quest.xp} XP${quest.timeLimit ? ' · ' + quest.timeLimit + 's/q' : ''}</small>
      </div>`;
    if(completed) card.addEventListener('click', () => openReview(quest));
    else if(prevDone) card.addEventListener('click', () => openStory(quest));
    list.appendChild(card);
  });

  renderLeaderboard();
  renderBadges();
}

function renderBadges(){
  const wrap = document.getElementById('badgeGrid');
  if(!wrap) return;
  wrap.innerHTML = '';
  BADGES.forEach(badge => {
    const unlocked = badge.isUnlocked(state.profile);
    const cell = document.createElement('div');
    cell.className = 'badge-cell' + (unlocked ? ' unlocked' : '');
    cell.innerHTML = `
      <span class="badge-icon">${badge.icon}</span>
      <span class="badge-title">${badge.title}</span>
      <p class="badge-desc">${badge.desc}</p>`;
    cell.addEventListener('click', () => cell.classList.toggle('expanded'));
    wrap.appendChild(cell);
  });
}

function renderLeaderboard(){
  const all = loadAllProfiles();
  const entries = Object.entries(all).map(([name, prof]) => ({ name, xp: prof.xp }));
  const merged = entries.sort((a, b) => b.xp - a.xp).slice(0, 10);
  const ol = document.getElementById('leaderboard');
  ol.innerHTML = '';
  if(merged.length === 0){
    ol.innerHTML = `<li class="lb-empty">No readers yet on this device — be the first!</li>`;
    return;
  }
  merged.forEach((p, i) => {
    const li = document.createElement('li');
    const isMe = p.name === state.ign;
    if(isMe) li.classList.add('me');
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i+1);
    li.innerHTML = `<span class="lb-rank">${medal}</span><span class="lb-name">${p.name}${isMe ? ' (you)' : ''}</span><span class="lb-score">${p.xp} XP</span>`;
    ol.appendChild(li);
  });
}

function enterHub(){ renderHub(); showScreen('screen-hub'); }

document.getElementById('musicToggleBtn')?.addEventListener('click', () => {
  const on = soundManager.toggleBgm();
  document.getElementById('musicToggleBtn').textContent = on ? '🎵 Music: On' : '🔇 Music: Off';
});
document.getElementById('completionBanner')?.addEventListener('click', () => showCompletion());
document.getElementById('switchProfileBtn')?.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEYS.currentIgn);
  state.ign = null; state.profile = null;
  ignInput.value = '';
  enterBtn.disabled = true;
  ignResumeNote.textContent = '';
  showScreen('screen-ign');
});
document.getElementById('shopBtn')?.addEventListener('click', () => openShop());

/* ------------------------------------------------------------
   SHOP
   ------------------------------------------------------------ */
function openShop(){
  document.getElementById('shopCoinBalance').textContent = `🪙 ${state.profile.coins}`;
  const wrap = document.getElementById('shopList');
  wrap.innerHTML = '';
  SHOP_ITEMS.forEach(item => {
    const owned = state.profile.inventory[item.id] || 0;
    const canAfford = state.profile.coins >= item.cost;
    const row = document.createElement('div');
    row.className = 'shop-item';
    row.innerHTML = `
      <span class="shop-icon">${item.icon}</span>
      <div class="shop-info">
        <h4>${item.name} <span class="shop-owned">(owned: ${owned})</span></h4>
        <p>${item.desc}</p>
      </div>
      <button class="btn-buy" ${canAfford ? '' : 'disabled'}>${item.cost} 🪙</button>`;
    row.querySelector('.btn-buy').addEventListener('click', () => buyItem(item));
    wrap.appendChild(row);
  });
  showScreen('screen-shop');
}
function buyItem(item){
  if(state.profile.coins < item.cost) return;
  state.profile.coins -= item.cost;
  state.profile.inventory[item.id] = (state.profile.inventory[item.id] || 0) + 1;
  soundManager.playPurchase();
  saveCurrentProfile();
  queueToast(`Bought ${item.icon} ${item.name}!`, false);
  openShop();
}
document.getElementById('backFromShop')?.addEventListener('click', enterHub);

/* ------------------------------------------------------------
   STORY SCREEN
   ------------------------------------------------------------ */
function openStory(quest){
  state.activeQuest = quest;
  document.getElementById('storyEyebrow').textContent = quest.level;
  document.getElementById('storyTitle').textContent = quest.title;
  document.getElementById('storyText').textContent = quest.text;
  const dxOwned = state.profile.inventory.doubleXp || 0;
  document.getElementById('doubleXpNote').textContent = dxOwned > 0
    ? `✨ You own ${dxOwned} Double XP Elixir(s) — you'll be asked to use one before starting.`
    : '';
  showScreen('screen-story');
}
document.getElementById('backFromStory').addEventListener('click', enterHub);
document.getElementById('toAssessmentBtn').addEventListener('click', () => {
  state.doubleXpArmed = false;
  const owned = state.profile.inventory.doubleXp || 0;
  if(owned > 0 && confirm(`Use a ✨ Double XP Elixir for this chapter? You have ${owned}.`)){
    state.profile.inventory.doubleXp -= 1;
    state.doubleXpArmed = true;
    saveCurrentProfile();
  }
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizStart = Date.now();
  state.currentAnswers = [];
  state.hearts = 3;
  showScreen('screen-assessment');
  renderQuestion();
});

/* ------------------------------------------------------------
   ASSESSMENT SCREEN — shuffled choices, timer, hearts, power-ups
   ------------------------------------------------------------ */
function clearTimer(){ if(state.timerInterval){ clearInterval(state.timerInterval); state.timerInterval = null; } }

function shuffledOrder(n){
  const arr = Array.from({length:n}, (_, i) => i);
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderQuestion(){
  const quest = state.activeQuest;
  const q = quest.questions[state.quizIndex];
  state.currentOrder = shuffledOrder(q.choices.length);
  state.eliminated = [];
  state.hintShown = false;

  document.getElementById('qCounter').textContent = `${state.quizIndex + 1} / ${quest.questions.length}`;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('qFeedback').textContent = '';
  document.getElementById('heartsRow').textContent = '❤️'.repeat(state.hearts) + '🖤'.repeat(3 - state.hearts);
  document.getElementById('quizCoinBalance').textContent = `🪙 ${state.profile.coins}`;
  renderPowerupBar();
  renderChoices();

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
      if(state.timeRemaining <= 0){ clearTimer(); selectAnswer(-1, null); }
    }, 1000);
  } else {
    timerWrap.style.display = 'none';
  }
}

function renderPowerupBar(){
  const wrap = document.getElementById('powerupBar');
  const inv = state.profile.inventory;
  wrap.innerHTML = `
    <button class="powerup-btn" id="btnMagnify" ${inv.magnify > 0 ? '' : 'disabled'}>🔍 Magnify (${inv.magnify||0})</button>
    <button class="powerup-btn" id="btnHint" ${inv.scroll > 0 && !state.hintShown ? '' : 'disabled'}>📜 Hint (${inv.scroll||0})</button>
    <button class="powerup-btn" id="btnSkip" ${inv.skip > 0 ? '' : 'disabled'}>⏭️ Skip (${inv.skip||0})</button>
  `;
  document.getElementById('btnMagnify').addEventListener('click', useMagnify);
  document.getElementById('btnHint').addEventListener('click', useHint);
  document.getElementById('btnSkip').addEventListener('click', useSkip);
}

function renderChoices(){
  const quest = state.activeQuest;
  const q = quest.questions[state.quizIndex];
  const wrap = document.getElementById('choices');
  wrap.innerHTML = '';
  state.currentOrder.forEach(originalIdx => {
    if(state.eliminated.includes(originalIdx)) return;
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = q.choices[originalIdx];
    btn.addEventListener('click', () => selectAnswer(originalIdx, btn));
    wrap.appendChild(btn);
  });
  const hintEl = document.getElementById('hintText');
  hintEl.textContent = state.hintShown ? `💡 This question is testing: ${SKILL_LABELS[q.skill]}` : '';
}

function useMagnify(){
  const quest = state.activeQuest;
  const q = quest.questions[state.quizIndex];
  if((state.profile.inventory.magnify || 0) <= 0) return;
  const wrongIndices = q.choices.map((_, i) => i).filter(i => i !== q.correct && !state.eliminated.includes(i));
  const toEliminate = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
  state.eliminated.push(...toEliminate);
  state.profile.inventory.magnify -= 1;
  soundManager.playTick();
  saveCurrentProfile();
  renderPowerupBar();
  renderChoices();
}
function useHint(){
  if((state.profile.inventory.scroll || 0) <= 0 || state.hintShown) return;
  state.profile.inventory.scroll -= 1;
  state.hintShown = true;
  soundManager.playTick();
  saveCurrentProfile();
  renderPowerupBar();
  renderChoices();
}
function useSkip(){
  if((state.profile.inventory.skip || 0) <= 0) return;
  state.profile.inventory.skip -= 1;
  saveCurrentProfile();
  clearTimer();
  const quest = state.activeQuest;
  const q = quest.questions[state.quizIndex];
  state.currentAnswers.push({ qIndex: state.quizIndex, chosen: -2, correct: false, skill: q.skill, skipped: true });
  advanceQuestion();
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
  document.querySelectorAll('#choices .choice-btn').forEach(b => b.disabled = true);

  const correct = idx === q.correct;
  if(correct){
    state.quizScore++;
    soundManager.playCorrect();
    addCoins(2);
    if(btnEl) btnEl.classList.add('correct');
    document.getElementById('qFeedback').textContent = 'Correct — the story confirms that.';
  } else {
    soundManager.playWrong();
    if(btnEl) btnEl.classList.add('wrong');
    document.querySelectorAll('#choices .choice-btn').forEach(b => {
      if(b.textContent === q.choices[q.correct]) b.classList.add('correct');
    });
    document.getElementById('qFeedback').textContent = idx === -1
      ? '⏱ Time\'s up — here\'s the correct answer.'
      : 'Not quite — the correct answer is highlighted above.';
    state.hearts -= heartLossFor(quest);
    soundManager.playHeartLose();
    document.getElementById('heartsRow').textContent = '❤️'.repeat(Math.max(0,state.hearts)) + '🖤'.repeat(3 - Math.max(0,state.hearts));
  }
  document.getElementById('quizCoinBalance').textContent = `🪙 ${state.profile.coins}`;
  saveCurrentProfile();

  state.currentAnswers.push({ qIndex: state.quizIndex, chosen: idx, correct, skill: q.skill });
  setTimeout(() => advanceQuestion(), 1300);
}

function advanceQuestion(){
  const quest = state.activeQuest;
  state.quizIndex++;
  if(state.hearts <= 0 && state.quizIndex < quest.questions.length){
    showOutOfHearts();
    return;
  }
  if(state.quizIndex < quest.questions.length) renderQuestion();
  else finishQuiz();
}

/* ------------------------------------------------------------
   OUT OF HEARTS
   ------------------------------------------------------------ */
function showOutOfHearts(){
  document.getElementById('heartsCoinBalance').textContent = `🪙 ${state.profile.coins}`;
  document.getElementById('reviveBtn').disabled = state.profile.coins < 30;
  showScreen('screen-hearts-empty');
}
document.getElementById('reviveBtn')?.addEventListener('click', () => {
  if(state.profile.coins < 30) return;
  state.profile.coins -= 30;
  state.hearts = 3;
  soundManager.playPurchase();
  saveCurrentProfile();
  showScreen('screen-assessment');
  renderQuestion();
});
document.getElementById('watchAdBtn')?.addEventListener('click', () => {
  const btn = document.getElementById('watchAdBtn');
  btn.disabled = true;
  btn.textContent = '▶️ Watching simulated ad…';
  setTimeout(() => {
    state.hearts = 1;
    btn.disabled = false;
    btn.textContent = '📺 Watch Ad for +1 Heart (simulated)';
    showScreen('screen-assessment');
    renderQuestion();
  }, 1500);
});
document.getElementById('giveUpBtn')?.addEventListener('click', () => {
  // Attempt discarded — nothing saved for this run, chapter stays unlocked to retry anytime.
  enterHub();
});

/* ------------------------------------------------------------
   FINISH QUIZ / RESULTS
   ------------------------------------------------------------ */
function finishQuiz(){
  const quest = state.activeQuest;
  const seconds = Math.max(1, Math.round((Date.now() - state.quizStart) / 1000));
  const scoreRatio = state.quizScore / quest.questions.length;
  let earnedXP = Math.round(quest.xp * scoreRatio);
  if(state.doubleXpArmed) earnedXP *= 2;

  const before = snapshotProfile();
  const p = state.profile;
  const prevBest = p.progress[quest.id] || 0;
  if(state.quizScore >= prevBest){
    p.progress[quest.id] = state.quizScore;
    p.answerLog[quest.id] = state.currentAnswers;
  }
  p.xp += earnedXP;
  const completionBonus = quest.difficulty === 'Hard' ? 20 : quest.difficulty === 'Medium' ? 15 : 10;
  addCoins(completionBonus);
  saveCurrentProfile();
  celebrateNewBadges(before);

  soundManager.playFanfare();

  document.getElementById('resultBadge').textContent = quest.title;
  document.getElementById('resultHeadline').textContent =
    scoreRatio === 1 ? 'Perfect Recall!' : scoreRatio >= 0.6 ? 'Well Read.' : 'Keep Practicing.';
  document.getElementById('resultScore').textContent = `${state.quizScore}/${quest.questions.length}`;
  document.getElementById('resultXP').textContent = `+${earnedXP}${state.doubleXpArmed ? ' (2x!)' : ''}`;
  document.getElementById('resultTime').textContent = `${seconds}s`;
  document.getElementById('resultNote').textContent = `Saved to your local Hall of Legends. +${completionBonus} 🪙 chapter bonus.`;

  showScreen('screen-results');
}

document.getElementById('continueBtn').addEventListener('click', () => {
  if(allQuestsComplete()) { showCompletion(); } else { enterHub(); }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if(!allQuestsComplete()) return;
  if(confirm('Reset your progress, XP, and coins for this profile? Your IGN stays, and other readers on this device keep their own saves.')){
    const all = loadAllProfiles();
    all[state.ign] = defaultProfile();
    saveAllProfiles(all);
    state.profile = all[state.ign];
    enterHub();
  }
});

/* ------------------------------------------------------------
   REVIEW SCREEN
   ------------------------------------------------------------ */
function openReview(quest){
  document.getElementById('reviewEyebrow').textContent = quest.level;
  document.getElementById('reviewTitle').textContent = quest.title;
  const score = state.profile.progress[quest.id];
  document.getElementById('reviewScore').textContent = `Best score: ${score}/${quest.questions.length}`;

  const log = state.profile.answerLog[quest.id] || [];
  const wrap = document.getElementById('reviewList');
  wrap.innerHTML = '';
  quest.questions.forEach((q, i) => {
    const entry = log.find(l => l.qIndex === i);
    const item = document.createElement('div');
    item.className = 'review-item';
    let chosenText = '(not recorded)';
    if(entry){
      if(entry.skipped) chosenText = '(skipped with a Skip Token)';
      else if(entry.chosen === -1) chosenText = '(no answer — time ran out)';
      else chosenText = q.choices[entry.chosen];
    }
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
  const p = state.profile;
  const totalCorrect = Object.values(p.progress).reduce((a, b) => a + b, 0);
  document.getElementById('completionScore').textContent = `${totalCorrect} / ${TOTAL_QUESTIONS}`;
  document.getElementById('completionXP').textContent = `${p.xp} XP total`;

  const missCounts = {};
  Object.values(p.answerLog).forEach(log => {
    log.forEach(entry => {
      if(!entry.correct && !entry.skipped) missCounts[entry.skill] = (missCounts[entry.skill] || 0) + 1;
    });
  });
  const weakSkills = Object.entries(missCounts).sort((a,b) => b[1]-a[1]).slice(0,2).map(([s]) => s);

  const tier = scoreTierMessage(totalCorrect);
  document.getElementById('completionTier').textContent = `${tier.tier} Reader`;
  document.getElementById('completionTierNote').textContent = tier.note;

  const recWrap = document.getElementById('recommendationList');
  recWrap.innerHTML = '';
  if(weakSkills.length === 0){
    recWrap.innerHTML = `<div class="rec-card"><h4>Well-rounded reader!</h4><p>You didn't miss enough questions in any one area to flag a specific weak spot — nice work.</p></div>`;
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
   INIT — resume last session's IGN automatically, if any
   ------------------------------------------------------------ */
function init(){
  const savedIgn = localStorage.getItem(STORAGE_KEYS.currentIgn);
  if(savedIgn && profileExists(savedIgn)){
    state.ign = savedIgn;
    state.profile = getOrCreateProfile(savedIgn);
    const before = snapshotProfile();
    applyDailyStreak();
    celebrateNewBadges(before);
    enterHub();
  } else {
    showScreen('screen-ign');
  }
}
init();