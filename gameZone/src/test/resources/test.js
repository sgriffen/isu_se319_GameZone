const{Builder, By, Key, util} = require("selenium-webdriver");
var driver = new Builder().forBrowser("chrome").build();
async function launch(){
	var path = process.cwd()+'../../../main/resources/templates/default/home.html';
	await driver.get( path);
	//driver.findElement(By.id("txtFirstName")).sendKeys("Hello"); //all of this is just reference for later
	//driver.findElement(By.id("txtLastName")).sendKeys("There");
	//await driver.findElement(By.id("btnValidate")).click();
	//let w = await driver.findElement(By.id('labelNotifytxtFinalResult')).getText();
	driver.quit()
	return false;
}

jest.setTimeout(50000000);//this can probably be smaller but it's easier to keep it big rn
test('this just launches the webpage right now', () => {
  return launch().then(data => {
    expect(data).toBeTruthy();
  });
});