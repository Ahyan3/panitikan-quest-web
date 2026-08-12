/* ============================================================
   PANITIKAN QUEST — Reading Comprehension Research Tool
   Pre-Test -> Placement -> Tiered Practice -> Post-Test -> Growth Report
   All 178 questions and their correct answers are transcribed from
   the uploaded curriculum document and verified against its answer
   key. Two items (Proficient B, Q3 and Q5) had a formatting glitch
   in the SOURCE PDF itself (an option's letter label was dropped);
   both were reconstructed from the visible text and are noted below.
   One item (Proficient B, Q4) is genuinely missing its "C" option in
   the source document — it ships here as a 3-choice question rather
   than a fabricated 4th choice.
   ============================================================ */

const STORAGE_KEYS = {
  currentIgn: 'pq_current_ign',
  profiles: 'pq_profiles',
  bgm: 'pq_bgm'
};

/* ------------------------------------------------------------
   PRE-TEST / POST-TEST — same 3 passages, same 30 questions.
   Post-test reuses this bank with question ORDER shuffled per
   passage ("jumbled"), per the spec.
   ------------------------------------------------------------ */
const PRETEST_PASSAGES = [
  {
    id: 'pretest-a',
    title: "Still I Rise",
    author: "Maya Angelou",
    kind: 'poem',
    timeLimitSeconds: 900,
    text: `You may write me down in history
With your bitter, twisted lies,
You may trod me in the very dirt
But still, like dust, I'll rise.

Does my sassiness upset you?
Why are you beset with gloom?
'Cause I walk like I've got oil wells
Pumping in my living room

Just like moons and like suns,
With the certainty of tides.
Just like hopes springing high,
Still I'll rise

Did you want to see me broken?
Bowed head and lowered eyes?
Shoulders falling like teardrops.
Weakened by my soulful cries?

Does my haughtiness offend you?
Don't you take it awful hard?
'Cause I laugh like I've got gold mines
Diggin' in my own backyard.

You may shoot me with your words,
You may cut me with your eyes,
You may kill me with your hatefulness,
But still, like air, I'll rise.

Does my sexiness upset you?
Does it come as a surprise?
That I dance like I've got diamonds.
At the meeting of my thighs?

Out of the huts of history's shame
I rise
Up from a past that's rooted in pain
I rise
I'm a black ocean, leaping and wide,
Welling and swelling I bear in the tide

Leaving behind nights of terror and fear
I rise
Into a daybreak that's wondrously clear
I rise
Bringing the gifts that my ancestors gave,
I am the dream and the hope of the slave
I rise
I rise
I rise`,
    questions: [
      { q: "What upsets the one addressed by the persona in the poem?", choices: ["the persona's arrogance", "the persona's boldness", "the persona's rudeness", "the persona's weakness"], correct: 1, skill: 'inference' },
      { q: "What does 'trod' in the first stanza mean?", choices: ["bend over", "blow over", "step over", "take over"], correct: 2, skill: 'vocabulary' },
      { q: "Which of the following is implied about the persona in the poem?", choices: ["The persona is a dancer", "The persona is a slave", "The persona is black.", "The persona is rich"], correct: 2, skill: 'inference' },
      { q: "Which of the following lines contain a figure of speech?", choices: ["But still, like dust, I'll rise", "Because I walk like I've got oil wells", "Does my haughtiness offend you?", "Leaving behind nights of terror and fear"], correct: 0, skill: 'vocabulary' },
      { q: "What is the general tone of the poem?", choices: ["defiant", "doubtful", "happy", "optimistic"], correct: 0, skill: 'inference' },
      { q: "What is the rhyming pattern evident in the first stanza?", choices: ["AABC", "ABBC", "ABCB", "ABCA"], correct: 2, skill: 'literal' },
      { q: "To what sense do the lines \"Into a daybreak that's wondrously clear, I rise\" appeal to?", choices: ["sense of hearing", "sense of sight", "sense of smell", "sense of touch"], correct: 1, skill: 'vocabulary' },
      { q: "What relationship is evident between the persona speaking in the poem and the person she is talking with?", choices: ["a bully to a bullied", "a defender to an ally", "a friend to a friend", "a leader to a follower"], correct: 0, skill: 'inference' },
      { q: "Who are being addressed in the poem?", choices: ["Those who experienced being abused", "Those who felt extremely depressed.", "Those who lost interest in their lives.", "Those who were not appreciated"], correct: 0, skill: 'inference' },
      { q: "Which of the following techniques did the author use in emphasizing the theme?", choices: ["Figures of speech such as metaphors are used.", "Rhyming patterns were used in every stanza.", "Significant lines were repeated all throughout the poem", "The events are narrated using the third person point of view"], correct: 2, skill: 'argument' }
    ]
  },
  {
    id: 'pretest-b',
    title: "Mental Health, Too",
    author: null,
    kind: 'essay',
    timeLimitSeconds: 900,
    text: `Prevention is better than cure. Mental health comprises our emotional, psychological, and social well-being; it impacts how we feel, think, and behave every day. Additionally, it is our capacity to make choices, form connections, and influence the environment in which we live in. It is a fundamental human right. Furthermore, it is essential for our socioeconomic and personal growth.

Mental health is important because it affects everything. By taking care of it, we can be resilient and recover quickly from anything. Anyone out there can have a miserable day, but that does not necessarily indicate that their life is horrible. The important thing is how we handle it and sustain our mental well-being.

When our minds are in good shape, we appreciate our lives, our surroundings, and the people that inhabit them. We can take any risks, learn new things, and innovate. We will be better equipped to handle challenging situations in both our work and personal life. We may experience the pain and frustration that can come from a loved one's passing, a job loss, and other tough situations, but eventually, we are able to move on and resume enjoying our lives.

Mental illness is common. It can happen at any age, from childhood to later in adult lives, although most cases start at a younger age. It can have short-term or long-term impacts. Besides this, it is also possible to experience many mental health disorders simultaneously.

You may be more likely to have a mental disorder if you have certain risk factors, such as childhood abuse, trauma, or neglect, experiencing discrimination and racism, losing someone close to you, severe or long-term stress, domestic violence, bullying or other abuse as an adult, having a long-term physical health condition, unemployment or losing your job, and other lifestyle factors.

According to the World Health Organization (WHO), among Filipino children aged 5 to 15, 10% to 15% are affected by mental health problems and 6.8% of Filipino students aged 13 to 17 have attempted suicide at least once within a year before the 2015 Global School-based Student Health survey.

On the other hand, untreated mental illness can cause serious issues with emotion, behavior, and physical health. These are some of the problems that might arise from mental illness: unhappiness and decreased enjoyment of life, family conflicts, social isolation, problems with alcohol and other drugs, missed work or school, and the worst, suicide.

To prevent this, we should make social connections, talk to someone you trust, get enough sleep, eat a healthy diet, get physical exercise, learn new skills, meditate daily, and ask for help when needed.

The most priceless gift that God has given us is our life. We should not waste our lives on trivial matters. Let's also be mindful of others' concerns by being empathetic or compassionate and following up with them as frequently as possible. Let's work together to spread the word about this issue so that we can guard our loved ones and families.`,
    questions: [
      { q: "Which of the following statements defines mental health?", choices: ["It enables one to create positive interpersonal relationships", "It is the ability to make sound decisions and form connections", "It is the condition of the body resulting from regular physical activity", "It refers to active participation in organized social organizations"], correct: 1, skill: 'main_idea' },
      { q: "Which of the following pertain/s to risk factors to having a mental disorder?\nI. child abuse  II. trauma or neglect  III. learning new skill  IV. making social connections  V. experiencing discrimination  VI. losing someone close to you", choices: ["I, II, III, & IV", "I, II, III & V", "I, II, VI, & V", "I, II, V, & VI"], correct: 3, skill: 'literal' },
      { q: "Which of the following situations is influenced by a mind in good shape?", choices: ["Being dependent on comfort food", "Getting compliments from peers", "Identifying de-stressing activity", "Isolating self from social media"], correct: 2, skill: 'inference' },
      { q: "Which mental health factor is depicted in the given situation below?\n\"A person suffers from physical pain due to the months of beating done by the spouse.\"", choices: ["child abuse", "domestic violence", "long-term stress", "unemployment"], correct: 1, skill: 'inference' },
      { q: "Which of the following completes the analogy below?\nEnough sleep : Healthy mind :: ___ : Mental illness", choices: ["lack of sleep", "over-eating", "drug abuse", "unhealthy diet"], correct: 2, skill: 'inference' },
      { q: "What does empathetic mean in the following sentence?\n\"Let's also be mindful of others' concerns by being empathetic or compassionate and following up with them as frequently as possible.\"", choices: ["appreciative", "encouraging", "responsible", "understanding"], correct: 3, skill: 'vocabulary' },
      { q: "Which of the following is true based on the text?", choices: ["Untreated mental illness causes serious issues with emotion and physical health", "It is also impossible to experience many mental health disorders simultaneously", "Increased enjoyment of life and closed family ties arise from one's mental illness", "Mental wellness is achieved from family conflicts, social isolation, and discrimination"], correct: 0, skill: 'literal' },
      { q: "What is the purpose of the last paragraph of the text?", choices: ["to call for action about the issue of mental health", "to further explain the issue about mental health", "to provide conclusions about mental health", "to summarize the article about mental health"], correct: 0, skill: 'argument' },
      { q: "How did the writer organize the ideas about mental health?", choices: ["by describing steps on how to take care of mental health", "by enumerating examples of the effect of mental disorder", "by listing important information about mental health", "by providing suggestions on how to address mental health issues"], correct: 2, skill: 'argument' },
      { q: "What is the general tone of the article?", choices: ["anxious - worried about the issue", "didactic - intends to teach about the issue", "sad - expressing grief about the issue", "serious - treats the issue seriously"], correct: 1, skill: 'inference' }
    ]
  },
  {
    id: 'pretest-c',
    title: "Arachne",
    author: "Greek Mythology",
    kind: 'myth',
    timeLimitSeconds: 900,
    text: `In the kingdom of Lydia (an ancient area of Anatolia, which is in modern-day Turkey) there lived a girl, named Arachne. She was very good at weaving and her reputation for embroidery soon spread. Athena, the goddess of (among many other things) spinners and embroiderers, was considered by many to have been Arachne's tutor, but Arachne refused to give the goddess any credit for having taught her how to weave so beautifully.

Indeed, so sure of her own weaving abilities was she, that Arachne even boldly challenged Athena to a weaving contest. Athena turned up in disguise as an old woman, advising the young weaver to be more modest about her achievements. Arachne was scornful, so Athena — angered by the girl's arrogance — revealed her true identity and accepted the challenge Arachne had proposed.

The two competitors chose the subject of their tapestries with care: while Athena showed the twelve Olympian gods in hers, she wove in a little detail in each of the four corners, showing what happens to uppity mortals who think they can defy the gods. Conversely, Arachne depicted the most outrageous things the gods had got up to — in particular, Zeus' track record in seducing or abducting young maidens to satisfy his own lust.

Arachne's work was perfect, and Athena had to admit it. But, being a goddess, she didn't have to like it. What's the use of being a deity if you can't throw your weight about from time to time? So, Athena tore up Arachne's beautiful work and struck her down. Arachne was so downcast by this, that she hanged herself.

Athena was vindictive and refused to give Arachne peace in death. So, she turned the dead girl into a spider, so that she would be doomed to weave and spin for all time.`,
    questions: [
      { q: "\"Athena, angered by the girl's arrogance, revealed her true identity.\" Which of the following words found in Paragraph 2 is the opposite of the underlined word?", choices: ["bold", "disguise", "modest", "scornful"], correct: 2, skill: 'vocabulary' },
      { q: "What does Arachne's weaving show?", choices: ["abuses made by the gods", "naughtiness of the gods", "rudeness of the gods", "weaknesses of the gods"], correct: 3, skill: 'literal' },
      { q: "What does the selection intend to accomplish?", choices: ["To explain a natural phenomenon", "To narrate the origin of something", "To teach an important lesson", "To tell an exaggerated story"], correct: 1, skill: 'argument' },
      { q: "Why did Athena become angry with Arachne?", choices: ["Arachne was a great weaver of a tapestry", "Arachne's beauty is beyond compare", "Arachne's creations are better than hers.", "Arachne's works are expensive and rare."], correct: 2, skill: 'literal' },
      { q: "Which of the following is NOT a characteristic of Arachne?", choices: ["Confident. She believed that she could defeat Athena at weaving", "Disobedient. She did not follow Athena's advice to be humble", "Talented. She was exceptionally good at weaving beautiful tapestries.", "Ungrateful. She was not thankful to Athena for teaching her to weave"], correct: 1, skill: 'inference' },
      { q: "Which of the following is similar in purpose to this selection?", choices: ["Fable", "Folktale", "Legend", "Parable"], correct: 2, skill: 'argument' },
      { q: "Which of the following best describes the theme?", choices: ["acceptance, anger, pride", "humility, obedience, power", "pride, humility, power", "vengeance, anger, pride"], correct: 1, skill: 'main_idea' },
      { q: "Which of the following is implied about the Greek gods and goddesses?", choices: ["They are immortal and possess powers", "They are immortal but very emotional", "They assert their power over humans", "They feel superior over human beings"], correct: 3, skill: 'inference' },
      { q: "What does the selection intend to accomplish?", choices: ["To explain a natural phenomenon", "To narrate the origin of something", "To teach an important lesson", "To tell an exaggerated story"], correct: 1, skill: 'argument' },
      { q: "Which of the following does NOT apply to the selection?", choices: ["All our talents are given to us by God.", "Better to be humble than to be talented.", "We should be humble even in victory", "We should know how to accept defeat"], correct: 2, skill: 'main_idea' }
    ]
  }
];

const TOTAL_PRETEST_QUESTIONS = PRETEST_PASSAGES.reduce((s, p) => s + p.questions.length, 0);

/* ------------------------------------------------------------
   TIER 1: NOVICE — Very Easy (pretest score 1-6/30)
   ------------------------------------------------------------ */
