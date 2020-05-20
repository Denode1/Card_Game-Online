
var InGame2 = document.getElementById("InGame");
var slaveBack = document.getElementById('slaveBack');
var emperorBack = document.getElementById('emperorBack');

var citizen1Coord, citizen2Coord, citizen3Coord, citizen4Coord, citizen5Coord,
    citizen6Coord, citizen7Coord, citizen8Coord, emperorCoord, slaveCoord, 
    dragEmperor = false , dragSlave = false, dragCitizen1 = false, dragCitizen2 = false, dragCitizen3 = false,
    dragCitizen4 = false, dragCitizen5 = false, dragCitizen6 = false, dragCitizen7 = false, dragCitizen8 = false, 
    citizen1CoordFirst, citizen2CoordFirst, citizen3CoordFirst, citizen4CoordFirst, citizen5CoordFirst, 
    citizen6CoordFirst, citizen7CoordFirst, citizen8CoordFirst, emperorCoordFirst, slaveCoordFirst, ok = true, 
    updateCards = false, slave, emperor, citizen1, citizen2, citizen3, citizen4, citizen5, citizen6, citizen7, citizen8,
    citizen1CoordFirstTop, citizen2CoordFirstTop, citizen3CoordFirstTop, citizen4CoordFirstTop, citizen5CoordFirstTop, 
    citizen6CoordFirstTop, citizen7CoordFirstTop, citizen8CoordFirstTop, emperorCoordFirstTop, slaveCoordFirstTop, 
    citizen1CoordTop, citizen2CoordTop, citizen3CoordTop, citizen4CoordTop, citizen5CoordTop,
    citizen6CoordTop, citizen7CoordTop, citizen8CoordTop, emperorCoordTop, slaveCoordTop, receive = false;

var start, credits, bg, myCanvas, offsetX, offsetY, leftX = 0, topY, socket, 
    playing = false, goIn = true, inMenu = true, startWith = 0, people = 0,
    dragging = false, goto1Bool = true, changeStartWith = 0, cardWidth = 160, cardHeight = 250, 
    desk, cardDown = false, cardId, number = 0, rezultat, moneyPng, betSubmit, valueBet = 0, valueBetEnemy = 0, numberEndGame = -1;

var enemyCardDown = false, enemyCard;

var citizen1Image = 0, citizen2Image = 0, citizen3Image = 0, citizen4Image = 0, citizen5Image = 0, citizen6Image = 0,
    citizen7Image = 0, citizen8Image = 0, emperorImage = 0, slaveImage = 0, rounds = 0, money = 500, moneyEnemy = 500, noDraw = false;

var endGame = false, gameOver = false, endGameForMe = false, finalResult, startGame = 150;

var v = [];
var f = [];

function setup() {

    for(var i = 1; i <= 5; ++i)
        v[i] = i, f[i] = 0;
    myCanvas = createCanvas(1280, 720);
    socket = io.connect("http://X.X.X.X:3000/")
    socket.on('receiveData',
        function(data) {
            // console.log(data.aL, data.aT);
            // console.log(data.bL, data.bT);
            // console.log(data.cL, data.cT);
            // console.log(data.dL, data.dT);
            // console.log(data.eL, data.eT);
            if(startWith == 2) {
                receive = true;
                emperorCoord = data.aL;
                emperorCoordTop = data.aT;
                citizen5Coord = data.bL;
                citizen5CoordTop = data.bT;
                citizen6Coord = data.cL;
                citizen6CoordTop = data.cT;
                citizen7Coord = data.dL;
                citizen7CoordTop = data.dT;
                citizen8Coord = data.eL;
                citizen8CoordTop = data.eT;
            }
            else if(startWith == 1) {
                receive = true;
                slaveCoord = data.aL;
                slaveCoordTop = data.aT;
                citizen1Coord = data.bL;
                citizen1CoordTop = data.bT;
                citizen2Coord = data.cL;
                citizen2CoordTop = data.cT;
                citizen3Coord = data.dL;
                citizen3CoordTop = data.dT;
                citizen4Coord = data.eL;
                citizen4CoordTop = data.eT;
            }
        }
    );
    socket.on('betting', function(data) {
        valueBetEnemy = data;
    });
    socket.on('send', function(cardData) {
        enemyCardDown = cardData.x;
        enemyCard = cardData.y;
    });
    //Socket
    socket.on('NeedPlayers', NeedPlayers);
    socket.on('ServerStatus', srvStatus);
    socket.on('GoTo1', GoTo1);
    //Cards
    emperor = loadImage('images/Emperor.jpg');
    slave = loadImage('images/Slave.jpg');
    citizen1 = loadImage('images/Citizen.jpg');
    citizen2 = loadImage('images/Citizen.jpg');
    citizen3 = loadImage('images/Citizen.jpg');
    citizen4 = loadImage('images/Citizen.jpg');
    citizen5 = loadImage('images/Citizen.jpg');
    citizen6 = loadImage('images/Citizen.jpg');
    citizen7 = loadImage('images/Citizen.jpg');
    citizen8 = loadImage('images/Citizen.jpg');
    backCard = loadImage('images/backCard.jpg');
    desk = loadImage('images/desk.jpg');
    moneyPng = loadImage('images/money.png');
    //Images
    bg = loadImage('images/background.png');

    //Create
    fullImage = createImg('images/fullscreen.png');
    start = createButton('Start');
    credits = createButton('Credits');
    back = createButton('Back');
    leave = createButton('Leave');
    MPlayers = createP('Waiting for players..');
    myName = createP('Scutariu Denis');
    fullsrv = createP('The server is full..');
    bet = createInput();
    betSubmit = createButton('Bet');
    //Parents
    back.parent('InGame');
    myCanvas.parent('Gamebg');
    fullImage.parent('Gamebg');
    start.parent('InGame');
    credits.parent('InGame');
    leave.parent('InGame');
    myName.parent('InGame');
    MPlayers.parent('InGame');
    fullsrv.parent('InGame');
    bet.parent('InGame');
    betSubmit.parent('InGame');
    //Style
    leave.style('display', 'none');
    fullsrv.style('display', 'none');
    myName.style('display', 'none');
    MPlayers.style('display', 'none');
    MPlayers.style('margin-top', '25%');
    back.style('display', 'none');
    back.style('margin-top', '50%');
    leave.style('margin-top', '50%');
    leave.style('margin-left', '90%');
    leave.style('height', '50px');
    leave.style('width', '100px');
    bet.style('display', 'none');
    betSubmit.style('display', 'none');
    //Class
    fullImage.class("fullImg");
    myName.class('credit');
    MPlayers.class('credit');
    fullsrv.class('credit');
    bet.class('bet');
    betSubmit.class('betSubmit');
}

