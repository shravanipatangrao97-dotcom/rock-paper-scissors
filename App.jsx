import { useState } from 'react'

function App() {
    let [userMove, setUserMove] = useState("")
    let [computerMove, setComputerMove] = useState("")
    let [result, setResult] = useState("")

    let emojisData = { "Rock": "🪨", "Paper": "📄", "Scissor": "✂️" }

    function generateMove() {
        let moves = ["Rock", "Paper", "Scissor"]
        let random = Math.floor(Math.random() * 3)
        return moves[random]
    }

    function handelClick(userChoice) {
        let computer = generateMove()
        setUserMove(userChoice)
        setComputerMove(computer)

        if (userChoice === computer) {
            setResult("Draw!")
        } else if (
            (userChoice === "Rock" && computer === "Scissor") ||
            (userChoice === "Paper" && computer === "Rock") ||
            (userChoice === "Scissor" && computer === "Paper")
        ) {
            setResult("You Win!")
        } else {
            setResult("You Lose!")
        }
    }

    return <div className="container">
        <h2>Computer: {emojisData[computerMove]}  You: {emojisData[userMove]}</h2>
        <h3>{result}</h3>
        <button onClick={() => handelClick("Rock")}>🪨</button>
        <button onClick={() => handelClick("Paper")}>📄</button>
        <button onClick={() => handelClick("Scissor")}>✂️</button>
    </div>
}

export default App