// PropChain Website JavaScript
console.log("PropChain Website Loading...");

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ PropChain Website Loaded Successfully");

  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initObjectFitPolyfill();
  initVideoControls();
  initSmoothScrolling();
  initResponsiveFeatures();
  initButtonEffects();
  initWalletModal(); // Add wallet modal initialization
});

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScrollTop = 0;
  let ticking = false;

  function updateNavbar() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    // Change background opacity based on scroll
    if (scrollTop > 50) {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
      navbar.style.backdropFilter = "blur(15px)";
      navbar.style.borderColor = "rgba(51, 65, 85, 0.8)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.8)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.borderColor = "rgba(51, 65, 85, 0.5)";
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  function requestNavbarUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestNavbarUpdate, { passive: true });

  // Mobile menu functionality
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function (e) {
      e.preventDefault();
      mobileMenu.classList.toggle("active");
      mobileMenuButton.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      mobileMenu &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuButton.contains(e.target)
    ) {
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";

        // Add staggered animation for grid items
        const parent = element.parentElement;
        if (
          parent.classList.contains("features-grid") ||
          parent.classList.contains("stakeholders-grid")
        ) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(element);
          element.style.transitionDelay = `${index * 0.1}s`;
        }

        observer.unobserve(element);
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
  if ("objectFit" in document.documentElement.style) return;

  console.log("Applying object-fit polyfill for older browsers");

  const images = document.querySelectorAll("[data-object-fit]");

  images.forEach(function (image) {
    const objectFit = image.getAttribute("data-object-fit") || "cover";
    const parent = image.parentNode;

    if (parent) {
      parent.style.position = "relative";
      parent.style.overflow = "hidden";
      parent.style.display = "block";

      if (parent.clientHeight === 0) {
        parent.style.height = "100%";
      }

      image.style.position = "absolute";
      image.style.height = "100%";
      image.style.width = "auto";

      if (objectFit === "cover") {
        if (image.clientWidth > parent.clientWidth) {
          image.style.top = "0";
          image.style.marginTop = "0";
          image.style.left = "50%";
          image.style.marginLeft = -(image.clientWidth / 2) + "px";
        } else {
          image.style.width = "100%";
          image.style.height = "auto";
          image.style.left = "0";
          image.style.marginLeft = "0";
          image.style.top = "50%";
          image.style.marginTop = -(image.clientHeight / 2) + "px";
        }
      }
    }
  });
}

// Enhanced video controls
function initVideoControls() {
  // Background video controls
  const videoControls = document.querySelectorAll(
    ".w-background-video--control, .hero-video-bg"
  );

  videoControls.forEach(function (control) {
    control.addEventListener("click", function (e) {
      e.preventDefault();

      const videoId = control.getAttribute("aria-controls");
      let video = null;

      if (videoId) {
        video = document.getElementById(videoId);
      } else {
        video =
          control.querySelector("video") ||
          control.parentElement.querySelector("video");
      }

      if (video) {
        toggleVideoPlayback(video, control);
      } else {
        // If no video found, create a placeholder interaction
        showNotification(
          "Video demo - Click để xem video giới thiệu PropChain",
          "info"
        );
      }
    });
  });

  // Auto-pause videos when not in viewport
  const videos = document.querySelectorAll("video");

  if (videos.length > 0 && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (video.hasAttribute("autoplay") && video.paused) {
              video.play().catch((e) => console.log("Autoplay prevented:", e));
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videos.forEach((video) => {
      videoObserver.observe(video);
    });
  }

  // Respect reduced motion preferences
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function handleMotionPreference(mediaQuery) {
    videos.forEach((video) => {
      if (mediaQuery.matches && !video.paused) {
        video.pause();
      }
    });
  }

  if (prefersReducedMotion) {
    prefersReducedMotion.addEventListener("change", handleMotionPreference);
    handleMotionPreference(prefersReducedMotion);
  }
}

function toggleVideoPlayback(video, control) {
  if (video.paused) {
    video
      .play()
      .then(() => {
        control.classList.add("playing");
        updateVideoControlDisplay(control, false);
      })
      .catch((e) => {
        console.log("Video play failed:", e);
        showNotification("Không thể phát video. Vui lòng thử lại.", "error");
      });
  } else {
    video.pause();
    control.classList.remove("playing");
    updateVideoControlDisplay(control, true);
  }
}

function updateVideoControlDisplay(control, showPlay) {
  const spans = control.querySelectorAll("span");
  spans.forEach((span, index) => {
    span.hidden = showPlay ? index !== 0 : index !== 1;
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbarHeight =
          document.querySelector(".navbar")?.offsetHeight || 80;
        const offsetTop = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Update URL without triggering scroll
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}

// Button effects and interactions
function initButtonEffects() {
  // Enhanced ripple effect for buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
      const button = e.target.classList.contains("btn")
        ? e.target
        : e.target.closest(".btn");
      createRippleEffect(button, e);
    }
  });

  // Add loading state for form buttons
  const formButtons = document.querySelectorAll("form .btn");
  formButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading");
        this.setAttribute("data-original-text", this.textContent);
        this.textContent = "Đang xử lý...";

        // Remove loading state after 2 seconds (demo)
        setTimeout(() => {
          this.classList.remove("loading");
          this.textContent = this.getAttribute("data-original-text");
        }, 2000);
      }
    });
  });
}

