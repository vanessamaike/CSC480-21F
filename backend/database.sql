use CSC480database;


SELECT FLOOR(10000 + RAND() * 89999) AS random_number
                FROM review WHERE 'random_number' NOT IN (SELECT reviewId FROM review) LIMIT 1;

CREATE TABLE user(
	userId int NOT NULL,
    email VARCHAR(32) NOT NULL,
    role char(32) NOT NULL
);
INSERT INTO user (userId, email, role) values(12589, "student@oswego.edu", "student");
INSERT INTO user (userId, email, role) values(26589, "professor@oswego.edu", "professor");

CREATE TABLE student(
	studentId VARCHAR(32) NOT NULL,
    userId int NOT NULL,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL,
    teamID int NOT NULL,
    score float,
    courseId int
);
INSERT INTO student (studentId, userId, firstName,lastName,email, teamID,score,courseId) 
values("dtran3", 12589, "Dat", "Tran","dtran3@oswego.edu", 1,3.7, 1);

CREATE TABLE course(
	courseId int NOT NULL,
    userId int NOT NULL,
	title VARCHAR(32) NOT NULL,
    code VARCHAR(32) NOT NULL,
    sectionNumber VARCHAR(32) NOT NULL,
    endDate date NOT NULL,
    settings CHAR(32) NOT NULL    
);
INSERT INTO course (courseId,userId, title, code, sectionNumber, endDate, settings) 
values(59651, 26589, "Software Design", "CSC480", "A", '1000-01-01', "settings");

CREATE TABLE submission(
	submissionId int NOT NULL,
	teamId int NOT NULL,
    signOff VARCHAR(255) NOT NULL,
    PdfDoc mediumblob NOT NULL    
);

CREATE TABLE review(
	reviewId int NOT NULL,
	teamId int NOT NULL,
    signOff VARCHAR(255) NOT NULL,
    PdfDoc mediumblob NOT NULL    
);

CREATE TABLE assignment( 
	assignmentId int NOT NULL,
	courseId int NOT NULL,
    pdfDoc mediumblob NOT NULL,
    settings char(32) NOT NULL
);
CREATE TABLE question(
	questionId int NOT NULL,
	question VARCHAR(1024) NOT NULL,
    assignmentId int NOT NULL,
    value tinyint NOT NULL
);
INSERT INTO question (questionId, question, assignmentId, value ) values(65181, "what is your name?", 62591, 1);

CREATE TABLE answer(
	answerId int NOT NULL,
	submissionId int NOT NULL,
    questionId int NOT NULL,
    score float NOT NULL,
    possible float NOT NULL,
    answer VARCHAR(8000) NOT NULL
);
INSERT INTO answer (answerId, submissionId, questionId, score,possible ,answer ) 
values(65181, 14628,65181, 9, 10, "my name is oswego");
