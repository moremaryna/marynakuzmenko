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
 * Two differences, both on purpose:
 *
 *  - Enquiries go through this site's contact form (/contact/?type=training)
 *    rather than an email address, as every other enquiry here does.
 *  - The EU AI Act and UK figures are not repeated. They are reviewed every
 *    quarter on aiinagriculture.org, and a second copy here would go stale
 *    unnoticed; /training/ links to them instead.
 *
 * The same advertising rules hold: no prices, no accreditation, no
 * "qualification". A session gives a certificate of *attendance*; the
 * certificate of completion belongs to the free course and is earned by its
 * quizzes.
 */

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
    question: `Is the ${named("awareness")} course really free?`,
    answer:
      `Yes: all ${courses.awareness.lessons} video lessons, the quizzes and the certificate of ` +
      "completion, for every person on your team. The course site's terms commit to never " +
      "moving anything offered free behind a payment later.",
  },
];

module.exports = {
  source,
  enquiry,
  courses,
  levels,
  definition,
  formats,
  addOns,
  topics,
  audiences,
  steps,
  outcomes,
  faq,
};
