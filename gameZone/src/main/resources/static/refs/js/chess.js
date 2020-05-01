var chessGame;
var pending;

var w_pawn;
var w_knight;
var w_bishop;
var w_rook;
var w_queen;
var w_king;
var b_pawn;
var b_knight;
var b_bishop;
var b_rook;
var b_queen;
var b_king;

function chess_init() {

    chessGame = new Chess();

    board = document.getElementById("board");

    w_pawn    = "<img class='game_piece' src='/images/chess/w_pawn.png'>";
    w_knight  = "<img class='game_piece' src='/images/chess/w_knight.png'>";
    w_bishop  = "<img class='game_piece' src='/images/chess/w_bishop.png'>";
    w_rook    = "<img class='game_piece' src='/images/chess/w_rook.png'>";
    w_queen   = "<img class='game_piece' src='/images/chess/w_queen.png'>";
    w_king    = "<img class='game_piece' src='/images/chess/w_king.png'>";
    b_pawn    = "<img class='game_piece' src='/images/chess/b_pawn.png'>";
    b_knight  = "<img class='game_piece' src='/images/chess/b_knight.png'>";
    b_bishop  = "<img class='game_piece' src='/images/chess/b_bishop.png'>";
    b_rook    = "<img class='game_piece' src='/images/chess/b_rook.png'>";
    b_queen   = "<img class='game_piece' src='/images/chess/b_queen.png'>";
    b_king    = "<img class='game_piece' src='/images/chess/b_king.png'>";

    pending = null;

    //fill black spaces
    board.rows[0].cells[0].innerHTML = b_rook;
    board.rows[0].cells[1].innerHTML = b_knight;
    board.rows[0].cells[2].innerHTML = b_bishop;
    board.rows[0].cells[3].innerHTML = b_queen;
    board.rows[0].cells[4].innerHTML = b_king;
    board.rows[0].cells[5].innerHTML = b_bishop;
    board.rows[0].cells[6].innerHTML = b_knight;
    board.rows[0].cells[7].innerHTML = b_rook;
    board.rows[1].cells[0].innerHTML = b_pawn;
    board.rows[1].cells[1].innerHTML = b_pawn;
    board.rows[1].cells[2].innerHTML = b_pawn;
    board.rows[1].cells[3].innerHTML = b_pawn;
    board.rows[1].cells[4].innerHTML = b_pawn;
    board.rows[1].cells[5].innerHTML = b_pawn;
    board.rows[1].cells[6].innerHTML = b_pawn;
    board.rows[1].cells[7].innerHTML = b_pawn;

    //fill white spaces
    board.rows[7].cells[0].innerHTML = w_rook;
    board.rows[7].cells[1].innerHTML = w_knight;
    board.rows[7].cells[2].innerHTML = w_bishop;
    board.rows[7].cells[3].innerHTML = w_queen;
    board.rows[7].cells[4].innerHTML = w_king;
    board.rows[7].cells[5].innerHTML = w_bishop;
    board.rows[7].cells[6].innerHTML = w_knight;
    board.rows[7].cells[7].innerHTML = w_rook;
    board.rows[6].cells[0].innerHTML = w_pawn;
    board.rows[6].cells[1].innerHTML = w_pawn;
    board.rows[6].cells[2].innerHTML = w_pawn;
    board.rows[6].cells[3].innerHTML = w_pawn;
    board.rows[6].cells[4].innerHTML = w_pawn;
    board.rows[6].cells[5].innerHTML = w_pawn;
    board.rows[6].cells[6].innerHTML = w_pawn;
    board.rows[6].cells[7].innerHTML = w_pawn;
}

