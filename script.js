console.log("Website loaded!");

// Highlight active navigation link and fade-in animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav_link");
  const scrollBtn = document.getElementById("scrollToTopBtn");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };

  // Fade-in header on load
  window.addEventListener("load", () => {
    const header = document.querySelector(".main_header");
    if (header) {
      header.classList.add("visible");
    }
  });

  // Show/hide scroll-to-top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // Scroll to top behavior
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // IntersectionObserver to handle both active navigation links and fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav_link[href="#${id}"]`);
      const animatedElement = entry.target;

      // Highlight active navigation link
      if (link) {
        if (entry.isIntersecting) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }

      // Fade-in animation
      if (animatedElement.classList.contains("animate-on-scroll") && entry.isIntersecting) {
        animatedElement.classList.add("visible");
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      // Check if the browser supports Picture-in-Picture API
      videoElement.disablePictureInPicture = true;  // Disable PiP functionality
    }
  });
  


