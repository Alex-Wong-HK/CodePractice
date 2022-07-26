/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
let ans:boolean = true
let table =[]
for (let i = 0; i < 9; i++) {
    var inputs: string[] = readline().split(' ');
    let row = []
    for (let j = 0; j < 9; j++) {
        const n: number = parseInt(inputs[j]);
        if(row.includes(n)){
            ans = false
            break
        }else{
            row.push(n)
            if(j==8){
                table.push(row)
            }
        }
    }
}
if(ans == true ){
    for(let i =0;i<9;i++){
        let col = []
        for(let j=0;j<9;j++){
            if(col.includes(table[j][i])){
                ans = false
                break;
            }else{
                col.push(table[j][i])
            }
            console.error(col)
        }
    }
}
function checkgrid(){
    for(let i =0;i<9;i++){
        if(table[i].length!=9){
            return false
        }
    }
    return true
}

if(table.length==9){
    if(checkgrid()){
        console.log(ans);
    }else{
        console.log(false);
    }
}else{
    console.log(false);
}