const NOVICE_PASSAGES = [
  {
    id: 'novice-a',
    title: "Dreams",
    kind: 'essay',
    questions_count_note: 8,
    text: `We often say "Sweet dreams," but have you ever wondered why we dream? Some say that dreaming is our brain's way of exercising. While we sleep, our brain may be testing the connections and pathways to see if they are working well. Others believe that dreaming is our brain's way of sorting out problems. Problems that have not been addressed during the day are sometimes resolved in our sleep. Yet another explanation is that dreaming is our brain's way of fixing and organizing all the information we have. While sleeping, our brains have a chance to sort out the information that we want to keep from the stuff we no longer want. Still another idea is that dreams are just another form of thinking. Will we ever get to know the answer to this question? Maybe we should sleep on it.`,
    questions: [
      { q: "Based on the selection, what does our brain exercise through sleeping?", choices: ["the connections and pathways", "the left and right hemispheres", "the content and concepts", "the gray matter"], correct: 0, skill: 'literal' },
      { q: "Which of the statements does NOT show how dreams fix our problems?", choices: ["As we dream, we constantly think about what we have learned or experienced", "Our dreams help us focus on things we are unable to notice during the day.", "Our brain comes up with solutions in our sleep.", "Our brain sorts and files information."], correct: 3, skill: 'inference' },
      { q: "How does a brain — through dreams — perform the function of an office clerk?", choices: ["It sorts information we need from what we don't need.", "It files what we know into fixed categories.", "It clears the board to store new information.", "It functions alone."], correct: 0, skill: 'inference' },
      { q: "Based on how it is used in the selection, which of the following words is a synonym for the word \"resolved\"?", choices: ["accommodated", "reflected", "decided", "fixed"], correct: 3, skill: 'vocabulary' },
      { q: "Which of the following statements is NOT true about the brain?", choices: ["Our brain makes connections.", "Our brain never stops thinking.", "Sleeping is our brain's way of shutting down.", "Our brain replays our experiences as we sleep."], correct: 2, skill: 'literal' },
      { q: "Which question is the selection trying to answer?", choices: ["What are the types of dreams?", "Why are our reasons for dreaming?", "Are all dreams sweet?", "How can we stop from dreaming?"], correct: 1, skill: 'main_idea' },
      { q: "In the selection, what does it mean to \"sleep on it\"?", choices: ["ignore it", "take a nap", "think about it", "forget about it"], correct: 2, skill: 'vocabulary' },
      { q: "Which could be a good title for this selection?", choices: ["Dreaming: Explained", "Preventing Our Dreams", "Interpreting One's Dream", "Finding Solutions to Dreaming"], correct: 0, skill: 'main_idea' }
    ]
  },
  {
    id: 'novice-b',
    title: "Flying Rocks",
    kind: 'essay',
    text: `There are rocks in our Solar System that never flocked together to form planets. Larger ones called asteroids gather in the Asteroid Belt, a strip found between Mars and Jupiter. Some asteroids don't move along this belt but have paths that bring them close to the earth. These are called Apollo Asteroids.

There may be half a million asteroids whose diameters are bigger than one kilometer. The largest asteroid is over 1000 kilometers across. It is speculated that many asteroids were once larger but they collided with each other and became small fragments.

Unlike asteroids, meteoroids are small rocky bodies, that are scattered in space and do not orbit the sun. They cross the Earth's orbit and are often seen burning up in the Earth's atmosphere at night. The faint flashes of light they make are called shooting stars.`,
    questions: [
      { q: "What are asteroids?", choices: ["Large fragments of rock in the Solar System", "Large fragments of rock that circle the moon", "Small fragments of rock that do not circle the sun", "Small fragments of rock that do not circle the planets"], correct: 0, skill: 'literal' },
      { q: "What are meteoroids?", choices: ["Large fragments of rock that circle the sun", "Large fragments of rock that circle the planets", "Small bits of rock that do not circle the sun", "Small bits of rock that do not cross the planets' orbits"], correct: 2, skill: 'literal' },
      { q: "Which among the following statements is NOT true?", choices: ["Some asteroids move close to the earth.", "Large rocks flock together in the Asteroid Belt.", "All rocks in our Solar System have formed planets.", "The Asteroid Belt is found between Mars and Jupiter."], correct: 2, skill: 'literal' },
      { q: "\"It is speculated that many asteroids were once larger.\" What does the word speculated mean?", choices: ["written", "guessed", "confirmed", "questioned"], correct: 1, skill: 'vocabulary' },
      { q: "What is a possible reason behind the fact that asteroids are not anymore as large as they were first thought to be?", choices: ["They could have shrunk when they got closer to the sun.", "They could have hit one another and broken into pieces.", "They could have burned up and eventually become smaller.", "They could have rammed into some planet and broken apart."], correct: 1, skill: 'inference' },
      { q: "Which of the following statements is TRUE of asteroids and meteoroids?", choices: ["Both asteroids and meteoroids can be seen in a belt of rocks between Jupiter and Mars.", "Both asteroids and meteoroids circle the Earth and can be seen as faint flashes of light.", "Both asteroids and meteoroids are composed of rocky particles found in the Solar System.", "Both asteroids and meteoroids are scattered randomly across in space and do not orbit the sun."], correct: 2, skill: 'literal' },
      { q: "Many asteroids must have collided with one another. What is a synonym of the word \"collided\"?", choices: ["trapped into", "crashed into", "converged with", "connected with"], correct: 1, skill: 'vocabulary' },
      { q: "If you see faint flashes of light in the night sky, which of the following could have happened?", choices: ["Flames shoot up from the sun and come closer to the earth.", "Meteoroids have just crossed the earth's orbit and burned up.", "Meteoroids have just crossed paths with the sun and burned up.", "There are moments when the earth orbits a lot closer to the sun."], correct: 1, skill: 'inference' }
    ]
  },
  {
    id: 'novice-c',
    title: "What Little Things!",
    author: "Madison Julius Cawein",
    kind: 'poem',
    text: `What little things are those
That hold our happiness!

A smile, a glance, a rose
Dropped from her hair or dress,
A word, a look, a touch,
These are so much, so much.

An air we can't forget:
A sunset's gold that gleams;
A spray of mignonette,
Will fill the soul with dreams
More than all history says.
Or romance of old days.

For of the human heart,
Not brain, is memory. makes a part
These things it makes a
Of its own entity,
The joys, the pains whereof
Are the very food of love`,
    questions: [
      { q: "Which of the following are 'little things' that hold happiness?", choices: ["air, perfume, hair", "flower, praise, look", "joy, food, smile", "word, touch, gold"], correct: 1, skill: 'literal' },
      { q: "In the 2nd stanza, what does the word 'gleams' mean?", choices: ["beams", "dreams", "reflects", "shines"], correct: 3, skill: 'vocabulary' },
      { q: "What general truth is expressed in the 2nd stanza?", choices: ["Air is a basic need of everyone", "Everyone loves to dream.", "Love and romance are the same.", "The sunset's color is gold."], correct: 0, skill: 'inference' },
      { q: "Which of the following contains a figure of speech?", choices: ["A sunset's gold that gleams", "More than all history says.", "Not brain, is memory.", "What little things are those"], correct: 1, skill: 'vocabulary' },
      { q: "What sensory imagery was mostly used in stanza 1?", choices: ["Auditory/Sound", "Gustatory/Taste", "Olfactory/Smell", "Visual/Sight"], correct: 3, skill: 'vocabulary' },
      { q: "Which of the following are themes expressed in the poem?", choices: ["contentment, joy, memory", "love, nature, happiness", "romance, pain, health", "sadness, joy, history"], correct: 1, skill: 'main_idea' },
      { q: "What does the line, \"The joys, the pains whereof, Are the very food of love\" mean?", choices: ["One must experience sadness to experience love", "Sad and happy experiences make love grow", "To love is to accept imperfections and limitations", "Love is a beautiful experience and must be shared"], correct: 1, skill: 'inference' },
      { q: "What is the message of the poem?", choices: ["Happiness can be found in little things.", "Little things are part of memories.", "The little things in life are important", "To live is to appreciate little things."], correct: 0, skill: 'main_idea' },
      { q: "What is the general tone of the poem?", choices: ["Cheerful", "Funny", "Optimistic", "Serious"], correct: 2, skill: 'inference' }
    ]
  }
];

/* ------------------------------------------------------------
   TIER 2: INTERMEDIATE — Easy (pretest score 7-12/30)
   ------------------------------------------------------------ */
const INTERMEDIATE_PASSAGES = [
  {
    id: 'intermediate-a',
    title: "Lili the Lizard and Koko the Gecko",
    kind: 'fable',
    text: `[1] In a land across the green field, far away from the barracks of the Spanish soldiers, there lived a young couple who owned a gecko. His name was Koko whose vibrant color and smooth scales made him the most adorable pet in the house. His well-decorated cage and abundant food proved that he was well taken care of.

[2] In one corner of the house was Lili the lizard who was silently waiting for a chance to eat. While Koko devoured the sumptuous food in his cage, Lili silently worked hard to make both ends meet.

[3] Though they lived in the same house, one was clearly above the other. A wall of discrimination and unequal opportunity was indestructible.

[4] Every day, Koko the gecko's state of living reminded Lili the lizard of the life she wished she could have. A life of great comfort and abundance. However, no matter how Lili wished to be in the state of life where Koko was, a strange feeling told her that something was wrong.

[5] One day, as soon as the sun smiled over the green horizon, Koko the gecko was seen being taken out of the cage. It may be another lucky day for him or otherwise. However, Lili the lizard was on her usual daily routine. Nothing new, nothing special.

[6] When darkness started to clothe the town, the silence that came with it filled the entire house as well. No sound of a gecko was heard. No vibrant color was seen. Only an empty cage.

[7] The couple seemed to be in a happy disposition while looking at a large amount of money on the table near the cage. Lili the lizard watched the entire situation and couldn't help but wonder. "Is it the price that Koko has to pay?" she asked herself.

[8] The following day, when a new gecko was seen in the cage, everything made sense to Lili the lizard and she learned one lesson she will never forget.

[9] "One may be living in comfort inside a cage but nothing is more comforting than having the freedom you deserve. Freedom from bondage and suppression." Lili the lizard told her children.`,
    questions: [
      { q: "Which of the following best describes the time setting of the story?", choices: ["The story took place after the Spaniards left the Philippines.", "The story took place before the Spaniards came to the Philippines.", "The story took place when the Spaniards fought the Americans.", "The story took place while the Spaniards were in the Philippines"], correct: 3, skill: 'inference' },
      { q: "In paragraph 2, what does the word \"devoured\" mean?", choices: ["boasted about the food", "divided the food", "ate up the food", "fought over the food"], correct: 2, skill: 'vocabulary' },
      { q: "What is the conflict in the story?", choices: ["Gecko was in a cage.", "Lili was envious of Gecko", "Lili was not beautiful.", "The couple was poor."], correct: 1, skill: 'literal' },
      { q: "What does the green horizon in Paragraph 5 refer to?", choices: ["desert", "farm", "lake", "sea"], correct: 1, skill: 'inference' },
      { q: "Which paragraph shows the difference in the life between Lili and Gecko?", choices: ["Paragraph 2", "Paragraph 5", "Paragraph 7", "Paragraph 9"], correct: 0, skill: 'literal' },
      { q: "What time of the day is indicated in this line \"the sun smiled over the green horizon\" in paragraph 5?", choices: ["Dawn", "Morning", "Night", "Noon"], correct: 1, skill: 'inference' },
      { q: "In paragraph 2, what does the idiomatic expression \"make both ends meet\" mean?", choices: ["to spend according to one's budget", "to spend according to one's limit", "to spend according to one's needs.", "to spend according to one's wants"], correct: 0, skill: 'vocabulary' },
      { q: "Which of the following is an example of a figure of speech?", choices: ["A wall of discrimination was indestructible.", "He lived a life of great comfort and abundance.", "His vibrant color made him the most adorable pet.", "The sun smiled over the green horizon."], correct: 3, skill: 'vocabulary' },
      { q: "Which are themes explored in the selection?", choices: ["Beauty, freedom, happiness", "Corruption, equality, contentment", "Equality, freedom, contentment", "Poverty, equality, happiness"], correct: 2, skill: 'main_idea' },
      { q: "Which type of text is similar to the selection?", choices: ["Fable, because it highlights the lesson.", "Fairy tale, because it has a happy ending.", "Legend, because it tells the origin of something.", "Tall tale, because the story is exaggerated."], correct: 0, skill: 'argument' }
    ]
  },
  {
    id: 'intermediate-b',
    title: "The Jeepney: A Filipino Tradition",
    kind: 'essay',
    text: `[1] The jeepney is a popular means for people to travel in the Philippines. After World War II, Filipinos changed the old jeeps left by American soldiers into public vehicles. Today, these brightly colored jeepneys ply every street of the Philippines. Its design is a constant reminder of the Filipinos' creativity and resourcefulness.

[2] Not only that it is a sight to behold, these jeepneys have been so useful to the mass of Filipinos ever since its inception as a public vehicle. As a proof, all throughout the Philippines, there are designated routes and numerous locations for passengers to board and disembark.

[3] It's another thing to be inside the jeepneys. Passengers sit facing each other making conversations more enjoyable. Hence, for many Filipinos, riding the jeepneys offers them a time to socialize conveniently with one another especially in cities where traffic is unbearable.

[4] However, the Filipinos' beloved jeepney is in danger of being off the road in the near future. According to the government, they want to make the jeepneys safer and better for the environment. They plan to replace old jeepneys with new ones that use electricity or less fuel. The drivers are worried because they might not have enough money to buy these new vehicles as they are more expensive than the jeepneys.

[5] Even with this threat, the jeepney remains to be an important part of every Filipino's life. Long after the Americans have left the Philippine soil, its practicality and usefulness continues. People use the jeepneys for varied reasons: go around, visit friends and relatives, go to work, and see new places. It is hard to imagine how life can go on for an ordinary Filipino without the jeepneys. The plan to replace them should be thoughtfully considered.`,
    questions: [
      { q: "Which of the following is implied in the first paragraph?", choices: ["One of the things that Filipinos love to do is travelling.", "The American soldiers are very generous.", "The Filipino version of the jeepney is more creative.", "The jeepney is an original product of the Americans."], correct: 3, skill: 'inference' },
      { q: "What does 'disembark' mean in the sentence, \"Jeepneys have designated routes and numerous locations for passengers to board and disembark\"?", choices: ["to book for a vehicle", "to get into a vehicle", "to get off a vehicle", "to wait for a vehicle"], correct: 2, skill: 'vocabulary' },
      { q: "What can cause traffic to be unbearable?", choices: ["when passengers are not facing each other", "when there is no one to talk to while travelling", "when there is no time to socialize", "when vehicles are either slow or not moving"], correct: 3, skill: 'inference' },
      { q: "According to the selection, why is the jeepney a popular vehicle among the Filipinos?", choices: ["because they are brightly colored.", "because they are less expensive.", "because they can be found everywhere.", "because they can sit facing each other."], correct: 2, skill: 'literal' },
      { q: "What problem may arise from replacing the jeepneys with vehicles that are run by electricity?", choices: ["Many drivers will not buy fuel anymore.", "Many jeepney drivers will have no jobs.", "More electricity will be consumed.", "There will be lesser public vehicles."], correct: 1, skill: 'inference' },
      { q: "Why is the jeepney called a tradition?", choices: ["Because people have been riding jeepneys for a very long time", "Because jeepneys show the Filipinos' creativity and resourcefulness", "Because jeepneys can be seen all over the Philippines", "Because the jeepney has many uses for the people"], correct: 0, skill: 'inference' },
      { q: "What fact is presented in the selection?", choices: ["Filipinos love to socialize while travelling around.", "Many Filipinos use public utility vehicles like the jeepneys.", "The Filipinos are very creative and resourceful.", "The government cares for the safety of the environment."], correct: 1, skill: 'literal' },
      { q: "Which of the following is based on the observations of the author?", choices: ["The Filipinos change the jeeps left by the Americans after the war.", "The government wants to make the jeepneys safer and better.", "The jeepney is a popular means to travel among Filipinos.", "The new vehicles are more expensive than the jeepneys."], correct: 2, skill: 'inference' },
      { q: "What is the purpose of the last paragraph?", choices: ["to convince people to disagree with the government's plan to replace the jeepneys", "to emphasize the important role of jeepneys in the lives of the Filipinos", "to enumerate the reasons why people consider jeepneys useful", "to inform people about what happened to the jeeps left by the Americans"], correct: 0, skill: 'argument' },
      { q: "Which of the following best presents a summary of the selection?", choices: ["Americans gave the Filipinos their jeeps so that we can use them as vehicles.", "Filipinos love the jeepneys because it is a safe way to travel around.", "The government will phase out the jeepneys because they are not safe.", "The jeepney, a popular vehicle in the Philippines is in danger of being phased out."], correct: 3, skill: 'main_idea' }
    ]
  },
  {
    id: 'intermediate-c',
    title: "Plant Intelligence",
    kind: 'essay',
    text: `Plants are considered as life-support on Earth because of the countless things they provide to the entire biosphere. With their great significance and surprising qualities, many scientists were drawn to consider whether plants have feelings or possess some degree of intelligence. While many people believe that plants don't have any emotions as people do, plants do show signs of responding to their environment. At present, many studies have been conducted to discover the possibility that plants exhibit intelligence or at the least if they can feel.

Many plant biologists and botanists use the term "neural activity" to describe plant behavior despite the fact that plants don't have brains or neurons. A remarkable study that demonstrates such activity of plants was done by Bohm J., et al. (2016) (as cited by Trewavas, 2016) on a Venus fly-trap, a plant that captures and consumes a variety of small flying insects. After carefully examining the behavior of the said carnivorous plant, the researchers concluded that the Venus fly-trap can actually "count" up to five. Their assumption was based on the following observations: 1) As a fly-trap hair is touched the first time, the plant makes no response, 2) When a second hair is touched within 20 seconds, the open petals of the plant snap shut, trapping its potential meal, 3) As the insect begins to struggle, at the third touch of a plant hair, the plant again makes no response, 4) The same lack of response occurs the fourth time a plant hair is stimulated, and 5) Only with the fifth hair touch do the plant's digestive enzymes start the process of digesting its prey.

The above mentioned observations can be interpreted as the fly-trap's knowledge on when best to attack prey and avoid false starts. These may not be an indication of a plant's intelligence that is comparable to humans but these show that plants somehow feel because of their response to their environment.`,
    questions: [
      { q: "Why are plants considered as life-support on Earth?", choices: ["They create habitats and shelter for selected organisms", "They maintain the atmosphere by absorbing oxygen.", "They provide countless things to the entire biosphere.", "They supply food to all human beings except animals"], correct: 2, skill: 'literal' },
      { q: "Which of the following is stated in the first paragraph?", choices: ["Plants can be considered intelligent but don't have the ability to talk.", "Plants can express their feelings but only when no one can see them.", "Plants can provide so many things to humans but are not sufficient.", "Plants can respond to their environment but do not have emotions"], correct: 3, skill: 'literal' },
      { q: "Which of the following makes a Venus fly-trap unique?", choices: ["It can capture small insects.", "It can count up to five.", "It can digest its preys.", "It can release enzymes."], correct: 1, skill: 'literal' },
      { q: "What does \"neural activity\" mean in the text?", choices: ["It describes the complex behavior of plants.", "It refers to the digestive process of animals.", "It refers to the process of how the brain works.", "It tells the way people think and act."], correct: 0, skill: 'vocabulary' },
      { q: "Which of the following observations about Venus fly-traps is NOT true?", choices: ["The plant is not affected by the insect's first touch.", "The plant doesn't respond until the second touch.", "The plant snaps shut its petal after the third touch", "The plant starts digesting its prey on the fifth touch."], correct: 2, skill: 'literal' },
      { q: "Based on the behavior of the Venus fly-trap, what can indicate the intelligence of some plants?", choices: ["Some plants can anticipate their prey's movement", "Some plants can help in eliminating harmful insects", "Some plants can identify when to catch their prey.", "Some plants can protect themselves from danger"], correct: 2, skill: 'inference' },
      { q: "Which of the following is NOT stated in the selection?", choices: ["Plants like humans are capable of feeling", "Plants like animals can engage in activities.", "Plants like humans possess intelligence", "Plants like humans respond to the environment."], correct: 1, skill: 'literal' },
      { q: "What is the author's purpose in writing the text?", choices: ["To amuse the readers about what Venus fly-traps can do", "To compare and contrast plants and human beings", "To inform the readers about a specific trait of plants.", "To persuade the readers to take care of plants"], correct: 2, skill: 'argument' },
      { q: "How did the author accomplish his/her purpose?", choices: ["By comparing plants and humans", "By describing plants and humans", "By enumerating traits of plants", "By reporting results of studies"], correct: 3, skill: 'argument' },
      { q: "What main idea is expressed in the selection?", choices: ["Plants are living things that are locomotive and responsive to the environment", "Plants are living things that have feelings and possess some degree of intelligence.", "Plants are living things that possess emotion and the ability to reason and feel", "Plants are living things that use different strategies to lure prey into their traps."], correct: 1, skill: 'main_idea' }
    ]
  }
];

