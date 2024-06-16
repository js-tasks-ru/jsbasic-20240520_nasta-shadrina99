function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselArrow = document.querySelector('.carousel__inner');
  const pictureWidth = carouselArrow.offsetWidth;
  const leftButton = document.querySelector('.carousel__arrow_left');
  const rightButton = document.querySelector('.carousel__arrow_right');
  const numPictures = carouselArrow.children.length - 1;
  let counter = 0;
  leftButton.style.display = 'none';

  leftButton.addEventListener('click', {
    handleEvent: changePicture,
    count: function() {
      return --counter;
    },
  });

  rightButton.addEventListener('click', {
    handleEvent: changePicture,
    count: function() {
      return ++counter;
    },
  });

  carousel.addEventListener('click', hideButton);
  
  function changePicture() {
    const shift = this.count() * -pictureWidth;
    carouselArrow.style.transform = `translateX(${shift}px)`;
  }

  function hideButton() {
    rightButton.style.display = `${counter >= numPictures ? 'none' : ''}`;
    leftButton.style.display = `${counter <= 0 ? 'none' : ''}`;
  }
}