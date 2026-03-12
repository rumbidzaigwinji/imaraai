const typedServiceEl = document.getElementById("typed-service");
const services = [
  "AI Solutions",
  "Data Analytics",
  "Web and App Development",
  "Consultancy",
  "Training"
];

let serviceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTypingEffect() {
  if (!typedServiceEl) {
    return;
  }

  const current = services[serviceIndex];
  const visibleText = current.slice(0, charIndex);
  typedServiceEl.textContent = visibleText;

  let delay = 85;

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    delay = 45;
  } else {
    isDeleting = !isDeleting;
    delay = isDeleting ? 1100 : 250;

    if (!isDeleting) {
      serviceIndex = (serviceIndex + 1) % services.length;
    }
  }

  setTimeout(runTypingEffect, delay);
}

runTypingEffect();

const menuBtn = document.getElementById("menu-btn");
const mainNav = document.getElementById("main-nav");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    counter.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll(".counter");
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

const testimonials = [
  {
    title: "Boarding House Management Platform",
    status: "Status: Live in Market",
    quote: "A live digital platform that streamlines hostel and boarding-house administration, student allocation, occupancy tracking, and operational monitoring.",
    author: "Use case: student housing management for schools, hostels, and residential operators.",
    link: "https://boarding-house-management.streamlit.app/",
    linkLabel: "Open Live App"
  },
  {
    title: "Facial Recognition for Attendance",
    status: "Status: In Production",
    quote: "A computer vision attendance solution built to reduce manual registers, improve accuracy, and give institutions faster reporting on presence and timekeeping.",
    author: "Use case: schools, training centres, workplaces, and any organization that needs reliable attendance tracking.",
    link: "",
    linkLabel: ""
  },
  {
    title: "E-Commerce Website for Tastic Products, Peanut Butter and More",
    status: "Status: Still In Production",
    quote: "A retail e-commerce platform for packaged consumer products, built to strengthen online visibility, simplify product discovery, and support digital sales growth.",
    author: "Use case: online sales and digital catalog management for food and fast-moving consumer brands.",
    link: "",
    linkLabel: ""
  },
  {
    title: "Mushavi Courier Services",
    status: "Status: In Production, Not Yet Live",
    quote: "A courier operations platform designed to improve delivery coordination, service tracking, dispatch visibility, and customer communication as the business prepares for launch.",
    author: "Use case: logistics teams that need better dispatch management, tracking, and service operations.",
    link: "",
    linkLabel: ""
  }
];

const titleEl = document.getElementById("project-title");
const statusEl = document.getElementById("project-status");
const quoteEl = document.getElementById("project-quote");
const authorEl = document.getElementById("project-author");
const projectLinkEl = document.getElementById("project-link");
const dotsEl = document.getElementById("slider-dots");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");

let currentTestimonial = 0;
let sliderTimer;

function renderDots() {
  if (!dotsEl) {
    return;
  }

  dotsEl.innerHTML = "";

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    if (index === currentTestimonial) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentTestimonial = index;
      renderTestimonial();
      resetSliderAutoPlay();
    });

    dotsEl.appendChild(dot);
  });
}

function renderTestimonial() {
  if (!titleEl || !statusEl || !quoteEl || !authorEl) {
    return;
  }

  const item = testimonials[currentTestimonial];
  titleEl.textContent = item.title;
  statusEl.textContent = item.status;
  quoteEl.textContent = `"${item.quote}"`;
  authorEl.textContent = item.author;

  if (projectLinkEl) {
    if (item.link) {
      projectLinkEl.href = item.link;
      projectLinkEl.textContent = item.linkLabel || "View Project";
      projectLinkEl.style.display = "inline-flex";
    } else {
      projectLinkEl.style.display = "none";
    }
  }

  renderDots();
}

function showNextTestimonial(step = 1) {
  currentTestimonial = (currentTestimonial + step + testimonials.length) % testimonials.length;
  renderTestimonial();
}

function resetSliderAutoPlay() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => showNextTestimonial(1), 5500);
}

if (titleEl && prevBtn && nextBtn) {
  renderTestimonial();

  prevBtn.addEventListener("click", () => {
    showNextTestimonial(-1);
    resetSliderAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    showNextTestimonial(1);
    resetSliderAutoPlay();
  });

  resetSliderAutoPlay();
}

const teamGrid = document.getElementById("team-grid");

const teamMembers = [
  {
    name: "Rumbidzai Gwinji",
    role: "Chief Executive Officer (CEO)",
    bio: "Rumbidzai leads strategy, partnerships, and product direction across Imara Inc. She shapes the vision of Imara AI while guiding practical market-facing delivery through Imara Tech.",
    linkedin: "https://www.linkedin.com/in/rumbidzai-gwinji-b31480239/",
    image: "assets/team/ceo-rumbidzai.jpg",
    imageAlt: "Rumbidzai Gwinji portrait"
  },
  {
    name: "Benedict Ejelonu",
    role: "Chief Technology Officer (CTO)",
    bio: "Benedict leads engineering and technical architecture across Imara Inc. He strengthens the technical direction of Imara AI and drives reliable delivery across the consultancy work of Imara Tech.",
    linkedin: "https://www.linkedin.com/in/benedict-ejelonu/",
    image: "assets/team/cto-benedict.jpg",
    imageAlt: "Benedict Ejelonu portrait"
  }
];

function getInitials(fullName) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

if (teamGrid) {
  teamGrid.innerHTML = teamMembers
    .map(
      (member) => `
      <article class="card team-card reveal visible">
        <div class="avatar-wrap">
          ${
            member.image
              ? `<img class="avatar-photo" src="${member.image}" alt="${member.imageAlt || member.name}" loading="lazy" decoding="async" />`
              : `<div class="avatar">${getInitials(member.name)}</div>`
          }
        </div>
        <h3>${member.name}</h3>
        <p class="team-role">${member.role}</p>
        <p class="team-bio">${member.bio}</p>
        ${
          member.linkedin
            ? `<p class="team-link-wrap"><a class="team-link" href="${member.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>`
            : ""
        }
      </article>
    `
    )
    .join("");
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