function createRippleEffect(button, event) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  // Apply ripple styles
  Object.assign(ripple.style, {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.3)",
    transform: "scale(0)",
    animation: "ripple 0.6s linear",
    pointerEvents: "none",
  });

  button.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Responsive features and window resize handling
function initResponsiveFeatures() {
  let resizeTimer;

  function handleResize() {
    // Update hero container height on mobile
    const heroContainer = document.querySelector(".container.hero-home");
    if (heroContainer) {
      if (window.innerWidth <= 768) {
        heroContainer.style.height = "auto";
        heroContainer.style.minHeight = "70vh";
      } else {
        heroContainer.style.height = "100vh";
        heroContainer.style.minHeight = "800px";
      }
    }

    // Update grid layouts
    updateGridLayouts();

    console.log(
      "Window resized to:",
      window.innerWidth + "x" + window.innerHeight
    );
  }

  function updateGridLayouts() {
    const grids = document.querySelectorAll(
      ".features-grid, .stakeholders-grid"
    );
    grids.forEach((grid) => {
      if (window.innerWidth <= 768) {
        grid.style.gridTemplateColumns = "1fr";
      } else if (window.innerWidth <= 1024) {
        grid.style.gridTemplateColumns = "repeat(2, 1fr)";
      }
    });
  }

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });

  // Initial resize handling
  handleResize();
}

// Form handling
function initFormHandling() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      console.log("Form submitted:", data);

      // Simulate form submission
      showNotification(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
        "success"
      );

      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
      }, 1000);
    });

    // Form validation
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateInput);
      input.addEventListener("input", clearValidationError);
    });
  });
}

function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();

  if (!value) {
    showInputError(input, "Trường này là bắt buộc");
    return false;
  }

  // Email validation
  if (input.type === "email" && !isValidEmail(value)) {
    showInputError(input, "Email không hợp lệ");
    return false;
  }

  clearInputError(input);
  return true;
}

function showInputError(input, message) {
  input.classList.add("error");
  let errorElement = input.nextElementSibling;

  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }

  errorElement.textContent = message;
}

function clearInputError(input) {
  input.classList.remove("error");
  const errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.remove();
  }
}

function clearValidationError(e) {
  const input = e.target;
  if (input.value.trim()) {
    clearInputError(input);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info", duration = 4000) {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    maxWidth: "350px",
    minWidth: "250px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => removeNotification(notification));

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove
  setTimeout(() => {
    removeNotification(notification);
  }, duration);
}

function removeNotification(notification) {
  notification.style.transform = "translateX(400px)";
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 300);
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window && images.length > 0) {
    const imageObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove("lazy");
            image.classList.add("loaded");
            imageObserver.unobserve(image);
          }
        });
      },
      {
        rootMargin: "50px 0px",
      }
    );

    images.forEach((image) => {
      image.classList.add("lazy");
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
  if (!("performance" in window)) return;

  window.addEventListener("load", function () {
    setTimeout(function () {
      if (performance.timing) {
        const loadTime =
          performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page load time: ${loadTime}ms`);

        if (loadTime > 3000) {
          console.warn("⚠️ Page load time is slower than expected");
        }
      }

      // Log performance metrics
      if (performance.getEntriesByType) {
        const paintMetrics = performance.getEntriesByType("paint");
        paintMetrics.forEach((metric) => {
          console.log(`🎨 ${metric.name}: ${Math.round(metric.startTime)}ms`);
        });
      }
    }, 0);
  });
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("light-theme");

      const isLight = document.body.classList.contains("light-theme");
      localStorage.setItem("theme", isLight ? "light" : "dark");

      showNotification(
        isLight
          ? "Đã chuyển sang giao diện sáng"
          : "Đã chuyển sang giao diện tối",
        "info",
        2000
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

// Initialize additional features when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initFormHandling();
  initLazyLoading();
  initPerformanceMonitoring();
  initThemeToggle();
});

// Service Worker registration for PWA features
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("✅ Service Worker registered successfully");
      })
      .catch(function (error) {
        console.log("❌ Service Worker registration failed:", error);
      });
  });
}

// Add CSS for notification styles
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0 0 0 10px;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .btn.loading {
        opacity: 0.7;
        pointer-events: none;
        position: relative;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        border: 2px solid currentColor;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: translateY(-50%) rotate(0deg); }
        100% { transform: translateY(-50%) rotate(360deg); }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .error {
        border-color: #ef4444 !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 12px;
        margin-top: 5px;
    }
`;

document.head.appendChild(notificationStyles);

console.log("🚀 PropChain Website JavaScript Initialized Successfully!");

// Wallet Modal Functionality
function initWalletModal() {
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");
  const closeSuccessModal = document.getElementById("closeSuccessModal");
  const walletOptions = document.querySelectorAll(".wallet-option");

  if (!loginBtn || !loginModal) {
    console.warn("Login button or modal not found");
    return;
  }

  // Show login modal when clicking "Bắt đầu" button
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showModal(loginModal);
  });

  // Close modal when clicking X
  if (closeModal) {
    closeModal.addEventListener("click", function () {
      hideModal(loginModal);
    });
  }

  // Close success modal
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener("click", function () {
      hideModal(successModal);
    });
  }

  // Close modal when clicking outside
  [loginModal, successModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          hideModal(modal);
        }
      });
    }
  });

  // Handle wallet selection
  walletOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const walletType = this.getAttribute("data-wallet");
      connectWallet(walletType, this);
    });
  });

  // ESC key to close modals
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      hideModal(loginModal);
      hideModal(successModal);
    }
  });
}

