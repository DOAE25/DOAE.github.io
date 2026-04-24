(function themeController() {
  const root = document.documentElement;
  const button = document.getElementById("themeBtn");
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    root.classList.add("dark");
  }

  if (!button) return;

  button.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  });
})();

(function mobileMenu() {
  const nav = document.getElementById("nav");
  const button = document.getElementById("menuBtn");
  const links = document.querySelectorAll(".links a");

  if (!nav || !button) return;

  button.addEventListener("click", () => {
    nav.classList.toggle("open");
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
  const links = Array.from(document.querySelectorAll(".links a"));
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
