import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './square.css'
import highlightValid from './highlight'
import movePiece from './movepiece'
import resetGame from './resetgame';

const Squares = ({highlighted,useHighlighted,position,setPosition,lastClicked,useLastClicked,turn,useTurn,side})=>{
    let final=[]
    for(let i=0;i<8;i++){
        let row=[]
        for(let j=0;j<8;j++){
        const id=(8*i)+j;
            row.push(<button 
                key={id}
                className={highlighted[id] ? 'high' : ((id%2)+(id-(id%8))/8)%2 ? "square1":"square2"}
                onClick={() => {
                    if (highlighted[id]) {
                        movePiece(lastClicked,id,position,setPosition,turn);//will be a backend call
                        useHighlighted( Array(64).fill(false));
                        useTurn(!turn);//include this in the movePiece func later 
                    } else if(side==turn) {
                        useLastClicked(id);
                        highlightValid( useHighlighted, position, id,turn);
                    }
                }}
            >
                {position[id]}
            </button>
            )
        }
        final.push(<div key={i}>{row}</div>)
    }
    return (<>
        {final}
    </>)
}
const fetchApi = async (setPosition,useTurn)=>{
    const url="http://localhost:3210/get";
    const response = await fetch(url,{
        method:'GET'
    });
    if (response.ok) {
        const abc=await response.json()
        setPosition(abc.state);
        useTurn(abc.whiteTurn)
        console.log(abc);
    }
    else console.log('some error occured');
}

function Board(){
    const [lastClicked,useLastClicked]=useState(-1)
    const [check,useCheck]=useState(false);
    const [highlighted,useHighlighted]=useState(Array(64).fill(false));
    const [turn,useTurn]=useState(true);
    const [side,useSide]=useState(true);
    const [position,setPosition]=useState([
        "♜","♞","♝","♛","♚","♝","♞","♜",
        "♟","♟","♟","♟","♟","♟","♟","♟",
        ".",".",".",".",".",".",".",".",
        ".",".",".",".",".",".",".",".",
        ".",".",".",".",".",".",".",".",
        ".",".",".",".",".",".",".",".",
        "♙","♙","♙","♙","♙","♙","♙","♙",
        "♖","♘","♗","♕","♔","♗","♘","♖"]);
    
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            fetchApi(setPosition, useTurn);
        }, 100);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (<div>
        <Squares highlighted={highlighted} useHighlighted={useHighlighted} position={position} setPosition={setPosition}
        lastClicked={lastClicked} useLastClicked={useLastClicked} turn={turn} useTurn={useTurn} check={check} useCheck={useCheck} side={side}
        />
        <button onClick={()=> useSide(!side)}>Switch side</button>
        <p> turn : {turn ? "yes":"no"}</p>
        <p>last click : {lastClicked}</p>
        <p>your side {side?"white":"black"}</p>
        <button onClick={()=> resetGame(setPosition)}>Reset Game</button>
    </div>)
}

export default Board;