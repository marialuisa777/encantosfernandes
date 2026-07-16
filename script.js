const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const galleryButtons = document.querySelectorAll('[data-image]');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

galleryButtons.forEach(button => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.image;
    modalImage.alt = button.dataset.alt || 'Imagem da galeria';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
  modalImage.alt = '';
};

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeModal();
  }
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealElements.forEach(element => observer.observe(element));

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (formNote) {
      formNote.textContent = 'Mensagem enviada! Em breve entraremos em contato pelo WhatsApp.';
    }
    contactForm.reset();
  });
}
