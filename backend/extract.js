// const fs = require('fs');

// const data = `•  GERMAN 1B03 - Intermediate German I
// •  GERMAN 1BB3 - Intermediate German II
// •  GERMAN 1Z06 A/B S - Beginner’s Intensive German
// •  GERMAN 2CC3 - Germany Through the Ages: Culture and Society (Taught in English)
// •  GERMAN 2FT3 - The Fairy Tale (Taught in English)
// •  GERMAN 2G03 - Berlin/Vienna: The Cultural Life of these Cities (Taught in English)
// •  GERMAN 2KK3 - Postmodern Alienation and Anxieties - Kafka for the Twenty-First Century (Taught in English)
// •  GERMAN 2N03 - The Holocaust in Film and Fiction (Taught in English)
// •  GERMAN 2P03 - Modern Germany Through Film: Golden 20s - Avant Garde - Transnational Cinema (Taught in English)
// •  GERMAN 2Q03 - Horror Film: Vampires, Monsters, and Mad Scientists (Taught in English)
// •  GERMAN 2Z03 - Intermediate German I
// •  GERMAN 2ZZ3 - Intermediate German II
// •  GERMAN 3H03 - The New Europe: A New Germany (Taught in English)
// •  GERMAN 3Z03 - Advanced German I
// •  GERMAN 3ZZ3 - Advanced German II
// •  GERMAN 4CC3 - Translation: Techniques and Practice
// •  GERMAN 4II3 A/B S - Independent Study
// •  HISTORY 1CC3 - Ten Empires that Shaped our World, 500 BCE to Present
// •  HISTORY 1DD3 - The Making of the Modern World, 1750-1945
// •  HISTORY 1EE3 - The Historical Roots of Contemporary Issues
// •  HISTORY 1FF3 - Exploring History in a Small Group Setting
// •  HISTORY 1M03 - History of Greece and Rome
// •  HISTORY 1P03 - A History of Magic
// •  HISTORY 1PP3 - Pop Goes the Past!
// •  HISTORY 1Q03 - History of Medicine
// •  HISTORY 2A03 - Modern Middle Eastern Societies
// •  HISTORY 2CC3 - The Medieval World 400-1050
// •  HISTORY 2CH3 - Introduction to Critical Heritage Studies
// •  HISTORY 2CS3 - The History of Slavery in the Americas
// •  HISTORY 2DD3 - The Medieval World 1050-1400
// •  HISTORY 2DF3 - Art and Revolutions in France, 1789-1914
// •  HISTORY 2EN3 - The Post-Slavery Caribbean
// •  HISTORY 2G03 - Modern Latin America Since 1820
// •  HISTORY 2GR3 - A History of Monsters
// •  HISTORY 2GW3 - A History of Global War
// •  HISTORY 2H03 - Tudor and Stuart Britain, 1485-1714
// •  HISTORY 2HH3 - Pirates, Pilgrims and the Enslaved in the Mediterranean, 1450-1750
// •  HISTORY 2II3 - Modern Germany
// •  HISTORY 2IS3 - Historical Roots of Current Social and Political Crises in the United States
// •  HISTORY 2J03 - Africa up to 1800
// •  HISTORY 2JJ3 - Africa since 1800
// •  HISTORY 2KK3 - History of Capitalism
// •  HISTORY 2MC3 - Modern China
// •  HISTORY 2PP3 - Making History
// •  HISTORY 2PQ3 - Histories of the Written Word
// •  HISTORY 2Q03 - Imperial Russia
// •  HISTORY 2QQ3 - The Soviet Union
// •  HISTORY 2R03 - U.S. History to the Civil War
// •  HISTORY 2RR3 - U.S. History Since the Civil War
// •  HISTORY 2SH3 - Canadian Sport History
// •  HISTORY 2SS3 - Liberty, Empire and Industry: Britain, 1688-1867
// •  HISTORY 2ST3 - Empire, War, Welfare State: Britain, 1867-2020
// •  HISTORY 2T03 - Survey of Canadian History, Beginnings to 1885
// •  HISTORY 2TT3 - Survey of Canadian History, 1885 to the Present
// •  HISTORY 2UV3 - American Foreign Relations since 1898
// •  HISTORY 2V03 - Re-Making History
// •  HISTORY 2XX3 - Age of Terror: History of Terrorism in the Modern World
// •  HISTORY 3AR3 - Atlantic Revolutions, 1750-1804
// •  HISTORY 3CG3 - Canadians in a Global Age, 1914 to the Present
// •  HISTORY 3CH3 - Catastrophic History: Natural & Technological Disasters
// •  HISTORY 3DD3 - Jews and Jesus
// •  HISTORY 3DF3 - Art and Politics in Second Empire France
// •  HISTORY 3DS3 - Diasporas, Trade and Conflict: The Sea in History, 1000 BCE to Present
// •  HISTORY 3EC3 - Chinese Intellectual Traditions
// •  HISTORY 3FF3 - Nazi Germany
// •  HISTORY 3GN3 - Moments in Twentieth Century History Through the Graphic Novel
// •  HISTORY 3H03 - Italian Renaissance, 1300-1600
// •  HISTORY 3HI3 - Advanced Historical Inquiry
// •  HISTORY 3HQ3 - History of Quebec
// •  HISTORY 3I03 - The International Relations of the European Powers, 1870-1945
// •  HISTORY 3J03 - The United States in the 1960s
// •  HISTORY 3JJ3 - Crime, Constables, and Courts: Modern Criminal Justice, 1700 to Present
// •  HISTORY 3JR3 - Justice and Reparations in the Post-slavery World
// •  HISTORY 3KK3 - The Vietnam War
// •  HISTORY 3N03 - Poverty, Privilege and Protest in Canadian History
// •  HISTORY 3RU3 - Early Modern Russia
// •  HISTORY 3ST3 - Street Life in Canada
// •  HISTORY 3TC3 - Science, Technology in World History
// •  HISTORY 3TR3 - Trees and their Histories
// •  HISTORY 3UA3 - The History of the Future
// •  HISTORY 3W03 - Women in Canada and the U.S. to 1920
// •  HISTORY 3WW3 - Women in Canada and the U.S. from 1920
// •  HISTORY 3XX3 - Human Rights in History
// •  HISTORY 3YB3 - Youth Subcultures in Britain: From the Teds to the Acid Ravers
// •  HISTORY 3YY3 - Britain and the First World War
// •  HISTORY 3ZZ3 - Judaism in the Modern World
// •  HISTORY 4AW3 - North Atlantic Crossings, 1750-1940
// •  HISTORY 4CE3 - Early Canadian History
// •  HISTORY 4CM3 - Modern Canadian History
// •  HISTORY 4DW3 - Indigenous History in a Decolonizing World
// •  HISTORY 4E03 - Medieval People
// •  HISTORY 4FF3 - History of Health and Medicine in the Colonial World
// •  HISTORY 4G03 - Nation and Genocide in the Modern World
// •  HISTORY 4HH3 - China’s Great Cultural Revolution
// •  HISTORY 4HP3 - The History Practicum
// •  HISTORY 4I03 - Women and Social Movements in the 19th- and 20th- Century United States
// •  HISTORY 4JJ3 - U.S. Foreign Relations
// •  HISTORY 4K03 - Environment and Environmentalism in Modern North America
// •  HISTORY 4KK3 - Research on the British Atlantic, 1750-1850
// •  HISTORY 4LP3 - The Cultural History of Paris, 1789-1914`;

