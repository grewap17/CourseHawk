// const express = require('express');
// const app = express();
// const cors = require('cors');
// const puppeteer = require('puppeteer');
// const PORT = process.env.PORT || 8080;


// async function scrapeMcMasterPage(courseCode) {
//     // Launch Puppeteer in headless mode
//     const browser = await puppeteer.launch({
//         headless: true,  // Run in headless mode
//         args: ['--no-sandbox', '--disable-setuid-sandbox']  // Use these args to bypass certain restrictions
//     });

//     const page = await browser.newPage();
//     let code = courseCode;

//     try {
//         // Navigate to the McMaster timetable page
//         await page.goto(
//             `https://mytimetable.mcmaster.ca/criteria.jsp?access=0&lang=en&tip=0&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=liiiiiiiii&bbs=&ds=&cams=MCMSTiSNPOL_MCMSTiMHK_MCMSTiMCMST_MCMSTiOFF_MCMSTiCON&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=${code}&va_0_0=aaf2&sa_0_0=llll&cs_0_0=&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=ss&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0`
//         );

//         // Wait for the button to become visible and clickable
//         const xp = '//*[@id="tipExpandX_0"]';  // Corrected XPath for the button
//         await page.waitForSelector(xp);
//         console.log("Button is visible and clickable!");

//         // Click the button
//         const button = await page.$x(xp);
//         if (button.length > 0) {
//             await button[0].click();
//             console.log("Clicked the button!");
//         }

//         // Wait for the content to load and scrape the text
//         const xp2 = '//*[@id="requirements"]/div[4]/div[3]/div[2]/div/div[8]';  // Corrected XPath for the content
//         await page.waitForSelector(xp2, { visible: true });
//         const scrapedText = await page.$eval(xp2, el => el.textContent.trim());

//         return scrapedText;
//     } catch (err) {
//         console.error('Error during scraping:', err);
//     } finally {
//         // Ensure the browser is closed
//         await browser.close();
//     }
// }

// async function startServer() {
//     // Test the scrape function here
//     const courseCode = 'SFWRENG-3DX4';
//     const result = await scrapeMcMasterPage(courseCode);
//     console.log('Scraped Text:', result);
// }

// startServer();
