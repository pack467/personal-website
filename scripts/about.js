// Animate stats counting
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        clearInterval(counter);
        stat.textContent = target;
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Initialize animation when section is in view
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

aboutObserver.observe(document.querySelector('.about-section'));