import clsx from "clsx"
import {
  ALLOWED_WIN_STREAK_OF_COINS,
  defaultState,
  GAME_RESULT,
} from "../constants"
import { useGameContext } from "../contexts/GameContext"
import { deepCopy } from "../utils"
import CoinGrid, { toggleColorCode } from "./CoinGrid"
import { coinStyle } from "./CoinPlaceholder"
import { Coins, CoinsTypes } from "../types/Coins"
import Header from "./Header"
import Reset from "./Reset"
import { useEffect, useState } from "react"
import { IGameContext } from "../types/IGameContext"

export default function GameBoard() {
  const {
    gridState,
    setGridState,
    nextColorCode,
    setNextColorCode,
    winList,
    setWinList,
    setTargetCoin,
  }: IGameContext = useGameContext()
  const [gameResult, setGameResult] = useState<string | null>(null)

  const handleReset = () => {
    setWinList([])
    setTargetCoin(null)
    setGridState(deepCopy(defaultState))
    setNextColorCode(1)
    setGameResult(null)
  }

  useEffect(() => {
    if (winList.length >= ALLOWED_WIN_STREAK_OF_COINS) {
      setGameResult(GAME_RESULT.WIN)
      setNextColorCode(toggleColorCode)
    } else if (gridState.every((row) => row.lastIndexOf(0) < 0)) {
      setGameResult(GAME_RESULT.GAME_DRAWN)
    }
  }, [winList, setNextColorCode, gridState])

  return (
    <div className={boardStyleClass}>
      <Header />
      <div className="flex justify-center">
        <div className={gameResultStyleClass(gameResult)}>
          {gameResult !== GAME_RESULT.GAME_DRAWN && (
            <div className={flipCoinStyleClass(nextColorCode)}></div>
          )}
          <span className="text-3xl md:text-5xl text-gray-900">
            {gameResult}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-between">
        <CoinGrid gameResult={gameResult} />
      </div>
      <Reset handleReset={handleReset} />
    </div>
  )
}

const flipCoinStyleClass = (nextColorCode: number) =>
  clsx(
    `rounded-full h-10 w-10 md:h-24 md:w-24 
  drop-shadow-xl border-t-2 border-l-2`,
    coinStyle[Coins[nextColorCode] as CoinsTypes],
    `shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]`,
    `${nextColorCode === 1 ? "animate-flipRight" : "animate-flipLeft"}`
  )

const gameResultStyleClass = (gameResult: string | null) =>
  clsx(`flex items-center gap-2 md:gap-5`, gameResult && "animate-bounce")

const boardStyleClass = clsx(
  `neumorph ring-2 ring-slate-900 rounded-md 
  p-5 md:p-10 m-2 md:m-4 shadow-md flex flex-col gap-1 md:gap-3`
)
