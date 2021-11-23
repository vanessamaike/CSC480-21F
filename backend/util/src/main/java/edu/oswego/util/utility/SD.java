package edu.oswego.util.utility;

import java.util.List;

/**
 * @author Phoenix
 * This class handles standard deviation calculations for the PDF files' scores.
 */
public class SD {

    private double mean;
    private double stDev;
    private final double dev;

    /**
     * This class calculates the standard deviation for a set of review's scores.
     * @param scores The scores of the reviews.
     * @param dev The standard deviation multiplier
     */
    public SD(List<Integer> scores, double dev) {
        calculate(scores);
        this.dev = dev;
    }

    /**
     * This method calculates if the score is an outlier.
     * @param score The score being checked for deviation.
     * @return True if the score falls outside the standard deviation range.
     */
    public boolean isOutlier(int score) {
        return score>=(mean+dev*stDev) || score<=(mean-dev*stDev) || score<=0.0;
    }

    /**
     * This method sets the mean and stDev values in this class.
     * @param numArray This is the double array of the scores.
     */
    private void calculate(List<Integer> numArray) {
        double sum = 0.0;
        double standardDeviation = 0.0;
        for(double num : numArray) {
            sum += num;
        }
        mean = sum/numArray.size();
        for(int num: numArray) {
            standardDeviation += Math.pow(num - mean, 2);
        }
        stDev = Math.sqrt(standardDeviation/numArray.size());
    }

}