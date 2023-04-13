import {
  MAX_GRID_COLUMN,
  MAX_GRID_DEPTH,
  ALLOWED_WIN_STREAK_OF_COINS,
  ERRORS,
} from "../constants"
import { getPositionInArray } from "../utils"

export interface IGameEngine {
  gridState: number[][]
  targetPosition: string
}

const regexForTargetPosition = new RegExp(
  `\\b([0-${MAX_GRID_COLUMN}]:[0-${MAX_GRID_DEPTH}])\\b`
)

export class GameEngine implements IGameEngine {
  gridState: number[][]
  targetPosition: string
  targetCoinColorCode: number
  startRow: number
  startCol: number

  constructor(targetPosition: string, gridState: number[][]) {
    if (!regexForTargetPosition.test(targetPosition))
      throw Error(ERRORS.INVALID_TARGET_POSITION)

    const [row, col] = getPositionInArray(targetPosition)

    if (![1, 2].includes(gridState[row][col]))
      throw Error(ERRORS.INVALID_TARGET_VALUE)
    if (
      gridState.length !== MAX_GRID_COLUMN ||
      gridState.every((grid) => grid.length !== MAX_GRID_DEPTH)
    )
      throw Error(ERRORS.INVALID_GRID_STATE)

    this.gridState = gridState
    this.targetPosition = targetPosition
    this.startCol = col
    this.startRow = row
    this.targetCoinColorCode = gridState[row][col]
  }

  checkWinner = (
  ): Array<string> => {
    const downwardsWinList_NorthSouth = this.getDownwardsWinList_NorthSouth()
    if(downwardsWinList_NorthSouth.length > 0) return downwardsWinList_NorthSouth

    const sidewaysWinList_EastWest= this.getSidewaysWinList_EastWest()
    if(sidewaysWinList_EastWest.length > 0) return sidewaysWinList_EastWest
    
    const diagonalWinList_NorthEastSouthWest = this.getDiagonalWinList_NorthEastSouthWest()
    if(diagonalWinList_NorthEastSouthWest.length > 0) return diagonalWinList_NorthEastSouthWest
    
    const diagonalWinList_NorthWestSouthEast = this.getDiagonalWinList_NorthWestSouthEast()
    if(diagonalWinList_NorthWestSouthEast.length > 0) return diagonalWinList_NorthWestSouthEast
    
    return []
  }

  getDownwardsWinList_NorthSouth = (): Array<string> => {
    let matchedCoins: Array<string> = []
    for (let col = this.startCol; col >= 0; col++) {
      if (this.gridState[this.startRow][col] === this.targetCoinColorCode) {
        matchedCoins.push(`${this.startRow}:${col}`)
      } else break
    }
    return matchedCoins.length === ALLOWED_WIN_STREAK_OF_COINS
      ? matchedCoins
      : []
  }

  getSidewaysWinList_EastWest = (): Array<string> => {
    let matchedCoins: Array<string> = []
    for (let row = this.startRow; row >= 0; row--) {
      if (this.gridState[row][this.startCol] === this.targetCoinColorCode) {
        matchedCoins.push(`${row}:${this.startCol}`)
      } else break
    }
    for (let row = this.startRow + 1; row < MAX_GRID_COLUMN; row++) {
      if (this.gridState[row][this.startCol] === this.targetCoinColorCode) {
        matchedCoins.unshift(`${row}:${this.startCol}`)
      } else break
    }
    return matchedCoins.length === ALLOWED_WIN_STREAK_OF_COINS
      ? matchedCoins
      : []
  }

  getDiagonalWinList_NorthEastSouthWest = (): Array<string> => {
    let matchedCoins: Array<string> = []
    for (let offset = 0; offset < ALLOWED_WIN_STREAK_OF_COINS; offset++) {
      if (this.startRow - offset >= 0 && this.startCol - offset >= 0) {
        if (
          this.gridState[this.startRow - offset][this.startCol - offset] ===
          this.targetCoinColorCode
        ) {
          matchedCoins.push(
            `${this.startRow - offset}:${this.startCol - offset}`
          )
        } else break
      } else break
    }

    for (let offset = 1; offset < ALLOWED_WIN_STREAK_OF_COINS; offset++) {
      if (
        this.startRow + offset < MAX_GRID_COLUMN &&
        this.startCol + offset < MAX_GRID_DEPTH
      ) {
        if (
          this.gridState[this.startRow + offset][this.startCol + offset] ===
          this.targetCoinColorCode
        ) {
          matchedCoins.push(
            `${this.startRow + offset}:${this.startCol + offset}`
          )
        } else break
      } else break
    }
    return matchedCoins.length === ALLOWED_WIN_STREAK_OF_COINS
      ? matchedCoins
      : []
  }

  getDiagonalWinList_NorthWestSouthEast = (): Array<string> => {
    let matchedCoins: Array<string> = []

    for (let offset = 0; offset < ALLOWED_WIN_STREAK_OF_COINS; offset++) {
      if (
        this.startRow - offset >= 0 &&
        this.startCol + offset < MAX_GRID_DEPTH
      ) {
        if (
          this.gridState[this.startRow - offset][this.startCol + offset] ===
          this.targetCoinColorCode
        ) {
          matchedCoins.push(
            `${this.startRow - offset}:${this.startCol + offset}`
          )
        } else break
      } else break
    }

    for (let offset = 1; offset < ALLOWED_WIN_STREAK_OF_COINS; offset++) {
      if (
        this.startRow + offset < MAX_GRID_COLUMN &&
        this.startCol - offset >= 0
      ) {
        if (
          this.gridState[this.startRow + offset][this.startCol - offset] ===
          this.targetCoinColorCode
        ) {
          matchedCoins.push(
            `${this.startRow + offset}:${this.startCol - offset}`
          )
        } else break
      } else break
    }
    return matchedCoins.length === ALLOWED_WIN_STREAK_OF_COINS
      ? matchedCoins
      : []
  }
}
