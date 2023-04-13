import { createContext, useContext, useState } from "react"
import { MAX_GRID_COLUMN, MAX_GRID_DEPTH } from "../constants"
import { Coins } from "../types/Coins"

export const initialState = Array.from(Array(MAX_GRID_COLUMN), () => Array(MAX_GRID_DEPTH).fill(0))

const GameContext = createContext<any>({
  gridState: initialState ,
  nextColorCode: 0,
  winList:[]
})

export const GameProvider = ({children}:{children: React.ReactNode}) => {
  const [gridState, setGridState] = useState(initialState)
  const [winList, setWinList] = useState<Array<string>>([])
  const [nextColorCode, setNextColorCode] = useState<Coins.Blue|Coins.Red>(Coins.Blue)
  const [targetCoin, setTargetCoin] = useState<string | null>(null)
  return (
    <GameContext.Provider value={{
      gridState,
      setGridState,
      nextColorCode, 
      setNextColorCode,
      winList, 
      setWinList,
      targetCoin,
      setTargetCoin
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)