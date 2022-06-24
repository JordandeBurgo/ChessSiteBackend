function NewGame(fenStr) {
    ParseFen(fenStr);
    PrintBoard();
    SetInitialBoardPieces();
    GenerateMoves();
    GenerateLegalMoves();
    GenerateFen();
}

function ClearAllPieces(){
    for(let i of allpieces){
        let pces = $("." + i);
        if(pces!=null){
            for (let pce of pces){
                pce.classList.remove(i);
            }
        }
    }
    $(".piece").remove();
}

function SetInitialBoardPieces(){
    var sq;
    var sq120;
    var file,rank;
    var pceFileName;
    var pce;

    ClearAllPieces();

    for(sq = 0; sq < 64; ++sq){
        sq120 = SQ120(sq);
        pce = GameBoard.pieces[sq120];
        file = FilesBrd[sq120];
        rank = RanksBrd[sq120];
        if(pce >= PIECES.wP && pce <= PIECES.bK){
            rankFileName = letters[file] + (rank+1);
            pceFileName = "/static/assets/" + SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase() + ".png";
            let img = document.createElement("img");
            img.setAttribute("draggable", false);
            img.classList.add("piece");
            img.src = pceFileName;
            $("." + rankFileName).append(img);
            $("." + rankFileName).addClass(SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase());
        }
    }
}

function ClickedSquare(sq){
    theClassList = sq.classList.toString();
    let properties = theClassList.split(" ");
    properties.splice(0,2);
    let file_name = "FILE_" + properties[0][0].toUpperCase();
    let file = FILES[file_name];
    let rank_name = "RANK_" + properties[0][1].toUpperCase();
    let rank = RANKS[rank_name];
    let esq = FR2SQ(file,rank);

    if(promotion){
        let promoPce = sq.classList[sq.classList.length - 1];
        if(promoPce[0] === 'P'){
            promotion = false;
            var parsed2 = ParseMoveHuman(UserMove.from, UserMove.to, PIECES[promoPce.substring(1)]);
            if(parsed2 != NOMOVE){
                socket.emit('moved', {'move': parsed2});
                $(".hover").removeClass("hover");
            }
            UserMove.from = SQUARES.NO_SQ;
            UserMove.to = SQUARES.NO_SQ;
            $(".active").removeClass("active");
            $(".possibleMove").removeClass("possibleMove");
        }
        else if(PrSq(UserMove.to) != properties[0]){
            promotion = false;
            board.getElementsByClassName(PrSq(UserMove.from))[0].firstChild.style.visibility = 'visible';
            UserMove.from = SQUARES.NO_SQ;
            UserMove.to = SQUARES.NO_SQ;
            $("#dropdown").remove();
            $(".active").removeClass("active");
            $(".possibleMove").removeClass("possibleMove")
            UserMove.from = esq;
            sq.classList.add("active");
            let legalMovesSq = GenerateLegalMovesSq(properties[0]);
            for(let possiblesquare of legalMovesSq){
                document.querySelector("." + possiblesquare).classList.add("possibleMove");
            }
        }
        console.log(promoPce);
        $("." + promoPce).removeClass(promoPce);
    }
    else if(UserMove.from == SQUARES.NO_SQ){
        UserMove.from = esq;
        //Set the active square
        sq.classList.add("active");
        //Set possible squares
        let legalMovesSq = GenerateLegalMovesSq(properties[0]);
        for(let possiblesquare of legalMovesSq){
            document.querySelector("." + possiblesquare).classList.add("possibleMove");
        }

    }
    else if(sq.classList.contains("possibleMove")){
        UserMove.to = esq;
        //make the move
        var parsed = ParseMoveHuman(UserMove.from, UserMove.to);
        if((SideChar[GameBoard.side] == "w" && PceChar[GameBoard.pieces[UserMove.from]] == "P" && parseInt(sq.classList.toString().split(" ")[2][1], 10) === 8)
        || (SideChar[GameBoard.side] == "b" && PceChar[GameBoard.pieces[UserMove.from]] == "p" && parseInt(sq.classList.toString().split(" ")[2][1], 10) === 1)){
            promotion = true;
            generatePromotionMenu(document.getElementsByClassName(PrSq(UserMove.from))[0], sq);
        }
        else {
            if(parsed != NOMOVE){
                socket.emit('moved', {'move': parsed});
            }
            UserMove.from = SQUARES.NO_SQ;
            UserMove.to = SQUARES.NO_SQ;
            $(".active").removeClass("active");
            $(".possibleMove").removeClass("possibleMove");
        }
        click = false;
    }
    else if(UserMove.from === esq){
        if(click && mouseU && sq.classList.contains("active")){
            UserMove.from = SQUARES.NO_SQ;
            $(".active").removeClass("active");
            $(".possibleMove").removeClass("possibleMove");
        }
        if(mouseU){
            click = !click;
        }
        //Leave possible moves up to be clicked on
    }
    else if(UserMove.from != esq && click && sq.classList.toString().split(" ").some(c=> allpieces.indexOf(c) >= 0)){
        $(".active").removeClass("active");
        $(".possibleMove").removeClass("possibleMove");
        UserMove.from = esq;
        //Set the active square
        sq.classList.add("active");
        //Set possible squares
        let legalMovesSq = GenerateLegalMovesSq(properties[0]);
        for(let possiblesquare of legalMovesSq){
            document.querySelector("." + possiblesquare).classList.add("possibleMove");
        }
        click = !click;
    }
    else {
        //remove active sqaure and possible squares
        UserMove.from = SQUARES.NO_SQ;
        $(".active").removeClass("active");
        $(".possibleMove").removeClass("possibleMove");
    }
}

