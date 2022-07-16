//For some pieces it is currently checking if a move is check before checking if it is definitely possible outsdide of check which is prob wasting a lot of time

//TODO1  :  Add minimax computer opponent
    //Remeber for this that pawn promotion (options) needs to be considered

//I think what I should do here is still do the move generation like this on the front end, so that the user can see which moves are legal
//However I think it is going to look very different. We no longer want this function affecting anything of the move, we dont want it to actually make
//The move or anything like that, we just need it so that the user can see the possible moves of the piece they have clicked on

/*function piece(square){
    classList2 = square.classList.toString();
    let properties = classList2.split(" ");
    properties.splice(0,2);

    if(promotion){
        promotion = false;
        if(classList2.split(" ").includes("promoting")){
            square.classList.remove("promoting");
        }
        else{
            active = document.getElementsByClassName("active")
            if (active.length === 1)
                active[0].classList.remove("active");
            activeSquares = document.getElementsByClassName("possibleMove");
            let i = 0;
            while (i < activeSquares.length) {
                activeSquares[i].classList.remove("possibleMove");
            }
            menu = document.getElementById("menu");
            menu.parentNode.removeChild(menu);
            return;
        }

        activeSquare = document.querySelector(".active");
        movingPiece = activeSquare.classList.toString().split(" ")[3];
        asrepInfo = activeSquare.classList.toString().split(" ")[2] + " "  + activeSquare.classList.toString().split(" ")[3];
        srepInfo = square.classList.toString().split(" ")[2];
        if (square.classList.toString().split(" ").some(c=> allpieces.indexOf(c) >= 0)) {
            srepInfo = srepInfo + " " + square.classList.toString().split(" ")[3];
            square.classList.remove(square.classList.toString().split(" ")[3]);
            square.removeChild(square.querySelector(".piece"));
            if (properties.includes("first")) {
                square.classList.remove("first");
                srepInfo = srepInfo + " first";
            }
        }
        activeSquareRep = boardRep.indexOf(asrepInfo);
        squareRep = boardRep.indexOf(srepInfo);
        if(enpassantThisMove){
            ensquareRep = boardRep.indexOf(ensrepInfo);
            boardRep[ensquareRep] = boardRep[ensquareRep].split(" ")[0];
            enpassantThisMove = false;
        }

        activeSquare.classList.remove(movingPiece);
        boardRep[activeSquareRep] = boardRep[activeSquareRep].split(" ")[0];
        
        if(movingPiece.includes("b")){
            if(classList2.split(" ").includes("pknight")){
                square.classList.remove("pknight");
                addImage(square, "bknight");
                square.classList.add("bknight");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "bknight";
            }
            if(classList2.split(" ").includes("pbishop")){
                square.classList.remove("pbishop");
                addImage(square, "bbishop");
                square.classList.add("bbishop");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "bbishop";
            }
            if(classList2.split(" ").includes("prook")){
                square.classList.remove("prook");
                addImage(square, "brook");
                square.classList.add("brook");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "brook";
            }
            if(classList2.split(" ").includes("pqueen")){
                square.classList.remove("pqueen");
                addImage(square, "bqueen");
                square.classList.add("bqueen");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "bqueen";
            }
        }
        else{
            if(classList2.split(" ").includes("pknight")){
                square.classList.remove("pknight");
                addImage(square, "wknight");
                square.classList.add("wknight");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "wknight";
            }
            if(classList2.split(" ").includes("pbishop")){
                square.classList.remove("pbishop");
                addImage(square, "wbishop");
                square.classList.add("wbishop");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "wbishop";
            }
            if(classList2.split(" ").includes("prook")){
                square.classList.remove("prook");
                addImage(square, "wrook");
                square.classList.add("wrook");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "wrook";
            }
            if(classList2.split(" ").includes("pqueen")){
                square.classList.remove("pqueen");
                addImage(square, "wqueen");
                square.classList.add("wqueen");
                boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + "wqueen";
            }
        }
        
        activeSquare.removeChild(activeSquare.firstChild);
        active = document.getElementsByClassName("active")
        if (active.length === 1)
            active[0].classList.remove("active");
        activeSquares = document.getElementsByClassName("possibleMove");
        let i = 0;
        while (i < activeSquares.length) {
            activeSquares[i].classList.remove("possibleMove");
        }
        if(!check(boardRep).includes("none")){
            checkCheckmate(boardRep, whiteturn);
        }
        prevMoves.push([...boardRep]);
        whiteturn = !whiteturn;
        return;
    }

    NO NEEED FOR FUNCTION ABOVE

    if(properties.includes("possibleMove")){
        activeSquare = document.querySelector(".active");
        movingPiece = activeSquare.classList.toString().split(" ")[3];
        asrepInfo = activeSquare.classList.toString().split(" ")[2] + " "  + activeSquare.classList.toString().split(" ")[3];
        srepInfo = square.classList.toString().split(" ")[2];

        if(enpassant){
            enpassantsquareSelect = document.querySelector(".enpassant")
            if (enpassantsquareSelect === square && (movingPiece === "wpawn" || movingPiece === "bpawn")){
                enpassantThisMove = true;
            }
            enpassantsquareSelect.classList.remove("enpassant");
            enpassantsquare = enpassantsquareSelect.classList.toString().split(" ")[2] + " enpassant";
            boardRep[boardRep.indexOf(enpassantsquare)] = boardRep[boardRep.indexOf(enpassantsquare)].replace(" enpassant", "");
            enpassant = false;
        }
                
        if (activeSquare.classList.contains("first")) {
            activeSquare.classList.remove("first");
            asrepInfo = asrepInfo + " first";
            if (movingPiece === "wpawn"){
                if (parseInt(activeSquare.classList.toString().split(" ")[2][1], 10) + 2 === parseInt(square.classList.toString().split(" ")[2][1], 10)){
                    enpassantsquare = activeSquare.classList.toString().split(" ")[2][0] + (parseInt(activeSquare.classList.toString().split(" ")[2][1], 10) + 1);
                    document.querySelector("." + enpassantsquare).classList.add("enpassant");
                    boardRep[boardRep.indexOf(enpassantsquare)] += " enpassant";
                    enpassant = true;
                }
            }
            else if (movingPiece === "bpawn"){
                if (parseInt(activeSquare.classList.toString().split(" ")[2][1], 10) - 2 === parseInt(square.classList.toString().split(" ")[2][1], 10)){
                    enpassantsquare = activeSquare.classList.toString().split(" ")[2][0] + (parseInt(activeSquare.classList.toString().split(" ")[2][1], 10) - 1);
                    document.querySelector("." + enpassantsquare).classList.add("enpassant");
                    boardRep[boardRep.indexOf(enpassantsquare)] += " enpassant";
                    enpassant = true;
                }
            }
            else if (movingPiece === "wking"){
                if (letters.indexOf(activeSquare.classList.toString().split(" ")[2][0]) + 2 === letters.indexOf(square.classList.toString().split(" ")[2][0])){
                    boardRep[boardRep.indexOf(findPosition("f1", boardRep).join(" "))] = "f1 wrook";
                    newrook = document.querySelector(".f1")
                    newrook.classList.add("wrook");
                    boardRep[boardRep.indexOf(findPosition("h1", boardRep).join(" "))] = "h1";
                    oldrook = document.querySelector(".h1");
                    oldrook.classList.remove("wrook");
                    oldrook.classList.remove("first");
                    newrook.appendChild(oldrook.firstChild);
                    newrook.firstChild.style.visibility = 'visible';
                    oldrook.removeChild;
                }
                else if (letters.indexOf(activeSquare.classList.toString().split(" ")[2][0]) - 2 === letters.indexOf(square.classList.toString().split(" ")[2][0])){
                    boardRep[boardRep.indexOf(findPosition("d1", boardRep).join(" "))] = "d1 wrook";
                    newrook = document.querySelector(".d1")
                    newrook.classList.add("wrook");
                    boardRep[boardRep.indexOf(findPosition("a1", boardRep).join(" "))] = "a1";
                    oldrook = document.querySelector(".a1");
                    oldrook.classList.remove("wrook");
                    oldrook.classList.remove("first");
                    newrook.appendChild(oldrook.firstChild);
                    newrook.firstChild.style.visibility = 'visible';
                    oldrook.removeChild;
                }
            }
            else if (movingPiece === "bking"){
                if (letters.indexOf(activeSquare.classList.toString().split(" ")[2][0]) + 2 === letters.indexOf(square.classList.toString().split(" ")[2][0])){
                    boardRep[boardRep.indexOf(findPosition("f8", boardRep).join(" "))] = "f8 brook";
                    newrook = document.querySelector(".f8")
                    newrook.classList.add("brook");
                    boardRep[boardRep.indexOf(findPosition("h8", boardRep).join(" "))] = "h8";
                    oldrook = document.querySelector(".h8");
                    oldrook.classList.remove("brook");
                    oldrook.classList.remove("first");
                    newrook.appendChild(oldrook.firstChild);
                    newrook.firstChild.style.visibility = 'visible';
                    oldrook.removeChild;
                }
                else if (letters.indexOf(activeSquare.classList.toString().split(" ")[2][0]) - 2 === letters.indexOf(square.classList.toString().split(" ")[2][0])){
                    boardRep[boardRep.indexOf(findPosition("d8", boardRep).join(" "))] = "d8 brook";
                    newrook = document.querySelector(".d8")
                    newrook.classList.add("brook");
                    boardRep[boardRep.indexOf(findPosition("a8", boardRep).join(" "))] = "a8";
                    oldrook = document.querySelector(".a8");
                    oldrook.classList.remove("brook");
                    oldrook.classList.remove("first");
                    newrook.appendChild(oldrook.firstChild);
                    newrook.firstChild.style.visibility = 'visible';
                    oldrook.removeChild;
                }
            }
        }
        if (enpassantThisMove){
            enpos = enpassantsquareSelect.classList.toString().split(" ")[2];
            ensquare = document.querySelector("." + enpos[0] + (parseInt(enpos[1],10) + (movingPiece === "bpawn" ? +1 : -1)));
            ensrepInfo = ensquare.classList.toString().split(" ")[2] + " " + ensquare.classList.toString().split(" ")[3];
            ensquare.classList.remove(ensquare.classList.toString().split(" ")[3]);
            ensquare.removeChild(ensquare.querySelector(".piece"));
        }

        if (movingPiece === "wpawn"){
            if(parseInt(square.classList.toString().split(" ")[2][1], 10) === 8){
                promotion = true;
                generatePromotionMenu(activeSquare, square);
                return;
            }
        }
        if (movingPiece === "bpawn"){
            if(parseInt(square.classList.toString().split(" ")[2][1], 10) === 1){
                promotion = true;
                generatePromotionMenu(activeSquare, square);
                return;
            }
        }

        if (square.classList.toString().split(" ").some(c=> allpieces.indexOf(c) >= 0)) {
            srepInfo = srepInfo + " " + square.classList.toString().split(" ")[3];
            square.classList.remove(square.classList.toString().split(" ")[3]);
            square.removeChild(square.querySelector(".piece"));
            if (properties.includes("first")) {
                square.classList.remove("first");
                srepInfo = srepInfo + " first";
            }
        }

        activeSquareRep = boardRep.indexOf(asrepInfo);
        squareRep = boardRep.indexOf(srepInfo);
        if(enpassantThisMove){
            ensquareRep = boardRep.indexOf(ensrepInfo);
            boardRep[ensquareRep] = boardRep[ensquareRep].split(" ")[0];
            enpassantThisMove = false;
        }

        activeSquare.classList.remove(movingPiece);
        boardRep[activeSquareRep] = boardRep[activeSquareRep].split(" ")[0];
        boardRep[squareRep] = boardRep[squareRep].split(" ")[0] + " " + asrepInfo.split(" ")[1];

        square.classList.add(movingPiece);
        square.appendChild(activeSquare.firstChild);
        square.firstChild.style.visibility = 'visible';
        activeSquare.removeChild;
        active = document.getElementsByClassName("active")
        if (active.length === 1)
            active[0].classList.remove("active");
        activeSquares = document.getElementsByClassName("possibleMove");
        let i = 0;
        while (i < activeSquares.length) {
            activeSquares[i].classList.remove("possibleMove");
        }
        if(!check(boardRep).includes("none")){
            checkCheckmate(boardRep, whiteturn);
        }
        prevMoves.push([...boardRep]);
        whiteturn = !whiteturn;
    } NO NEED FOR IF ABOVE(TO AN EXTENT, WE NEED A SIMILAR BUT MUCH SIMPLER IF STATEMENT)
    else if (document.getElementsByClassName("active").length === 0 && properties.length > 1){
        if((whiteturn && properties[1][0] === 'w') || (!whiteturn && properties[1][0] === 'b')){
            square.classList.add("active");
            for(let possiblesquare of getPossibleMoves(properties, boardRep, true)){
                document.querySelector("." + possiblesquare).classList.add("possibleMove");
            }
        }      
    } THIS ELIF IS IMPORTANT
    else {
        active = document.getElementsByClassName("active");
        if (active.length === 1)
            active[0].classList.remove("active");
        activeSquares = document.getElementsByClassName("possibleMove");
        let i = 0;
        while (i < activeSquares.length) {
            activeSquares[i].classList.remove("possibleMove");
        }
    } THIS ELSE IF IMPORTANT
}

function getPossibleMoves(properties, boardArray, checkup) {
    if (properties.includes("bpawn") || properties.includes("wpawn")) {
        return pawn(properties,boardArray,checkup);
    } else if (properties.includes("brook") || properties.includes("wrook")) {
        return rook(properties,boardArray,checkup);
    } else if (properties.includes("bknight") || properties.includes("wknight")){
        return knight(properties,boardArray,checkup);
    } else if (properties.includes("bbishop") || properties.includes("wbishop")){
        return bishop(properties,boardArray,checkup);
    } else if (properties.includes("bqueen") || properties.includes("wqueen")){
        return queen(properties,boardArray,checkup);
    } else if (properties.includes("bking") || properties.includes("wking")){
        return king(properties,boardArray,checkup);
    }
}

//When checking for checkmate we need to set checkup to true so add ad parameter
function getAllPossibleMoves(boardArray) {
    let allPossibleMoves = [];
    for(let pos of boardArray){
        if(pos.split(" ").some(c=> allpieces.indexOf(c) >= 0)){
            piecesMoves = getPossibleMoves(pos.split(" "), boardArray, false);
            allPossibleMoves = allPossibleMoves.concat(piecesMoves);
        }
    }
    return allPossibleMoves;
}

function getAllWhitesPossibleMoves(boardArray) {
    let allWhitesPossibleMoves = [];
    for(let pos of boardArray){
        if(pos.split(" ").some(c=> allpieces.indexOf(c) >= 0)){
            if(pos.split(" ")[1][0] === 'w'){
                piecesMoves = getPossibleMoves(pos.split(" "), boardArray, true);
                allWhitesPossibleMoves = allWhitesPossibleMoves.concat(piecesMoves);
            }
        }
    }
    return allWhitesPossibleMoves;
}

function getAllWhitesPossibleMovePieces(boardArray) {
    let allWhitesPossibleMoves = [];
    for(let pos of boardArray){
        if(pos.split(" ").some(c=> allpieces.indexOf(c) >= 0)){
            if(pos.split(" ")[1][0] === 'w'){
                piecesMoves = getPossibleMoves(pos.split(" "), boardArray, true);
                let i = 0;
                for(let move of piecesMoves){
                    if (pos.split(" ").includes("bpawn") || pos.split(" ").includes("wpawn")) {
                        piecesMoves[i] = "P" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("brook") || pos.split(" ").includes("wrook")) {
                        piecesMoves[i] = "R" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bknight") || pos.split(" ").includes("wknight")){
                        piecesMoves[i] = "N" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bbishop") || pos.split(" ").includes("wbishop")){
                        piecesMoves[i] = "B" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bqueen") || pos.split(" ").includes("wqueen")){
                        piecesMoves[i] = "Q" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bking") || pos.split(" ").includes("wking")){
                        piecesMoves[i] = "K" + pos.split(" ")[0] + move;
                    }
                    i++;
                }
                allWhitesPossibleMoves = allWhitesPossibleMoves.concat(piecesMoves);
            }
        }
    }
    return allWhitesPossibleMoves;
}

function getAllBlacksPossibleMoves(boardArray) {
    let allBlacksPossibleMoves = [];
    for(let pos of boardArray){
        if(pos.split(" ").some(c=> allpieces.indexOf(c) >= 0)){
            if(pos.split(" ")[1][0] === 'b'){
                piecesMoves = getPossibleMoves(pos.split(" "), boardArray, true);
                allBlacksPossibleMoves = allBlacksPossibleMoves.concat(piecesMoves);
            }
        }
    }
    return allBlacksPossibleMoves;
}

function getAllBlacksPossibleMovePieces(boardArray) {
    let allBlacksPossibleMoves = [];
    for(let pos of boardArray){
        if(pos.split(" ").some(c=> allpieces.indexOf(c) >= 0)){
            if(pos.split(" ")[1][0] === 'b'){
                piecesMoves = getPossibleMoves(pos.split(" "), boardArray, true);
                let i = 0;
                for(let move of piecesMoves){
                    if (pos.split(" ").includes("bpawn") || pos.split(" ").includes("wpawn")) {
                        piecesMoves[i] = "P" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("brook") || pos.split(" ").includes("wrook")) {
                        piecesMoves[i] = "R" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bknight") || pos.split(" ").includes("wknight")){
                        piecesMoves[i] = "N" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bbishop") || pos.split(" ").includes("wbishop")){
                        piecesMoves[i] = "B" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bqueen") || pos.split(" ").includes("wqueen")){
                        piecesMoves[i] = "Q" + pos.split(" ")[0] + move;
                    } else if (pos.split(" ").includes("bking") || pos.split(" ").includes("wking")){
                        piecesMoves[i] = "K" + pos.split(" ")[0] + move;
                    }
                    i++;
                }
                allBlacksPossibleMoves = allBlacksPossibleMoves.concat(piecesMoves);
            }
        }
    }
    return allBlacksPossibleMoves;
}

function pawn(properties, boardArray, checkup){
    let position = properties[0];
    let black = false;
    if (properties.includes("bpawn")){
        black = true;
    }
    else {
        black = false;
    }

    let rank = parseInt(position[1], 10);

    if (properties.includes("first")){
        if (!black) {
            possibleMoves = [letters[letters.findIndex(letter=>letter === position[0])+1] + (rank+1), letters[letters.findIndex(letter=>letter === position[0])-1] + (rank+1),position[0] + (rank+1), position[0] + (rank+2)];
        }
        else {
            possibleMoves = [letters[letters.findIndex(letter=>letter === position[0])+1] + (rank-1), letters[letters.findIndex(letter=>letter === position[0])-1] + (rank-1), position[0] + (rank-1), position[0] + (rank-2)];
        }
    }
    else {
        if (!black) {
            possibleMoves = [letters[letters.findIndex(letter=>letter === position[0])+1] + (rank+1), letters[letters.findIndex(letter=>letter === position[0])-1] + (rank+1), position[0] + (rank+1)];
        }
        else {
            possibleMoves = [letters[letters.findIndex(letter=>letter === position[0])+1] + (rank-1), letters[letters.findIndex(letter=>letter === position[0])-1] + (rank-1), position[0] + (rank-1)];
        }
    }

    let finalPossibleMoves = [];
    
    for(let r of possibleMoves) {
        try {
            let classes = findPosition(r, boardArray);
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                if(r[0] === position[0]){
                    if (classes.length === 1){
                        finalPossibleMoves.push(r);
                    }
                    else{
                        break;
                    }
                }
                else{
                    if (!black) {
                        if (classes.some(c=> blackpieces.indexOf(c) >= 0) || (classes.includes("enpassant") && document.querySelector("." + r[0] + (parseInt(r[1]) - 1)).classList.contains("bpawn"))){
                            finalPossibleMoves.push(r);
                        }
                    }
                    else {
                        if (classes.some(c=> whitepieces.indexOf(c) >= 0) || (classes.includes("enpassant") && document.querySelector("." + r[0] + (parseInt(r[1]) + 1)).classList.contains("wpawn"))){
                            finalPossibleMoves.push(r);
                        }
                    }
                }
            }
        }
        catch(e) {
            continue;
        }
    }
    return finalPossibleMoves;
}

function rook(properties, boardArray, checkup){
    let position = properties[0];
    let black = false;
    if (properties.includes("brook") || properties.includes("bqueen")){
        black = true;
    }
    else {
        black = false;
    }

    const rank = parseInt(position[1], 10);
    let finalPossibleMoves = [];

    for (let i = rank+1; i <= 8; i++) {
        let r = position[0] + i;
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }

    for (let i = rank-1; i >= 1; i--) {
        let r = position[0] + i;
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }

    for (let i = letters.findIndex(letter=>letter === position[0])+1; i < 8; i++) {
        let r = letters[i] + position[1];
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }

    for (let i = letters.findIndex(letter=>letter === position[0])-1; i >= 0; i--) {
        let r = letters[i] + position[1];
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }
    return finalPossibleMoves;
}

function knight(properties, boardArray, checkup){
    let position = properties[0];
    let black = false;
    if (properties.includes("bknight")){
        black = true;
    }
    else {
        black = false;
    }

    let rank = parseInt(position[1], 10);
    let file = letters.findIndex(letter=>letter === position[0])

    let possibleMoves = [];
        
    if(file+2<8){
        if(rank+2<=8){
            possibleMoves.push(letters[file+1] + (rank+2));
            possibleMoves.push(letters[file+2] + (rank+1));
        }
        else if(rank+1<=8){
            possibleMoves.push(letters[file+2] + (rank+1));
        }
        if(rank-2>0){
            possibleMoves.push(letters[file+1] + (rank-2));
            possibleMoves.push(letters[file+2] + (rank-1));
        }
        else if(rank-1>0){
            possibleMoves.push(letters[file+2] + (rank-1));
        }
    }
    else if (file+1<8){
        if(rank+2<=8){
            possibleMoves.push(letters[file+1] + (rank+2));
        }
        if(rank-2>0){
            possibleMoves.push(letters[file+1] + (rank-2));
        }
    }  
    if (file-2>=0){
        if(rank+2<=8){
            possibleMoves.push(letters[file-1] + (rank+2));
            possibleMoves.push(letters[file-2] + (rank+1));
        }
        else if (rank+1<=8){
            possibleMoves.push(letters[file-2] + (rank+1));
        }
        if(rank-2>0){
            possibleMoves.push(letters[file-1] + (rank-2));
            possibleMoves.push(letters[file-2] + (rank-1));
        }
        else if(rank-1>0){
            possibleMoves.push(letters[file-2] + (rank-1));
        }
    }
    else if (file-1>=0){
        if(rank+2<=8){
            possibleMoves.push(letters[file-1] + (rank+2));
        }
        if(rank-2>0){
            possibleMoves.push(letters[file-1] + (rank-2));
        }
    }

    let finalPossibleMoves = [];

    for(let i = 0; i < possibleMoves.length; i ++){
        let r = possibleMoves[i];
        let classes = findPosition(r, boardArray);
        checkType = "";
        if(checkup){
            boardRepCopy = [...boardArray];
            boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
            boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
            checkType = check(boardRepCopy);
        }
        if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
            if (classes.length === 1 || classes.includes("enpassant")){
                finalPossibleMoves.push(r);
            }
            else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
                finalPossibleMoves.push(r);
            }
        }
    }
    return finalPossibleMoves;
}

function bishop(properties, boardArray, checkup){
    let position = properties[0];
    let black = false;
    if (properties.includes("bbishop") || properties.includes("bqueen")){
        black = true;
    }
    else {
        black = false;
    }

    let rank = parseInt(position[1], 10);
    let file = letters.findIndex(letter=>letter === position[0])
    let j = rank
    let finalPossibleMoves = [];

    for(let i = file+1; i < 8; i++){
        if (j>=8){
            break;
        }
        j++;
        let r = letters[i] + j;
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }

    j = rank;

    for(let i = file-1; i >= 0; i--){
        if (j>=8){
            break;
        }
        j++;
        let r = letters[i] + j;
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }

    j = rank;

    for(let i = file-1; i >= 0; i--){
        if (j<=1){
            break;
        }
        j--;
        let r = letters[i] + j;
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }

    j = rank;

    for(let i = file+1; i < 8; i++){
        if (j<=1){
            break;
        }
        j--;
        let r = letters[i] + j;
        let classes = findPosition(r, boardArray);
        if (classes.length === 1 || classes.includes("enpassant")){
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
        }
        else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
            checkType = "";
            if(checkup){
                boardRepCopy = [...boardArray];
                boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                checkType = check(boardRepCopy);
            }
            if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
                finalPossibleMoves.push(r);
            }
            break;
        }
        else {
            break;
        }
    }
    return finalPossibleMoves;
}

function queen(properties, boardArray, checkup){
    return rook(properties, boardArray, checkup).concat(bishop(properties, boardArray, checkup));
}

function king(properties, boardArray, checkup){
    let possibleMoves = [];
    let finalPossibleMoves = [];
    let position = properties[0];
    let black = false;
    if (properties.includes("bking")){
        black = true;
    }
    else {
        black = false;
    }

    let rank = parseInt(position[1], 10);
    let file = letters.findIndex(letter=>letter === position[0])

    if(properties.includes("first")){
        checkType = "";
        if(checkup){
            boardRepCopy = [...boardArray];
            checkType = check(boardRepCopy);
        }
        if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
            if(!black){
                if(findPosition("a1", boardArray).length != 0){
                    if(boardArray[boardArray.indexOf(findPosition("a1", boardArray).join(" "))].includes("first")){
                        let queencastle = true;
                        for (let i = letters.findIndex(letter=>letter === position[0])-1; i >= 1; i--) {
                            let r = letters[i] + rank;
                            let classes = findPosition(r, boardArray);
                            if (classes.length !== 1){
                                queencastle = false;
                                break;
                            }
                            else if(i > 1){
                                checkType = "";
                                if(checkup){
                                    boardRepCopy = [...boardArray];
                                    boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                                    boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                                    checkType = check(boardRepCopy);
                                }
                                if(checkType.includes("white") && checkup){
                                    queencastle = false;
                                    break;
                                }
                            }
                        }
                        if (queencastle) {
                            possibleMoves.push("c1");
                        }
                    }
                }
                if(findPosition("h1", boardArray).length != 0){
                    if(boardArray[boardArray.indexOf(findPosition("h1", boardArray).join(" "))].includes("first")){
                        let kingcastle = true;
                        for (let i = letters.findIndex(letter=>letter === position[0])+1; i < 7; i++) {
                            let r = letters[i] + rank;
                            let classes = findPosition(r, boardArray);
                            if (classes.length !== 1){
                                kingcastle = false;
                                break;
                            }
                            else if(i < 7){
                                checkType = "";
                                if(checkup){
                                    boardRepCopy = [...boardArray];
                                    boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                                    boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                                    checkType = check(boardRepCopy);
                                }
                                if(checkType.includes("white") && checkup){
                                    kingcastle = false;
                                    break;
                                }
                            }
                        }
                        if (kingcastle) {
                            possibleMoves.push("g1");
                        }
                    }
                }
            }
            else{
                if(findPosition("a8", boardArray).length != 0){
                    if(boardArray[boardArray.indexOf(findPosition("a8", boardArray).join(" "))].includes("first")){
                        let queencastle = true;
                        for (let i = letters.findIndex(letter=>letter === position[0])-1; i >= 1; i--) {
                            let r = letters[i] + rank;
                            let classes = findPosition(r, boardArray);
                            if (classes.length !== 1){
                                queencastle = false;
                                break;
                            }
                            else if(i > 1){
                                checkType = "";
                                if(checkup){
                                    boardRepCopy = [...boardArray];
                                    boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                                    boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                                    checkType = check(boardRepCopy);
                                }
                                if(checkType.includes("black") && checkup){
                                    queencastle = false;
                                    break;
                                }
                            }
                            
                        }
                        if (queencastle) {
                            possibleMoves.push("c8");
                        }
                    }
                }
                if(findPosition("h8", boardArray).length != 0){
                    if(boardArray[boardArray.indexOf(findPosition("h8", boardArray).join(" "))].includes("first")){
                        let kingcastle = true;
                        for (let i = letters.findIndex(letter=>letter === position[0])+1; i < 7; i++) {
                            let r = letters[i] + rank;
                            let classes = findPosition(r, boardArray);
                            if (classes.length !== 1){
                                kingcastle = false;
                                break;
                            }
                            else if(i < 7){
                                checkType = "";
                                if(checkup){
                                    boardRepCopy = [...boardArray];
                                    boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
                                    boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
                                    checkType = check(boardRepCopy);
                                }
                                if(checkType.includes("black") && checkup){
                                    kingcastle = false;
                                    break;
                                }
                            }
                        }
                        if (kingcastle) {
                            possibleMoves.push("g8");
                        }
                    }
                }
            }
        }
    }

    if(rank+1<=8){
        possibleMoves.push(letters[file] + (rank+1));
        if(file+1 < 8){
            possibleMoves.push(letters[file+1] + (rank+1));
        }
        if(file-1 >= 0){
            possibleMoves.push(letters[file-1] + (rank+1));
        }
    }
    if(rank-1 > 0){
        possibleMoves.push(letters[file] + (rank-1));
        if(file+1 < 8){
            possibleMoves.push(letters[file+1] + (rank-1));
        }
        if(file-1 >= 0){
            possibleMoves.push(letters[file-1] + (rank-1));
        }
    }
    if(file+1 < 8){
        possibleMoves.push(letters[file+1] + rank);
    }
    if(file-1 < 8){
        possibleMoves.push(letters[file-1] + rank);
    }    


    for(let i = 0; i < possibleMoves.length; i ++){
        let r = possibleMoves[i];
        let classes = findPosition(r, boardArray);
        checkType = "";
        if(checkup){
            boardRepCopy = [...boardArray];
            boardRepCopy[boardRepCopy.indexOf(properties.join(" "))] = position; 
            boardRepCopy[boardRepCopy.indexOf(findPosition(r, boardRepCopy).join(" "))] = r + " " + properties[1];
            checkType = check(boardRepCopy);
        }
        if((black && !checkType.includes("black")) || (!black && !checkType.includes("white")) || checkType.includes("none") || !checkup){
            if ((classes.length === 1 || classes.includes("enpassant"))){
                finalPossibleMoves.push(r);
            }
            else if ((black && classes.some(c=> whitepieces.indexOf(c) >= 0)) || (!black && classes.some(c=> blackpieces.indexOf(c) >= 0))) {
                finalPossibleMoves.push(r);
            }
        }   
    }
    return finalPossibleMoves;
}

function findPosition(position, boardArray){
    for(let pos of boardArray){
        if(pos.split(" ")[0] === position){
            return pos.split(" ");
        }
    }
    return [];
}

function findPiece(piece, boardArray){
    for(let pos of boardArray){
        if(pos.split(" ").includes(piece)){
            return pos.split(" ");
        }
    }
    return -1;
}

function check(boardArray){
    allPossibleMoves = getAllPossibleMoves(boardArray);
    bkingPos = findPiece("bking", boardArray);
    wkingPos = findPiece("wking", boardArray);
    checkTypes = [];
    if(allPossibleMoves.includes(bkingPos[0]) || allPossibleMoves.includes(wkingPos[0])){
        if(allPossibleMoves.includes(bkingPos[0])){
            checkTypes.push("black");
        }
        if(allPossibleMoves.includes(wkingPos[0])){
            checkTypes.push("white");
        }
    }
    else{
        checkTypes.push("none");
    }
    return checkTypes;
}
*/

