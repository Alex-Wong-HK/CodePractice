void changeColor(){
    foreach (DataGridViewRow row in dataGridView1.Rows)
    {
        if (row.Cells["Active"].Value.Equals(true))
        {
            row.DefaultCellStyle.BackColor = Color.Green;
        }
        else
        {
            row.DefaultCellStyle.BackColor = Color.Red;
        }
    }
}
