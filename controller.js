let _ = require('lodash');
const APP_CONSTANTS = require('./constants');

/**
 * ƒ controlRobot
 * The interpreter of the directions.
 *
 * @param state
 * @param decision
 * @param debug
 */
let controlRobot = function(state, decision, debug) {
    if (debug) console.log('START', decision, state);

    switch (decision[0].toUpperCase()) {
        case 'PLACE':
            let choiceArray = decision.length > 0 ? decision[1].split(',') : decision;
            let newState = {
                x: parseInt(choiceArray[0]),
                y: parseInt(choiceArray[1]),
                direction: APP_CONSTANTS.DIRECTIONS[choiceArray[2].toUpperCase()],
                placed: true
            };

            if (newState.x < 0) {
                if (debug) console.log('Robot X coordinate was out of bounds, setting to 0.');
                newState.x = 0;
            }
            else if (newState.x > 4) {
                if (debug) console.log('Robot X coordinate was out of bounds, setting to 4.');
                newState.x = 4;
            }

            if (newState.y < 0) {
                if (debug) console.log('Robot Y coordinate was out of bounds, setting to 0.');
                newState.y = 0;
            }
            else if (newState.y > 4) {
                if (debug) console.log('Robot Y coordinate was out of bounds, setting to 4.');
                newState.y = 4;
            }

            switch (newState.direction) {
                case APP_CONSTANTS.DIRECTIONS.NORTH:
                case APP_CONSTANTS.DIRECTIONS.EAST:
                case APP_CONSTANTS.DIRECTIONS.SOUTH:
                case APP_CONSTANTS.DIRECTIONS.WEST:
                    break;

                default:
                    if (debug) console.log('Robot direction was not understood, setting to north.');
                    newState.direction = APP_CONSTANTS.DIRECTIONS.NORTH;
                    break;
            }

            state.x = newState.x;
            state.y = newState.y;
            state.direction = newState.direction;
            state.placed = newState.placed;

            break;

        case 'MOVE':
            if (!state.placed) return;

            switch (state.direction) {
                case APP_CONSTANTS.DIRECTIONS.NORTH:
                    if (state.y < 4) state.y += 1;
                    break;

                case APP_CONSTANTS.DIRECTIONS.SOUTH:
                    if (state.y > 0) state.y -= 1;
                    break;

                case APP_CONSTANTS.DIRECTIONS.WEST:
                    if (state.x > 0) state.x -= 1;
                    break;

                case APP_CONSTANTS.DIRECTIONS.EAST:
                    if (state.x < 4) state.x += 1;
                    break;
            }
            break;

        case 'LEFT':
            if (!state.placed) return;

            switch (state.direction) {
                case APP_CONSTANTS.DIRECTIONS.NORTH:
                    state.direction = APP_CONSTANTS.DIRECTIONS.WEST;
                    break;

                case APP_CONSTANTS.DIRECTIONS.EAST:
                case APP_CONSTANTS.DIRECTIONS.SOUTH:
                case APP_CONSTANTS.DIRECTIONS.WEST:
                    state.direction -= 90;
                break;
            }
            break;

        case 'RIGHT':
            if (!state.placed) return;

            switch (state.direction) {
                case APP_CONSTANTS.DIRECTIONS.WEST:
                    state.direction = APP_CONSTANTS.DIRECTIONS.NORTH;
                    break;

                case APP_CONSTANTS.DIRECTIONS.NORTH:
                case APP_CONSTANTS.DIRECTIONS.EAST:
                case APP_CONSTANTS.DIRECTIONS.SOUTH:
                    state.direction += 90;
                    break;
            }
            break;

        case 'REPORT':
            if (!state.placed) {
                return console.log('The robot is not on the table.');
            }
            let cleanedState = _.clone(state);
            cleanedState.direction = APP_CONSTANTS.NUMERIC_DIRECTIONS[state.direction];

            console.log('REPORT:', cleanedState);
            break;
    }

    if (debug) console.log('END', state);
};

module.exports = controlRobot;
