const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// 全局 WebDriver 实例
let driver;

// 使用指定的选项打开浏览器
async function openBrowserWithOptions(url, browser) {
  const options = new chrome.Options();
  options.addArguments("--detach");
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  await driver.manage().window().maximize();
  await driver.get(url);
  // 等待直到页面包含登录按钮dom
  const loginDom = By.xpath("//*[@ka='header-login']");
  await driver.wait(until.elementLocated(loginDom), 10000);
}

// 点击登录按钮，并等待登录成功
async function logIn() {
  // 点击登录
  const loginButton = await driver.findElement(
    By.xpath("//*[@ka='header-login']")
  );

  await loginButton.click();

  // 等待微信登录按钮出现
  const xpathLocatorWechatLogin = "//*[@ka='wx_signin']";
  await driver.wait(
    until.elementLocated(By.xpath(xpathLocatorWechatLogin)),
    10000
  );

  const wechatButton = await driver.findElement(
    By.xpath("//*[@ka='wx_signin']")
  );
  // 选择微信扫码登录
  await wechatButton.click();

  const xpathLocatorWechatLogo = "//*[@class='mini-app-login']/img";
  await driver.wait(
    until.elementLocated(By.xpath(xpathLocatorWechatLogo)),
    10000
  );

  // 等待用户扫码，登录成功
  const xpathLocatorLoginSuccess =
    "//*[@id='header']/section[1]/section[3]/ul/li[2]/a";
  await driver.wait(
    until.elementLocated(By.xpath(xpathLocatorLoginSuccess)),
    60000
  );
}

// 主函数
async function main(url, browserType) {
  try {
    // 打开浏览器
    await openBrowserWithOptions(url, browserType);

    // 点击登录按钮，并等待登录成功
    await logIn();
  } catch (error) {
    console.error(`发生错误: ${error}`);
  }
}

const url =
  "https://www.zhipin.com/web/geek/job-recommend?ka=header-job-recommend";
const browserType = "chrome";

main(url, browserType);
