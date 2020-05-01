

var checkGame="<style scoped>"+
"table {"+
"  text-align: center;"+
"   width: 25%;"+
"   border-spacing: 0;"+
"}"+
"td {"+
"	border: 2px solid black;"+
"	border-collapse: collapse;"+
"    width: 11%;"+
"}"+
"</style>"+
	"<h1>Checkers</h1>"+
	"<br>"+
	"<p id='turn'>It is Player 1's turn</p>"+
	"<br><br>"+
	"<table id='board'>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,0,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,0,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,0,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,0,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,0,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,0,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,0,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,0,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,1,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,1,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,1,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,1,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,1,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,1,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,1,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,1,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,2,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,2,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,2,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,2,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,2,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,2,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,2,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,2,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,3,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,3,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,3,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,3,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,3,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,3,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,3,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,3,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,4,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,4,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,4,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,4,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,4,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,4,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,4,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,4,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,5,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,5,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,5,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,5,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,5,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,5,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,5,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,5,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,6,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,6,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,6,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,6,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,6,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,6,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,6,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,6,7)'></td>"+
    "    </tr>"+
	"	<tr>"+
    "        <td style='height:11%;' onclick='move(this,7,0)'></td>"+
    "        <td style='height:11%;' onclick='move(this,7,1)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,7,2)'></td>"+
	"        <td style='height:11%;' onclick='move(this,7,3)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,7,4)'></td>"+
	"        <td style='height:11%;' onclick='move(this,7,5)'></td>"+
	"		 <td style='height:11%;' onclick='move(this,7,6)'></td>"+
	"		<td style='height:11%;' onclick='move(this,7,7)'></td>"+
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
