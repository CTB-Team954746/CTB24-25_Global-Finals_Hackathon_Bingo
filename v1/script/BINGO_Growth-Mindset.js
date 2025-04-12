const gridSize = 3;
const grid = document.getElementById('bingo-grid');
const bingoCountEl = document.getElementById('bingo-count');
const resetBtn = document.getElementById('reset-button');

const cellTexts = [
  'I’m getting better every day', 'I deserve this opportunity', 'It’s okay to ask for help',
  'I failed, but I learned from it', 'This isn’t luck – I worked for it', 'I’m still learning',
  'I acknowledge my own worth', 'Everyone feels unsure sometimes', 'I’m proud of myself'
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
