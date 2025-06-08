window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// Theme Toggle (dynamic creation)
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Toggle theme and persist
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
});

// Animate on Scroll - show all animate-in elements immediately
document.querySelectorAll('.animate-in').forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
});

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = +counter.innerText;
    const increment = target / speed;
    if (count < target) {
      count = Math.min(count + increment, target);
      counter.innerText = Math.ceil(count);
      setTimeout(animateCounters, 20);
    } else {
      counter.innerText = target;
    }
  });
};

const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
observer.observe(aboutSection);

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = progress;
  });
};
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
skillsObserver.observe(skillsSection);

// Set current year in footer
const currentYearElem = document.getElementById('currentYear');
if (currentYearElem) {
  currentYearElem.textContent = new Date().getFullYear();
}

// Contact form submission alert
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    alert(`Terima kasih ${name}! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda melalui email ${email}.`);
    contactForm.reset();
  });
}
