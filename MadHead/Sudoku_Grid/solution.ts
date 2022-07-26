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
    console.error("row")
    for(let i =0;i<9;i++){
        let col = []
        for(let j=0;j<9;j++){
            if(col.includes(table[j][i])){
                ans = false
                break;
            }else{
                col.push(table[j][i])
            }
        }
    }
}
if(ans == true ){
    console.error("grid")
    for(let i =0;i<9;i=i+3){
        for(let j=0;j<9;j=j+3){
            let grid = []
            grid.push(table[i][j])
            if(grid.includes(table[i][j+1])){
                console.error("i j+1")
                ans = false
                break;
            }else{
                grid.push(table[i][j+1])
            }

            if(grid.includes(table[i][j+2])){
                console.error("i j+2")
                ans = false
                break;
            }else{
                grid.push(table[i][j+2])
            }

            if(grid.includes(table[i+1][j])){
                console.error("i+1 j")
                ans = false
                break;
            }else{
                grid.push(table[i+1][j])
            }

            if(grid.includes(table[i+1][j+1])){
                console.error("i+1 j+1")
                ans = false
                break;
            }else{
                grid.push(table[i+1][j+1])
            }
            if(grid.includes(table[i+1][j+2])){
                console.error("i+1 j+2")
                ans = false
                break;
            }else{
                grid.push(table[i+1][j+2])
            }

            if(grid.includes(table[i+2][j])){
                console.error("i+2 j")
                ans = false
                break;
            }else{
                grid.push(table[i+2][j])
            }

            if(grid.includes(table[i+2][j+1])){
                console.error("i+2 j+1")
                ans = false
                break;
            }else{
                grid.push(table[i+2][j+1])
            }

            if(grid.includes(table[i+2][j+2])){
                console.error("i+2 j+2")
                ans = false
                break;
            }else{
                grid.push(table[i+2][j+2])
            }
        }
    }
}

console.log(ans);

