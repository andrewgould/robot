import * as fs from 'fs'
import { controlRobot } from './controller'

import { DIRECTIONS } from './constants'

const DEBUG = true

let state = {
    x: 0,
    y: 0,
    direction: DIRECTIONS.EAST,
    placed: false,
}

fs.readFile('directions.txt', 'utf8', function (err, fileInput) {
    if (err) throw err
    let cleanedFile = fileInput.trim().split('\n')

    cleanedFile.forEach(function (line) {
        let chunks = line.split(' ')
        controlRobot(state, chunks, DEBUG)
    })
})
