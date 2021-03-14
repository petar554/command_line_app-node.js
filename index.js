#!/usr/bin/env node
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
// moduele inside node standard libray
const path = require('path');

// method 2
// const lstat = util.promisify(fs.lstat);

// method 3 
// return a promise instead of taking callback function
const { lstat } = fs.promises;

// process.argv array has some information about how program is executed
// console.log(process.argv);

const targetDirectory = process.argv[2] || process.cwd();

// we can access to the process module directly, without the need for a require
fs.readdir(targetDirectory, async (err, filenames) => {
    // err === an error Object, which means something went wrong
    // err === null, which means everything is OK
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDirectory, filename));
    });

    // Promise.all accepts an array (map in this case) of promises, and will attempt to fulfill all of them
    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        //console.log(index);

        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.blue(filenames[index]))
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