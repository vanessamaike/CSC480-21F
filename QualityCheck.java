
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * 
 */
public class QualityCheck {
    public void QC(String path) throws IOException{
       File pdfFile = new File(path);  
       PDDocument document = Loader.loadPDF(pdfFile);
      //Instantiate PDFTextStripp
      PDFTextStripper pdfStripper = new PDFTextStripper();
      //Retrieving text from PDF documentr
        String text = pdfStripper.getText(document);
      //System.out.println(text);
      document.close();
      //Closing the document
      String token1 = "";
    // create Scanner inFile1
    File file = new File("C:/Users/lv1god/Downloads/profany.txt");
    Scanner inFile1 = new Scanner(file).useDelimiter(",\\s*");
    BufferedWriter out = new BufferedWriter(new FileWriter(file, true));
    
   // out.write(path);
    out.close();
    List<String> temps = new ArrayList<String>();
   
    // while loop
    while (inFile1.hasNext()) {
      // find next line
      token1 = inFile1.next();
      temps.add(token1);
    }
    inFile1.close();
    
    String[] tempsArray = temps.toArray(new String[0]);  
     boolean x = true;
     int start = 0;
     int n = 0;
     ArrayList<Integer> arr = new ArrayList<Integer>();
    for (String s : tempsArray) {
        Pattern r = Pattern.compile(s);
    //Create a Pattern object
    Matcher m = r.matcher(text);
    //matcher object
      if(m.find(start)== true){
          
         start = m.start();
      arr.add(m.start());
      System.out.println(arr);
        x = false;
       
           }else if(x = false){
        System.out.println("No match");
    }
    } 
    }

}
