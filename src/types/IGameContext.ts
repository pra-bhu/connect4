import { Dispatch, SetStateAction } from "react"

export type IGameContext = {
  gridState:number[][] , 
  setGridState:Dispatch<SetStateAction<number[][]>>
  nextColorCode:number, 
  setNextColorCode:Dispatch<SetStateAction<number>>
  winList:Array<string>
  setWinList:Dispatch<SetStateAction<Array<string>>>
  targetCoin:string|null
  setTargetCoin:Dispatch<SetStateAction<string|null>>
}