var document;
var game;
var id = 0;
var socket;
var GSID;
var tacGame;
var checkGame;
var chessBoard;
var requestPrefix = "localhost:8080/";
//var requestPrefix = "coms-319-052.cs.iastate.edu:8080/";
var myTurn = true;
var turnCount=0;
var storage=window.localStorage;
var turnCount = 0;
var p1 = true;
var ai_opponent = false;

var init=function(screen) {

    getTicHtml();
//    getCheckHtml();
    getChessHtml();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4 && this.status===200) {
            socket_xhr(this);
      }
    });

	document=screen;
	if (storage.getItem("userID") == null) {
	    xhr.open("POST", "http://" + requestPrefix + "user/generate/token",true);
	    xhr.send();
	} else { socket_xhr(null); }
}

function socket_xhr(xhr) {

    if (xhr != null) {
        id = JSON.parse(xhr.response).payload;
        storage.setItem("userID", id);
    } else { id = storage.getItem("userID"); }

    socket = new WebSocket("ws://" + requestPrefix + "websocket/" + id);

    socket.onmessage = function(event) {
		msg=JSON.parse(event.data);
//    	alert("[message] Data received from server: " + msg.payload.payload);
		switch(msg.intent){
			case 202:
			if(msg.payload.status>=550)
				break;//fix this later
			invitation(msg);
			break;
			case 203:
			if(msg.payload.status>=550)
				break;//fix this later
			if(msg.payload.payload=="") {
				alert("request rejected");
				break;
			}
			GSID=msg.payload.payload
			accepted();
			break;
			case 204:
			if(msg.payload.status>=550)
				break;//fix this later
			updateBoard(msg.payload.payload);
			break;
			case 205:
			if(msg.payload.status>=550)
				break;//fix this later
			if(msg.payload.payload==2)
				alert("you lose");
			if(msg.payload.payload==1)
				alert("you win");
			if(msg.payload.payload==0)
				alert("Tie game");
			GSID=0;
			location.reload();
			break;
		}
    };

    socket.onclose = function(event) {
        //document.getElementById("connected").innerHTML = "false";
        if (event.wasClean) {
            //alert("[close] Connection closed cleanly, code=${event.code} reason=${event.reason}");
        } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                //alert("[close] Connection died");
        }
    };
}

function updateBoard(newBoard) {
    switch (game) {

        case 1: //checkers

            break;
        case 2: //chess

            chess_updateBoard(newBoard);
            break;
        default : //tic tac toe
            for (var i = 0; i < board.rows.length; i++) {
                for (var j = 0; j < board.rows[i].cells.length; j++){
                        if(newBoard[i][j]==1) {
                            board.rows[i].cells[j].innerHTML=x
                            board.rows[i].cells[j].value=1
                        }else if(newBoard[i][j]==2) {
                            board.rows[i].cells[j].innerHTML=o
                            board.rows[i].cells[j].value=2
                        }else{
                            board.rows[i].cells[j].innerHTML=""
                            board.rows[i].cells[j].value=0
                        }
                }
            }
            break;
    }

    updateTurn();
}
var closeSocket=function(){
	socket.close();
}

//Sets the page to display game based on selection.
function accepted(){
	if(game == 0){
		document.getElementById('onCenter').innerHTML=tacGame;
		tac_init();
	}
	else if(game == 1){
		document.getElementById('onCenter').innerHTML=checkGame;
		//check_init();
	}
	else if(game == 2) {
	    document.getElementById('onCenter').innerHTML=chessBoard;
        chess_init();
	}
}

