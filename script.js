// PropChain Website JavaScript

document.addEventListener("DOMContentLoaded", function () {
  console.log("PropChain Website Loaded");

  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initObjectFitPolyfill();
  initVideoControls();
  initGifControls();
  initSmoothScrolling();
  initResponsiveFeatures();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    // Add background when scrolling
    if (scrollTop > 50) {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
      navbar.style.backdropFilter = "blur(15px)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.8)";
      navbar.style.backdropFilter = "blur(10px)";
    }

    lastScrollTop = scrollTop;
  });

  // Mobile menu toggle (if needed)
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      mobileMenuButton.classList.toggle("active");
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-item, .stakeholder-item, .section-header"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Object Fit Polyfill for older browsers
function initObjectFitPolyfill() {
  if ("objectFit" in document.documentElement.style === false) {
    // Polyfill for browsers that don't support object-fit
    const images = document.querySelectorAll("[data-object-fit]");

    images.forEach(function (image) {
      const objectFit = image.getAttribute("data-object-fit");
      if (objectFit) {
        const parent = image.parentNode;
        parent.style.position = "relative";
        parent.style.overflow = "hidden";

        image.style.position = "absolute";
        image.style.width = "100%";
        image.style.height = "100%";

        if (objectFit === "cover") {
          image.style.objectFit = "cover";
        }
      }
    });
  }
}

// GIF controls functionality
function initGifControls() {
  const playButton = document.getElementById('playButton');
  const heroGif = document.querySelector('.hero-gif');
  const heroOverlay = document.querySelector('.hero-overlay');
  
  if (playButton && heroGif) {
    let isPlaying = true; // GIF starts playing by default
    let gifSrc = heroGif.src;
    let staticSrc = '';
    
    // Create a canvas to extract the first frame as static image
    function createStaticFrame() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        staticSrc = canvas.toDataURL('image/png');
      };
      
      img.src = gifSrc;
    }
    
    // Initialize static frame
    createStaticFrame();
    
    // Play/Pause functionality
    playButton.addEventListener('click', function() {
      if (isPlaying) {
        // Pause the GIF by showing static frame
        if (staticSrc) {
          heroGif.src = staticSrc;
        }
        playButton.classList.add('paused');
        playButton.querySelector('.play-icon').textContent = '▶';
        heroOverlay.style.background = 'linear-gradient(45deg, rgba(37, 99, 235, 0.5), rgba(59, 130, 246, 0.4))';
        isPlaying = false;
      } else {
        // Resume the GIF
        heroGif.src = gifSrc;
        playButton.classList.remove('paused');
        playButton.querySelector('.play-icon').textContent = '⏸';
        heroOverlay.style.background = 'linear-gradient(45deg, rgba(37, 99, 235, 0.3), rgba(59, 130, 246, 0.2))';
        isPlaying = true;
      }
    });
    
    // Auto-pause when not in viewport
    const gifObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting && isPlaying) {
          // Temporarily pause when out of view to save resources
          heroGif.style.animationPlayState = 'paused';
        } else if (entry.isIntersecting && isPlaying) {
          heroGif.style.animationPlayState = 'running';
        }
      });
    }, {
      threshold: 0.1
    });
    
    gifObserver.observe(heroGif);
    
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleMotionPreference(mediaQuery) {
      if (mediaQuery.matches && isPlaying) {
        // Auto-pause for users who prefer reduced motion
        playButton.click();
      }
    }
    
    prefersReducedMotion.addEventListener('change', handleMotionPreference);
    handleMotionPreference(prefersReducedMotion);
    
    // Initially set play button to pause icon since GIF is playing
    playButton.querySelector('.play-icon').textContent = '⏸';
  }
}

// Video controls functionality
function initVideoControls() {
  // Background video controls
  const videoControls = document.querySelectorAll(
    ".w-background-video--control"
  );

  videoControls.forEach(function (control) {
    control.addEventListener("click", function (e) {
      e.preventDefault();

      const videoId = control.getAttribute("aria-controls");
      const video = document.getElementById(videoId);

      if (video) {
        if (video.paused) {
          video.play();
          control.classList.add("playing");
        } else {
          video.pause();
          control.classList.remove("playing");
        }
      }
    });
  });

  // Auto-pause videos when not in viewport
  const videos = document.querySelectorAll("video");
  const videoObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.hasAttribute("autoplay")) {
          video.play();
        }
      } else {
        video.pause();
      }
    });
  });

  videos.forEach((video) => {
    videoObserver.observe(video);
  });

  // Respect reduced motion preferences
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function handleMotionPreference(mediaQuery) {
    videos.forEach((video) => {
      if (mediaQuery.matches) {
        video.pause();
      }
    });
  }

  prefersReducedMotion.addEventListener("change", handleMotionPreference);
  handleMotionPreference(prefersReducedMotion);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Responsive features
function initResponsiveFeatures() {
  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      handleResize();
    }, 250);
  });

  function handleResize() {
    // Update container heights if needed
    const heroContainer = document.querySelector(".container.hero-home");
    if (heroContainer && window.innerWidth <= 768) {
      heroContainer.style.height = "auto";
      heroContainer.style.minHeight = "70vh";
    }
  }

  // Initial resize handling
  handleResize();
}

// Button interactions and effects
document.addEventListener("click", function (e) {
  // Enhanced button click effect
  if (e.target.classList.contains("btn")) {
    const button = e.target;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    // Add ripple styles
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.pointerEvents = "none";

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add ripple animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Form handling (if forms are added later)
function initFormHandling() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add form validation and submission logic here
      const formData = new FormData(form);
      console.log("Form submitted:", Object.fromEntries(formData));

      // Show success message
      showNotification(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.",
        "success"
      );
    });
  });
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    zIndex: "10000",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  });

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };
  notification.style.background = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Lazy loading for images (performance optimization)
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    images.forEach((image) => {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for older browsers
    images.forEach((image) => {
      image.src = image.dataset.src;
    });
  }
}

// Performance monitoring
function initPerformanceMonitoring() {
  // Monitor page load performance
  window.addEventListener("load", function () {
    setTimeout(function () {
      const perfData = performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log("Page load time:", loadTime, "ms");

      // Optional: Send performance data to analytics
      if (loadTime > 3000) {
        console.warn("Page load time is slower than expected");
      }
    }, 0);
  });
}

// Dark/Light mode toggle (if needed)
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("light-theme");

      // Save preference
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light-theme") ? "light" : "dark"
      );
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }
  }
}

// Export functions for external use
window.PropChain = {
  showNotification,
  initFormHandling,
  initLazyLoading,
  initPerformanceMonitoring,
  initThemeToggle,
};

// Initialize additional features when needed
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoading();
  initPerformanceMonitoring();
});

// Service Worker registration (for PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function (registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

console.log("PropChain Website JavaScript Initialized");
