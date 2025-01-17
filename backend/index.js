const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const puppeteer = require('puppeteer');

// async function scrapeMcMasterPage(courseCode) {
//     // Configure Chrome to run in headless mode
//     const options = new chrome.Options();
//     options.addArguments('--headless'); // Enable headless mode
//     options.addArguments('--disable-gpu'); // Optional: Disable GPU for stability on some systems

//     // Launch browser in headless mode
//     let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
//     let code=courseCode;

//     try {
//         // Navigate to the page and maximize window
//         await driver.get(//
//         `https://mytimetable.mcmaster.ca/criteria.jsp?access=0&lang=en&tip=0&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=liiiiiiiii&bbs=&ds=&cams=MCMSTiSNPOL_MCMSTiMHK_MCMSTiMCMST_MCMSTiOFF_MCMSTiCON&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=${code}&va_0_0=aaf2&sa_0_0=llll&cs_0_0=&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=ss&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0`
//         );
//         await driver.manage().window().maximize();

//         // Wait for the button to become clickable
//         let button = await driver.wait(
//             until.elementLocated(By.xpath('//*[@id="tipExpandX_0"]')),
//             10000
//         );
//         await driver.wait(until.elementIsEnabled(button), 5000);
//         await button.click();

//         // Wait for the desired element to become visible
//         let element = await driver.wait(
//             until.elementLocated(By.xpath('//*[@id="requirements"]/div[4]/div[3]/div[2]/div/div[8]')),
//             10000
//         );
//         await driver.wait(until.elementIsVisible(element), 5000);

//         // Scrape text from the element
//         let scrapedText = await element.getText();
//         return scrapedText;
//     } catch (err) {
//       // throw err;
//     } finally {
//         // Ensure the browser is closed
//         await driver.quit();
//     }
// }




app.use(cors());
app.get('/', (req, res) => {
  console.log('GET request received at /12');
  res.send('12');
});

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

// app.use(express.json());
app.post('/payload', async (req, res) => {
  try {

  // const {input} = req.body;
  // console.log('Received input:', input);

  // let courseSchedule = await scrapeMcMasterPage(input);
  // console.log('Scraped schedule:', courseSchedule);

  // let lines = courseSchedule.split('\n'); // Split the string into an array of lines
  // let lecOpenOrClosed = lines.filter(line => line.startsWith('LEC')||line.startsWith('LAB')||line.startsWith('TUT'));
  // console.log(' :', lecOpenOrClosed);

  // res.json({x:lecOpenOrClosed,y:input});}
  let courseSchedule="x";
  scrapeMcMasterPage("SFWRENG-3DX4")
    .then((res) => {
        console.log('Scraping completed successfully. '+res);
        courseSchedule= res;
  
    })
    .catch((err) => {
        console.error('Error during scraping:', err);
        courseSchedule= err;

    });


  res.json({x:courseSchedule,y:courseSchedule});}
  catch (error) {
    console.error('Error during scraping:', error);
  }
});




app.listen(PORT, () => {
  console.log('Server restarted1291. Listening on port 8080');
})

