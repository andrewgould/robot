import * as fs from 'fs'
import { DirectionsToNumbers } from './constants'
import { Robot } from './controller'
import { RobotState } from './model'

const DEBUG = false

let state: RobotState = {
    x: 0,
    y: 0,
    direction: DirectionsToNumbers.East,
    placed: false,
}

const robot = new Robot(state, DEBUG)

fs.readFile('directions.txt', 'utf8', function (err, fileInput) {
    if (err) throw err
    let cleanedFile = fileInput.trim().split('\n')

    cleanedFile.forEach(function (line) {
        let action = line.split(' ')
        robot.process(action)
    })
})
