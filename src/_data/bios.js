/**
 * The published bios of Dr Maryna Kuzmenko, in every length an organiser or
 * editor asks for. Figures come from facts.json, so a bio can never quote a
 * number the rest of the site has moved on from.
 *
 * Running text says "Dr Maryna Kuzmenko", without the full stop, as the bios
 * always have. The 50-word bio is also the Person description in the
 * structured data, and the first-person one opens the About page.
 */

const facts = require("./facts.json");

// "1.2K+" -> "1,200", the same expansion as the fullCount filter.
function fullCount(value) {
  const match = String(value).trim().match(/^([\d.,]+)\s*([KM])?\+?$/i);
  if (!match) return value;
  const multiplier = { K: 1e3, M: 1e6 }[(match[2] || "").toUpperCase()] || 1;
  return Math.round(parseFloat(match[1].replace(/,/g, "")) * multiplier).toLocaleString("en-GB");
}

const award = facts.award.wiw.name;
const { linkedin, countries, students } = facts.reach;

const speakerIntroduction = [
  "Our next speaker builds the technology she talks about.",
  "Dr Maryna Kuzmenko founded MooMore, which uses thermal imaging and AI to catch lameness in dairy cows before a farmer can see it, and co-founded Petiole, whose crop measurement tools are used by researchers on six continents.",
  `She is a LinkedIn Top Voice, the author of the AI in Agriculture book series, and a winner of the ${award}.`,
  `She has taught AI in agriculture to more than ${fullCount(students)} students in ${countries} countries.`,
  "Please welcome Dr Maryna Kuzmenko.",
];

module.exports = {
  oneLine:
    `Dr Maryna Kuzmenko is a UK-based speaker and trainer on AI in agriculture, a LinkedIn Top Voice, and winner of the ${award} for MooMore.`,

  short:
    `Dr Maryna Kuzmenko speaks and trains on AI in agriculture for agrifood events and teams. A LinkedIn Top Voice, she founded MooMore, co-founded Petiole, writes the AI in Agriculture book series, and won the ${award}.`,

  fiftyWords:
    `Dr Maryna Kuzmenko is a UK-based speaker and trainer on AI in agriculture and a LinkedIn Top Voice. She founded MooMore, which uses thermal imaging to detect lameness in dairy cows early, co-founded Petiole, and writes the AI in Agriculture book series. She won the ${award}.`,

  hundredWords:
    `Dr Maryna Kuzmenko is a UK-based speaker and trainer on AI in agriculture. She gives keynotes at agrifood conferences and industry meetings, trains agrifood teams in practical AI literacy, and writes for a ${linkedin} LinkedIn community as a LinkedIn Top Voice. Her work returns to one problem: a measurement that matters is locked behind specialist equipment, so the people who need it never take it. With Petiole Pro the answer was a smartphone camera, now used by research organisations on six continents. With MooMore, winner of the ${award}, it is thermal imaging that catches lameness in dairy cows early.`,

  speakerIntroduction: speakerIntroduction.join(" "),

  // The introduction in plain third person: without the opening line and the
  // welcome, followed by where to find her.
  media:
    speakerIntroduction.slice(1, -1).join(" ") +
    " Speaking: marynakuzmenko.com/speaking · Team training: aiinagriculture.org · MooMore: moomore.com · Press contact: marynakuzmenko.com/contact/?type=media",

  firstPerson:
    `I speak and train on AI in agriculture, for conference audiences, boards and agrifood teams, and I build the thing I talk about. MooMore uses thermal imaging and on-device AI to catch lameness in dairy cows before anyone can see it, and it won the ${award}. Before that I spent a decade on the crop side with Petiole, building measurement tools now used by research organisations on six continents. I write about all of it as a LinkedIn Top Voice, and in the AI in Agriculture book series.`,
};
