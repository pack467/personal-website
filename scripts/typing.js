document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.typing-text');
  
  elements.forEach(el => {
    const strings = JSON.parse(el.dataset.strings);
    let current = 0;
    let currentText = '';
    let isDeleting = false;
    
    function type() {
      const fullText = strings[current];
      
      if(isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }
      
      el.textContent = currentText;
      
      let speed = 100;
      
      if(isDeleting) speed /= 2;
      
      if(!isDeleting && currentText === fullText) {
        speed = 2000;
        isDeleting = true;
      } else if(isDeleting && currentText === '') {
        isDeleting = false;
        current = (current + 1) % strings.length;
      }
      
      setTimeout(type, speed);
    }
    
    type();
  });
});