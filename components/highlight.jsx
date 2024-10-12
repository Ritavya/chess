import kingSafe from "./kingsafe";

function isValid(x,y){
    return (x>=0 && x<8) && (y>=0 && y<8)
}

function  highlightValid(setHighlighted,position,id,whiteTurn){
    var newHighlighted = Array(64).fill(false);
    var team1=["♟","♞","♝","♜","♛","♚"];
    var team2=["♙","♘","♗","♖","♕","♔"];

    // is your move?
    if((whiteTurn && team2.includes(position[id]))==false && (!whiteTurn && team1.includes(position[id]))==false){
        setHighlighted(newHighlighted);
        return ;
    }

    // pawn
    if(position[id]=="♟"){
        newHighlighted=highlightPawnBlack(newHighlighted,id,position,team1,team2);
        for(let i=0;i<64;i++){
            if(newHighlighted[i]){
                const newPosition = [...position];
                newPosition[i]=position[id];
                newPosition[id]=".";
                newHighlighted[i]=kingSafe(whiteTurn,id,newPosition,team1,team2);
            }
        }
    }
    if(position[id]=="♙"){
        newHighlighted=highlightPawnWhite(newHighlighted,id,position,team1,team2);
        for(let i=0;i<64;i++){
            if(newHighlighted[i]){
                const newPosition = [...position];
                newPosition[i]=position[id];
                newPosition[id]=".";
                newHighlighted[i]=kingSafe(whiteTurn,id,newPosition,team1,team2);
            }
        }
    }

    //knight
    if(position[id]=="♞" || position[id]=="♘"){
       newHighlighted=highlightKnight(newHighlighted,id,position,team1,team2);
        for(let i=0;i<64;i++){
            if(newHighlighted[i]){
                const newPosition = [...position];
                newPosition[i]=position[id];
                newPosition[id]=".";
                newHighlighted[i]=kingSafe(whiteTurn,id,newPosition,team1,team2);
            }
        }
    }

    //bishop logic
    if(position[id]=="♝" || position[id]=="♗"){
        newHighlighted=highlightBishop(newHighlighted,id,position,team1,team2);
        for(let i=0;i<64;i++){
            if(newHighlighted[i]){
                const newPosition = [...position];
                newPosition[i]=position[id];
                newPosition[id]=".";
                newHighlighted[i]=kingSafe(whiteTurn,id,newPosition,team1,team2);
            }
        }
    }

    //rook
    if(position[id]=="♜" || position[id]=="♖"){
        newHighlighted=highlightRook(newHighlighted,id,position,team1,team2);
        for(let i=0;i<64;i++){
            if(newHighlighted[i]){
                const newPosition = [...position];
                newPosition[i]=position[id];
                newPosition[id]=".";
                newHighlighted[i]=kingSafe(whiteTurn,id,newPosition,team1,team2);
            }
        }
    }

    // queen
    if(position[id]=="♛" || position[id]=="♕"){
        newHighlighted=highlightQueen(newHighlighted,id,position,team1,team2);
        for(let i=0;i<64;i++){
            if(newHighlighted[i]){
                const newPosition = [...position];
                newPosition[i]=position[id];
                newPosition[id]=".";
                newHighlighted[i]=kingSafe(whiteTurn,id,newPosition,team1,team2);
            }
        }
    }

    // king
    if(position[id]=="♚" || position[id]=="♔"){
        newHighlighted=highlightKing(newHighlighted,id,position,team1,team2);
        for(let i=0;i<64;i++){
            if(newHighlighted[i]){
                const newPosition = [...position];
                newPosition[i]=position[id];
                newPosition[id]=".";
                newHighlighted[i]=kingSafe(whiteTurn,id,newPosition,team1,team2);
            }
        }
    }
    setHighlighted(newHighlighted);
}

export default highlightValid;


// PAWN1
export function highlightPawnWhite(newHighlighted,id,position,team1,team2){
    const x=((id-(id%8))/8);
    const y=(id%8);
    if(position[id-8]=="."){
        newHighlighted[id-8]=true;
        if(id>=48 && id<=55 && position[id-16]=="."){newHighlighted[id-16]=true}
    }
    if(isValid(x-1,y+1) && team1.includes(position[id-7])==true){newHighlighted[id-7]=true;}
    if(isValid(x-1,y-1) && team1.includes(position[id-9])==true){newHighlighted[id-9]=true;}
    return newHighlighted;
}

// PAWN2
export function highlightPawnBlack(newHighlighted,id,position,team1,team2){
    const x=((id-(id%8))/8);
    const y=(id%8);
    if(position[id+8]=="."){
        newHighlighted[id+8]=true;
        if(id>=8 && id<=15 && position[id+16]=="."){newHighlighted[id+16]=true}
    }
    if(isValid(x+1,y+1) && team2.includes(position[id+9])==true){newHighlighted[id+9]=true;}
    if(isValid(x+1,y-1) && team2.includes(position[id+7])==true){newHighlighted[id+7]=true;}
    return newHighlighted;
}

