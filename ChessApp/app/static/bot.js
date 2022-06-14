function bestMove(boardArray, alpha, beta){
    let bestVal = 100000;
    allPossibleBMoves = getAllBlacksPossibleMovePieces(boardArray);

    for (let i = 0; i < allPossibleBMoves.length; i++) {
        console.log(allPossibleBMoves[i]);
        boardArrayCopy = [...boardArray];
        pNot = allPossibleBMoves[i][0];
        ogSq = allPossibleBMoves[i].slice(1,3);
        newSq = allPossibleBMoves[i].slice(3,5);
        boardArrayCopy[boardArrayCopy.indexOf(findPosition(ogSq, boardArrayCopy).join(" "))] = ogSq; 
        boardArrayCopy[boardArrayCopy.indexOf(findPosition(newSq, boardArrayCopy).join(" "))] = newSq + " " + notionToRepresentation(pNot);
        let tempVal = minimax(boardArrayCopy, true, 2, getAllWhitesPossibleMovePieces(boardArrayCopy), alpha, beta);
        if(tempVal < bestVal){
            bestVal = tempVal;
            beta = tempVal;
            bestMove = allPossibleBMoves[i];
        }
    }

    console.log(bestMove);
    return bestMove;
}

function minimax(boardArray, max, depth, possibleBoardMoves, alpha, beta){
    var bestVal;
    if(depth === 0){
        return getBoardValue(boardArray);
    }
    else if(max){
        var bestValue = -100000;
        for (var i = 0; i < possibleBoardMoves.length; i++){
            console.log(possibleBoardMoves[i]);
            boardArrayCopy = [...boardArray];
            pNot = possibleBoardMoves[i][0];
            ogSq = possibleBoardMoves[i].slice(1,3);
            newSq = possibleBoardMoves[i].slice(3,5);
            boardArrayCopy[boardArrayCopy.indexOf(findPosition(ogSq, boardArrayCopy).join(" "))] = ogSq; 
            boardArrayCopy[boardArrayCopy.indexOf(findPosition(newSq, boardArrayCopy).join(" "))] = newSq + " " + notionToRepresentation(pNot);
            let tempVal = minimax(boardArrayCopy, !max, depth - 1, getAllBlacksPossibleMovePieces(boardArrayCopy), alpha, beta);
            if(tempVal > bestVal){
                bestVal = tempVal;
                alpha = tempVal;
            }
            if (alpha >= beta)
            {
                return bestVal;
            }
        }
        bestVal = bestValue;
    }
    else if(!max){
        var bestValue = 100000;
        for (var i = 0; i < possibleBoardMoves.length; i++){
            console.log(possibleBoardMoves[i]);
            boardArrayCopy = [...boardArray];
            pNot = possibleBoardMoves[i][0];
            ogSq = possibleBoardMoves[i].slice(1,3);
            newSq = possibleBoardMoves[i].slice(3,5);
            boardArrayCopy[boardArrayCopy.indexOf(findPosition(ogSq, boardArrayCopy).join(" "))] = ogSq; 
            boardArrayCopy[boardArrayCopy.indexOf(findPosition(newSq, boardArrayCopy).join(" "))] = newSq + " " + notionToRepresentation(pNot);
            let tempVal = minimax(boardArrayCopy, !max, depth - 1, getAllWhitesPossibleMovePieces(boardArrayCopy), alpha, beta);
            if(tempVal < bestVal){
                bestVal = tempVal;
                beta = tempVal;
            }
            if (alpha >= beta)
            {
                return bestVal;
            }
        }
        bestVal = bestValue;
    }
    return bestValue;
}

function getBoardValue(boardArray){
    let boardVal = 0;
    for(let sq of boardArray){
        if (sq.split(" ").some(c=> blackpieces.indexOf(c) >= 0))
        {
          boardVal = boardVal - getValue(sq.split(" ")[1]);
          //when there's a black piece the board value becomes smaller/more negative
        }
        else if (sq.split(" ").some(c=> whitepieces.indexOf(c) >= 0))
        {
          boardVal = boardVal + getValue(sq.split(" ")[1]);
          //otherwise the board value becomes bigger
        }
    }
    return boardVal;
}

function getValue(p){
    if (p.includes("pawn")) {
        return 1;
    } else if (p.includes("rook")) {
        return 5;
    } else if (p.includes("knight")){
        return 3;
    } else if (p.includes("bishop")){
        return 3;
    } else if (p.includes("queen")){
        return 9;
    } else if (p.includes("king")){
        return 1000;
    }
}

function notionToRepresentation(p){
    if (p === "P") {
        return "bpawn";
    } else if (p === "R") {
        return "brook";
    } else if (p === "N"){
        return "bknight";
    } else if (p === "B"){
        return "bbishop";
    } else if (p === "Q"){
        return "bqueen";
    } else if (p === "K"){
        return "bking";
    }
}