import { defaultState} from "../constants"
import { GameEngine } from "../core"
import { deepCopy } from "../utils"

describe("GameEngine ->", () => {
  describe("new GameEngine(targetPosition: string, gridState: number[][]):number ->", () => {
    let testGrid = deepCopy(defaultState)
    test("should throw validation error", () => {
      expect(() => {
        new GameEngine("a:b", [[0, 0, 0, 0]])
      }).toThrow("Invalid targetPosition")
      expect(() => {
        new GameEngine("", [[]])
      }).toThrow("Invalid targetPosition")
      expect(() => {
        new GameEngine("6:7", [[]])
      }).toThrow("Invalid targetPosition")
      expect(() => {
        new GameEngine("333:3", [[0, 0, 0, 0]])
      }).toThrow("Invalid targetPosition")

      expect(() => {
        new GameEngine("0:1", [[0, 0, 0, 0]])
      }).toThrow("Value in targetPosition must be 1 | 2")
      expect(() => {
        new GameEngine("0:1", [[0, 1, 0, 0]])
      }).toThrow("Invalid gridState")
      // expect(() => {new GameEngine('3:3',[[]])}).toThrow('Invalid gridState')
    })
    test("should create GameEngine", () => {
      testGrid[1][1] = 1
      let gameEngine = new GameEngine("1:1", testGrid)
      expect(gameEngine).toBeTruthy()
    })
  })

  describe("getDownwardsWinList_NorthSouth= ():Array<string> ->", () => {
    let testGrid = deepCopy(defaultState)
    test("should return empty list - no win downwards", () => {
      testGrid[1][1] = 1
      let gameEngine = new GameEngine("1:1", testGrid)
      expect(gameEngine.getDownwardsWinList_NorthSouth().length).toBe(0)
    })
    test("should return list of positions of length 4", () => {
      testGrid[1][0] = 1
      testGrid[1][2] = 1
      testGrid[1][3] = 1
      let gameEngine = new GameEngine("1:0", testGrid)
      let winList = gameEngine.getDownwardsWinList_NorthSouth()
      expect(winList.length).toBe(4)
      const expectedList = ["1:3", "1:2", "1:1", "1:0"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return empty list", () => {
      testGrid[1][2] = 2
      let gameEngine = new GameEngine("1:3", testGrid)
      let winList = gameEngine.getDownwardsWinList_NorthSouth()
      expect(winList.length).toBe(0)
    })
  })

  describe("getSidewaysWinList_EastWest= ():Array<string> ->", () => {
    let testGrid = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 1],
      [0, 0, 0, 0, 0, 1],
    ]
    test("should return empty list - no win Sideways", () => {
      let gameEngine = new GameEngine("3:5", testGrid)
      expect(gameEngine.getSidewaysWinList_EastWest().length).toBe(0)
    })
    test("should return list of positions of length 4", () => {
      testGrid[4][5] = 1
      let gameEngine = new GameEngine("4:5", testGrid)
      let winList = gameEngine.getSidewaysWinList_EastWest()
      expect(winList.length).toBe(4)
      const expectedList = ["6:5", "5:5", "4:5", "3:5"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 from 4th Col", () => {
      testGrid[3][4] = 2
      testGrid[4][4] = 2
      testGrid[6][4] = 2
      let gameEngine = new GameEngine("3:4", testGrid)
      let winList = gameEngine.getSidewaysWinList_EastWest()
      expect(winList.length).toBe(4)
      const expectedList = ["6:4", "5:4", "4:4", "3:4"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 from [0..3] row in [5]Col", () => {
      testGrid[4][5] = 0
      testGrid[3][5] = 1
      testGrid[2][5] = 1
      testGrid[1][5] = 1
      testGrid[0][5] = 1
      let gameEngine = new GameEngine("1:5", testGrid)
      let winList = gameEngine.getSidewaysWinList_EastWest()
      expect(winList.length).toBe(4)
      const expectedList = ["3:5", "2:5", "1:5", "0:5"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 from [5,6] row in [5]Col", () => {
      let gameEngine = new GameEngine("5:5", testGrid)
      let winList = gameEngine.getSidewaysWinList_EastWest()
      expect(winList.length).toBe(0)
    })
  })

  describe("getDiagonalWinList_NorthEastSouthWest= ():Array<string> ->", () => {
    let testGrid = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 2, 2],
      [0, 0, 0, 1, 2, 1],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 0, 0, 0, 1],
    ]
    test("should return empty list first scenario", () => {
      testGrid[1][1] = 1
      let gameEngine = new GameEngine("1:1", testGrid)
      expect(gameEngine.getDiagonalWinList_NorthEastSouthWest().length).toBe(0)
    })
    test("should return list of positions of length 4 diagonal up right", () => {
      let gameEngine = new GameEngine("6:5", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthEastSouthWest()
      expect(winList.length).toBe(4)
      const expectedList = ["6:5", "5:4", "4:3", "3:2"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 diagonal down left", () => {
      let gameEngine = new GameEngine("3:2", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthEastSouthWest()
      expect(winList.length).toBe(4)
      const expectedList = ["6:5", "5:4", "4:3", "3:2"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 diagonal down left from 0:0", () => {
      testGrid[0][0] = 1
      testGrid[1][1] = 1
      testGrid[2][2] = 1
      let gameEngine = new GameEngine("0:0", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthEastSouthWest()
      expect(winList.length).toBe(4)
      const expectedList = ["0:0", "1:1", "2:2", "3:3"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 diagonal down left from 1:1", () => {
      let gameEngine = new GameEngine("1:1", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthEastSouthWest()
      expect(winList.length).toBe(4)
      const expectedList = ["0:0", "1:1", "2:2", "3:3"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return empty list second scenario", () => {
      testGrid[6][1] = 2
      testGrid[5][0] = 2
      let gameEngine = new GameEngine("5:0", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthEastSouthWest()
      expect(winList.length).toBe(0)
    })
    test("should return empty list third scenario", () => {
      testGrid[0][4] = 2
      testGrid[1][5] = 2
      let gameEngine = new GameEngine("1:5", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthEastSouthWest()
      expect(winList.length).toBe(0)
      gameEngine = new GameEngine("0:4", testGrid)
      winList = gameEngine.getDiagonalWinList_NorthEastSouthWest()
      expect(winList.length).toBe(0)
    })
  })

  describe("getDiagonalWinList_NorthWestSouthEast= ():Array<string> ->", () => {
    let testGrid = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 0, 0, 2, 1],
      [0, 0, 0, 2, 1, 2],
      [0, 0, 2, 1, 1, 1],
    ]
    test("should return empty list first scenario", () => {
      testGrid[1][1] = 1
      let gameEngine = new GameEngine("1:1", testGrid)
      expect(gameEngine.getDiagonalWinList_NorthWestSouthEast().length).toBe(0)
    })
    test("should return list of positions of length 4 diagonal up right", () => {
      let gameEngine = new GameEngine("6:2", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthWestSouthEast()
      expect(winList.length).toBe(4)
      const expectedList = ["6:2", "5:3", "4:4", "3:5"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 diagonal down left", () => {
      let gameEngine = new GameEngine("3:5", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthWestSouthEast()
      expect(winList.length).toBe(4)
      const expectedList = ["3:5", "4:4", "5:3", "6:2"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 diagonal down left from 0:0", () => {
      testGrid[6][0] = 1
      testGrid[5][1] = 1
      testGrid[4][2] = 1
      testGrid[3][3] = 1
      let gameEngine = new GameEngine("6:0", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthWestSouthEast()
      expect(winList.length).toBe(4)
      const expectedList = ["6:0", "5:1", "4:2", "3:3"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return list of positions of length 4 diagonal down left from 1:1", () => {
      let gameEngine = new GameEngine("5:1", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthWestSouthEast()
      expect(winList.length).toBe(4)
      const expectedList = ["6:0", "5:1", "4:2", "3:3"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return empty list second scenario", () => {
      testGrid[0][1] = 2
      testGrid[1][0] = 2
      let gameEngine = new GameEngine("1:0", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthWestSouthEast()
      expect(winList.length).toBe(0)
    })
    test("should return empty list third scenario", () => {
      let gameEngine = new GameEngine("5:5", testGrid)
      let winList = gameEngine.getDiagonalWinList_NorthWestSouthEast()
      expect(winList.length).toBe(0)
      gameEngine = new GameEngine("6:4", testGrid)
      winList = gameEngine.getDiagonalWinList_NorthWestSouthEast()
      expect(winList.length).toBe(0)
    })
  })

  describe("checkWinner = () => Array<string>", () => {
    let testGrid = [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 2, 2],
      [0, 0, 0, 2, 2, 1],
      [0, 0, 0, 0, 2, 1],
    ]

    test("should return sidewaysWinList_EastWest", () => {
      const gameEngine = new GameEngine("6:4", testGrid)
      const winList = gameEngine.checkWinner()
      expect(winList.length).toBe(4)
      const expectedList = ["6:4", "5:4", "4:4", "3:4"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return downwardsWinList_NorthSouth", () => {
      testGrid[4][2] = 2
      testGrid[4][3] = 2
      testGrid[3][4] = 0
      const gameEngine = new GameEngine("4:2", testGrid)
      const winList = gameEngine.checkWinner()
      expect(winList.length).toBe(4)
      const expectedList = ["4:2", "4:3", "4:4", "4:5"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return getDiagonalWinList_NorthEastSouthWest", () => {
      testGrid[4][2] = 0
      testGrid[4][3] = 0
      testGrid[3][4] = 2
      testGrid[2][3] = 2
      testGrid[1][2] = 2
      const gameEngine = new GameEngine("1:2", testGrid)
      const winList = gameEngine.checkWinner()
      expect(winList.length).toBe(4)
      const expectedList = ["1:2", "2:3", "3:4", "4:5"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return getDiagonalWinList_NorthWestSouthEast", () => {
      testGrid[4][2] = 0
      testGrid[4][3] = 0
      testGrid[4][4] = 2
      testGrid[3][4] = 2
      testGrid[3][5] = 2
      testGrid[5][3] = 2
      testGrid[6][2] = 2
      const gameEngine = new GameEngine("6:2", testGrid)
      const winList = gameEngine.checkWinner()
      expect(winList.length).toBe(4)
      const expectedList = ["6:2", "5:3", "4:4", "3:5"]
      expectedList.map((pos) => expect(winList).toContain(pos))
    })
    test("should return empty list", () => {
      testGrid[4][2] = 0
      testGrid[4][3] = 0
      testGrid[4][4] = 0
      testGrid[3][4] = 0
      testGrid[3][5] = 0
      testGrid[5][3] = 0
      testGrid[6][2] = 1
      const gameEngine = new GameEngine("6:2", testGrid)
      const winList = gameEngine.checkWinner()
      expect(winList.length).toBe(0)
    })
  })
})
