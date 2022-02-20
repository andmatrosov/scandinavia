const projectsSlider = new Swiper('.our-projects-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  allowTouchMove: false,
  slidesPerView: 3,
  spaceBetween: 30,


  breakpoints: {
    480: {
      slidesPerView: 1,
    },

    767: {
      slidesPerView: 2,
    },
    1070: {
      slidesPerView: 3,
    }
  },

  // If we need pagination
  pagination: {
    el: '.our-projects-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.our-projects-button-next',
    prevEl: '.our-projects-button-prev',
  },

});

const teamSlider = new Swiper('.team-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  allowTouchMove: false,
  slidesPerView: 3,
  spaceBetween: 30,


  breakpoints: {
    480: {
      slidesPerView: 1,
    },

    767: {
      slidesPerView: 2,
    },
    1070: {
      slidesPerView: 3,
    }
  },

  // If we need pagination
  pagination: {
    el: '.team-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.team-button-next',
    prevEl: '.team-button-prev',
  },

});