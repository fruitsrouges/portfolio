const sections = document.querySelectorAll('.card-container');
const buttons = document.querySelectorAll('.buttons button');
const buttonsContainer = document.querySelector('.buttons-container');

document.addEventListener("DOMContentLoaded", () => {
    const titleContainer = document.querySelector(".home-title-container");
    const popupContainer = document.querySelector(".home-popup");
  
    titleContainer.addEventListener("mouseenter", () => {
      popupContainer.classList.add("visible");
    });
  
    titleContainer.addEventListener("mouseleave", () => {
      popupContainer.classList.remove("visible");
    });
  });
  

  if (!window.matchMedia('(max-width: 480px)').matches) {
    const cardsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = [...sections].indexOf(entry.target);
          buttons.forEach(btn => btn.classList.remove('active'));
          buttons[index].classList.add('active');
          entry.target.classList.add('display');
        } else {
          entry.target.classList.remove('display');
        }
      });
    }, { threshold: 0.6 });
  
    sections.forEach(section => cardsObserver.observe(section));
  }
  
  

const projetsSection = document.querySelector('#works');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            buttonsContainer.classList.remove('hidden');
        } else {
            buttonsContainer.classList.add('hidden');
        }
    });
}, {
    threshold: 0.6
});

sectionObserver.observe(projetsSection);

