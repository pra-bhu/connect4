import GameBoard from "./components/GameBoard"
import { GameProvider } from "./contexts/GameContext"

export default function App() {
  return (
    <GameProvider>
      <div className="flex justify-center items-center h-screen bg-[#e4e2e2]">
        <GameBoard/>
      </div>
    </GameProvider>
  )
}