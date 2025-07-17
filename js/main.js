// Main JavaScript for Khanna and Associates Law Firm Website

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const closeBtn = document.querySelector(".close-btn")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Close mobile menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Search Overlay Toggle
  const searchBtn = document.querySelector(".search-btn")
  const searchOverlay = document.getElementById("searchOverlay")
  const closeSearch = document.querySelector(".close-search")
  const searchInput = document.getElementById("searchInput")

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault()
      searchOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100)
      }
    })
  }

  if (closeSearch && searchOverlay) {
    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Close search overlay when clicking outside
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Close search on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active")
      document.body.style.overflow = ""
    }
  })

  // Search form functionality
  const searchForm = document.getElementById("searchForm")
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const query = searchInput.value.trim()
      if (query) {
        // Implement search functionality here
        console.log("Searching for:", query)
        // For now, just close the overlay
        searchOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Disclaimer Modal
  const disclaimerModal = document.getElementById("disclaimerModal")
  const acceptDisclaimer = document.getElementById("acceptDisclaimer")
  const closeModal = document.querySelector(".close-modal")

  // Check if user has already accepted the disclaimer
  const hasAcceptedDisclaimer = localStorage.getItem("acceptedDisclaimer")

  if (!hasAcceptedDisclaimer && disclaimerModal) {
    disclaimerModal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  if (acceptDisclaimer) {
    acceptDisclaimer.addEventListener("click", () => {
      localStorage.setItem("acceptedDisclaimer", "true")
      disclaimerModal.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  if (closeModal && disclaimerModal) {
    closeModal.addEventListener("click", () => {
      disclaimerModal.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const formDataObj = {}

      formData.forEach((value, key) => {
        formDataObj[key] = value
      })

      // Basic validation
      if (
        !formDataObj.name ||
        !formDataObj.email ||
        !formDataObj.phone ||
        !formDataObj.service ||
        !formDataObj.message
      ) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formDataObj.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Phone validation (basic)
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(formDataObj.phone.replace(/\s/g, ""))) {
        alert("Please enter a valid phone number.")
        return
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalButtonText = submitButton.innerHTML

      submitButton.disabled = true
      submitButton.innerHTML = "Sending..."

      setTimeout(() => {
        alert("Thank you for your message. We will get back to you soon!")
        contactForm.reset()
        submitButton.disabled = false
        submitButton.innerHTML = originalButtonText
      }, 2000)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's just "#" or empty
      if (href === "#" || href === "") return

      const targetElement = document.querySelector(href)

      if (targetElement) {
        e.preventDefault()

        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active")
          document.body.style.overflow = ""
        }

        // Scroll to the target element
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Animation on scroll
  const animateElements = document.querySelectorAll(
    ".service-card, .testimonial-card, .feature-card, .location-card, .team-member-card",
  )

  if (animateElements.length) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
        }
      })
    }, observerOptions)

    animateElements.forEach((element) => {
      observer.observe(element)
    })
  }

  // Header scroll effect
  const header = document.querySelector(".header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    lastScrollTop = scrollTop
  })

  // Anniversary badge animation
  const anniversaryBadge = document.querySelector(".anniversary-badge")
  if (anniversaryBadge) {
    setTimeout(() => {
      anniversaryBadge.style.opacity = "1"
      anniversaryBadge.style.transform = "scale(1)"
    }, 2000)
  }

  // Floating action buttons
  const floatingBtns = document.querySelectorAll(".floating-btn")
  floatingBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Service cards hover effect
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Location cards hover effect
  const locationCards = document.querySelectorAll(".location-card")
  locationCards.forEach((card) => {
    const img = card.querySelector(".location-image img")

    card.addEventListener("mouseenter", () => {
      if (img) {
        img.style.transform = "scale(1.1)"
      }
    })

    card.addEventListener("mouseleave", () => {
      if (img) {
        img.style.transform = "scale(1)"
      }
    })
  })

  // Form field focus effects
  const formFields = document.querySelectorAll("input, select, textarea")
  formFields.forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    field.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused")
      }
    })
  })

  // Testimonials auto-rotation (if needed)
  const testimonials = document.querySelectorAll(".testimonial-card")
  if (testimonials.length > 3) {
    let currentTestimonial = 0

    setInterval(() => {
      testimonials[currentTestimonial].style.opacity = "0.5"
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      testimonials[currentTestimonial].style.opacity = "1"
    }, 5000)
  }

  // Back to top functionality
  const backToTopBtn = document.createElement("button")
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  backToTopBtn.className = "back-to-top"
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 80;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  `

  document.body.appendChild(backToTopBtn)

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = "1"
      backToTopBtn.style.visibility = "visible"
    } else {
      backToTopBtn.style.opacity = "0"
      backToTopBtn.style.visibility = "hidden"
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Initialize tooltips (if needed)
  const tooltipElements = document.querySelectorAll("[data-tooltip]")
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = this.getAttribute("data-tooltip")
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
      `
      document.body.appendChild(tooltip)

      const rect = this.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px"
    })

    element.addEventListener("mouseleave", () => {
      const tooltip = document.querySelector(".tooltip")
      if (tooltip) {
        tooltip.remove()
      }
    })
  })

  // Print functionality
  window.addEventListener("beforeprint", () => {
    // Hide elements that shouldn't be printed
    const noPrintElements = document.querySelectorAll(
      ".floating-actions, .search-overlay, .mobile-menu, .anniversary-badge",
    )
    noPrintElements.forEach((el) => {
      el.style.display = "none"
    })
  })

  window.addEventListener("afterprint", () => {
    // Restore hidden elements
    const noPrintElements = document.querySelectorAll(
      ".floating-actions, .search-overlay, .mobile-menu, .anniversary-badge",
    )
    noPrintElements.forEach((el) => {
      el.style.display = ""
    })
  })

  // Performance optimization: Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    const lazyImages = document.querySelectorAll("img[data-src]")
    lazyImages.forEach((img) => imageObserver.observe(img))
  }

  // Console welcome message
  console.log("%c🏛️ Khanna and Associates", "color: #1a3c61; font-size: 20px; font-weight: bold;")
  console.log("%cLegal Excellence Since 1948", "color: #4bb4e6; font-size: 14px;")
  console.log("%cWebsite developed with modern web technologies", "color: #666; font-size: 12px;")
})

// Mobile Mega Menu Toggle
const navDropdowns = document.querySelectorAll(".nav-item-dropdown")

navDropdowns.forEach((dropdown) => {
  const navLink = dropdown.querySelector(".nav-link")

  navLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 767) {
      e.preventDefault()
      dropdown.classList.toggle("active")

      // Close other dropdowns
      navDropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active")
        }
      })
    }
  })
})

// Close mega menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-item-dropdown")) {
    navDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active")
    })
  }
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Export functions for use in other scripts
window.LawFirmUtils = {
  debounce,
  throttle,
}