/* ------------------------------------------------------------
   TIER 3: ADVANCED — Normal (pretest score 13-18/30)
   ------------------------------------------------------------ */
const ADVANCED_PASSAGES = [
  {
    id: 'advanced-a',
    title: "The Amazing World of Coral Reefs",
    kind: 'essay',
    text: `[1] Coral reefs are underwater cities teeming with life, vibrant and diverse ecosystems that are vital to the health of our oceans. They are formed by tiny creatures called coral polyps, which build hard, calcium carbonate skeletons that grow together to create massive structures. These structures provide a home for an incredible array of marine life, from colorful fish and graceful sea turtles to tiny invertebrates and even sharks.

[2] The vibrant colors of coral reefs are a result of a symbiotic relationship between the coral polyps and microscopic algae called zooxanthellae. These algae live within the coral's tissues and provide them with food through photosynthesis. In return, the coral provides the algae with a protected environment and access to sunlight. This partnership is crucial for the survival of both organisms and contributes to the overall health of the reef.

[3] Coral reefs are incredibly important to the health of our oceans. They act as natural barriers, protecting coastlines from erosion and storm surges. They also provide a source of food and income for millions of people around the world. Fishing, tourism, and even medicine rely on the health and diversity of coral reefs.

[4] Unfortunately, coral reefs are facing many threats, including pollution, overfishing, climate change, and destructive fishing practices. Rising ocean temperatures and ocean acidification are particularly damaging to coral reefs, causing them to bleach and die. Coral bleaching occurs when the symbiotic algae leave the coral, leading to a loss of color and eventually, the death of the coral.

[5] Protecting coral reefs is crucial for the health of our oceans and the well-being of countless species. We can all do our part by reducing our carbon footprint, supporting sustainable seafood practices, and advocating for policies that protect these vital ecosystems. The future of coral reefs depends on our collective efforts to ensure their survival.`,
    questions: [
      { q: "What are coral reefs made of?", choices: ["algae", "anemones", "calcium", "polyps"], correct: 0, skill: 'literal' },
      { q: "What is the main reason coral reefs are important to the health of our oceans?", choices: ["They provide a source of food for humans.", "They are a popular tourist destination.", "They protect coastlines from erosion and storms.", "They are home to a diverse array of marine life."], correct: 2, skill: 'main_idea' },
      { q: "Why are coral reefs described as \"underwater cities\"?", choices: ["Because they are made of hard structures like buildings.", "Because they are home to a large population of organisms.", "Because they are in deep, dark parts of the ocean.", "Because they are a popular tourist destination."], correct: 1, skill: 'vocabulary' },
      { q: "What can be inferred about the relationship between coral polyps and zooxanthellae?", choices: ["They are competitors for resources.", "They are predators and prey.", "They are mutually beneficial partners.", "They have no significant impact on each other."], correct: 2, skill: 'inference' },
      { q: "What is an indirect consequence of coral bleaching?", choices: ["death of coral reefs and other marine life", "erosion of coast lines and storm surges", "loss of vibrant colors of the coral reefs", "warmer ocean temperatures and acidity"], correct: 1, skill: 'inference' },
      { q: "What is the author's main purpose in writing this passage?", choices: ["To describe the physical characteristics of coral reefs", "To explain the scientific process of coral formation", "To highlight the importance of protecting coral reefs", "To provide a detailed history of coral reefs"], correct: 2, skill: 'argument' },
      { q: "How did the author organize the ideas in the selection?", choices: ["by describing events leading to coral reefs destruction", "by explaining problems pertaining to coral reefs", "by listing relevant information about coral reefs", "by showing how some events badly affect coral reefs"], correct: 2, skill: 'argument' },
      { q: "The passage states that coral reefs are \"vital to the health of our oceans.\" What evidence supports this claim?\nI. Coral reefs protect coastlines from erosion and storms.\nII. Coral reefs are source of food for human beings.\nIII. Fish and other marine life live in coral reefs.\nIV. Coral reefs have a symbiotic relationship with algae.", choices: ["I and II", "I and III", "II and IV", "I and IV"], correct: 1, skill: 'argument' },
      { q: "Which of the following best describes the last paragraph?", choices: ["It is didactic, that is, it intended to teach", "It contains the main topic of the selection.", "It has a very serious and formal tone.", "It provides support to the ideas presented"], correct: 0, skill: 'argument' },
      { q: "Which of the following is true about this article?", choices: ["It appeals to environmentalists.", "It describes the issue accurately", "It discusses a relevant issue", "It presents a recent problem."], correct: 2, skill: 'inference' }
    ]
  },
  {
    id: 'advanced-b',
    title: "The Impact of Social Media on Communication",
    kind: 'essay',
    text: `[1] Social media has changed the way we communicate with each other. It is like having a big town square where everyone can share news and stories instantly. We can connect with friends and family members who can be on the far side of the globe. Social media through the Internet has figuratively made the world smaller. All one needs is a gadget. It may be a smart phone, a tablet, or a laptop. Desktops can still be used.

[2] What is even amazing is that we can make friends from practically everywhere on the planet. And it is relatively easy to find common interests because we can easily make exchanges. We can choose to chat or make video calls using a platform of our choice. There's Messenger, Viber, and WhatsApp to name a few. Chatting has gone a long way since Yahoo Messenger and Skype. And if we want people to be updated about us, there is Facebook, Instagram, and X (formerly known as Twitter).

[3] Personal communication is not the only one that changes. Even businesses turn to social media and digital networks to promote and sell their products and to connect with prospective clients and business partners. The Internet becomes a convenient venue for posting business ads as it has a wider reach.

[4] But we are always warned about the dangers of communicating through the Internet. The information that we share becomes public and can be re-shared in either a positive or negative way. We have heard and read about people who become victims of malicious sharing of photos and videos.

[5] While we enjoy the ease and convenience of communicating through social media, we should also be aware of these threats. Otherwise, there is always the possibility that we will be part of the statistics of those whose lives are destroyed by oversharing.`,
    questions: [
      { q: "Why does social media \"relatively made the world smaller\"?", choices: ["Family members can communicate anytime.", "People can use digital gadgets to communicate", "One does not need to travel to meet people", "We can share news and stories instantly"], correct: 2, skill: 'inference' },
      { q: "In the second paragraph, what does 'exchanges' mean?", choices: ["conversations", "pictures", "products", "videos"], correct: 0, skill: 'vocabulary' },
      { q: "What technique did the author use in communicating the message of the selection?", choices: ["by describing a series of events that happened", "by giving examples of social media platforms", "by narrating events in a random manner", "by using ordinary and familiar terms"], correct: 3, skill: 'argument' },
      { q: "Which of the following information is relevant to the discussion of social media in the selection?", choices: ["being aware of privacy issues in social media", "choosing the right kind of social media", "communicating using social media", "knowing what to post in social media"], correct: 3, skill: 'inference' },
      { q: "Which of the following can be concluded about this article?", choices: ["Every technological advancement has its advantages and disadvantages", "Internet, especially social media has become an important part of our lives", "People would always discover ways of improving the way they communicate", "The way we communicate today is far different from the way we communicate before."], correct: 0, skill: 'main_idea' },
      { q: "Which of the following is NOT discussed in the selection?", choices: ["the convenience of using different types of social media platforms", "the importance of using digital gadgets in communicating", "the statistics of people victimized in Internet related communication", "the types of communication that take place on the Internet"], correct: 2, skill: 'literal' },
      { q: "What is the importance of the last paragraph?", choices: ["It contains the topic sentence.", "It presents a summary of the article.", "It suggests an action to the issue.", "It supports the discussions in the article"], correct: 2, skill: 'argument' },
      { q: "Who will benefit from reading this article?", choices: ["People who advertise their products in social media", "People who like making friends through social media", "People who love posting about their activities in social media", "People who use social media to talk to families abroad"], correct: 2, skill: 'inference' },
      { q: "What is the general tone of this article?", choices: ["Critical - scrutinizes or judges the subject matter", "Didactic - aims to educate or instruct the reader", "Scholarly - tone is academic and intellectual, formal", "Straightforward - present information clearly and simply"], correct: 3, skill: 'inference' },
      { q: "What is the main purpose of the article?", choices: ["To inform the readers about the increasing number of people destroyed by social media.", "To persuade the readers to be more careful about what they share in social media", "To remind the readers how social media has influenced the way we communicate", "To tell the readers about the ease and convenience of using social media"], correct: 1, skill: 'argument' }
    ]
  },
  {
    id: 'advanced-c',
    title: "The Road Not Taken",
    author: "Robert Frost",
    kind: 'poem',
    text: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear,
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back

I shall be telling this with a sigh
Somewhere ages and ages hence
Two roads diverged in a wood, and I—
I took the one less traveled by.
And that has made all the difference.`,
    questions: [
      { q: "Which road was chosen by the persona in the poem?", choices: ["The persona chose both roads.", "The persona chose the less used road.", "The persona chose the more used road", "The persona chose none of them."], correct: 1, skill: 'literal' },
      { q: "What is suggested by the \"yellow wood\" in the first line?", choices: ["color of the wood", "place in the forest", "season of the year", "time of the day"], correct: 2, skill: 'inference' },
      { q: "Which word in the poem is the same in meaning as 'has stepped on'?", choices: ["diverged", "travelled", "trodden", "wanted"], correct: 2, skill: 'vocabulary' },
      { q: "Which line contains a figure of speech?", choices: ["And both that morning equally lay", "Somewhere ages and ages hence", "Then took the other, as just as fair", "Yet knowing how way leads on to way"], correct: 2, skill: 'vocabulary' },
      { q: "Which of these is implied in the poem?", choices: ["The persona is on his/her way back home.", "The persona is travelling far from home", "The persona is with other travellers.", "The persona has been travelling for days."], correct: 1, skill: 'inference' },
      { q: "What was the dilemma of the persona in the first stanza of the poem?", choices: ["He can only choose one road.", "He feels lonely traveling alone.", "He lacks courage to travel.", "He regrets the road he chose"], correct: 0, skill: 'literal' },
      { q: "What mood is created in the poem?", choices: ["Cheerful - happy", "Creepy - frightening", "Idyllic - peaceful", "Grateful - thankful"], correct: 3, skill: 'inference' },
      { q: "What do the two roads stand for?", choices: ["Achievements in life", "Choices in life", "Happiness in life", "Priorities in life"], correct: 1, skill: 'main_idea' },
      { q: "Which of the following techniques did the author use to express the theme of the poem?", choices: ["Use of imagery", "Use of literary devices", "Use of rhymes", "Use of symbolisms"], correct: 3, skill: 'argument' },
      { q: "Which is NOT a theme of the poem?", choices: ["Accepting challenges", "Being unconventional", "Knowing one's priorities", "Making the right choices"], correct: 2, skill: 'main_idea' }
    ]
  }
];

/* ------------------------------------------------------------
   TIER 4: PROFICIENT — Hard (pretest score 19-24/30)
   ------------------------------------------------------------ */
const PROFICIENT_PASSAGES = [
  {
    id: 'proficient-a',
    title: "Tesla's AI Robot Ready in September",
    kind: 'news',
    text: `[1] Elon Musk, CEO of Tesla, asserts that the "Optimus" humanoid AI robot was about to be released on September 30, 2022. It was initially scheduled for release on Tesla Day, August 19, but was delayed until September. The delay was caused by the possibility that a prototype of the AI robot would be available by that time.

[2] The humanoid AI robot from Tesla was first announced in August of 2021. It was designed to assist and do daily human tasks. It can walk at least 5 miles per hour and lift 150 pounds. According to Tesla, Optimus can "eliminate dangerous, boring, and repetitive tasks."

[3] Tesla is a well-known automaker that believes electric vehicles can be better, faster, and more enjoyable to drive than gasoline-powered vehicles. Tesla, which makes self-driving cars powered by artificial intelligence, used artificial intelligence for the first time to create a humanoid robot. Japan and China, two of the world's leading artificial intelligence competitors, have yet to develop a humanoid that physically resembles humans and can perform human functions. Optimus will be the first to perform tasks humans do not prefer or want to do. It can also adapt to its owner's personality. To personalize Optimus, the owner can somehow transfer his or her traits to it.

[4] The launch of this humanoid would be the first of its type, and a great deal of anticipation surrounds the event. Due to Tesla's vow to use artificial intelligence to improve technology for the greater benefit, many people have high hopes for the future success of this robot.`,
    questions: [
      { q: "Which of the following can Tesla's AI robot do for humans?", choices: ["cook", "drive", "run", "think"], correct: 0, skill: 'literal' },
      { q: "What can owners do to make the AI robot more personalized?", choices: ["Owners can change its appearance.", "Owners can customize its appearance.", "Owners can give it a name", "Owners can pass on characteristics."], correct: 3, skill: 'literal' },
      { q: "What would be the possible impact of Tesla's AI robot on people's lives?", choices: ["It will make people's lives more advanced.", "It will make people's lives more beautiful.", "It will make people's lives more comfortable", "It will make people's lives more complicated."], correct: 2, skill: 'inference' },
      { q: "What is implied by the statement, \"Japan and China, two of the world's leading artificial intelligence competitors, have yet to develop a humanoid that physically resembles humans and can perform human functions\"?", choices: ["America has overtaken Japan and China in artificial intelligence competition.", "America, Japan, and China were the three leading competitors in robot making.", "Japan and China will also develop a humanoid robot-like Optimus.", "Japan and China will envy America for being able to develop a humanoid robot."], correct: 2, skill: 'inference' },
      { q: "Which of the following is NOT discussed in the selection?", choices: ["Artificial intelligence is becoming useful to people.", "Modern technology can benefit everyone who can afford.", "Technological advancement will always be beneficial.", "Technology will always have good and bad effects."], correct: 3, skill: 'literal' },
      { q: "What is the meaning of the word \"anticipation\" in this sentence?\n\"The launch of this humanoid would be the first of its type, and a great deal of anticipation surrounds the event.\"", choices: ["eagerness", "expectation", "prediction", "suspension"], correct: 0, skill: 'vocabulary' },
      { q: "What disadvantage may Optimus cause?", choices: ["People may become lazy.", "People may harm nature.", "People may not be healthy.", "People may not think anymore."], correct: 0, skill: 'inference' },
      { q: "Which of the following sentences is an opinion expressed in the selection?", choices: ["Tesla's Optimus promises an incomparable AI advancement.", "Tesla's Optimus will be able to adapt to the personality of its owner.", "Tesla's Optimus will be capable of performing human functions.", "Tesla's Optimus will be released on September 30, 2022."], correct: 0, skill: 'argument' },
      { q: "What is the author's purpose in writing the text?", choices: ["To compare America with Japan and China", "To entertain people with a robot story", "To inform about the latest AI invention", "To persuade the people to buy robots"], correct: 2, skill: 'argument' },
      { q: "Which of the following is NOT mentioned in the article?", choices: ["disadvantages of the AI robot", "distribution details of the AI robot", "estimate price of the AI robot", "manufacturers of the AI robot"], correct: 0, skill: 'literal' }
    ]
  },
  {
    id: 'proficient-b',
    title: "The Rise of AI in Education",
    kind: 'essay',
    // NOTE: In the source document, Q3 and Q5 each had an option's letter label
    // dropped by a formatting glitch; both were reconstructed from the visible
    // text. Q4 is genuinely missing its "C" option in the source and therefore
    // ships as a 3-choice item rather than with an invented distractor.
    text: `[1] Artificial Intelligence or AI refers to technologies and systems that can accomplish tasks that typically require human intelligence, such as understanding language, recognizing patterns, and solving problems. AI has come across both major opportunities and notable challenges within the education framework.

[2] Personalized learning is AI's main benefit. Students' performances can be analyzed by an AI-based platform, which would then determine their learning styles, strengths and weaknesses and adjust the teachings based on the evaluation. This is the situation where a student needs further preparation or lessons on a particular subject where they are struggling. This increases the effectiveness and inclusivity of education by enabling students to learn at their own pace. AI also saves teachers time because it allows them to grade papers automatically, manage calendars, and even respond to basic student questions that would otherwise need a significant amount of their valuable time to do for educational purposes.

[3] There are also some disadvantages when using AI in teaching. For one, dependence by students on AI can cause delay in their abilities to engage in critical and creative thinking as well as in solving problems. If AI provides solutions too readily or too quickly, it is easy for the students to miss out on the learning process. Thirdly, AI does not carry human emotional intelligence invested in the classroom by a human teacher. It responds or gives instant feedback on students' work without giving encouragement in the same manner a teacher would, empathy in the same way a teacher would, or understanding — which are all elements of learning.

[4] It is common knowledge that AI has the ability to transform education through individualized training, adaptive evaluations, and increased administrative efficiency. AI-powered technologies have the capacity to assess vast volumes of student data in order to customize learning routes and instructional materials, potentially increasing student engagement and academic performance. AI can also improve accessibility by offering real-time translation and accommodations for students with disabilities, hence increasing inclusivity in learning environments throughout the globe.

[5] The possible disadvantages of AI in education as well as ethical issues are causes for concern. Adopting an excessive amount of AI, according to critics, might lessen the value of human teachers, who facilitate the face-to-face interactions necessary for comprehensive education. It is also important to give serious consideration to concerns like data privacy, biased grading systems, and the digital divide — where not everyone has equal access to AI tools.

[6] Despite all these adverse challenges brought forth by AI on education, there are exciting possibilities. This might also lead to engagement through interactive tools, personalization of learning experiences, and useful information to help in improving is harmonizing rather than replacing the essential human dimensions of teaching and learning. Finally, it will be subject to on how we find a balance between innovation in technology and keeping at the core of education the critical role teachers play in student growth.`,
    questions: [
      { q: "What is the meaning of the word \"personalization\" in the second paragraph?", choices: ["AI provides teachers information about how individual students learn.", "AI saves working time for teachers so they can focus on teaching.", "Students can choose the subjects that they like best.", "Students have a lot of time to prepare for the different subjects."], correct: 0, skill: 'vocabulary' },
      { q: "According to the selection, which of the following teacher activity is facilitated by AI?", choices: ["developing the curriculum", "designing students' assessment", "grading students' assignment", "teaching difficult topics"], correct: 2, skill: 'literal' },
      { q: "How does AI influence the teaching process?", choices: ["AI contributes to instructional decision making.", "AI makes the teachers' role in class repetitive.", "AI replaces the teacher with so many teaching tasks.", "AI supports the execution of automated tasks"], correct: 3, skill: 'inference' },
      { q: "According to the selection, why would AI cause education inequalities?\n(Note: the source document is missing option C for this item.)", choices: ["AI is inaccessible to students who have limited resources.", "AI provides students from rural areas with richer resources.", "AI systems are too complicated to use for struggling students."], correct: 0, skill: 'inference' },
      { q: "Which of the following is true about Artificial Intelligence?", choices: ["It created limitless possibilities for both learning and teaching process.", "It enhanced the ability to engage in critical and creative thinking.", "It has the potential to replace teachers as facilitators of learning", "It makes learning and teaching faster than the way it used to be"], correct: 0, skill: 'main_idea' },
      { q: "Which of the following needs further explanation?", choices: ["how AI benefits learners with disabilities", "how AI causes delay in ability to think", "how AI helps teachers to save time", "how AI transforms the learning process"], correct: 0, skill: 'inference' },
      { q: "What is the author suggesting in the last paragraph?", choices: ["to continue using AI in the classroom", "to fight the challenges brought forth by AI", "to help teachers improve their AI knowledge", "to identify the role that teachers play in using AI"], correct: 2, skill: 'argument' },
      { q: "Which of the following is used by the author in organizing ideas in one of the paragraphs?", choices: ["describing common knowledge about AI", "emphasizing the importance of data privacy", "enumerating the disadvantages of using AI", "giving examples of AI based platforms"], correct: 2, skill: 'argument' },
      { q: "What is the general tone of the selection?", choices: ["didactic - teaching readers what to do", "objective - unbiased, neutral, fact-based", "urgent - creates a sense of importance", "serious - urgent, not intended to entertain"], correct: 1, skill: 'inference' },
      { q: "Which is NOT discussed in the selection?", choices: ["how AI can increase administrative efficiency", "how AI can promote inclusivity of learning", "how AI serves as hindrance to in-person learning", "how AI benefits struggling students"], correct: 0, skill: 'literal' }
    ]
  },
  {
    id: 'proficient-c',
    title: "Depression: How Serious Can It Get?",
    kind: 'essay',
    text: `Depression is a common mental disorder, and anyone can suffer from it. In an article titled "Depression," the leading cause of poor health globally, the World Health Organization (WHO) explains many unknown characteristics of depression that most people are unaware of.

First, it is characterized by sadness or displeasure. Many people find themselves losing interest in something they previously enjoyed doing and wonder why. In fact, these instances show why a lot of people get burned out from their jobs or hobbies easily and tend to fail afterwards. It is also discussed that depression can lead to serious health conditions. Lastly, the article describes how someone who manifests depression can have sleep disturbances and loss of appetite. Tiredness and poor concentration can be observed from someone who is depressed. Among all its characteristics, these are the usual symptoms that we see from people who suffer depression.

The WHO encourages everyone to be aware of these characteristics and aid those who show them. Depression can be long-lasting or recurrent and can dramatically affect a person's ability to function and live a rewarding life.`,
    questions: [
      { q: "How is depression described in the text?", choices: ["a behavioral problem", "a physical problem", "a mental problem", "an emotional problem"], correct: 2, skill: 'literal' },
      { q: "Which of the following describes the function of the World Health Organization?", choices: ["collects sensitive information about individual's health record", "disseminates information on the latest about science and technology", "monitors all the operations of hospitals in the world", "provides leadership and guidance on global health issues"], correct: 3, skill: 'inference' },
      { q: "What usual symptoms of depression were mentioned in the article?", choices: ["depression, lack of sleep and stress eating", "displeasure, good appetite, and lack of sleep", "sadness, loss of appetite, and poor concentration", "self-interest, sleep disturbance, and poor eyesight"], correct: 2, skill: 'literal' },
      { q: "Why is someone with depression unable to sleep and eat properly?", choices: ["They always eat and sleep.", "They can't stop thinking.", "They can't swallow food.", "They never stop crying."], correct: 1, skill: 'inference' },
      { q: "A lot of people get burned out from their jobs easily. What does a person experience when he/she gets burned out?", choices: ["chemical disintegration", "de-stressing activity", "mental breakdown", "peer pressure"], correct: 2, skill: 'vocabulary' },
      { q: "According to WHO, what can we do for those who have the symptoms of depression?", choices: ["be aware of them", "encourage them", "treat them kindly", "try to help them"], correct: 3, skill: 'literal' },
      { q: "How did the author organize the ideas in the selection?", choices: ["By describing the solution to depression", "By enumerating the steps in fighting depression", "By identifying the cause and effect of depression", "By listing the characteristics of depression"], correct: 3, skill: 'argument' },
      { q: "Why does depression lead to serious health conditions?", choices: ["because it breaks someone's good habits and healthy lifestyle", "because it deprives someone of rest and nourishment", "because it makes someone overthink and overanalyze", "because it leaves someone with no other choice"], correct: 1, skill: 'inference' },
      { q: "Which of the following is relevant to the discussion of depression in the article but is NOT mentioned?", choices: ["how to avoid being depressed", "how to cure people with depression", "how to report depressed people", "how to treat people with depression"], correct: 0, skill: 'inference' },
      { q: "What is the function of the last paragraph?", choices: ["It calls for collective action on depression.", "It discusses the main idea of the selection.", "It presents conclusions about depression.", "It summarizes the article on depression."], correct: 0, skill: 'argument' }
    ]
  }
];

