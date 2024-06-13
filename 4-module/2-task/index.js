function makeDiagonalRed(table) {
  const rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    row.cells[i].style.background = 'red';
  }
}