// function extractCourseCodes(data) {
//     const regex = /•\s*(.*?)\s*$/gm;
//     let matches;
//     let courses = [];

//     while ((matches = regex.exec(data)) !== null) {
//         courses.push(matches[1]);
//     }

//     return courses;
// }

// const courseList = extractCourseCodes(data);

// // Write to file
// fs.writeFile('courses.txt', courseList.join('\n'), (err) => {
//     if (err) throw err;
//     console.log('Courses have been saved to courses.txt');
// });

const fs = require('fs');

// Read the scraped data from the JSON file
fs.readFile('scraped_data.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    try {
        // Parse the JSON data
        const parsedData = JSON.parse(data);

        // Extract course codes using the function
        const courseCodes = extractCourseCodes(parsedData);

        // Convert course codes array to a single string with each course code on a new line
        const courseCodesText = courseCodes.join("\n");

        // Save the course codes to a .txt file
        fs.writeFile('course_codes.txt', courseCodesText, (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log('Course codes saved to course_codes.txt');
            }
        });
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
});

// Function to extract course codes
function extractCourseCodes(data) {
    let courseCodes = [];

    data.forEach(page => {
        const courses = page.data.split("\n").filter(line => line.trim() !== "");
        
        courses.forEach(course => {
            const match = course.match(/([A-Z]+\s\d+[A-Z]*\d*)/);
            if (match) {
                courseCodes.push(match[0].trim());
            }
        });
    });

    return courseCodes;
}
