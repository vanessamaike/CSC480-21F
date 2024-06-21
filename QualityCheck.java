
import java.io.File;
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
    public void QC(File file) throws IOException{
       PDDocument document = Loader.loadPDF(file);
      //Instantiate PDFTextStripp
      PDFTextStripper pdfStripper = new PDFTextStripper();
      //Retrieving text from PDF document
        String text = pdfStripper.getText(document);
      //System.out.println(text);
      document.close();
      //Closing the document
      String token1 = "";
    // create Scanner inFile1
    Scanner inFile1 = new Scanner(new File("C:/Users/lv1god/Downloads/profany.txt")).useDelimiter(",\\s*");
    
    List<String> temps = new ArrayList<String>();
    List<Double> scores = new ArrayList<Double>();
    // while loop
    while (inFile1.hasNext()) {
      // find next line
      token1 = inFile1.next();
      temps.add(token1);
    }
    inFile1.close();

    String[] tempsArray = temps.toArray(new String[0]);  
     boolean x = true;
    for (String s : tempsArray) {
        Pattern r = Pattern.compile(s);
    //Create a Pattern object
    Matcher m = r.matcher(text);
    //matcher object
      if(m.find()){
        System.out.println("Contains Profanity");
        x = false;
        break;
    }else if(x = false){
        System.out.println("No match");
    }
    } 
    }
}
