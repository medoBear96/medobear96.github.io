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
