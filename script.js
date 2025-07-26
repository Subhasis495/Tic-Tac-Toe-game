let board = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = "X";
        let scores = { "X": 0, "O": 0 };
        const boardElement = document.getElementById("board");
        const statusElement = document.getElementById("status");
        const scoreXElement = document.getElementById("scoreX");
        const scoreOElement = document.getElementById("scoreO");

        function createBoard() {
            boardElement.innerHTML = "";
            board.forEach((cell, index) => {
                let cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.textContent = cell;
                if (cell) cellElement.classList.add(cell);
                cellElement.addEventListener("click", () => makeMove(index));
                boardElement.appendChild(cellElement);
            });
        }

        function makeMove(index) {
            if (board[index] === "" && !checkWinner()) {
                board[index] = currentPlayer;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                createBoard();
                let winner = checkWinner();
                if (winner) {
                    statusElement.textContent = winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
                    if (winner !== "Tie") {
                        scores[winner]++;
                        updateScoreboard();
                    }
                } else if (currentPlayer === "O") {
                    setTimeout(aiMove, 500);
                }
            }
        }

        function aiMove() {
            let emptyCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
            if (emptyCells.length > 0) {
                let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                board[randomIndex] = "O";
                currentPlayer = "X";
                createBoard();
                let winner = checkWinner();
                if (winner) {
                    statusElement.textContent = winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
                    if (winner !== "Tie") {
                        scores[winner]++;
                        updateScoreboard();
                    }
                }
            }
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (let pattern of winPatterns) {
                let [a, b, c] = pattern;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                }
            }
            return board.includes("") ? null : "Tie";
        }

        function updateScoreboard() {
            scoreXElement.textContent = scores["X"];
            scoreOElement.textContent = scores["O"];
        }

        function resetGame() {
            board = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            statusElement.textContent = "";
            createBoard();
        }

        createBoard();