function ParseMoveHuman(from, to, ChosenPromPce=PIECES.EMPTY){
    var Move = NOMOVE;
	var PromPce = PIECES.EMPTY;
	var found = BOOL.FALSE;
    for(index = 0; index < GameBoard.legalMoveList.length; ++index) {
		Move = GameBoard.legalMoveList[index];
        if(FROMSQ(Move) == from && TOSQ(Move) == to) {
			PromPce = PROMOTED(Move);
			if(PromPce != PIECES.EMPTY) {
				if( (PromPce == ChosenPromPce) ) {
					found = BOOL.TRUE;
					break;
				}
				continue;
			}
			found = BOOL.TRUE;
			break;
		}	
    }
    if(found != BOOL.FALSE){
        return Move;
    }
    return NOMOVE;
}

function ParseMoveBot(from, to){
	GenerateMoves();
	
	var Move = NOMOVE;
	var PromPce = PIECES.EMPTY;
	var found = BOOL.FALSE;
	
	for(index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {	
		Move = GameBoard.moveList[index];
		if(FROMSQ(Move) == from && TOSQ(Move) == to) {
			PromPce = PROMOTED(Move);
			if(PromPce != PIECES.EMPTY) {
				if( (PromPce == PIECES.wQ && GameBoard.side == COLOURS.WHITE) || (PromPce == PIECES.bQ && GameBoard.side == COLOURS.BLACK) ) {
					found = BOOL.TRUE;
					break;
				}
				continue;
			}
			found = BOOL.TRUE;
			break;
		}		
	}
	
	if(found != BOOL.FALSE) {
		if(MakeMove(Move) == BOOL.FALSE) {
			return NOMOVE;
		}
		TakeMove();
		return Move;
	}
	
	return NOMOVE;
}

function RemovePieceFromGUI(sq){
    let sq_name = PrSq(sq);
    console.log(sq_name);
    $("." + sq_name).empty();
    let pce = GameBoard.pieces[sq];
    let pce_name = SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase()
    console.log(pce_name);
    //Remove class of the pce
    $("." + sq_name).removeClass(pce_name);
}

function RemovePromotionPieceFromGUI(sq, pce){
    let sq_name = PrSq(sq);
    console.log(sq_name);
    $("." + sq_name).empty();
    let pce_name = SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase()
    console.log(pce_name);
    //Remove class of the pce
    $("." + sq_name).removeClass(pce_name);
}

function AddPieceToGUI(sq, pce){
    let square = $("." + PrSq(sq));
    let img = document.createElement("img");
    img.setAttribute("draggable", false);
    img.classList.add("piece");
    let pce_name = SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase()
    let pceFileName = "/static/assets/" + pce_name + ".png";
    img.src = pceFileName;
    square.append(img);
    //Add class of the pce
    square.addClass(pce_name);
}

function MoveGUIPiece(move){
    var from = FROMSQ(move);
    var to = TOSQ(move);

    if(move & MFLAGEP) {
        var epRemove;
        if(GameBoard.side == COLOURS.BLACK){
            epRemove = to+10;
        }
        else {
            epRemove = to-10;
        }
        RemovePieceFromGUI(epRemove);
    }
    else if (CAPTURED(move)){
        RemovePieceFromGUI(to);
    }

    //remove piece
    RemovePieceFromGUI(from);
    pce = GameBoard.pieces[from];
    //add piece to new destination
    AddPieceToGUI(to, pce);

    if(move & MFLAGCA){
        switch(to){
            case SQUARES.G1: RemovePieceFromGUI(SQUARES.H1); AddPieceToGUI(SQUARES.F1, PIECES.wR); break;
            case SQUARES.C1: RemovePieceFromGUI(SQUARES.A1); AddPieceToGUI(SQUARES.D1, PIECES.wR); break;
            case SQUARES.G8: RemovePieceFromGUI(SQUARES.H8); AddPieceToGUI(SQUARES.F8, PIECES.bR); break;
            case SQUARES.C8: RemovePieceFromGUI(SQUARES.A8); AddPieceToGUI(SQUARES.D8, PIECES.bR); break;
        }
    }
    else if(PROMOTED(move)){
        RemovePromotionPieceFromGUI(to, pce);
        AddPieceToGUI(to, PROMOTED(move));
    }
    
}

function TakeMoveGUI(){
    var move = GameBoard.history[GameBoard.hisPly -1].move;
    var to = TOSQ(move);
    var from = FROMSQ(move);

    if( (MFLAGEP & move) != 0) {
        if(GameBoard.side == COLOURS.BLACK) {
            AddPieceToGUI(to-10, PIECES.bP);
        } else {
            AddPieceToGUI(to+10, PIECES.wP);
        }
    } else if( (MFLAGCA & move) != 0) {
        switch(to) {
        	case SQUARES.C1: MoveGUIPiece(MOVE(SQUARES.D1, SQUARES.A1, 0, 0, 0)); break;
            case SQUARES.C8: MoveGUIPiece(MOVE(SQUARES.D8, SQUARES.A8, 0, 0, 0)); break;
            case SQUARES.G1: MoveGUIPiece(MOVE(SQUARES.F1, SQUARES.H1, 0, 0, 0)); break;
            case SQUARES.G8: MoveGUIPiece(MOVE(SQUARES.F8, SQUARES.H8, 0, 0, 0)); break;
            default: break;
        }
    }

    MoveGUIPiece(MOVE(to, from, 0, 0, 0));
    
    var captured = CAPTURED(move);
    if(captured != PIECES.EMPTY) {      
        AddPieceToGUI(to, captured);
    }

    TakeMove();
    
    if(PROMOTED(move) != PIECES.EMPTY) {  
        RemovePromotionPieceFromGUI(from, PROMOTED(move));  
        AddPieceToGUI(from, (PieceCol[PROMOTED(move)] == COLOURS.WHITE ? PIECES.wP : PIECES.bP));
    }

    GenerateMoves();
    GenerateLegalMoves();
}

function ResetBoardGUI(){
    NewGame(START_FEN);
}

function socket_handle(){
    socket.on('domove', function(data){
        MoveGUIPiece(data['move']);
        MakeMove(data['move']);
        if(GameBoard.side == COLOURS.WHITE){
            document.getElementById("whitetoken").style.visibility = "visible";
            document.getElementById("blacktoken").style.visibility = "hidden";
        }
        else {
            document.getElementById("whitetoken").style.visibility = "hideen";
            document.getElementById("blacktoken").style.visibility = "visible";
        }
        socket.emit('movedone', {'board':GenerateFen()});
        PrintBoard();
        GenerateMoves();
        GenerateLegalMoves();
    });

    socket.on('setPlayer', function(data){
        player = data['player'];
        playerTitle = document.getElementById("playerTitle");
        if(player == 1){
            playerTitleName = "YOU ARE BLACK";
        }
        else if(player == 0){
            playerTitleName = "YOU ARE WHITE";
        }
        else{
            playerTitleName = "YOU ARE A SPECTATOR";
        }
        playerTitleText = document.createTextNode(playerTitleName);
        playerTitle.appendChild(playerTitleText);
    });

    socket.on('setBoard', function(data){
        NewGame(data['fen']);
    });

    socket.on('close', function(data){
        window.location.href = "/";
    });
}