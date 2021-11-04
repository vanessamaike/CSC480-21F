package edu.oswego.util.utility;

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
    public HashMap<Integer, String> QC(byte[] pdfFile, String[] students) throws IOException{

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
        /* TODO This file path will need to change when the server is deployed.
         * Maybe we want to make this part of admin module? Maybe BLOB in user.
         * Could be a secondary parameter, too.
         */
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
        HashMap<Integer, String> retVal = new HashMap<>();
        ArrayList<Integer> arr = new ArrayList<>();
        for (String s : tempsArray) {
            Pattern r = Pattern.compile(s);
            //Create a Pattern object
            Matcher m = r.matcher(text);
            //matcher object
            if(m.find(start)){
                start = m.start();
                arr.add(m.start());
                retVal.put(m.start(), s.substring(2,s.length()-2));
            }
        }
        return retVal;
    }
}
