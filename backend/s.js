const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');  // Import the File System module

(async function scrapeMcMasterPage() {
    // Configure Chrome to run in headless mode
    const options = new chrome.Options();
    options.addArguments('--headless'); // Enable headless mode
    options.addArguments('--disable-gpu'); // Optional: Disable GPU for stability on some systems

    // Launch browser in headless mode
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    let scrapedData = [];  // Array to hold the scraped data

    try {
        let i = 1;  // Initialize the filter parameter

        // Loop to scrape multiple pages (you can adjust the condition based on how many pages you want to scrape)
        for (i = 1; i <= 33; i++) { // Scrape for pages 1 through 5
            const url = `https://academiccalendars.romcmaster.ca/content.php?catoid=53&catoid=53&navoid=10775&filter%5Bitem_type%5D=&filter%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D=${i}#acalog_template_course_filter`;

            // Navigate to the page with the updated 'i' value
            await driver.get(url);

            // Wait for the desired element to become visible
            let element = await driver.wait(
                until.elementLocated(By.xpath('//*[@id="table_block_n2_and_content_wrapper"]/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table[2]')),
                10000
            );
            await driver.wait(until.elementIsVisible(element), 5000);

            // Scrape text from the element
            let scrapedText = await element.getText();
            
            // Store the scraped data into the array
            scrapedData.push({
                page: i,
                data: scrapedText
            });

            // Optionally, add a delay here to prevent overloading the server (e.g., 2 seconds)
            await driver.sleep(2000); // Sleep for 2 seconds
        }

        // After scraping all pages, write the scraped data to a file
        fs.writeFileSync('scraped_data.json', JSON.stringify(scrapedData, null, 2), 'utf8');
        console.log('Data has been scraped and saved to scraped_data.json');
        
    } catch (err) {
        console.error('Error during scraping:', err);
    } finally {
        // Ensure the browser is closed
        await driver.quit();
    }
})();
