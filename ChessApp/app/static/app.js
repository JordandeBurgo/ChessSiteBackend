const board = document.querySelector(".board");
const boardletters = document.querySelector(".letters");
const boardnumbers = document.querySelector(".numbers");
let boardRep = new Array(64); //useless
let enpassant = false; //useless
let enpassantThisMove = false; //useless
const letters = ["a","b","c","d","e","f","g","h"];
const whitepieces = ["wP", "wR", "wN", "wB", "wK", "wQ"];
const blackpieces = ["bP", "bR", "bN", "bB", "bK", "bQ"];
const allpieces = whitepieces.concat(blackpieces);
let whiteturn = true; //useless
let promotion = false; 
let num = 8;
let prevMoves = []; //useless
let click = false;
let mouseU = false;
let prevclick = ""; //useless
let player = COLOURS.BOTH;
    
for (let i = 0; i < 8; i++) {
    let letter = document.createElement("li");
    letter.textContent = letters[i];
    boardletters.appendChild(letter);
    let numbers = document.createElement("li");
    numbers.textContent = num--;
    boardnumbers.appendChild(numbers);
}

setup();

function setup(){

    let index = 0;
    let black = false;

    num = 8;

    for (let i = 1; i <= 64; i++) {
        const square = document.createElement("div");
        let pos = letters[index] + num;
        square.classList.add("square");
        if (black) {
            square.classList.add("black");
            index++;
            black = !black;
        }
        else {
            square.classList.add("white");
            index++;
            black = !black;
        }

        square.addEventListener("mouseenter", function(e) {
            square.classList.add('hover');
        });
        square.addEventListener("mouseleave", function(e) {
            square.classList.remove('hover');
        });

        square.classList.add(pos);

        square.addEventListener("mousedown", dragStart);

        board.appendChild(square);

        if (index === 8) {
            black = !black
            index = 0;
            num--;
        }
    }

    num = 0;
    let num2 = 1;

    for (let i = 0; i <= 63; i++) {
        boardRep[i] = letters[num] + (num2);
        num++;
        if(num === 8){
            num2++; num = 0;
        }
    }

    // let whitepawns = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'];
    // let whiterooks = ['a1', 'h1'];
    // let whiteknights = ['b1', 'g1'];
    // let whitebishops = ['c1', 'f1'];
    // let whitequeen = 'd1';
    // let whiteking = 'e1';
    // let blackpawns = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'];
    // let blackrooks = ['a8', 'h8'];
    // let blackknights = ['b8', 'g8'];
    // let blackbishops = ['c8', 'f8'];
    // let blackqueen = 'd8';
    // let blackking = 'e8';

    // for (let square of whitepawns) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " wpawn first";
    //     let wpawn = document.querySelector("." + square);
    //     addImage(wpawn, "wpawn");
    //     wpawn.classList.add("wpawn");
    //     //wpawn.classList.add("first");
    // }

    // for (let square of whiterooks) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " wrook first";
    //     let wrook = document.querySelector("." + square);
    //     addImage(wrook, "wrook");
    //     wrook.classList.add("wrook");
    //     //wrook.classList.add("first");
    // }

    // for (let square of whiteknights) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " wknight";
    //     let wknight = document.querySelector("." + square);
    //     addImage(wknight, "wknight");
    //     wknight.classList.add("wknight");
    // }

    // for (let square of whitebishops) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " wbishop";
    //     let wbishop = document.querySelector("." + square);
    //     addImage(wbishop, "wbishop");
    //     wbishop.classList.add("wbishop");
    // }

    // for (let square of blackpawns) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " bpawn first";
    //     let bpawn = document.querySelector("." + square);
    //     addImage(bpawn, "bpawn");
    //     bpawn.classList.add("bpawn");
    //     //bpawn.classList.add("first");
    // }

    // for (let square of blackrooks) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " brook first";
    //     let brook = document.querySelector("." + square);
    //     addImage(brook, "brook");
    //     brook.classList.add("brook");
    //     //brook.classList.add("first");
    // }

    // for (let square of blackknights) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " bknight";
    //     let bknight = document.querySelector("." + square);
    //     addImage(bknight, "bknight");
    //     //bknight.classList.add("bknight");
    // }

    // for (let square of blackbishops) {
    //     boardRep[boardRep.indexOf(square)] = boardRep[boardRep.indexOf(square)] + " bbishop";
    //     let bbishop = document.querySelector("." + square);
    //     addImage(bbishop, "bbishop");
    //     //bbishop.classList.add("bbishop");
    // }

    // boardRep[boardRep.indexOf(blackqueen)] = boardRep[boardRep.indexOf(blackqueen)] + " bqueen";
    // let bqueen = document.querySelector("." + blackqueen);
    // addImage(bqueen, "bqueen");
    // bqueen.classList.add("bqueen");

    // boardRep[boardRep.indexOf(whitequeen)] = boardRep[boardRep.indexOf(whitequeen)] + " wqueen";
    // let wqueen = document.querySelector("." + whitequeen);
    // addImage(wqueen, "wqueen");
    // wqueen.classList.add("wqueen");

    // boardRep[boardRep.indexOf(blackking)] = boardRep[boardRep.indexOf(blackking)] + " bking first";
    // let bking = document.querySelector("." + blackking);
    // addImage(bking, "bking");
    // bking.classList.add("bking");
    // bking.classList.add("first");

    // boardRep[boardRep.indexOf(whiteking)] = boardRep[boardRep.indexOf(whiteking)] + " wking first";
    // let wking = document.querySelector("." + whiteking);
    // addImage(wking, "wking");
    // wking.classList.add("wking");
    // wking.classList.add("first");

    // prevMoves.push([...boardRep]);

}

