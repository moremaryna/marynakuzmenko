/**
 * /ai-training-agrifood/ — workshops and training for agriculture and agrifood
 * teams, and the "Team training" link in the header.
 *
 * The page lived on aiinagriculture.org until 2026-10-24, when it moved here,
 * and aiinagriculture.org's "Workshops" page became a short invite that links
 * to it. It came across with its decisions, which were Maryna's:
 *
 *  - No price on the page. Every format is quoted for the organisation that
 *    asks. The "first workshop free" offer came off this page on 2026-10-24.
 *  - No brand name. "AI Skills Hub" and "AI Skills Boost" are the UK
 *    government's free training site and programme, cited below; training sold
 *    under either would read as part of it.
 *  - A certificate of *attendance*, never of completion. The course's
 *    certificate on aiinagriculture.org is earned by quizzes and verifiable; a
 *    workshop has none of that behind it.
 *  - Petiole Ltd is a CPD provider registered with BASIS, so a workshop can
 *    give each attendee a CPD record. Never "accredited training",
 *    "BASIS-approved" or "a qualification": those say something else.
 *
 * The words said in more than one place live here — the formats, topics,
 * definitions, the EU AI Act text, the figures and the questions — so the
 * page and its FAQPage markup cannot drift apart.
 *
 * Review it every quarter and bump `reviewed` when you do: the page prints it
 * as "Last reviewed". The EU AI Act answer is the one most likely to go stale.
 */

const facts = require("./facts.json");

/** The day the law and the figures were last checked against their sources. */
const reviewed = "2026-10-17";

const sentence = (text) => `${text[0].toUpperCase()}${text.slice(1)}.`;

/**
 * The three levels, in order. `means` finishes the sentence "AI awareness
 * means …", which is how the FAQ answer about them is built.
 */
const levels = [
  {
    id: "awareness",
    name: "AI awareness",
    means: "knowing what AI is, what it can and cannot do, and where its risks lie",
  },
  {
    id: "literacy",
    name: "AI literacy",
    means: "using and evaluating AI tools responsibly in your own work",
  },
  {
    id: "fluency",
    name: "AI fluency",
    means: "confidently applying AI to new problems and to the way work gets done",
  },
].map((level) => ({ ...level, meaning: sentence(level.means) }));

const named = (id) => levels.find((level) => level.id === id).name;

/** The answer the page makes its case with: quotable on its own. */
const definition =
  `AI literacy for agrifood is the ability to understand, use and critically evaluate AI tools ` +
  `in farming, agronomy, food manufacturing and supply chains, and to use them responsibly. ` +
  `It sits between ${named("awareness")} (knowing what AI is and its risks) and ` +
  `${named("fluency")} (confidently applying AI to solve new problems).`;

/**
 * The EU AI Act as it stood on `reviewed`. Article 4 first applied on
 * 2 February 2025; Regulation (EU) 2026/1744, the Digital Omnibus on AI,
 * replaced it from 27 July 2026, keeping the duty but setting no level. Never
 * say or imply that training or a certificate makes anyone compliant.
 */
const act = {
  answer:
    "Article 4 of the EU AI Act requires organisations that provide or use AI systems to take " +
    "measures to support their staff's AI literacy. It has applied since 2 February 2025. An " +
    "amendment in force since 27 July 2026 kept the duty, but no longer requires any particular " +
    "level of AI literacy to be reached.",
  scope:
    "It can. The Act applies to providers that place AI systems on the EU market wherever they " +
    "are based, and to providers and deployers outside the EU whose AI systems produce output " +
    "used in the EU. Whether that includes your business depends on where your AI systems and " +
    "their output are used, so take legal advice for your own situation.",
};

