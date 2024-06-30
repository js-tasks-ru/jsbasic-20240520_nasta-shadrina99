import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  //-------------------------------------------------------------------------------------------------
  
  getHtmlElements() {
    const slider = this.elem.querySelector('.slider');
    const slidervalue= this.elem.querySelector('.slider__value');
    const sliderProgress = this.elem.querySelector('.slider__progress');
    const sliderSteps = this.elem.querySelector('.slider__steps');
    const sliderThumb = this.elem.querySelector('.slider__thumb');
    
    return {slidervalue, sliderProgress, sliderSteps, sliderThumb, slider};
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
    const {sliderThumb, sliderProgress, sliderSteps} = this.getHtmlElements();
    const {left} = sliderProgress.getBoundingClientRect();
    const shift = this.value * 100 / (this.steps - 1);

    sliderThumb.style.left = `${shift}%`;
    sliderProgress.style.width = `${shift}%`;
  }

  userEvent(event) {
    const userEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(userEvent);
  }

  //-------------------------------------------------------------------------------------------------

  changeValue() {
    this.elem.addEventListener('click', (event) => this.onChangeValue(event));
    this.elem.addEventListener('click', (event) => this.selectSpan(event));
    this.elem.addEventListener('click', (event) => this.redrawSlider(event));
    this.elem.addEventListener('click', (event) => this.userEvent(event));
  }

  render() {
    const html = this.getHtml();
    this.elem = createElement(html);
    this.changeValue();
    return this.elem;
  }
}
