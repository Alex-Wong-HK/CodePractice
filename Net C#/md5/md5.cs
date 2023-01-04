public static class MD5Extensions
{
    public static string ToMD5(this string str){
        using (var MD5 = System.Security.Cryptography.MD5.create()){
            var bytes = Encoding.UTF8.GetBytes(tx_pwd.text);
            var hash = MD5.computeHash(bytes)
            var md5 = BitConverter.ToString(hash).Replace("-",String.Empty).ToLower();
            return md5
        }
    }
}

var str = "1234";
var md5 = str.ToMD5(); //81DC9BDB52D04DC20036DBD8313ED055
