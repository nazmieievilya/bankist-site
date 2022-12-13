'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const butnScroolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

////////////////////////////
// modal window
const openModal = function (e) {
  e.preventDefault;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

butnScroolTo.addEventListener('click', e => {
  const coords1 = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link'))
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
});

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const i = e.target.closest('.operations__tab').dataset.tab;
    tabs.forEach(elem => {
      elem.classList.remove('operations__tab--active');
    });
    contents.forEach(elem => {
      elem.classList.remove('operations__content--active');
    });
    tabs[i - 1].classList.add('operations__tab--active');
    contents[i - 1].classList.add('operations__content--active');
  });

// Intersection Observer API
const headerHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entrs) {
  const [entrie] = entrs;
  if (!entrie.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const navObs = new IntersectionObserver(obsCallback, obsOptions);
navObs.observe(header);

const allSections = document.querySelectorAll('.section');
function secObserver(entries, observer) {
  const [entrie] = entries;
  if (entrie.isIntersecting) {
    entrie.target.classList.remove('section--hidden');
    observer.unobserve(entrie.target);
  }
}

const secObs = new IntersectionObserver(secObserver, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (sec) {
  sec.classList.add('section--hidden');
  secObs.observe(sec);
});

// lazy Loading

const imgTargets = document.querySelectorAll('img[data-src]');

function imgCallback(entries, observer) {
  const [entrie] = entries;

  entrie.target.src = entrie.target.dataset.src;
  if (!entrie.isIntersecting) return;
  entrie.target.addEventListener('load', e => {
    e.target.classList.remove('lazy-img');
  });
  observer.unobserve(entrie.target);
}

const imgObs = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 1,
});

imgTargets.forEach(img => imgObs.observe(img));

// Slider
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let currSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((_, i) => {
      const dot = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotsContainer.insertAdjacentHTML('beforeend', dot);
    });
  };
  function init() {
    createDots();
    goToSlide(0);
    activeDot();
  }
  init();
  function activeDot() {
    const dots = document.querySelectorAll('.dots__dot');

    dots.forEach(d => d.classList.remove('dots__dot--active'));
    dots[currSlide].classList.add('dots__dot--active');
  }
  function goToSlide(slide) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currSlide)}%)`;
    });
    activeDot();
  }

  function nextSlide() {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
  }
  function prevSlide() {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
  }

  function dotsSlide(e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      currSlide = Number(slide);
      goToSlide();
    }
  }

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
  dotsContainer.addEventListener('click', dotsSlide);
};

slider();
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
