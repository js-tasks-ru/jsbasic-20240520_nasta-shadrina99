function highlight(table) {
  const rows = table.rows;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    //status
    const statusElement = row.cells[3];
    const attributeValue = statusElement.dataset.available;
    if (!attributeValue) {
      row.hidden = true;
    } 

    if (attributeValue === "true") {
      row.classList.add('available');
    } 

    if (attributeValue === "false") {
      row.classList.add('unavailable');
    }
  
    //gender
    const genderElement = row.cells[2];
    const content = genderElement.textContent;
    if (content === "m") {
      row.classList.add('male');
    }

    if (content === "f") {
      row.classList.add('female');
    }
    
    //age
    const ageElement = row.cells[1];
    const age = Number(ageElement.textContent);
    if (age < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}

