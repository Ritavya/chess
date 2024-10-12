async function sendMove(newPosition,turn){
    // console.log("hi from sendMove")
    const url="http://localhost:3210/move";
    // update the game state
    const data = {
        game : "abcd",
        state : newPosition,
        whiteTurn : !turn
    }
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        console.log('Move sent successfully  -  sendMove');
    }
    else console.log('some error occured');
}

export default sendMove;