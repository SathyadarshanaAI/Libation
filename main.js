// main.js
// Example: Card click animation/toggle
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});
