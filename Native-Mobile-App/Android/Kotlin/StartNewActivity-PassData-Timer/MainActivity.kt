class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Time : (20000/1000)s
        val counter = object:CountDownTimer(20000,1000){
            override fun onTick(p0: Long) {
                main_textview.setText((p0/1000).toString())
            }

            override fun onFinish() {
                this@MainActivity.startActivity(Intent(this@MainActivity,TargetActivity::class.java).apply{
                    putExtra("name","value")
                })
            }
        }
        counter.start()
}

