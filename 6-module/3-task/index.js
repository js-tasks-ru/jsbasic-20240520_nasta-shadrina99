import createElement from '../../assets/lib/create-element.js';

export default class Carousel {  
  constructor(slides) {
    this.slides = slides;
    this.currentPictureNumber = 0;

    this.elem = this.render();
  }

  init() {
    this.findElement('carousel__arrow_left').style.display = 'none';
    this.elem.addEventListener('click', (event) => this.onCarouselClick(event));
    this.elem.addEventListener('click', (event) => this.onAddButtonClick(event));
  }

  findElement(selector) {
    return this.elem.querySelector(`.${selector}`);
  }

  onAddButtonClick(event) {
    const currentId = event.target.closest('.carousel__slide');
    if (currentId) {
      const addButtonClick = new CustomEvent('product-add', {
        detail: currentId.dataset.id,
        bubbles: true,
      });
  
      this.elem.dispatchEvent(addButtonClick);
    }
  }

  onCarouselClick(event) {
    const carouselInner = this.findElement('carousel__inner');

    const leftButton = ('carousel__arrow_left');
    const rightButton = ('carousel__arrow_right');

    if (event.target.closest(`.${leftButton}`)) {
      this.currentPictureNumber--;
    }

    if (event.target.closest(`.${rightButton}`)) {
      this.currentPictureNumber++;
    }

    this.shiftCarousel(carouselInner);
    this.hiddenButtons(leftButton, rightButton, carouselInner);
  }

  shiftCarousel(carouselInner) {
    const slide = this.findElement('carousel__img');
    const slideWidth = slide.offsetWidth;
    const shift = -1 * this.currentPictureNumber * slideWidth;
    
    carouselInner.style.transform = `translateX(${shift}px)`;
  }

  hiddenButtons(leftButton, rightButton, carouselInner) {
    const numberOfPictures = carouselInner.children.length;

    this.findElement(leftButton).style.display = `${this.currentPictureNumber <= 0 ? 'none' : ''}`;
    this.findElement(rightButton).style.display = `${this.currentPictureNumber >= numberOfPictures - 1 ? 'none' : ''}`;
  }

  renderCarouselInner(slide) {
    const {image, price, name, id} = slide;
    const imgUrl = `/assets/images/carousel/${image}`;

    return `
      <div class="carousel__slide" data-id="${id}">
        <img src=${imgUrl} class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  renderCarousel() {
    const slides = this.slides.map(item => this.renderCarouselInner(item)).join('');

    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">${slides}</div>
      </div>
    `;
  }

  render() {
    const content = this.renderCarousel();
    this.elem = createElement(content);
    this.init();
    return this.elem;
  }
}
