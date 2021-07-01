import { PacmanState } from '../app/model'
import { DirectionsToNumbers } from '../app/constants'
import { Pacman } from '../app/controller'

let state: PacmanState = {
    x: 0,
    y: 0,
    direction: DirectionsToNumbers.East,
    placed: false,
}

test('Scenario 1', () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: false })
    const directions = ['PLACE 0,0,NORTH', 'MOVE', 'REPORT']

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith('0,1,NORTH')
})

test('Scenario 2', () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: false })
    const directions = ['PLACE 0,0,NORTH', 'LEFT', 'REPORT']

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith('0,0,WEST')
})

test('Scenario 3', () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: false })
    const directions = [
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'MOVE',
        'REPORT',
    ]

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith('3,3,NORTH')
})

test('Floats should be smoothed out', () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: false })
    const directions = [
        'PLACE 1.2,2.1,WEST',
        'MOVE',
        'MOVE',
        'RIGHT',
        'MOVE',
        'REPORT',
    ]

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith('0,3,NORTH')
})

test("Doesn't fall off edge", () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: false })
    const directions = [
        'PLACE 1,1,SOUTH',
        'MOVE',
        'MOVE',
        'MOVE',
        'MOVE',
        'MOVE',
        'REPORT',
    ]

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith('1,0,SOUTH')
})

test('Complains if not on table', () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: true })
    const directions = ['MOVE', 'REPORT']

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith('Pacman is not on the table.')
})

test('Changes directions nicely', () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: false })
    const directions = [
        'PLACE 1,1,SOUTH',
        'LEFT',
        'LEFT',
        'MOVE',
        'RIGHT',
        'RIGHT',
        'REPORT',
    ]

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith('1,2,SOUTH')
})

test(`Won't go out of bounds`, () => {
    console.log = jest.fn()
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: true })
    const directions = ['PLACE -10,10,SOUTH', 'REPORT']

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.log).toBeCalledWith(
        'Pacman X coordinate was out of bounds at -10, setting to 0.'
    )
    expect(console.log).toBeCalledWith(
        'Pacman Y coordinate was out of bounds at 10, setting to 4.'
    )
    expect(console.log).toBeCalledWith('0,4,SOUTH')
    expect(console.debug).toBeCalledWith({
        direction: 90,
        placed: false,
        x: 0,
        y: 0,
    })
})

test('Only uses console.debug for debugging', () => {
    console.debug = jest.fn()

    const pacman = new Pacman({ state, debug: false })
    const directions = ['PLACE 1,1,SOUTH', 'REPORT']

    directions.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })

    expect(console.debug).toHaveBeenCalledTimes(0)
})
