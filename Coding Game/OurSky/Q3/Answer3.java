public class Answer3 {
    public double recur(int n, Double cur) throws Exception {

        while(n!=2){
            System.out.println("n "+n+" cur "+cur);
            if(cur == null){
                cur = 0.0;
            }
            if(n<2){
                throw new Exception("Invalid input");
            }

            cur = cur + 1.0 / (n * (n -1));
            n--;
            if(n == 2){
                return 1.0/n+cur;
            }
        }
        return 0;
    }

    public double recurAns(int n, Double cur) throws Exception {
        System.out.println("n "+n+" cur "+cur);

        if(cur == null){
            cur = 0.0;
        }
        if(n<2){
            throw new Exception("Invalid input");
        }
        if(n == 2){
            return 1.0/n+cur;
        }

        return  recurAns(n-1,cur + 1.0 / (n * (n -1)));
    }

}
