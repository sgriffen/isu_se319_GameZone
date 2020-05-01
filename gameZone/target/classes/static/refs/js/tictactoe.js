var board;
var x;
var o;

function tac_init() {

    board = document.getElementById('board');
    x = "<img class='game_piece' src='/images/x.png'>";
    o = "<img class='game_piece' src='/images/o.png'>";

    if (board != null) {
        for (var i = 0; i < board.rows.length; i++) {
            for (var j = 0; j < board.rows[i].cells.length; j++)
                board.rows[i].cells[j].onclick = function () {
                tac_move(this,i,j);
                };
        }
    }
}
function tac_move(boardCell,y,z) {
    if(updateCell(boardCell, boardCell.innerHTML)){
        sendBoard();
        turnCount++;
    }
}