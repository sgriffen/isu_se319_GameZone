class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    //return this.store[key] || null;
	return 12345;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

const mockSend = jest.fn();
const { setmyTurn,setPlayer,sendBackend,setBackend,updateCell,requestAI,requestHuman,init,getSocket,setStorage,closeSocket } 
	= require('./../../main/resources/static/js/frontendLogic.js')

setStorage(new LocalStorageMock);
var back=jest.fn()

test('test init', () => {
	init(null);
	expect(getSocket).toBeDefined();
	expect(getSocket).not.toBeNull();
	closeSocket();
});


test('test updating cell', () => {
	let cell="<div></div>";
	setPlayer(true);
	setmyTurn(true);
    expect(updateCell(cell)).toBeTruthy();
	var x="<img src='images/x.png' style='width:95%;height:95%;'>";
	cell=document.createElement("div");
	cell.appendChild(document.createTextNode(x));
	expect(String(cell.innerHTML)).toBe(x);
	expect(updateCell(cell)).toBeFalsy();
	setPlayer(false);
	cell="<div><img src='images/o.png' style='width:95%;height:95%;'></div>";
	expect(updateCell(cell)).toBeFalsy();
	setmyTurn(false);
	cell="<div></div>";
	expect(updateCell(cell)).toBeFalsy();
});

test('test request AI', () => {
	requestAI()
	expect(back.mock.calls[0][0]).toBe(202);
	expect(back.mock.calls[0][1]).toBe("AI");
	expect(back.mock.calls[0][2]).toBe(0);
	expect(back.mock.calls[0][3]).toBe(12345);
});

