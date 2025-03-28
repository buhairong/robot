const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// 全局 WebDriver 实例
let driver;

// 使用指定的选项打开浏览器
async function openBrowserWithOptions(url, browser) {
  try {
    const options = new chrome.Options();
    options.addArguments("--detach");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.manage().window().maximize();
    await driver.get(url);
    // 等待直到页面包含登录按钮dom
    const loginDom = By.xpath(
      "//*[@id='header']/section[1]/section[3]/section/a"
    );
    await driver.wait(until.elementLocated(loginDom), 10000);
  } catch (error) {
    console.log("error");
  }
}

// 主函数
async function main(url, browserType) {
  try {
    // 打开浏览器
    await openBrowserWithOptions(url, browserType);
  } catch (error) {
    console.error(`发生错误: ${error}`);
  }
}

const url =
  "https://www.zhipin.com/web/geek/job-recommend?ka=header-job-recommend";
const browserType = "chrome";

main(url, browserType);
