# Label Lens

**Live app:** https://et617-23b1274.vercel.app

Label Lens is a mobile-first web app that helps people analyse, understand and apply what they learned in class about nutrition labels. You photograph any nutrition label. The app rebuilds it as a clear table you can magnify or have read aloud, gives a short analysis of the product, and answers your questions in a chat that can use your own body details and goals. An evaluation log then scores how well you understood each product's nutrients.

---

## 1. Problem

People learn the basics of nutrition in class: what protein, carbohydrates, fats, sugar, fibre and sodium do in the body. Turning that knowledge into decisions in a shop is a different skill, and most learners struggle with it:

- **Labels are hard to read.** The print is small and crowded on curved packs. Layouts differ between Indian (per 100 g, per serve, %RDA), US (%DV) and EU labels.
- **The numbers need interpreting.** Learners mix up per-100 g, per-serving and per-pack values. They don't know when a value counts as "high", and they can't say what one serving means for their own day.
- **Class learning doesn't transfer.** Knowing that "added sugar raises blood glucose" is not the same as spotting that a "healthy" granola bar is one-quarter sugar. Learners can't easily check their reasoning or ask follow-up questions when the teacher isn't there.
- **There's no feedback on understanding.** Learners can't tell whether they have actually understood a product's nutrients or have only glanced at the label.

**Problem statement:** help users *analyse*, *understand* and *apply* their class learning on nutrition labels to real products, on their phone and at the moment of choosing, with feedback on how well they understood.

---

## 2. Outcomes

### Learning outcomes
After using Label Lens on a few products, the learner will be able to:

| # | Outcome | Level | Where it's practised |
|---|---|---|---|
| LO1 | **Identify** the key values on any nutrition label: serving size, servings per pack, energy, macronutrients, sugars (total and added), sodium or salt, and %DV/%RDA | Understand | Table screen |
| LO2 | **Convert** between per-100 g, per-serving and per-pack amounts, and say how many calories one serving and the whole pack contain | Apply | Table + Analysis |
| LO3 | **Classify** nutrients as low, medium or high using traffic-light limits per 100 g and the 5% / 20% %DV rule | Analyse | Analysis (Key nutrients) |
| LO4 | **Explain** what the product's main nutrients do in the body, and why high sugar, saturated fat or sodium matter | Understand | Ask (chat) |
| LO5 | **Judge** whether a product fits a personal goal (fat loss, muscle building, recovery, blood-sugar control) using estimated daily calorie and protein needs | Apply / Evaluate | Ask + Your details |
| LO6 | **Reflect** on their own understanding using the evaluation log, and return to products where they scored low | Evaluate | Log |

### Measures of success
- The learner reaches an **understanding score of 70% or more** in the evaluation log on at least 3 products.
- In chat, the learner correctly uses per-serving values (not per-100 g) when talking about what they eat.
- The learner can name the one nutrient to watch in a product without opening the Analysis screen.
- The app works on a 360 px phone screen with one thumb, and text stays readable at up to 250% magnification.

---

## 3. User persona

### Pranav Sharma, 28: the "label-curious gym-goer"

