document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Script loaded, starting to load sections...");
  
  // ===== LOAD SECTIONS =====
  const sections = {
    header: "header.html",
    "about-section": "about.html",
    "news-section": "news.html",
    "music-section": "music.html",
    "concert-section": "concert.html",
    "awards-section": "awards.html",
    "contact-section": "contact.html",
    footer: "footer.html"
  };

  let loadedCount = 0;
  const totalSections = Object.keys(sections).length;

  Object.entries(sections).forEach(([id, file]) => {
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`${file} not found - Status: ${res.status}`);
        return res.text();
      })
      .then(data => {
        const el = document.getElementById(id);
        if (el) {
          el.innerHTML = data;
          console.log(`✅ ${file} loaded successfully!`);
        } else {
          console.error(`❌ Element with id "${id}" not found in DOM`);
        }
        
        loadedCount++;
        
        // ✅ Initialize navigation after header is loaded
        if (id === "header") {
          setTimeout(() => initializeNavigation(), 100);
        }
        
        // Initialize other scripts after all sections are loaded
        if (loadedCount === totalSections) {
          console.log("✅ All sections loaded!");
          initializeSmoothScroll();
        }
      })
      .catch(err => console.error(`❌ Error loading ${file}:`, err));
  });

  // ===== SMOOTH SCROLL FIX =====
  function initializeSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link && link.getAttribute("href") && link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const section = document.getElementById(targetId);
        
        if (section) {
          // Close mobile menu if open
          const navMenu = document.getElementById("nav-menu");
          const toggle = document.getElementById("menu-toggle");
          if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            if (toggle) toggle.classList.remove("active");
          }
          
          // Smooth scroll to section
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
    console.log("✅ Smooth scroll initialized");
  }

  // ===== NAVIGATION INITIALIZATION =====
  function initializeNavigation() {
    console.log("🔧 Initializing navigation...");
    
    // ===== HAMBURGER MENU TOGGLE =====
    const toggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (toggle && navMenu) {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        console.log("🍔 Menu toggled");
      });
      console.log("✅ Hamburger menu initialized");
    } else {
      console.error("❌ Menu toggle or nav-menu not found");
    }

    // ===== DROPDOWN (CLICK TO OPEN - DESKTOP & MOBILE) =====
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownContent = document.querySelector(".dropdown-content");

    if (dropdownToggle && dropdownContent) {
      dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownContent.classList.toggle("show");
        dropdownToggle.classList.toggle("open");
      });

      // Keep it open while hovering inside (desktop)
      dropdownContent.addEventListener("mouseenter", () => {
        dropdownContent.classList.add("show");
      });

      dropdownContent.addEventListener("mouseleave", () => {
        dropdownContent.classList.remove("show");
        dropdownToggle.classList.remove("open");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) {
          dropdownContent.classList.remove("show");
          dropdownToggle.classList.remove("open");
        }
      });
      
      console.log("✅ Dropdown menu initialized");
    } else {
      console.warn("⚠️ Dropdown elements not found");
    }
  }
});
