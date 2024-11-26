
import java.io.File;
import java.io.IOException;
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
public class SD {
    double StandardDevaiton;
    double mean;
    double prange, nrange;
    double scores;
    public void getScores(String path) throws IOException{
        int score = 0;
    File pdfFile = new File(path);  
       PDDocument document = Loader.loadPDF(pdfFile);
      //Instantiate PDFTextStripp
      PDFTextStripper pdfStripper = new PDFTextStripper();
      //Retrieving text from PDF document
        String text = pdfStripper.getText(document);
      //System.out.println(text);
    
      if(text.contains("score")){
       int index = text.indexOf("score") + 1;
       
       scores = Double.parseDouble(String.valueOf(text.charAt(index)));
       System.out.println(scores);
     }
      document.close();
      
      }
     public boolean check(double score){
     if(score == 0.0){
         return true;
     } return false;
     }
    public boolean sd(double score){
        double sd = StandardDevaiton * score;
        double pr = mean + sd;
        double nr = mean - sd;
        if (pr > prange || nr < nrange ){
            return false;
        }return true;
    }
     public double calculateSD(double numArray[])
    {
    double sum = 0.0;
    double standardDeviation = 0.0;
    int length = numArray.length;

    for(double num : numArray) {
            sum += num;
        }

    mean = sum/length;

    for(double num: numArray) {
            standardDeviation += Math.pow(num - mean, 2);
        }
    StandardDevaiton = Math.sqrt(standardDeviation/length);
    return StandardDevaiton;
}
     
    
}