function invitation(msg){
    switch (msg.payload.payload.integer) {

        case 1: //checkers
             if (confirm("Player " + msg.payload.payload.array[0] + " challenges you to a game of Checkers. Accept?")) {
                p1 = false;
                myTurn = false
                sendBackend(203, msg.payload.payload.array, msg.payload.payload.integer, msg.payload.payload.array[1]);
            } else {
                let json = {
                    "intent": 203,
                    "payload": {
                        "array": [msg.payload.payload.array[0]
                        ],
                        "integer": 100
                    },
                    "identifier": id
                };

                socket.send(JSON.stringify(json));
            }
            break;
        case 2: //chess
             if (confirm("Player " + msg.payload.payload.array[0] + " challenges you to a game of Chess. Accept?")) {
                    p1 = false;
                    myTurn = false;
                    sendBackend(203, msg.payload.payload.array, msg.payload.payload.integer, msg.payload.payload.array[1]);
             } else {
                let json = {
                    "intent": 203,
                    "payload": {
                        "array": [msg.payload.payload.array[0]
                        ],
                        "integer": 100
                    },
                    "identifier": id
                };

                socket.send(JSON.stringify(json));
             }
            break;
        default: //tic tac toe
            if (confirm("Player " + msg.payload.payload.array[0] + " challenges you to a game of Tic Tac Toe. Accept?")) {
                p1 = false;
                myTurn = false;
                sendBackend(203, msg.payload.payload.array, msg.payload.payload.integer, msg.payload.payload.array[1]);
            } else {
                let json = {
                    "intent": 203,
                    "payload": {
                        "array": [msg.payload.payload.array[0]
                        ],
                        "integer": 100
                    },
                    "identifier": id
                };

                socket.send(JSON.stringify(json));
            }
            break;
    }
}

function selectGame(g) {
	game=g;
	document.getElementById('onCenter').innerHTML = "<h style='color:#ff9900;'>Your player ID is <h>"+id+
	"<br>"+
	"<br>"+
	"<br>"+
	"<form><label for='PvA' style='color:#ff9900;'>who do you want to play against </label><select id='PvA'><option value='player'>Player</option> <option value='AI'>AI</option></select>"+
	"<br>"+
	"<br>"+
	"<label for='requestID' style='color:#ff9900;'>if player, input their ID <input type='text' id='requestID'></label>"+
	"<button type='button' onclick='playerSelect()'>Connect</button>";
}
	
	function sendBoard() {
	    switch (game) {


        case 1: //checkers

            break;
        case 2: //chess

            chess_sendBoard();
            break;
        default: //tic tac toe
            var board = document.getElementById('board');
            let arr = [[],[],[]];
            for (var i = 0; i < board.rows.length; i++) {
                for (var j = 0; j < board.rows[i].cells.length; j++){
                        if(board.rows[i].cells[j].value==1)
                            arr[i].push(1);
                        else if(board.rows[i].cells[j].value==2)
                            arr[i].push(2);
                        else
                            arr[i].push(0);
                }
            }
            sendBackend(204,arr,0,GSID);
            break;
    }
}
	
var requestHuman=function(requested){
    let array = [requested];
	sendBackend(202,array,game,id);
}

var requestAI=function(){
    ai_opponent = true;
    let ai = ["AI"];
	sendBackend(202,ai,game,id);
}


var updateCell = function(boardCell,contents) {
	let ex="<img src='images/x.png' style='width:95%;height:95%;'>";
	let oh="<img src='images/o.png' style='width:95%;height:95%;'>";
    if(contents==ex||contents==oh||myTurn==false)
        return false

    if(p1){
        boardCell.innerHTML =x
        boardCell.value = 1
    }else{
        boardCell.innerHTML =o
        boardCell.value = 2
    }
    return true
}
function updateTurn() {
    if (!ai_opponent) {
        p=document.getElementById('turn');
        myTurn = !myTurn;
        if (myTurn) { p.innerHTML="It's your turn"; }
        else { p.innerHTML="It's your opponent's turn"; }
    }
}

var sendBackend = function(code,arra,integ,identif) {//this code oddity was made solely for testing
	let json = {
        "intent": code,
		"payload": {
			"array": arra,
			"integer": integ
		},
		"identifier": identif
	};
	
	socket.send(JSON.stringify(json));
}

function getTicHtml() {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "http://" + requestPrefix + "html/tictactoe",false);
    xhr.send();
    tacGame = xhr.response;
}

function getCheckHtml() {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "http://" + requestPrefix + "html/checkers",false);
    xhr.send();
    checkGame = xhr.response;
}

function getChessHtml() {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "http://" + requestPrefix + "html/chess",false);
    xhr.send();
    chessBoard = xhr.response;
}

