document.addEventListener("DOMContentLoaded", () => {
  // === Smooth scrolling for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // === Highlight active section in nav ===
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav_link[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }

      // Fade-in animation
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));

  // ======================
  // Back-to-top button
  // ======================
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.scrollY > 300);
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });    
  }
  

  // ======================
  // Hamburger menu with overlay
  // ======================
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.getElementById("overlay");

  if (hamburger && mobileMenu && closeBtn && overlay) {
    const toggleMenu = (open) => {
      mobileMenu.classList.toggle("active", open);
      overlay.classList.toggle("active", open);
      document.body.classList.toggle("no-scroll", open);
    };

    hamburger.addEventListener("click", () => toggleMenu(true));
    closeBtn.addEventListener("click", () => toggleMenu(false));
    overlay.addEventListener("click", () => toggleMenu(false));
    document.querySelectorAll("#mobileMenu a").forEach(link => {
      link.addEventListener("click", () => toggleMenu(false));
    });
  }


  // === Fade-in on scroll (sections + value boxes) ===
  const faders = document.querySelectorAll(".fade-in, .values-grid .value-card");

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("value-card")) {
          // Staggered delay for value boxes
          const boxes = Array.from(entry.target.parentNode.querySelectorAll(".value-card"));
          boxes.forEach((box, index) => {
            setTimeout(() => box.classList.add("visible"), index * 200);
          });
          observer.unobserve(entry.target.parentNode);
        } else {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  


});

  