/* ------------------------------------------------------------
   TIER 5: EXPERT — Extreme (pretest score 25-30/30)
   ------------------------------------------------------------ */
const EXPERT_PASSAGES = [
  {
    id: 'expert-a',
    title: "Butuan Archeological Sites",
    kind: 'essay',
    text: `[1] In 1975, as a result of the construction of an extensive network of large drainage channels, or esteros, to relieve Butuan City from destructive annual floods, significant amounts of archaeological artifacts were discovered that dated back to the Age of Contact with the Great Traditions of Asia, coeval with the Yueh type wares to Ming Dynasties of ancient China from the 10th Century to the 16th Century AD.

[2] The major find in various areas is the appearance of the remains of large open-water-going boats, the "balanghai" of historical records. The same type of boats and construction has been recovered in Sumatra and Pontian in Malaysia, apparently of the same period. There are eleven of these boats: three were fully excavated, two preserved, and the rest are still unexcavated. The boats are of Neolithic architecture using a planking edge-peg technology. The boats range in age from the 10th to the 13th century AD.

[3] The other significant sites yielded multiple interred wooden coffin burials, containing secondary burials that feature modified skulls that are frontally flattened, ascribed to the 14th-15th Century AD. Similar finds in Central Philippines have yielded similar burials but with the difference that all these were found in caves along the island's coasts.

[4] The third significant feature of the stratified sites are the tremendous amounts of trade high-fired ceramics coming from China, Cambodia, Thailand, and other southeast Asian countries, as well as the distinctive white stamped pottery from Thailand; and Persian glassware, suggesting prehistoric links as far as the Middle East.

[5] There were other notable discoveries like the Ivory Seal and the Silver Paleograph. Gold and tools for gold processing of ornaments have also been recovered from a village site. Over a hundred clay crucibles and tools for the processing of gold items were discovered in the area, leading to the conclusion that an extensive gold ornaments industry was in these areas as far back as a thousand years ago.

[6] Altogether, these data demonstrate that Butuan was a thriving international trading port a thousand years ago; this site has a tremendous historical impact in the Asian region.`,
    questions: [
      { q: "What was the reason behind the construction of an extensive network of large drainage channels in Butuan in 1975?", choices: ["to discover significant amounts of archaeological artifacts", "to enhance the drainage system against damaging floods", "to excavate the remains of large open-water-going boats", "to unearth proofs of historical trading in the Asian region"], correct: 1, skill: 'literal' },
      { q: "What does 'esteros' mean in the first paragraph?", choices: ["a network of large drainage channels", "a result of an extensive construction", "a number of archaeological artifacts", "an effect of destructive annual floods"], correct: 0, skill: 'vocabulary' },
      { q: "Which of the following will benefit from the discovery of the archeological artifacts?", choices: ["art, tradition, and industry", "culture, history, and tradition", "history, archeology, industry", "tradition, architecture, art"], correct: 1, skill: 'inference' },
      { q: "Which paragraph talked about the sites of wooden coffin burials?", choices: ["paragraph 2", "paragraph 3", "paragraph 4", "paragraph 5"], correct: 1, skill: 'literal' },
      { q: "Which of the following is NOT implied in the selection?", choices: ["The early Filipinos did business with countries in Asia.", "The early Filipinos engaged in different types of trading.", "The early Filipinos had great traditions.", "The early Filipinos had knowledge of technology"], correct: 2, skill: 'inference' },
      { q: "Which academic discipline or field of study does the topic of this text fall under?", choices: ["Anthropology", "Engineering", "Ethnography", "Psychology"], correct: 0, skill: 'inference' },
      { q: "Which of the following should be consulted regarding the discovery?", choices: ["Department of Environment and Natural Resources", "National Commission for Culture and the Arts", "National Historical Commission of the Philippines", "National Museum of the Philippines"], correct: 3, skill: 'inference' },
      { q: "Which type of paragraph development is used in the second paragraph to talk about \"Balanghai\"?", choices: ["Descriptive paragraph", "Literary paragraph", "Narrative paragraph", "Persuasive paragraph"], correct: 0, skill: 'argument' },
      { q: "How did the author conclude the text?", choices: ["A massive gold ornaments industry already existed a thousand years ago.", "Butuan was a thriving international trading harbor a thousand years ago.", "Wooden coffin burials in Butuan are similar to that in Central Philippines.", "Discovered artifacts are dated back to the Age of Great Traditions of Asia."], correct: 1, skill: 'main_idea' },
      { q: "Which of the following statements is NOT stated in the given text?", choices: ["Butuan exported high-fired ceramics to China and stamped pottery to Thailand.", "The Balanghai is of Neolithic architecture using a planking edge-peg technology.", "There is a significant amount of archaeological artifacts found in Butuan.", "Wooden coffins contained burials that feature frontally flattened modified skulls."], correct: 0, skill: 'literal' }
    ]
  },
  {
    id: 'expert-b',
    title: "Exploring Non-Mendelian Genetics",
    kind: 'essay',
    text: `[1] Non-Mendelian genetics encompasses inheritance patterns that deviate from the classical rules established by Gregor Mendel. Mendel's groundbreaking experiments with pea plants laid the foundation for understanding genetic inheritance through specific dominant and recessive alleles. However, this framework is limited, as many traits in living organisms exhibit more complex inheritance patterns. By exploring non-Mendelian concepts, we can gain a deeper appreciation for the diversity of genetic traits present in nature.

[2] One significant form of non-Mendelian inheritance is incomplete dominance. In this pattern, the offspring display a phenotype that is a blend of the traits from both parents. For instance, crossing a red flower (RR) with a white flower (WW) results in a hybrid (RW) that is pink. This indicates that neither allele is completely dominant, leading to an intermediate expression of traits. This phenomenon shows how traits can combine in ways that do not fit into Mendelian categories.

[3] Another concept within non-Mendelian genetics is codominance. Codominance occurs when both alleles in a heterozygous individual are fully expressed in the phenotype. A well-known example can be observed in certain breeds of chickens, where black feathers (B) and white feathers (W) are codominant. When a black chicken and a white chicken are cross-fertilized, the offspring display both black and white feathers. This demonstrates that both alleles contribute equally to the phenotype, resulting in distinct and observable traits.

[4] Polygenic inheritance represents another non-Mendelian inheritance where multiple genes influence a single trait. Traits such as human height and skin color fall under this category, as they are controlled by several genes working together. This results in a wide range of phenotypes rather than distinct categories. For example, human height can vary significantly due to the cumulative effects of many different genes, illustrating the complexity of genetic inheritance beyond simple dominant-recessive relationships.

[5] Additionally, extranuclear inheritance involves genes located outside the nucleus, primarily within mitochondria or chloroplasts. Mitochondrial DNA is inherited from the mother and can lead to specific traits or diseases that do not adhere strictly to Mendelian patterns. This type of inheritance provides insight into certain genetic conditions passed down through maternal lines and emphasizes the importance of understanding genetic transmission beyond nuclear DNA.

[6] Understanding non-Mendelian genetics is crucial across various fields, including medicine, agriculture, and evolutionary biology. It offers valuable insights into complex traits and how they are inherited from one generation to the next. For example, recognizing that some genetic disorders may arise from multiple genes rather than a single gene can refine our approaches to treatment and prevention strategies. Overall, non-Mendelian genetics enriches our knowledge of heredity and helps explain the intricate tapestry of life's diversity, revealing how complex interactions shape the traits we observe in organisms today.`,
    questions: [
      { q: "What has the same meaning as the word 'diversity' in the first paragraph?", choices: ["concepts", "patterns", "types", "variety"], correct: 3, skill: 'vocabulary' },
      { q: "Which is an example of a codominance pattern?", choices: ["A child who inherited a combination of his mother (black) and father (white) skin.", "A child who inherited the blue eyes of his mother and the curly hair of his father", "A child who inherited the brown skin of his mother and the height of his father", "A child who inherited diabetes from his mother who got it from her grandmother"], correct: 1, skill: 'inference' },
      { q: "Which is an example of an incomplete dominance pattern?", choices: ["A child who inherited a combination of his mother (black) and father (white) skin.", "A child who inherited the blue eyes of his mother and the curly hair of his father", "A child who inherited the brown skin of his mother and the height of his father", "A child who inherited diabetes from his mother who got it from her grandmother"], correct: 0, skill: 'inference' },
      { q: "Which is an example of an extranuclear inheritance pattern?", choices: ["A child who inherited a combination of his mother (black) and father (white) skin.", "A child who inherited the blue eyes of his mother and the curly hair of his father", "A child who inherited the brown skin of his mother and the height of his father", "A child who inherited diabetes from his mother who got it from her grandmother"], correct: 3, skill: 'inference' },
      { q: "Which of the following is an example of a codominance pattern?", choices: ["a child who inherited a combination of his mother (black) and father (white) skin", "a child who inherited the blue eyes of his mother and the curly hair of his father", "a child who inherited the brown skin of his mother and the height of his father", "a child who inherited diabetes from his mother who got it from her grandmother"], correct: 1, skill: 'inference' },
      { q: "What is the importance of knowing non-Mendelian genetics?", choices: ["It challenges the classical rules of inheritance patterns established by Gregor Mendel.", "It disproves the classical rules of inheritance patterns established by Gregor Mendel.", "It expands the classical rules of inheritance patterns established by Gregor Mendel.", "It improves the classical rules of inheritance patterns established by Gregor Mendel."], correct: 0, skill: 'main_idea' },
      { q: "What is the purpose of the selection?", choices: ["to argue about Gregor Mendel's classic theories on genetics", "to describe the different rules of inheritance patterns", "to inform readers about the limitations of the Mendelian theory", "to persuade readers to consider non-Mendelian inheritance patterns"], correct: 3, skill: 'argument' },
      { q: "Which of the following is NOT discussed in the selection?", choices: ["complexities of inheritance patterns", "descriptions of genetic conditions", "examples of non-Mendelian patterns", "significance of genetic inheritance"], correct: 1, skill: 'literal' },
      { q: "Which paragraph contains the topic sentence?", choices: ["first paragraph", "fourth paragraph", "last paragraph", "second paragraph"], correct: 2, skill: 'main_idea' },
      { q: "How did the author organize the ideas in the selection?", choices: ["by comparing and contrasting Mendelian and non-Mendelian rules of inheritance", "by describing the characteristics of non-Mendelian genetic inheritance patterns", "by inferring the cause and effects of the different inheritance patterns on people", "by presenting the problems that humans may encounter because of genetic inheritance"], correct: 1, skill: 'argument' }
    ]
  },
  {
    id: 'expert-c',
    title: "Tsunamis",
    kind: 'essay',
    text: `[1] A tsunami is a series of ocean waves that sends surges of water, sometimes reaching heights of over 100 feet (30.5 meters), onto land. These walls of water can cause widespread destruction when they crash ashore.

[2] These awe-inspiring waves are typically caused by large, undersea earthquakes at tectonic plate boundaries. When the ocean floor at a plate boundary rises or falls suddenly, it displaces the water above it and launches the rolling waves that will become a tsunami.

[3] Most tsunamis — about 80 percent — happen within the Pacific Ocean's "Ring of Fire," a geologically active area where tectonic shifts make volcanoes and earthquakes common. Tsunamis may also be caused by underwater landslides or volcanic eruptions. They may even be launched, as they frequently were in Earth's ancient past, by the impact of a large meteorite plunging into an ocean.

[4] Tsunamis race across the sea at up to 500 miles (805 kilometers) an hour — about as fast as a jet airplane. At that pace, they can cross the entire expanse of the Pacific Ocean in less than a day. And their long wavelengths mean they lose very little energy along the way.

[5] In deep ocean, tsunami waves may appear only a foot or so high. But as they approach shoreline and enter shallower water they slow down and begin to grow in energy and height. The tops of the waves move faster than their bottoms do, which causes them to rise precipitously.

[6] A tsunami's trough, the low point beneath the wave's crest, often reaches shore first. When it does, it produces a vacuum effect that sucks coastal water seaward and exposes harbor and sea floors. This retreating of sea water is an important warning sign of a tsunami, because the wave's crest and its enormous volume of water typically hit shore five minutes or so later. Recognizing this phenomenon can save lives.

[7] A tsunami is usually composed of a series of waves, called a wave train, so its destructive force may be compounded as successive waves reach shore. People experiencing a tsunami should remember that the danger may not have passed with the first wave and should await official word that it is safe to return to vulnerable locations.

[8] Some tsunamis do not appear on shore as massive breaking waves but instead resemble a quickly surging tide that inundates coastal areas.

[9] The best defense against any tsunami is early warning that allows people to seek higher ground. The Pacific Tsunami Warning System, a coalition of 26 nations headquartered in Hawaii, maintains a web of seismic equipment and water level gauges to identify tsunamis at sea. Similar systems are proposed to protect coastal areas worldwide.`,
    questions: [
      { q: "What is the importance of the first paragraph?", choices: ["It enumerates examples of tsunami.", "It explains the causes of tsunami.", "It presents the effects of tsunami.", "It provides a definition of tsunami."], correct: 3, skill: 'main_idea' },
      { q: "Which of the following may cause tsunamis?\nI. underwater landslides or volcanic eruptions\nII. a whirlpool of water that sucks water seaward\nIII. force of compounded and successive waves\nIV. impact of a meteorite plunged into the ocean", choices: ["I and II", "I and IV", "II and III", "III and IV"], correct: 1, skill: 'literal' },
      { q: "What does 'Ring of Fire' mean?", choices: ["It refers to a span of area identified with active volcanoes and frequent earthquakes", "It refers to substances combined chemically with oxygen to give out heat and smoke", "It refers to a sudden shaking of the ground that sometimes causes great destruction", "It refers to a vent in the crust of the Earth from which issue eruptions"], correct: 0, skill: 'vocabulary' },
      { q: "Which of the following is NOT directly explained in the selection?", choices: ["Why tsunamis are awe-inspiring", "Why tsunamis are phenomenal", "Why most tsunamis are very fast", "Why tsunamis have lots of energy"], correct: 0, skill: 'inference' },
      { q: "Which of the following paragraph contains the topic sentence?", choices: ["Paragraph 1", "Paragraph 2", "Paragraph 5", "Paragraph 8"], correct: 0, skill: 'main_idea' },
      { q: "Which of the following is true about tsunamis?", choices: ["The tsunami's trough would often reach the shore first.", "The waves appear higher in deeper parts of the ocean.", "Tsunami waves are destructive because of its slow pace.", "Tsunami waves are only a foot high in the shallow parts."], correct: 0, skill: 'literal' },
      { q: "What is the purpose of the last paragraph?", choices: ["to offer solutions", "to persuade people to act", "to provide conclusions", "to summarize the ideas"], correct: 0, skill: 'argument' },
      { q: "What does the word 'expanse' mean in the sentence below?\n\"At that pace, they can cross the entire expanse of the Pacific Ocean in less than a day.\"", choices: ["exclusive zone", "close region", "open portion", "wide spread"], correct: 3, skill: 'vocabulary' },
      { q: "What is the purpose of the author in writing the text?", choices: ["To describe a natural phenomenon like tsunamis", "To express opinions about tsunamis", "To provide information about tsunamis", "To warn people against the danger of tsunamis"], correct: 2, skill: 'argument' },
      { q: "Which of the following can be used as an alternative title of the selection?", choices: ["Causes of Tsunamis", "How Tsunamis Are Formed", "The Effects of Tsunami", "The Nature of Tsunamis"], correct: 1, skill: 'main_idea' }
    ]
  }
];

