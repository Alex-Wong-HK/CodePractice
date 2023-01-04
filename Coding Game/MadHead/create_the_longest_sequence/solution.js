/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const b = readline();
const bytesArray = b.split('');
let sequenceList = [];
let catchList = [];
let checking = false;
let ans = 0;
for(let i = 0; i< bytesArray.length;i++){
    catchList.push(bytesArray[i])

    if(bytesArray[i]=="1"){
        checking = true
    }else if(bytesArray[i]=="0" && checking==true){
        sequenceList.push(catchList)
        checking=false
        catchList = []
    }
    if(i+1 == bytesArray.length){
        sequenceList.push(catchList)
    }
}
for(let i = 0;i<sequenceList.length;i++){
    let count = 0
    let fristZero = true;

    for(let k = 0 ; k<sequenceList[i].length;k++){
        console.error(sequenceList[i][k])
        if(sequenceList[i][k]=="1"){
            count++;
        }
        if(sequenceList[i][k]=="0" && fristZero){
            count++;
            fristZero = false
        }
    }

    if(i+1 < sequenceList.length){
        if(sequenceList[i+1][0] != "0"){
            for(let j = 0 ; j<sequenceList[i+1].length;j++){
                if(sequenceList[i+1][j]=="1"){
                    count++;
                }
            }
        }
    }

    if(count > ans){
        ans = count
    }

}

if(ans == 0 && sequenceList.length!= 0){
    console.log(1);
}else{
    console.log(ans);
}



// Write an answer using console.log()
// To debug: console.error('Debug messages...');


