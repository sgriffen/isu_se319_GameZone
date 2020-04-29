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
const { getmyTurn,sendBackend,setdocument,updateCell,requestAI,requestHuman,accepted,selectGame,init,socket } = require('./../../main/resources/static/js/frontendLogic.js')

//global.localStorage = new LocalStorageMock;



test('test socket connectability HTML', () => {
    expect(getmyTurn()).toBeTruthy();
});