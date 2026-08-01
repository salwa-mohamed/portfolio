// ===== TOGGLE PILLARS / MATRIX =====
const pillarsBtn = document.getElementById('tabPillarsBtn');
const matrixBtn = document.getElementById('tabMatrixBtn');
const pillarsView = document.getElementById('pillarsView');
const matrixView = document.getElementById('matrixView');

pillarsBtn.addEventListener('click', () => {
  pillarsView.classList.remove('hidden');
  matrixView.classList.add('hidden');
  pillarsBtn.classList.add('active');
  matrixBtn.classList.remove('active');
});

matrixBtn.addEventListener('click', () => {
  matrixView.classList.remove('hidden');
  pillarsView.classList.add('hidden');
  matrixBtn.classList.add('active');
  pillarsBtn.classList.remove('active');
});

lucide.createIcons();

// ===== TEAM FILTER =====
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const teamCards = document.querySelectorAll('.team-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-cat');

      teamCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'All' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)'; /* <--- انيميشن اقرب للـ glass */
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});

// ===== THEME TOGGLE ===== /* <--- كله جديد */
const themeToggle = document.getElementById('themeToggle');
const themeText = document.getElementById('themeText');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeText.textContent = 'Light Mode';
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span id="themeText">Light Mode</span>';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeText.textContent = 'Light Mode';
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span id="themeText">Light Mode</span>';
  } else {
    localStorage.setItem('theme', 'light');
    themeText.textContent = 'Dark Mode';
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span id="themeText">Dark Mode</span>';
  }
});