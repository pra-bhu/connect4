import clsx from "clsx"
import { useEffect } from "react"
import { useGameContext } from "../contexts/GameContext"
import { GameEngine } from "../core"
import { Coins } from "../types/Coins"
import { IGameContext } from "../types/IGameContext"
import { getPositionInArray } from "../utils"
import CoinPlaceholder from "./CoinPlaceholder"

export default function CoinGrid({
  gameResult,
}: {
  gameResult: string | null
}) {
  const {
    gridState,
    setGridState,
    nextColorCode,
    setNextColorCode,
    winList,
    setWinList,
    targetCoin,
    setTargetCoin
  }: IGameContext = useGameContext()

  const handleClick = (clickedId: string): void => {
    // if Game is Over
    if (gameResult) return

    const [row] = getPositionInArray(clickedId)
    const rowDiscs = gridState[row]
    const bottomEmptyCol = rowDiscs.lastIndexOf(0)
    if (bottomEmptyCol >= 0) {
      setTargetCoin(`${row}:${bottomEmptyCol}`)
      setGridState((grid: number[][]) => {
        grid[row][bottomEmptyCol] = nextColorCode
        return grid
      })
      setNextColorCode(toggleColorCode)
    }
    return
  }

  useEffect(() => {
    if (targetCoin) {
      const gameEngine = new GameEngine(targetCoin, gridState)
      setWinList(gameEngine.checkWinner())
    }
  }, [targetCoin, gridState, setWinList])

  return (
    <>
      <div className="grid grid-cols-7 gap-2 md:gap-3 ">
        {gridState.map((row, rowId) => {
          return (
            <div key={rowId} className={gridRowStyleClass}>
              {row.map((col, colId) => {
                const id = `${rowId}:${colId}`
                return (
                  <CoinPlaceholder
                    key={id}
                    id={id}
                    class={Coins[col]}
                    isTargetCoin={id === targetCoin}
                    isInWinList={winList.includes(id)}
                    handleClick={handleClick}
                    reset={false}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export const toggleColorCode = (nextColorCode: number) => (nextColorCode === Coins.Blue ? Coins.Red : Coins.Blue)

const gridRowStyleClass = clsx(
  `group flex flex-col gap-2 md:gap-4 `
)
