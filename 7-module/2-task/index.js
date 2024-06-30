import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
  }

  getHtml() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
    </div>`;
  }

  setTitle(title) {
    const titleElement = this.elem.querySelector('.modal__title');
    titleElement.textContent = title;
  }

  
  setBody(node) {
    const bodyElement = this.elem.querySelector('.modal__body');
    bodyElement.innerHTML = '';
    bodyElement.append(node);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.documentElement.removeEventListener('keydown', (event) => this.keyboardClose(event));
  }

  keyboardClose(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  closeButton() {
    const closeButton = this.elem.querySelector('.modal__close');
    closeButton.addEventListener('click', () => this.close());
  }

  closeKeyboardButton() {
    document.documentElement.addEventListener('keydown', (event) => this.keyboardClose(event));
  }

  render() {
    const html = this.getHtml();
    this.elem = createElement(html);
    this.closeButton();
    this.closeKeyboardButton();
    return this.elem;
  }
}