/* ------------------------------------------------------------
   TIERS — placement bands from the curriculum document
   ------------------------------------------------------------ */
const TIERS = [
  { id: 'novice',       name: 'Novice',       label: 'Very Easy', min: 1,  max: 6,  icon: '\uD83C\uDF31', passages: NOVICE_PASSAGES },
  { id: 'intermediate', name: 'Intermediate', label: 'Easy',      min: 7,  max: 12, icon: '\uD83C\uDF3F', passages: INTERMEDIATE_PASSAGES },
  { id: 'advanced',     name: 'Advanced',     label: 'Normal',    min: 13, max: 18, icon: '\uD83C\uDF3E', passages: ADVANCED_PASSAGES },
  { id: 'proficient',   name: 'Proficient',   label: 'Hard',      min: 19, max: 24, icon: '\uD83C\uDF3B', passages: PROFICIENT_PASSAGES },
  { id: 'expert',       name: 'Expert',       label: 'Extreme',   min: 25, max: 30, icon: '\uD83C\uDF33', passages: EXPERT_PASSAGES }
];

function tierForScore(score){
  if(score <= 6) return TIERS[0];
  for(const t of TIERS){ if(score >= t.min && score <= t.max) return t; }
  return TIERS[TIERS.length - 1];
}

/* Comprehension bands from the curriculum document */
function comprehensionLevel(percent){
  if(percent >= 80) return { label: 'Independent',  desc: 'Reads comfortably without support.', color: 'var(--sage)' };
  if(percent >= 59) return { label: 'Instructional', desc: 'Reads well with some teacher guidance.', color: 'var(--gold)' };
  return { label: 'Frustration', desc: 'Text is too difficult without significant support.', color: 'var(--ember)' };
}

