let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newgame = document.querySelector(".newgame");
let msg = document.querySelector("#msg");
let msgcon = document.querySelector(".msgcon");

let count = 0;
let turn0 = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetgame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgcon.classList.add("hide");
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcon.classList.remove("hide");
    disableBoxes();
}

const draw = () => {
    msg.innerText = `Game Ended, NO WINNER !!`;
    msgcon.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let i of winpatterns) {
        let pos1 = boxes[i[0]].innerText;
        let pos2 = boxes[i[1]].innerText;
        let pos3 = boxes[i[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("winner", pos1);
                showWinner(pos1);
                return; // Exit the function once a winner is found
            }
        }
    }
    if (count === 9) draw();
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box is clicked");
        if (turn0 === true) {
            box.innerText = "O";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true; // so that we can click only once
        count++; // Increment the count each time a box is clicked
        checkWinner();
    })
});

newgame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
 