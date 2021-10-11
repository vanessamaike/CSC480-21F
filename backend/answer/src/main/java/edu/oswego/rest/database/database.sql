use CSC480database;

CREATE TABLE user(
	userId int NOT NULL,
    email VARCHAR(32) NOT NULL,
    role char(32) NOT NULL
);
INSERT INTO user (userId, email, role) values(1, "student@oswego.edu", "student");
INSERT INTO user (userId, email, role) values(2, "professor@oswego.edu", "professor");

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
values("dtran3", 1111, "Dat", "Tran","dtran3@oswego.edu", 1,3.7, 1);

CREATE TABLE course(
	courseId int NOT NULL,
	title VARCHAR(32) NOT NULL,
    code VARCHAR(32) NOT NULL,
    ends date NOT NULL,
    settings CHAR(32) NOT NULL
);
INSERT INTO course (courseId, title, code,ends, settings)
values(1, "Software Design", "CSC480", '1000-01-01', "settings");

CREATE TABLE submission(
	submissionId int NOT NULL,
	teamId int NOT NULL,
    signOff VARCHAR(255) NOT NULL,
    PdfDoc VARCHAR(255) NOT NULL
);
INSERT INTO submission (submissionId, pdfDoc, signOff,teamId ) values(1, "pdfDoc-aaa", "signOff-bbb", 2);

CREATE TABLE review(
	reviewId int NOT NULL,
	teamId int NOT NULL,
    signOff VARCHAR(255) NOT NULL,
    PdfDoc VARCHAR(255) NOT NULL
);
INSERT INTO review (reviewId, pdfDoc, signOff,teamId ) values(1, "pdfDoc-aaa", "signOff-bbb", 2);

CREATE TABLE assignment(
	assignmentId int NOT NULL,
	courseId int NOT NULL,
    pdfDoc VARCHAR(255) NOT NULL,
    settings char(32) NOT NULL
);
INSERT INTO assignment (assignmentId, pdfDoc, settings,courseId ) values(1, "pdfDoc-aaa", "settings-bbb", 2);

CREATE TABLE question(
	questionId int NOT NULL,
	question VARCHAR(1024) NOT NULL,
    assignmentId int NOT NULL,
    value tinyint NOT NULL
);
INSERT INTO question (questionId, question, assignmentId, value ) values(1, "what is your name?", 1 , 1);

CREATE TABLE answer(
	answerId int NOT NULL,
	submissionId int NOT NULL,
    questionId int NOT NULL,
    score float NOT NULL,
    possible float NOT NULL,
    answer VARCHAR(8000) NOT NULL
);
INSERT INTO answer (answerId, submissionId, questionId, score,possible ,answer ) 
values(1, 1,1, 9, 10, "my name is oswego");