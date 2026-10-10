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
