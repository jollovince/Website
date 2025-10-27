function initConcertSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");

  // Kung wala pa slides, huwag muna ituloy
  if (!slides.length || !next || !prev) {
    console.warn("⏳ Waiting for concert section to load...");
    setTimeout(initConcertSlider, 500); // subukang muli kada 0.5s
    return;
  }

  console.log("✅ Concert slideshow initialized!");

  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.remove("active");
      dots[idx]?.classList.remove("active");
    });
    slides[i].classList.add("active");
    dots[i]?.classList.add("active");
  }

  next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);
}

// 🔧 Wait until all dynamic sections have loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎬 Waiting for concert section...");
  setTimeout(initConcertSlider, 1500); // start checking after 1.5s
});