function draw() {
    textFont('cursive, sans-serif');
    socket.emit('play', 0);
    socket.on('ServerStatus', srvStatus);
    socket.on('betting', function(data) {
        valueBetEnemy = data;
    });
    if(startGame > 0){
        --startGame;
    }
    background(bg);
    //cardsCoord();
    
    if(endGame == true && gameOver == false) {
        numberEndGame = 170;
        gameOver = true;
        finalResult = 'You WIN the GAME!';
    }
    if(endGameForMe == true && gameOver == false) {
        numberEndGame = 170;
        gameOver = true;
        finalResult = 'You LOST the GAME!';
    }

    if(number != 0)
        ++number;
    if(changeStartWith == 1 && startWith == 2) {
        change();
        changeStartWith = 0;
    }
    if(cardDown == true) {
        var cardData = {
            x: cardDown, 
            y: cardId
        }
        socket.emit('send', cardData);
    }
    if(enemyCardDown == true) {
        if(number == 0){
        if((enemyCard == 'citizen1' || enemyCard == 'citizen2' || enemyCard == 'citizen3' || enemyCard == 'citizen4' || enemyCard == 'citizen5'
            || enemyCard == 'citizen6' || enemyCard == 'citizen7' || enemyCard == 'citizen8') 
            && (cardId == 'citizen1' || cardId == 'citizen2' || cardId == 'citizen3' || cardId == 'citizen4' || cardId == 'citizen5'
            || cardId == 'citizen6' || cardId == 'citizen7' || cardId == 'citizen8')){
            rezultat = "It's draw!";
            noDraw = false;
            valueBet = 0;
            valueBetEnemy = 0;
            if(enemyCard == 'citizen1')
                citizen1Image = 1;
            if(enemyCard == 'citizen2')
                citizen2Image = 1;
            if(enemyCard == 'citizen3')
                citizen3Image = 1;
            if(enemyCard == 'citizen4')
                citizen4Image = 1;
            if(enemyCard == 'citizen5')
                citizen5Image = 1;
            if(enemyCard == 'citizen6')
                citizen6Image = 1;
            if(enemyCard == 'citizen7')
                citizen7Image = 1;
            if(enemyCard == 'citizen8')
                citizen8Image = 1;
            if(cardId == 'citizen1')
                citizen1Image = 1;
            if(cardId == 'citizen2')
                citizen2Image = 1;
            if(cardId == 'citizen3')
                citizen3Image = 1;
            if(cardId == 'citizen4')
                citizen4Image = 1;
            if(cardId == 'citizen5')
                citizen5Image = 1;
            if(cardId == 'citizen6')
                citizen6Image = 1;
            if(cardId == 'citizen7')
                citizen7Image = 1;
            if(cardId == 'citizen8')
                citizen8Image = 1;
        }
        else if(enemyCard == 'emperor' && (cardId == 'citizen1' || cardId == 'citizen2' || cardId == 'citizen3' || cardId == 'citizen4')){
            moneyEnemy += (valueBetEnemy * 2);
            money -= (valueBet * 2);
            noDraw = true;
            if(money <= 0)
                endGameForMe = true;
            rezultat = "You lost!";
            emperorImage = 1;
            if(cardId == 'citizen1')
                citizen1Image = 1;
            if(cardId == 'citizen2')
                citizen2Image = 1;
            if(cardId == 'citizen3')
                citizen3Image = 1;
            if(cardId == 'citizen4')
                citizen4Image = 1;
        }
        else if(enemyCard == 'slave' && cardId == 'emperor'){
            money -= (valueBet * 2);
            moneyEnemy += (valueBetEnemy * 5);
            noDraw = true;
            if(money <= 0)
                endGameForMe = true;
            rezultat = "You lost!";
            slaveImage = 1;
            emperorImage = 1;
        }
        else if(enemyCard == 'emperor' && cardId == 'slave'){
            money += (valueBet * 5);
            moneyEnemy -= (valueBetEnemy * 2);
            if(moneyEnemy <= 0)
                endGame = true;
            noDraw = true;
            rezultat = "You win!";
            slaveImage = 1;
            emperorImage = 1;
        }
        else if(enemyCard == 'slave' && (cardId == 'citizen5' || cardId == 'citizen6' || cardId == 'citizen7' || cardId == 'citizen8')){
            rezultat = "You win!";
            money += (valueBet * 2);
            moneyEnemy -= (valueBetEnemy * 2);
            if(moneyEnemy <= 0)
                endGame = true;
            noDraw = true;
            slaveImage = 1;
            if(cardId == 'citizen5')
                citizen5Image = 1;
            if(cardId == 'citizen6')
                citizen6Image = 1;
            if(cardId == 'citizen7')
                citizen7Image = 1;
            if(cardId == 'citizen8')
                citizen8Image = 1;
        }
        else if((enemyCard == 'citizen5' || enemyCard == 'citizen6' || enemyCard == 'citizen7' || enemyCard == 'citizen8') && cardId == 'slave'){
            money -= (valueBet * 2);
            moneyEnemy += (valueBetEnemy * 2);
            noDraw = true;
            if(money <= 0)
                endGameForMe = true;
            rezultat = 'You lost!';
            slaveImage = 1;
            if(enemyCard == 'citizen5')
                citizen5Image = 1;
            if(enemyCard == 'citizen6')
                citizen6Image = 1;
            if(enemyCard == 'citizen7')
                citizen7Image = 1;
            if(enemyCard == 'citizen8')
                citizen8Image = 1;
        }
        else if(enemyCard == 'emperor' && (cardId == 'citizen1' || cardId == 'citizen2' || cardId == 'citizen3' || cardId == 'citizen4')){
            money -= (valueBet * 2);
            moneyEnemy += (valueBetEnemy * 2);
            noDraw = true;
            if(money <= 0)
                endGameForMe = true;
            rezultat = "You lost!";
            emperorImage = 1;
            if(cardId == 'citizen1')
                citizen1Image = 1;
            if(cardId == 'citizen2')
                citizen2Image = 1;
            if(cardId == 'citizen3')
                citizen3Image = 1;
            if(cardId == 'citizen4')
                citizen4Image = 1;
        }
        else if((enemyCard == 'citizen1' || enemyCard == 'citizen2' || enemyCard == 'citizen3' || enemyCard == 'citizen4') && cardId == 'emperor'){
            money += (valueBet * 2);
            moneyEnemy -= (valueBetEnemy * 2);
            if(moneyEnemy <= 0)
                endGame = true;
            noDraw = true;
            rezultat = "You win!";
            emperorImage = 1;
            if(enemyCard == 'citizen1')
                citizen1Image = 1;
            if(enemyCard == 'citizen2')
                citizen2Image = 1;
            if(enemyCard == 'citizen3')
                citizen3Image = 1;
            if(enemyCard == 'citizen4')
                citizen4Image = 1;
        }
        }
        if(number > 170){
            enemyCardDown = false;
            cardDown = false;
            enemyCard = 0;
            cardId = 0;
            number = 0;
            if(slaveImage == 1)
                slaveImage = 2;
            if(emperorImage == 1)
                emperorImage = 2;
            if(citizen1Image == 1)
                citizen1Image = 2;
            if(citizen2Image == 1)
                citizen2Image = 2;
            if(citizen3Image == 1)
                citizen3Image = 2;
            if(citizen4Image == 1)
                citizen4Image = 2;
            if(citizen5Image == 1)
                citizen5Image = 2;
            if(citizen6Image == 1)
                citizen6Image = 2;
            if(citizen7Image == 1)
                citizen7Image = 2;
            if(citizen8Image == 1)
                citizen8Image = 2;
        }
    }
    if(enemyCardDown == true && cardDown == true && number == 0)
        number = 1;
    if(startWith == 1){
        fill('yellow');
        image(moneyPng, 0, 360);
        image(moneyPng, 0, 280);
        textSize(24);
        text(money, 60, 390);
        textSize(24);
        text(moneyEnemy, 60, 310);
        image(desk, 880, 1, 400, 720);
        strokeWeight(2);
        line(880, 360, 1280, 360);
        
        if(valueBet > 0) {
            text(valueBet, 890, 390);
        }
        if(valueBetEnemy > 0) {
            text(valueBetEnemy, 890, 350);
        }

        bet.style('display', 'block');
        betSubmit.style('display', 'block');
        if(receive == true){
            if(enemyCardDown == true && cardDown == true && enemyCard == 'slave')
                image(slave, slaveCoord, 470 - slaveCoordTop, cardWidth , cardHeight);
            else if(slaveImage != 2)
                image(backCard, slaveCoord, 470 - slaveCoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen1')
                image(citizen1, citizen1Coord, 470 - citizen1CoordTop, cardWidth , cardHeight);
            else if(citizen1Image != 2)
                image(backCard, citizen1Coord, 470 - citizen1CoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen2')
                image(citizen1, citizen2Coord, 470 - citizen2CoordTop, cardWidth , cardHeight);
            else if(citizen2Image != 2)   
                image(backCard, citizen2Coord, 470 - citizen2CoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen3')
                image(citizen1, citizen3Coord, 470 - citizen3CoordTop, cardWidth , cardHeight);
            else if(citizen3Image != 2)
                image(backCard, citizen3Coord, 470 - citizen3CoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen4')
                image(citizen1, citizen4Coord, 470 - citizen4CoordTop, cardWidth , cardHeight);
            else if(citizen4Image != 2)
                image(backCard, citizen4Coord, 470 - citizen4CoordTop, cardWidth , cardHeight);
        }
        if(emperorImage != 2)
            image(emperor, emperorCoord, emperorCoordTop, cardWidth , cardHeight);
        if(citizen5Image != 2)
            image(citizen5, citizen5Coord, citizen5CoordTop, cardWidth , cardHeight);
        if(citizen6Image != 2)
            image(citizen6, citizen6Coord, citizen6CoordTop, cardWidth , cardHeight);
        if(citizen7Image != 2)
            image(citizen7, citizen7Coord, citizen7CoordTop, cardWidth , cardHeight);
        if(citizen8Image != 2)
            image(citizen8, citizen8Coord, citizen8CoordTop, cardWidth , cardHeight);
    }
    else if(startWith == 2) {
        fill('yellow');
        image(moneyPng, 0, 360);
        image(moneyPng, 0, 280);
        textSize(24);
        text(money, 60, 390);
        textSize(24);
        text(moneyEnemy, 60, 310);
        image(desk, 880, 1, 400, 720);
        strokeWeight(2);
        line(880, 360, 1280, 360);

        if(valueBet > 0) {
            text(valueBet, 890, 390);
        }
        if(valueBetEnemy > 0) {
            text(valueBetEnemy, 890, 350);
        }

        bet.style('display', 'block');
        betSubmit.style('display', 'block');
        if(receive == true){
            if(enemyCardDown == true && cardDown == true && enemyCard == 'emperor')
                image(emperor, emperorCoord, 470 - emperorCoordTop, cardWidth , cardHeight);
            else if(emperorImage != 2)
                image(backCard, emperorCoord, 470 - emperorCoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen5')    
                image(citizen1, citizen5Coord, 470 - citizen5CoordTop, cardWidth , cardHeight);
            else if(citizen5Image != 2) 
                image(backCard, citizen5Coord, 470 - citizen5CoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen6')    
                image(citizen1, citizen6Coord, 470 - citizen6CoordTop, cardWidth , cardHeight);
            else if(citizen6Image != 2)
                image(backCard, citizen6Coord, 470 - citizen6CoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen7')    
                image(citizen1, citizen7Coord, 470 - citizen7CoordTop, cardWidth , cardHeight);
            else if(citizen7Image != 2) 
                image(backCard, citizen7Coord, 470 - citizen7CoordTop, cardWidth , cardHeight);

            if(enemyCardDown == true && cardDown == true && enemyCard == 'citizen8')    
                image(citizen1, citizen8Coord, 470 - citizen8CoordTop, cardWidth , cardHeight);
            else if(citizen8Image != 2) 
                image(backCard, citizen8Coord, 470 - citizen8CoordTop, cardWidth , cardHeight);
        }
        if(slaveImage != 2)
            image(slave, slaveCoord, slaveCoordTop, cardWidth , cardHeight);
        if(citizen1Image != 2)
            image(citizen1, citizen1Coord, citizen1CoordTop, cardWidth , cardHeight);
        if(citizen2Image != 2)
            image(citizen2, citizen2Coord, citizen2CoordTop, cardWidth , cardHeight);
        if(citizen3Image != 2)
            image(citizen3, citizen3Coord, citizen3CoordTop, cardWidth , cardHeight);
        if(citizen4Image != 2)
            image(citizen4, citizen4Coord, citizen4CoordTop, cardWidth , cardHeight);
    }
    else {
        textFont('cursive, sans-serif');
        textSize(120);
        fill('#FF5733');
        text("E-Card", 430, 200);
    }
    if(number == 0)
        enemyCardDown = false, enemyCard = 0;
    if(number != 0 && (startWith == 1 || startWith == 2)){
        fill('white');
        textSize(36);
        text(rezultat, 1020, 355);
    }
    if(playing) {
        if(startWith == 1) {
            var data = {
                aL: emperorCoord,
                aT: emperorCoordTop, 
                bL: citizen5Coord, 
                bT: citizen5CoordTop, 
                cL: citizen6Coord,
                cT: citizen6CoordTop,
                dL: citizen7Coord,
                dT: citizen7CoordTop,
                eL: citizen8Coord,
                eT:citizen8CoordTop
            };
            if(dragging) {
                if(dragEmperor == true) {
                    emperorCoord = mouseX + offsetX;
                    emperorCoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen5 == true) {
                    citizen5Coord = mouseX + offsetX;
                    citizen5CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen6 == true) {
                    citizen6Coord = mouseX + offsetX;
                    citizen6CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen7 == true) {
                    citizen7Coord= mouseX + offsetX;
                    citizen7CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen8 == true) {
                    citizen8Coord = mouseX + offsetX;
                    citizen8CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
            }
        }
        else if(startWith == 2) {
            var data = {
                aL: slaveCoord,
                aT: slaveCoordTop, 
                bL: citizen1Coord, 
                bT: citizen1CoordTop, 
                cL: citizen2Coord,
                cT: citizen2CoordTop,
                dL: citizen3Coord,
                dT: citizen3CoordTop,
                eL: citizen4Coord,
                eT: citizen4CoordTop
            };
            if(dragging) {
                if(dragSlave == true) {
                    slaveCoord = mouseX + offsetX;
                    slaveCoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen1 == true) {
                    citizen1Coord = mouseX + offsetX;
                    citizen1CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen2 == true) {
                    citizen2Coord = mouseX + offsetX;
                    citizen2CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen3 == true) {
                    citizen3Coord= mouseX + offsetX;
                    citizen3CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
                else if(dragCitizen4 == true) {
                    citizen4Coord = mouseX + offsetX;
                    citizen4CoordTop = mouseY + offsetY;
                    socket.emit('sendData', data);
                }
            }
        }
     }
    
     if(noDraw == true && number < 30) {
        noDraw = false;
        valueBet = 0;
        valueBetEnemy = 0;
     }

    fullImage.mousePressed(makeFullscreen);
    credits.mouseReleased(credit);
    back.mouseReleased(backToMenu);
    start.mouseReleased(goInGame);
    leave.mouseReleased(leaveGame);
    betSubmit.mouseReleased(betting);
    if(emperorImage == 2 || slaveImage == 2){
        resetMap();
        ++rounds;
    }
    if(rounds == 6) {
        rounds = 0;
        if(startWith == 2)
            change();
        else if(startWith == 1)
            change2();
    }
    if(numberEndGame > 0) {
        textSize(45);
        fill('Yellow');
        text(finalResult, 300, 400);
        numberEndGame = numberEndGame - 1;
    }
    else if(numberEndGame <= 0 && gameOver == true){
        leaveGame();
    }

    if(startGame > 0) {
        if(startGame > 100){
            textSize(36);
            fill('White');
            text('Loading data.', 515, 620);
        }
        else if(startGame > 50) {
            textSize(36);
            fill('White');
            text('Loading data..', 515, 620);
        }
        else {
            textSize(36);
            fill('White');
            text('Loading data...', 515, 620);
        }
    }
}

function resetMap() {

    if(startWith == 2){
        for(var i = 1; i <= 5; ++i)
            f[i] = 0;
        slaveCoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen1CoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen2CoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen3CoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen4CoordFirst = (randomNumber() - 1) * 170 + 1;
        slaveCoord = slaveCoordFirst;
        citizen1Coord = citizen1CoordFirst;
        citizen2Coord = citizen2CoordFirst;
        citizen3Coord = citizen3CoordFirst;
        citizen4Coord = citizen4CoordFirst;
        slaveCoordTop = 460;
        citizen1CoordTop = 460;
        citizen2CoordTop = 460;
        citizen3CoordTop = 460;
        citizen4CoordTop = 460;
        var data = {
            aL: slaveCoord,
            aT: slaveCoordTop, 
            bL: citizen1Coord, 
            bT: citizen1CoordTop, 
            cL: citizen2Coord,
            cT: citizen2CoordTop,
            dL: citizen3Coord,
            dT: citizen3CoordTop,
            eL: citizen4Coord,
            eT:citizen4CoordTop
        };
        socket.emit('sendData', data);
    }
    else if(startWith == 1){
        for(var i = 1; i <= 5; ++i)
            f[i] = 0;
        emperorCoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen5CoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen6CoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen7CoordFirst = (randomNumber() - 1) * 170 + 1;
        citizen8CoordFirst = (randomNumber() - 1) * 170 + 1;
        emperorCoord = emperorCoordFirst;
        citizen5Coord = citizen5CoordFirst;
        citizen6Coord = citizen6CoordFirst;
        citizen7Coord = citizen7CoordFirst;
        citizen8Coord = citizen8CoordFirst;
        emperorCoordTop = 460;
        citizen5CoordTop = 460;
        citizen6CoordTop = 460;
        citizen7CoordTop = 460;
        citizen8CoordTop = 460;
        var data = {
            aL: emperorCoord,
            aT: emperorCoordTop, 
            bL: citizen5Coord, 
            bT: citizen5CoordTop, 
            cL: citizen6Coord,
            cT: citizen6CoordTop,
            dL: citizen7Coord,
            dT: citizen7CoordTop,
            eL: citizen8Coord,
            eT:citizen8CoordTop
        };
        socket.emit('sendData', data);
    }
    citizen1Image = 0, citizen2Image = 0, citizen3Image = 0, citizen4Image = 0, citizen5Image = 0, citizen6Image = 0,
    citizen7Image = 0, citizen8Image = 0, emperorImage = 0, slaveImage = 0;
}

function betting() {
    var value = parseInt(bet.value());
    if(valueBet == 0){
        if(value > 0 && value <= money) {
            valueBet = value;
            socket.emit('betting', valueBet);
        }
    }
}

function NeedPlayers(WeNeed) {
    if(playing){
        if(WeNeed)
            MPlayers.style('display', 'block');
        else {
            MPlayers.style('display', 'none');
        }
    }
}


// function newMove(data) {
//     slave.style.left = data.x;
//     slave.style.top = data.y;
// }

function GoTo1() {
    changeStartWith = 1;
}

function change() {
    startWith = 1;
    for(var i = 1; i <= 5; ++i)
        f[i] = 0;
    emperorCoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen5CoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen6CoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen7CoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen8CoordFirst = (randomNumber() - 1) * 170 + 1;
    emperorCoordFirstTop = 460;
    citizen5CoordFirstTop = 460;
    citizen6CoordFirstTop = 460;
    citizen7CoordFirstTop = 460;
    citizen8CoordFirstTop = 460;
    emperorCoordTop = 460;
    citizen5CoordTop = 460;
    citizen6CoordTop = 460;
    citizen7CoordTop = 460;
    citizen8CoordTop = 460;
    emperorCoord = emperorCoordFirst;
    citizen5Coord = citizen5CoordFirst;
    citizen6Coord = citizen6CoordFirst;
    citizen7Coord = citizen7CoordFirst;
    citizen8Coord = citizen8CoordFirst;
    var data = {
        aL: emperorCoord,
        aT: emperorCoordTop, 
        bL: citizen5Coord, 
        bT: citizen5CoordTop, 
        cL: citizen6Coord,
        cT: citizen6CoordTop,
        dL: citizen7Coord,
        dT: citizen7CoordTop,
        eL: citizen8Coord,
        eT:citizen8CoordTop
    };
    socket.emit('sendData', data);
}

function change2() {
    startWith = 2;
    for(var i = 1; i <= 5; ++i)
        f[i] = 0;
    slaveCoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen1CoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen2CoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen3CoordFirst = (randomNumber() - 1) * 170 + 1;
    citizen4CoordFirst = (randomNumber() - 1) * 170 + 1;
    slaveCoordFirstTop = 460;
    citizen1CoordFirstTop = 460;
    citizen2CoordFirstTop = 460;
    citizen3CoordFirstTop = 460;
    citizen4CoordFirstTop = 460;
    slaveCoordTop = 460;
    citizen1CoordTop = 460;
    citizen2CoordTop = 460;
    citizen3CoordTop = 460;
    citizen4CoordTop = 460;
    slaveCoord = slaveCoordFirst;
    citizen1Coord = citizen1CoordFirst;
    citizen2Coord = citizen2CoordFirst;
    citizen3Coord = citizen3CoordFirst;
    citizen4Coord = citizen4CoordFirst;
    var data = {
        aL: slaveCoord,
        aT: slaveCoordTop, 
        bL: citizen1Coord, 
        bT: citizen1CoordTop, 
        cL: citizen2Coord,
        cT: citizen2CoordTop,
        dL: citizen3Coord,
        dT: citizen3CoordTop,
        eL: citizen4Coord,
        eT:citizen4CoordTop
    };
    socket.emit('sendData', data);
}

function mousePressed() {
    //console.log(windowHeight, windowHeight - windowHeight / 18);
    // console.log(`${slave.style.left}`);
    //console.log(startWith, mouseX, mouseY, citizen6Coord.left - leftX, citizen6Coord.right - leftX, citizen6Coord.top, citizen6Coord.bottom);
    if(cardDown == false && valueBet != 0){
        if(startWith == 1) {
            if (!emperorImage && mouseX > emperorCoord && mouseX < emperorCoord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragEmperor = true;
                offsetX = emperorCoord - mouseX;
                offsetY = 460 - mouseY;
                //console.log("emperor");
            }
            else if (!citizen5Image && mouseX > citizen5Coord && mouseX < citizen5Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragCitizen5 = true;
                offsetX = citizen5Coord - mouseX;
                offsetY = 460 - mouseY;
                //console.log('soldat5');
            }
            else if (!citizen6Image && mouseX > citizen6Coord && mouseX < citizen6Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragCitizen6 = true;
                offsetX = citizen6Coord - mouseX;
                offsetY = 460 - mouseY;
                //console.log('soldat6')
            }
            else if (!citizen7Image && mouseX > citizen7Coord && mouseX < citizen7Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragCitizen7 = true;
                offsetX = citizen7Coord - mouseX;
                offsetY = 460 - mouseY;
                //console.log('solday7');
            }
            else if (!citizen8Image && mouseX > citizen8Coord && mouseX < citizen8Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                //console.log('soldat8')
                dragging = true;
                dragCitizen8 = true;
                offsetX = citizen8Coord - mouseX;
                offsetY = 460 - mouseY;
            }
        }
        else if(startWith == 2) {
            if (!slaveImage && mouseX > slaveCoord && mouseX < slaveCoord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragSlave = true;
                offsetX = slaveCoord - mouseX;
                offsetY = 460 - mouseY;
                //console.log("slave");
            }
            else if (!citizen1Image && mouseX > citizen1Coord && mouseX < citizen1Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragCitizen1 = true;
                offsetX = citizen1Coord - mouseX;
                offsetY = 460 - mouseY;
                //console.log('soldat1');
            }
            else if (!citizen2Image && mouseX > citizen2Coord && mouseX < citizen2Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragCitizen2 = true;
                offsetX = citizen2Coord - mouseX;
                offsetY = 460 - mouseY;
                //console.log('soldat2')
            }
            else if (!citizen3Image && mouseX > citizen3Coord && mouseX < citizen3Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                dragging = true;
                dragCitizen3 = true;
                offsetX = citizen3Coord - mouseX;
                offsetY = 460 - mouseY;
                //console.log('solday3');
            }
            else if (!citizen4Image && mouseX > citizen4Coord && mouseX < citizen4Coord + cardWidth && 
                mouseY > 460 && mouseY < 460 + cardHeight){
                //console.log('soldat4')
                dragging = true;
                dragCitizen4 = true;
                offsetX = citizen4Coord - mouseX;
                offsetY = 460 - mouseY;
            }
        }
    }
}

function mouseReleased() {
    if(dragEmperor == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 1){
                emperorCoord = emperorCoordFirst;
                emperorCoordTop = emperorCoordFirstTop;
            }
        }
        else {
            cardId = "emperor";
            cardDown = true;
        }
        dragEmperor = false;
    }
    else if(dragCitizen5 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 1) {
                citizen5Coord = citizen5CoordFirst;
                citizen5CoordTop = citizen5CoordFirstTop;
            }
        }
        else {
            cardId = "citizen5";
            cardDown = true;
        }
        dragCitizen5 = false;
    }
    else if(dragCitizen6 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 1) {
                citizen6Coord = citizen6CoordFirst;
                citizen6CoordTop = citizen6CoordFirstTop;
            }
        }
        else {
            cardId = "citizen6";
            cardDown = true;
        }
        dragCitizen6 = false;
    }
    else if(dragCitizen7 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 1) {
                citizen7Coord = citizen7CoordFirst;
                citizen7CoordTop = citizen7CoordFirstTop;
            }
        }
        else {
            cardId = "citizen7";
            cardDown = true;
        }
        dragCitizen7 = false;
    }
    else if(dragCitizen8 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 1) {
                citizen8Coord = citizen8CoordFirst;
                citizen8CoordTop = citizen8CoordFirstTop;
            }
        }
        else {
            cardId = "citizen8";
            cardDown = true;
        }
        dragCitizen8 = false;
    }
    else if(dragSlave == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 2){
                slaveCoord = slaveCoordFirst;
                slaveCoordTop = slaveCoordFirstTop;
            }
        }
        else {
            cardId = "slave";
            cardDown = true;
        }
        dragSlave = false;
    }
    else if(dragCitizen1 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 2) {
                citizen1Coord = citizen1CoordFirst;
                citizen1CoordTop = citizen1CoordFirstTop;
            }
        }
        else {
            cardId = "citizen1";
            cardDown = true;
        }
        dragCitizen1 = false;
    }
    else if(dragCitizen2 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 2) {
                citizen2Coord = citizen2CoordFirst;
                citizen2CoordTop = citizen2CoordFirstTop;
            }
        }
        else {
            cardId = "citizen2";
            cardDown = true;
        }
        dragCitizen2 = false;
    }
    else if(dragCitizen3 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 2) {
                citizen3Coord = citizen3CoordFirst;
                citizen3CoordTop = citizen3CoordFirstTop;
            }
        }
        else {
            cardId = "citizen3";
            cardDown = true;
        }
        dragCitizen3 = false;
    }
    else if(dragCitizen4 == true) {
        if(mouseX + offsetX < 880 || mouseY + offsetY < 360){
            if(startWith == 2) {
                citizen4Coord = citizen4CoordFirst;
                citizen4CoordTop = citizen4CoordFirstTop;
            }
        }
        else {
            cardId = "citizen4";
            cardDown = true;
        }
        dragCitizen4 = false;
    }
    dragging = false;
    if(startWith == 1){
        var data = {
            aL: emperorCoord,
            aT: emperorCoordTop, 
            bL: citizen5Coord, 
            bT: citizen5CoordTop, 
            cL: citizen6Coord,
            cT: citizen6CoordTop,
            dL: citizen7Coord,
            dT: citizen7CoordTop,
            eL: citizen8Coord,
            eT:citizen8CoordTop
        };
        socket.emit('sendData', data);
    }
    else if(startWith == 2) {
        var data = {
            aL: slaveCoord,
            aT: slaveCoordTop, 
            bL: citizen1Coord, 
            bT: citizen1CoordTop, 
            cL: citizen2Coord,
            cT: citizen2CoordTop,
            dL: citizen3Coord,
            dT: citizen3CoordTop,
            eL: citizen4Coord,
            eT:citizen4CoordTop
        };
        socket.emit('sendData', data);
    }
}

