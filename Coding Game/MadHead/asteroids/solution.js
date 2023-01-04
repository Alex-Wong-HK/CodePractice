/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

let inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
const T1 = parseInt(inputs[2]);
const T2 = parseInt(inputs[3]);
const T3 = parseInt(inputs[4]);
const firstPicture = [];
const secondPicture = [];
const thirdPicture = [];
const index_firstPicture = new Map();
const index_secondPicture = new Map();


//Create firstPicture and secondPicture
for (let i = 0; i < H; i++) {
    var inputs = readline().split(' ');
    const firstPictureRow = [];
    const secondPictureRow = [];
    const thirdPictureRow = [];
    const firstPictureChar = inputs[0].split("")
    const secondPictureChar = inputs[1].split("")
    for(let j=0;j<W;j++){
        firstPictureRow[j]=firstPictureChar[j]
        secondPictureRow[j]=secondPictureChar[j]
        thirdPictureRow[j] = '.'
    }
    firstPicture[i] = firstPictureRow
    secondPicture[i] = secondPictureRow
    thirdPicture[i] = thirdPictureRow
}

//Find asteroids at firstPicture and secondPicture
for (let i = 0; i < H; i++) {
    for(let j=0;j<W;j++){
        for (var k = 65; k <= 90; k++) {
            const char = String.fromCharCode(k)
            if(firstPicture[i][j]===char){
                index_firstPicture.set(char,{x:i,y:j})
            }
            if(secondPicture[i][j]===char){
                index_secondPicture.set(char,{x:i,y:j})
            }
        }
    }
}

//predict asteroid at Image 3
const multiplier = (T3-T2)/(T2-T1)
for (let [key, point] of index_firstPicture.entries()) {
    const p2Point = index_secondPicture.get(key)
    const new_x = Math.floor( p2Point.x + multiplier * (p2Point.x - point.x))
    const new_y = Math.floor( p2Point.y + multiplier * (p2Point.y - point.y))
    console.error("new_x",new_x)
    console.error("new_y",new_y)
    if(inRange(new_x,W) && inRange(new_y,H)){
        if( thirdPicture[new_x][new_y] === '.' || ( key.charCodeAt(0) < thirdPicture[new_x][new_y].charCodeAt(0) ))
            thirdPicture[new_x][new_y] = key
    }
}

//Submit Ans
for (let i = 0; i < H; i++) {
    let row = "";
    for(let j=0;j<W;j++){
        row = row+thirdPicture[i][j]
    }
    console.log(row)
}

function inRange(x,max){
    if(x>=0 && x<max){
        return true
    }else{
        return false
    }
}
