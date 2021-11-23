use CSC480database;    

CREATE TABLE team (
	teamID int NOT NULL,
    teamName int NOT NULL
);

CREATE TABLE student(
	studentId longtext NOT NULL,
    userId int NOT NULL,
    firstName longtext NOT NULL,
    lastName longtext NOT NULL,
    email longtext NOT NULL
);
CREATE TABLE course(
	courseId int NOT NULL,
    userId int NOT NULL,
	isTeamed boolean NOT NULL,
	title VARCHAR(32) NOT NULL,
    code VARCHAR(32) NOT NULL,
    sectionNumber VARCHAR(32) NOT NULL,
    endDate date NOT NULL,
    semester VARCHAR(32) NOT NULL,
    settings CHAR(32) NOT NULL
);


CREATE TABLE course_team_student(
	teamId int NOT NULL,
	userId int NOT NULL,
    courseId int NOT NULL
);

CREATE TABLE assignment( 
    assignmentId int NOT NULL,
    title char(32) NOT NULL,
    reviewStage boolean NOT NULL,
    resultStage boolean NOT NULL,
    publishDateTime datetime NOT NULL,
    solutionDueDateTime datetime NOT NULL,
    peerReviewDueDateTime datetime NOT NULL,
    courseId int NOT NULL,
    solutionPdfDoc mediumblob NOT NULL,
    peerReviewPdfDoc mediumblob NOT NULL,
    settings char(32) NOT NULL,
     isDraft boolean NOT NULL,
     solutionPdfFileName VARCHAR(32) NOT NULL,
     peerReviewPdfFileName VARCHAR(32) NOT NULL
); 

CREATE TABLE submission(
    submissionId int NOT NULL,
    teamId int NOT NULL,
    submissionTime datetime NOT NULL,
    comments longtext NOT NULL,
    signOff VARCHAR(255) NOT NULL,
    PdfDoc mediumblob NOT NULL,
    seen boolean NOT NULL,
    listOfQCWordViolations VARCHAR(255) NOT NULL,
    assId int NOT NULL  
);

CREATE TABLE submission_team(
	submissionId int NOT NULL,
	teamId int NOT NULL,
    assignmentId int NOT NULL
);

CREATE TABLE review(
    reviewId int NOT NULL,
    teamId int NOT NULL,
    submissionTime datetime NOT NULL,
    comments longtext NOT NULL,
    signOff VARCHAR(255) NOT NULL,
    PdfDoc mediumblob NOT NULL,
    seen boolean NOT NULL,
    assId int NOT NULL,
    submissionID int NOT NULL,
    listOfQCWordViolations VARCHAR(255) NOT NULL,
    SDCheck boolean NOT NULL,
    score int NOT NULL
);
CREATE TABLE user(
	userId int NOT NULL,
    email VARCHAR(32) NOT NULL,
    settings VARCHAR(32) NOT NULL,
    role char(32) NOT NULL
);
