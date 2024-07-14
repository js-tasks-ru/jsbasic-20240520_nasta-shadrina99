import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const initialTopCoordCart = this.elem.offsetTop;
    const currentVerticalScroll = window.pageYOffset;

    const marginElement = document.querySelector('.container').firstElementChild;
    const marginRight = marginElement.getBoundingClientRect().right;

    const {top, right, width} = this.elem.getBoundingClientRect();
    const windowWidth = document.documentElement.clientWidth;
    if (width) {
      if (currentVerticalScroll > initialTopCoordCart) {

        this.elem.style.position = 'fixed';

        if (windowWidth - right > 10) {
          this.elem.style.left = `${marginRight + 20}px`;
        }  else {
          this.elem.style.zIndex = '10';
          this.elem.style.left = `${windowWidth - width - 10}px`;
        }
        
      } else {
        this.elem.style.position = 'absolute';
        this.elem.style.left = 'auto';
      }
    }
  }
}
