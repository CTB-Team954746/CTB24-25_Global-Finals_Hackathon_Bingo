const gridSize = 3;
const grid = document.getElementById('bingo-grid');
const bingoCountEl = document.getElementById('bingo-count');
const resetBtn = document.getElementById('reset-button');

const cellTexts = [
  'I don’t deserve to be here', 'Everyone else is smarter than me', 'I just got lucky',
  'I’m afraid they’ll discover I’m not good enough', 'It’s only a matter of time before I’m exposed', 'I’m just faking it well',
  'My achievements are overrated', 'I can’t ask questions – I’ll look stupid', 'I don’t belong here',
];

let completed = [];

function initGame() {
  grid.innerHTML = '';
  completed = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = cellTexts[i];
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    cell.addEventListener('click', () => {
      completed[row][col] = !completed[row][col];
      cell.classList.toggle('completed');
      updateBingoCount();
    });

    grid.appendChild(cell);
  }

  updateBingoCount();
}

function updateBingoCount() {
  let count = 0;

  // 行
  for (let row of completed) {
    if (row.every(c => c)) count++;
  }

  // 列
  for (let col = 0; col < gridSize; col++) {
    if (completed.every(row => row[col])) count++;
  }

  // 对角线
  if ([0, 1, 2].every(i => completed[i][i])) count++;
  if ([0, 1, 2].every(i => completed[i][gridSize - 1 - i])) count++;

  bingoCountEl.innerText = `Bingo: ${count}`;
}

resetBtn.addEventListener('click', () => {
  initGame();
});

initGame();
