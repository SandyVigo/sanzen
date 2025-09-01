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
    
  // Offerings

  const offeringsBtn = document.getElementById("offeringsBtn");
  const offeringsOptions = document.getElementById("offeringsOptions");
  
  offeringsBtn.addEventListener("click", () => {
    offeringsOptions.style.display =
      offeringsOptions.style.display === "none" ? "block" : "none";
  });


  function openModal(id) {
    document.getElementById(id).style.display = "block";
  }
  
  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }
  
  // Button click handlers
  document.getElementById("bookOneOnOneBtn").addEventListener("click", () => openModal("modalOneOnOne"));
  document.getElementById("bookCircleEventBtn").addEventListener("click", () => openModal("modalCircle"));
  document.getElementById("bookCorporateGroupBtn").addEventListener("click", () => openModal("modalCorporate"));
  
  // Close modal when clicking on the "×"
  document.querySelectorAll(".close").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });
  
  // Optional: Close modal on outside click
  window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // Form booking submission and confirmation
  document.addEventListener("DOMContentLoaded", () => {
    // Enable only specific days: 2 = Tue, 3 = Wed, 4 = Thu, 6 = Sat
    const allowedWeekdays = [2, 3, 4, 6];
  
    // Apply flatpickr to date and time separately (if you split them)
    flatpickr("#date", {
      dateFormat: "Y-m-d",
      disableMobile: true,
      enable: [
        function (date) {
          return allowedWeekdays.includes(date.getDay());
        }
      ],
      onChange: updateAvailableTimeSlots
    });
  
    function updateAvailableTimeSlots(selectedDates, dateStr, instance) {
      // Clear the time slots container
      const timeSlotsContainer = document.getElementById('timeSlots');
      timeSlotsContainer.innerHTML = '';
  
      // Get the selected date
      const selectedDate = new Date(dateStr);
  
      // Set the available times based on selected day
      const allowedTimes = {
        2: ["07:00", "07:15", "07:30", "07:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45"], // Tue
        3: ["07:00", "07:15", "07:30", "07:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45"], // Wed
        4: ["07:00", "07:15", "07:30", "07:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45"], // Thu
        6: ["07:00", "07:15", "07:30", "07:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45"], // Sat
      };
  
      const dayOfWeek = selectedDate.getDay();
      const availableTimes = allowedTimes[dayOfWeek] || [];
  
      // Create buttons for available time slots
      availableTimes.forEach(time => {
        const timeButton = document.createElement('button');
        timeButton.textContent = time;
        timeButton.type = 'button';
        timeButton.classList.add('time-slot-button');
        timeButton.addEventListener('click', () => selectTimeSlot(time));
        timeSlotsContainer.appendChild(timeButton);
      });
    }
  
    // Handle time slot selection
    function selectTimeSlot(time) {
      const selectedTimeInput = document.getElementById('selectedTime');
      selectedTimeInput.value = time;
  
      // Update UI to show selected time
      const timeButtons = document.querySelectorAll('.time-slot-button');
      timeButtons.forEach(button => {
        button.classList.remove('selected');
      });
      const selectedButton = Array.from(timeButtons).find(button => button.textContent === time);
      if (selectedButton) {
        selectedButton.classList.add('selected');
      }
    }
  
    // --- Form submission handler ---
    const form = document.getElementById('oneOnOneForm');
    const confirmation = document.getElementById('oneOnOneSuccess');
  
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          form.reset();
          confirmation.style.display = 'block';
          setTimeout(() => {
            confirmation.style.display = 'none';
            const modal = document.getElementById('oneToOneModal');
            if (modal) modal.style.display = 'none';
          }, 3000);
        } else {
          alert('Oops! There was a problem submitting your form');
        }
      });
    }
  });

  // Fade-in on Scroll Triggering
  document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll('.fade-in'); // Select all fade-in elements
  
    // Check if an element is in the viewport
    const isElementInView = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    };
  
    // Check if any fade-in elements are in view and apply the class
    const checkFadeInElements = () => {
      fadeInElements.forEach((element) => {
        if (isElementInView(element)) {
          element.classList.add('fade-in');
        }
      });
    };
  
    window.addEventListener('scroll', checkFadeInElements); // Add scroll event listener
    checkFadeInElements(); // Initial check in case elements are already in view
  });
  

  