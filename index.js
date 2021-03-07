#!/usr/bin/env node     
const fs = require('fs');

// we can access to the process module directly, without the need for a require
fs.readdir(process.cwd(), (err, filenames) => {
    // err === an error Object, which means something went wrong
    // err === null, which means everything is OK
    if (err) {
        console.log(err);
    }
    console.log(filenames);
});