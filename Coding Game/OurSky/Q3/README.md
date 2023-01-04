Please understand the following program

    function recur(n, cur){
        if(!cur){
            cur = 0
        } 
        if( n < 2 ){
            throw new Error('Invalid Input');
        }
        if(n === 2){
            return 1 / n +cur ;
        }
        return recur(n-1, cur+1/n(n*(n-1)));
    }

Write a program doing the same calculation without recursion.
