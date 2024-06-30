import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.currentActiveCategory = this.initCurrentActiveCategory();

    this.elem = this.render();
  }

  init() {
    this.hideArrowButtons();
    this.addArrowButtonsEvents();
    this.selectLink();
    this.addLinksEvents();
  }

  initCurrentActiveCategory() {
    return createElement(this.getLinkHtmlTemplate({id: '', name:''}));
  }

  //-------------------------------------------------------------------------------------------------

  getHtmlElements() {
    const leftButton = this.elem.querySelector('.ribbon__arrow_left');
    const rightButton = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonItems = this.elem.querySelectorAll('.ribbon__item');
    return {leftButton, rightButton, ribbonInner, ribbonItems};
  }

  getLinkHtmlTemplate({id, name}) {
    return `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`;
  }

  getItems() {
    const categories = this.categories;
    return categories.map(item => this.getLinkHtmlTemplate(item)).join('');
  }

  getHtml() {
    return `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.getItems()}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
         </button>
      </duv>
    `;
  }

  //-------------------------------------------------------------------------------------------------

  onLinkClick(item) {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.currentActiveCategory.dataset.id !== event.target.dataset.id) {

        this.currentActiveCategory.classList.remove('ribbon__item_active');
        event.target.classList.add('ribbon__item_active');
        this.currentActiveCategory = event.target;       
        
      }
    });
  }

  onHide(event) {
    const visibleClass = 'ribbon__arrow_visible';
    const {leftButton, rightButton, ribbonInner} = this.getHtmlElements();

    ribbonInner.addEventListener('scroll', () => {
       const scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
      
      if (ribbonInner.scrollLeft === 0) {
        leftButton.classList.remove(visibleClass);
      } else {
        leftButton.classList.add(visibleClass);
      }
  
      if (scrollRight < 1) {
        rightButton.classList.remove(visibleClass);
      } else {
        rightButton.classList.add(visibleClass);
      }
    });
  }

  //-------------------------------------------------------------------------------------------------

  hideArrowButtons() {
    this.elem.addEventListener('click', (event) => this.onHide(event));
  }

  
  selectLink() {
    const {ribbonItems} = this.getHtmlElements();
    Array.from(ribbonItems).map(item => this.onLinkClick(item));
  }


  addArrowButtonsEvents() {
    const {leftButton, rightButton, ribbonInner} = this.getHtmlElements();

    leftButton.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    rightButton.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });
  }

  addLinksEvents() {
    this.elem.addEventListener('click', (event) => {
      const linkClick = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true,
      });
      
      this.elem.dispatchEvent(linkClick);
    });
  }

  //-------------------------------------------------------------------------------------------------

  render() {
    const html = this.getHtml();
    this.elem = createElement(html);
    this.init();
    return this.elem;
  }
}