function chess_move(cell) {
    let pos = cell.id;
    if (pending == null) {

        cell.style = "background-color: rgba(240, 255, 0, 0.5);"
        pending = {
            "cell": cell,
            "position": pos
        };
    } else {

        if (chessGame.move({ from: pending.position, to: pos }) != null) {
            cell.innerHTML = pending.cell.innerHTML;
            pending.cell.innerHTML = "";

            sendBoard();
        }
        pending.cell.style = "";
        pending = null;
    }
}
function chess_sendBoard() {

    let i = 0;
    let j = 0;

    let chessGame_board = chessGame.board();
    let board_translated = [[], [], [], [], [], [], [], []];
    //translate game board;
    for (i = 0; i < chessGame_board.length; i++) {
        for (j = 0; j < chessGame_board[i].length; j++) {
            let cell = chessGame_board[i][j];
            if (cell != null) {
                if (cell.color == "b") { //piece is black
                    if (cell.type == "p") { board_translated[i].push(1); }       //piece is pawn
                    else if (cell.type == "b") { board_translated[i].push(2); } //piece is bishop
                    else if (cell.type == "n") { board_translated[i].push(3); } //piece is knight
                    else if (cell.type == "r") { board_translated[i].push(4); } //piece is rook
                    else if (cell.type == "q") { board_translated[i].push(5); } //piece is queen
                    else if (cell.type == "k") { board_translated[i].push(6); } //piece is king
                } else { //piece is white
                    if (cell.type == "p") { board_translated[i].push(7); }      //piece is pawn
                    else if (cell.type == "b") { board_translated[i].push(8); } //piece is bishop
                    else if (cell.type == "n") { board_translated[i].push(9); } //piece is knight
                    else if (cell.type == "r") { board_translated[i].push(10); } //piece is rook
                    else if (cell.type == "q") { board_translated[i].push(11); } //piece is queen
                    else if (cell.type == "k") { board_translated[i].push(12); } //piece is king
                }
            } else { board_translated[i].push(0); }
        }
    }

    sendBackend(204,board_translated,2,GSID);
}
function chess_updateBoard(updateTo_fen) {

    let i = 0;
    let j = 0;

    chess_clearBoard();
//    for (i = 0; i < updateTo[i].length; i++) {
//        let letter;
//        if      (i == 0) { letter = 'a'; }
//        else if (i == 1) { letter = 'b'; }
//        else if (i == 2) { letter = 'c'; }
//        else if (i == 3) { letter = 'd'; }
//        else if (i == 4) { letter = 'e'; }
//        else if (i == 5) { letter = 'f'; }
//        else if (i == 6) { letter = 'g'; }
//        else if (i == 7) { letter = 'h'; }
//        for (j = 0; j < updateTo.length; j++) {
//            let cell = updateTo[i][j];
//            switch(cell) {
//
//                case 1:
//                    chessGame.put({ type: 'p', color: 'b' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = b_pawn;
//                    break;
//                case 2:
//                    chessGame.put({ type: 'b', color: 'b' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = b_bishop;
//                    break;
//                case 3:
//                    chessGame.put({ type: 'n', color: 'b' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = b_knight;
//                    break;
//                case 4:
//                    chessGame.put({ type: 'r', color: 'b' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = b_rook;
//                    break;
//                case 5:
//                    chessGame.put({ type: 'q', color: 'b' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = b_queen;
//                    break;
//                case 6:
//                    chessGame.put({ type: 'k', color: 'b' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = b_king;
//                    break;
//                case 7:
//                    chessGame.put({ type: 'p', color: 'w' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = w_pawn;
//                    break;
//                case 8:
//                    chessGame.put({ type: 'b', color: 'w' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = w_bishop;
//                    break;
//                case 9:
//                    chessGame.put({ type: 'n', color: 'w' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = w_knight;
//                    break;
//                case 10:
//                    chessGame.put({ type: 'r', color: 'w' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = w_rook;
//                    break;
//                case 11:
//                    chessGame.put({ type: 'q', color: 'w' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = w_queen;
//                    break;
//                case 12:
//                    chessGame.put({ type: 'k', color: 'w' }, letter + j);
//                    board.rows[i].cells[j].innerHTML = w_king;
//                    break;
//            }
//        }
//    }

    chessGame.load(updateTo_fen);
    let chessGame_board = chessGame.board();
    for (i = 0; i < chessGame_board.length; i++) {
        for (j = 0; j < chessGame_board[i].length; j++) {
            let cell = chessGame_board[i][j];
            if (cell != null) {
                if (cell.color == "b") { //piece is black
                    if (cell.type == "p") { board.rows[i].cells[j].innerHTML = b_pawn; }       //piece is pawn
                    else if (cell.type == "b") { board.rows[i].cells[j].innerHTML = b_bishop; } //piece is bishop
                    else if (cell.type == "n") { board.rows[i].cells[j].innerHTML = b_knight; } //piece is knight
                    else if (cell.type == "r") { board.rows[i].cells[j].innerHTML = b_rook; } //piece is rook
                    else if (cell.type == "q") { board.rows[i].cells[j].innerHTML = b_queen; } //piece is queen
                    else if (cell.type == "k") { board.rows[i].cells[j].innerHTML = b_king; } //piece is king
                } else { //piece is white
                    if (cell.type == "p") { board.rows[i].cells[j].innerHTML = w_pawn; }      //piece is pawn
                    else if (cell.type == "b") { board.rows[i].cells[j].innerHTML = w_bishop; } //piece is bishop
                    else if (cell.type == "n") { board.rows[i].cells[j].innerHTML = w_knight; } //piece is knight
                    else if (cell.type == "r") { board.rows[i].cells[j].innerHTML = w_rook; } //piece is rook
                    else if (cell.type == "q") { board.rows[i].cells[j].innerHTML = w_queen; } //piece is queen
                    else if (cell.type == "k") { board.rows[i].cells[j].innerHTML = w_king; } //piece is king
                }
            } else { board.rows[i].cells[j].innerHTML = null; }
        }
    }
}
function chess_clearBoard() {

    let i = 0;
    let j = 0;

    for (i = 0; i < board.rows.length; i++) {
        for(j = 0; j < board.rows[i].cells.length; j++) { board.rows[i].cells[j].innerHTML = null; }
    }

//    chessGame.clear();
}