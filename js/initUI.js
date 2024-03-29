document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      updateButtonsVisibility();
    }
  
    function updateButtonsVisibility() {
      if (currentIndex === 0) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
      } else if (currentIndex === slides.length - 1) {
        prevBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'inline-block';
        nextBtn.style.display = 'inline-block';
      }
    }
  
    function nextSlide() {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
      }
    }
  
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
      }
    }
  
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  
    // Toon de eerste dia bij het laden van de pagina
    showSlide(currentIndex);
  });
  