function credit() {
    inMenu = false;
    start.style('display', 'none');
    credits.style('display', 'none');
    back.style('display', 'block');
    myName.style('display', 'block');
    fullsrv.style('display', 'none');
}

function backToMenu() {
    inMenu = true;
    myName.style('display', 'none');
    start.style('display', 'block');
    credits.style('display', 'block');
    back.style('display', 'none');
    if(goIn == false)
        fullsrv.style('display', 'block');
}
function goInGame() {
    if(goIn && startGame == 0){
        inMenu = false;
        playing = true;
        socket.emit('play', 1);  
        startWith = people + 1;
        if(startWith == 1) {
            emperorCoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen5CoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen6CoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen7CoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen8CoordFirst = (randomNumber() - 1) * 170 + 1;
            emperorCoordFirstTop = 460;
            citizen5CoordFirstTop = 460;
            citizen6CoordFirstTop = 460;
            citizen7CoordFirstTop = 460;
            citizen8CoordFirstTop = 460;
            emperorCoordTop = 460;
            citizen5CoordTop = 460;
            citizen6CoordTop = 460;
            citizen7CoordTop = 460;
            citizen8CoordTop = 460;
            emperorCoord = emperorCoordFirst;
            citizen5Coord = citizen5CoordFirst;
            citizen6Coord = citizen6CoordFirst;
            citizen7Coord = citizen7CoordFirst;
            citizen8Coord = citizen8CoordFirst;
            // var data = {
            //     aL: emperorCoord,
            //     aT: emperorCoordTop, 
            //     bL: citizen5Coord, 
            //     bT: citizen5CoordTop, 
            //     cL: citizen6Coord,
            //     cT: citizen6CoordTop,
            //     dL: citizen7Coord,
            //     dT: citizen7CoordTop,
            //     eL: citizen8Coord,
            //     eT:citizen8CoordTop
            // };
            // socket.emit('sendData', data);
        }
        else if(startWith == 2){
            slaveCoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen1CoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen2CoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen3CoordFirst = (randomNumber() - 1) * 170 + 1;
            citizen4CoordFirst = (randomNumber() - 1) * 170 + 1;
            slaveCoordFirstTop = 460;
            citizen1CoordFirstTop = 460;
            citizen2CoordFirstTop = 460;
            citizen3CoordFirstTop = 460;
            citizen4CoordFirstTop = 460;
            slaveCoordTop = 460;
            citizen1CoordTop = 460;
            citizen2CoordTop = 460;
            citizen3CoordTop = 460;
            citizen4CoordTop = 460;
            slaveCoord = slaveCoordFirst;
            citizen1Coord = citizen1CoordFirst;
            citizen2Coord = citizen2CoordFirst;
            citizen3Coord = citizen3CoordFirst;
            citizen4Coord = citizen4CoordFirst;
            // var data = {
            //     aL: slaveCoord,
            //     aT: slaveCoordTop, 
            //     bL: citizen1Coord, 
            //     bT: citizen1CoordTop, 
            //     cL: citizen2Coord,
            //     cT: citizen2CoordTop,
            //     dL: citizen3Coord,
            //     dT: citizen3CoordTop,
            //     eL: citizen4Coord,
            //     eT:citizen4CoordTop
            // };
            // socket.emit('sendData', data);
        }
        //Style in Game
        start.style('display', 'none');
        credits.style('display', 'none');
        leave.style('display', 'block');
        fullsrv.style('display', 'none');
    }
}

