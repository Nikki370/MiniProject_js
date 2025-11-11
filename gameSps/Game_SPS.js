let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#computer-score");

const drawGame = () => {
    console.log("Game was Draw");
    msg.innerText = "Game draw! Play again";
    msg.style.backgroundColor = "rgb(236, 189, 132)";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        console.log("You win!");
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else {
        compScore++;
        compScorePara.innerText = compScore;
        console.log ("You lose!");
        msg.innerText = `you lose! Computer's ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
};

//USER CHOICE 
const playgame = (userChoice) => {
    console.log("user choice is = ", userChoice);
    //GENERATE COMPUTER CHOICE
    const compChoice = genCompChoice();
    console.log("computer choice is = ", compChoice);

    if (userChoice === compChoice) {
        drawGame();
    }
    else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper"  ? false: true;
        }
        else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false: true;
        }
        else {
            userWin = compChoice === "rock" ? false: true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    });
});

