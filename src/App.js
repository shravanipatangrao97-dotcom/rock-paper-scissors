import { useState } from 'react'
import "./App.css"

function App() {
    let [userMove, setUserMove] = useState("")
    let [computerMove, setComputerMove] = useState("")
    let [result, setResult] = useState("")
    let [userScore, setUserScore] = useState(0)
    let [computerScore, setComputerScore] = useState(0)
    let [rounds, setRounds] = useState(0)
    let [streak, setStreak] = useState(0)
    let [history, setHistory] = useState([])

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
        setRounds(rounds + 1)

        let roundResult = ""

        if (userChoice === computer) {
            roundResult = "Draw!"
            setResult("Draw!")
            setStreak(0)
        } else if (
            (userChoice === "Rock" && computer === "Scissor") ||
            (userChoice === "Paper" && computer === "Rock") ||
            (userChoice === "Scissor" && computer === "Paper")
        ) {
            roundResult = "You Win!"
            setResult("You Win!")
            setUserScore(userScore + 1)
            setStreak(streak + 1)
        } else {
            roundResult = "You Lose!"
            setResult("You Lose!")
            setComputerScore(computerScore + 1)
            setStreak(0)
        }

        let newEntry = {
            round: rounds + 1,
            user: userChoice,
            computer: computer,
            result: roundResult
        }
        setHistory([newEntry, ...history])
    }

    function resetGame() {
        setUserMove("")
        setComputerMove("")
        setResult("")
        setUserScore(0)
        setComputerScore(0)
        setRounds(0)
        setStreak(0)
        setHistory([])
    }

    return <div className="container">
        <h1>Rock Paper Scissors</h1>

        <div className="score">
            <p>You: {userScore}</p>
            <p>Rounds: {rounds}</p>
            <p>Computer: {computerScore}</p>
        </div>

        {streak >= 2 && <p className="streak">🔥 {streak} win streak!</p>}

        <div className="buttons">
            <button onClick={() => handelClick("Rock")}>🪨<br />Rock</button>
            <button onClick={() => handelClick("Paper")}>📄<br />Paper</button>
            <button onClick={() => handelClick("Scissor")}>✂️<br />Scissor</button>
        </div>

        {result && (
            <div className="result">
                <p>You chose: {emojisData[userMove]}  Computer chose: {emojisData[computerMove]}</p>
                <h2>{result}</h2>
            </div>
        )}

        {history.length > 0 && (
            <div className="history">
                <h3>Move History</h3>
                {history.map((entry) => (
                    <p key={entry.round}>
                        Round {entry.round}: You {emojisData[entry.user]} vs Computer {emojisData[entry.computer]} — {entry.result}
                    </p>
                ))}
            </div>
        )}

        <button className="reset" onClick={resetGame}>Reset Game</button>
    </div>
}

export default App