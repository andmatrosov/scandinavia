// Ресайз изображения блока О компании
window.onload = () => {
  document.querySelector('.preloader').classList.add('loaded');

  if (document.body.offsetWidth >= 909 - widthScroll()) {
    aboutImgResize('desk');
  } else if (document.body.offsettWidth <= 909 - widthScroll()) {
    console.log('Задание высоты при загрузке')
    aboutImgResize('mobile');
  }
};

window.addEventListener('resize', () => {
  // При ресайзе окна проверяем условия

  if (document.body.offsetWidth > 909 - widthScroll()) {
    aboutImgResize('desk'); //Если это условие верно, ресайзим блок с картинкой
  } else if (document.body.offsetWidth <= 909 - widthScroll()) {
    aboutImgResize('mobile'); // Если это условие верно, удаляем инлайн стили
  }
});




const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()


// When the user scrolls the page, execute myFunction
window.onscroll = function() {headerBg()};

// Get the navbar
var header = document.querySelector('.header');

// Get the offset position of the navbar
var sticky = header.offsetHeight;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function headerBg() {
  console.log(`Высота шапки: ${header.offsetHeight}\nВысота прокрутки: ${window.pageYOffset}`)
  if (window.pageYOffset > sticky) {
    header.classList.add('header--light')
  } else if (window.pageYOffset < sticky) {
    console.log('work?')
    header.classList.remove('header--light');
  }
}





function aboutImgResize (wide) {
  let aboutText = document.querySelector('.about__text');
  let aboutImg = document.querySelector('.about__image');
 
    if(wide === 'desk') {
      aboutImg.style.height = aboutText.offsetHeight + 'px';
    } else if (wide === 'mobile') {
      aboutImg.removeAttribute('style');
    }
  
}

// Находим ширину скроллбара
function widthScroll(){
  var div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollWidth;
}

// Мобильное меню
let mobileMenuBtns = [
      document.querySelector('.humburger'),
      document.querySelector('.mobile-menu__close')
    ],
    mobileMenu = document.querySelector('.mobile-menu');


mobileMenuBtns.forEach((event) => {
  event.addEventListener('click', (e) => {
    e.preventDefault()
    mobileMenu.classList.toggle('mobile-menu--active')
  })
})


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

    767: {
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