/*

function setupPosition(boardArray){
    let i = 0
    enpassant = false;
    for(let pos of boardArray){
        if(pos.split(" ").includes("enpassant")){
            enpassant = true;
        }
        if (pos !== boardRep[i]){
            let oldthing = document.getElementsByClassName(boardRep[i])[0];
            let oldcl = oldthing.classList;
            
            oldthing.setAttribute("class", oldcl[0] + " " + oldcl[1] + " " + pos);

            while (oldthing.firstChild) {
                oldthing.removeChild(oldthing.lastChild);
            }

            if(pos.split(" ").some(c=> allpieces.indexOf(c) >= 0)){
                addImage(oldthing, pos.split(" ")[1]);
            }

            boardRep[i] = pos;
        }
        i++;
    }
    prevMoves.push([...boardRep]);
}

function reset(){
    for(let pos of boardRep){
        document.getElementsByClassName(pos)[0].remove();
    }
    whiteturn = true;
    prevMoves = [];
    setup();
}

function callPiece(square){
    piece(square.currentTarget);
}

*/

function dragStart(ev){
    mouseU = false;
    console.log(player)
    console.log(GameBoard.side)
    if(((ev.currentTarget.classList.toString().split(" ").some(c=> whitepieces.indexOf(c) >= 0) && GameBoard.side == 0) || (ev.currentTarget.classList.toString().split(" ").some(c=> blackpieces.indexOf(c) >= 0) && GameBoard.side == 1)) && (GameBoard.side == player || player == COLOURS.BOTH)){
        ClickedSquare(ev.currentTarget);

        let ogTarget = ev.currentTarget;
        let imgDrag = document.createElement("img");
        imgDrag.setAttribute("draggable", false);
        let img = ev.currentTarget.firstChild;
        img.style.visibility = 'hidden';
        imgDrag.src = img.src;
        imgDrag.classList = "dragImg";
        imgDrag.width = img.width;
        imgDrag.height = img.height;

        let elemBelow = document.elementFromPoint(ev.clientX, ev.clientY);
        if(elemBelow.tagName === "IMG"){
            elemBelow = elemBelow.parentNode;
        }

        imgDrag.style.position = 'absolute';
        document.body.append(imgDrag);

        shiftX = imgDrag.width/2.3;
        shiftY = imgDrag.height/2.5;

        moveAt(ev.pageX, ev.pageY);

        function moveAt(pageX, pageY) {
            imgDrag.style.left = pageX - shiftX + 'px';
            imgDrag.style.top = pageY - shiftY + 'px';
        }

        let prevHoverElem = ev.currentTarget;
        var hoverElem;
        var removedHoverElems = false;

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            let hoverElems = document.elementsFromPoint(event.pageX, event.pageY);
            for(let i of hoverElems){
                if(i.classList.contains("square")){
                    hoverElem = i;
                    removedHoverElems = false;
                    break;
                }
                hoverElem = null;
            }
            if(hoverElem){
                if(!(hoverElem.classList.contains("hover"))){
                    hoverElem.classList.add("hover");
                    prevHoverElem.classList.remove('hover');
                    prevHoverElem = hoverElem;
                }
            }
            else{
                if(!removedHoverElems){
                    $(".hover").removeClass("hover");
                    removedHoverElems = true;
                }
            }

            /*hoverElem.classList.add('hover');
            if(prevHoverElem !== hoverElem){
                prevHoverElem = hoverElem;
                prevHoverElem.classList.remove('hover');
            }*/
            imgDrag.hidden = true;
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            if(elemBelow.tagName === "IMG"){
                elemBelow = elemBelow.parentNode;
            }
            imgDrag.hidden = false;

            //Edit this so you it stays on the screen or something or stays within the board
            if (!elemBelow){
                console.log(elemBelow);
                return;
            } 
        }

        document.addEventListener('mousemove', onMouseMove);
        
        imgDrag.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            if(elemBelow===ogTarget || !(elemBelow.classList.contains("possibleMove"))){
                img.style.visibility = 'visible';
            }
            mouseU = true;
            try{
                ClickedSquare(elemBelow);
            }
            catch (err){
                console.log(err);
                UserMove.from = SQUARES.NO_SQ;
                $(".active").removeClass("active");
                $(".possibleMove").removeClass("possibleMove");
            }
            document.body.removeChild(imgDrag);

        };
    }
    else if(ev.currentTarget.classList.contains("possibleMove")){
        ClickedSquare(ev.currentTarget);
        return;
    }
    else if(promotion){
        promotion = false;
        board.getElementsByClassName(PrSq(UserMove.from))[0].firstChild.style.visibility = 'visible';
        UserMove.from = SQUARES.NO_SQ;
        UserMove.to = SQUARES.NO_SQ;
        $("#dropdown").remove();
        $(".active").removeClass("active");
        $(".possibleMove").removeClass("possibleMove");
        return;
    }
    else{
        click = false;
        UserMove.from = SQUARES.NO_SQ;
        $(".active").removeClass("active");
        $(".possibleMove").removeClass("possibleMove");
        try{
            if(promotion){
                promotion = false;
                menu = document.getElementById("dropdown");
                menu.parentNode.removeChild(menu);
            }
        }
        catch(e) {
            console.log(e);
        }
    }
}

/*

function addImage(square, pieceName){
    let img = document.createElement("img");
    img.setAttribute("draggable", false);
    img.classList.add("piece");
    if(pieceName[0] === "w"){
        img.src = "assets/w_" + pieceName.substring(1) + "_png_128px.png";
    }
    else{
        img.src = "assets/b_" + pieceName.substring(1) + "_png_128px.png";
    }
    square.appendChild(img);
}

*/