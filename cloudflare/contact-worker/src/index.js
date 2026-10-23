// Contact-form endpoint for marynakuzmenko.com.
//
// Accepts the POST from /contact/, validates it, and sends one email through
// the Cloudflare Email Routing `send_email` binding. Replies go straight to
// the visitor because their address is set as Reply-To.
//
// Responds with JSON when the page's fetch() asks for it (Accept:
// application/json, the format the existing form script expects), and with a
// 303 redirect to the success page when JavaScript is off.

import { EmailMessage } from "cloudflare:email";

const MAX = { name: 200, email: 254, subject: 60, message: 10000, extra: 500 };

// Fields the form may send besides name/email/subject/message.
const EXTRA_FIELDS = [
  ["organisation", "Organisation"],
  ["event_name", "Event / programme"],
  ["event_date", "Event date"],
  ["event_format", "Format"],
  ["event_location", "City and country"],
  ["audience_size", "Audience size"],
  ["audience", "Who will be in the room"],
  ["budget", "Budget"],
  ["book_request", "Book request"],
  ["brand", "Brand / company"],
  ["collab_type", "Collaboration type"],
  ["outlet", "Outlet / publication"],
  ["deadline", "Deadline"],
];

export default {
  async fetch(request, env) {
    const cors = corsHeaders(env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: { ...cors, Allow: "POST, OPTIONS" } });
    }

    const wantsJson = (request.headers.get("Accept") || "").includes("application/json");
    const fail = (status, message) =>
      wantsJson
        ? json({ ok: false, errors: [{ message }] }, status, cors)
        : new Response(message, { status, headers: cors });

    let form;
    try {
      form = await request.formData();
    } catch {
      return fail(400, "Could not read the form data.");
    }

    // Honeypot: real visitors never see this field, bots fill it in.
    if (field(form, "website")) {
      return wantsJson ? json({ ok: true }, 200, cors) : redirect(env.SUCCESS_URL, cors);
    }

    const name = field(form, "name").slice(0, MAX.name);
    const email = field(form, "email").slice(0, MAX.email);
    const subject = field(form, "subject").slice(0, MAX.subject) || "Other";
    const message = field(form, "message").slice(0, MAX.message);

    if (!name) return fail(400, "Please enter your name.");
    if (!isEmail(email)) return fail(400, "Please enter a valid email address.");
    if (!message) return fail(400, "Please enter a message.");

    const lines = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Topic:   ${subject}`,
    ];
    for (const [key, label] of EXTRA_FIELDS) {
      const value = field(form, key).slice(0, MAX.extra);
      if (value) lines.push(`${label}: ${value}`);
    }
    lines.push("", "Message:", "", message, "", "--", `Sent from ${env.ALLOWED_ORIGIN}/contact/`);

    const raw = buildMime({
      fromName: env.FROM_NAME,
      from: env.FROM_ADDRESS,
      to: env.TO_ADDRESS,
      replyTo: `${name} <${email}>`,
      subject: `[marynakuzmenko.com] ${subject} inquiry from ${name}`,
      body: lines.join("\r\n"),
    });

    try {
      await env.CONTACT_EMAIL.send(new EmailMessage(env.FROM_ADDRESS, env.TO_ADDRESS, raw));
    } catch (err) {
      console.error("send_email failed:", err);
      return fail(502, "The message could not be delivered. Please try again or reach out on LinkedIn.");
    }

    return wantsJson ? json({ ok: true }, 200, cors) : redirect(env.SUCCESS_URL, cors);
  },
};

function field(form, key) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}

function redirect(url, headers) {
  return new Response(null, { status: 303, headers: { ...headers, Location: url } });
}

// ---- Minimal RFC 5322 message builder (UTF-8, base64 body) ------------------

function buildMime({ fromName, from, to, replyTo, subject, body }) {
  const headers = [
    `From: ${encodeHeaderWord(fromName)} <${from}>`,
    `To: <${to}>`,
    `Reply-To: ${encodeAddress(replyTo)}`,
    `Subject: ${encodeHeaderWord(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@marynakuzmenko.com>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
  ];
  return headers.join("\r\n") + "\r\n\r\n" + base64Wrapped(body) + "\r\n";
}

// "Name <addr>" -> encode only the display name if it has non-ASCII characters.
function encodeAddress(s) {
  const m = s.match(/^(.*?)\s*<([^>]+)>$/);
  if (!m) return s;
  return `${encodeHeaderWord(m[1])} <${m[2]}>`;
}

function encodeHeaderWord(s) {
  const clean = s.replace(/[\r\n]+/g, " ");
  // eslint-disable-next-line no-control-regex
  if (/^[\x20-\x7e]*$/.test(clean) && !/[()<>,;:"]/.test(clean)) return clean;
  return `=?UTF-8?B?${toBase64(clean)}?=`;
}

function toBase64(s) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function base64Wrapped(s) {
  return toBase64(s).replace(/(.{76})/g, "$1\r\n");
}
