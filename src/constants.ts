export const MAX_GRID_DEPTH = 6

export const MAX_GRID_COLUMN = 7

export const defaultState = Array.from(Array(MAX_GRID_COLUMN), () =>
  Array(MAX_GRID_DEPTH).fill(0)
)

export const APP_NAME = "CONNECT 4"

export const ALLOWED_WIN_STREAK_OF_COINS = 4

export const ERRORS = {
  INVALID_TARGET_POSITION: "Invalid targetPosition",
  INVALID_TARGET_VALUE: "Value in targetPosition must be 1 | 2",
  INVALID_GRID_STATE: "Invalid gridState",
}

export const GAME_RESULT = {
  WIN: "WINS",
  GAME_DRAWN: "GAME DRAWN",
}
