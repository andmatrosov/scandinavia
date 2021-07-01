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

  if (window.pageYOffset > sticky) {
    header.classList.add('header--light')
  } else if (window.pageYOffset < sticky) {
    header.classList.remove('header--light');
  }
}


function aboutImgResize (wide) {

  // console.log(document.querySelector('.about__text'))

  if(document.querySelector('.about__text') !== null && document.querySelector('.about__image') !== null ){

    let aboutText = document.querySelector('.about__text');

    let aboutImg = document.querySelector('.about__image');
  
    if(wide === 'desk') {
      aboutImg.style.height = aboutText.offsetHeight + 'px';
    } else if (wide === 'mobile') {
      aboutImg.removeAttribute('style');
    }
  } else {
    return false;
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


// Отключить действие поумолчанию у ссылок
let prevDef = Array.prototype.slice.call(document.querySelectorAll('.prevDef'));


prevDef.forEach((event) => {
  event.addEventListener('click', (e) => {
    e.preventDefault()
  })
})



let yearBuilds = Array.prototype.slice.call(document.querySelectorAll('.projects__filters-year__link'));

yearBuilds.forEach((event) => {
  event.addEventListener('click', (e) => {
    yearBuilds.forEach((el) => {
      el.classList.remove('active');
    });

    // console.log(e.path[0]);
    e.path[0].classList.add('active');
  })
})