function showModal(modal) {
  if (modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
}

function hideModal(modal) {
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

function connectWallet(walletType, walletElement) {
  // Add connecting state
  walletElement.classList.add("connecting");

  // Disable all wallet options during connection
  document.querySelectorAll(".wallet-option").forEach((option) => {
    option.style.pointerEvents = "none";
    option.style.opacity = "0.6";
  });

  // Re-enable the selected wallet
  walletElement.style.pointerEvents = "auto";
  walletElement.style.opacity = "1";

  // Simulate wallet connection process
  const walletNames = {
    metamask: "MetaMask",
    trust: "Trust Wallet",
    coinbase: "Coinbase Wallet",
    walletconnect: "WalletConnect",
  };

  const walletName = walletNames[walletType] || "Ví điện tử";

  showNotification(`Đang kết nối với ${walletName}...`, "info", 2000);

  // Simulate connection delay
  setTimeout(() => {
    // Remove connecting state
    walletElement.classList.remove("connecting");

    // Re-enable all wallet options
    document.querySelectorAll(".wallet-option").forEach((option) => {
      option.style.pointerEvents = "auto";
      option.style.opacity = "1";
    });

    // Show success
    showNotification(`Kết nối ${walletName} thành công!`, "success", 2000);

    // Hide login modal and show success modal
    hideModal(document.getElementById("loginModal"));

    setTimeout(() => {
      showModal(document.getElementById("successModal"));
    }, 500);

    // Auto close success modal after 3 seconds
    setTimeout(() => {
      hideModal(document.getElementById("successModal"));
      showNotification("Chào mừng bạn đến với ViePropChain!", "success");
    }, 3000);
  }, 2000); // 2 second connection simulation
}

// Add wallet connection status to the page
function updateWalletStatus(walletType, isConnected) {
  const walletNames = {
    metamask: "MetaMask",
    trust: "Trust Wallet",
    coinbase: "Coinbase Wallet",
    walletconnect: "WalletConnect",
  };

  if (isConnected) {
    // Update login button to show connected status
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
      loginBtn.textContent = "Đã kết nối";
      loginBtn.classList.add("connected");
      loginBtn.style.background = "#10b981";
      loginBtn.style.borderColor = "#10b981";
    }

    // Store connection status
    localStorage.setItem("walletConnected", walletType);
    localStorage.setItem("walletConnectedTime", Date.now().toString());
  }
}

// Check wallet connection status on page load
function checkWalletConnection() {
  const connectedWallet = localStorage.getItem("walletConnected");
  const connectionTime = localStorage.getItem("walletConnectedTime");

  if (connectedWallet && connectionTime) {
    const timeElapsed = Date.now() - parseInt(connectionTime);
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    // Auto-disconnect after 1 hour for demo purposes
    if (timeElapsed < oneHour) {
      updateWalletStatus(connectedWallet, true);
    } else {
      localStorage.removeItem("walletConnected");
      localStorage.removeItem("walletConnectedTime");
    }
  }
}

// Initialize wallet connection check
document.addEventListener("DOMContentLoaded", checkWalletConnection);
