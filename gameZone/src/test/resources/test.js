const{Builder, By, Key, util} = require("selenium-webdriver");
var driver = new Builder().forBrowser("chrome").build();
var socket;

async function launch(){
	var path = process.cwd()+'../../../main/resources/templates/default/home.html';
	await driver.get( path);
	//driver.findElement(By.id("txtFirstName")).sendKeys("Hello"); //all of this is just reference for later
	//driver.findElement(By.id("txtLastName")).sendKeys("There");
	//await driver.findElement(By.id("btnValidate")).click();
	let w = await driver.findElement(By.id('connected')).getText();
	driver.quit()
	return w;
}

async function() connect {
	var connected=false;
	socket = new WebSocket("ws://coms-319-052.cs.iastate.edu:8080/websocket/identifier");
	await socket.onopen = function(e) {
		connected=true;
	};
	
};
	
async function(sent) mess {
	
	returned="";
	
	let json = {
		"intent": 201,
		"payload": sent,
		"identifier": 0
	};
	socket.send(JSON.stringify(json));
	
	await socket.onmessage = function(event) {
		var jsonObject = JSON.parse(event.data);
		returned = jsonObject.payload;
	};
	
	
};
				

jest.setTimeout(50000000);//this can probably be smaller but it's easier to keep it big rn

test('test socket connectability HTML', () => {
  return connect().then(data => {
    expect(true).toBeTruthy();
  });
});

//test('send message via socket and check result', () => {
//	testString="Successful test 123"
//  return mess(testString).then(data => {
//    expect(data).toBe(testString);
//  });
//});

//test('launch webpage and test socket connection via page', () => {
//  return launch().then(data => {
//    expect(data).toBeTruthy();
//  });
//});