const SKILL_LABELS = {
  literal: 'Literal Recall',
  inference: 'Inference',
  vocabulary: 'Vocabulary',
  main_idea: 'Main Idea',
  argument: 'Author\u2019s Craft'
};

const RECOMMENDATIONS = {
  literal: { title: 'Sharpen Literal Recall', suggestion: 'Read "Ibong Adarna" one stanza at a time, pausing after each to restate exactly what happened before moving on.' },
  inference: { title: 'Practice Reading Between the Lines', suggestion: 'Nick Joaquin\u2019s "May Day Eve" is great inference practice \u2014 after each scene, ask why a character acted that way.' },
  vocabulary: { title: 'Build Context-Clue Skills', suggestion: 'While reading a chapter of Rizal\u2019s "Noli Me Tangere," pick five unfamiliar words and guess their meaning from context before checking a dictionary.' },
  main_idea: { title: 'Practice Summarizing', suggestion: 'After each canto of "Florante at Laura," write the main idea in a single sentence.' },
  argument: { title: 'Strengthen Author\u2019s-Craft Analysis', suggestion: 'Read a newspaper editorial and identify its claim, its evidence, and the tone the writer chose.' }
};

/* ============================================================
   SOUND — synthesized at runtime; no audio files to bundle.
   ============================================================ */
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
  function playWrong(){ tone(392, 0, 0.16, 'sine', 0.1); tone(329.6, 0.1, 0.22, 'sine', 0.1); }
  function playFanfare(){ [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 0.22, 'triangle', 0.16)); }
  function playTick(){ tone(1000, 0, 0.05, 'sine', 0.04); }
  function playCoin(){ tone(1567.98, 0, 0.08, 'sine', 0.12); tone(2093, 0.05, 0.1, 'sine', 0.1); }
  function playPurchase(){ tone(660, 0, 0.08, 'triangle', 0.12); tone(880, 0.06, 0.12, 'triangle', 0.12); }
  function playHeartLose(){ tone(220, 0, 0.2, 'sine', 0.09); }

  const MELODY = [261.63,329.63,392.00,523.25,392.00,329.63,293.66,329.63,
                  261.63,329.63,392.00,523.25,392.00,329.63,293.66,261.63];
  const BASS = [130.81,130.81,130.81,130.81,196.00,196.00,130.81,130.81];
  const STEP = 0.2;
  function scheduleBgmLoop(){
    if(!bgmOn) return;
    MELODY.forEach((f, i) => tone(f, i * STEP, STEP * 0.92, 'square', 0.05));
    BASS.forEach((f, i) => tone(f, i * STEP * 2, STEP * 1.8, 'triangle', 0.07));
    for(let i = 1; i < MELODY.length; i += 2) tone(5200, i * STEP, 0.03, 'square', 0.015);
    bgmLoopTimer = setTimeout(scheduleBgmLoop, MELODY.length * STEP * 1000);
  }
  function startBgm(){ if(!bgmLoopTimer) scheduleBgmLoop(); }
  function stopBgm(){ if(bgmLoopTimer){ clearTimeout(bgmLoopTimer); bgmLoopTimer = null; } }
  function toggleBgm(){
    bgmOn = !bgmOn;
    localStorage.setItem(STORAGE_KEYS.bgm, JSON.stringify(bgmOn));
    if(bgmOn) startBgm(); else stopBgm();
    return bgmOn;
  }
  function initIfNeeded(){ if(bgmOn) startBgm(); }
  return { playCorrect, playWrong, playFanfare, playTick, playCoin, playPurchase, playHeartLose,
           toggleBgm, isBgmOn: () => bgmOn, initIfNeeded };
})();

/* ============================================================
   SHOP + BADGES
   ============================================================ */
const SHOP_ITEMS = [
  { id: 'magnify', icon: '\uD83D\uDD0D', name: 'Magnifying Glass', cost: 15, desc: 'Eliminates 2 wrong choices on your current question.' },
  { id: 'scroll',  icon: '\uD83D\uDCDC', name: 'Scroll of Insight', cost: 20, desc: 'Reveals what skill the question is testing.' },
  { id: 'skip',    icon: '\u23ED\uFE0F', name: 'Skip Token',       cost: 25, desc: 'Skip the current question with no heart lost.' },
  { id: 'revive',  icon: '\u2764\uFE0F', name: 'Revive Charm',      cost: 30, desc: 'Refill your hearts if you run out mid-passage.' },
  { id: 'doubleXp',icon: '\u2728',      name: 'Double XP Elixir',  cost: 40, desc: 'Doubles XP from your next completed passage.' }
];

const BADGES = [
  { id: 'placed',       icon: '\uD83E\uDDED', title: 'Charted',        desc: 'Finish the pre-test and get your reading level.', isUnlocked: p => !!p.pretest },
  { id: 'first_steps',  icon: '\uD83E\uDD7E', title: 'First Steps',    desc: 'Complete your first practice passage.', isUnlocked: p => Object.keys(p.progress).length >= 1 },
  { id: 'perfect',      icon: '\uD83C\uDF1F', title: 'Perfect Recall', desc: 'Get every question right in any one passage.', isUnlocked: p => allPassages().some(x => p.progress[x.id] === x.questions.length) },
  { id: 'tier_done',    icon: '\uD83D\uDCDA', title: 'Tier Cleared',   desc: 'Finish all 3 passages of your assigned tier.', isUnlocked: p => tierComplete(p) },
  { id: 'independent',  icon: '\uD83C\uDF93', title: 'Independent',    desc: 'Reach the Independent band (80%+) on the post-test.', isUnlocked: p => !!p.posttest && (p.posttest.score / TOTAL_PRETEST_QUESTIONS * 100) >= 80 },
  { id: 'on_fire',      icon: '\uD83D\uDD25', title: 'On Fire',        desc: 'Reach a 3-day reading streak.', isUnlocked: p => p.streak >= 3 },
  { id: 'grown',        icon: '\uD83D\uDCC8', title: 'Measurable Growth', desc: 'Score higher on the post-test than the pre-test.', isUnlocked: p => !!p.posttest && !!p.pretest && p.posttest.score > p.pretest.score }
];

function allPassages(){
  return TIERS.reduce((acc, t) => acc.concat(t.passages), []);
}
function findPassage(id){
  return allPassages().find(p => p.id === id) || PRETEST_PASSAGES.find(p => p.id === id);
}
function tierComplete(p){
  if(!p.pretest) return false;
  const tier = tierForScore(p.pretest.score);
  return tier.passages.every(x => x.id in p.progress);
}

/* ============================================================
   PROFILES — one local save-slot per IGN
   ============================================================ */
function defaultProfile(){
  return {
    xp: 0, coins: 0, totalCoinsEarned: 0,
    progress: {},      // passageId -> best score
    answerLog: {},     // passageId -> [answers]
    inventory: { magnify: 0, scroll: 0, skip: 0, revive: 0, doubleXp: 0 },
    streak: 0, lastPlayedDate: null,
    celebratedBadges: [],
    pretest: null,     // { score, perPassage: {}, answerLog: {}, dateISO }
    posttest: null
  };
}
function loadAllProfiles(){ return JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles) || '{}'); }
function saveAllProfiles(all){ localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(all)); }
function profileExists(ign){ return Object.prototype.hasOwnProperty.call(loadAllProfiles(), ign); }
function getOrCreateProfile(ign){
  const all = loadAllProfiles();
  if(!all[ign]){ all[ign] = defaultProfile(); saveAllProfiles(all); }
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
  if(p.lastPlayedDate === today) return;
  if(p.lastPlayedDate){
    const diff = Math.round((new Date(today) - new Date(p.lastPlayedDate)) / 86400000);
    p.streak = diff === 1 ? p.streak + 1 : 1;
  } else p.streak = 1;
  p.lastPlayedDate = today;
  const bonus = Math.min(50, p.streak * 5);
  addCoins(bonus, false);
  queueToast(`\uD83D\uDD25 Day ${p.streak} streak! +${bonus} coins`, false);
  saveCurrentProfile();
}
function addCoins(amount, playSound = true){
  state.profile.coins += amount;
  state.profile.totalCoinsEarned += amount;
  if(playSound) soundManager.playCoin();
}

/* ============================================================
   TOASTS
   ============================================================ */
let toastQueue = [], toastShowing = false;
function queueToast(text, celebration){
  toastQueue.push({ text, celebration: !!celebration });
  processToastQueue();
}
function processToastQueue(){
  if(toastShowing || !toastQueue.length) return;
  toastShowing = true;
  const { text, celebration } = toastQueue.shift();
  const div = document.createElement('div');
  div.className = 'toast' + (celebration ? ' toast-celebrate' : '');
  div.textContent = text;
  document.getElementById('toastContainer').appendChild(div);
  requestAnimationFrame(() => div.classList.add('show'));
  setTimeout(() => {
    div.classList.remove('show');
    setTimeout(() => { div.remove(); toastShowing = false; processToastQueue(); }, 350);
  }, celebration ? 2800 : 2000);
}
function snapshotProfile(){ return JSON.parse(JSON.stringify(state.profile)); }
function celebrateNewBadges(before){
  const newly = BADGES.filter(b => b.isUnlocked(state.profile) && !b.isUnlocked(before));
  let any = false;
  newly.forEach(b => {
    if(!state.profile.celebratedBadges.includes(b.id)){
      state.profile.celebratedBadges.push(b.id);
      addCoins(20, false);
      queueToast(`\uD83C\uDF89 Achievement Unlocked: ${b.title}! (+20 coins)`, true);
      any = true;
    }
  });
  if(any) saveCurrentProfile();
}

/* ============================================================
   STATE
   ============================================================ */
