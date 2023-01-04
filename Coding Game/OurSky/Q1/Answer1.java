public class Answer1 {
    public boolean isSubset(String[] set1, String[] set2){
        // let a = set1 input size
        // let b = set2 input size
        Set<String> index = new HashSet<>();

        // O(a)
        // Store set1 to HashSet
        Collections.addAll(index, set1);

        // O(b)
        for(String character: set2){
            // Best Case scenario, set2 first character is not appear at index. O(a+1) = O(n)
            // Worse Case scenario, set2 is a subset of set1. O(a+b) = O(n)
            if(!index.contains(character)){
                return false;
            }
        }

        // Complexity = O(n)
        return true;
    }
}
