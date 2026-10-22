/**
 * Training for organisations: /training/, and every page that sends a team
 * there (Work with me, Speaking, the course page, Contact, llms.txt).
 *
 * The offer itself is published at aiinagriculture.org/ai-training-agrifood/,
 * from src/_data/agrifoodTraining.js in the aiinagriculture repo. This file
 * repeats it, word for word where it can, so the two sites never describe a
 * different set of formats, topics or answers. When that page changes, change
 * this one to match.
 *
 * One difference, on purpose: enquiries go through this site's contact form
 * (/contact/?type=training) rather than an email address, as every other
 * enquiry here does.
 *
 * The EU AI Act and the UK figures are the part that goes stale without anyone
 * editing it, and the numbers are the part that matters. `npm run
 * check:figures` (scripts/check-figures.js) holds them to account: it fails
 * when `reviewed` is more than three months old, when aiinagriculture.org says
 * something different, or when a number can no longer be found in its own
 * primary source. .github/workflows/check-figures.yml runs it every Monday and
 * opens an issue when it fails. Change a figure only after reading it in the
 * primary source, then change `reviewed`.
 *
 * The same advertising rules hold: no prices, no accreditation, no
 * "qualification". A session gives a certificate of *attendance*; the
 * certificate of completion belongs to the free course and is earned by its
 * quizzes.
 */

/**
 * The day the law and the figures were last checked against their sources.
 * /training/ prints it as "Last reviewed"; check:figures fails 92 days on.
 */
const reviewed = "2026-10-17";

/** The canonical page for the offer, on the course site. */
const source = "https://aiinagriculture.org/ai-training-agrifood/";

/** Where every "book a session" button points. */
const enquiry = "/contact/?type=training";

const courses = {
  awareness: {
    title: "AI in Agriculture: Practical Introductory Course",
    url: "https://aiinagriculture.org/courses/ai-in-agriculture/",
    lessons: 15,
    quizzes: 8,
    length: "1h 14m",
  },
  fluency: {
    title: "Prompt Engineering Basics",
    url: `${source}#fluency-course`,
  },
};

/**
 * The three levels, in order. `means` finishes the sentence "AI awareness
 * means …", which is how the FAQ answer below is built from it.
 */
const levels = [
  {
    id: "awareness",
    name: "AI awareness",
    means: "knowing what AI is, what it can and cannot do, and where its risks lie",
    route: "The free course",
  },
  {
    id: "literacy",
    name: "AI literacy",
    means: "using and evaluating AI tools responsibly in your own work",
    route: "Lectures, lessons and workshops",
  },
  {
    id: "fluency",
    name: "AI fluency",
    means: "confidently applying AI to new problems and to the way work gets done",
    route: "Multi-session courses and custom programmes",
  },
].map((level) => ({ ...level, meaning: `${level.means[0].toUpperCase()}${level.means.slice(1)}.` }));

const named = (id) => levels.find((level) => level.id === id).name;

/** The answer the page opens with, quotable on its own. */
const definition =
  "AI literacy for agrifood is the ability to understand, use and critically evaluate AI tools " +
  "in farming, agronomy, food manufacturing and supply chains, and to use them responsibly. " +
  `It sits between ${named("awareness")} (knowing what AI is and its risks) and ` +
  `${named("fluency")} (confidently applying AI to solve new problems).`;

/**
 * The EU AI Act, as it stood on `reviewed`. Word for word from
 * aiinagriculture.org, which check:figures compares.
 *
 * Article 4 first applied on 2 February 2025 and required "a sufficient level"
 * of AI literacy. Regulation (EU) 2026/1744, the Digital Omnibus on AI, replaced
 * it from 27 July 2026: providers and deployers must still "take measures to
 * support the development of AI literacy" of their staff, but no level is set.
 * Scope over a UK business is Article 2(1)(a) and (c).
 *
 * `dates` are the dates the page states. Each must appear in the answer or the
 * note, and in the Commission's Q&A or the regulation itself — a moved date is
 * exactly what makes the summary wrong.
 */
const act = {
  answer:
    "Article 4 of the EU AI Act requires organisations that provide or use AI systems to take " +
    "measures to support their staff's AI literacy. It has applied since 2 February 2025. An " +
    "amendment in force since 27 July 2026 kept the duty, but no longer requires any particular " +
    "level of AI literacy to be reached.",
  note:
    "The Act does not name a course, and the European Commission's guidance says there is no " +
    "need for a certificate: an internal record of training is enough. Training is one measure " +
    "an organisation can take; on its own, it does not make an organisation compliant. National " +
    "market surveillance authorities supervise Article 4 from 2 August 2026.",
  scope:
    "It can. The Act applies to providers that place AI systems on the EU market wherever they " +
    "are based, and to providers and deployers outside the EU whose AI systems produce output " +
    "used in the EU. Whether that includes your business depends on where your AI systems and " +
    "their output are used, so take legal advice for your own situation.",
  dates: ["2 February 2025", "27 July 2026", "2 August 2026"],
  sources: [
    {
      name: "Regulation (EU) 2024/1689, the AI Act",
      detail: "Articles 2 and 4",
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      evidence: [["Article 4"], ["AI literacy"]],
    },
    {
      name: "Regulation (EU) 2026/1744, the Digital Omnibus on AI",
      detail: "in force from 27 July 2026",
      url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj",
      evidence: [["AI literacy"]],
    },
    {
      name: "European Commission, AI literacy: questions and answers",
      detail: "updated 27 July 2026",
      url: "https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers",
      evidence: [["2 February 2025"], ["2 August 2026"], ["certificate"]],
    },
  ],
};

