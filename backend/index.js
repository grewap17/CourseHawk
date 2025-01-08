 const express = require('express');
const app = express();
const cors = require('cors');
const { exec } = require('child_process'); // Import child_process to execute scripts


app.use(cors())

app.get('/', (req, res) => {
  // Execute the scrape.js script
  exec('node scrape.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      res.status(500).send('Error executing scrape script.');
      return;
    }

    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
    }

    // Send the output of the scrape.js script as part of the response
    res.send(`Hello from our server! Script Output: ${stdout}`);
  });
});

app.listen(8080, () => {
      console.log('server listening on port 8080')
})

