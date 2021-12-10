package edu.oswego.util.dao.impl;


import edu.oswego.util.dao.IStudentDAO;
import edu.oswego.util.mapper.Course_Team_Student_Mapper;
import edu.oswego.util.mapper.StudentMapper;
import edu.oswego.util.objects.Course_Team_Student;
import edu.oswego.util.objects.Student;
import edu.oswego.util.utility.JEncrypt;

import java.util.ArrayList;
import java.util.List;

public class StudentDAO extends AbstractDAO<Student> implements IStudentDAO {
    JEncrypt e = new JEncrypt();
    //ClassLoader classLoader = this.getClass().getClassLoader();
    public int generateUniqueRandomUserId()
    {
        String sql = "SELECT (IF( (select count(userId) from student) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM student WHERE \"random_number\" NOT IN (SELECT userId FROM student) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int generateUniqueRandomTeamId()
    {
        String sql = "SELECT (IF( (select count(teamId) from course_team_student) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM course_team_student WHERE \"random_number\" NOT IN (SELECT teamId FROM course_team_student) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Student student) {
        StringBuilder sql = new StringBuilder("INSERT INTO student (studentId, userId, firstName,lastName,email) ");
        sql.append(" VALUES(?, ?, ?, ?, ? )");
        int uniqueRandomUserId;
        if(student.getUserID()!=0) uniqueRandomUserId = generateUniqueRandomUserId();
        else uniqueRandomUserId = student.getUserID();
        //Student s = encryptedStudent(student);
        insert(sql.toString(), e.encrypt(student.getStudentID()), uniqueRandomUserId, e.encrypt(student.getFirstName()),
                e.encrypt(student.getLastName()), e.encrypt(student.getEmail()));

        sql = new StringBuilder("INSERT INTO user (userId, email, role, settings)");
        sql.append(" VALUES(?, ?, ?, ?)");
        insert(sql.toString(), uniqueRandomUserId, student.getEmail(),"student","");

        return uniqueRandomUserId;
    }

    @Override
    public int setCourseForStudent(int userId, int courseId) {
        insert("INSERT INTO course_team_student (userId, courseId, teamId) " + " VALUES(?, ?, ? )", userId, courseId,-1);
        return userId;
    }

    @Override
    public Course_Team_Student setTeamForStudentByUserIdAndCourseId(int userId, int courseId, int teamId) {

        update("UPDATE course_team_student SET teamId = ? where userId = ? and courseId = ?", teamId, userId, courseId);
        return findCourse_Team_StudentByUserIdAndCourseId(userId, courseId);
    }


    public Course_Team_Student findCourse_Team_StudentByUserIdAndCourseId(int userId, int courseId){
        String sql = "SELECT * FROM course_team_student WHERE userID = ? and courseId = ?";
        List<Course_Team_Student> course_team_student = query(sql, new Course_Team_Student_Mapper(), userId, courseId);
        return course_team_student.isEmpty() ? null : course_team_student.get(0);
    }

    @Override
    public List<Student> findAll() {
        String sql = "SELECT * FROM student";
        List<Student> studentsEncrypted = query(sql, new StudentMapper());
        List<Student> studentsDecrypted = new ArrayList<>();
        for(Student s : studentsEncrypted){
            studentsDecrypted.add(new Student(e.decrypt(s.getStudentID()), s.getUserID(), e.decrypt(s.getFirstName()),
                    e.decrypt(s.getLastName()), e.decrypt(s.getEmail())));
        }
        return studentsDecrypted.isEmpty() ? null : studentsDecrypted;
    }

    @Override
    public Student findStudentByStudentId(Student student) {
        String sql = "SELECT * FROM student WHERE studentId = ? and firstName = ? and lastName = ? and email = ?";
        List<Student> studentsDecrypted = query(sql, new StudentMapper(), student.getStudentID(),
                student.getFirstName(),student.getLastName(),student.getEmail());
        //List<Student> studentsDecrypted = decryptedStudent(students);
        return studentsDecrypted.isEmpty() ? null : studentsDecrypted.get(0);
    }

    @Override
    public  Student findOne(int userId){
        String sql = "SELECT * FROM student WHERE userID = ?";
        List<Student> studentsEncrypted = query(sql, new StudentMapper(), userId);
        List<Student> studentsDecrypted = new ArrayList<>();
        for(Student s : studentsEncrypted){
            studentsDecrypted.add(new Student(e.decrypt(s.getStudentID()), s.getUserID(), e.decrypt(s.getFirstName()),
                    e.decrypt(s.getLastName()), e.decrypt(s.getEmail())));
        }
        return studentsDecrypted.isEmpty() ? null : studentsDecrypted.get(0);
    }

    @Override
    public List<Student> findStudentsByTeamID(int teamId) {
        String sql = "SELECT * FROM course_team_student WHERE teamID = ?";
        List<Course_Team_Student> course_team_student = query(sql, new Course_Team_Student_Mapper(), teamId);
        List<Student> students = new ArrayList<>();
        for(Course_Team_Student c : course_team_student){
            Student s = findOne(c.getUserId());
            if (s != null) {
                students.add(s);
            }
        }
        return students;
    }

    @Override
    public List<Student> findStudentsByCourseID(int courseId) {
        String sql = "SELECT * FROM course_team_student WHERE courseID = ?";
        List<Course_Team_Student> course_team_student = query(sql, new Course_Team_Student_Mapper(), courseId);
        List<Student> students = new ArrayList<>();
        for(Course_Team_Student c : course_team_student){
            Student s = findOne(c.getUserId());
            if (s != null) {
                students.add(s);
            }
        }

        return students;
    }

    @Override
    public List<Integer> findDistinctTeamIDsByCourseID(int courseId){
        String sql = "SELECT DISTINCT teamID FROM course_team_student where courseID = ?";
        return queryInteger(sql,"teamID", courseId);
    }

    @Override
    public Integer findDistinctTeamIDByCourseIDAndUserId(int courseId, int userId){
        String sql = "SELECT DISTINCT teamID FROM course_team_student where courseID = ? and userId = ?";
        List<Integer> distinctTeamIDs = queryInteger(sql,"teamID", courseId, userId);
        return distinctTeamIDs.get(0);
    }

    @Override
    public void update(Student student) {
        String sql = "UPDATE student SET studentId = ?, firstName = ?, lastName = ?, " +
                "email = ? , teamID = ? WHERE userId = ?";
        update(sql, e.encrypt(student.getStudentID()), e.encrypt(student.getFirstName()),
                e.encrypt(student.getLastName()), e.encrypt(student.getEmail()), student.getUserID());
    }

    @Override
    public void delete(Student student) {
        String sql = "DELETE FROM student WHERE userID = ?";
        update(sql, student.getUserID());
        sql = "DELETE FROM course_team_student WHERE userID = ?";
        update(sql, student.getUserID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM student";
        update(sql);
    }

//    public Student encryptedStudent(Student student)
//    {
//        String studentIDEncrypted;
//        String firstNameEncrypted;
//        String lastNameEncrypted;
//        String emailEncrypted;
//        Student encryptedStudent;
//
//            try {
//                e = new Encryptor();
//
//                studentIDEncrypted = Arrays.toString(e.encrypt(student.getStudentID()));
//                firstNameEncrypted = Arrays.toString(e.encrypt(student.getFirstName()));
//                lastNameEncrypted = Arrays.toString(e.encrypt(student.getLastName()));
//                emailEncrypted = Arrays.toString(e.encrypt(student.getEmail()));
//                encryptedStudent = new Student(studentIDEncrypted,0,firstNameEncrypted,lastNameEncrypted,emailEncrypted);
//            } catch (GeneralSecurityException ex) {
//                //In the event that the encryptor fails, values are stored as is.
//                //This could create database problems, but re-uploading the CSV / deleting and remaking
//                //a course would be a way to "fix" the issue. Better than having personal info exposed.
//                studentIDEncrypted = student.getStudentID();
//                firstNameEncrypted = student.getFirstName();
//                lastNameEncrypted = student.getLastName();
//                emailEncrypted = student.getEmail();
//                encryptedStudent = new Student(studentIDEncrypted,0,firstNameEncrypted,lastNameEncrypted,emailEncrypted);
//                ex.printStackTrace();
//            }
//        return encryptedStudent;
//    }
//
//    public List<Student> decryptedStudent(List<Student> students){
//        List<Student> studentsDecrypted = new ArrayList<>();
//        for(Student s : students){
//            String studentIDDecrypted;
//            String firstNameDecrypted;
//            String lastNameDecrypted;
//            String emailDecrypted;
//            {
//                try {
//                    e = new Encryptor();
//                    studentIDDecrypted = e.decrypt(s.getStudentID().getBytes(StandardCharsets.UTF_8));
//                    firstNameDecrypted = e.decrypt(s.getFirstName().getBytes(StandardCharsets.UTF_8));
//                    lastNameDecrypted = e.decrypt(s.getLastName().getBytes(StandardCharsets.UTF_8));
//                    emailDecrypted = e.decrypt(s.getEmail().getBytes(StandardCharsets.UTF_8));
//                } catch (GeneralSecurityException ex) {
//                    //In the event that the encryptor fails, values are stored as is.
//                    //This could create database problems, but re-uploading the CSV / deleting and remaking
//                    //a course would be a way to "fix" the issue. Better than having personal info exposed.
//                    studentIDDecrypted = s.getStudentID();
//                    firstNameDecrypted = s.getFirstName();
//                    lastNameDecrypted = s.getLastName();
//                    emailDecrypted = s.getEmail();
//                    ex.printStackTrace();
//                }
//            }
//            s.setStudentID(studentIDDecrypted);
//            s.setFirstName(firstNameDecrypted);
//            s.setLastName(lastNameDecrypted);
//            s.setEmail(emailDecrypted);
//            studentsDecrypted.add(s);
//        }
//        return studentsDecrypted;
//    }

}
