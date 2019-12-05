const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.port || 5000;

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));