/** Figures, each with the primary source the page names beside it. */
const figures = [
  {
    value: "10 million",
    text:
      "UK workers the government and its industry partners aim to give AI skills by 2030, " +
      "through the free AI Skills Boost programme.",
    source: "DSIT and Skills England, 28 January 2026",
    url: "https://www.gov.uk/government/news/free-ai-training-for-all-as-government-and-industry-programme-expands-to-provide-10-million-workers-with-key-ai-skills-by-2030",
  },
  {
    // Fieldwork ran in February and March 2024: said, because a 2024 figure
    // presented as today's would mislead.
    value: "21%",
    text:
      "of UK adults in work said they felt confident using AI tools at work, in an Ipsos " +
      "survey for the government carried out in early 2024.",
    source: "DSIT and DCMS, AI Skills for Life and Work, published 28 January 2026",
    url: "https://www.gov.uk/government/publications/ai-skills-for-life-and-work-general-public-survey-findings",
  },
];

/** The ways the training is delivered, shortest first. None is priced. */
const formats = [
  {
    name: "Lecture or keynote",
    length: "45–90 minutes",
    bestFor:
      "Conferences, staff days, board meetings and kick-offs. Clear, and grounded in real examples.",
  },
  {
    name: "Short lesson",
    length: "1–2 hours",
    bestFor: "Lunch-and-learns and team briefings on one focused topic.",
  },
  {
    name: "Half-day or full-day workshop",
    length: "3–7 hours",
    bestFor: "Hands-on practice with real tools, your own data and your own use cases.",
  },
  {
    name: "Multi-session course",
    length: "4–12 weeks, weekly or fortnightly",
    bestFor:
      "Building lasting AI fluency across a team or department, with exercises between sessions.",
  },
  {
    name: "Custom programme",
    length: "Designed with you",
    bestFor:
      "A learning pathway mixing lectures, workshops and follow-up support, built around your crops, livestock, products and goals.",
  },
];

/** What can be added to any format. */
const addOns = [
  "A skills survey before the training",
  "Session recordings",
  "Slides and handouts",
  "Prompt libraries for your sector",
  "Follow-up question-and-answer sessions",
  "Certificates of attendance",
];

/** Each works as a lecture, a workshop or a module in a longer course. */
const topics = [
  {
    title: "AI fluency foundations: AI literacy for every employee",
    summary:
      "What AI is and isn't, and how machine learning, computer vision and large language models work, in plain language. Myths, limits and risks, and how to judge AI claims from vendors and the media.",
  },
  {
    title: "AI in agriculture",
    summary:
      "How AI is used on real farms today: crop monitoring, yield prediction, disease and pest detection, precision spraying, livestock and dairy monitoring, and decision support tools. What works, what is still hype, and how to start a pilot.",
  },
  {
    title: "AI in agrifood",
    summary:
      "AI across the food chain: forecasting demand, quality inspection, traceability, food safety, waste reduction, packing and logistics, and sustainability reporting.",
  },
  {
    title: "AI in plant phenotyping",
    summary:
      "Image-based measurement of plants: leaf area, growth, and stress and disease scoring. Cameras, calibration, and detection and segmentation models explained, with real examples from research and commercial growing.",
  },
  {
    title: "Data collection basics for the future of AI",
    summary:
      "AI is only as good as its data. How to collect, label, store and share field, lab and farm data so it is ready for AI: images, sensor readings, records, metadata and data quality. Best taken before any AI project starts.",
  },
  {
    title: "Basics of robotics and AI in agriculture",
    summary:
      "How agricultural robots see, decide and act: harvesting, weeding, milking and autonomous vehicles. Sensors, navigation, safety and costs, and what robotics means for farm labour and skills.",
  },
  {
    title: "Generative AI and prompting at work",
    summary:
      "Hands-on use of AI assistants for everyday tasks: reports, emails, grant applications, technical summaries, research reviews and training materials. Prompt engineering basics, with examples from agriculture.",
  },
  {
    title: "Responsible AI: data, privacy and trust",
    summary:
      "Who owns farm data, the basics of GDPR, bias and transparency, and writing an AI use policy for your organisation.",
  },
  {
    title: "AI strategy for leaders",
    summary:
      "A briefing for executives and boards: where AI creates value in your business, how to assess vendors and pilots, what skills your teams need, and how to measure the return.",
  },
];

