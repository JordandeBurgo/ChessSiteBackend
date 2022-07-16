var PIECES =  { EMPTY : 0, wP : 1, wN : 2, wB : 3,wR : 4, wQ : 5, wK : 6, 
    bP : 7, bN : 8, bB : 9, bR : 10, bQ : 11, bK : 12  };
    
var BRD_SQ_NUM = 120;

var FILES =  { FILE_A:0, FILE_B:1, FILE_C:2, FILE_D:3, 
FILE_E:4, FILE_F:5, FILE_G:6, FILE_H:7, FILE_NONE:8 };

var RANKS =  { RANK_1:0, RANK_2:1, RANK_3:2, RANK_4:3, 
RANK_5:4, RANK_6:5, RANK_7:6, RANK_8:7, RANK_NONE:8 };

var COLOURS = { WHITE:0, BLACK:1, BOTH:2 };

var CASTLEBIT = { WKCA : 1, WQCA : 2, BKCA : 4, BQCA : 8 };

var SQUARES = {
    A1:21, B1:22, C1:23, D1:24, E1:25, F1:26, G1:27, H1:28,  
    A8:91, B8:92, C8:93, D8:94, E8:95, F8:96, G8:97, H8:98, 
    NO_SQ:99, OFFBOARD:100
};

var BOOL = { FALSE:0, TRUE:1 };

var MAXGAMEMOVES = 2048;
var MAXPOSITIONMOVES = 256;
var MAXDEPTH = 64;

var FilesBrd = new Array(BRD_SQ_NUM);
var RanksBrd = new Array(BRD_SQ_NUM);

var START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

var PceChar = ".PNBRQKpnbrqk";
var SideChar = "wb-";
var RankChar = "12345678";
var FileChar = "abcdefgh";

function FR2SQ(f,r) {
    return ( (21 + (f) ) + ( (r) * 10 ) );
}

var PieceBig = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
var PieceMaj = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
var PieceMin = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
var PieceVal= [ 0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000  ];
var PieceCol = [ COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE,
COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK ];

var PiecePawn = [ BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];	
var PieceKnight = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
var PieceKing = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE ];
var PieceRookQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];
var PieceBishopQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE ];
var PieceSlides = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];

var KnDir = [ -8, -19,	-21, -12, 8, 19, 21, 12 ];
var RkDir = [ -1, -10,	1, 10 ];
var BiDir = [ -9, -11, 11, 9 ];
var KiDir = [ -1, -10,	1, 10, -9, -11, 11, 9 ];

var DirNum = [ 0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8 ];
var PceDir = [ 0, 0, KnDir, BiDir, RkDir, KiDir, KiDir, 0, KnDir, BiDir, RkDir, KiDir, KiDir ];
var LoopNonSlidePce = [ PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK, 0 ];
var LoopNonSlideIndex = [ 0, 3 ];
var LoopSlidePce = [ PIECES.wB, PIECES.wR, PIECES.wQ, 0, PIECES.bB, PIECES.bR, PIECES.bQ, 0 ];
var LoopSlideIndex = [ 0, 4];

var PieceKeys = new Array(14 * 120);
var SideKey;
var CastleKeys = new Array(16);

var Sq120ToSq64 = new Array(BRD_SQ_NUM);
var Sq64ToSq120 = new Array(64);

var Mirror64 = [
	56	,	57	,	58	,	59	,	60	,	61	,	62	,	63	,
	48	,	49	,	50	,	51	,	52	,	53	,	54	,	55	,
	40	,	41	,	42	,	43	,	44	,	45	,	46	,	47	,
	32	,	33	,	34	,	35	,	36	,	37	,	38	,	39	,
	24	,	25	,	26	,	27	,	28	,	29	,	30	,	31	,
	16	,	17	,	18	,	19	,	20	,	21	,	22	,	23	,
	8	,	9	,	10	,	11	,	12	,	13	,	14	,	15	,
	0	,	1	,	2	,	3	,	4	,	5	,	6	,	7
];

var Mirror = { A1:'H8', A2:'H7', A3:'H6', A4:'H5', A5:'H4', A6:'H3', A7:'H2', A8:'H1',
			   B1:'G8', B2:'G7', B3:'G6', B4:'G5', B5:'G4', B6:'G3', B7:'G2', B8:'G1',
			   C1:'F8', C2:'F7', C3:'F6', C4:'F5', C5:'F4', C6:'F3', C7:'F2', C8:'F1',
			   D1:'E8', D2:'E7', D3:'E6', D4:'E5', D5:'E4', D6:'E3', D7:'E2', D8:'E1',
			   E1:'D8', E2:'D7', E3:'D6', E4:'D5', E5:'D4', E6:'D3', E7:'D2', E8:'D1',
			   F1:'C8', F2:'C7', F3:'C6', F4:'C5', F5:'C4', F6:'C3', F7:'C2', F8:'C1',
			   G1:'B8', G2:'B7', G3:'B6', G4:'B5', G5:'B4', G6:'B3', G7:'B2', G8:'B1',
			   H1:'A8', H2:'A7', H3:'A6', H4:'A5', H5:'A4', H6:'A3', H7:'A2', H8:'A1' };

function RAND_32(){
    return (Math.floor((Math.random()*255)+1) << 23) | (Math.floor((Math.random()*255)+1) << 16)
         | (Math.floor((Math.random()*255)+1) << 8) | Math.floor((Math.random()*255)+1);
}

function SQ64(sq120) { 
    return Sq120ToSq64[(sq120)];
}

function SQ120(sq64) {
    return Sq64ToSq120[(sq64)];
}

