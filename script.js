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

const boomerangFeature = document.querySelector(".boomerang-feature");
const boomerangVisual = document.querySelector(".boomerang-visual");
const boomerangCarousel = document.querySelector(".boomerang-carousel");
const boomerangSlides = [...document.querySelectorAll(".boomerang-slide")];
let boomerangSlideIndex = 0;
let boomerangTimer;

function showBoomerangSlide(index) {
  boomerangSlides[boomerangSlideIndex].classList.remove("is-active");
  boomerangSlideIndex = index % boomerangSlides.length;
  boomerangSlides[boomerangSlideIndex].classList.add("is-active");
}

function openBoomerangGallery() {
  if (boomerangFeature.classList.contains("is-gallery-open")) return;
  boomerangFeature.classList.add("is-gallery-open");
  boomerangVisual.setAttribute("aria-pressed", "true");
  boomerangCarousel.setAttribute("aria-hidden", "false");
  boomerangTimer = window.setInterval(() => showBoomerangSlide(boomerangSlideIndex + 1), 3600);
}

function closeBoomerangGallery() {
  boomerangFeature.classList.remove("is-gallery-open");
  boomerangVisual.setAttribute("aria-pressed", "false");
  boomerangCarousel.setAttribute("aria-hidden", "true");
  window.clearInterval(boomerangTimer);
  showBoomerangSlide(0);
}

boomerangFeature.addEventListener("pointerenter", () => {
  if (window.matchMedia("(hover: hover)").matches) openBoomerangGallery();
});
boomerangFeature.addEventListener("pointerleave", () => {
  if (window.matchMedia("(hover: hover)").matches) closeBoomerangGallery();
});
boomerangVisual.addEventListener("click", (event) => {
  if (!window.matchMedia("(hover: none)").matches && event.detail !== 0) return;
  if (boomerangFeature.classList.contains("is-gallery-open")) closeBoomerangGallery();
  else openBoomerangGallery();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && boomerangFeature.classList.contains("is-gallery-open")) {
    closeBoomerangGallery();
    boomerangVisual.focus();
  }
});
