// --- TIC TAC TOE INITIALIZATION ---
function initTTT(parent) {
    let board = ["","","","","","","","",""];
    const grid = document.createElement('div');
    grid.className = 'ttt-grid';
    
    for(let i=0; i<9; i++) {
        const cell = document.createElement('div');
        cell.className = 'ttt-cell';
        cell.setAttribute('data-index', i);
        cell.onclick = () => {
            if(board[i] === "") {
                board[i] = "X"; 
                cell.innerText = "X";
                stp++; updateStats();
                if(!checkWin(board)) setTimeout(() => aiMove(board, grid), 500);
            }
        };
        grid.appendChild(cell);
    }
    parent.appendChild(grid);
}

function aiMove(board, grid) {
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if(empty.length > 0) {
        let move = empty[Math.floor(Math.random() * empty.length)];
        board[move] = "O";
        grid.children[move].innerText = "O";
        grid.children[move].style.color = "#d4af37";
        checkWin(board);
    }
}

// --- SNAKE GAME FIX ---
function initSnake(parent) {
    const canvas = document.createElement('canvas');
    canvas.width = 280; canvas.height = 280;
    canvas.style.border = "2px solid #ddd";
    parent.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 5, y: 5};
    let dx = 1, dy = 0;
    let speed = 180 - (level * 12);

    const gameLoop = setInterval(() => {
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 280, 280); // Clear
        
        ctx.fillStyle = "#2ecc71"; // Snake
        snake.forEach(p => ctx.fillRect(p.x*10, p.y*10, 9, 9));
        
        ctx.fillStyle = "red"; // Food
        ctx.fillRect(food.x*10, food.y*10, 9, 9);
        
        let head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        if(head.x === food.x && head.y === food.y) {
            food = {x: Math.floor(Math.random()*27), y: Math.floor(Math.random()*27)};
            stp++; updateStats();
            if(stp >= 10) { clearInterval(gameLoop); triggerWin(); }
        } else { snake.pop(); }

        if(head.x < 0 || head.x > 27 || head.y < 0 || head.y > 27) {
            clearInterval(gameLoop); triggerLoss();
        }
    }, speed);
}

function checkWin(board) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let p of wins) {
        if(board[p[0]] && board[p[0]]==board[p[1]] && board[p[0]]==board[p[2]]) {
            triggerWin(); return true;
        }
    }
    if(!board.includes("")) { showResult("DRAW", "gray"); return true; }
    return false;
}
