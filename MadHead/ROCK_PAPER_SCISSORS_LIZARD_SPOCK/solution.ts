/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
interface IPlayerSign{
    [playerID:number]:string
}

interface IPlayerWinList{
    [playerID:number]:number[]
}


let playerList = []
const signMap:IPlayerSign = {}
const winMap:IPlayerWinList = {}
// @ts-ignore
const N: number = parseInt(readline());
let winList = []
for (let i = 0; i < N; i++) {
    // @ts-ignore
    var inputs: string[] = readline().split(' ');
    const NUMPLAYER: number = parseInt(inputs[0]);
    const SIGNPLAYER: string = inputs[1];
    playerList.push(NUMPLAYER)
    signMap[NUMPLAYER]=SIGNPLAYER
    winMap[NUMPLAYER] = []
}

while(playerList.length != 1){
    console.error('Debug messages...',playerList );
    for(let i = 0; i<playerList.length;i=i+2){
        console.error('Debug messages...',playerList[i],"sign",  signMap[playerList[i]]);
        console.error('Debug messages...',playerList[i+1],"Sign", signMap[playerList[i+1]] );
        const player1Sign = signMap[playerList[i]]
        const player2Sign = signMap[playerList[i+1]]

        if(player1Sign == "R"){
            if(player2Sign =="L"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="C"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="P"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }else if(player2Sign =="S"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }
        }
        if(player1Sign == "P"){
            if(player2Sign =="R"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="S"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="C"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }else if(player2Sign =="L"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }
        }
        if(player1Sign == "C"){
            if(player2Sign =="P"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="L"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="S"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }else if(player2Sign =="R"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }
        }
        if(player1Sign == "L"){
            if(player2Sign =="S"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="P"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="R"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }else if(player2Sign =="C"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }
        }
        if(player1Sign == "S"){
            if(player2Sign =="C"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="R"){
                winList.push(playerList[i])
                winMap[playerList[i]].push(playerList[i+1])
            }else if(player2Sign =="L"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }else if(player2Sign =="P"){
                winList.push(playerList[i+1])
                winMap[playerList[i+1]].push(playerList[i])
            }
        }
        if(winList.includes(playerList[i]) == false && winList.includes(playerList[i+1]) == false){
            const winner = playerList[i] < playerList[i+1]? playerList[i]: playerList[i+1]
            winList.push(winner)
            winMap[winner].push(playerList[i] > playerList[i+1]? playerList[i]: playerList[i+1])
        }
    }

    playerList = winList
    winList = []
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');
console.log(playerList[0]);
console.log(winMap[playerList[0]].join(" "));