function createFromHTML(htmlString) {

    let temp = document.createElement("template");
    temp.innerHTML = htmlString.trim();

    return temp.content.firstElementChild.innerHTML;
}

checkGame=
	"<h1>Checkers</h1>"+
	"<br>"+
	"<p id='turn'>It is Player 1's turn</p>"+
	"<br><br>"+
	"<table id='board'>"+
	"	<tr >"+
    "        <td class='tile-light' onclick='checkers_move(this,0,0)'></td>"+
    "        <td class='tile-dark' onclick='checkers_move(this,0,1)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,0,2)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,0,3)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,0,4)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,0,5)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,0,6)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,0,7)'></td>"+
    "    </tr>"+
	"	<tr >"+
    "        <td class='tile-dark' onclick='checkers_move(this,1,0)'></td>"+
    "        <td class='tile-light' onclick='checkers_move(this,1,1)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,1,2)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,1,3)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,1,4)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,1,5)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,1,6)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,1,7)'></td>"+
    "    </tr>"+
	"	<tr >"+
    "        <td class='tile-light' onclick='checkers_move(this,2,0)'></td>"+
    "        <td class='tile-dark' onclick='checkers_move(this,2,1)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,2,2)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,2,3)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,2,4)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,2,5)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,2,6)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,2,7)'></td>"+
    "    </tr>"+
	"	<tr >"+
    "        <td class='tile-dark' onclick='checkers_move(this,3,0)'></td>"+
    "        <td class='tile-light' onclick='checkers_move(this,3,1)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,3,2)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,3,3)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,3,4)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,3,5)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,3,6)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,3,7)'></td>"+
    "    </tr>"+
	"	<tr >"+
    "        <td class='tile-light' onclick='checkers_move(this,4,0)'></td>"+
    "        <td class='tile-dark' onclick='checkers_move(this,4,1)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,4,2)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,4,3)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,4,4)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,4,5)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,4,6)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,4,7)'></td>"+
    "    </tr>"+
    "    <tr >"+
    "        <td class='tile-dark' onclick='checkers_move(this,5,0)'></td>"+
    "        <td class='tile-light' onclick='checkers_move(this,5,1)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,5,2)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,5,3)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,5,4)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,5,5)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,5,6)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,5,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td class='tile-light' onclick='checkers_move(this,6,0)'></td>"+
    "        <td class='tile-dark' onclick='checkers_move(this,6,1)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,6,2)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,6,3)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,6,4)'></td>"+
	"        <td class='tile-dark' onclick='checkers_move(this,6,5)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,6,6)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,6,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td class='tile-dark' onclick='checkers_move(this,7,0)'></td>"+
    "        <td class='tile-light' onclick='checkers_move(this,7,1)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,7,2)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,7,3)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,7,4)'></td>"+
	"        <td class='tile-light' onclick='checkers_move(this,7,5)'></td>"+
	"		 <td class='tile-dark' onclick='checkers_move(this,7,6)'></td>"+
	"		 <td class='tile-light' onclick='checkers_move(this,7,7)'></td>"+
    "    </tr>"+
	"</table>"+
  "<script>"+
	"var board = document.getElementById('board');"+
	"var myTurn = true;"+
	"var turnCount=0;"+
	"var x='<img src='images/blackCheck.jpg' style='width:95%;height:95%;'>';"+
	"var o='<img src='images/whiteCheck.jpg' style='width:95%;height:95%;'>';"+
	"var xKing='<img src='images/blackKing.jpg' style='width:95%;height:95%;'>';"+
	"var oKing='<img src='images/whiteKing.jpg' style='width:95%;height:95%;'>';"+
	"if (board != null) {"+
	"	for (var i = 0; i < board.rows.length; i++) {"+
	"		for (var j = 0; j < board.rows[i].cells.length; j++){"+
	"			if(i%2 != 0 && j <= 2){"+
	"				board.rows[i].cells[j].innerHTML = x;}"
	"			if(i%2 != 0 && j >= 5){"+
	"				board.rows[i].cells[j].innerHTML = o;}"
	"			board.rows[i].cells[j].onclick = function () {"+
	"			checkers_move(this,i,j);"+
	"			};"+
	"	}}"+
	"}"+
	"var first = true;"+  //click one button that contains a piece and then another
	"var firstY = -1;"+
	"var firstZ = -1;"+
	"function checkers_move(boardCell,y,z) {"+
	"	if(first == true){"+
	"		firstY = y;"+
	"		firstZ = z;}"+
	"	else{"+
	"		if(checkers_updateCell(boardCell, y, z)){"+
	"			checkers_winCon();"+
	"			updateTurn();"+
	"			turnCount++;"+
	"			first = true;"+
	"		}"+
	"	}"+
	"}"+
	//TODO, update to checkers functionality
	"function checkers_updateCell(boardCell, y, z) {"+
	"	if(boardCell.innerHTML==(x||xKing)||boardCell.innerHTML==(o||oKing))"+
	"		return false"+
	"	if(myTurn && board.rows[firstY].cells[firstZ] == x){"+
	
	"		if(board.rows[firstY+1].cells[firstZ+1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ+2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=1; i<=7-firstY; i+=2){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					if(firstY+i+1==7){board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;}"+
	"					else{board.rows[firstY+i+1].cells[c+2].innerHTML =x;}"+
	"					newY+=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					if(firstY+i+1==7){board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;}"+
	"					else{board.rows[firstY+i+1].cells[c-2].innerHTML =x;}"+
	"					newY+=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}}}"+
	
	"		else if(board.rows[firstY+1].cells[firstZ-1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ-2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	
	"			var c = firstZ;"+
	"			for(var i=1; i<=7-firstY; i+=2){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					if(firstY+i+1==7){board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;}"+
	"					else{board.rows[firstY+i+1].cells[c+2].innerHTML =x;}"+
	"					newY+=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					if(firstY+i+1==7){board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;}"+
	"					else{board.rows[firstY+i+1].cells[c-2].innerHTML =x;}"+
	"					newY+=2;"+
	"					newZ-=2;"+
	"					c-=2;}}"+
	"				else{return true;}}"+
	
	
	"		else if((y == firstY + 1 && z == firstZ + 1)||(y == firstY + 1 && z == firstZ - 1)){" +
	"			if(y==7){boardCell.innerHTML = xKing;}"+
	"			else{boardCell.innerHTML =x;}"+
	"			return true;}"+
	"		else{"+
	"			return false;}" +
	"	}else if(!myTurn && board.rows[firstY].cells[firstZ] == o){"+
	"		if(board.rows[firstY-1].cells[firstZ+1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ+2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=firstY; i>=0; i-=2){"+
	"				if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c+1].innerHTML = null;"+
	"					if(firstY-i-1==0){board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;}"+
	"					else{board.rows[firstY-i-1].cells[c+2].innerHTML =o;}}"+
	"					newY-=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c-1].innerHTML = null;"+
	"					if(firstY-i-1==0){board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;}"+
	"					else{board.rows[firstY-i-1].cells[c-2].innerHTML =o;}}"+
	"					newY-=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}"+
	
	"		else if(board.rows[firstY-1].cells[firstZ-1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ-2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=firstY; i>=0; i-=2){"+
	"				if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c+1].innerHTML = null;"+
	"					if(firstY-i-1==0){board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;}"+
	"					else{board.rows[firstY-i-1].cells[c+2].innerHTML =o;}}"+
	"					newY-=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c-1].innerHTML = null;"+
	"					if(firstY-i-1==0){board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;}"+
	"					else{board.rows[firstY-i-1].cells[c-2].innerHTML =o;}}"+
	"					newY-=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}"+
	
	"		else if((y == firstY - 1 && z == firstZ + 1)||(y == firstY - 1 && z == firstZ - 1)){" +
	
	"			if(y==0){boardCell.innerHTML = oKing;}"+
	"			else{boardCell.innerHTML =o;}"+
	"			return true;}"+
	"		else{"+
	"			return false;}" +
	"	}"+
	"	else if(myTurn && board.rows[firstY].cells[firstZ] == xKing){"+
	
	"		if(board.rows[firstY+1].cells[firstZ+1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ+2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=1; i<=7-firstY; i+=2){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;"+
	"					newY+=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;"+
	"					newY+=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}}}"+
	
	"		else if(board.rows[firstY+1].cells[firstZ-1].innerHTML == (o||oKing) && (y ==firstY+2 && z == firstZ-2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	
	"			var c = firstZ;"+
	"			for(var i=1; i<=7-firstY; i+=2){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c+2].innerHTML = xKing;"+
	"					newY+=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c-2].innerHTML = xKing;"+
	"					newY+=2;"+
	"					newZ-=2;"+
	"					c-=2;}}"+
	"				else{return true;}}"+
	
	
	"		else if((y == firstY + 1 && z == firstZ + 1)||(y == firstY + 1 && z == firstZ - 1)){" +
	"			boardCell.innerHTML = xKing;"+
	"			return true;}"+
	"		else{"+
	"			return false;}" +
	
	"		if(board.rows[firstY-1].cells[firstZ+1].innerHTML == (o||oKing) && (y ==firstY-2 && z == firstZ+2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=firstY; i>=0; i-=2){"+
	"				if(board.rows[firstY-i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c+2].innerHTML =xKing;"+
	"					newY-=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY-i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c-2].innerHTML =xKing;"+
	"					newY-=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}"+
	
	"		else if(board.rows[firstY-1].cells[firstZ-1].innerHTML == (o||oKing) && (y ==firstY-2 && z == firstZ-2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=firstY; i>=0; i-=2){"+
	"				if(board.rows[firstY-i].cells[c+1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c+2].innerHTML =xKing;"+
	"					newY-=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY-i].cells[c-1].innerHTML == (o||oKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c-2].innerHTML =xKing;"+
	"					newY-=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}"+
	
	"		else if((y == firstY - 1 && z == firstZ + 1)||(y == firstY - 1 && z == firstZ - 1)){" +
	
	"			boardCell.innerHTML = xKing;"+
	"			return true;}"+
	"		else{"+
	"			return false;}" +
	
	"}"
	
	
	
	
	"	else if(!myTurn && board.rows[firstY].cells[firstZ] == oKing){"+
	
	"		if(board.rows[firstY+1].cells[firstZ+1].innerHTML == (x||xKing) && (y ==firstY+2 && z == firstZ+2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=1; i<=7-firstY; i+=2){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c+2].innerHTML = oKing;"+
	"					newY+=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c-2].innerHTML = oKing;"+
	"					newY+=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}}}"+
	
	"		else if(board.rows[firstY+1].cells[firstZ-1].innerHTML == (x||xKing) && (y ==firstY+2 && z == firstZ-2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	
	"			var c = firstZ;"+
	"			for(var i=1; i<=7-firstY; i+=2){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c+2) && !board.rows[firstY+i+1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c+2].innerHTML = oKing;"+
	"					newY+=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY+i+1 && newZ == c-2) && !board.rows[firstY+i+1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY+i+1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY+i+1].cells[c-2].innerHTML = oKing;"+
	"					newY+=2;"+
	"					newZ-=2;"+
	"					c-=2;}}"+
	"				else{return true;}}"+
	
	
	"		else if((y == firstY + 1 && z == firstZ + 1)||(y == firstY + 1 && z == firstZ - 1)){" +
	"			boardCell.innerHTML = oKing;"+
	"			return true;}"+
	"		else{"+
	"			return false;}" +
	
	"		if(board.rows[firstY-1].cells[firstZ+1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ+2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=firstY; i>=0; i-=2){"+
	"				if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;"+
	"					newY-=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;"+
	"					newY-=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}"+
	
	"		else if(board.rows[firstY-1].cells[firstZ-1].innerHTML == (x||xKing) && (y ==firstY-2 && z == firstZ-2)){"+
	"			var newY = y;"+
	"			var newZ = z;"+
	"			var c = firstZ;"+
	"			for(var i=firstY; i>=0; i-=2){"+
	"				if(board.rows[firstY-i].cells[c+1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c+2) && !board.rows[firstY-i-1].cells[c+2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c+2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c+1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c+2].innerHTML =oKing;"+
	"					newY-=2;"+
	"					newZ+=2;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY-i].cells[c-1].innerHTML == (x||xKing) && (newY ==firstY-i-1 && newZ == c-2) && !board.rows[firstY-i-1].cells[c-2].innerHTML==(x||xKing)||!board.rows[firstY-i-1].cells[c-2].innerHTML==(o||oKing)){"+
	"					board.rows[firstY-i].cells[c-1].innerHTML = null;"+
	"					board.rows[firstY-i-1].cells[c-2].innerHTML =oKing;"+
	"					newY-=2;"+
	"					newZ-=2;"+
	"					c-=2;}"+
	"				else{return true;}"+
	
	"		else if((y == firstY - 1 && z == firstZ + 1)||(y == firstY - 1 && z == firstZ - 1)){" +
	
	"			boardCell.innerHTML = oKing;"+
	"			return true;}"+
	"		else{"+
	"			return false;}" +
	
	"}"
	
	
	
	"	return true"+
	"}"+
	"function checkers_winCon() {"+
	
	" var found = false;"+
	"	for (var i = 0; i < board.rows.length; i++) {"+
	"		for (var j = 0; j < board.rows[i].cells.length; j++){"+
	"			if(myturn==true){"+
	"				if(board.rows[i].cells[j].innerHTML == (o||oKing)){found = true;}}"+
	"			if(myturn==false){"+
	"				if(board.rows[i].cells[j].innerHTML == (x||xKing)){found = true;}}}}"+
	"	if(found == false && myturn == true){"+
	"		if(confirm('Player 1 wins\nNew game?'))"+
	"			location.reload();}"+
	"	if(found == false && myturn == false){"+
	"		if(confirm('Player 2 wins\nNew game?'))"+
	"			location.reload();}"+
	"	}"
	"function winCon(y,z) {"+
	"	if(turnCount>=8){"+
	"		if(confirm('Cats game\nNew game?')){"+
	"			location.reload();"+
	"		}"+
	"	}"+
	"	for (var i = 0; i < 3; i++) {"+
	"		if((board.rows[i].cells[0].innerHTML==x&&board.rows[i].cells[1].innerHTML==x&&board.rows[i].cells[2].innerHTML==x)||"+
	"		(board.rows[0].cells[i].innerHTML==x&&board.rows[1].cells[i].innerHTML==x&&board.rows[2].cells[i].innerHTML==x)){"+
	"			if(confirm('X wins\nNew game?'))"+
	"				location.reload();"+
	"		}"+
	"		if((board.rows[i].cells[0].innerHTML==o&&board.rows[i].cells[1].innerHTML==o&&board.rows[i].cells[2].innerHTML==o)||"+
	"		(board.rows[0].cells[i].innerHTML==o&&board.rows[1].cells[i].innerHTML==o&&board.rows[2].cells[i].innerHTML==o)){"+
	"			if(confirm('O wins\nNew game?'))"+
	"				location.reload();"+
	"		}"+
	"	}"+
		
	"	if((board.rows[0].cells[0].innerHTML==o&&board.rows[1].cells[1].innerHTML==o&&board.rows[2].cells[2].innerHTML==o)||"+
	"	(board.rows[0].cells[2].innerHTML==o&&board.rows[1].cells[1].innerHTML==o&&board.rows[2].cells[0].innerHTML==o)){"+
	"		if(confirm('O wins\nNew game?'))"+
	"			location.reload();"+
	"	}else if((board.rows[0].cells[0].innerHTML==x&&board.rows[1].cells[1].innerHTML==x&&board.rows[2].cells[2].innerHTML==x)||"+
	"	(board.rows[0].cells[2].innerHTML==x&&board.rows[1].cells[1].innerHTML==x&&board.rows[2].cells[0].innerHTML==x)){"+
	"		if(confirm('X wins\nNew game?'))"+
	"			location.reload();"+
	"	}"+
		
	"}"

var setmyTurn=function(tu){
	myTurn=tu;
}

var setPlayer=function(p){
	p1=p;
}

var setBackend=function(bac){
	sendBackend=bac;
}

var getSocket=function(){
	return socket;
}

var setStorage=function(sto){
	storage=sto;
}

module.exports = { setmyTurn,setPlayer,sendBackend,setBackend,updateCell,requestAI,requestHuman,init,getSocket,setStorage,closeSocket }
