package edu.oswego.rest.utility;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QualityCheck {
    public String QC(byte[] pdfFile, String[] students) throws IOException{

        PDDocument document = PDDocument.load(pdfFile);
        //Instantiate PDFTextStrip
        PDFTextStripper pdfStripper = new PDFTextStripper();
        //Retrieving text from PDF document
        String text = pdfStripper.getText(document);
        //System.out.println(text);
        document.close();
        //Closing the document
        String token1;
        // create Scanner inFile1
        ClassLoader classLoader = this.getClass().getClassLoader();
        // Getting resource(File) from class loader
        File file =new File(classLoader.getResource("profanity.txt").getFile());

        Scanner inFile1 = new Scanner(file).useDelimiter(",\\s*");
        BufferedWriter out = new BufferedWriter(new FileWriter(file, true));
        out.close();
        List<String> temps = new ArrayList<>();

        while (inFile1.hasNext()) {
            token1 = inFile1.next();
            temps.add("\\b" + token1 + "\\b");
        }
        inFile1.close();
        for(String s : students){
            temps.add("\\b" + s + "\\b");
        }

        //Collections.addAll(temps, students);
        String[] tempsArray = temps.toArray(new String[0]);
        int start = 0;
        StringBuilder retVal = new StringBuilder();
        for (String s : tempsArray) {
            Pattern r = Pattern.compile(s);
            //Create a Pattern object
            Matcher m = r.matcher(text);
            //matcher object
            if(m.find(start)){
                start = m.start();
                retVal.append(s, 2, s.length() - 2).append(",");
            }
        }
        if(retVal.toString().equals(""))
        {
            return retVal.toString();
        }

        return retVal.substring(0, retVal.length()-2);
    }
}