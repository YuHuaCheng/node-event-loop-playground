const crypto = require('crypto');
const express = require('express');
const Worker = require('webworker-threads').Worker;

const app = express();

app.get('/', (req, res) => {

    const worker = new Worker(function() {
        // worker on different thread
        // anything inside is a different process, which can not use variable outside this scope
        this.onmessage = function(){
            let counter = 0;
            while (counter < 1e9){
                counter++;
            }

            postMessage(counter)
        }
    });

    // application side worker
    worker.onmessage = function (message) {
        console.log(message.data);
        res.send('' + message.data);
    };

    worker.postMessage();
});

app.get('/fast', (req, res) => {
    res.send('this was fast!');
});


app.listen('3000', () => {
    console.log('listening on port 3000...')
});


