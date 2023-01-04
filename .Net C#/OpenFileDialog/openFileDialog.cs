public static string selectFile(){
    var filepath = ''
    OpenFileDialog openFile = new OpenFileDialog();
    openFile.Filiter = "All Files (*.*) | *.*| Excel Files|*.xls;*.xlsx;*.xlsm";
    openFile.FilterIndex = 1;
    openFile.Multiselect = true;
    if(openFile.ShowDialog() == DialogResult.OK){
        filepath = openFile.FileName;
    }
    return filepath
}

