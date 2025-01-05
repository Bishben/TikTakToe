// Denotes X or O's Chance (X = 1 & O = 0)
var chance = 1;

// Stores How Many Plays were made
var playsMade = 0;

// Checks if Game is Over
var gameOver = 0;

// Getting all table elements
var box = document.querySelectorAll("td");

// Highlight Win
function highlight(winCase) {
    for (var i = 0; i < winCase.length; i++) {
        // Changes Color of boxes that led to win
        box[winCase[i]].style.backgroundColor = "#FFCFCF";
        box[winCase[i]].style.color = "white";
    }
}

// Dehighlight Win
function dehighlight() {
    for (var i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = "#86A788";
        box[i].style.color = "#FFCFCF";
    }
}

// Displaying Winner
function displayWinner() {
    if (!gameOver) return;

    winner = !chance; // Last Player Who Plays Wins
    winnerText = document.querySelector("#popup h1");
    winnerText.textContent = ((winner) ? "X" : "O") + " WINS";

    body = document.querySelectorAll("body > *:not(#popup)")
    for (var i = 0; i < body.length; i++){
        body[i].style.filter = "blur(20px)";
    }

    popup = document.querySelector("#popup");
    popup.style.visibility = "visible";
}

// Display Draw
function displayDraw() {
    drawText = document.querySelector("#popup h1");
    drawText.textContent = "DRAW";

    body = document.querySelectorAll("body > *:not(#popup)")
    for (var i = 0; i < body.length; i++){
        body[i].style.filter = "blur(20px)";
    }

    popup = document.querySelector("#popup");
    popup.style.visibility = "visible";
}

// Handling Win Case
function handleWin() {
    // Patterns of Winning Cases
    let winCases = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ]

    for (var i = 0; i < winCases.length; i++){
        const v0 = box[winCases[i][0]].innerHTML;
        const v1 = box[winCases[i][1]].innerHTML;
        const v2 = box[winCases[i][2]].innerHTML;

        // Checks if all boxes are same and is not ""
        if (v0 != "" && v0 == v1 && v1 == v2) {
            highlight(winCases[i]);
            gameOver = 1; // Game Over due to Win Scenario
        }
    }

    setTimeout(displayWinner, 10);
}

// Handling Draw Case
function handleDraw() {
    // Calls Draw if all(9) moves are made and no one has won
    if (playsMade == 9 && gameOver == 0) {
        displayDraw();
    }
}

// Changing Marker
function play() {
    if (this.innerHTML != "") return; // If Box has already been played do nothing
    if (gameOver) return; // Do nothing if Game is Already Won

    // Playing Move
    if (chance == 1) {
        this.textContent = 'X';
    }
    else {
        this.textContent = 'O';
    }

    chance = !chance;
    setTimeout(handleWin, 10);

    playsMade++;
    setTimeout(handleDraw, 10);

    changeChance();
}

// Listening for Click 
for (var i = 0; i < box.length; i++){
    box[i].addEventListener('click', play);
}

// Changing Chance Box
function changeChance() {
    chanceBoxes = document.querySelectorAll(".chance");
    if (chance == 1) {
        // Highlight X
        chanceBoxes[0].style.backgroundColor = "#727D73";
        chanceBoxes[0].style.color = "#FFFDEC";

        // De-Highlight O
        chanceBoxes[1].style.backgroundColor = "#86A788";
        chanceBoxes[1].style.color = "#FFCFCF";
    }
    else {
        // De-Highlight X
        chanceBoxes[0].style.backgroundColor = "#86A788";
        chanceBoxes[0].style.color = "#FFCFCF";
        
        // Highlight O 
        chanceBoxes[1].style.backgroundColor = "#727D73";
        chanceBoxes[1].style.color = "#FFFDEC";
    }
}

// Continue Button (Return to game)
continueButton = document.querySelector("#popup button");
continueButton.addEventListener('click', () => {
    body = document.querySelectorAll("body > *:not(#popup)")
    for (var i = 0; i < body.length; i++){
        body[i].style.filter = "none";
    }

    popup = document.querySelector("#popup");
    popup.style.visibility = "hidden";
})

// Restart Button (Restart Game)
restartButton = document.querySelectorAll("#restart > *");
restartButton[0].addEventListener('mouseover', () => {
    restartButton[0].style.transition = `0.7s ease-in-out`;
    for (var i = 0; i < 360; i++){
        restartButton[0].style.transform = `rotate(${i}deg)`;
    }
})

restartButton[0].addEventListener('mouseout', () => {
    restartButton[0].style.transition = `0s`;
    restartButton[0].style.transform = `rotate(0deg)`;
})

restartButton[0].addEventListener('click', () => {
    chance = 1;
    gameOver = 0;
    playsMade = 0;

    changeChance();

    clearBoxes();
})

// Clearing Boxes
function clearBoxes() {
    for (var i = 0; i < box.length; i++){
        box[i].textContent = '';
    }

    dehighlight();
}

