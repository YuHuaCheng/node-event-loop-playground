const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doHttpsRequest() {
    https
        .request('https://www.google.com', res => {
            res.on('data', () => {
            });
            res.on('end', () => {
                console.log('http request:', Date.now() - start)
            });
        })
        .end();
}

function doHash(){
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('hash:', Date.now() - start);
    });
}

doHttpsRequest();

fs.readFile('multitask.js', 'utf8', () => {
    console.log('fs:', Date.now() - start);
});

[1, 2, 3, 4].map(() =>{
    doHash();
});