let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn_O = true;  //player1, player2

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn_O = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked!");
        if (turn_O === true) {  
            box.innerText = "O";
            box.style.color = "yellow"
            turn_O = false;
        }
        else 
        {
            box.innerText = "X";
            turn_O = true;
            box.style.color = "purple"
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (Winner) => {
    if (checkWinner() === false) {
        msg.innerText = "Game Draw : ( ";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
    else {
    msg.innerText = `Congratulations , winner is ${Winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log ("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);