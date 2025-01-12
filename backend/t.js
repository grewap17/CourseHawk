const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const puppeteer = require('puppeteer');

async function scrapeMcMasterPage(courseCode) {
    // Download Puppeteer's Chromium version and get the path to the executable
    const chromePath  = puppeteer.executablePath();

    // Configure Chrome options for headless mode
    const options = new chrome.Options();
    options.setChromeBinaryPath(chromePath); // Use Puppeteer's Chromium
    options.addArguments('--headless'); // Enable headless mode
    options.addArguments('--disable-gpu'); // Disable GPU for compatibility
    options.addArguments('--no-sandbox'); // Required in restricted environments
    options.addArguments('--disable-dev-shm-usage'); // Prevent crashes due to shared memory issues


    // Launch the browser
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        await driver.get(
            `https://mytimetable.mcmaster.ca/criteria.jsp?access=0&lang=en&tip=0&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=liiiiiiiii&bbs=&ds=&cams=MCMSTiSNPOL_MCMSTiMHK_MCMSTiMCMST_MCMSTiOFF_MCMSTiCON&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=${courseCode}&va_0_0=aaf2&sa_0_0=llll&cs_0_0=&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=ss&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0`
        );
        await driver.manage().window().maximize();

        let button = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="tipExpandX_0"]')),
            10000
        );
        await driver.wait(until.elementIsEnabled(button), 5000);
        await button.click();

        let element = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="requirements"]/div[4]/div[3]/div[2]/div/div[8]')),
            10000
        );
        await driver.wait(until.elementIsVisible(element), 5000);

        let scrapedText = await element.getText();
        console.log(scrapedText);
        return scrapedText;
    } catch (err) {
        // console.error('Error:', err);
        // throw err;
    } finally {
        await driver.quit();
    }
}

scrapeMcMasterPage('SFWRENG-3DX4')
    .then((res) => {
        console.log('Scraping completed successfully.'+ res);
    })
    .catch((err) => {
        console.error('Error during scraping:', err);
    });
