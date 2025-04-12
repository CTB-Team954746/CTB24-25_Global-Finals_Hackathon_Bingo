const gridSize = 5;
const grid = document.getElementById('bingo-grid');
const bingoCountEl = document.getElementById('bingo-count');
const resetBtn = document.getElementById('reset-button');

// 文字内容占位（25格）
const cellTexts = [
  '文本1', '文本2', '文本3', '文本4', '文本5',
  '文本6', '文本7', '文本8', '文本9', '文本10',
  '文本11', '文本12', '文本13', '文本14', '文本15',
  '文本16', '文本17', '文本18', '文本19', '文本20',
  '文本21', '文本22', '文本23', '文本24', '文本25'
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
  if ([0, 1, 2, 3, 4].every(i => completed[i][i])) count++;
  if ([0, 1, 2, 3, 4].every(i => completed[i][gridSize - 1 - i])) count++;

  bingoCountEl.innerText = `已完成 Bingo: ${count}`;
}

resetBtn.addEventListener('click', () => {
  initGame();
});

initGame();
