// Mobile navigation toggle

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Swipeable homepage image slider

const sliderTrack = document.getElementById("sliderTrack");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

function updateSlider() {
  if (!sliderTrack) return;

  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function goToSlide(index) {
  if (!sliderTrack) return;

  const totalSlides = sliderTrack.children.length;

  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  updateSlider();
}

if (prevSlide && nextSlide && sliderTrack) {
  prevSlide.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  nextSlide.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

if (sliderTrack) {
  sliderTrack.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    currentX = startX;
    isDragging = true;
  });

  sliderTrack.addEventListener("touchmove", (event) => {
    if (!isDragging) return;
    currentX = event.touches[0].clientX;
  });

  sliderTrack.addEventListener("touchend", () => {
    if (!isDragging) return;

    const swipeDistance = startX - currentX;

    if (swipeDistance > 50) {
      goToSlide(currentSlide + 1);
    } else if (swipeDistance < -50) {
      goToSlide(currentSlide - 1);
    }

    isDragging = false;
    startX = 0;
    currentX = 0;
  });
}

updateSlider();