let state = {
  ign: null, profile: null,
  mode: null,            // 'pretest' | 'practice' | 'posttest'
  passageQueue: [],      // for pre/post-test: list of passage objects still to do
  activePassage: null,
  questionOrder: [],     // question indices, shuffled for post-test
  quizIndex: 0, quizScore: 0, quizStart: null,
  currentAnswers: [],
  choiceOrder: [], eliminated: [], hintShown: false,
  hearts: 3, doubleXpArmed: false,
  passageTimer: null, passageSecondsLeft: 0,
  sessionTimer: null, sessionSecondsLeft: 0,
  sessionResults: {}     // passageId -> score, during a pre/post-test run
};

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function shuffled(n){
  const a = Array.from({length:n}, (_, i) => i);
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function fmtTime(sec){
  const m = Math.floor(Math.max(0,sec) / 60), s = Math.max(0,sec) % 60;
  return `${m}:${String(s).padStart(2,'0')}`;
}

/* ============================================================
   LOGIN
   ============================================================ */
const ignInput = document.getElementById('ignInput');
const enterBtn = document.getElementById('enterBtn');
const ignResumeNote = document.getElementById('ignResumeNote');
function validateIGN(v){ return /^[A-Za-z0-9_]{2,16}$/.test(v); }

ignInput.addEventListener('input', () => {
  const v = ignInput.value.trim(), ok = validateIGN(v);
  enterBtn.disabled = !ok;
  if(ok && profileExists(v)){
    ignResumeNote.textContent = '\uD83D\uDC4B Welcome back! This name has saved progress on this device.';
    enterBtn.textContent = 'Resume';
  } else {
    ignResumeNote.textContent = ok ? '\u2728 New reader \u2014 you\u2019ll begin with the pre-test.' : '';
    enterBtn.textContent = 'Begin';
  }
});
enterBtn.addEventListener('click', () => {
  const ign = ignInput.value.trim();
  if(validateIGN(ign)) loginAs(ign);
});
function loginAs(ign){
  state.ign = ign;
  state.profile = getOrCreateProfile(ign);
  localStorage.setItem(STORAGE_KEYS.currentIgn, ign);
  soundManager.initIfNeeded();
  const before = snapshotProfile();
  applyDailyStreak();
  celebrateNewBadges(before);
  routeAfterLogin();
}
function routeAfterLogin(){
  // The pre-test is mandatory and faced the moment the game opens.
  if(!state.profile.pretest) showPretestIntro();
  else enterHub();
}

/* ============================================================
   PRE-TEST / POST-TEST
   ============================================================ */
const SESSION_TOTAL_SECONDS = 3600; // 1 hour overall
function showPretestIntro(){
  document.getElementById('testIntroEyebrow').textContent = 'Step 1 of 3';
  document.getElementById('testIntroTitle').textContent = 'Reading Pre-Test';
  document.getElementById('testIntroBody').innerHTML =
    `Before you begin your quests, you\u2019ll read <strong>3 passages</strong> and answer <strong>30 questions</strong>.<br><br>
     \u23F1 Each passage is timed at <strong>15 minutes</strong>, with an overall <strong>1-hour</strong> limit.<br>
     \uD83E\uDDED Your score decides which difficulty tier you practice in.<br>
     \uD83D\uDCA1 There are no hearts or power-ups here \u2014 just do your honest best.`;
  document.getElementById('testIntroBtn').textContent = 'Start Pre-Test';
  document.getElementById('testIntroBtn').onclick = () => startTestRun('pretest');
  showScreen('screen-test-intro');
}
function showPosttestIntro(){
  document.getElementById('testIntroEyebrow').textContent = 'Final Step';
  document.getElementById('testIntroTitle').textContent = 'Reading Post-Test';
  document.getElementById('testIntroBody').innerHTML =
    `You\u2019ve finished your tier. Now retake the <strong>same 30 questions</strong> from the pre-test \u2014
     but the questions and answer choices are <strong>jumbled</strong>.<br><br>
     \u23F1 Same timing: 15 minutes per passage, 1 hour overall.<br>
     \uD83D\uDCC8 Your growth is measured by comparing this to your pre-test.`;
  document.getElementById('testIntroBtn').textContent = 'Start Post-Test';
  document.getElementById('testIntroBtn').onclick = () => startTestRun('posttest');
  showScreen('screen-test-intro');
}

function startTestRun(mode){
  state.mode = mode;
  state.passageQueue = PRETEST_PASSAGES.slice();
  state.sessionResults = {};
  state.sessionSecondsLeft = SESSION_TOTAL_SECONDS;
  clearInterval(state.sessionTimer);
  state.sessionTimer = setInterval(() => {
    state.sessionSecondsLeft--;
    updateSessionClock();
    if(state.sessionSecondsLeft <= 0){ clearInterval(state.sessionTimer); finishTestRun(true); }
  }, 1000);
  nextTestPassage();
}
function updateSessionClock(){
  const el = document.getElementById('sessionClock');
  if(el) el.textContent = `\u23F3 ${fmtTime(state.sessionSecondsLeft)} left overall`;
}
function nextTestPassage(){
  if(!state.passageQueue.length){ finishTestRun(false); return; }
  const passage = state.passageQueue.shift();
  openPassage(passage, state.mode);
}
function finishTestRun(ranOutOfTime){
  clearInterval(state.sessionTimer); state.sessionTimer = null;
  clearInterval(state.passageTimer); state.passageTimer = null;

  const total = Object.values(state.sessionResults).reduce((a,b) => a + b.score, 0);
  const record = {
    score: total,
    perPassage: Object.fromEntries(Object.entries(state.sessionResults).map(([k,v]) => [k, v.score])),
    answerLog: Object.fromEntries(Object.entries(state.sessionResults).map(([k,v]) => [k, v.answers])),
    dateISO: new Date().toISOString(),
    timedOut: !!ranOutOfTime
  };
  const before = snapshotProfile();
  if(state.mode === 'pretest') state.profile.pretest = record;
  else state.profile.posttest = record;
  saveCurrentProfile();
  celebrateNewBadges(before);
  soundManager.playFanfare();

  if(state.mode === 'pretest') showPlacement(record, ranOutOfTime);
  else showGrowthReport();
}

function showPlacement(record, ranOutOfTime){
  const tier = tierForScore(record.score);
  const pct = Math.round(record.score / TOTAL_PRETEST_QUESTIONS * 100);
  const band = comprehensionLevel(pct);
  document.getElementById('placeScore').textContent = `${record.score} / ${TOTAL_PRETEST_QUESTIONS}`;
  document.getElementById('placePercent').textContent = `${pct}%`;
  document.getElementById('placeBand').textContent = band.label;
  document.getElementById('placeBand').style.color = band.color;
  document.getElementById('placeTierIcon').textContent = tier.icon;
  document.getElementById('placeTierName').textContent = `${tier.name} \u2014 ${tier.label}`;
  document.getElementById('placeNote').textContent = ranOutOfTime
    ? 'The 1-hour limit was reached, so unanswered items were scored as incorrect. ' + band.desc
    : band.desc;
  showScreen('screen-placement');
}
document.getElementById('placeContinueBtn').addEventListener('click', enterHub);

/* ============================================================
   HUB
   ============================================================ */
function assignedTier(){
  return state.profile.pretest ? tierForScore(state.profile.pretest.score) : TIERS[0];
}
function renderHub(){
  const p = state.profile, tier = assignedTier();
  document.getElementById('ignDisplay').textContent = state.ign;
  document.getElementById('coinBalance').textContent = `\uD83E\uDE99 ${p.coins}`;
  document.getElementById('streakChip').textContent = p.streak > 0 ? `\uD83D\uDD25 ${p.streak}-day streak` : '\uD83D\uDD25 Start a streak';
  document.getElementById('tierChip').textContent = `${tier.icon} ${tier.name} \u00B7 ${tier.label}`;
  const musicBtn = document.getElementById('musicToggleBtn');
  if(musicBtn) musicBtn.textContent = soundManager.isBgmOn() ? '\uD83C\uDFB5 Music: On' : '\uD83D\uDD07 Music: Off';

  const done = tier.passages.filter(x => x.id in p.progress).length;
  document.getElementById('tierProgressText').textContent = `${done} of ${tier.passages.length} passages complete`;
  document.getElementById('tierProgressFill').style.width = `${(done / tier.passages.length) * 100}%`;

  const list = document.getElementById('passageList');
  list.innerHTML = '';
  tier.passages.forEach((passage, i) => {
    const prevDone = i === 0 || (tier.passages[i-1].id in p.progress);
    const completed = passage.id in p.progress;
    const card = document.createElement('div');
    card.className = 'quest-card' + (prevDone ? '' : ' locked') + (completed ? ' completed' : '');
    card.innerHTML = `
      <div class="quest-icon">${completed ? '\u2705' : prevDone ? tier.icon : '\uD83D\uDD12'}</div>
      <div class="quest-info">
        <h4>${passage.title}</h4>
        <p>${passage.questions.length} questions \u00B7 1 min per question</p>
      </div>
      <div class="quest-meta">${completed ? `${p.progress[passage.id]}/${passage.questions.length} \u00B7 Review` : (prevDone ? 'Start' : 'Locked')}</div>`;
    if(completed) card.addEventListener('click', () => openReview(passage));
    else if(prevDone) card.addEventListener('click', () => openPassage(passage, 'practice'));
    list.appendChild(card);
  });

  // Post-test unlocks only after the whole tier is done
  const postBtn = document.getElementById('posttestBanner');
  if(tierComplete(p) && !p.posttest){
    postBtn.style.display = 'flex';
    postBtn.textContent = '\uD83C\uDFAF Tier complete! Tap to take your Post-Test.';
    postBtn.onclick = showPosttestIntro;
  } else if(p.posttest){
    postBtn.style.display = 'flex';
    postBtn.textContent = '\uD83D\uDCC8 View your Growth Report';
    postBtn.onclick = showGrowthReport;
  } else {
    postBtn.style.display = 'none';
  }

  renderLeaderboard();
  renderBadges();
}
function renderBadges(){
  const wrap = document.getElementById('badgeGrid');
  wrap.innerHTML = '';
  BADGES.forEach(b => {
    const unlocked = b.isUnlocked(state.profile);
    const cell = document.createElement('div');
    cell.className = 'badge-cell' + (unlocked ? ' unlocked' : '');
    cell.innerHTML = `<span class="badge-icon">${b.icon}</span><span class="badge-title">${b.title}</span><p class="badge-desc">${b.desc}</p>`;
    cell.addEventListener('click', () => cell.classList.toggle('expanded'));
    wrap.appendChild(cell);
  });
}
function renderLeaderboard(){
  const all = loadAllProfiles();
  const rows = Object.entries(all).map(([name, prof]) => ({ name, xp: prof.xp }))
    .sort((a,b) => b.xp - a.xp).slice(0, 10);
  const ol = document.getElementById('leaderboard');
  ol.innerHTML = '';
  if(!rows.length){ ol.innerHTML = '<li class="lb-empty">No readers yet on this device \u2014 be the first!</li>'; return; }
  rows.forEach((r, i) => {
    const li = document.createElement('li');
    if(r.name === state.ign) li.classList.add('me');
    const medal = i === 0 ? '\uD83E\uDD47' : i === 1 ? '\uD83E\uDD48' : i === 2 ? '\uD83E\uDD49' : (i+1);
    li.innerHTML = `<span class="lb-rank">${medal}</span><span class="lb-name">${r.name}${r.name === state.ign ? ' (you)' : ''}</span><span class="lb-score">${r.xp} XP</span>`;
    ol.appendChild(li);
  });
}
function enterHub(){ state.mode = null; renderHub(); showScreen('screen-hub'); }

document.getElementById('musicToggleBtn').addEventListener('click', () => {
  const on = soundManager.toggleBgm();
  document.getElementById('musicToggleBtn').textContent = on ? '\uD83C\uDFB5 Music: On' : '\uD83D\uDD07 Music: Off';
});
document.getElementById('shopBtn').addEventListener('click', openShop);
document.getElementById('switchProfileBtn').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEYS.currentIgn);
  state.ign = null; state.profile = null;
  ignInput.value = ''; enterBtn.disabled = true; ignResumeNote.textContent = '';
  showScreen('screen-ign');
});
document.getElementById('resetBtn').addEventListener('click', () => {
  const p = state.profile;
  const finished = !!p.posttest;
  if(!finished){
    queueToast('Reset unlocks after you finish the post-test.', false);
    return;
  }
  if(confirm('Reset this profile completely? You will retake the pre-test from scratch.')){
    const all = loadAllProfiles();
    all[state.ign] = defaultProfile();
    saveAllProfiles(all);
    state.profile = all[state.ign];
    showPretestIntro();
  }
});

/* ============================================================
   SHOP
   ============================================================ */
function openShop(){
  document.getElementById('shopCoinBalance').textContent = `\uD83E\uDE99 ${state.profile.coins}`;
  const wrap = document.getElementById('shopList');
  wrap.innerHTML = '';
  SHOP_ITEMS.forEach(item => {
    const owned = state.profile.inventory[item.id] || 0;
    const row = document.createElement('div');
    row.className = 'shop-item';
    row.innerHTML = `
      <span class="shop-icon">${item.icon}</span>
      <div class="shop-info"><h4>${item.name} <span class="shop-owned">(owned: ${owned})</span></h4><p>${item.desc}</p></div>
      <button class="btn-buy" ${state.profile.coins >= item.cost ? '' : 'disabled'}>${item.cost} \uD83E\uDE99</button>`;
    row.querySelector('.btn-buy').addEventListener('click', () => {
      if(state.profile.coins < item.cost) return;
      state.profile.coins -= item.cost;
      state.profile.inventory[item.id] = (state.profile.inventory[item.id] || 0) + 1;
      soundManager.playPurchase();
      saveCurrentProfile();
      queueToast(`Bought ${item.icon} ${item.name}!`, false);
      openShop();
    });
    wrap.appendChild(row);
  });
  showScreen('screen-shop');
}
document.getElementById('backFromShop').addEventListener('click', enterHub);

/* ============================================================
   PASSAGE READING + QUIZ
   Timing rules from the curriculum document:
     - Pre/Post-test: 15 min reading per passage, 1 hr overall,
       and each question ("quest") is timed at 1 minute.
     - Practice: 1 hr max reading, 1 min per question.
   ============================================================ */
const QUESTION_SECONDS = 60;

function openPassage(passage, mode){
  state.mode = mode;
  state.activePassage = passage;
  const isTest = mode !== 'practice';

  document.getElementById('storyEyebrow').textContent = isTest
    ? (mode === 'pretest' ? 'Pre-Test Passage' : 'Post-Test Passage')
    : `${assignedTier().name} Tier`;
  document.getElementById('storyTitle').textContent = passage.title;
  document.getElementById('storyByline').textContent = passage.author ? `by ${passage.author}` : '';
  document.getElementById('storyText').textContent = passage.text;

  const dx = state.profile.inventory.doubleXp || 0;
  document.getElementById('doubleXpNote').textContent =
    (!isTest && dx > 0) ? `\u2728 You own ${dx} Double XP Elixir(s) \u2014 you'll be asked before starting.` : '';

  // Reading timer
  const readSeconds = isTest ? (passage.timeLimitSeconds || 900) : 3600;
  state.passageSecondsLeft = readSeconds;
  clearInterval(state.passageTimer);
  updateReadClock();
  state.passageTimer = setInterval(() => {
    state.passageSecondsLeft--;
    updateReadClock();
    if(state.passageSecondsLeft <= 0){
      clearInterval(state.passageTimer);
      queueToast('\u23F1 Reading time is up \u2014 moving to the questions.', false);
      beginQuestions();
    }
  }, 1000);

  document.getElementById('sessionClock').style.display = isTest ? '' : 'none';
  updateSessionClock();
  showScreen('screen-story');
}
function updateReadClock(){
  document.getElementById('readClock').textContent = `\uD83D\uDCD6 ${fmtTime(state.passageSecondsLeft)} to read`;
}
document.getElementById('backFromStory').addEventListener('click', () => {
  if(state.mode !== 'practice'){
    queueToast('You can\u2019t leave the middle of a test.', false);
    return;
  }
  clearInterval(state.passageTimer);
  enterHub();
});
document.getElementById('toQuestionsBtn').addEventListener('click', () => {
  if(state.mode === 'practice'){
    const owned = state.profile.inventory.doubleXp || 0;
    state.doubleXpArmed = false;
    if(owned > 0 && confirm(`Use a \u2728 Double XP Elixir for this passage? You have ${owned}.`)){
      state.profile.inventory.doubleXp -= 1;
      state.doubleXpArmed = true;
      saveCurrentProfile();
    }
  }
  beginQuestions();
});

