async function resetGame(setPosition){
    // console.log("hi from resetGame")
    const url="http://localhost:3210/move";
    // update the game state
    const data = {
        game : "abcd",
        state :[
            "♜","♞","♝","♛","♚","♝","♞","♜",
            "♟","♟","♟","♟","♟","♟","♟","♟",
            ".",".",".",".",".",".",".",".",
            ".",".",".",".",".",".",".",".",
            ".",".",".",".",".",".",".",".",
            ".",".",".",".",".",".",".",".",
            "♙","♙","♙","♙","♙","♙","♙","♙",
            "♖","♘","♗","♕","♔","♗","♘","♖"]
        ,
        whiteTurn : true
    }
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        console.log('Move sent successfully  -  resetGame');
    }
    else console.log('some error occured');
}

export default resetGame;