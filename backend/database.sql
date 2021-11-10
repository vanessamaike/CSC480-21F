use CSC480database;     



CREATE TABLE user(
	userId int NOT NULL,
    email VARCHAR(32) NOT NULL,
    settings VARCHAR(32) NOT NULL,
    role char(32) NOT NULL
);


CREATE TABLE course(
	courseId int NOT NULL,
    userId int NOT NULL,
	title VARCHAR(32) NOT NULL,
    code VARCHAR(32) NOT NULL,
    sectionNumber VARCHAR(32) NOT NULL,
    endDate date NOT NULL,
    settings CHAR(32) NOT NULL
);

CREATE TABLE student(
	studentId VARCHAR(32) NOT NULL,
    userId int NOT NULL,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL
);

CREATE TABLE course_team_student(
	teamId int NOT NULL,
	userId int NOT NULL,
    courseId int NOT NULL
);

CREATE TABLE assignment( 
    assignmentId int NOT NULL,
    title char(32) NOT NULL,
    isTeamed boolean NOT NULL,
    reviewStage boolean NOT NULL,
    publishDateTime datetime NOT NULL
    solutionDueDateTime datetime NOT NULL,
    peerReviewDueDateTime datetime NOT NULL,
    courseId int NOT NULL,
    solutionPdfDoc mediumblob NOT NULL,
    peerReviewPdfDoc mediumblob NOT NULL,
    settings char(32) NOT NULL,
     isDraft boolean NOT NULL
); 


CREATE TABLE submission(
    submissionId int NOT NULL,
    teamId int NOT NULL,
    submissionTime datetime NOT NULL,
    comments longtext NOT NULL,
    signOff VARCHAR(255) NOT NULL,
    PdfDoc mediumblob NOT NULL,
    seen boolean NOT NULL,
    listOfQCWordViolations string NOT NULL,
    assId int NOT NULL  
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
    listOfQCWordViolations string NOT NULL,
    SDCheck boolean NOT NULL,
    score double NOT NULL
);


CREATE TABLE question(
	questionId int NOT NULL,
	question VARCHAR(1024) NOT NULL,
    assignmentId int NOT NULL,
    value tinyint NOT NULL
);

CREATE TABLE answer(
	answerId int NOT NULL,
	submissionId int NOT NULL,
    questionId int NOT NULL,
    score float NOT NULL,
    possible float NOT NULL,
    answer VARCHAR(8000) NOT NULL
);

