let _ = require('lodash');
let controlRobot = require('./controller');

const APP_CONSTANTS = require('./constants');
const DEBUG = true;

let fs = require('fs');
let directions = [];
let state = {
    x: 0,
    y: 0,
    direction: APP_CONSTANTS.DIRECTIONS.EAST,
    placed: false
};

fs.readFile('directions.txt', 'utf8', function(err, fileInput) {
    if (err) throw err;
    let cleanedFile = fileInput.trim().split('\n');

    _(cleanedFile).forEach(function(line) {
        let chunks = line.split(' ');
        controlRobot(state, chunks, DEBUG);
    });
});
