var document;
var game;
var id = 0;
var socket;
var GSID;
var tacGame;
var checkGame;
var chessBoard;
//var requestPrefix = "localhost:8080/";
var requestPrefix = "coms-319-052.cs.iastate.edu:8080/";
var myTurn = true;
var turnCount=0;
var storage=window.localStorage;
var turnCount = 0;
var p1 = true;
var ai_opponent = false;
var board;

var init=function(screen) {

    getTicHtml();
    getCheckHtml();
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

            chess_updateBoard(newBoard[0]);
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
		check_init();
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
	let ex="<img src='images/tictactoe/x.png' class='game_piece'>";
	let oh="<img src='images/tictactoe/o.png' class='game_piece'>";
    if(contents==ex||contents==oh||myTurn==false)
        return false

    if(p1){
        boardCell.innerHTML=ex
        boardCell.value = 1
    }else{
       boardCell.innerHTML=oh
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
