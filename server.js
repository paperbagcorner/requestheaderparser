'use strict';

const express = require('express');
const app = express();

// Settings
app.enable('trust proxy');
app.set('json spaces', 1);

// Static files
app.use(express.static(process.cwd() + '/public'));

app.route('/')
    .get((req, res) => {
        res.sendFile(process.cwd() + '/public/index.html');
    });

app.route('/api/whoami')
    .get((req, res) => {
        let result = {};
        result.ipaddress = req.ip;

        // We take the first language in the 'accept-language' header as the language.
        try {
            result.language = req.get('accept-language').split(',')[0];
        }
        catch (e) {
            // We couldn't detect the language. Possibly because the header is not set.
            console.log(e);
        }

        // We define the software to be the content of the first parenthesis in the user-agent header.
        try {
            result.software = req.get('user-agent').match(/\((.*?)\)/)[1];
        }
        catch (e) {
            // The header wasn't in the format we assumed. Return the whole user-agent header instead.
            console.log(e);
            result.software = req.get('user-agent');
        }

        res.json(result);
    });

const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});