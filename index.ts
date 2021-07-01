import * as fs from 'fs'
import { DirectionsToNumbers } from './app/constants'
import { Pacman } from './app/controller'
import { PacmanState } from './app/model'

let state: PacmanState = {
    x: 0,
    y: 0,
    direction: DirectionsToNumbers.East,
    placed: false,
}

const pacman = new Pacman({ state, debug: false })

fs.readFile('directions.txt', 'utf8', function (err, fileInput) {
    if (err) throw err
    let cleanedFile = fileInput.trim().split('\n')

    cleanedFile.forEach(function (line) {
        let action = line.split(' ')
        pacman.process(action)
    })
})
