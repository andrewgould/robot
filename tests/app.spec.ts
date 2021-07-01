import { PacmanState } from '../app/model'
import { DirectionsToNumbers } from '../app/constants'
import { Pacman } from '../app/controller'

let state: PacmanState = {
    x: 0,
    y: 0,
    direction: DirectionsToNumbers.East,
    placed: false,
}

const robot = new Pacman({ state, debug: false })

test('Scenario 1', () => {
    const directions = ['PLACE 0,0,NORTH', 'MOVE', 'REPORT']
    console.log = jest.fn()

    directions.forEach(function (line) {
        let action = line.split(' ')
        robot.process(action)
    })

    expect(console.log).toBeCalledWith('0,1,NORTH')
})

test('Scenario 2', () => {
    const directions = ['PLACE 0,0,NORTH', 'LEFT', 'REPORT']
    console.log = jest.fn()

    directions.forEach(function (line) {
        let action = line.split(' ')
        robot.process(action)
    })

    expect(console.log).toBeCalledWith('0,0,WEST')
})

test('Scenario 3', () => {
    const directions = [
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'MOVE',
        'REPORT',
    ]
    console.log = jest.fn()

    directions.forEach(function (line) {
        let action = line.split(' ')
        robot.process(action)
    })

    expect(console.log).toBeCalledWith('3,3,NORTH')
})
