import * as fs from 'fs'
import { DirectionsToNumbers } from './app/constants'
import { Robot } from './app/controller'
import { RobotState } from './app/model'

let state: RobotState = {
    x: 0,
    y: 0,
    direction: DirectionsToNumbers.East,
    placed: false,
}

const robot = new Robot({ state, debug: false })

fs.readFile('directions.txt', 'utf8', function (err, fileInput) {
    if (err) throw err
    let cleanedFile = fileInput.trim().split('\n')

    cleanedFile.forEach(function (line) {
        let action = line.split(' ')
        robot.process(action)
    })
})
