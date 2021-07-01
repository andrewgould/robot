import * as _ from 'lodash'
import { NumbersToDirections, DirectionsToNumbers } from './constants'
import { PacmanState } from './model'

export class Pacman {
    public state
    private readonly debug

    constructor({ state, debug }) {
        this.state = state
        this.debug = debug
    }

    convertDirection(word) {
        switch (word.toUpperCase()) {
            case 'NORTH':
            default:
                return DirectionsToNumbers.North
            case 'EAST':
                return DirectionsToNumbers.East
            case 'SOUTH':
                return DirectionsToNumbers.South
            case 'WEST':
                return DirectionsToNumbers.West
        }
    }

    process(decision) {
        switch (decision[0].toUpperCase()) {
            case 'PLACE':
                const choiceArray =
                    decision.length > 0 ? decision[1].split(',') : decision

                let newState: PacmanState = {
                    x: parseInt(choiceArray[0]),
                    y: parseInt(choiceArray[1]),
                    direction: this.convertDirection(choiceArray[2]),
                    placed: true,
                }

                this.xyClamp(newState, newState.x, newState.y)
                this.state = newState

                break

            case 'MOVE':
                if (!this.state.placed) return

                switch (this.state.direction) {
                    case DirectionsToNumbers.North:
                        if (this.state.y < 4) this.state.y++
                        break

                    case DirectionsToNumbers.South:
                        if (this.state.y > 0) this.state.y--
                        break

                    case DirectionsToNumbers.West:
                        if (this.state.x > 0) this.state.x--
                        break

                    case DirectionsToNumbers.East:
                        if (this.state.x < 4) this.state.x++
                        break
                }
                break

            case 'LEFT':
                if (!this.state.placed) return

                switch (this.state.direction) {
                    case DirectionsToNumbers.North:
                        this.state.direction = DirectionsToNumbers.West
                        break

                    case DirectionsToNumbers.East:
                    case DirectionsToNumbers.South:
                    case DirectionsToNumbers.West:
                        this.state.direction -= 90
                        break
                }
                break

            case 'RIGHT':
                if (!this.state.placed) return

                switch (this.state.direction) {
                    case DirectionsToNumbers.West:
                        this.state.direction = DirectionsToNumbers.North
                        break

                    case DirectionsToNumbers.North:
                    case DirectionsToNumbers.East:
                    case DirectionsToNumbers.South:
                        this.state.direction += 90
                        break
                }
                break

            case 'REPORT':
                if (!this.state.placed) {
                    return this.logger('Pacman is not on the table.')
                }
                let cleanedState = _.clone(this.state)
                cleanedState.direction =
                    NumbersToDirections[this.state.direction]

                console.log(
                    `${this.state.x},${this.state.y},${
                        NumbersToDirections[this.state.direction]
                    }`
                )
                break
        }
    }

    private logger(message: string) {
        if (this.debug) console.log(message, this.state)
    }

    private xyClamp(state = this.state, x, y) {
        let _x = _.clamp(x, 0, 4)
        let _y = _.clamp(y, 0, 4)

        if (_x !== x) {
            this.logger(
                `Pacman X coordinate was out of bounds at ${x}, setting to ${_x}.`
            )
            state.x = _x
        }
        if (_y !== y) {
            this.logger(
                `Pacman Y coordinate was out of bounds at ${y}, setting to ${_y}.`
            )
            state.y = _y
        }
    }
}
