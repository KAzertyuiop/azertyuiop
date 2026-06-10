document.documentElement.classList.add("js");

const KEY_FLASHABLE = new Set(["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"]);
const keyFlashTimers = new Map();
const EMAIL_SWEEP_SUFFIX = ["z", "e", "r", "t", "y", "u", "i", "o", "p"];
const KEY_INTRO_DELAY = 0.2;
const KEY_INTRO_STAGGER = 0.03;
const KEY_INTRO_DURATION = 0.009;
const ROLE_START_DELAY = 0.95;

const ROLE_ACTION_GROUPS = [
  { delay: 4000, actions: [{ selector: ".caret-mid", value: "inline" }, { selector: ".space", value: "none" }, { selector: ".caret-end", value: "none" }] },
  { delay: 1000, actions: [{ selector: ".u2-x", value: "none" }] },
  { delay: 20, actions: [{ selector: ".u1-u", value: "none" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i1-i", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i2-n", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".i3-f", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".i4-o", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i5-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i6-m", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".i7-a", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i8-t", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i9-i", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i10-o", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".i11-n", value: "inline" }] },
  { delay: 1000, actions: [{ selector: ".caret-mid", value: "none" }, { selector: ".caret-end", value: "inline" }, { selector: ".space", value: "inline" }] },
  { delay: 1000, actions: [{ selector: ".a1-a", value: "none" }, { selector: ".a2-r", value: "none" }, { selector: ".a3-c", value: "none" }, { selector: ".a4-h", value: "none" }, { selector: ".a5-i", value: "none" }, { selector: ".a6-t", value: "none" }, { selector: ".a7-e", value: "none" }, { selector: ".a8-c", value: "none" }, { selector: ".a9-t", value: "none" }, { selector: ".space", value: "none" }] },
  { delay: 100, actions: [{ selector: ".i1-i", value: "none" }, { selector: ".i2-n", value: "none" }, { selector: ".i3-f", value: "none" }, { selector: ".i4-o", value: "none" }, { selector: ".i5-r", value: "none" }, { selector: ".i6-m", value: "none" }, { selector: ".i7-a", value: "none" }, { selector: ".i8-t", value: "none" }, { selector: ".i9-i", value: "none" }, { selector: ".i10-o", value: "none" }, { selector: ".i11-n", value: "none" }] },
  { delay: 20, actions: [{ selector: ".ba-b1-b", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-b2-u", value: "inline" }] },
  { delay: 50, actions: [] },
  { delay: 20, actions: [{ selector: ".ba-b3-s", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-b4-i", value: "inline" }] },
  { delay: 50, actions: [] },
  { delay: 20, actions: [{ selector: ".ba-b5-n", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-b6-e", value: "inline" }] },
  { delay: 50, actions: [] },
  { delay: 20, actions: [{ selector: ".ba-b7-s", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-b8-s", value: "inline" }] },
  { delay: 0, actions: [{ selector: ".space", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-a1-a", value: "inline" }] },
  { delay: 50, actions: [] },
  { delay: 20, actions: [{ selector: ".ba-a2-n", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-a3-a", value: "inline" }] },
  { delay: 50, actions: [] },
  { delay: 20, actions: [{ selector: ".ba-a4-l", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-a5-y", value: "inline" }] },
  { delay: 50, actions: [] },
  { delay: 20, actions: [{ selector: ".ba-a6-s", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".ba-a7-t", value: "inline" }] },
  { delay: 50, actions: [] },
  { delay: 600, actions: [{ selector: ".ba-a1-a", value: "none" }, { selector: ".ba-a2-n", value: "none" }, { selector: ".ba-a3-a", value: "none" }, { selector: ".ba-a4-l", value: "none" }, { selector: ".ba-a5-y", value: "none" }, { selector: ".ba-a6-s", value: "none" }, { selector: ".ba-a7-t", value: "none" }, { selector: ".space", value: "none" }] },
  { delay: 0, actions: [{ selector: ".ba-b8-s", value: "none" }, { selector: ".ba-b7-s", value: "none" }, { selector: ".ba-b6-e", value: "none" }, { selector: ".ba-b5-n", value: "none" }, { selector: ".ba-b4-i", value: "none" }, { selector: ".ba-b3-s", value: "none" }, { selector: ".ba-b2-u", value: "none" }, { selector: ".ba-b1-b", value: "none" }] },
  { delay: 60, actions: [{ selector: ".proxy1-p", value: "inline" }] },
  { delay: 60, actions: [{ selector: ".proxy2-r", value: "inline" }] },
  { delay: 60, actions: [{ selector: ".proxy3-o", value: "inline" }] },
  { delay: 60, actions: [{ selector: ".proxy4-x", value: "inline" }] },
  { delay: 60, actions: [{ selector: ".proxy5-y", value: "inline" }] },
  { delay: 0, actions: [{ selector: ".proxy-space", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".p1-p", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".p2-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".p3-o", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".p4-d", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".p5-u", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".p6-c", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".p7-t", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 0, actions: [{ selector: ".space", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".o1-o", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".o2-w", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".o3-n", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".o4-e", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".o5-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 250, actions: [{ selector: ".caret-end", value: "none" }, { selector: ".caret-proxy", value: "inline" }] },
  { delay: 550, actions: [] },
  { delay: 60, actions: [{ selector: ".proxy5-y", value: "none" }] },
  { delay: 60, actions: [{ selector: ".proxy4-x", value: "none" }] },
  { delay: 60, actions: [{ selector: ".proxy3-o", value: "none" }] },
  { delay: 60, actions: [{ selector: ".proxy2-r", value: "none" }] },
  { delay: 60, actions: [{ selector: ".proxy1-p", value: "none" }] },
  { delay: 300, actions: [] },
  { delay: 0, actions: [{ selector: ".proxy-space", value: "none" }, { selector: ".caret-proxy", value: "none" }, { selector: ".caret-end", value: "inline" }] },
  { delay: 1000, actions: [{ selector: ".o1-o", value: "none" }, { selector: ".o2-w", value: "none" }, { selector: ".o3-n", value: "none" }, { selector: ".o4-e", value: "none" }, { selector: ".o5-r", value: "none" }] },
  { delay: 170, actions: [{ selector: ".d1-d", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".d2-e", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".d3-s", value: "inline" }] },
  { delay: 50, actions: [{ selector: ".d4-i", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".d5-g", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".d6-n", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".d7-e", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".d8-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 1000, actions: [{ selector: ".caret-end", value: "none" }, { selector: ".space", value: "none" }, { selector: ".caret-mid", value: "inline" }] },
  { delay: 1000, actions: [{ selector: ".p1-p", value: "none" }, { selector: ".p2-r", value: "none" }, { selector: ".p3-o", value: "none" }, { selector: ".p4-d", value: "none" }, { selector: ".p5-u", value: "none" }, { selector: ".p6-c", value: "none" }, { selector: ".p7-t", value: "none" }] },
  { delay: 20, actions: [{ selector: ".s1-s", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".s2_e", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".s3-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".s4-v", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".s5-i", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".s6-c", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".s7-e", value: "inline" }] },
  { delay: 100, actions: [] },
  { delay: 1000, actions: [{ selector: ".s1-s", value: "none" }, { selector: ".s2_e", value: "none" }, { selector: ".s3-r", value: "none" }, { selector: ".s4-v", value: "none" }, { selector: ".s5-i", value: "none" }, { selector: ".s6-c", value: "none" }, { selector: ".s7-e", value: "none" }] },
  { delay: 1000, actions: [{ selector: ".u1-u", value: "inline" }] },
  { delay: 100, actions: [] },
  { delay: 500, actions: [{ selector: ".u2-x", value: "inline" }] },
  { delay: 1000, actions: [{ selector: ".caret-mid", value: "none" }, { selector: ".caret-end", value: "inline" }, { selector: ".space", value: "inline" }] },
  { delay: 2000, actions: [{ selector: ".d8-r", value: "none" }] },
  { delay: 200, actions: [{ selector: ".d7-e", value: "none" }] },
  { delay: 0, actions: [{ selector: ".d6-n", value: "none" }] },
  { delay: 0, actions: [{ selector: ".d2-e", value: "none" }, { selector: ".d1-d", value: "none" }, { selector: ".space", value: "none" }, { selector: ".d3-s", value: "none" }, { selector: ".d4-i", value: "none" }, { selector: ".d5-g", value: "none" }] },
  { delay: 0, actions: [{ selector: ".space", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".r1-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".r2-e", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".r3-s", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".r4-e", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".r5-a", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".r6-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".r7-c", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".r8-h", value: "inline" }] },
  { delay: 20, actions: [{ selector: ".r9-e", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 20, actions: [{ selector: ".r10-r", value: "inline" }] },
  { delay: 60, actions: [] },
  { delay: 1000, actions: [{ selector: ".r10-r", value: "none" }, { selector: ".r9-e", value: "none" }, { selector: ".r8-h", value: "none" }, { selector: ".r7-c", value: "none" }, { selector: ".r6-r", value: "none" }, { selector: ".r5-a", value: "none" }, { selector: ".r4-e", value: "none" }, { selector: ".r3-s", value: "none" }, { selector: ".r2-e", value: "none" }, { selector: ".r1-r", value: "none" }] },
  { delay: 50, actions: [{ selector: ".a1-a", value: "inline" }] },
  { delay: 100, actions: [] },
  { delay: 50, actions: [{ selector: ".a2-r", value: "inline" }] },
  { delay: 100, actions: [] },
  { delay: 50, actions: [{ selector: ".a3-c", value: "inline" }] },
  { delay: 50, actions: [{ selector: ".a4-h", value: "inline" }] },
  { delay: 50, actions: [{ selector: ".a5-i", value: "inline" }] },
  { delay: 100, actions: [] },
  { delay: 50, actions: [{ selector: ".a6-t", value: "inline" }] },
  { delay: 100, actions: [] },
  { delay: 50, actions: [{ selector: ".a7-e", value: "inline" }] },
  { delay: 100, actions: [] },
  { delay: 50, actions: [{ selector: ".a8-c", value: "inline" }] },
  { delay: 50, actions: [{ selector: ".a9-t", value: "inline" }] },
  { delay: 100, actions: [{ selector: ".caret-end", value: "none" }] },
];

function setActiveCaret(selector) {
  const carets = document.querySelectorAll(".role-caret");
  carets.forEach((caret) => caret.classList.remove("is-active"));
  document.querySelectorAll(selector).forEach((caret) => caret.classList.add("is-active"));
}

function flashKeyForSelector(selector) {
  const letterNode = document.querySelector(selector);
  const letter = letterNode?.textContent?.trim().toLowerCase();
  if (!letter || !KEY_FLASHABLE.has(letter)) return;

  const key = document.querySelector(`.key-${letter}`);
  if (!key) return;

  if (keyFlashTimers.has(key)) {
    window.clearTimeout(keyFlashTimers.get(key));
  }

  key.classList.add("is-pressed");
  const timer = window.setTimeout(() => {
    key.classList.remove("is-pressed");
    keyFlashTimers.delete(key);
  }, 100);
  keyFlashTimers.set(key, timer);
}

function buildRoleTimeline() {
  if (!window.gsap || window.__roleInitialized) return;

  window.__roleInitialized = true;
  setActiveCaret(".caret-end");
  const tl = gsap.timeline({ repeat: -1, delay: ROLE_START_DELAY });
  ROLE_ACTION_GROUPS.forEach((group) => {
    tl.to({}, { duration: group.delay / 1000 }).call(() => {
      group.actions.forEach(({ selector, value }) => {
        if (selector === ".caret-mid" || selector === ".caret-end" || selector === ".caret-proxy") {
          if (value === "inline") {
            setActiveCaret(selector);
          }
          return;
        }

        if (selector === ".space") {
          document.querySelectorAll(selector).forEach((el) => {
            el.style.display = "inline";
          });
          return;
        }

        document.querySelectorAll(selector).forEach((el) => {
          el.style.display = value;
        });

        if (value === "inline") {
          flashKeyForSelector(selector);
        }
      });
    });
  });

  window.__roleTimeline = tl;
}

function initKeyboardIntro() {
  if (!window.gsap || window.__keyboardIntroInitialized) return;

  const keys = Array.from(document.querySelectorAll(".azerty .key"));
  const contactDomain = document.querySelector(".contact-domain");
  const page = document.documentElement;
  if (keys.length < 2) return;

  window.__keyboardIntroInitialized = true;
  page.classList.remove("intro-complete");

  const sweepKeys = keys.slice(1);
  if (contactDomain) {
    contactDomain.textContent = "a";
  }
  gsap.set(sweepKeys, {
    autoAlpha: 0,
  });

  const tl = gsap.timeline({ delay: KEY_INTRO_DELAY });

  sweepKeys.forEach((key, index) => {
    tl.to(
      key,
      {
        autoAlpha: 1,
        duration: KEY_INTRO_DURATION,
        ease: "none",
        onStart: () => {
          const letter = key.querySelector(".key-letter")?.textContent?.trim()?.toLowerCase();
          if (letter && KEY_FLASHABLE.has(letter)) {
            flashKeyForSelector(`.key-${letter} .key-letter`);
          }
          if (contactDomain && EMAIL_SWEEP_SUFFIX[index]) {
            contactDomain.textContent = `a${EMAIL_SWEEP_SUFFIX.slice(0, index + 1).join("")}`;
          }
        },
      },
      index === 0 ? 0 : `+=${KEY_INTRO_STAGGER}`
    );
  });

  tl.to({}, { duration: 1 }).call(() => {
    page.classList.add("intro-complete");
  });

  window.__keyboardIntroTL = tl;
}

const initScribble = () => {
  if (window.__scribbleInitialized) return;

  const scribble = document.querySelector(".scribble");
  const scribbleLines = document.querySelectorAll(".scribble-line");

  if (!scribble || !scribbleLines.length || !window.gsap) return;

  window.__scribbleInitialized = true;

  const strokeDurations = [0.3, 0.25, 0.1, 0.1, 0.15, 0.3];
  const strokePauses = [1.5, 0.25, 0.2, 0.1, 0.15, 0.4];

  scribble.classList.add("is-ready");

  scribbleLines.forEach((line) => {
    const length = line.getTotalLength();
    gsap.set(line, {
      strokeDasharray: `${length} ${length}`,
      strokeDashoffset: length,
      strokeOpacity: 0,
    });
  });

  const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

  scribbleLines.forEach((line, index) => {
    tl.to(
      line,
      {
        strokeDashoffset: 0,
        duration: strokeDurations[index] ?? 0.2,
      },
      `+=${strokePauses[index] ?? 0}`
    ).set(
      line,
      {
        strokeOpacity: 1,
      },
      "<"
    );
  });

  window.__scribbleTL = tl;
};

async function copyEmailAddress() {
  const email = "koen@azertyuiop.be";

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(email);
    return true;
  }

  const input = document.createElement("textarea");
  input.value = email;
  input.setAttribute("readonly", "");
  input.style.position = "absolute";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(input);
  return copied;
}

function capturePosthogEvent(eventName, properties = {}) {
  if (!window.posthog || typeof window.posthog.capture !== "function") return;
  window.posthog.capture(eventName, properties);
}

function initCopyButton() {
  const button = document.querySelector(".copy-button");
  if (!button || button.dataset.bound === "true") return;

  button.dataset.bound = "true";
  let copiedTimer;

  button.addEventListener("click", async () => {
    const copied = await copyEmailAddress().catch(() => false);
    if (!copied) return;

    capturePosthogEvent(button.dataset.posthogEvent || "email_copy_clicked", {
      location: "contact",
      target: "copy_button",
    });

    button.classList.add("is-copied");
    button.setAttribute("aria-label", "Email address copied");
    button.setAttribute("title", "Email address copied");

    window.clearTimeout(copiedTimer);
    copiedTimer = window.setTimeout(() => {
      button.classList.remove("is-copied");
      button.setAttribute("aria-label", "Copy email address");
      button.setAttribute("title", "Copy email address");
    }, 1200);
  });
}

function initAnalyticsTracking() {
  const trackedLinks = document.querySelectorAll("[data-posthog-event]");

  trackedLinks.forEach((link) => {
    if (link.dataset.analyticsBound === "true") return;

    link.dataset.analyticsBound = "true";
    link.addEventListener("click", () => {
      capturePosthogEvent(link.dataset.posthogEvent, {
        href: link.getAttribute("href"),
        label: link.textContent?.trim(),
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initKeyboardIntro();
  buildRoleTimeline();
  initScribble();
  initCopyButton();
  initAnalyticsTracking();

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    initKeyboardIntro();
    buildRoleTimeline();
    initScribble();
    initCopyButton();
    initAnalyticsTracking();

    if ((window.__roleInitialized && window.__scribbleInitialized && window.__keyboardIntroInitialized) || attempts >= 20) {
      window.clearInterval(retry);
    }
  }, 150);
});
