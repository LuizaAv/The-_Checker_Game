const prompt = require('prompt-sync')({ sigint: true })

class Board {
    constructor(){
        this.step = 1

        this.score = {
            "1": 0,
            "0": 0
        }

        this.stones = {
            "1": 12,
            "0": 12
        }

        this.board = [
            [{"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}],
            [{"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}],
            [{"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}],
            [{"value": 1, "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""}],
            [{"value": "-", "role": ""},{"value": 0, "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""}],
            [{"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": "-", "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}],
            [{"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}],
            [{"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}]
        ]

        this.history = []
        this.stepsDone = 0
    }

    printBoard(){
        let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let beforeRow = ""

        this.board.map((item, row) => {
            let aRow = `${arr[arr.length - 1 - row]} |`
            item.map((item, column) => {
                if (this.board[row][column].value === 0) {
                    aRow += this.board[row][column].role === "queen" ? ` 🔲 ` : ` ⚫ `
                } else if (this.board[row][column].value === 1) {
                    aRow += this.board[row][column].role === "queen" ? ` 🔳 ` : ` ⚪ `
                } else {
                    aRow += `  - `                   
                }
            })
            console.log(aRow)
            console.log(beforeRow)
        })

        let aRow = "  "
        this.board.map((item, row) => {
            aRow += `  ${row + 1} `
        })
    
        console.log(aRow)
        console.log(beforeRow)
        console.log(`${this.step === 1 ? "Whites' " : "Blacks' "} turn: `)
        console.log(beforeRow)
        console.log(`Current Score: `)
        console.log(beforeRow)
        console.log(`Whites: ${this.score[1]}`)
        console.log(`Blacks: ${this.score[0]}`)
        console.log(beforeRow)
        console.log("Steps history")
        console.log(beforeRow)
        for(let item = 0; item < this.history.length; ++item){
            console.log(`${item}. ${this.history[item].turn === 1 ? "White" : "Black"} - ${this.history[item].value}`)
        }
        console.log(beforeRow)
    }

    reset(){
        this.board = [
            [{"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}],
            [{"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}],
            [{"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 0, "role": "generalPLayer"}],
            [{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""}],
            [{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""},{"value": "-", "role": ""}],
            [{"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}],
            [{"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}],
            [{"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}, {"value": 1, "role": "generalPLayer"}, {"value": "-", "role": ""}]
        ]
    }

    winner(){
        if (this.stones[0] === 0) {
            console.log(`The winner is white`)
        } else if (this.stones[1] === 0) {
            console.log(`The winner is black`)
        }
    }
}

class NewGame extends Board{
    constructor(){
        super()
    }

    move(){
        let userInputForStep = this.userInput()
        let joinedInput = userInputForStep.join("")

        if(joinedInput.substring(0, 4).toLowerCase() === "undo"){

            let step = joinedInput.substring(4)
            this.undoMove(step)

        }else{

            let elemRow
            let elemCol = +(joinedInput[1] - 1)

            this.history.push({
                "value": joinedInput, 
                "board": this.deepCopyBoard(this.board),
                "turn": this.step,
                "score": {...this.score},
                "stones": {...this.stones},
                "id": this.stepsDone
            })

            ++this.stepsDone
            
            this.winner()   

            switch(joinedInput[0].toLowerCase()){
                case "a":
                    elemRow = 0
                    break
                case "b":
                    elemRow = 1
                    break
                case "c":
                    elemRow = 2
                    break
                case "d":
                    elemRow = 3
                    break
                case "e":
                    elemRow = 4
                    break
                case "f":
                    elemRow = 5
                    break
                case "g":
                    elemRow = 6
                    break
                case "h":
                    elemRow = 7
                    break
                default:
                    console.log("Please enter a valid value")
                    this.history.pop()
                    this.move()
            }

            switch(joinedInput.slice(2).toLowerCase()){
                case "l":
                    this.left(elemRow, elemCol)
                    break
                case "r":
                    this.right(elemRow, elemCol)
                    break
                case "ld":
                    this.leftDown(elemRow, elemCol)
                    break
                case "rd":
                    this.rightDown(elemRow, elemCol)
                    break
                default:
                    console.log("Please enter a valid value")
                    this.history.pop()
                    this.move()
            }
        }
    }

    deepCopyBoard(board){
        return board.map(row => row.map((item) => {
            return {...item}
        }))
    }

    undoMove(stepValue){
        if(stepValue === ""){
            let lastBoard = this.history.pop()

            if(lastBoard){
                this.board = lastBoard.board
                --this.stepsDone
                this.step = lastBoard.turn
                this.score = lastBoard.score
                this.stones = lastBoard.stones
            }

        }else{
            let element
            let startIndex 
            for(let item = this.history.length - 1; item >= 0; --item){
                --this.stepsDone
                if(this.history[item].value === stepValue){
                    element = this.history[item]
                    startIndex = this.history[item].id
                }
            }

            this.history.splice(startIndex + 1)
            let lastBoard = this.history.pop()

            if(lastBoard){
                this.board = lastBoard.board
                this.step = lastBoard.turn
                this.score = lastBoard.score
                this.stones = lastBoard.stones
                --this.stepsDone  
            }  
        }

        if(this.history.length === 0){
            console.log("There are no more steps done")
        }

        this.printBoard()
        this.move()
    }
    

    left(elemRow, elemCol){
        let newRow = this.board.length - 2 - elemRow

        if(this.board[7-elemRow][elemCol].value === "-"){
            console.log("Invalid value")
            this.move()
            return
        }

        if(this.board[newRow][elemCol - 1].value === "-" && this.board[newRow][elemCol - 1].value !== undefined){
            this.board[newRow][elemCol - 1].value = (this.step === 1 ? 1 : 0)
            this.board[newRow + 1][elemCol].value = "-"
            this.step = (this.step === 1 ? 0 : 1)
            this.rotateBoard()
            this.printBoard()
            this.move()
        }else if(this.board[newRow][elemCol - 1].value === (this.step === 1 ? 0 : 1) && this.board[newRow - 1][elemCol - 2].value === "-" && this.board[newRow - 1][elemCol - 2].value !== undefined){
            ++this.score[this.step]
            --this.stones[this.step === 1 ? 0 : 1]
            this.board[newRow - 1][elemCol - 2].value = this.step
            this.board[newRow + 1][elemCol].value = "-"
            this.board[newRow][elemCol - 1].value = "-"

            if(this.checkThePosition(newRow - 1, elemCol - 2, this.step)){
                this.printBoard()
                this.move()
            }else{
                this.step = (this.step === 1 ? 0 : 1)
                this.rotateBoard()
                this.printBoard()
                this.move()
            }
        }else{
            console.log("Invalid input")
            this.move()
        }
    }

    right(elemRow, elemCol){
        let newRow = this.board.length - 2 - elemRow

        if(this.board[7-elemRow][elemCol].value === "-"){
            console.log("Invalid value")
            this.move()
        }

        if(this.board[newRow][elemCol + 1].value === "-" && this.board[newRow][elemCol + 1].value !== undefined){
            this.board[newRow][elemCol + 1].value = (this.step === 1 ? 1 : 0)
            this.board[newRow + 1][elemCol].value = "-"
            this.step = (this.step === 1 ? 0 : 1)
            this.rotateBoard()
            this.printBoard()
            this.move()
        }else if(this.board[newRow][elemCol + 1].value === (this.step === 1 ? 0 : 1) && this.board[newRow - 1][elemCol + 2].value === "-" && this.board[newRow - 1][elemCol + 2].value !== undefined){
            ++this.score[this.step]
            --this.stones[this.step === 1 ? 0 : 1]
            this.board[newRow - 1][elemCol + 2].value = this.step
            this.board[newRow + 1][elemCol].value = "-"
            this.board[newRow][elemCol + 1].value = "-"

            if(this.checkThePosition(newRow - 1, elemCol + 2, this.step)){
                this.printBoard()
                this.move()
            }else{
                this.step = (this.step === 1 ? 0 : 1)
                this.rotateBoard()
                this.printBoard()
                this.move()
            }
        }else{
            console.log("Invalid input")
            this.move()
        }
    }

    leftDown(elemRow, elemCol){
        //debugger
        let newRow = 8-elemRow
        let newCol = elemCol - 1
        console.log(elemRow, elemCol)
        if(newRow < this.board.length && newCol >= 0){
            if(this.board[newRow][newCol].value === "-"){
                console.log('Invalid move')
                this.move()
            }else if (this.board[newRow][newCol].value === (this.step === 1 ? 0 : 1) && newRow + 1 >= 0 && newCol - 1 >= 0 && this.board[newRow + 1][newCol - 1].value === "-"){
                ++this.score[this.step]
                --this.stones[this.step === 1 ? 0 : 1]
                this.board[newRow + 1][newCol - 1].value = this.step
                this.board[8-elemRow-1][elemCol].value = "-"
                this.board[newRow][newCol].value = "-"

                if(this.checkThePosition(newRow + 1, newCol - 1, this.step)){
                    this.printBoard()
                    this.move()
                }else{
                    this.step = (this.step === 1 ? 0 : 1)
                    this.rotateBoard()
                    this.printBoard()
                    this.move()
                }
            }else{
                console.log("Invalid input")
                this.move()
            }
        }else{
            console.log("Invalid move")
            this.move()
        }
    }

    rightDown(elemRow, elemCol){
        let newRow = 8-elemRow
        let newCol = elemCol + 1

        // console.log(elemRow, elemCol)

        if(newRow < this.board.length && newCol < this.board[0].length){
            if(this.board[7-elemRow][elemCol].value === "-"){
                console.log("Invalid value")
                this.move()
            }else if(this.board[newRow + 1][newCol + 1].value === "-" && this.board[newRow][newCol].value === (this.step === 1 ? 0 : 1)){
                ++this.score[this.step]
                --this.stones[(this.step === 1 ? 0 : 1)]
                this.board[newRow + 1][newCol + 1].value = this.step
                this.board[newRow][newCol].value = "-"
                this.board[7-elemRow][elemCol].value = "-"

                if(this.checkThePosition(newRow + 1, newCol + 1, this.step)){
                    this.printBoard()
                    this.move()
                }else{
                    this.step = (this.step === 1 ? 0 : 1)
                    this.rotateBoard()
                    this.printBoard()
                    this.move()
                }
            }else{
                console.log("Invalid input")
                this.move()
            }
        }else{
            console.log("Invalid move")
            this.move()
        }
    }

    checkThePosition(position1, position2, player){
        if(position1 - 2 >= 0 && position2 - 2 >= 0 && this.board[position1 - 1][position2 - 1].value !== player && this.board[position1 - 1][position2 - 1].value !== "-" && this.board[position1 - 2][position2 - 2].value === "-"){
            return true
        }
        if(position1 - 2 >= 0 && position2 + 2 < this.board[0].length && this.board[position1 - 1][position2 + 1].value !== player && this.board[position1 - 1][position2 + 1].value !== "-" && this.board[position1 - 2][position2 + 2].value === "-"){
            return true
        }
        if(position1 + 2 < this.board.length && position2 - 2 >= 0 && this.board[position1 + 1][position2 - 1].value !== player && this.board[position1 + 1][position2 - 1].value !== "-" && this.board[position1 + 2][position2 - 2].value === "-"){
            return true
        }
        if(position1 + 2 < this.board.length && position2 + 2 < this.board[0].length && this.board[position1 + 1][position2 + 1].value !== player && this.board[position1 + 1][position2 + 1].value !== "-" && this.board[position1 + 2][position2 + 2].value === "-"){
            return true
        }
    
        return false
    }

    rotateBoard(){
        this.board = this.board.map((elem) => elem.reverse()).reverse()
    }

    userInput(){
        console.log("Please enter the step's coordinates with this format 'C1L', where 'C' stands for vertical coordinate, '1' for horizontal and 'L' for direction: ")
        console.log("You also can undo the step with entering 'undo' + 'move' with above mentioned format or just typing 'undo' for one step back")

        let coordinate = prompt()

        let verticalCoordinate = coordinate[0]
        let horizontalCoordinate = coordinate[1]
        let direction = coordinate.slice(2)

        return [verticalCoordinate, horizontalCoordinate, direction]
    }
}

let board = new Board()
console.log(board.printBoard())
let game = new NewGame()
console.log(game.move())


