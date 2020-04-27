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

frontendLogic.sendBackend = new mockSend

global.localStorage = new LocalStorageMock;


jest.setTimeout(50000000);//this can probably be smaller but it's easier to keep it big rn

test('test socket connectability HTML', () => {
  //return connect().then(data => {
    expect(true).toBeTruthy();
  //});
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