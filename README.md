# Robot
This is the 5x5 grid robot demo that gets used as a coding test. This has been written for execution within TypeScript.

0,0 is the south-west corner, i.e., we're dealing with the positive quadrant of a Cartesian plane.

## Running it
From your command line, run `npm start`

## Giving it directions
`directions.txt` contains the directions on each line.

Valid commands:
* `PLACE x,y,z` to put it on the table at a specific location, can be used multiple times. Robot cannot fall off table.
  * x = horizontal direction, 0-4
  * y = vertical direction, 0-4
  * z = NORTH/EAST/SOUTH/WEST
* MOVE to move it in the direction it's facing
* LEFT to rotate -90°
* RIGHT to rotate 90°
* REPORT to report the current location and direction
