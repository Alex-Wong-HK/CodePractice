// @ts-ignore
// @ts-ignore
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
    // @ts-ignore
const n: number = parseInt(readline());
const sortArray =[];
let isContradiction = false;
for (let i = 0; i < n; i++) {
    // @ts-ignore
    const row: string = readline();
    console.error('Debug messages...',row);
    const letter = row.split(" > ")
    if(!sortArray.includes(letter[0]) && !sortArray.includes(letter[1])){
        sortArray.push(letter[0])
        sortArray.push(letter[1])
    }else if(sortArray.includes(letter[0]) && sortArray.includes(letter[1])){
        if(sortArray.indexOf(letter[0]) > sortArray.indexOf(letter[1]) ){
            isContradiction = true;
            break;
        }
    }else{
        if(sortArray.includes(letter[0])){
            sortArray.splice(sortArray.indexOf(letter[0]), 0, letter[1]);
        }else{
            sortArray.splice(sortArray.indexOf(letter[1])+1, 0, letter[0]);
        }
    }
}
console.log(isContradiction?"contradiction":"consistent");


