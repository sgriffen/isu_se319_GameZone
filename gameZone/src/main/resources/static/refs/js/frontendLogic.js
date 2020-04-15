var document;
var game;

function init(screen){
	document=screen;
}

function selectGame(game){
	document.getElementById('onCenter').innerHTML = "<h style='color:#ff9900;'>Your player ID is ____<h>"+
	"<br>"+
	"<br>"+
	"<br>"+
	"<h style='color:#ff9900;'>who do you want to play against </h><select><option>Player</option> <option>AI</option></select>"+
	"<br>"+
	"<br>"+
	"<p style='color:#ff9900;'>if player, input their ID <input type='text'></p>"+
	"<button type='button'>Connect</button>";
}


			var requestOptions = {
				method: 'GET',
				redirect: 'follow'
			};
			var id=0;
			
			//fetch("https://coms-319-052.cs.iastate.edu:8080/user/generate/token", requestOptions)
			//fetch("https://localhost:8080/user/generate/token", requestOptions)
			//	.then(response => response.text())
			//	.then(result => id)
			//	.catch(error => console.log('error', error));
			let socket;
			//let socket = new WebSocket("ws://coms-319-052.cs.iastate.edu:8080/websocket/identifier");//server
			//let socket = new WebSocket("ws://localhost:8080/websocket/identifier");//localhost
			
			socket.onopen = function(e) {
				document.getElementById("connected").innerHTML = "true";
				alert("[open] Connection established");
				alert("Sending to server");
				let json = {
					"intent": 201,
					"payload": "Hello there",
					"identifier": id
				};
				socket.send(JSON.stringify(json));
			};
			socket.onmessage = function(event) {
				alert("[message] Data received from server: ${event.data}");
			};
			socket.onclose = function(event) {
				document.getElementById("connected").innerHTML = "false";
				if (event.wasClean) {
					alert("[close] Connection closed cleanly, code=${event.code} reason=${event.reason}");
				} else {
				// e.g. server process killed or network down
				// event.code is usually 1006 in this case
					alert("[close] Connection died");
				}
			};