/**
 * UK figures, each with the source the page names and links beside it. Only
 * figures someone has read in the primary source go here.
 *
 * `evidence` is what check:figures looks for in the source (the page and its
 * HTML attachments on gov.uk): each inner list is one fact, written any of the
 * ways the source might write it. If a source rewords a number without
 * changing it, add the new wording; if it changes the number, change the
 * figure.
 *
 * Left out on purpose, as on aiinagriculture.org: "13% of regular AI users are
 * AI-fluent". Grammarly's 2024 Harris Poll split adds up across all knowledge
 * workers asked, including those who avoid AI, so the population is wrong.
 */
const figures = [
  {
    value: "10 million",
    text:
      "UK workers the government and its industry partners aim to give AI skills by 2030, " +
      "through the free AI Skills Boost programme.",
    source: "DSIT and Skills England, 28 January 2026",
    url: "https://www.gov.uk/government/news/free-ai-training-for-all-as-government-and-industry-programme-expands-to-provide-10-million-workers-with-key-ai-skills-by-2030",
    evidence: [["10 million", "10m", "ten million"], ["2030"]],
  },
  {
    // The press release says "UK workers". The survey behind it asked adults in
    // work, in an Ipsos panel whose fieldwork ran in February and March 2024 —
    // said here, because a 2024 figure presented as today's would mislead.
    value: "21%",
    text:
      "of UK adults in work said they felt confident using AI tools at work, in an Ipsos " +
      "survey for the government carried out in early 2024.",
    source: "DSIT and DCMS, AI Skills for Life and Work, published 28 January 2026",
    url: "https://www.gov.uk/government/publications/ai-skills-for-life-and-work-general-public-survey-findings",
    evidence: [["21%", "21 per cent", "21 percent"], ["confident"]],
  },
];

/** The ways the training is delivered, shortest first. Every one is quoted. */
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

const audiences = [
  {
    title: "Farms and growers",
    summary: "Managers, agronomists and technical staff who want to use AI on the ground.",
  },
  {
    title: "Food producers, packers and retailers",
    summary: "Operations, quality, supply chain and sustainability teams.",
  },
  {
    title: "Agritech companies",
    summary: "Sales, product and customer success teams who need to explain AI clearly to farmers.",
  },
  {
    title: "Research institutes and universities",
    summary: "Scientists, PhD students and technicians in plant science, phenotyping and animal science.",
  },
  {
    title: "Industry bodies, cooperatives and advisers",
    summary: "Consultants, extension officers and member organisations.",
  },
  {
    title: "Leadership teams and boards",
    summary: "Executives who need a clear, honest picture of AI's risks and opportunities.",
  },
];

/** From first message to a trained team. */
const steps = [
  {
    title: "Get in touch",
    summary:
      "Send a few lines through the contact form about your organisation, your team and what you would like to achieve.",
  },
  {
    title: "Discovery call",
    summary:
      "A short call to understand your sector, your team's current AI skills and your goals, with an optional skills survey for participants.",
  },
  {
    title: "Tailored proposal",
    summary:
      "A clear outline of the format, topics, schedule, delivery and price, with examples adapted to your crops, livestock, products or research.",
  },
  {
    title: "Delivery and follow-up",
    summary:
      "Practical sessions online or on site, with materials your team keeps, and follow-up support to turn what they learned into action.",
  },
];

/** "After the training, participants can: …" */
const outcomes = [
  "Explain in plain words how AI works and where it fits in agriculture and agrifood",
  "Spot realistic AI opportunities in their own role and business",
  "Ask the right questions of AI vendors, consultants and data partners",
  "Use AI assistants safely and productively in everyday work",
  "Collect and organise data that is ready for future AI projects",
  "Understand the risks: data privacy, bias, errors and over-reliance",
  "Take part confidently in AI pilots, grant projects and digital transformation plans",
];

/**
 * The questions, in the order /training/ prints them. Plain text only: the
 * FAQPage markup carries these strings as they are.
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
    answer: "Training is delivered in English.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on the format, the length, the size of the group and how much is " +
      "customised. Send a request through the contact form for a tailored quote, usually within " +
      "two working days.",
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
      `completion that the free ${named("awareness")} course issues: that one is earned by ` +
      "watching the course and passing its quizzes, and anyone can check it on " +
      "aiinagriculture.org's verification page.",
  },
  {
    question: "Is the training accredited?",
    answer:
      "No. The training is not accredited and does not carry CPD or BASIS points. CPD " +
      "recognition is being explored, and this page will say so only once it is confirmed in " +
      "writing.",
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
      `Yes: all ${courses.awareness.lessons} video lessons, the quizzes and the certificate of ` +
      "completion, for every person on your team. The course site's terms commit to never " +
      "moving anything offered free behind a payment later.",
  },
];

module.exports = {
  reviewed,
  source,
  enquiry,
  courses,
  levels,
  definition,
  act,
  figures,
  formats,
  addOns,
  topics,
  audiences,
  steps,
  outcomes,
  faq,
};
