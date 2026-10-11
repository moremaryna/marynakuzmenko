/**
 * The photographs the pages show, other than book covers and the headshot.
 *
 * Each entry names a `master` under src/assets/img/, dropped in as it came off
 * a phone or a screen — several megabytes, sometimes with a screenshot's blank
 * margins around it. Pages never load the master. They load the two WebP
 * renditions scripts/site-images.py writes from it, 480 pixels wide and the
 * width named here, and the browser picks between them from `sizes`.
 *
 * `width` is chosen per photo: wide enough for the column it is drawn in on a
 * sharp screen, and never wider than the master. `height` is the rendition's
 * real height, written into the <img> so the page does not jump as the photo
 * arrives; site-images.py stops if the number here disagrees with the file it
 * just wrote.
 *
 * `name` is what the renditions are called when the master's own file name is
 * not something that belongs in a URL.
 *
 * `crop` is a [left, top, right, bottom] box in master pixels, for the two
 * screen captures: it trims the desktop around a shared certificate, and the
 * meeting ID and passcode off the foot of a webinar poster.
 *
 * `alt` says what is in the photograph, lettering included — a poster and a
 * certificate are mostly words, and a screen reader gets none of them
 * otherwise. `caption` is printed under the photo by partials/photo.njk and
 * says only what can be checked: where it was taken, and when, where the
 * photograph itself or its file name says so.
 *
 * `credit` names the people in a group photograph, left to right. It is a
 * second line of the caption, drawn only where it is asked for, so a page that
 * shows the photograph small is not carrying six names under a thumbnail.
 *
 * The folder holds photographs this file does not name — an alternate take, a
 * cathedral, a video call with other people's faces in it — and they stay
 * unpublished, because site-images.py renders only what is named here.
 *
 * Re-run `python scripts/site-images.py` whenever an entry is added or changed.
 */

const SMALL = 480;

function photo({ master, name, width, height, alt, caption, credit, crop }) {
  const rendition = (w) => `/assets/img/${name || master}-${w}.webp`;

  return {
    master,
    name: name || master,
    crop: crop || null,
    src: rendition(width),
    srcset: `${rendition(SMALL)} ${SMALL}w, ${rendition(width)} ${width}w`,
    width,
    height,
    alt,
    caption,
    credit: credit || null,
  };
}

