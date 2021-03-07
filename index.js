// The Callback Pattern in Node

const fs = require('fs');
fs.readdir('.', (err, filenames) => {
    // err === an error Object, which means something went wrong
    // err === null, which means everything is OK
    if (err) {
        console.log(err);
    }
    console.log(filenames);
});