// process.env.UV_THREADPOOL_SIZE = 1;

const range = require('range');
const cluster = require('cluster');
const crypto = require('crypto');

// is the file being executed in master mode
if (cluster.isMaster){
    // cause index.js to be executed AGAIN but in child mode
    const totalCluster = range.range(0, 2); // one big gotcha, how many clusters should I use? Basic rule: the number of cores you have on your machine
    totalCluster.map(() => cluster.fork())
} else {
    // I'm a child
    const express = require('express');

    const app = express();

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('hi there');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('this was fast!');
    });


    app.listen('3000', () => {
        console.log('listening on port 3000...')
    });
}

