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
     public double calculateSD(double numArray[])
    {
    double sum = 0.0;
    double standardDeviation = 0.0;
    int length = numArray.length;

    for(double num : numArray) {
            sum += num;
        }

    double mean = sum/length;

    for(double num: numArray) {
            standardDeviation += Math.pow(num - mean, 2);
        }
    return Math.sqrt(standardDeviation/length);
}
    
}
