class MainActivity : ComponentActivity() {
    private lateinit var recyclerView: RecyclerView
    private var layoutManager: RecyclerView.LayoutManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.view)
        recyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = RecyclerAdapter(this)

        val callback: ItemTouchHelper.SimpleCallback = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT) {
            override fun onMove(
                    recyclerView: RecyclerView,
                    viewHolder: RecyclerView.ViewHolder,
                    target: RecyclerView.ViewHolder
            ): Boolean {
                return false
            }

            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                when (direction) {
                    val position = viewHolder.adapterPosition
                    ItemTouchHelper.LEFT -> {
                        Toast.makeText(this@HomeActivity, "LEFT", Toast.LENGTH_LONG).show()
                        recyclerView.adapter.removeItem("new name","new value")
                    }
                    ItemTouchHelper.RIGHT -> {
                        Toast.makeText(this@HomeActivity, "Right -> Remove", Toast.LENGTH_LONG).show()
                        recyclerView.adapter.removeItem(position)
                    }
                }

            }

        }
        itemTouch = ItemTouchHelper(callback)
        itemTouch.attachToRecyclerView(recyclerView)
    }

}

