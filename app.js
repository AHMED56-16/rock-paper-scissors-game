let userScore = 0;
let computerScore = 0;
let currentUserScore = document.querySelector("#userScore");
let currentComputerScore = document.querySelector("#computerScore");
let choices = document.querySelectorAll(".choice");
let message = document.querySelector("#message");
let restartButton = document.createElement("button");

const getComputerChoice = () => {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

const draw = () => {
    message.innerHTML = `Both chose the same`;
    message.style.backgroundColor = "#FF8383";
    message.style.color = "#FFFF57";
}

const win = (userWin, userChoice, computerChoice) => {
    if (userWin) {
        userScore++;
        currentUserScore.innerHTML = userScore;
        message.innerHTML = `Your ${userChoice} beats ${computerChoice}`;
        message.style.backgroundColor = "green";
    } else {
        computerScore++;
        currentComputerScore.innerHTML = computerScore;
        message.innerHTML = `Computer's ${computerChoice} beats ${userChoice}`;
        message.style.backgroundColor = "red";
    }

    if (userScore >= 5) {
        message.innerHTML = "You Win the Game!";
        message.style.backgroundColor = "#FF8383";
        message.style.color = "#FFFF57";
        displayWinnerMessage("You Win the Game!");
    } else if (computerScore >= 5) {
        message.innerHTML = "Computer Wins the Game!";
        message.style.backgroundColor = "#FF8383";
        message.style.color = "#FFFF57";
        displayWinnerMessage("Computer Wins the Game!");
    }
}

const playGame = (userChoice) => {
    let computerChoice = getComputerChoice(); 
    if (userChoice === computerChoice) {
        draw();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = computerChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = computerChoice === "scissors" ? false : true;
        } else {
            userWin = computerChoice === "rock" ? false : true;
        }
        win(userWin, userChoice, computerChoice);
    }
}

const displayWinnerMessage = (winnerMessage) => {
    document.querySelector("#choices").style.display = "none";
    document.querySelector("#scoreBoard").style.display = "none";

    restartButton.innerHTML = "Restart Game";
    restartButton.style.padding = "20px";
    restartButton.style.backgroundColor = "#A19AD3";
    restartButton.style.color = "white";
    restartButton.style.border = "none";
    restartButton.style.cursor = "pointer";
    restartButton.style.borderRadius = "10px";
    restartButton.style.fontSize = "18px";
    restartButton.style.marginTop = "20px";

    let winnerDiv = document.createElement("div");
    winnerDiv.id = "winnerMessage"; 
    winnerDiv.style.position = "absolute";
    winnerDiv.style.top = "50%";
    winnerDiv.style.left = "50%";
    winnerDiv.style.transform = "translate(-50%, -50%)";
    winnerDiv.style.textAlign = "center";
    winnerDiv.style.fontSize = "24px";
    winnerDiv.style.fontWeight = "bold";
    winnerDiv.style.color = "#333";
    winnerDiv.innerHTML = `<p>${winnerMessage}</p>`;
    winnerDiv.appendChild(restartButton);

    document.body.appendChild(winnerDiv);

    restartButton.addEventListener("click", restartGame);
}

const restartGame = () => {
    userScore = 0;
    computerScore = 0;
    currentUserScore.innerHTML = userScore;
    currentComputerScore.innerHTML = computerScore;

    document.querySelector("#choices").style.display = "flex";
    document.querySelector("#scoreBoard").style.display = "flex";
    message.innerHTML = "Make your choice!";
    message.style.backgroundColor = "#FF8383";
    message.style.color = "#FFFF57";

    let winnerDiv = document.querySelector("#winnerMessage");
    if (winnerDiv) {
        winnerDiv.remove();
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (userScore < 5 && computerScore < 5) {
            let userChoice = choice.getAttribute("id");
            playGame(userChoice);
        }
    });
});
