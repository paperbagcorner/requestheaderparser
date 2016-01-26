'use strict';

const express = require('express');
const app = express();

app.enable('trust proxy');
app.set('json spaces', 1);

app.route('/')
    .get((req, res) => {
        res.sendFile(process.cwd() + '/public/index.html');
    });

app.route('/api/whoami')
    .get((req, res) => {
        let result = {};
        result.ipaddress = req.ip;

        // We take the first language in the 'accept-language' header as the language.
        result.language = req.headers['accept-language'].split(',')[0];

        // We define the software to be the content of the first parenthesis in the user-agent header.
        result.software = req.headers['user-agent'].match(/\((.*?)\)/)[1];

        res.json(result);
    });

const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});