// PropChain Coming Soon Website JavaScript

document.addEventListener("DOMContentLoaded", function () {
  console.log("PropChain Coming Soon Page Loaded");

  // Initialize coming soon components
  initPasswordForm();
  initBackgroundGifControls();
  initResponsiveFeatures();
  initPerformanceMonitoring();
});

// Password form functionality
function initPasswordForm() {
  const passwordForm = document.getElementById("passwordForm");
  const passwordInput = document.getElementById("passwordInput");

  if (passwordForm && passwordInput) {
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const password = passwordInput.value.trim();

      if (password === "") {
        showNotification("Please enter a password", "warning");
        return;
      }

      // Password check with redirect functionality
      if (password === "viepropchain") {
        showNotification("Access granted! Welcome to ViePropChain.", "success");

        // Show loading transition and redirect to Home page
        setTimeout(() => {
          const transition = createPageTransition();
          setTimeout(() => {
            window.location.href = "Home/index.html";
          }, 1000);
        }, 1000);
      } else if (password === "propchain2025" || password === "demo") {
        showNotification("Access granted! Welcome to PropChain.", "success");

        // Show loading transition for demo passwords
        setTimeout(() => {
          const transition = createPageTransition();
          setTimeout(() => {
            window.location.href = "Home/index.html";
          }, 1000);
        }, 1000);
      } else {
        showNotification(
          'Invalid password. Try "viepropchain" for access.',
          "error"
        );
        passwordInput.value = "";
        passwordInput.focus();
      }
    });

    // Add enter key handling
    passwordInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        passwordForm.dispatchEvent(new Event("submit"));
      }
    });

    // Focus on password input when page loads
    setTimeout(() => {
      passwordInput.focus();
    }, 1000);
  }
}

// Background GIF controls
function initBackgroundGifControls() {
  const backgroundGif = document.querySelector(".background-gif");

  if (backgroundGif) {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function handleMotionPreference(mediaQuery) {
      if (mediaQuery.matches) {
        // Replace GIF with static image for users who prefer reduced motion
        backgroundGif.style.filter = "grayscale(20%)";
        backgroundGif.style.opacity = "0.8";
      } else {
        backgroundGif.style.filter = "none";
        backgroundGif.style.opacity = "1";
      }
    }

    prefersReducedMotion.addEventListener("change", handleMotionPreference);
    handleMotionPreference(prefersReducedMotion);

    // Pause GIF when tab is not visible to save resources
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        backgroundGif.style.animationPlayState = "paused";
      } else {
        backgroundGif.style.animationPlayState = "running";
      }
    });
  }
}

// Responsive features for coming soon page
function initResponsiveFeatures() {
  // Handle window resize for coming soon layout
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      handleComingSoonResize();
    }, 250);
  });

  function handleComingSoonResize() {
    const comingSoonContainer = document.querySelector(
      ".coming-soon-container"
    );
    if (comingSoonContainer) {
      // Ensure full height on mobile devices
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }

  // Initial resize handling
  handleComingSoonResize();
}

// Enhanced notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "30px",
    right: "30px",
    padding: "16px 24px",
    borderRadius: "12px",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(400px)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    maxWidth: "350px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  });

  // Set background color based on type
  const colors = {
    success: "linear-gradient(135deg, #10b981, #059669)",
    error: "linear-gradient(135deg, #ef4444, #dc2626)",
    warning: "linear-gradient(135deg, #f59e0b, #d97706)",
    info: "linear-gradient(135deg, #3b82f6, #2563eb)",
  };
  notification.style.background = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove with fade out
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    notification.style.opacity = "0";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 400);
  }, 4000);
}

// Add page transition effect
function createPageTransition() {
  const transition = document.createElement("div");
  transition.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
  `;
  transition.innerHTML =
    '<div style="text-align: center;"><div style="margin-bottom: 20px;">Loading ViePropChain...</div><div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div></div>';

  // Add spinner animation
  const style = document.createElement("style");
  style.textContent =
    "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
  document.head.appendChild(style);

  document.body.appendChild(transition);

  setTimeout(() => {
    transition.style.opacity = "1";
  }, 100);

  return transition;
}

// Performance monitoring
function initPerformanceMonitoring() {
  window.addEventListener("load", function () {
    setTimeout(function () {
      const perfData = performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log("Page load time:", loadTime, "ms");

      if (loadTime > 2000) {
        console.warn("Page load time is slower than expected");
      }
    }, 0);
  });
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // ESC to clear password field
  if (e.key === "Escape") {
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput) {
      passwordInput.value = "";
      passwordInput.blur();
    }
  }

  // Ctrl/Cmd + Enter to submit form
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const passwordForm = document.getElementById("passwordForm");
    if (passwordForm) {
      passwordForm.dispatchEvent(new Event("submit"));
    }
  }
});

// Add some nice loading effects
function addLoadingEffects() {
  // Simulate content loading with staggered animations
  const animatedElements = document.querySelectorAll(
    ".logo-container, .main-heading, .sub-heading, .access-form"
  );

  animatedElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";

    setTimeout(() => {
      element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200 + 300);
  });
}

// Initialize loading effects after DOM is ready
document.addEventListener("DOMContentLoaded", addLoadingEffects);

console.log("PropChain Coming Soon Page Initialized");

// Export for external use
window.PropChain = {
  showNotification,
  initPasswordForm,
  initBackgroundGifControls,
};
