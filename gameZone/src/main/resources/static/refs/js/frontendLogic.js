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
	    xhr.open("POST", "http://localhost:8080/user/generate/token",true);
	    //xhr.open("POST", "http://coms-319-052.cs.iastate.edu:8080/user/generate/token");
	    xhr.send();
	} else { socket_xhr(null); }
}

function socket_xhr(xhr) {

    if (xhr != null) {
        id = JSON.parse(xhr.response).payload;
        window.localStorage.setItem("userID", id);
    } else { id = window.localStorage.getItem("userID"); }

    socket = new WebSocket("ws://localhost:8080/websocket/" + id);//localhost

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
			invitation(msg.payload.payload.array[0]);
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

function updateBoard(newBoard){
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
	
	updateTurn();
}

function accepted(){
	document.getElementById('onCenter').innerHTML=tacGame;
}

function invitation(requestor){
	if (confirm("Press a button!")) {
		p1=false;
		let json = {
            "intent": 203,
			"payload": {
				"array": [requestor
				],
				"integer": 0
			},
			"identifier": id
		};
		socket.send(JSON.stringify(json));
	} else {
		let json = {
            "intent": 203,
			"payload": {
				"array": [requestor
				],
				"integer": 100
			},
			"identifier": id
		};
	}
}

function selectGame(g){
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

function requestHuman(requested){
	let json = {
            "intent": 202,
			"payload": {
				"array": [
					requested
				],
				"integer": 0
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
				"integer": 0
			},
			"identifier": id


        };
        socket.send(JSON.stringify(json));
}

	var myTurn = true;
	var turnCount=0;
	var x="<img src='images/x.png' style='width:95%;height:95%;'>";
	var o="<img src='images/o.png' style='width:95%;height:95%;'>";

	function move(boardCell,y,z) {
		if(updateCell(boardCell)){
			//winCon(y,z)
			sendBoard();
			turnCount++;
		}
	}
	
	function sendBoard(){
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
	
	socket.send(JSON.stringify(json));
	}
	
	function updateCell(boardCell) {
		if(boardCell.innerHTML==x||boardCell.innerHTML==o)
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
		p=document.getElementById('turn');
		if(p1){
			myTurn=false;
			p.innerHTML="It is O's turn"
		}else{
			myTurn=true;
			p.innerHTML="It is X's turn"
		}
	}
	
	/* function winCon(y,z) {
		if(turnCount>=8){
			let json = {
            "intent": 205,
			"payload": {
				"array": ,
				"integer": 0
			},
			"identifier": GSID
		};
			socket.send(JSON.stringify(json));
		}
		for (var i = 0; i < 3; i++) {
			if((board.rows[i].cells[0].innerHTML==x&&board.rows[i].cells[1].innerHTML==x&&board.rows[i].cells[2].innerHTML==x)||
			(board.rows[0].cells[i].innerHTML==x&&board.rows[1].cells[i].innerHTML==x&&board.rows[2].cells[i].innerHTML==x)){
				if(p1){
				let json = {
            "intent": 204,
			"payload": {
			"array": [arr]
				"integer": 1
			},
			"identifier": GSID
			};
				socket.send(JSON.stringify(json));
				}else{
					let json = {
            "intent": 205,
			"payload": {
				"array": [
				],
				"integer": 0
			},
			"identifier": "requested_ID"
			};
				}
			}
			if((board.rows[i].cells[0].innerHTML==o&&board.rows[i].cells[1].innerHTML==o&&board.rows[i].cells[2].innerHTML==o)||
			(board.rows[0].cells[i].innerHTML==o&&board.rows[1].cells[i].innerHTML==o&&board.rows[2].cells[i].innerHTML==o)){
				if(p1){
					let json = {
						"intent": 205,
						"payload":  2,
						"identifier": id
					};
					socket.send(JSON.stringify(json));
				socket.send(JSON.stringify(json));
				}else{
					let json = {
						"intent": 205,
						"payload":  1,
						"identifier": id
					};
					socket.send(JSON.stringify(json));
				}
			}
		}
		
		if((board.rows[0].cells[0].innerHTML==o&&board.rows[1].cells[1].innerHTML==o&&board.rows[2].cells[2].innerHTML==o)||
		(board.rows[0].cells[2].innerHTML==o&&board.rows[1].cells[1].innerHTML==o&&board.rows[2].cells[0].innerHTML==o)){
			if(p1){
					let json = {
						"intent": 205,
						"payload":  2,
						"identifier": id
					};
					socket.send(JSON.stringify(json));
				socket.send(JSON.stringify(json));
				}else{
					let json = {
						"intent": 205,
						"payload":  1,
						"identifier": id
					};
					socket.send(JSON.stringify(json));
				}
		}else if((board.rows[0].cells[0].innerHTML==x&&board.rows[1].cells[1].innerHTML==x&&board.rows[2].cells[2].innerHTML==x)||
		(board.rows[0].cells[2].innerHTML==x&&board.rows[1].cells[1].innerHTML==x&&board.rows[2].cells[0].innerHTML==x)){
			if(p1){
				let json = {
						"intent": 205,
						"payload":  1,
						"identifier": id
					};
				socket.send(JSON.stringify(json));
				}else{
					let json = {
						"intent": 205,
						"payload":  2,
						"identifier": id
					};
					socket.send(JSON.stringify(json));
				}
		}
		 
	}*/

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
	"<p id='turn'>It is X's turn</p>"+
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
	"var myTurn = true;"+
	"var turnCount=0;"+
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
	"		winCon(y,z)"+
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
	
	"function updateTurn() {"+
	"	p=document.getElementById('turn');"+
	"	if(myTurn){"+
	"		myTurn=false;"+
	"		p.innerHTML='It is O's turn'"+
	"	}else{"+
	"		myTurn=true;"+
	"		p.innerHTML='It is X's turn'"+
	"	}"+
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

