var document;
var game;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
var id=0;
var socket;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4&&this.status===200) {
    id=this.response.payload;
	
	socket = new WebSocket("ws://localhost:8080/websocket/"+id);//localhost
	
	socketSetup();

}});

function init(screen){
	document=screen;
	xhr.open("POST", "http://localhost:8080/user/generate/token",true);
	//xhr.open("POST", "http://coms-319-052.cs.iastate.edu:8080/user/generate/token");

	xhr.send();
};



function selectGame(game){
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

function requestAI(){
	document.getElementById('onCenter').innerHTML =tacGame;
}

function socketSetup(){
	socket.onopen = function(e) {
	//document.getElementById("connected").innerHTML = "true";
	//alert("[open] Connection established");
	//alert("Sending to server");
	let json = {
		"intent": 201,
		"payload": "Hello there",
		"identifier": id
	};
	socket.send(JSON.stringify(json));
	}
 
  
	socket.onmessage = function(event) {
	alert("[message] Data received from server: ${event.data}");
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
    "        <td style='border-top: none; border-left: none; height:100px;' ></td>"+
    "        <td style='border-top: none; height:100px;'></td>"+
	"		<td style='border-top: none; border-right: none; height:100px;'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='border-left: none; height:100px;'></td>"+
    "        <td style='height:100px;'></td>"+
	"		<td style='border-right: none; height:100px;'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='border-bottom: none; border-left: none; height:100px;'></td>"+
    "        <td style='border-bottom: none; height:100px;'></td>"+
	"		<td style='border-bottom: none;border-right: none; height:100px;'></td>"+
    "    </tr>"+
	"</table>"+
  "<script>"+
	"var board = document.getElementById('board');"+
	"var Xturn = true;"+
	"var turnCount=0;"+
	"var x='<img src='x.jpg' style='width:95%;height:95%;'>';"+
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
		
	"	if(Xturn){"+
	"		boardCell.innerHTML =x"+
	"	}else{"+
	"		boardCell.innerHTML =o"+
	"	}"+
	"	return true"+
	"}"+
	
	"function updateTurn() {"+
	"	p=document.getElementById('turn');"+
	"	if(Xturn){"+
	"		Xturn=false;"+
	"		p.innerHTML='It is O's turn'"+
	"	}else{"+
	"		Xturn=true;"+
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

