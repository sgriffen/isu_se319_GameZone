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
var back=jest.fn(();
var x="<img src='images/x.png' style='width:95%;height:95%;'>";
var o="<img src='images/o.png' style='width:95%;height:95%;'>";
setBackend(back);

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
    expect(updateCell(cell,'')).toBeTruthy();
	expect(updateCell(cell,x)).toBeFalsy();
	setPlayer(false);
	expect(updateCell(cell,o)).toBeFalsy();
	setmyTurn(false);
	expect(updateCell(cell,'')).toBeFalsy();
});

test('test request AI', () => {
	expect(back).toBeDefined();
	requestAI()
	expect(back.mock.calls[0][0]).toBe(202);
	expect(back.mock.calls[0][1]).toBe("AI");
	expect(back.mock.calls[0][2]).toBe(0);
	expect(back.mock.calls[0][3]).toBe(12345);
});

test('test request human', () => {
	requestHuman(2020)
	expect(back.mock.calls[0][0]).toBe(202);
	expect(back.mock.calls[0][1]).toBe(2020);
	expect(back.mock.calls[0][2]).toBe(0);
	expect(back.mock.calls[0][3]).toBe(12345);
});
