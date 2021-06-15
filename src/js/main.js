// Ресайз изображения блока О компании
window.onload = () => {
  document.querySelector('.preloader').classList.add('loaded');

  // document.querySelector('#preloader').style.display = 'none';
  if(document.body.clientWidth > 767 ) {
    aboutImgResize();
  }
};

window.addEventListener('resize', () => {
  if (document.body.clientWidth > 480) {
    aboutImgResize();
  } else {
    mobileSlider();
  }
});

function aboutImgResize () {
  let aboutText = document.querySelector('.about__text');
  let aboutImg = document.querySelector('.about__image');

  aboutImg.style.height = aboutText.offsetHeight + 'px';
}

function mobileSlider() {
  let sliderThumb =  document.querySelector('.slider--mobile .slider__card'),
      slideWidth = sliderThumb.offsetWidth,
      slideHeight = sliderThumb.offsetHeight;

  if(document.body.clientWidth <= 480) {
    sliderThumb.style.height = sliderWidth * 1.2 + 'px';
  } else {
    break;
  }

}

const projectsSlider = new Swiper('.projects-slider', {
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

    830: {
      slidesPerView: 2,
    },
    1070: {
      slidesPerView: 3,
    }
  },

  // If we need pagination
  pagination: {
    el: '.projects-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.projects-button-next',
    prevEl: '.projects-button-prev',
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

    830: {
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