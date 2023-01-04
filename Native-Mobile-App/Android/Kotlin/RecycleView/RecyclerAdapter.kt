class RecyclerAdapter(context:Context):RecyclerView.Adapter<RecyclerAdapter.ViewHolder>(){
    private var title = arrayof("name1", "name2")
    private var text = arrayof("text1", "text2")

    override fun onCreateViewHolder(
            parent:ViewGroup,
            viewType: Int
    ){
        var v = LayoutInflater.from(parent.context)
                .inflate(R.layout.card, parent, false)

        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder:RecyclerAdapter.ViewHolder, position:Int){
        holder.name.text = title[position:Int]
        holder.text.text = title[position:Int]
    }

    override fun getItemCount():Int{
        return title.size
    }
    fun removeItem(index:number){
        title.removeAt(index)
        text.removeAt(index)
        notifyDataSetChanged()
    }

    fun addItem(title:String,text:String){
        title.add(title)
        text.add(text)
        notifyDataSetChanged()
    }

    inner class ViewHolder(itemview:View):RecyclerView.ViewHolder(itemView){

    }
}
