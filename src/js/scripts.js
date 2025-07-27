document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // === Mobile Menu Toggle ======
  // =============================
  const menuBtn = document.getElementById("menu-btn");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  let menuOpen = false;

  menuBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle("open");

    // Ganti ikon hamburger
    menuIcon.innerHTML = menuOpen
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
  });

  const menuLinks = mobileMenu.querySelectorAll("a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuOpen = false;

      // Reset icon ke hamburger
      menuIcon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    });
  });

  // =============================
  // === Navbar Scroll Blur ======
  // =============================
  const navbar = document.getElementById("navbar");

  function updateNavbarStyle() {
    if (window.scrollY > 50) {
      navbar.classList.add("nav-blur");
      navbar.classList.remove("nav-transparent");
    } else {
      navbar.classList.add("nav-transparent");
      navbar.classList.remove("nav-blur");
    }
  }

  window.addEventListener("scroll", updateNavbarStyle);
  document.addEventListener("DOMContentLoaded", updateNavbarStyle);
  window.addEventListener("load", updateNavbarStyle);

  // =============================
  // === Back to Top Button ======
  // =============================
  const backToTopBtn = document.getElementById("backToTop");

  function updateBackToTopVisibility() {
    const shouldShow = window.scrollY > 300;
    backToTopBtn.classList.toggle("opacity-100", shouldShow);
    backToTopBtn.classList.toggle("visible", shouldShow);
    backToTopBtn.classList.toggle("opacity-0", !shouldShow);
    backToTopBtn.classList.toggle("invisible", !shouldShow);
  }

  window.addEventListener("scroll", updateBackToTopVisibility);
  document.addEventListener("DOMContentLoaded", updateBackToTopVisibility);
  window.addEventListener("load", updateBackToTopVisibility);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // =============================
  // === Smooth Scrolling ========
  // =============================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        if (menuOpen) {
          menuOpen = false;
          mobileMenu.classList.add("hidden");
          menuIcon.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }

        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // =============================
  // === Animate on Scroll =======
  // =============================
  const animateElements = document.querySelectorAll(
    ".animate-slide-up, .animate-fade-in"
  );
  const animateObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  animateElements.forEach((el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-10",
      "transition-all",
      "duration-700"
    );
    animateObserver.observe(el);
  });

  // =============================
  // === Animate Skill Bars ======
  // =============================
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = parseInt(bar.getAttribute("data-skill"));
          bar.style.width = percent + "%";

          const counter = bar.parentElement.querySelector(".skill-percent");
          if (counter) {
            let current = 0;
            const step = Math.floor(1000 / percent);
            const interval = setInterval(() => {
              current++;
              counter.textContent = `${current}%`;
              if (current >= percent) clearInterval(interval);
            }, step);
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  // =============================
  // === Zoom Fade In Elements ===
  // =============================
  const zoomFadeElements = document.querySelectorAll(".animate-zoom-fade");
  const zoomFadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "opacity-100",
            "scale-100",
            "transition-all",
            "duration-1000"
          );
          entry.target.classList.remove("opacity-0", "scale-90");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  zoomFadeElements.forEach((el) => {
    el.classList.add("opacity-0", "scale-90");
    zoomFadeObserver.observe(el);
  });
});

// =============================
// Navbar Active
// =============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar a");

window.addEventListener("scroll", function () {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset untuk penyesuaian
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("navbar-active");
    link.style.color = "";

    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("navbar-active");
      link.style.color = "#000000";
    }
  });
});

// =============================
// Typing Animation
// =============================
const part1 = "Hi, I'm ";
const name = "Himawan Kurnia Eli Santo";
const typingText = document.getElementById("typing-text");
const typingName = document.getElementById("typing-name");

let index1 = 0;
let index2 = 0;

function typePart1() {
  if (index1 < part1.length) {
    typingText.textContent += part1.charAt(index1);
    index1++;
    setTimeout(typePart1, 100);
  } else {
    setTimeout(typeName, 200);
  }
}

function typeName() {
  if (index2 < name.length) {
    typingName.textContent += name.charAt(index2);
    index2++;
    setTimeout(typeName, 100);
  } else {
    // Tunggu 3 detik sebelum mulai menghapus
    setTimeout(deleteName, 3000);
  }
}

function deleteName() {
  if (index2 > 0) {
    typingName.textContent = name.substring(0, index2 - 1);
    index2--;
    setTimeout(deleteName, 50);
  } else {
    deletePart1();
  }
}

function deletePart1() {
  if (index1 > 0) {
    typingText.textContent = part1.substring(0, index1 - 1);
    index1--;
    setTimeout(deletePart1, 50);
  } else {
    // Ulangi siklus
    setTimeout(typePart1, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typePart1();
});

// =============================
// Send Email with EmailJS
// =============================
(function () {
  emailjs.init("0Pb2JwK7AOhEjvMwV");
})();

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields!");
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  emailjs
    .sendForm("service_zq2z5rz", "template_tfrcpkx", this)
    .then(
      function () {
        alert("Message sent successfully!");
        form.reset();
      },
      function (error) {
        alert("Failed to send message: " + error.text);
      }
    )
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    });
});
