/* ---------- Theme toggle ---------- */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const meta = document.querySelector('meta[name="theme-color"]');

  function apply(theme) {
    root.dataset.theme = theme;
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0E1020" : "#EDF0F7");
  }

  apply(root.dataset.theme || "light");

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

/* ---------- Mobile navigation ---------- */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
})();

/* ---------- Hero name: letters get bolder near the cursor ---------- */
(function () {
  const title = document.getElementById("hero-name");
  if (!title) return;

  // Split the text into words and letters
  const text = title.textContent.trim();
  title.textContent = "";
  let index = 0;
  text.split(" ").forEach((word) => {
    const w = document.createElement("span");
    w.className = "word";
    w.setAttribute("aria-hidden", "true");
    [...word].forEach((ch) => {
      const c = document.createElement("span");
      c.className = "char";
      c.style.setProperty("--i", index++);
      c.textContent = ch;
      w.appendChild(c);
    });
    title.appendChild(w);
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce || !finePointer) return;

  const chars = [...title.querySelectorAll(".char")];
  const RADIUS = 260;
  let mouse = null;
  let ticking = false;

  // Wait for the entrance animation, then let the cursor take over
  const startAfter = 900 + chars.length * 45;
  setTimeout(() => {
    chars.forEach((c) => (c.style.animation = "none"));
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset);
  }, startAfter);

  function onMove(e) {
    mouse = { x: e.clientX, y: e.clientY };
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function update() {
    ticking = false;
    if (!mouse) return;
    chars.forEach((c) => {
      const r = c.getBoundingClientRect();
      const dx = mouse.x - (r.left + r.width / 2);
      const dy = mouse.y - (r.top + r.height / 2);
      const t = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
      const eased = t * t * (3 - 2 * t);
      const wght = Math.round(400 + eased * 400); // 400 → 800
      const wdth = Math.round(100 - eased * 18);  // 100 → 82
      c.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`;
    });
  }

  function reset() {
    mouse = null;
    chars.forEach((c) => (c.style.fontVariationSettings = '"wght" 400, "wdth" 100'));
  }
})();

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
