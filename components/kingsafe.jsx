import { highlightPawnBlack, highlightPawnWhite, highlightKnight, highlightBishop, highlightRook, highlightQueen, highlightKing } from "./highlight";

function kingSafe(whiteTurn,id,position,team1,team2){
    var newHighlighted = Array(64).fill(false);
    var myKingId=-1;
    if(whiteTurn){
        for(let i=0;i<64;i++){
            if(position[i]=="♔"){
                myKingId=i;
            }
            if(position[i]=="♟"){
                newHighlighted=highlightPawnBlack(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♞"){
               newHighlighted=highlightKnight(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♝"){
                newHighlighted=highlightBishop(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♜"){
                newHighlighted=highlightRook(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♛"){
                newHighlighted=highlightQueen(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♚"){
                newHighlighted=highlightKing(newHighlighted,i,position,team1,team2);
            }
        }
    }
    else{
        for(let i=0;i<64;i++){
            if(position[i]=="♚"){
                myKingId=i;
            }
            if(position[i]=="♙"){
                newHighlighted=highlightPawnWhite(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♘"){
                newHighlighted=highlightKnight(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♗"){
                newHighlighted=highlightBishop(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♖"){
                newHighlighted=highlightRook(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♕"){
                newHighlighted=highlightQueen(newHighlighted,i,position,team1,team2);
            }
            if(position[i]=="♔"){
                newHighlighted=highlightKing(newHighlighted,i,position,team1,team2);
            }
        }
    }
    return myKingId!== -1 && !newHighlighted[myKingId];
}
export default kingSafe;