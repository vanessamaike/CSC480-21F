package edu.oswego.util.utility;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import java.io.File;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Phoenix
 * This class handles standard deviation calculations for the PDF files' scores.
 */
public class SD {

    private double mean;
    private double stDev;
    private double score;

    private final String key;
    private final boolean before;

    /**
     * This constructor takes in the array of files to be scanned as well as the key, and position.
     * @param files The array of PDF files to be scanned.
     * @param key The key which the REGEX scanner looks for to signify the score.
     * @param before The boolean that determines if the key is before or after the score.
     * @throws IOException This occurs when the PDF file does not load properly.
     */
    public SD(File[] files, String key, boolean before) throws IOException {
        this.key = key;
        this.before = before;
        calculate(getScores(files));
    }

    /**
     * This method determines if a file's score has an outlier score, and sets the score.
     * @param f The file to be checked.
     * @param dev The number of standard deviations away from the mean to set the limit.
     * @return True if the file's score is above or below the limit, or is 0.
     * @throws IOException This occurs when the PDF file does not load properly.
     */
    public boolean isOutlier(File f, double dev) throws IOException {
        score = getScores(new File[]{f})[0];
        return score>=(mean+dev*stDev) || score<=(mean-dev*stDev) || score<=0.0;
    }

    /**
     * This method returns a file's score if it is an outlier.
     * @param f The file to be checked.
     * @param dev The number of standard deviations away from the mean to set the limit.
     * @return A double value that is the score.
     * @throws IOException This occurs when the PDF file does not load properly.
     */
    public double getScore(File f, double dev) throws IOException {
        isOutlier(f, dev);
        return score;
    }

    /**
     * This method sets the mean and stDev values in this class.
     * @param numArray This is the double array of the scores.
     */
    private void calculate(double[] numArray) {
        double sum = 0.0;
        double standardDeviation = 0.0;
        for(double num : numArray) {
            sum += num;
        }
        mean = sum/numArray.length;
        for(double num: numArray) {
            standardDeviation += Math.pow(num - mean, 2);
        }
        stDev = Math.sqrt(standardDeviation/numArray.length);
    }

    /**
     * This method extracts the scores from the files.
     * @param files The array of PDF files to be extracted.
     * @return The scores as an array of doubles.
     * @throws IOException This occurs when the PDF file does not load properly.
     */
    private double[] getScores(File[] files) throws IOException {
        double[] scores = new double[files.length];
        //For every file in the array
        for(int q = 0; q < files.length; q++){
            //Turn the PDF into a String
            PDDocument document = PDDocument.load(files[q]);
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String text = pdfStripper.getText(document);
            document.close();
            String scoreString;
            int index;
            double total = 0.0;
            //If there is no key provided, check for "<d>.<dd> / <d>.<dd>"
            if (key.equals("")) {
                //While the index is greater than 0 (while there are still scores to be found)
                while(true){
                    try{
                        index = getIndex(text);
                        scoreString = text.substring(getIndex(text),
                                text.substring(getIndex(text)).indexOf(" "));
                        total += Double.parseDouble(scoreString);
                        //Trim off the front part of the text.
                        text = text.substring(index+scoreString.length());
                    }
                    catch(IllegalStateException | StringIndexOutOfBoundsException e){
                        break;
                    }
                }
            }
            //If there is a key provided, check for "<key> <d>.<dd>" OR "<d>.<dd> <key>"
            else {
                //While the index is greater than 0 (while there are still scores to be found)
                while(true){
                    try{
                        index = getIndex(text, key, before);
                        scoreString = text.substring(index, index+text.substring(index).indexOf(" "));
                        total += Double.parseDouble(scoreString);
                        //Trim off the front part of the text.
                        text = text.substring(index+scoreString.length());
                    }
                    catch(IllegalStateException | StringIndexOutOfBoundsException e){
                        break;
                    }
                }
            }
            //Put the total in the scores for the PDF at this index.
            scores[q] = total;
        }
        return scores;
    }

    /**
     * This method finds the beginning index of the score given.
     * @param text The text being searched for a score.
     * @param key This is the keyword the scanner will look for to extract keys.
     * @param before This boolean determines if the key appears before or after the score.
     * @return The index of the found score.
     */
    private int getIndex(String text, String key, boolean before) {
        Pattern p;
        if(before) p = Pattern.compile(key+" (\\d)+");
        else p = Pattern.compile("(\\d)+ "+key);
        Matcher match = p.matcher(text);
        if(match.find()) return match.start()+key.length()+1;
        else return -1;
    }

    /**
     * This method finds the beginning index of the score given.
     * @param text The text being scanned.
     * @return The index at which the text was found.
     */
    private int getIndex(String text) {
        Pattern p = Pattern.compile(
                "(\\d)+([,|\\.](\\d)+)?" + //The given score
                        "( ?)/( ?)" + //The ' / ' between the given and total scores
                        "(\\d)+([,|\\.](\\d)+)?" + //The total score
                        "");
        Matcher m = p.matcher(text);
        return m.start();
    }

    public String toString(){
        return mean+"; "+stDev+"; "+key;
    }

}