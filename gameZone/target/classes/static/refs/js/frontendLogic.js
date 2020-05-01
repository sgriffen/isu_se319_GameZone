var document;
var game;
var id = 00000;
var socket;
var GSID;
var p1=true;

function init(screen) {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4 && this.status===200) {
            socket_xhr(this);
      }
    });

	document=screen;
	if (window.localStorage.getItem("userID") == null) {
//	    xhr.open("POST", "http://localhost:8080/user/generate/token",true);
	    xhr.open("POST", "http://coms-319-052.cs.iastate.edu:8080/user/generate/token");
	    xhr.send();
	} else { socket_xhr(null); }
}

function socket_xhr(xhr) {

    if (xhr != null) {
        id = JSON.parse(xhr.response).payload;
        window.localStorage.setItem("userID", id);
    } else { id = window.localStorage.getItem("userID"); }

//    socket = new WebSocket("ws://localhost:8080/websocket/" + id);//localhost
    socket = new WebSocket("ws://coms-319-052.cs.iastate.edu:8080/websocket/" + id);//localhost

    socket.onopen = function(e) {
        //document.getElementById("connected").innerHTML = "true";
        //alert("[open] Connection established");
        //alert("Sending to server");
        let json = {
            "intent": 201,
            "payload": "Hello there",
            "identifier": id
        };
        //socket.send(JSON.stringify(json));
    }


    socket.onmessage = function(event) {
		msg=JSON.parse(event.data);
//    	alert("[message] Data received from server: " + msg.payload.payload);
		switch(msg.intent){
			case 202:
			if(msg.payload.status>=550)
				break;//fix this later
			invitation(msg.payload);
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
			alert("you lose");
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

//Sets the page to display game based on selection.
function accepted(){
	if(game == 0){
		document.getElementById('onCenter').innerHTML=tacGame;
	}
	else if(game == 1){
		document.getElementById('onCenter').innerHTML=checkGame;
	}
}

function invitation(payload){
    switch (payload.payload.integer) {

        case 1: //checkers
             if (confirm("Player" + payload.payload.array[1] + " challenges you to a game of Checkers. Accept?")) {
                p1 = false;
                socket.send(JSON.stringify(payload));
            } else {
                let json = {
                    "intent": 203,
                    "payload": {
                        "array": [payload.payload.array[0]
                        ],
                        "integer": 100
                    },
                    "identifier": id
                };

                socket.send(JSON.stringify(json));
            }
            break;
        case 2: //chess
             if (confirm("Player" + payload.payload.array[1] + " challenges you to a game of Chess. Accept?")) {
                    p1 = false;
                    socket.send(JSON.stringify(payload));
             } else {
                let json = {
                    "intent": 203,
                    "payload": {
                        "array": [payload.payload.array[0]
                        ],
                        "integer": 100
                    },
                    "identifier": id
                };

                socket.send(JSON.stringify(json));
             }
            break;
        default: //tic tac toe
            if (confirm("Player" + payload.payload.array[1] + " challenges you to a game of Tic Tac Toe. Accept?")) {
                p1 = false;
                socket.send(JSON.stringify(payload));
            } else {
                let json = {
                    "intent": 203,
                    "payload": {
                        "array": [payload.payload.array[0]
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

function requestHuman(requested) {
	let json = {
            "intent": 202,
			"payload": {
				"array": [
					requested
				],
				"integer": game
			},
			"identifier": id
        };
        socket.send(JSON.stringify(json));
}

function requestAI(){
	let json = {
            "intent": 202,
			"payload": {
				"array": [
					"AI"
				],
				"integer": game
			},
			"identifier": id


        };
        socket.send(JSON.stringify(json));
}

	var myTurn = true;
	var turnCount = 0;

	function move(boardCell,y,z) {
		if(updateCell(boardCell)){
			sendBoard();
			turnCount++;
		}
	}
	function sendBoard() {
	    switch (game) {

	        case 1: //checkers


	        case 2: //chess


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

                let json = {
                        "intent": 204,
                        "payload": {
                        "array": arr,
                            "integer": 0
                        },
                        "identifier": GSID
                };
                break;
	    }
	
	socket.send(JSON.stringify(json));
	}
	
	function updateCell(boardCell) {
		if(boardCell.innerHTML==x||boardCell.innerHTML==o)
			return false
		
		if (p1) {
		    boardCell.innerHTML =x
		    boardCell.value = 1
		} else {
			boardCell.innerHTML =o
			boardCell.value = 2
		}
		return true
	}
	
	function updateTurn() {
		p=document.getElementById('turn');
		myTurn = !myTurn;
		if (myTurn) { p.innerHTML="It's your turn"; }
		else { p.innerHTML="It's your opponent's turn"; }
    }

var tacGame="<style scoped>"+
"table {"+
"  text-align: center;"+
"   width: 25%;"+
"   border-spacing: 0;"+
"}"+
"td {"+
"	border: 2px solid black;"+
"	border-collapse: collapse;"+
"    width: 16%;"+
"}"+
"</style>"+
	"<h1>Tic-Tac-Toe</h1>"+
	"<br>"+
	"<p id='turn'>It's your turn</p>"+
	"<br><br>"+
	"<table id='board'>"+
	"	<tr>"+
    "        <td style='border-top: none; border-left: none; height:100px;' onclick='move(this,0,0)'></td>"+
    "        <td style='border-top: none; height:100px;' onclick='move(this,0,1)'></td>"+
	"		<td style='border-top: none; border-right: none; height:100px;' onclick='move(this,0,2)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='border-left: none; height:100px;' onclick='move(this,1,0)'></td>"+
    "        <td style='height:100px;' onclick='move(this,1,1)'></td>"+
	"		<td style='border-right: none; height:100px;' onclick='move(this,1,2)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='border-bottom: none; border-left: none; height:100px;' onclick='move(this,2,0)'></td>"+
    "        <td style='border-bottom: none; height:100px;' onclick='move(this,2,1)'></td>"+
	"		<td style='border-bottom: none;border-right: none; height:100px;' onclick='move(this,2,2)'></td>"+
    "    </tr>"+
	"</table>"+
  "<script>"+
	"var board = document.getElementById('board');"+
	"var x='<img src='x.png' style='width:95%;height:95%;'>';"+
	"var o='<img src='o.jpg' style='width:95%;height:95%;'>';"+
	"if (board != null) {"+
	"	for (var i = 0; i < board.rows.length; i++) {"+
	"		for (var j = 0; j < board.rows[i].cells.length; j++)"+
	"			board.rows[i].cells[j].onclick = function () {"+
	"			move(this,i,j);"+
	"			};"+
	"	}"+
	"}"+

	"function move(boardCell,y,z) {"+
	"	if(updateCell(boardCell)){"+
	"		updateTurn();"+
	"		turnCount++;"+
	"	}"+
	"}"+
	
	"function updateCell(boardCell) {"+
	"	if(boardCell.innerHTML==x||boardCell.innerHTML==o)"+
	"		return false"+
		
	"	if(myTurn){"+
	"		boardCell.innerHTML =x"+
	"	}else{"+
	"		boardCell.innerHTML =o"+
	"	}"+
	"	return true"+
	"}"+

	
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

var checkGame="<style scoped>"+
"table {"+
"  text-align: center;"+
"   width: 25%;"+
"   border-spacing: 0;"+
"}"+
"td {"+
"	border: 2px solid black;"+
"	border-collapse: collapse;"+
"    width: 16%;"+
"}"+
"</style>"+
	"<h1>Checkers</h1>"+
	"<br>"+
	"<p id='turn'>It is Player 1's turn</p>"+
	"<br><br>"+
	"<table id='board'>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,0,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,0,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,0,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,0,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,0,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,0,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,0,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,0,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,1,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,1,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,1,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,1,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,1,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,1,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,1,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,1,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,2,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,2,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,2,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,2,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,2,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,2,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,2,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,2,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,3,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,3,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,3,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,3,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,3,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,3,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,3,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,3,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,4,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,4,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,4,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,4,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,4,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,4,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,4,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,4,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,5,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,5,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,5,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,5,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,5,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,5,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,5,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,5,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,6,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,6,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,6,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,6,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,6,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,6,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,6,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,6,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:50px;' onclick='move(this,7,0)'></td>"+
    "        <td style='height:50px;' onclick='move(this,7,1)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,7,2)'></td>"+
	"        <td style='height:50px;' onclick='move(this,7,3)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,7,4)'></td>"+
	"        <td style='height:50px;' onclick='move(this,7,5)'></td>"+
	"		 <td style='height:50px;' onclick='move(this,7,6)'></td>"+
	"		<td style='height:50px;' onclick='move(this,7,7)'></td>"+
    "    </tr>"+
	"</table>"+
  "<script>"+
	"var board = document.getElementById('board');"+
	"var myTurn = true;"+
	"var turnCount=0;"+
	"var x='<img src='x.png' style='width:95%;height:95%;'>';"+
	"var o='<img src='o.jpg' style='width:95%;height:95%;'>';"+
	"if (board != null) {"+
	"	for (var i = 0; i < board.rows.length; i++) {"+
	"		for (var j = 0; j < board.rows[i].cells.length; j++){"+
	"			if(i%2 != 0 && j <= 2){"+
	"				board.rows[i].cells[j].innerHTML = x;}"
	"			if(i%2 != 0 && j >= 5){"+
	"				board.rows[i].cells[j].innerHTML = o;}"
	"			board.rows[i].cells[j].onclick = function () {"+
	"			move(this,i,j);"+
	"			};"+
	"	}}"+
	"}"+
	"var first = true;"+  //click one button that contains a piece and then another
	"var firstY = -1;"+
	"var firstZ = -1;"+
	"function move(boardCell,y,z) {"+
	"	if(first == true){"+
	"		first = false;"+
	"		firstY = y;"+
	"		firstZ = z;}"+
	"	else{"+
	"		if(updateCell(boardCell, y, z)){"+
	"			winCon();"+
	"			updateTurn();"+
	"			turnCount++;"+
	"			first = true;"+
	"		}"+
	"	}"+
	"}"+
	//TODO, update to checkers functionality
	"function updateCell(boardCell, y, z) {"+
	"	if(boardCell.innerHTML==x||boardCell.innerHTML==o)"+
	"		return false"+
	"	if(myTurn){"+
	
	"		if(board.rows[firstY+1].cells[firstZ+1].innerHTML == o && (y ==firstY+2 && z == firstZ+2)){"+
	"			var c = firstZ;"+
	"			for(i=1; i<=7-firstY; i++){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == o && (y ==firstY+i+1 && z == c+2)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					boardCell.innerHTML =x;"+
	"					c++;}"+
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == o && (y ==firstY+i+1 && z == c-2)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					boardCell.innerHTML =x;"+
	"					c++;}"+
	"				else{return true;}}}"+
	
	"		else if(board.rows[firstY+1].cells[firstZ-1].innerHTML == o && (y ==firstY+2 && z == firstZ-2)){"+
	
	"			var c = firstZ;"+
	"			for(i=1; i<=7-firstY; i+=2){"+
	"				if(board.rows[firstY+i].cells[c+1].innerHTML == o && (y ==firstY+i+1 && z == c+2)){"+
	"					board.rows[firstY+i].cells[c+1].innerHTML = null;"+
	"					boardCell.innerHTML =x;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY+i].cells[c-1].innerHTML == o && (y ==firstY+i+1 && z == c-2)){"+
	"					board.rows[firstY+i].cells[c-1].innerHTML = null;"+
	"					boardCell.innerHTML =x;"+
	"					c-=2;}}"+
	"				else{return true;}}"+
	
	
	"		else if(y == firstY + 1 && z == firstZ + 1){" +
	"			boardCell.innerHTML =x;"+
	"			return true;}"+
	"		else if(y == firstY + 1 && z == firstZ - 1){" +
	"			boardCell.innerHTML =x;"+
	"			return true;}"+
	"		else{"+
	"			return false;}" +
	"	}else{"+
	"		if(board.rows[firstY-1].cells[firstZ+1].innerHTML == x && (y ==firstY-2 && z == firstZ+2)){"+
	
	"			var c = firstZ;"+
	"			for(i=firstY; i>=0; i-=2){"+
	"				if(board.rows[firstY-i].cells[c+1].innerHTML == x && (y ==firstY-i-1 && z == c+2)){"+
	"					board.rows[firstY-i].cells[c+1].innerHTML = null;"+
	"					boardCell.innerHTML =o;"+
	"					c+=2;}"+
	"				else if(board.rows[firstY-i].cells[c-1].innerHTML == x && (y ==firstY-i-1 && z == c-2)){"+
	"					board.rows[firstY-i].cells[c-1].innerHTML = null;"+
	"					boardCell.innerHTML =o;"+
	"					c-=2;}"+
	"				else{return true;}}}"+
	
	
	"			boardCell.innerHTML =o;"+
	"		else if(board.rows[firstY-1].cells[firstZ-1].innerHTML == x && (y ==firstY-2 && z == firstZ-2)){"+
	"			boardCell.innerHTML =o;"+
	"		else if(y == firstY - 1 && z == firstZ + 1){" +
	"			boardCell.innerHTML =o;"+
	"		else if(y == firstY - 1 && z == firstZ - 1){" +
	"			boardCell.innerHTML =o;"+
	"		else{"+
	"			return false;}" +
	"	}"+
	"	return true"+
	"}"+
	
	"function updateTurn() {"+
	"	p=document.getElementById('turn');"+
	"	if(myTurn){"+
	"		myTurn=false;"+
	"		p.innerHTML='It is Player 2's turn'"+
	"	}else{"+
	"		myTurn=true;"+
	"		p.innerHTML='It is Player 1's turn'"+
	"	}"+
	"}"+
	
	"function winCon() {"+
	
	" var found = false;"+
	"	for (var i = 0; i < board.rows.length; i++) {"+
	"		for (var j = 0; j < board.rows[i].cells.length; j++){"+
	"			if(myturn==true){"+
	"				if(board.rows[i].cells[j].innerHTML == o){found = true;}}"+
	"			if(myturn==false){"+
	"				if(board.rows[i].cells[j].innerHTML == x){found = true;}}}}"+
	"	if(found == false && myturn == true){"+
	"		if(confirm('Player 1 wins\nNew game?'))"+
	"			location.reload();}"+
	"	if(found == false && myturn == false){"+
	"		if(confirm('Player 2 wins\nNew game?'))"+
	"			location.reload();}"+
	
	"	}"