| | |
|---|---|
| **Name** | Pranav Sharma |
| **Age** | 28 |
| **Occupation** | Software QA engineer in Pune; long desk hours |
| **Prior knowledge of the topic** | He has some basic understanding of how different nutrients affect the body. He knows protein helps build muscle, sugar raises blood glucose, fibre helps digestion and too much salt is linked to blood pressure. He picked this up in a college nutrition elective and from fitness videos. He has rarely worked with the actual numbers on a label: he notices calories and protein, then stops. |
| **Misconception 1** | **"The calories on the label are what I eat."** He reads the first column, often *per 100 g*, as the amount in one bar or packet. He doesn't check the serving size or servings per pack, so he underestimates some snacks and overestimates others. |
| **Misconception 2** | **"Low-fat means healthy."** He sees fat as the main thing to avoid. If the front of a pack says "low fat", "multigrain" or "with oats", he assumes it's a good choice and overlooks added sugar and sodium, which are often high in exactly those products. |
| **Device** | Mid-range Android phone (about 6.5", 360 px browser width) using Chrome, mobile data in shops. Usually one-handed, with a product in the other hand. Sometimes the phone app's text size is turned up. |
| **Time** | **2–4 minutes** per product in the shop aisle (scan, glance at the analysis, one quick question). **10–15 minutes** on weekend evenings at home to look back over products and chat in more depth. |
| **Language** | Comfortable reading English, since labels, apps and work are in English. Speaks Hindi and Marathi at home and sometimes types questions in Hinglish ("ye bar daily kha sakta hu?"). Prefers short, plain-language answers to jargon. |
| **Motivation** | He started going to the gym 3 times a week and wants to **lose about 5 kg of body fat while building muscle**. His father was recently diagnosed with **type 2 diabetes**, so he wants to understand sugar properly and help his family shop better. He wants to actually *use* what he learned instead of guessing in the aisle. |

### Pranav's needs and how the app meets them
- **Quick and one-handed.** All main buttons sit in the bottom thumb zone, and a scan takes one or two photos.
- **Clear numbers he can trust.** The table copies the label as printed. Unclear values are marked **?** and can be corrected with a tap.
- **Fixing misconception 1.** The table shows the per-100 g and per-serving columns side by side. The analysis leads with **calories per serving** and adds per-100 g and whole-pack totals.
- **Fixing misconception 2.** The analysis rates sugar, salt and saturated fat next to fat, and pros and cons quote the actual numbers. A suggested chat question ("Which nutrient here should I watch most?") points him past fat.
- **Answers about him.** With his age, weight, activity and goal saved, chat answers relate a serving to his own daily calorie and protein targets.
- **Reading support.** Text magnification and read-aloud help when the light is poor or his eyes are tired after screen work.
- **A sense of progress.** The Log shows a percentage per product, so he can see where his understanding is weak.

---

## 4. Content plan

The content follows Pranav's journey: **Capture, then Read, then Analyse, then Apply, then Reflect**. Each step maps to the learning outcomes and to one screen of the app.

### 4.1 Learning path

| Step | Screen | Learning content | Learner activity | Outcomes | Time |
|---|---|---|---|---|---|
| 0. Orientation | All (sample product) | A ready-loaded sample (Oat & Honey Granola Bar) shows what a finished table, analysis and chat look like | Tap through the 5 tabs; listen to the sample table read aloud | none | 1 min |
| 1. Capture | **Scan** | Photo tips: fill the frame, avoid glare, add a 2nd photo if the table wraps | Photograph a real label (1–2 photos) and tap *Read label* | none | 30–60 s |
| 2. Read | **Table** | The label rebuilt as a Nutrition Facts panel, with main and sub-nutrients indented, serving size, servings per pack, a %DV/%RDA explainer ("5% or less is low, 20% or more is high"), allergens and ingredients | Compare the table with the pack; magnify (A+/A−); use *Listen*; correct any **?** value | LO1, LO2 | 1–2 min |
| 3. Analyse | **Analysis** | Calories per serving, per 100 g and per pack; a 1–5 health rating and verdict; where the calories come from (carbs/fat/protein bar); low/medium/high labels for fat, saturated fat, sugars, sodium, fibre and protein; up to 3 pros and 3 cons with numbers | Read or listen; predict the rating before looking; note the one nutrient that is "High" | LO2, LO3 | 1 min |
| 4. Apply | **Ask** + *Your details* | Short chat answers (direct answer plus up to 4 bullets) linking label numbers to body effects and to the learner's daily needs (Mifflin–St Jeor estimate) | Save details (age, sex, height, weight, activity, goal, health notes); ask by typing or voice; start with a suggested question, then ask follow-ups | LO4, LO5 | 2–10 min |
| 5. Reflect | **Log** | A list of every chat with an **understanding %** and how long ago it was last continued | Check the score; reopen low-scoring chats and ask deeper questions; compare products over time | LO6 | 1 min |

### 4.2 Suggested question bank (seeded in chat)
The chat suggests these to start the conversation and push past common misconceptions:

| Question | Targets |
|---|---|
| "Is this healthy to eat every day?" / "Does this fit my *fat loss* goal?" | LO5, misconception 2 |
| "How many servings can I have in a day?" | LO2, misconception 1 |
| "What does saturated fat do in the body?" | LO4 |
| "How much of my daily needs is one serving?" | LO2, LO5, misconception 1 |
| "Is this okay for someone with diabetes?" | LO4, LO5 (Pranav's family motivation) |
| "Which nutrient here should I watch most?" | LO3, misconception 2 |

Good follow-ups for Pranav, which raise the understanding score:
- "If I eat the whole pack, how much added sugar is that?"
- "Why is sodium high if it doesn't taste salty?"
- "Would swapping this for roasted chana help my protein target?"

### 4.3 How understanding is evaluated (summary for instructors)
After each answer, the AI reviews the whole chat and gives a single **0–100% understanding score**. Learners see only the percentage. The score considers:
- how many of the product's important nutrients the learner engaged with
- how specific and deep the questions were
- whether follow-ups built on earlier answers or applied them to the learner's own situation
- whether the answers given were clear and complete
- any misconception left uncorrected

One or two generic questions score low by design (about 10–35%). Broad, building questions score high (75–100%).

> The score is an AI estimate meant for self-reflection. It is not a validated assessment.

### 4.4 Accessibility and design principles
- **Mobile first.** Designed for 360 px width, with key actions in the bottom thumb zone, 44–48 px touch targets and no hover-only interactions.
- **Several ways to take in content.** Text, magnification (100–250%) with a reflowing table, read-aloud with row highlighting and speed control, and voice or typed questions.
- **Plain language.** Short answers, the label's own numbers, and colour always paired with words (High/Medium/Low).
- **Safety.** It gives general guidance only, suggests a doctor or dietitian for medical conditions, and never encourages extreme restriction.

### 4.5 Suggested use in a course
| When | Activity |
|---|---|
| After the class on macronutrients | Scan 3 snacks from home; compare their calorie split and protein on the Analysis screen |
| After the class on sugar, salt and fats | Scan a "low-fat" or "multigrain" product and find what's High; discuss misconception 2 |
| Weekly practice | Ask at least 3 follow-up questions per product; aim for 70% or more in the Log |
| End of module | Share Log screenshots and explain one product's label to a peer using per-serving values |

---

## 5. Features

- **Scan:** upload 1–2 photos of any label (Indian, US, EU and other formats).
- **Table:** an accurate, editable nutrition table with magnify, read-aloud and unclear-value markers.
- **Analysis:** calories, health rating, calorie split, nutrient levels, and pros and cons, with magnify and read-aloud.
- **Ask:** a chat by typing or voice, with optional personal details for answers based on daily needs.
- **Practice:** a 6-question activity on a sample label (multiple choice, number entry, true/false) with model answers and feedback aimed at misconceptions; attempts are saved to the Log.
- **Identity token:** "ID 23B1274" in a sticky header on every screen.
- **Log:** an evaluation log with an understanding % and time since last continued for every chat; tap one to continue it.

---

## 6. Tech and deployment

### Files
- `index.html`: the whole app (no build step)
- `api/ai.js`: a Vercel Function that calls Groq with your key (the key never reaches the browser)
- `vercel.json`: gives that function up to 60 s

### Environment variables (set in Vercel)
| Name | Required | What it does |
|---|---|---|
| `GROQ_API_KEY` | yes | Free Groq API key (console.groq.com, then API Keys) |
| `GROQ_VISION_MODEL` | no | Model that reads label photos (default `qwen/qwen3.8-27b`) |
| `GROQ_TEXT_MODEL` | no | Model for analysis, chat and scoring (default `openai/gpt-oss-120b`) |

### Deploy
1. Push this folder to a GitHub repo.
2. In Vercel, go to Add New, then Project, and import the repo. Set **Project Name** to `et617-23b1274` and **Framework Preset** to **Other**, and leave the build settings empty.
3. Add `GROQ_API_KEY` under Environment Variables, then Deploy. The app is served at `https://et617-23b1274.vercel.app`.

Or from a terminal inside this folder: `npm i -g vercel`, then `vercel` (name the project `et617-23b1274`), then `vercel env add GROQ_API_KEY production`, then `vercel --prod`.

### Free-tier notes
- Up to 2 photos per label, which keeps a scan inside Groq's free per-minute token limit.
- If many people use the app at once, some will see "wait a minute and try again". The server waits and retries once by itself.
- Chats, the evaluation log and personal details are saved in each visitor's browser (localStorage).
- Smaller open models can misread blurry digits, so check rows marked **?**.