// // KNIGHT
export function highlightKnight(newHighlighted,id,position,team1,team2){
    const x=((id-(id%8))/8)
    const y=(id%8)
    const myTeam = position[id]=="♞"? team1: team2;
    if( isValid(x+1,y+2) && !myTeam.includes(position[id+2+8 ]) ) newHighlighted[id+2+8 ]=true;
    if( isValid(x+1,y-2) && !myTeam.includes(position[id-2+8 ]) ) newHighlighted[id-2+8 ]=true;
    if( isValid(x-1,y+2) && !myTeam.includes(position[id+2-8 ]) ) newHighlighted[id+2-8 ]=true;
    if( isValid(x-1,y-2) && !myTeam.includes(position[id-2-8 ]) ) newHighlighted[id-2-8 ]=true;
    if( isValid(x+2,y+1) && !myTeam.includes(position[id+1+16]) ) newHighlighted[id+1+16]=true;
    if( isValid(x+2,y-1) && !myTeam.includes(position[id-1+16]) ) newHighlighted[id-1+16]=true;
    if( isValid(x-2,y-1) && !myTeam.includes(position[id-1-16]) ) newHighlighted[id-1-16]=true;
    if( isValid(x-2,y+1) && !myTeam.includes(position[id+1-16]) ) newHighlighted[id+1-16]=true;
    return newHighlighted;
}

// // BISHOP
export function highlightBishop(newHighlighted,id,position,team1,team2){
    const x=(id-(id%8))/8;
    const y=(id%8);
    let i=1;let j=1;
    const myTeam = position[id]=="♝"? team1: team2;
    for(let a=-1;a<2;a=a+2){
        for(let b=-1;b<2;b=b+2){
            let i=a;let j=b;
            while(isValid(x+i,y+j) && position[((x+i)*8)+y+j]=="."){
                newHighlighted[((x+i)*8)+y+j]=true;
                i=i+a;
                j=j+b;
            }
            if(isValid(x+i,y+j) && !myTeam.includes(position[((x+i)*8)+y+j])) {newHighlighted[((x+i)*8)+y+j]=true;}
        }
    }
    return newHighlighted;
}

// // ROOK
export function highlightRook(newHighlighted,id,position,team1,team2){
    const x=(id-(id%8))/8;
    const y=(id%8);
    const myTeam = position[id]=="♜"? team1: team2;
    for(let a=-1;a<2;a=a+2){
        let i=a;
        while(isValid(x+i,y) && position[((x+i)*8)+y]=="."){
            newHighlighted[((x+i)*8)+y]=true;
            i=i+a;
        }
        if(isValid(x+i,y) && !myTeam.includes(position[((x+i)*8)+y])) {newHighlighted[((x+i)*8)+y]=true;}
    }
    for(let a=-1;a<2;a=a+2){
        let i=a;
        while(isValid(x,y+i) && position[(x*8)+y+i]=="."){
            newHighlighted[(x*8)+y+i]=true;
            i=i+a;
        }
        if(isValid(x,y+i) && !myTeam.includes(position[(x*8)+y+i])) {newHighlighted[(x*8)+y+i]=true;}
    }
    return newHighlighted
}

// // QUEEN
export function highlightQueen(newHighlighted,id,position,team1,team2){
    const x=(id-(id%8))/8;
    const y=(id%8);
    let i=1;let j=1;
    const myTeam = position[id]=="♛"? team1: team2;
    for(let a=-1;a<2;a=a+2){
        for(let b=-1;b<2;b=b+2){
            let i=a;let j=b;
            while(isValid(x+i,y+j) && position[((x+i)*8)+y+j]=="."){
                newHighlighted[((x+i)*8)+y+j]=true;
                i=i+a;
                j=j+b;
            }
            if(isValid(x+i,y+j) && !myTeam.includes(position[((x+i)*8)+y+j])) {newHighlighted[((x+i)*8)+y+j]=true;}
        }
    }
    for(let a=-1;a<2;a=a+2){
        let i=a;
        while(isValid(x+i,y) && position[((x+i)*8)+y]=="."){
            newHighlighted[((x+i)*8)+y]=true;
            i=i+a;
        }
        if(isValid(x+i,y) && !myTeam.includes(position[((x+i)*8)+y])) {newHighlighted[((x+i)*8)+y]=true;}
    }
    for(let a=-1;a<2;a=a+2){
        let i=a;
        while(isValid(x,y+i) && position[(x*8)+y+i]=="."){
            newHighlighted[(x*8)+y+i]=true;
            i=i+a;
        }
        if(isValid(x,y+i) && !myTeam.includes(position[(x*8)+y+i])) {newHighlighted[(x*8)+y+i]=true;}
    }
    return newHighlighted;
}

// KING
export function highlightKing(newHighlighted,id,position,team1,team2){
    const x=(id-(id%8))/8;
    const y=(id%8);
    const myTeam = position[id]=="♚"? team1: team2;
    for(let i=-1;i<=1;i=i+1){
        for(let j=-1;j<=1;j=j+1){
            if(isValid(x+i,y+j) && !myTeam.includes(position[((x+i)*8)+y+j])){newHighlighted[((x+i)*8)+y+j]=true;}
        }
    }
    return newHighlighted;
}