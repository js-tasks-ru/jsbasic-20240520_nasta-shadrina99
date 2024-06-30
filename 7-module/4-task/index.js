import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  //-------------------------------------------------------------------------------------------------
  
  getHtmlElements() {
    const slidervalue= this.elem.querySelector('.slider__value');
    const sliderProgress = this.elem.querySelector('.slider__progress');
    const sliderSteps = this.elem.querySelector('.slider__steps');
    const sliderThumb = this.elem.querySelector('.slider__thumb');
    
    return {slidervalue, sliderProgress, sliderSteps, sliderThumb};
  }


  getItems() {
    const items =[];

    for (let i = 0; i < this.steps; i++) {
      items.push(`<span data-id="${i}" class="${i === 0 ? 'slider__step-active' : null}"></span>`);
    }

    return items.join('');
  }

  getHtml() {
     return `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: 0;"></div>
        <div class="slider__steps">
          ${this.getItems()}
        </div>
      </div>
    `;
  }

  getMoveStyles(shift) {
    const {sliderThumb, sliderProgress} = this.getHtmlElements();

    sliderThumb.style.left = `${shift}%`;
    sliderProgress.style.width = `${shift}%`;
  }

  //-------------------------------------------------------------------------------------------------

  onChangeValue(event) {
    const {slidervalue, sliderProgress, sliderSteps} = this.getHtmlElements();
    const {left} = sliderProgress.getBoundingClientRect();

    const sliderClickPlace = event.pageX - left;
    const sliderRangeWidth = sliderSteps.clientWidth / (this.steps - 1);
    const ranges = [];

    for (let i = 0; i < this.steps; i++) {
      ranges.push(i * sliderRangeWidth + sliderRangeWidth / 2);
    }

    this.value = ranges.findIndex(range => sliderClickPlace < range);

    if (sliderClickPlace > sliderSteps.clientWidth) {
      this.value = this.steps - 1;
    }

    slidervalue.textContent = this.value;
  }

  selectSpan() {
    const spans = this.elem.querySelectorAll('span');
    const lastStep = this.elem.querySelector('.slider__step-active');

    if (lastStep) {
      lastStep.classList.remove('slider__step-active');
    } 

    Array.from(spans).map(span => {
      if (span.dataset.id === this.value.toString()) {
        span.classList.add('slider__step-active');
      }
    });
  }

  redrawSlider(event) {
    const shift = this.value * 100 / (this.steps - 1);
    this.getMoveStyles(shift);
  }

  userEvent(event) {
    const userEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(userEvent);
  }

  //-------------------------------------------------------------------------------------------------

  onDown() {
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onMove);
    document.addEventListener('pointerup', (event) => this.onUp(event), {once: true});
  }

  onMove = (event) => {
    const {sliderSteps} = this.getHtmlElements();
    const {left} = this.elem.getBoundingClientRect();
    let shift = 100 * (event.clientX - left) / sliderSteps.clientWidth;
    
    if (shift <= 0) {
      shift = 0;
    }

    if (shift >= 100) {
      shift = 100;
    }

    this.getMoveStyles(shift);
  }

  onUp(event) {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.onMove);

    this.onChangeValue(event);
    this.selectSpan(event);
    this.userEvent(event);
  }

  //-------------------------------------------------------------------------------------------------

  changeValue() {
    const {sliderThumb} = this.getHtmlElements();

    this.elem.addEventListener('click', (event) => this.onChangeValue(event));
    this.elem.addEventListener('click', (event) => this.selectSpan(event));
    this.elem.addEventListener('click', (event) => this.redrawSlider(event));
    this.elem.addEventListener('click', (event) => this.userEvent(event));

    sliderThumb.ondragstart = (event) => event.preventDefault();
    sliderThumb.addEventListener('pointerdown', (event) => this.onDown(event));
  }

  render() {
    const html = this.getHtml();
    this.elem = createElement(html);
    this.changeValue();
    return this.elem;
  }
}
