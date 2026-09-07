const actions = ["I build", "I make", "I design", "I develop", "I improve"];
const subjects = [
  "embedded systems.",
  "automation tools.",
  "sailing technology.",
  "reliable software.",
  "real-world solutions."
];

const verb = document.querySelector("#verb");
const role = document.querySelector("#role");
let actionIndex = 0;
let subjectIndex = 0;
let nextIsAction = true;

function animateText(element) {
  element.animate(
    [
      { opacity: 0, transform: "translateY(28px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 550, easing: "ease", fill: "both" }
  );
}

function changeOneLine() {
  if (nextIsAction) {
    actionIndex = (actionIndex + 1) % actions.length;
    verb.textContent = actions[actionIndex];
    animateText(verb);
  } else {
    subjectIndex = (subjectIndex + 1) % subjects.length;
    role.textContent = subjects[subjectIndex];
    animateText(role);
  }
  nextIsAction = !nextIsAction;
  window.setTimeout(changeOneLine, 3600);
}

window.setTimeout(changeOneLine, 3600);

const grid = document.querySelector("#signal-grid");
for (let i = 0; i < 32; i += 1) {
  const bar = document.createElement("i");
  bar.style.height = `${14 + ((i * 23) % 68)}%`;
  grid.appendChild(bar);
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const monogram = document.querySelector(".monogram");
const initialNameHoldUntil = Date.now() + 5000;
let monogramTimer;

function expandMonogram() {
  window.clearTimeout(monogramTimer);
  monogram.classList.add("is-expanded");
}

function scheduleMonogramCollapse(delay = 3000) {
  window.clearTimeout(monogramTimer);
  const remainingInitialHold = Math.max(0, initialNameHoldUntil - Date.now());
  monogramTimer = window.setTimeout(
    () => monogram.classList.remove("is-expanded"),
    Math.max(delay, remainingInitialHold)
  );
}

expandMonogram();
scheduleMonogramCollapse(5000);
monogram.addEventListener("pointerenter", expandMonogram);
monogram.addEventListener("pointerleave", () => scheduleMonogramCollapse(3000));
monogram.addEventListener("focus", expandMonogram);
monogram.addEventListener("blur", () => scheduleMonogramCollapse(3000));

function closeMenu() {
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.textContent = "Menu";
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.textContent = isOpen ? "Close" : "Menu";
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const main = document.querySelector("main");
const aboutSection = document.querySelector("#about");
["experience", "work", "maker", "education", "sailing"].forEach((id) => {
  main.insertBefore(document.querySelector(`#${id}`), aboutSection);
});

const pageJump = document.querySelector(".round-link");

function updatePageJump() {
  const isReturning = window.scrollY > 80;
  pageJump.href = isReturning ? "#top" : "#experience";
  pageJump.textContent = isReturning ? "↑" : "↓";
  pageJump.setAttribute("aria-label", isReturning ? "Return to the top" : "Go to Experience");
  pageJump.classList.toggle("is-returning", isReturning);
}

window.addEventListener("scroll", updatePageJump, { passive: true });
updatePageJump();

document.querySelectorAll("[data-carousel-card]").forEach((card) => {
  const visual = card.querySelector("[data-carousel-visual]");
  const carousel = card.querySelector("[data-carousel]");
  const slides = [...card.querySelectorAll("[data-carousel-slide]")];
  let slideIndex = 0;
  let timer;

  function showSlide(index) {
    slides[slideIndex].classList.remove("is-active");
    slideIndex = index % slides.length;
    slides[slideIndex].classList.add("is-active");
  }

  function openGallery() {
    if (card.classList.contains("is-gallery-open")) return;
    card.classList.add("is-gallery-open");
    visual.setAttribute("aria-pressed", "true");
    carousel.setAttribute("aria-hidden", "false");
    timer = window.setInterval(() => showSlide(slideIndex + 1), 3600);
  }

  function closeGallery() {
    card.classList.remove("is-gallery-open");
    visual.setAttribute("aria-pressed", "false");
    carousel.setAttribute("aria-hidden", "true");
    window.clearInterval(timer);
    showSlide(0);
  }

  card.addEventListener("pointerenter", () => {
    if (window.matchMedia("(hover: hover)").matches) openGallery();
  });
  card.addEventListener("pointerleave", () => {
    if (window.matchMedia("(hover: hover)").matches) closeGallery();
  });
  visual.addEventListener("click", (event) => {
    if (!window.matchMedia("(hover: none)").matches && event.detail !== 0) return;
    if (card.classList.contains("is-gallery-open")) closeGallery();
    else openGallery();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && card.classList.contains("is-gallery-open")) {
      closeGallery();
      visual.focus();
    }
  });
});

document.querySelectorAll("[data-project-card]").forEach((card) => {
  const toggle = card.querySelector(".project-detail-toggle");
  const detail = card.querySelector(".project-detail");
  const carousel = card.querySelector("[data-project-carousel]");
  const slides = [...carousel.querySelectorAll(".project-slide")];
  const previous = carousel.querySelector("[data-project-prev]");
  const next = carousel.querySelector("[data-project-next]");
  const counter = carousel.querySelector("[data-project-counter]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let slideIndex = 0;
  let carouselTimer;

  function stopCarousel() {
    window.clearInterval(carouselTimer);
    carouselTimer = undefined;
  }

  function startCarousel() {
    stopCarousel();
    if (reduceMotion.matches || slides.length < 2 || slides[slideIndex].querySelector("video")) return;
    carouselTimer = window.setInterval(() => showProjectSlide(slideIndex + 1), 3600);
  }

  function showProjectSlide(index) {
    slides[slideIndex].classList.remove("is-active");
    slides[slideIndex].querySelectorAll("video").forEach((video) => video.pause());
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].classList.add("is-active");
    counter.textContent = `${String(slideIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    startCarousel();
  }

  function setProjectOpen(isOpen) {
    card.classList.toggle("is-detail-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Details ↑" : "Details ↓";
    detail.setAttribute("aria-hidden", String(!isOpen));
    detail.inert = !isOpen;
    if (isOpen) startCarousel();
    else {
      stopCarousel();
      slides.forEach((slide) => slide.querySelectorAll("video").forEach((video) => video.pause()));
      showProjectSlide(0);
      stopCarousel();
    }
  }

  card.addEventListener("pointerenter", () => {
    if (window.matchMedia("(hover: hover)").matches) setProjectOpen(true);
  });
  card.addEventListener("pointerleave", () => {
    if (window.matchMedia("(hover: hover)").matches) setProjectOpen(false);
  });
  toggle.addEventListener("click", () => setProjectOpen(!card.classList.contains("is-detail-open")));
  previous.addEventListener("click", () => showProjectSlide(slideIndex - 1));
  next.addEventListener("click", () => showProjectSlide(slideIndex + 1));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && card.classList.contains("is-detail-open")) {
      setProjectOpen(false);
      toggle.focus();
    }
  });
});
