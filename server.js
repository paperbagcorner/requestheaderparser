'use strict';

const express = require('express');
const app = express();

app.route('/')
    .get((req, res) => {
      res.sendFile(process.cwd() + '/public/index.html');
    });


const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});