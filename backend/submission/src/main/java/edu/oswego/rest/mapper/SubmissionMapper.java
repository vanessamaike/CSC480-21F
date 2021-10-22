package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.Submission;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;


public class SubmissionMapper implements RowMapper<Submission>{
    @Override
    public Submission mapRow(ResultSet rs) {
        try {

            // if you want to see the output of pdf file, you can uncomment this code
            File outFile = new File("E:\\backup\\DATTRAN\\STUDY\\Oswego\\Fall2021\\CSC480\\output.pdf");
            FileOutputStream output = new FileOutputStream(outFile);
            byte[] input = rs.getBytes("pdfDoc");
            output.write(input);

            Submission submission = new Submission(
                    rs.getInt("submissionID"),
                    rs.getBytes("pdfDoc"),
                    rs.getString("signOff"),
                    rs.getInt("teamID")
            );
            return submission;
        }catch(SQLException | FileNotFoundException e)
        {
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}