function randomNumber() {

    var nrRan = int(random(1, 6));
    while(f[nrRan] != 0) {
        nrRan = int(random(1, 6));
    }
    f[nrRan] = 1;
    return nrRan;
}
function srvStatus(number) {
    people = number;
    if(number >= 2){
        if(inMenu == true){
            fullsrv.style('display','block');
            goIn = false;
        }
    }
    else {
        goIn = true;
        fullsrv.style('display','none');
    }
}

function leaveGame() {
    if(dragging == false){
        startGame = 150;
        changeStartWith = 0;
        playing = false;
        inMenu = true;
        goIn = true;
        gameOver = false;
        endGame = false;
        endGameForMe = false;
        money = 500;
        moneyEnemy = 500;
        for(var i = 1; i <= 5; ++i)
            f[i] = 0;
        start.style('display', 'block');
        credits.style('display', 'block');
        leave.style('display', 'none');
        MPlayers.style('display', 'none');
        socket.emit('play', -1);
        fullsrv.style('display','none');
        bet.style('display', 'none');
        betSubmit.style('display', 'none');
        //socket.on('ServerStatus', srvStatus);
        startWith = 0;
        slaveCoordTop = slaveCoordFirstTop = 0;citizen1CoordTop = citizen1CoordFirstTop = 0;
        citizen2CoordTop = citizen2CoordFirstTop = 0;citizen3CoordTop = citizen3CoordFirstTop = 0;
        citizen4CoordTop = citizen4CoordFirstTop = 0;slaveCoord = slaveCoordFirst = 0;
        citizen1Coord = citizen1CoordFirst = 0;citizen2Coord = citizen2CoordFirst = 0;
        citizen3Coord = citizen3CoordFirst = 0;citizen4Coord = citizen4CoordFirst = 0;
        emperorCoordTop = emperorCoordFirstTop = 0;
        citizen5CoordTop = citizen5CoordFirstTop = 0;citizen6CoordTop = citizen6CoordFirstTop = 0;
        citizen7CoordTop = citizen7CoordFirstTop = 0;citizen8CoordTop = citizen8CoordFirstTop = 0;
        emperorCoord = emperorCoordFirst = 0;
        citizen5Coord = citizen5CoordFirst = 0;citizen6Coord = citizen6CoordFirst = 0;
        citizen7Coord = citizen7CoordFirst = 0;citizen8Coord = citizen8CoordFirst = 0;
        citizen1Image = 0, citizen2Image = 0, citizen3Image = 0, citizen4Image = 0, citizen5Image = 0, citizen6Image = 0,
        citizen7Image = 0, citizen8Image = 0, emperorImage = 0, slaveImage = 0;
        receive = false;
        enemyCardDown = false;
        cardDown = false;
        cardId = null;
        enemyCard = null;
        number = 0;
        rounds = 0;
    }
}

function windowResized() { 
    if(isFullScreen == undefined){
        fullImage.class("fullImg");
    }
    else {
        fullImage.class("fullImg2");
    }
}

window.onbeforeunload = function () {
    if(startWith == 1 || startWith == 2)
        socket.emit('play', -1);
};
