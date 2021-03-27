import { ACTION, COMPASS, ROTATE } from './Compass'
import { Grid } from './Grid'

export class MarsRover {

  constructor(private grid: Grid) {}

  execute(command: string) {
    let facing: string = COMPASS.NORTH

    const position = {
      x: 0,
      y: 0,
    }

    for (const commandItem of command) {
      if (commandItem === ROTATE.RIGHT) {
        facing = this.rotate(facing, commandItem)
      }

      if (commandItem === ROTATE.LEFT) {
        facing = this.rotate(facing, commandItem)
      }

      if (facing === COMPASS.NORTH && commandItem === ACTION.MOVE) {
        position.y++
      }

      if (facing === COMPASS.SOUTH && commandItem === ACTION.MOVE) {
        position.y--
      }

      if (facing === COMPASS.EAST && commandItem === ACTION.MOVE) {
        position.x++
      }

      if (facing === COMPASS.WEST && commandItem === ACTION.MOVE) {
        position.x--
      }

      if (position.x >= this.grid.getX()) {
        position.x = 0
      }

      if (position.y >= this.grid.getY()) {
        position.y = 0
      }
    }

    return `${position.x}:${position.y}:${facing}`
  }

  rotate(facing: string, direction: string): string {
    const position = {
      [ROTATE.RIGHT]: {
        [ COMPASS.NORTH ]: COMPASS.EAST,
        [ COMPASS.EAST ]: COMPASS.SOUTH,
        [ COMPASS.SOUTH ]: COMPASS.WEST,
        [ COMPASS.WEST ]: COMPASS.NORTH
      },
      [ROTATE.LEFT]: {
        [ COMPASS.NORTH ]: COMPASS.WEST,
        [ COMPASS.WEST ]: COMPASS.SOUTH,
        [ COMPASS.SOUTH ]: COMPASS.EAST,
        [ COMPASS.EAST ]: COMPASS.NORTH,
      }
    }

    return position[direction][facing]
  }
}