function beginQuestions(){
  clearInterval(state.passageTimer);
  const passage = state.activePassage;
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizStart = Date.now();
  state.currentAnswers = [];
  state.hearts = 3;
  // Post-test jumbles question order; pre-test keeps document order.
  state.questionOrder = state.mode === 'posttest'
    ? shuffled(passage.questions.length)
    : passage.questions.map((_, i) => i);
  showScreen('screen-quiz');
  renderQuestion();
}

function currentQuestion(){
  return state.activePassage.questions[state.questionOrder[state.quizIndex]];
}

function renderQuestion(){
  const passage = state.activePassage;
  const q = currentQuestion();
  const isTest = state.mode !== 'practice';

  state.choiceOrder = shuffled(q.choices.length);
  state.eliminated = [];
  state.hintShown = false;

  document.getElementById('qCounter').textContent = `${state.quizIndex + 1} / ${state.questionOrder.length}`;
  document.getElementById('qPassageName').textContent = passage.title;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('qFeedback').textContent = '';
  document.getElementById('heartsRow').style.display = isTest ? 'none' : '';
  document.getElementById('heartsRow').textContent = '\u2764\uFE0F'.repeat(Math.max(0,state.hearts)) + '\uD83D\uDDA4'.repeat(Math.max(0,3 - state.hearts));
  document.getElementById('quizCoin').textContent = `\uD83E\uDE99 ${state.profile.coins}`;
  document.getElementById('powerupBar').style.display = isTest ? 'none' : '';
  if(!isTest) renderPowerups();
  renderChoices();

  // Per-question timer (1 minute)
  state.qSecondsLeft = QUESTION_SECONDS;
  clearInterval(state.qTimer);
  updateQClock();
  state.qTimer = setInterval(() => {
    state.qSecondsLeft--;
    updateQClock();
    if(state.qSecondsLeft <= 5 && state.qSecondsLeft > 0) soundManager.playTick();
    if(state.qSecondsLeft <= 0){ clearInterval(state.qTimer); selectAnswer(-1, null); }
  }, 1000);
  updateSessionClock();
}
function updateQClock(){
  const bar = document.getElementById('qTimerFill');
  const txt = document.getElementById('qTimerText');
  const pct = Math.max(0, (state.qSecondsLeft / QUESTION_SECONDS) * 100);
  bar.style.width = pct + '%';
  bar.style.background = state.qSecondsLeft <= 10 ? 'var(--ember)' : 'var(--gold)';
  txt.textContent = `\u23F1 ${state.qSecondsLeft}s`;
}
function renderPowerups(){
  const inv = state.profile.inventory;
  const wrap = document.getElementById('powerupBar');
  wrap.innerHTML = `
    <button class="powerup-btn" id="btnMagnify" ${inv.magnify > 0 ? '' : 'disabled'}>\uD83D\uDD0D Magnify (${inv.magnify||0})</button>
    <button class="powerup-btn" id="btnHint" ${inv.scroll > 0 && !state.hintShown ? '' : 'disabled'}>\uD83D\uDCDC Hint (${inv.scroll||0})</button>
    <button class="powerup-btn" id="btnSkip" ${inv.skip > 0 ? '' : 'disabled'}>\u23ED\uFE0F Skip (${inv.skip||0})</button>`;
  document.getElementById('btnMagnify').onclick = () => {
    const q = currentQuestion();
    if((inv.magnify||0) <= 0) return;
    const wrong = q.choices.map((_,i) => i).filter(i => i !== q.correct && !state.eliminated.includes(i));
    state.eliminated.push(...wrong.sort(() => Math.random()-0.5).slice(0,2));
    inv.magnify--; saveCurrentProfile(); soundManager.playTick();
    renderPowerups(); renderChoices();
  };
  document.getElementById('btnHint').onclick = () => {
    if((inv.scroll||0) <= 0 || state.hintShown) return;
    inv.scroll--; state.hintShown = true;
    saveCurrentProfile(); soundManager.playTick();
    renderPowerups(); renderChoices();
  };
  document.getElementById('btnSkip').onclick = () => {
    if((inv.skip||0) <= 0) return;
    inv.skip--; saveCurrentProfile();
    clearInterval(state.qTimer);
    const q = currentQuestion();
    state.currentAnswers.push({ qIndex: state.questionOrder[state.quizIndex], chosen: -2, correct: false, skill: q.skill, skipped: true });
    advance();
  };
}
function renderChoices(){
  const q = currentQuestion();
  const wrap = document.getElementById('choices');
  wrap.innerHTML = '';
  state.choiceOrder.forEach(orig => {
    if(state.eliminated.includes(orig)) return;
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = q.choices[orig];
    btn.addEventListener('click', () => selectAnswer(orig, btn));
    wrap.appendChild(btn);
  });
  document.getElementById('hintText').textContent = state.hintShown ? `\uD83D\uDCA1 This question tests: ${SKILL_LABELS[q.skill]}` : '';
}

function selectAnswer(idx, btnEl){
  clearInterval(state.qTimer);
  const q = currentQuestion();
  const isTest = state.mode !== 'practice';
  document.querySelectorAll('#choices .choice-btn').forEach(b => b.disabled = true);

  const correct = idx === q.correct;
  if(correct){
    state.quizScore++;
    soundManager.playCorrect();
    if(!isTest) addCoins(2);
    if(btnEl) btnEl.classList.add('correct');
    document.getElementById('qFeedback').textContent = 'Correct \u2014 the passage supports that.';
  } else {
    soundManager.playWrong();
    if(btnEl) btnEl.classList.add('wrong');
    // Always reveal the correct answer so it's easy to locate and learn from.
    document.querySelectorAll('#choices .choice-btn').forEach(b => {
      if(b.textContent === q.choices[q.correct]) b.classList.add('correct');
    });
    document.getElementById('qFeedback').textContent = idx === -1
      ? '\u23F1 Time\u2019s up \u2014 the correct answer is highlighted.'
      : 'Not quite \u2014 the correct answer is highlighted above.';
    if(!isTest){
      state.hearts -= 1;
      soundManager.playHeartLose();
      document.getElementById('heartsRow').textContent = '\u2764\uFE0F'.repeat(Math.max(0,state.hearts)) + '\uD83D\uDDA4'.repeat(Math.max(0,3-state.hearts));
    }
  }
  document.getElementById('quizCoin').textContent = `\uD83E\uDE99 ${state.profile.coins}`;
  if(!isTest) saveCurrentProfile();
  state.currentAnswers.push({ qIndex: state.questionOrder[state.quizIndex], chosen: idx, correct, skill: q.skill });
  setTimeout(advance, 1400);
}

function advance(){
  state.quizIndex++;
  const isTest = state.mode !== 'practice';
  if(!isTest && state.hearts <= 0 && state.quizIndex < state.questionOrder.length){
    showHeartsEmpty();
    return;
  }
  if(state.quizIndex < state.questionOrder.length) renderQuestion();
  else finishPassage();
}

function showHeartsEmpty(){
  clearInterval(state.qTimer);
  document.getElementById('heartsCoin').textContent = `\uD83E\uDE99 ${state.profile.coins}`;
  document.getElementById('reviveBtn').disabled = state.profile.coins < 30;
  showScreen('screen-hearts');
}
document.getElementById('reviveBtn').addEventListener('click', () => {
  if(state.profile.coins < 30) return;
  state.profile.coins -= 30; state.hearts = 3;
  soundManager.playPurchase(); saveCurrentProfile();
  showScreen('screen-quiz'); renderQuestion();
});
document.getElementById('adBtn').addEventListener('click', () => {
  const b = document.getElementById('adBtn');
  b.disabled = true; b.textContent = '\u25B6\uFE0F Watching simulated ad\u2026';
  setTimeout(() => {
    state.hearts = 1;
    b.disabled = false; b.textContent = '\uD83D\uDCFA Watch Ad for +1 Heart (simulated)';
    showScreen('screen-quiz'); renderQuestion();
  }, 1500);
});
document.getElementById('quitBtn').addEventListener('click', () => { clearInterval(state.qTimer); enterHub(); });

function finishPassage(){
  clearInterval(state.qTimer);
  const passage = state.activePassage;
  const seconds = Math.max(1, Math.round((Date.now() - state.quizStart) / 1000));
  const total = state.questionOrder.length;
  const pct = Math.round(state.quizScore / total * 100);

  if(state.mode !== 'practice'){
    state.sessionResults[passage.id] = { score: state.quizScore, answers: state.currentAnswers };
    // Show a brief per-passage result, then continue the test run.
    showPassageResult(passage, state.quizScore, total, pct, seconds, 0, true);
    return;
  }

  const before = snapshotProfile();
  const p = state.profile;
  let earnedXp = Math.round(pct);
  if(state.doubleXpArmed) earnedXp *= 2;
  const prevBest = p.progress[passage.id] || 0;
  if(state.quizScore >= prevBest){
    p.progress[passage.id] = state.quizScore;
    p.answerLog[passage.id] = state.currentAnswers;
  }
  p.xp += earnedXp;
  const bonus = 15;
  addCoins(bonus);
  saveCurrentProfile();
  celebrateNewBadges(before);
  soundManager.playFanfare();
  showPassageResult(passage, state.quizScore, total, pct, seconds, bonus, false, earnedXp);
}

function showPassageResult(passage, score, total, pct, seconds, coinBonus, isTest, earnedXp){
  const band = comprehensionLevel(pct);
  document.getElementById('resTitle').textContent = passage.title;
  document.getElementById('resHeadline').textContent = pct === 100 ? 'Perfect!' : pct >= 80 ? 'Well Read.' : pct >= 59 ? 'Good Progress.' : 'Keep Practicing.';
  document.getElementById('resScore').textContent = `${score}/${total}`;
  document.getElementById('resPercent').textContent = `${pct}%`;
  document.getElementById('resBand').textContent = band.label;
  document.getElementById('resBand').style.color = band.color;
  document.getElementById('resNote').textContent = isTest
    ? 'Answer recorded. Continue to the next part of the test.'
    : `${band.desc} +${earnedXp} XP \u00B7 +${coinBonus} \uD83E\uDE99`;
  const btn = document.getElementById('resContinueBtn');
  btn.textContent = isTest ? 'Continue' : 'Return to Hub';
  btn.onclick = isTest ? nextTestPassage : enterHub;
  showScreen('screen-result');
}

/* ============================================================
   REVIEW (completed practice passages, read-only)
   ============================================================ */
function openReview(passage){
  document.getElementById('reviewTitle').textContent = passage.title;
  const score = state.profile.progress[passage.id];
  document.getElementById('reviewScore').textContent = `Best score: ${score}/${passage.questions.length}`;
  const log = state.profile.answerLog[passage.id] || [];
  const wrap = document.getElementById('reviewList');
  wrap.innerHTML = '';
  passage.questions.forEach((q, i) => {
    const entry = log.find(l => l.qIndex === i);
    let chosen = '(not recorded)';
    if(entry){
      if(entry.skipped) chosen = '(skipped)';
      else if(entry.chosen === -1) chosen = '(no answer \u2014 time ran out)';
      else chosen = q.choices[entry.chosen];
    }
    const right = entry ? entry.correct : false;
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `<p class="review-q">${i+1}. ${q.q}</p>
      <p class="review-answer ${right ? 'right' : 'wrong'}">Your answer: ${chosen}</p>
      ${right ? '' : `<p class="review-answer right">Correct answer: ${q.choices[q.correct]}</p>`}`;
    wrap.appendChild(div);
  });
  showScreen('screen-review');
}
document.getElementById('backFromReview').addEventListener('click', enterHub);

/* ============================================================
   GROWTH REPORT (pre vs post)
   ============================================================ */
function showGrowthReport(){
  const p = state.profile;
  const pre = p.pretest, post = p.posttest;
  const prePct = Math.round(pre.score / TOTAL_PRETEST_QUESTIONS * 100);
  const postPct = Math.round(post.score / TOTAL_PRETEST_QUESTIONS * 100);
  const delta = post.score - pre.score;

  document.getElementById('growPre').textContent = `${pre.score}/${TOTAL_PRETEST_QUESTIONS} (${prePct}%)`;
  document.getElementById('growPost').textContent = `${post.score}/${TOTAL_PRETEST_QUESTIONS} (${postPct}%)`;
  const dEl = document.getElementById('growDelta');
  dEl.textContent = `${delta >= 0 ? '+' : ''}${delta}`;
  dEl.style.color = delta > 0 ? 'var(--sage)' : delta < 0 ? 'var(--ember)' : 'var(--muted)';
  document.getElementById('growPreBand').textContent = comprehensionLevel(prePct).label;
  document.getElementById('growPostBand').textContent = comprehensionLevel(postPct).label;

  document.getElementById('growSummary').textContent = delta > 0
    ? `Comprehension improved by ${delta} item${delta === 1 ? '' : 's'} after completing the ${tierForScore(pre.score).name} tier.`
    : delta === 0
      ? 'Scores held steady between the pre-test and post-test.'
      : `Post-test score was ${Math.abs(delta)} lower. Worth discussing conditions \u2014 fatigue, timing, or test anxiety can all affect this.`;

  // Skill breakdown from post-test misses
  const miss = {};
  Object.values(post.answerLog).forEach(log => log.forEach(e => {
    if(!e.correct && !e.skipped) miss[e.skill] = (miss[e.skill] || 0) + 1;
  }));
  const weak = Object.entries(miss).sort((a,b) => b[1]-a[1]).slice(0,2).map(([s]) => s);
  const recWrap = document.getElementById('growRecs');
  recWrap.innerHTML = '';
  if(!weak.length){
    recWrap.innerHTML = '<div class="rec-card"><h4>Well-rounded reader</h4><p>No single skill stood out as a weak spot on the post-test.</p></div>';
  } else {
    weak.forEach(s => {
      const r = RECOMMENDATIONS[s];
      if(!r) return;
      const d = document.createElement('div');
      d.className = 'rec-card';
      d.innerHTML = `<h4>${r.title} <span class="rec-tag">${SKILL_LABELS[s]}</span></h4><p>${r.suggestion}</p>`;
      recWrap.appendChild(d);
    });
  }
  showScreen('screen-growth');
}
document.getElementById('growBackBtn').addEventListener('click', enterHub);

/* ============================================================
   INIT
   ============================================================ */
(function init(){
  const saved = localStorage.getItem(STORAGE_KEYS.currentIgn);
  if(saved && profileExists(saved)){
    state.ign = saved;
    state.profile = getOrCreateProfile(saved);
    const before = snapshotProfile();
    applyDailyStreak();
    celebrateNewBadges(before);
    routeAfterLogin();
  } else {
    showScreen('screen-ign');
  }
})();