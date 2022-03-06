//variables
let gameOrder = [], playerOrder = [];
let on, win, turn, good = false, level;
let myInterval, compTurn, flash, noise = true;
let audioG = new Audio("sounds/green.mp3");
let audioR = new Audio("sounds/red.mp3");
let audioY = new Audio("sounds/yellow.mp3");
let audioB = new Audio("sounds/blue.mp3");
let audioW = new Audio("sounds/wrong.mp3");

//html elements
let topLeft = $(".topLeft"), topRight = $(".topRight");
let bottomLeft = $(".bottomLeft"), bottomRight = $(".bottomRight");
let onBtn = document.querySelector("#onBtn"), startBtn = document.querySelector("#startBtn");
let levelNo = document.querySelector("#levelNo");
let heading = document.querySelector("#heading");

onBtn.addEventListener("click", function(){
    if(onBtn.checked){
        on = true;
        heading.innerHTML = "CLICK START TO START!";
        levelNo.innerHTML = "-";
        levelNo.style.color = "red";
    }else {
        on = false;
        levelNo.innerHTML = "";
    }
});

function startPressed(){
    startBtn.classList.add("clicked");
    setTimeout(function(){
        startBtn.classList.remove("clicked");
        startBtn.setAttribute("disabled", true);
        startBtn.style.backgroundColor = "#97d1f0";
        startBtn.style.color = "darkgrey";
    }, 750);
    if(on || win) startGame();
}
function startGame(){
    console.log("Game Started!");
    gameOrder = []; playerOrder = [];
    win = false; good = true;
    flash = 0;
    level = 1;
    levelNo.innerHTML = "1";
    levelNo.style.color = "green";
    myInterval = 0;

    for(let i=0; i<20; i++){
        gameOrder.push(Math.floor(Math.random()*4));
    }
    console.log(gameOrder);
    compTurn = true;
    heading.style.display = "none";

    myInterval = setInterval(flashLights, 750);
}

function flashLights() {
    on = false;

    clearColors();
    if(flash == level){
        clearInterval(myInterval);
        compTurn = false;
        on = true;
    } 
    if(compTurn){
        setTimeout(function(){
            if(gameOrder[flash] == 0) flashZero();
            if(gameOrder[flash] == 1) flashOne();
            if(gameOrder[flash] == 2) flashTwo();
            if(gameOrder[flash] == 3) flashThree();
            flash++;
        }, 200);
    }
}

function flashZero(){
    if(noise){
        audioG.play();
    }
    noise = true;
    topLeft.css("backgroundColor", "lightgreen");
}
function flashOne(){
    if(noise){
        audioR.play();
    }
    noise = true;
    topRight.css("backgroundColor", "tomato")
}
function flashTwo(){
    if(noise){
        audioY.play();
    }
    noise = true;
    bottomLeft.css("backgroundColor", "yellow")
}
function flashThree(){
    if(noise){
        audioB.play();
    }
    noise = true;
    bottomRight.css("backgroundColor", "lightBlue");
}

function clearColors(){
    topLeft.css("backgroundColor", "darkgreen");
    topRight.css("backgroundColor", "darkRed");
    bottomLeft.css("backgroundColor", "gold");
    bottomRight.css("backgroundColor", "darkblue");
}

function check(){
    if(playerOrder[playerOrder.length-1] !== gameOrder[playerOrder.length -1]) good = false;

    if(playerOrder.length == 20 && good) gameWon();

    if(!good){
        audioW.play();
        flashColors();
        levelNo.innerHTML = "NO!";
        heading.style.display = "inline-block";
        heading.innerHTML = "YOU LOST!😥"
        heading.style.color = "red";
        setTimeout(function(){
            levelNo.innerHTML = level;
            clearColors();
            startGame();
        }, 1000);
        noise = false;
    }
    if(playerOrder.length == level && good && !win){
        level++;
        playerOrder = [];
        compTurn = true;
        good = true;
        levelNo.innerHTML = level;
        myInterval = setInterval(flashLights, 800);
    }
}

function gameWon(){
    flashColors();
    levelNo.innerHTML = "WIN!"
    heading.style.display = "inline-block";
    heading.innerHTML = "YOU WON!🥳"
    heading.style.color = "green";
    win = true;
    on = false;
    startBtn.removeAttribute("disabled");
    setTimeout(function(){
        heading.innerHTML = "REFRESH TO RESTART!";
        heading.style.color = "wheat";
    }, 2000);
}

topLeft.on("click", function(){
    if(on){
        playerOrder.push(0);
        flashZero();
        check();
        if(!win){
            setTimeout(function(){
                clearColors();
            }, 200);
        }

    }
});
topRight.on("click", function(){
    if(on){
        playerOrder.push(1);
        flashOne();
        check();
        if(!win){
            setTimeout(function(){
                clearColors();
            }, 200);
        }

    }
});
bottomLeft.on("click", function(){
    if(on){
        playerOrder.push(2);
        flashTwo();
        check();
        if(!win){
            setTimeout(function(){
                clearColors();
            }, 200);
        }

    }
});
bottomRight.on("click", function(){
    if(on){
        playerOrder.push(3);
        flashThree();
        check();
        if(!win){
            setTimeout(function(){
                clearColors();
            }, 200);
        }

    }
});

function flashColors(){
    topLeft.css("backgroundColor", "lightgreen");
    topRight.css("backgroundColor", "tomato");
    bottomLeft.css("backgroundColor", "yellow");
    bottomRight.css("backgroundColor", "lightblue");
}