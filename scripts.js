(function themeController() {
  const root = document.documentElement;
  const button = document.getElementById("themeBtn");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light") root.classList.add("light");
  if (!button) return;
  const icon = button.querySelector("i");
  const sync = () => { if (icon) icon.className = root.classList.contains("light") ? "fa-regular fa-sun" : "fa-regular fa-moon"; };
  sync();
  button.addEventListener("click", () => {
    root.classList.toggle("light");
    try { localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark"); } catch (e) {}
    sync();
  });
})();

(function mobileMenu() {
  const nav = document.getElementById("nav");
  const button = document.getElementById("menuBtn");
  const links = document.querySelectorAll(".links a");

  if (!nav || !button) return;

  button.addEventListener("click", () => {
    nav.classList.toggle("open");
    button.setAttribute("aria-expanded", nav.classList.contains("open"));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  window.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && event.target !== button) {
      nav.classList.remove("open");
    }
  });
})();

(function scrollReveal() {
  const elements = document.querySelectorAll(".sr");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
})();

(function activeNavLink() {
  const links = Array.from(document.querySelectorAll(".links a")).filter((link) => (link.getAttribute("href") || "").startsWith("#"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach((link) => link.classList.remove("active"));
      const current = links.find((link) => link.getAttribute("href") === `#${visible.target.id}`);
      if (current) current.classList.add("active");
    },
    { threshold: [0.25, 0.55], rootMargin: "-10% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
})();
