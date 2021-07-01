import * as _ from 'lodash'
import { DIRECTIONS, NUMERIC_DIRECTIONS } from './constants'

/**
 * ƒ controlRobot
 * The interpreter of the directions.
 *
 * @param state
 * @param decision
 * @param debug
 */
export function controlRobot(state, decision, debug) {
    if (debug) console.log('START', decision, state)

    switch (decision[0].toUpperCase()) {
        case 'PLACE':
            let choiceArray =
                decision.length > 0 ? decision[1].split(',') : decision
            let newState = {
                x: parseInt(choiceArray[0]),
                y: parseInt(choiceArray[1]),
                direction: DIRECTIONS[choiceArray[2].toUpperCase()],
                placed: true,
            }

            if (newState.x < 0) {
                if (debug)
                    console.log(
                        'Robot X coordinate was out of bounds, setting to 0.'
                    )
                newState.x = 0
            } else if (newState.x > 4) {
                if (debug)
                    console.log(
                        'Robot X coordinate was out of bounds, setting to 4.'
                    )
                newState.x = 4
            }

            if (newState.y < 0) {
                if (debug)
                    console.log(
                        'Robot Y coordinate was out of bounds, setting to 0.'
                    )
                newState.y = 0
            } else if (newState.y > 4) {
                if (debug)
                    console.log(
                        'Robot Y coordinate was out of bounds, setting to 4.'
                    )
                newState.y = 4
            }

            switch (newState.direction) {
                case DIRECTIONS.NORTH:
                case DIRECTIONS.EAST:
                case DIRECTIONS.SOUTH:
                case DIRECTIONS.WEST:
                    break

                default:
                    if (debug)
                        console.log(
                            'Robot direction was not understood, setting to north.'
                        )
                    newState.direction = DIRECTIONS.NORTH
                    break
            }

            state.x = newState.x
            state.y = newState.y
            state.direction = newState.direction
            state.placed = newState.placed

            break

        case 'MOVE':
            if (!state.placed) return

            switch (state.direction) {
                case DIRECTIONS.NORTH:
                    if (state.y < 4) state.y += 1
                    break

                case DIRECTIONS.SOUTH:
                    if (state.y > 0) state.y -= 1
                    break

                case DIRECTIONS.WEST:
                    if (state.x > 0) state.x -= 1
                    break

                case DIRECTIONS.EAST:
                    if (state.x < 4) state.x += 1
                    break
            }
            break

        case 'LEFT':
            if (!state.placed) return

            switch (state.direction) {
                case DIRECTIONS.NORTH:
                    state.direction = DIRECTIONS.WEST
                    break

                case DIRECTIONS.EAST:
                case DIRECTIONS.SOUTH:
                case DIRECTIONS.WEST:
                    state.direction -= 90
                    break
            }
            break

        case 'RIGHT':
            if (!state.placed) return

            switch (state.direction) {
                case DIRECTIONS.WEST:
                    state.direction = DIRECTIONS.NORTH
                    break

                case DIRECTIONS.NORTH:
                case DIRECTIONS.EAST:
                case DIRECTIONS.SOUTH:
                    state.direction += 90
                    break
            }
            break

        case 'REPORT':
            if (!state.placed) {
                return console.log('The robot is not on the table.')
            }
            let cleanedState = _.clone(state)
            cleanedState.direction = NUMERIC_DIRECTIONS[state.direction]

            console.log('REPORT:', cleanedState)
            break
    }

    if (debug) console.log('END', state)
}
