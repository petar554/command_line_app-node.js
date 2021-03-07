#!/usr/bin/env node
const fs = require('fs');

// we can access to the process module directly, without the need for a require
fs.readdir(process.cwd(), (err, filenames) => {
    // err === an error Object, which means something went wrong
    // err === null, which means everything is OK
    if (err) {
        console.log(err);
    }


    const allStats = Array(filenames.length).fill(null); //[null], [null], [null], [null]

    for (let filename of filenames) {
        // use line below to determine on which index is a filename
        const index = filenames.indexOf(filename);

        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log(err);
            }

            //console.log(filename, stats.isFile());

            allStats[index] = stats;
            // check if the every element in the array has a value
            const ready = allStats.every((stats) => {
                return stats;
            });

            if (ready) {
                allStats.forEach((stats, index) => {
                    console.log(filenames[index], stats.isFile());
                });
            }
        });
    }
});