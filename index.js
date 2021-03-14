#!/usr/bin/env node
const fs = require('fs');
const util = require('util');

// method 2
// const lstat = util.promisify(fs.lstat);

// method 3 
// return a promise instead of taking callback function
const { lstat } = fs.promises;

// we can access to the process module directly, without the need for a require
fs.readdir(process.cwd(), async (err, filenames) => {
    // err === an error Object, which means something went wrong
    // err === null, which means everything is OK
    if (err) {
        console.log(err);
    }

    for (filename of filenames) {
        try {
            const stats = await lstat(filename);
            console.log(filename, stats.isFile())
        } catch (err) {
            console.log(err);
        }
    }
});


// method 1
/* const lstat = filename => {
    return new Promise((resolve, reject) => {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats)
        });
    });
} */