module.exports = {
  // --- Fruit Attraction, Madrid, 6-8 October 2026 ---------------------------
  // Insights post "Fruit Attraction 2026"; the entrance selfie on Events.

  faEntranceSelfie: photo({
    master: "events/2026-10-08-Fruit-Attraction/1",
    name: "events/2026-10-08-Fruit-Attraction/maryna-kuzmenko-fruit-attraction-madrid-2026",
    width: 640,
    height: 1138,
    alt: "Dr. Maryna Kuzmenko in a green cardigan and polka-dot blouse, in a selfie in front of the Fruit Attraction entrance banner.",
    caption: "At Fruit Attraction, IFEMA Madrid, October 2026.",
  }),

  faLettuceWall: photo({
    master: "events/2026-10-08-Fruit-Attraction/20",
    name: "events/2026-10-08-Fruit-Attraction/living-lettuce-wall-stand-fruit-attraction-2026",
    width: 1600,
    height: 720,
    alt: "A stand wall of living lettuces growing in rows of glass bowls on a vertical green panel, lit from above.",
    caption: "One of the stand designs: a living lettuce wall.",
  }),

  faFruitPillar: photo({
    master: "events/2026-10-08-Fruit-Attraction/5",
    name: "events/2026-10-08-Fruit-Attraction/fruit-pillar-stand-fruit-attraction-2026",
    width: 640,
    height: 1422,
    alt: "A tall pillar built entirely of fresh fruit: pineapples, dragon fruit, melons, grapes and leaves, stacked from floor to ceiling.",
    caption: "A pillar of fresh fruit on a stand.",
  }),

  faMushrooms: photo({
    master: "events/2026-10-08-Fruit-Attraction/16",
    name: "events/2026-10-08-Fruit-Attraction/mushrooms-on-log-stand-fruit-attraction-2026",
    width: 640,
    height: 1422,
    alt: "A cluster of brown mushrooms growing out of a white-coated log, displayed on a stand.",
    caption: "Mushrooms growing on a log, on a produce display.",
  }),

  faJulianaBolanos: photo({
    master: "events/2026-10-08-Fruit-Attraction/8",
    name: "events/2026-10-08-Fruit-Attraction/maryna-kuzmenko-juliana-bolanos-castro-ifema-madrid-2026",
    width: 1200,
    height: 900,
    alt: "Dr. Maryna Kuzmenko and Juliana Bolanos Castro standing in front of the large IFEMA Madrid letters in the exhibition entrance hall.",
    caption: "Dr. Maryna Kuzmenko with Juliana Bolaños Castro at IFEMA Madrid.",
  }),

  faKacperDach: photo({
    master: "events/2026-10-08-Fruit-Attraction/13",
    name: "events/2026-10-08-Fruit-Attraction/maryna-kuzmenko-kacper-dach-agro-contracts-fruit-attraction-2026",
    width: 640,
    height: 1422,
    alt: "Dr. Maryna Kuzmenko and Kacper Dach standing beside a stand on a pink carpet, with a display screen behind them.",
    caption: "Dr. Maryna Kuzmenko with Kacper Dach from Agro Contracts.",
  }),

  faMarcJones: photo({
    master: "events/2026-10-08-Fruit-Attraction/10",
    name: "events/2026-10-08-Fruit-Attraction/maryna-kuzmenko-marc-jones-antobot-fruit-attraction-2026",
    width: 1200,
    height: 540,
    alt: "Dr. Maryna Kuzmenko and Marc Jones standing in front of an Antobot stand with yellow field robots and a wall of strawberry plants.",
    caption: "Dr. Maryna Kuzmenko with Marc Jones from Antobot.",
  }),

  faHumanoidRobot: photo({
    master: "events/2026-10-08-Fruit-Attraction/7",
    name: "events/2026-10-08-Fruit-Attraction/humanoid-robot-fruit-attraction-2026",
    width: 640,
    height: 1422,
    alt: "A white humanoid robot on a wheeled base in an exhibition aisle, beside crates of produce.",
    caption: "A humanoid robot on the show floor.",
  }),

  faCrateRobot: photo({
    master: "events/2026-10-08-Fruit-Attraction/17",
    name: "events/2026-10-08-Fruit-Attraction/crate-carrying-robot-fruit-attraction-2026",
    width: 640,
    height: 1422,
    alt: "A compact wheeled robot with a red frame carrying a blue produce crate, on a stand.",
    caption: "A wheeled robot built to carry produce crates.",
  }),

  faRobotArm: photo({
    master: "events/2026-10-08-Fruit-Attraction/18",
    name: "events/2026-10-08-Fruit-Attraction/robot-arm-post-harvest-fruit-attraction-2026",
    width: 640,
    height: 1422,
    alt: "A white robot arm mounted over a blue tray, on a stand.",
    caption: "A robot arm on the show floor.",
  }),

  faVolodymyrPechko: photo({
    master: "events/2026-10-08-Fruit-Attraction/4",
    name: "events/2026-10-08-Fruit-Attraction/maryna-kuzmenko-volodymyr-pechko-ukrsadvinprom-fruit-attraction-2026",
    width: 1200,
    height: 675,
    alt: "Dr. Maryna Kuzmenko in a selfie with Volodymyr Pechko in front of the Ukraine national stand at Fruit Attraction.",
    caption: "Dr. Maryna Kuzmenko with Volodymyr Pechko, Head of Ukrsadvinprom, at the Ukraine stand.",
  }),

  faDonkeyStand: photo({
    master: "events/2026-10-08-Fruit-Attraction/21",
    name: "events/2026-10-08-Fruit-Attraction/donkey-stand-design-fruit-attraction-2026",
    width: 1200,
    height: 540,
    alt: "A life-size model donkey carrying baskets of produce, on green carpet in front of an avocado-themed stand.",
    caption: "Another of the stand designs.",
  }),

  // --- Insights index thumbnails --------------------------------------------
  // A 3:2 crop of a selfie per post, so the index shows Maryna rather than the
  // people on stage in the posts' own hero photos.

  watisThumb: photo({
    master: "events/2026-09-28-WATIS/1",
    name: "events/2026-09-28-WATIS/world-agri-tech-london-2026-day-1-thumb",
    crop: [255, 0, 3009, 1836],
    width: 1200,
    height: 800,
    alt: "Dr. Maryna Kuzmenko holding up her delegate badge in front of the World Agri-Tech London 2026 partner wall.",
    caption: "At the World Agri-Tech Innovation Summit, London, September 2026.",
  }),

  watis2Thumb: photo({
    master: "events/2026-09-23-WATIS-2/1",
    name: "events/2026-09-23-WATIS-2/world-agri-tech-london-2026-day-2-thumb",
    crop: [0, 200, 3648, 2632],
    width: 1200,
    height: 800,
    alt: "Dr. Maryna Kuzmenko in a selfie at a window, with the Canary Wharf skyline and the river behind her.",
    caption: "The view of Canary Wharf from the summit venue, September 2026.",
  }),

  faThumb: photo({
    master: "events/2026-10-08-Fruit-Attraction/8",
    name: "events/2026-10-08-Fruit-Attraction/fruit-attraction-2026-thumb-ifema",
    crop: [400, 400, 4000, 2800],
    width: 1200,
    height: 800,
    alt: "Dr. Maryna Kuzmenko and Juliana Bolanos Castro standing in front of the large IFEMA Madrid letters in the exhibition entrance hall.",
    caption: "Dr. Maryna Kuzmenko with Juliana Bolaños Castro at IFEMA Madrid.",
  }),

  // The webinar poster has no selfie to crop, so the index shows its title
  // block, cut off just above the speakers' photos.
  iukbcThumb: photo({
    master: "speaking/maryna-kuzmenko-innovate-UK-business-connect",
    name: "speaking/understanding-the-innovation-journey-webinar-thumb",
    crop: [0, 0, 720, 480],
    width: 720,
    height: 480,
    alt: "Webinar poster title: Webinar Series, Understanding the Innovation Journey, When to Engage with Innovate UK Business Connect, 19 October 2026, 1pm to 2pm, online.",
    caption: "Understanding the Innovation Journey, a webinar by Innovate UK Business Connect.",
  }),

  // --- Innovate UK Business Connect webinar, online, 19 October 2026 --------
  // Insights post "Understanding the Innovation Journey".

  iukbcWebinar: photo({
    master: "speaking/maryna-kuzmenko-innovate-UK-business-connect",
    name: "speaking/maryna-kuzmenko-understanding-the-innovation-journey-webinar",
    width: 800,
    height: 1000,
    alt: "Webinar poster from Innovate UK Business Connect: Webinar Series, Understanding the Innovation Journey, When to Engage with Innovate UK Business Connect, 19 October 2026, 1pm to 2pm, online, with photos of five speakers, Dr. Maryna Kuzmenko among them, and Register now.",
    caption: "Understanding the Innovation Journey, online, 19 October 2026.",
  }),

  // --- World Agri-Tech Innovation Summit, London, 22-23 September 2026 ------
  // Insights post "World Agri-Tech London 2026, Day 1"; the selfie on Events.

  watisSelfie: photo({
    master: "events/2026-09-28-WATIS/1",
    name: "events/2026-09-28-WATIS/maryna-kuzmenko-world-agri-tech-london-2026",
    width: 1200,
    height: 675,
    alt: "Dr. Maryna Kuzmenko holding up her delegate badge, in a selfie in front of the World Agri-Tech London, September 22 to 23, 2026 partner wall.",
    caption: "At the World Agri-Tech Innovation Summit, London, September 2026.",
  }),

  watisStage: photo({
    master: "events/2026-09-28-WATIS/3",
    name: "events/2026-09-28-WATIS/jane-byrne-opening-world-agri-tech-london-2026",
    width: 1600,
    height: 720,
    alt: "Jane Byrne standing alone on a wide stage in front of a bright green and yellow backdrop reading World Agri-Tech, London, September 22 to 23, 2026, with two white chairs beside her.",
    caption: "Jane Byrne opening the World Agri-Tech Innovation Summit, London, September 2026.",
  }),

  watisJaneByrne: photo({
    master: "events/2026-09-28-WATIS/2",
    name: "events/2026-09-28-WATIS/maryna-kuzmenko-jane-byrne-world-agri-tech-london-2026",
    width: 1200,
    height: 900,
    alt: "Dr. Maryna Kuzmenko and Jane Byrne, both wearing green lanyards, in a selfie beside a World Agri-Tech banner in a hotel lobby.",
    caption: "Dr. Maryna Kuzmenko with Jane Byrne, Conference Producer of World Agri-Tech London.",
  }),

  watisMinisterialAddress: photo({
    master: "events/2026-09-28-WATIS/4",
    name: "events/2026-09-28-WATIS/stephen-morgan-ministerial-address-world-agri-tech-london-2026",
    width: 1200,
    height: 675,
    alt: "Stephen Morgan MP speaking from a lectern on the summit stage, with a large screen behind him reading Ministerial Address, Stephen Morgan MP, Department for Environment, Food and Rural Affairs.",
    caption: "The Ministerial Address by Stephen Morgan MP, UK Minister for Agriculture and Food.",
  }),

  watisStephenMorgan: photo({
    master: "events/2026-09-28-WATIS/5",
    name: "events/2026-09-28-WATIS/maryna-kuzmenko-stephen-morgan-world-agri-tech-london-2026",
    width: 1200,
    height: 900,
    alt: "Dr. Maryna Kuzmenko in a selfie with Stephen Morgan MP, who is wearing a dark suit and tie, in a wood-panelled conference foyer.",
    caption: "Dr. Maryna Kuzmenko with Stephen Morgan MP, UK Minister for Agriculture and Food, at World Agri-Tech London 2026.",
  }),

  watisElevateDairy: photo({
    master: "events/2026-09-28-WATIS/7",
    name: "events/2026-09-28-WATIS/maryna-kuzmenko-ming-fung-chua-elevate-dairy-world-agri-tech-2026",
    width: 1200,
    height: 900,
    alt: "Dr. Maryna Kuzmenko and Ming Fung Chua, both with green summit lanyards, smiling in a selfie in the conference foyer.",
    caption: "Dr. Maryna Kuzmenko with Ming Fung Chua from Elevate Dairy, Australia's first dairy-focused landing pad, by the Gardiner Foundation.",
  }),

  watisMarioCaccamo: photo({
    master: "events/2026-09-28-WATIS/9",
    name: "events/2026-09-28-WATIS/maryna-kuzmenko-mario-caccamo-kaust-world-agri-tech-2026",
    width: 1200,
    height: 900,
    alt: "Dr. Maryna Kuzmenko in a selfie with Professor Mario Caccamo, in a dark jacket and open shirt, in front of a marble wall in the conference foyer.",
    caption: "Dr. Maryna Kuzmenko with Professor Mario Caccamo from KAUST, the King Abdullah University of Science and Technology.",
  }),

  watisChloeMarshall: photo({
    master: "events/2026-09-28-WATIS/11",
    name: "events/2026-09-28-WATIS/maryna-kuzmenko-chloe-marshall-hugh-lowe-farms-world-agri-tech-2026",
    width: 1200,
    height: 675,
    alt: "Dr. Maryna Kuzmenko and Chloe Marshall smiling in a selfie in a wood-panelled conference hall, with a buffet table behind them.",
    caption: "Dr. Maryna Kuzmenko with Chloe Marshall, Field Implementation Consultant at Hugh Lowe Farms.",
  }),

  watisMarkJarman: photo({
    master: "events/2026-09-28-WATIS/13",
    name: "events/2026-09-28-WATIS/maryna-kuzmenko-mark-jarman-agriterra-world-agri-tech-2026",
    width: 1200,
    height: 675,
    alt: "Dr. Maryna Kuzmenko and Mark Jarman, in glasses and a light jacket, in a selfie in the conference foyer with delegates in the background.",
    caption: "Dr. Maryna Kuzmenko with Mark Jarman from AgriTERRA.",
  }),

  watisVolodymyrPugachov: photo({
    master: "events/2026-09-28-WATIS/15",
    name: "events/2026-09-28-WATIS/volodymyr-pugachov-farming-at-the-edge-world-agri-tech-2026",
    width: 1200,
    height: 675,
    alt: "Volodymyr Pugachov speaking on the summit stage with a microphone, beside a slide titled Farming at the Edge: Growing Food Under Extreme Constraints, showing the digital stack on a Ukrainian farm.",
    caption: "Volodymyr Pugachov, Regional Director of Donau Soja Eastern Europe and Deputy Chair of the Agricultural and Food Committee, Ukrainian Chamber of Commerce.",
  }),

  // --- World Agri-Tech, Day 2 (23 September 2026) ----------------------------
  // Insights post "World Agri-Tech London 2026, Day 2".

  watis2Stage: photo({
    master: "events/2026-09-23-WATIS-2/17",
    name: "events/2026-09-23-WATIS-2/autonomous-farming-panel-world-agri-tech-london-2026",
    width: 1600,
    height: 720,
    alt: "A panel of speakers seated on the summit stage under two large screens, with the World Agri-Tech backdrop and dimmed hall around them.",
    caption: "The expert panel on autonomous and precision farming, World Agri-Tech London, 23 September 2026.",
  }),

  watis2Panel: photo({
    master: "events/2026-09-23-WATIS-2/4",
    name: "events/2026-09-23-WATIS-2/elliott-grant-panel-speakers-world-agri-tech-london-2026",
    width: 1200,
    height: 672,
    alt: "Panellists seated on stage beneath a screen showing the speakers' names and portraits: Elliott Grant, Institute for Manufacturing, University of Cambridge; Peter van der Vlugt, Kubota Holdings Europe; Norbert Schlingmann, Agricultural Industry Electronics Foundation.",
    caption: "On stage: Dr Elliott Grant (Institute for Manufacturing, University of Cambridge), Peter van der Vlugt (Kubota Holdings Europe) and Norbert Schlingmann (Agricultural Industry Electronics Foundation).",
  }),

  watis2ElliottGrant: photo({
    master: "events/2026-09-23-WATIS-2/10",
    name: "events/2026-09-23-WATIS-2/maryna-kuzmenko-elliott-grant-cambridge-world-agri-tech-2026",
    width: 1200,
    height: 675,
    alt: "Dr. Maryna Kuzmenko in a selfie with Dr Elliott Grant, in glasses and a checked jacket, in a wood-panelled conference foyer.",
    caption: "Dr. Maryna Kuzmenko with Dr Elliott Grant, Institute for Manufacturing, University of Cambridge.",
  }),

  watis2RobLind: photo({
    master: "events/2026-09-23-WATIS-2/12",
    name: "events/2026-09-23-WATIS-2/maryna-kuzmenko-rob-lind-syngenta-spot-robot-world-agri-tech-2026",
    width: 1200,
    height: 540,
    alt: "Dr. Maryna Kuzmenko and Rob Lind crouching either side of a yellow Spot quadruped robot on the summit floor, in front of the stage.",
    caption: "Dr. Maryna Kuzmenko with Rob Lind from Syngenta, and a Spot robot.",
  }),

  watis2Spot: photo({
    master: "events/2026-09-23-WATIS-2/13",
    name: "events/2026-09-23-WATIS-2/spot-robot-world-agri-tech-london-2026",
    width: 1200,
    height: 540,
    alt: "A yellow Spot quadruped robot standing on the patterned carpet of the summit hall, in front of the stage backdrop.",
    caption: "A Spot robot on the summit floor.",
  }),

  watis2BelindaClarke: photo({
    master: "events/2026-09-23-WATIS-2/16",
    name: "events/2026-09-23-WATIS-2/maryna-kuzmenko-belinda-clarke-agri-teche-world-agri-tech-2026",
    width: 1200,
    height: 900,
    alt: "Dr. Maryna Kuzmenko in a selfie with Belinda Clarke, in a patterned jacket and green lanyard, in front of a sponsor wall.",
    caption: "Dr. Maryna Kuzmenko with Belinda Clarke from Agri-TechE.",
  }),

  watis2EmmaChapelhow: photo({
    master: "events/2026-09-23-WATIS-2/18",
    name: "events/2026-09-23-WATIS-2/maryna-kuzmenko-emma-chapelhow-world-agri-tech-2026",
    width: 1200,
    height: 900,
    alt: "Dr. Maryna Kuzmenko in a selfie with Emma Chapelhow, in a cap and a floral blouse, in front of a sponsor wall.",
    caption: "Dr. Maryna Kuzmenko with Emma Chapelhow, Rising Star of the Year at the National Women in Agriculture Awards 2026.",
  }),

  watis2SlideAgenticEra: photo({
    master: "events/2026-09-23-WATIS-2/7",
    name: "events/2026-09-23-WATIS-2/elliott-grant-agentic-era-slide-world-agri-tech-2026",
    width: 1200,
    height: 900,
    alt: "A screen showing a slide titled 2026 is the start of the Agentic era, a chart of AI task horizons rising from the pre-agentic to the agentic era, captioned Dr Elliott Grant, Agentic AI is Coming to Food and Agriculture, Are you Ready?, World Agri-Tech Summit London, 23 September 2026.",
    caption: "From Dr Elliott Grant's workshop: 2026 is the start of the agentic era.",
  }),

  watis2SlideAgenticReady: photo({
    master: "events/2026-09-23-WATIS-2/9",
    name: "events/2026-09-23-WATIS-2/elliott-grant-agentic-ai-ready-slide-world-agri-tech-2026",
    width: 1200,
    height: 900,
    alt: "A screen showing a slide titled Getting your Org Agentic AI-ready, with a checklist beside a cartoon farmer in sunglasses standing in a green field, captioned Dr Elliott Grant, Agentic AI is Coming to Food and Agriculture, Are you Ready?",
    caption: "From Dr Elliott Grant's workshop: getting your organisation agentic-AI-ready.",
  }),

  // --- Teaching -------------------------------------------------------------

  // Home, "The work, in pictures". Events, AI Challenge Camp.
  aiCamp: photo({
    master: "maryna-kuzmenko-with-students-at-AI-Camp-Loughborough-University-January-2026",
    name: "maryna-kuzmenko-ai-camp-loughborough",
    width: 1200,
    height: 677,
    alt: "Six people seated around joined seminar tables with laptops, notebooks and coffee cups, in a university seminar room with a whiteboard behind them.",
    caption:
      "Dr. Maryna Kuzmenko with students and university staff at the AI Challenge Camp, Loughborough University, January 2026.",
    credit:
      "Left to right: Kefan Chen, Oscar Witcombe, Michael Mamattah, Maryna Kuzmenko, Daisy Rowland, Lei Lyu.",
  }),

  // Events, the University of Sargodha webinar.
  sargodhaWebinar: photo({
    master: "maryna-kuzmenko-speaker",
    name: "maryna-kuzmenko-university-of-sargodha-webinar",
    crop: [0, 175, 1200, 925],
    width: 800,
    height: 500,
    alt: "Webinar poster from the University of Sargodha: AI-Transform Agriculture in Pakistan, Challenges and Opportunities, 2:00 PM, 10 September 2025, online, organised by Dr. Muhammad Kamran of the Department of Agronomy, with Dr. Maryna Kuzmenko listed first of four speakers as co-founder of Petiole and Agfluencers, UK.",
    caption: "The University of Sargodha webinar, 10 September 2025.",
  }),

  // --- Building the tools ---------------------------------------------------

  // Teaching page, "The Premise". About, under the professional bio.
  leafMeasurement: photo({
    master: "maryna-kuzmenko-leaf-area-measurement",
    width: 640,
    height: 1138,
    alt: "Dr. Maryna Kuzmenko holding a phone over a pine shoot on a white measuring board, beside a young conifer in a field.",
    caption: "Measuring leaf area in the field with Petiole Pro.",
  }),

  // Teaching page, "The Premise".
  raspberryPi: photo({
    master: "raspberri-pi",
    name: "maryna-kuzmenko-raspberry-pi",
    width: 640,
    height: 1138,
    alt: "Dr. Maryna Kuzmenko holding a Raspberry Pi and camera module in a red case, in a garden beside a flowering hedge.",
    caption: "Holding a Raspberry Pi and camera module.",
  }),

  // Partner page, "Credibility That Travels".
  petioleDemoStand: photo({
    master: "maryna-kuzmenko-stand",
    name: "maryna-kuzmenko-petiole-demo-stand",
    width: 1000,
    height: 562,
    alt: "An exhibition stand rig: a phone on a mount above apples on a Petiole measuring board, a second phone reading an area of 1.94 square centimetres, and a third showing a thermal image.",
    caption: "The Petiole Pro measurement rig, running on an exhibition stand.",
  }),

  // Partner page, "Credibility That Travels".
  bridgeAiStand: photo({
    master: "Image",
    name: "maryna-kuzmenko-bridgeai-stand",
    width: 1000,
    height: 750,
    alt: "Dr. Maryna Kuzmenko standing beside a demonstration table of apples and screens showing apple quality analysis, in a hall with a BridgeAI slide behind her.",
    caption: "Demonstrating apple quality control at a BridgeAI event.",
  }),

  // --- Speaking -------------------------------------------------------------

  // Home, "The work, in pictures". Speaking page, "Engagement Formats".
  conferenceTalk: photo({
    master: "maryna-kuzmenko-speaking",
    width: 1000,
    height: 667,
    alt: "Dr. Maryna Kuzmenko speaking into a handheld microphone, standing among a seated audience in a wood-panelled hall.",
    caption: "Speaking from the floor at a conference.",
  }),

  // Speaking page, "UK & Global Engagements".
  bridgeAiTalk: photo({
    master: "maryna-kuzmenko-speaking-at-bridgeai",
    width: 800,
    height: 1067,
    alt: "Dr. Maryna Kuzmenko standing and speaking into a microphone in a meeting room, a laptop open on a low table beside her.",
    caption: "Speaking at a BridgeAI event.",
  }),

  // Speaking page, "UK & Global Engagements".
  landscape2024: photo({
    master: "maryna-online-conference-2024",
    name: "maryna-kuzmenko-landscape-2024-berlin",
    width: 1000,
    height: 562,
    alt: "A lecture-hall screen showing Dr. Maryna Kuzmenko on a video call holding up a phone, beside a projected leaf-area measurement, next to a banner reading Landscape 2024, Agroecosystems in Transformation, 17 to 19 September 2024, Berlin, Germany.",
    caption: "Lecturing remotely into Landscape 2024, Berlin, September 2024.",
  }),

  // About, under "a regular speaker at educational events".
  conferenceConversation: photo({
    master: "maryna-kuzmenko-speaking-conference",
    name: "maryna-kuzmenko-conference-conversation",
    width: 1000,
    height: 520,
    alt: "Dr. Maryna Kuzmenko talking with another delegate across a table in a busy conference hall.",
    caption: "In conversation at a conference.",
  }),

  // --- Recognition ----------------------------------------------------------

  // Recognition page. About, under the award. Events, the Forum's launch.
  womenInInnovationForum: photo({
    master: "maryna-kuzmenko-women-in-innovation-community-forum",
    name: "maryna-kuzmenko-women-in-innovation-forum",
    width: 1000,
    height: 750,
    alt: "Dr. Maryna Kuzmenko in the foreground of a bright meeting room, a group working around tables behind her beneath a slide reading Women in Innovation Community Forum.",
    caption: "The Innovate UK Women in Innovation Community Forum.",
  }),

  // Recognition page. Events, the Southeast Asian Coffee Education Congress.
  coffeeCongress: photo({
    master: "maryna-kuzmenko-asia-coffee-conference",
    name: "maryna-kuzmenko-southeast-asian-coffee-congress-certificate",
    crop: [137, 336, 818, 810],
    width: 640,
    height: 445,
    alt: "A certificate of appreciation from Cavite State University, its National Coffee Research, Development and Extension Center, and the Philippine Association of Agriculturists, presented to Dr. Maryna Kuzmenko in recognition of her presentation as plenary speaker at the Southeast Asian Coffee Education Congress, dated 25 November 2025.",
    caption: "Certificate of appreciation for the plenary at the Southeast Asian Coffee Education Congress, 25 November 2025.",
  }),

  // Recognition page. Events, the Singapore Exchange.
  ukSingaporeForum: photo({
    master: "641361653_1353490006822410_7602090227761320552_n",
    name: "maryna-kuzmenko-uk-singapore-forum",
    width: 800,
    height: 1067,
    alt: "Dr. Maryna Kuzmenko in conversation with another delegate in a wood-panelled hall set with round tables.",
    caption: "The Innovate UK and Singapore peer insights forum, 2026.",
  }),
};
