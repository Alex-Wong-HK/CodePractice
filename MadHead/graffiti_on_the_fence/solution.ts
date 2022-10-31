/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


const L: number = parseInt(readline());
const N: number = parseInt(readline());

const filledFence = new Set();

for (let i = 0; i < N; i++) {
    var inputs: string[] = readline().split(' ');
    const st: number = parseInt(inputs[0]);
    const ed: number = parseInt(inputs[1]);
    for(let s = st; s<ed ; s++){
        filledFence.add(s)
    }
}

let start = 0;
let hasStart = false
let hasPrint = false
for(let i = 0; i<=L;i++){
    if(!filledFence.has(i)){
        if(hasStart==true){
            if(i==L){
                console.log(`${start} ${i}`);
                hasPrint = true

            }else{
                continue
            }

        }else{
            start = i
            hasStart = true
        }
    }else{
        if(hasStart){
            console.log(`${start} ${i}`);
            hasStart = false
            hasPrint = true
        }
    }
}

if(!hasPrint){
    console.log(`All painted`);
}

