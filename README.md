# PeerSet

<img src="https://github.com/vanessamaike/CSC480-21F/blob/main/frontend/src/main/frontend/src/images/logo.png" alt="PeerSet Logo" title="PeerSet" width="350px">

## What is this Application?

PeerSet is a web application that was designed to help college professors facilitate [Calibrated Peer Review (CPR)](http://cpr.molsci.ucla.edu/Home) in their classes. CPR is a method of peer review in which students are provided with grading instructions and examples of low, medium and high quality solutions to the assignments posed by their professors. These examples serve as a baseline for their evaluation of their peers’ work. 

PeerSet was designed and developed by the CSC 480/HCI 521 (Software Design) class during the Fall 2021 semester at SUNY Oswego. Students in the class were divided into teams, and each team had a specific role to play in the completion of the project. These roles included requirements elicitation and documentation, usability design and assessment, front end (GUI) development, and back end (engine, database and networking) development. The project was completed in collaboration with IBM, who provided technical resources and valuable assistance throughout the semester.

### Why PeerSet Was Built

This web application was built to help with the CPR process. In order for CPR to be effective, feedback must be anonymous, amicable, and fair, so professors must conduct thorough quality checks of both solutions and reviews. This allows them to ensure that no student names show up in any of the documents, and gives them the opportunity to weed out any reviews that are profane or otherwise not constructive. Additionally, professors must evenly distribute review assignments while making sure that no student reviews their own work. When the process is finished, professors must distribute grades and feedback to students.

CPR has numerous benefits for students, and [studies have shown](https://www.dropbox.com/s/w6uft1gxuvwe9gs/CSEET2022_v15-CRC.pdf?dl=0) that CPR can improve student grade outcomes by up to 14%. The results suggest that exposure to multiple solutions to solving the same problem improves learning outcomes, as well.

Though CPR is highly beneficial for students, it isn’t easy for professors to implement. Facilitating CPR can be extremely time-consuming (especially in classes with high student counts), and professors often struggle to set aside blocks of uninterrupted time to complete the process. Additionally, because the CPR process has so many steps, it has a higher potential for human error than other grading processes. The primary goal of PeerSet is to make the process more efficient while helping to reduce human error. 

### What PeerSet Does

PeerSet was designed to accommodate users in the two main roles of student and professor, along with an admin role for users who are responsible for launching and managing the application.

PeerSet allows students to take a more active role in their own learning. They create solutions to assignments, given by the professor, that are then reviewed by their classmates. Students submit this work as either teams or as individuals, and each team or individual can review multiple solutions from the other teams or individuals. Submissions on PeerSet are always completely anonymous. This ensures compliance with [U.S. federal regulation](https://www.law.cornell.edu/cfr/text/34/part-99) and allows students to be honest and objective in their reviews of their peers’ work.

PeerSet helps professors facilitate CPRs by providing them with an efficient way to distribute assignments and collect submissions. Information about solutions and peer reviews can be uploaded at the same time, allowing the system to easily transition from the solution phase to the peer review phase of each assignment. PeerSet’s Quality Check feature displays student grades and checks all submissions for profanity and student names, which undermine the CPR process. If there are any issues with the submission, a drop-down called View Errors above the PDF display will show them. Once the quality checks have been completed, professors can use the application to quickly distribute review results to students.

### Resources

The following resources were used to develop PeerSet:

+ [Open Liberty](https://openliberty.io/) is an open source development framework from IBM. Open Liberty is ideal for building efficient, cloud-native Java applications.
+ [Eclipse Microprofile](https://projects.eclipse.org/projects/technology.microprofile) is a tool for developing Java microservices.
+ [Maven](https://maven.apache.org/) is a project management tool. It is used primarily for building in Java.
+ [Figma](https://www.figma.com/) was used for interface design and prototyping.
+ [ReactJS](https://reactjs.org/) is a free, open source library used by the GUI team for frontend development.
  - [Material UI](https://v4.mui.com/) is a library that allows UI developers to import and use different components to create a user interface.
  - [Redux](https://redux.js.org/) is a state container for JavaScript applications.
+ [JSON Web Tokens](https://jwt.io/) are used to authenticate users and secure requests between services.
+ [OAuth2.0](https://oauth.net/2/) is the authorization protocol that was used.

## Getting Started

Instructions for downloading and running PeerSet are available in the [Deployment Manual](https://github.com/vanessamaike/CSC480-21F/blob/main/documentation/Deployment%20Manual.pdf).

Instructions for using PeerSet are available in the [User Manual](https://github.com/vanessamaike/CSC480-21F/blob/main/documentation/User%20Manual.pdf).

## Acknowledgements

The CSC 480/HCI 521 Software Design class would like to thank Paul Austin and his team from IBM for their help throughout the semester.

## License

PeerSet is distributed under the [MIT License](https://github.com/vanessamaike/CSC480-21F/blob/main/LICENSE).