function MIRROR64(sq) {
	return Mirror64[sq];
}

function PCEINDEX(pce, pceNum) {
    return (pce * 10 + pceNum);
}

var Kings = [PIECES.wK, PIECES.bK];
var CastlePerm = [
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 13, 15, 15, 15, 12, 15, 15, 14, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15,  7, 15, 15, 15,  3, 15, 15, 11, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15
];

/*

BITMAP TIME

0000 0000 0000 0000 0000 0000 0000 -> 32 bits

Our squares are all 21 -> 98
(This is to allow for a boundary of offboard moves without getting indexing errors, the full array goes from 0 to 120)
Therefore we can cover all of our moves within 7 bits

                           7    F
0000 0000 0000 0000 0000 0111 1111 -> From 0x7F
We can use the first 7 bits to store where the move is from

  0010 1100 0000 1111 0000 0100 1011 -> some move, d
& 0000 0000 0000 0000 0000 0111 1111 -> 0x7F
= 0000 0000 0000 0000 0000 0100 1011 -> the from square

fromSquare = d & 0x7F
0x7F & our from square will return only the first 7 bits, so we can obtain our from square

0000 0000 0000 0000 0000 0111 1111 -> From 0x7F


Now what if we want the square we are moving to?
Well! This can be stored within the next 7 bits
So all we want to do is shift the bits to the right, and then do an and with our Ox7F!

0000 0000 0000 0011 1111 1000 0000 -> To >> 7, 0x7F

For the captures piece type, we know that our piece ids go up to 12 for the black king - so we can store this in 4 bits!
So we use the next 4 bits to store the captures piece, and so if we want to know the captured piece we just shift to the right by 14,
and do an & with F (1111). (14 because 7 bits used for from, and 7 bits used for to)

0000 0000 0011 1100 0000 0000 0000 -> Captures >> 14, 0xF


En passant can be covered by a single bit, was it an enpassant move yes or no
Now we dont need to shift to get this information, we can just use 0x40000
(1000000000000000000) to perform an and (with the 1 being in the 19th place because
that is where our en passant bit is stored)

0000 0000 0100 0000 0000 0000 0000 -> EP 0x40000


The same thing can be done with where it was a pawns first move! This time though
we will need to use 0x80000 (1000000000000000000) so that 1 is in the right place
(the 20th place)

0000 0000 1000 0000 0000 0000 0000 -> Pawn Start 0x80000


We can then store a promoted piece with 4 bits too! So this is just like storing a cpatured piece
but this time because we already used 20 bits, we will have to shift to the right by 20, and as before
perform an and with 0xF (1111)

0000 1111 0000 0000 0000 0000 0000 -> Promoted Piece >> 20, 0xF


Lastly we have castling, which is just 1 bit again, yes or no, so we can just perform an and
with 0x100000 (1000000000000000000000000) so that we get the correct bit back

0001 0000 0000 0000 0000 0000 0000 -> Castle 0x1000000
*/


function FROMSQ(m) { return (m & 0x7F); }
function TOSQ(m) { return ( (m >> 7) & 0x7F); }
function CAPTURED(m) { return ( (m >> 14) & 0xF); }
function PROMOTED(m) { return ( (m >> 20) & 0xF); }

var MFLAGEP = 0x40000;
var MFLAGPS = 0x80000;
var MFLAGCA = 0x1000000;

var MFLAGCAP = 0x7C000;
var MFLAGPROM = 0xF00000;

var NOMOVE = 0;

function SQOFFBOARD(sq) {
    if(FilesBrd[sq]==SQUARES.OFFBOARD) return BOOL.TRUE;
    return BOOL.FALSE;	
}

function PrSq(sq) {
	return (FileChar[FilesBrd[sq]] + RankChar[RanksBrd[sq]]);
}

function PrMove(move) {	
	var MvStr;
	
	var ff = FilesBrd[FROMSQ(move)];
	var rf = RanksBrd[FROMSQ(move)];
	var ft = FilesBrd[TOSQ(move)];
	var rt = RanksBrd[TOSQ(move)];
	
	MvStr = FileChar[ff] + RankChar[rf] + FileChar[ft] + RankChar[rt];
	
	var promoted = PROMOTED(move);
	//console.log('promoted = ' + promoted);
	if(promoted != PIECES.EMPTY) {
		var pchar = 'q';
		if(PieceKnight[promoted] == BOOL.TRUE) {
			pchar = 'n';
		} else if(PieceRookQueen[promoted] == BOOL.TRUE && PieceBishopQueen[promoted] == BOOL.FALSE)  {
			pchar = 'r';
		} else if(PieceRookQueen[promoted] == BOOL.FALSE && PieceBishopQueen[promoted] == BOOL.TRUE)   {
			pchar = 'b';
		}
		MvStr += pchar;
	}
	return MvStr;
}

function PrintMoveList() {
	var index;
	var move;
	var num = 1;
	console.log('MoveList:');

	for(index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply+1]; ++index) {
		move = GameBoard.moveList[index];
		console.log('Move:' + num + ':' + PrMove(move));
		num++;
	}
}

function HASH_PCE(pce, sq) {
	GameBoard.posKey ^= PieceKeys[(pce * 120) + sq];
}

function HASH_CA() { GameBoard.posKey ^= CastleKeys[GameBoard.castlePerm]; }
function HASH_SIDE() { GameBoard.posKey ^= SideKey; }
function HASH_EP() { GameBoard.posKey ^= PieceKeys[GameBoard.enPas]; }

var UserMove = {};
UserMove.from = SQUARES.NO_SQ;
UserMove.to = SQUARES.NO_SQ;














