function generatePromotionMenu(square){
    let content = document.createElement("div");
    content.setAttribute('id','dropdown');
    SideChar[GameBoard.side] == "b" ? content.classList.add("dropup-content") : content.classList.add("dropdown-content") ;
    
    let menuOptionKnight = document.createElement("div");
    menuOptionKnight.setAttribute('id', 'night');
    menuOptionKnight.addEventListener("click", function(){
        promotionPieceChosen(square, this)
    });
    let wknightimg = document.createElement("img");
    wknightimg.classList.add("pieceMenu");
    wknightimg.src = "/static/assets/" + SideChar[GameBoard.side] + "N.png";
    menuOptionKnight.appendChild(wknightimg);
    content.appendChild(menuOptionKnight);

    let menuOptionBishop = document.createElement("div");
    menuOptionBishop.setAttribute('id', 'bishop');
    menuOptionBishop.addEventListener("click", function(){
        promotionPieceChosen(square, this)
    });
    let wbishopimg = document.createElement("img");
    wbishopimg.classList.add("pieceMenu");
    wbishopimg.src = "/static/assets/" + SideChar[GameBoard.side] + "B.png";
    menuOptionBishop.appendChild(wbishopimg);
    content.appendChild(menuOptionBishop);

    let menuOptionRook = document.createElement("div");
    menuOptionRook.setAttribute('id', 'rook');
    menuOptionRook.addEventListener("click", function(){
        promotionPieceChosen(square, this)
    });
    let wrookimg = document.createElement("img");
    wrookimg.classList.add("pieceMenu");
    wrookimg.src = "/static/assets/" + SideChar[GameBoard.side] + "R.png";
    menuOptionRook.appendChild(wrookimg);
    content.appendChild(menuOptionRook);

    let menuOptionQueen = document.createElement("div");
    menuOptionQueen.setAttribute('id', 'queen');
    menuOptionQueen.addEventListener("click", function(){
        promotionPieceChosen(square, this)
    });
    let wqueenimg = document.createElement("img");
    wqueenimg.classList.add("pieceMenu");
    wqueenimg.src = "/static/assets/" + SideChar[GameBoard.side] + "Q.png";
    menuOptionQueen.appendChild(wqueenimg);
    content.appendChild(menuOptionQueen);

    square.appendChild(content);

}


function promotionPieceChosen(square, piecetype){
    menu = document.getElementById("dropdown");
    square.removeChild(menu);
    square.classList.add("P" + SideChar[GameBoard.side] + piecetype.id[0].toUpperCase());
    ClickedSquare(square);
}


/*function checkCheckmate(boardArray, wturn){
    if(wturn){
        allMovesForBlack = getAllBlacksPossibleMoves(boardArray);
        if(allMovesForBlack.length === 0){
            //Update this to not be an alert
            alert("Black is in checkmate!")
            return true;
        }
        return false;
    }
    else{
        allMovesForWhite = getAllWhitesPossibleMoves(boardArray);
        if(allMovesForWhite.length === 0){
            //Update this to not be an alert
            alert("White is in checkmate!");
            return true;
        }
        return false;
    }
}

function undo(){
    if(prevMoves.length >= 2){
        prevMoves.pop();
        prevPos = prevMoves.pop();
        whiteturn = !whiteturn;
        setupPosition(prevPos);
    }
}

*/