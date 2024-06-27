'use strict';

function createElement(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstElementChild;
}

export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  renderCol(col) {
    return `<td>${col}</td>`;
  }

  renderRowElem(row) {
    let html = '';
    for (let key in row) {
      html += this.renderCol(row[key]);
    }

    return html;
  }

  renderRow(row) {
    return `<tr>${this.renderRowElem(row)}</tr>`;
  }

  renderRows() {
    const rows = this.rows;
    return rows.map(row => this.renderRow(row));
  }

  tableTemplate() {
    return `
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.renderRows()}
        </tbody>
      </table>
    `;
  }

  addButton() {
    const rows = Array.from(this.elem.querySelectorAll('tr'));
    const buttonCol = `<button>X</button>`;

    rows.forEach((row, index) => {
      if (!index) return;

      row.insertAdjacentHTML('beforeEnd', this.renderCol(buttonCol));
      const currentButton = row.querySelector('button');
      
      if (currentButton) {
        currentButton.addEventListener('click', () => row.remove());
      }
    });

  }

  render() {
    this.elem = createElement(this.tableTemplate());
    this.addButton();
    return this.elem;
  }
}
