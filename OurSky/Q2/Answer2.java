public class Answer2 {
    private final int cacheMax;
    private final LinkedList<CacheNode> dataList;
    private final Map<String,Integer> cache;

    public Answer2(int cacheMax){
        this.cacheMax = cacheMax;
        this.dataList = new LinkedList<>();
        this.cache = new HashMap<>();
    }
    public int get(String key){
        if(cache.containsKey(key)){
            int index = cache.get(key);
            CacheNode node = dataList.get(index);
            node.lastAccessTime = System.currentTimeMillis();
            node.weight = calWeight(node.weight, node.currentTime, node.lastAccessTime);
            return node.value;
        }
        return -1;
    }

    /* If lastAccessTime, currentTime only has 1ms diff, Math.log() will produce 0.0,
    when weight/0 will happen undefined result, So i decide that when
    */
    public double calWeight(double weight, long currentTime, long lastAccessTime){
        double ln = Math.log(lastAccessTime - currentTime);
        if(lastAccessTime == currentTime || ln == 0.0)
            return weight/-100;
        else {
            return weight / ln;
        }
    }

    public void put(String Key,int Value,long weight){
        long currentTime = System.currentTimeMillis();
        CacheNode node = new CacheNode(currentTime, weight, Value, Key);
        node.weight = calWeight(node.weight, node.currentTime, node.lastAccessTime);
        if(dataList.size() == cacheMax){
            Collections.sort(dataList, new Comparator<CacheNode>() {
                @Override
                public int compare(CacheNode o1, CacheNode o2) {
                    return (int)( o2.weight -  o1.weight );
                }
            });
            cache.remove(dataList.removeLast().key);
        }
        dataList.add(node);
        cache.put(Key,dataList.size()-1);
    }

    public static class CacheNode{
        private double weight;
        private long currentTime ;
        private long lastAccessTime;
        private int value;
        private String key;

        public CacheNode(long currentTime,double weight,int value,String key){
            this.currentTime = currentTime;
            this.lastAccessTime = currentTime;
            this.weight = weight;
            this.value = value;
            this.key = key;
        }
    }
}