/**
 * The questions, in the order the page prints them. Plain text only: the
 * FAQPage markup carries these strings as they are. An optional `link` is
 * printed after the answer, and added to the markup as an <a>.
 */
const faq = [
  {
    question: "Do participants need technical or coding skills?",
    answer:
      "No. Most sessions are designed for non-technical staff. Advanced, hands-on tracks are " +
      "available for data, R&D and engineering teams.",
  },
  {
    question: "Can training be delivered online?",
    answer:
      "Yes. Sessions run live online, in person at your site, or as a hybrid. Recordings can be " +
      "provided on request.",
  },
  {
    question: "How many people can attend?",
    answer:
      "From small teams of 5 to audiences of several hundred. Workshops work best with up to 25 " +
      "participants per group.",
  },
  {
    question: "Can you adapt the content to our business?",
    answer:
      "Yes. Every course uses examples from your sector, whether that is arable, horticulture, " +
      "dairy, food processing, retail or research. Custom programmes are built around your own " +
      "goals and data.",
  },
  {
    question: "Do you offer training in other languages?",
    answer:
      `${facts.languages.firstPerson} I'm not fluent in Spanish, but I can prepare ` +
      "Spanish-language training, particularly in a video-on-demand format.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The pricing depends on the format, the length, the size of the group and how much is " +
      `customised. Send me a few lines and I'll reply with a tailored quote ${facts.replyTime}.`,
  },
  {
    question: "Can our team earn CPD points?",
    answer:
      "Yes, from my workshops. CPD, continuing professional development, is the learning " +
      "professionals keep up and record each year to stay current in their field, and schemes " +
      "such as the BASIS Professional Register count it in points. Petiole Ltd, my company, is " +
      "an official CPD provider registered with BASIS, so a workshop can provide an official CPD " +
      "record for each attendee. Mention it when you ask for a quote.",
  },
  {
    question: "Can this support funded projects or skills budgets?",
    answer:
      "AI literacy training can often be included in innovation projects, staff development " +
      "plans and skills programmes. Get in touch to discuss your situation.",
  },
  {
    question: "Do participants get a certificate?",
    answer:
      "On request, each participant can receive a certificate of attendance for a session, " +
      "which records that they took part. It is a different document from the certificate of " +
      `completion that my free ${named("awareness")} course on aiinagriculture.org issues: that ` +
      "one is earned by watching the course and passing its quizzes, and anyone can verify it there.",
  },
  {
    question: "Is the training accredited?",
    answer:
      "If you need it, CPD hours can be obtained for a training built for you: Petiole Ltd is a " +
      "CPD provider registered with BASIS.",
  },
  {
    question: "What is the difference between AI awareness, AI literacy and AI fluency?",
    answer: levels.map((level) => `${level.name} means ${level.means}.`).join(" "),
  },
  {
    question: "Does the EU AI Act apply to UK agrifood companies?",
    answer: act.scope,
  },
  {
    question: "Does the EU AI Act require a certificate of AI literacy training?",
    answer:
      "No. Article 4 asks organisations to take measures to support their staff's AI literacy, " +
      "and the European Commission's guidance says no certificate is needed: an internal record " +
      "of training is enough. A certificate of completion can be part of that record, but it " +
      "does not show that an organisation is compliant.",
  },
  {
    question: `Is the ${named("awareness")} course really free?`,
    answer:
      `Yes: all ${facts.course.lessons} video lessons, the quizzes and the certificate of ` +
      "completion, for every person on your team.",
    link: { text: "Enroll here", url: facts.links.course },
  },
];

module.exports = {
  reviewed,
  levels,
  definition,
  act,
  figures,
  formats,
  addOns,
  topics,
  faq,
};
