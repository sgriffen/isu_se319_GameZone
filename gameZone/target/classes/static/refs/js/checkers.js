
var xKing;
var oKing;
var first;  //click one button that contains a piece and then another
var firstY;
var firstZ;

function check_init() {

    turnCount=0;
    board = document.getElementById('board');
//    x = "<img src='/images/checkers/blackCheck.jpg' class='game_piece'>";
//    o = "<img src='/images/checkers/whiteCheck.jpg' class='game_piece'>";
    xKing = "<img src='/images/checkers/blackKing.jpg' class='game_piece'>";
   oKing = "<img src='/images/checkers/whiteKing.jpg' class='game_piece'>";

    if (board != null) {
        for (var i = 0; i < board.rows.length; i++) {
            for (var j = 0; j < board.rows[i].cells.length; j++){
                if(i%2 != 0 && j <= 2){
                    board.rows[i].cells[j].innerHTML = x;}
                if(i%2 != 0 && j >= 5){
                    board.rows[i].cells[j].innerHTML = o;}
                board.rows[i].cells[j].onclick = function () {
                checkers_move(this,i,j);
                };
            }
        }
    }

    first = true;
    firstY = -1;
    firstZ = -1;
}

function checkers_move(boardCell,y,z) {
    if(first == true){
        firstY = y;
        firstZ = z;
    }else {
        if(checkers_updateCell(boardCell, y, z)) {
            checkers_winCon();
            updateTurn();
            turnCount++;
            first = true;
        }
    }
}
//TODO, update to checkers functionality
function checkers_updateCell(boardCell, y, z) {
    if(boardCell.innerHTML==(x||xKing)||boardCell.innerHTML==(o||oKing)) {
        return false
    }
    if(myTurn && board.rows[firstY].cells[firstZ] == x) {
        if(board.rows[firstY+1].cells[firstZ+1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ+2)) {
            var newY = y;
            var newZ = z;
            var c = firstZ;
            for(var i=1; i<=7-firstY; i+=2) {
                if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY+i].cells[c+1].innerHTML = null;
                    if(firstY+i+1==7){board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;}
                    else{board.rows[firstY+i+1].cells[c+2].innerHTML =x;}
                    newY+=2;
                    newZ+=2;
                    c+=2;
                }
                else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)) {
                    board.rows[firstY+i].cells[c-1].innerHTML = null;
                    if(firstY+i+1==7){board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;}
                    else{board.rows[firstY+i+1].cells[c-2].innerHTML =x;}
                    newY+=2;
                    newZ-=2;
                    c-=2;
                }
                else{ return true; }
            }
        }
        else if(board.rows[firstY+1].cells[firstZ-1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ-2)) {
            var newY = y;
            var newZ = z;

            var c = firstZ;
            for(var i=1; i<=7-firstY; i+=2) {
                if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY+i].cells[c+1].innerHTML = null;
                    if(firstY+i+1==7){board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;}
                    else{board.rows[firstY+i+1].cells[c+2].innerHTML =x;}
                    newY+=2;
                    newZ+=2;
                    c+=2;}
                else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){
                    board.rows[firstY+i].cells[c-1].innerHTML = null;
                    if(firstY+i+1==7){board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;}
                    else{board.rows[firstY+i+1].cells[c-2].innerHTML =x;}
                    newY+=2;
                    newZ-=2;
                    c-=2;
                }
             }
             else{ return true; }
        }

        else if((y == firstY + 1 && z == firstZ + 1)||(y == firstY + 1 && z == firstZ - 1)) {
            if(y==7){boardCell.innerHTML = xKing;}
            else{boardCell.innerHTML =x;}
            return true;
        }
        else {
            return false;
        }
    }else if(!myTurn && board.rows[firstY].cells[firstZ] == o){
        if(board.rows[firstY-1].cells[firstZ+1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ+2)){
            var newY = y;
            var newZ = z;
            var c = firstZ;
            for(var i=firstY; i>=0; i-=2){
                if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c+1].innerHTML = null;
                    if(firstY-i-1==0){board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;}
                    else{board.rows[firstY-i-1].cells[c+2].innerHTML =o;}
                }
                    newY-=2;
                    newZ+=2;
                    c+=2;
            }
                else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c-1].innerHTML = null;
                    if(firstY-i-1==0){board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;}
                    else{board.rows[firstY-i-1].cells[c-2].innerHTML =o;}
                }
                    newY-=2;
                    newZ-=2;
                    c-=2;
         } else{return true;}

        else if(board.rows[firstY-1].cells[firstZ-1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ-2)){
            var newY = y;
            var newZ = z;
            var c = firstZ;
            for(var i=firstY; i>=0; i-=2){
                if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c+1].innerHTML = null;
                    if(firstY-i-1==0){board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;}
                    else{board.rows[firstY-i-1].cells[c+2].innerHTML =o;}}
                    newY-=2;
                    newZ+=2;
                    c+=2;}
                else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c-1].innerHTML = null;
                    if(firstY-i-1==0){board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;}
                    else{board.rows[firstY-i-1].cells[c-2].innerHTML =o;}}
                    newY-=2;
                    newZ-=2;
                    c-=2;}
                else{return true;}

        else if((y == firstY - 1 && z == firstZ + 1)||(y == firstY - 1 && z == firstZ - 1)){

            if(y==0){boardCell.innerHTML = oKing;}
            else{boardCell.innerHTML =o;}
            return true;}
        else{
            return false;}
    }
    else if(myTurn && board.rows[firstY].cells[firstZ] == xKing){

        if(board.rows[firstY+1].cells[firstZ+1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ+2)){
            var newY = y;
            var newZ = z;
            var c = firstZ;
            for(var i=1; i<=7-firstY; i+=2){
                if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY+i].cells[c+1].innerHTML = null;
                    board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;
                    newY+=2;
                    newZ+=2;
                    c+=2;}

                else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){
                    board.rows[firstY+i].cells[c-1].innerHTML = null;
                    board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;
                    newY+=2;
                    newZ-=2;
                    c-=2;}
                else{return true;}}}

        else if(board.rows[firstY+1].cells[firstZ-1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ-2)){
            var newY = y;
            var newZ = z;

            var c = firstZ;
            for(var i=1; i<=7-firstY; i+=2){
                if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY+i].cells[c+1].innerHTML = null;
                    board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;
                    newY+=2;
                    newZ+=2;
                    c+=2;}
                else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){
                    board.rows[firstY+i].cells[c-1].innerHTML = null;
                    board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;
                    newY+=2;
                    newZ-=2;
                    c-=2;}}
                else{return true;}}


        else if((y == firstY + 1 && z == firstZ + 1)||(y == firstY + 1 && z == firstZ - 1)){
            boardCell.innerHTML = xKing;
            return true;}
        else{
            return false;}

        if(board.rows[firstY-1].cells[firstZ+1].innerHTML == (o||oKing) && (y ==firstY-2 && z == firstZ+2)){
            var newY = y;
            var newZ = z;
            var c = firstZ;
            for(var i=firstY; i>=0; i-=2){
                if(board.rows[firstY-i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c+1].innerHTML = null;
                    board.rows[firstY-i-1].cells[c+2].innerHTML =xKing;
                    newY-=2;
                    newZ+=2;
                    c+=2;}
                else if(board.rows[firstY-i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c-1].innerHTML = null;
                    board.rows[firstY-i-1].cells[c-2].innerHTML =xKing;
                    newY-=2;
                    newZ-=2;
                    c-=2;}
                else{return true;}

        else if(board.rows[firstY-1].cells[firstZ-1].innerHTML == (o||oKing) && (y ==firstY-2 && z == firstZ-2)){
            var newY = y;
            var newZ = z;
            var c = firstZ;
            for(var i=firstY; i>=0; i-=2){
                if(board.rows[firstY-i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c+1].innerHTML = null;
                    board.rows[firstY-i-1].cells[c+2].innerHTML =xKing;
                    newY-=2;
                    newZ+=2;
                    c+=2;}
                else if(board.rows[firstY-i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){
                    board.rows[firstY-i].cells[c-1].innerHTML = null;
                    board.rows[firstY-i-1].cells[c-2].innerHTML =xKing;
                    newY-=2;
                    newZ-=2;
                    c-=2;}
                else{return true;}

        else if((y == firstY - 1 && z == firstZ + 1)||(y == firstY - 1 && z == firstZ - 1)){

            boardCell.innerHTML = xKing;
            return true;}
        else{
            return false;}

        }
		else if(!myTurn && board.rows[firstY].cells[firstZ] == oKing){

			if(board.rows[firstY+1].cells[firstZ+1].innerHTML == (x||xKing) && (y ==firstY+2 && z == firstZ+2)){
				var newY = y;
				var newZ = z;
				var c = firstZ;
				for(var i=1; i<=7-firstY; i+=2){
					if(board.rows[firstY+i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){
						board.rows[firstY+i].cells[c+1].innerHTML = null;
						board.rows[firstY+i+1].cells[c+2].innerHTML = oKing;
						newY+=2;
						newZ+=2;
						c+=2;}

					else if(board.rows[firstY+i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){
						board.rows[firstY+i].cells[c-1].innerHTML = null;
						board.rows[firstY+i+1].cells[c-2].innerHTML = oKing;
						newY+=2;
						newZ-=2;
						c-=2;}
					else{return true;}}}

			else if(board.rows[firstY+1].cells[firstZ-1].innerHTML == (x||xKing) && (y ==firstY+2 && z == firstZ-2)){
				var newY = y;
				var newZ = z;

				var c = firstZ;
				for(var i=1; i<=7-firstY; i+=2){
					if(board.rows[firstY+i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){
						board.rows[firstY+i].cells[c+1].innerHTML = null;
						board.rows[firstY+i+1].cells[c+2].innerHTML = oKing;
						newY+=2;
						newZ+=2;
						c+=2;}
					else if(board.rows[firstY+i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){
						board.rows[firstY+i].cells[c-1].innerHTML = null;
						board.rows[firstY+i+1].cells[c-2].innerHTML = oKing;
						newY+=2;
						newZ-=2;
						c-=2;}}
					else{return true;}}


			else if((y == firstY + 1 && z == firstZ + 1)||(y == firstY + 1 && z == firstZ - 1)){
				boardCell.innerHTML = oKing;
				return true;}
			else{
				return false;}

			if(board.rows[firstY-1].cells[firstZ+1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ+2)){
				var newY = y;
				var newZ = z;
				var c = firstZ;
				for(var i=firstY; i>=0; i-=2){
					if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){
						board.rows[firstY-i].cells[c+1].innerHTML = null;
						board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;
						newY-=2;
						newZ+=2;
						c+=2;
					}
					else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){
						board.rows[firstY-i].cells[c-1].innerHTML = null;
						board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;
						newY-=2;
						newZ-=2;
						c-=2;
					}
					else{return true;}

			else if(board.rows[firstY-1].cells[firstZ-1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ-2)){
				var newY = y;
				var newZ = z;
				var c = firstZ;
				for(var i=firstY; i>=0; i-=2){
					if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){
						board.rows[firstY-i].cells[c+1].innerHTML = null;
						board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;
						newY-=2;
						newZ+=2;
						c+=2;}
					else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){
						board.rows[firstY-i].cells[c-1].innerHTML = null;
						board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;
						newY-=2;
						newZ-=2;
						c-=2;}
					else{return true;}

			else if((y == firstY - 1 && z == firstZ + 1)||(y == firstY - 1 && z == firstZ - 1)){

				boardCell.innerHTML = oKing;
				return true;}
			else{
				return false;} +

	}



		return true
	}
function checkers_winCon() {

    var found = false;
	for (var i = 0; i < board.rows.length; i++) {
	    for (var j = 0; j < board.rows[i].cells.length; j++){
		    if(myturn==true){
				if(board.rows[i].cells[j].innerHTML == (o||oKing)){found = true;}
			}
			if(myturn==false){
				if(board.rows[i].cells[j].innerHTML == (x||xKing)){ found = true; }
			}
		}
	}
	if(found == false && myturn == true){
		if(confirm('Player 1 wins\nNew game?'))
			location.reload();
	}
	if(found == false && myturn == false){
		if(confirm('Player 2 wins\nNew game?'))
			location.reload();
	}
}
function winCon(y,z) {
    if(turnCount>=8){
        if(confirm('Cats game\nNew game?')){
            location.reload();
        }
    }
    for (var i = 0; i < 3; i++) {
        if((board.rows[i].cells[0].innerHTML==x&&board.rows[i].cells[1].innerHTML==x&&board.rows[i].cells[2].innerHTML==x)||
            (board.rows[0].cells[i].innerHTML==x&&board.rows[1].cells[i].innerHTML==x&&board.rows[2].cells[i].innerHTML==x)){
                if(confirm('X wins\nNew game?'))
                    location.reload();
        }
        if((board.rows[i].cells[0].innerHTML==o&&board.rows[i].cells[1].innerHTML==o&&board.rows[i].cells[2].innerHTML==o)||
            (board.rows[0].cells[i].innerHTML==o&&board.rows[1].cells[i].innerHTML==o&&board.rows[2].cells[i].innerHTML==o)){
                if(confirm('O wins\nNew game?'))
                    location.reload();
        }
    }

    if((board.rows[0].cells[0].innerHTML==o&&board.rows[1].cells[1].innerHTML==o&&board.rows[2].cells[2].innerHTML==o)||
        (board.rows[0].cells[2].innerHTML==o&&board.rows[1].cells[1].innerHTML==o&&board.rows[2].cells[0].innerHTML==o)){
            if(confirm('O wins\nNew game?'))
                location.reload();
    } else if((board.rows[0].cells[0].innerHTML==x&&board.rows[1].cells[1].innerHTML==x&&board.rows[2].cells[2].innerHTML==x)||
        (board.rows[0].cells[2].innerHTML==x&&board.rows[1].cells[1].innerHTML==x&&board.rows[2].cells[0].innerHTML==x)){
            if(confirm('X wins\nNew game?'))
                location.reload();
    }
}