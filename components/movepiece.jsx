import sendMove from "./sendmove";

function movePiece(lastClicked,id,position,setPosition,turn){
    const newPosition = position;
    // console.log(typeof(position));
    // console.log((position));
    newPosition[id]=position[lastClicked];
    newPosition[lastClicked]=".";
    setPosition(newPosition);
    sendMove(newPosition,turn);
}
export default movePiece;