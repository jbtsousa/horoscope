Table table;
void setup() {
 // ArrayList<Word> connectors = new ArrayList<Word>();
  //connectors.add(new Word());

  table = loadTable("conceptnet.csv", "header");

  println(table.getRowCount() + " total rows in table");


  for (TableRow row : table.rows()) {
    String first_word = row.getString("first");
    String connector = row.getString("connect");
    String second_word = row.getString("second"); 
    
    //boolean found = false;
    
    //for (Word w : connectors) {
    //  if (connectors.contains(first_word)) {
    //    found= true;
    //  } else {
    //    found=false;
    //  }
    //}
   
  
   if (first_word == "rat"){
   
    println( "palavra é" + first_word);


    }
            
    
      //println(connector );
  }
  

}
//class Word {}
