import axios from "axios";

var userID = 87369

var studentID = 13985 //97536//67252//73816//54261//47199

export const getCoursesByProfessor = async () => {
  try {
    const response = await axios.get("http://localhost:3000/courses");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteCourseByProfessor = async (courseID) => {
  try {
    const response = await axios.post(`http://192.168.1.106:9080/api/course/delete/${courseID}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//93716
export const getTeamsByProfessor = async () => {
    try {
      const response = await axios.get(`http://192.168.1.106:9080/api/professor/${userID}/course/team`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getAssignmentsByProfessor = async () => {
  try {
    const response = await axios.get(`http://192.168.1.106:9080/api/professor/${userID}/course/assignment`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postNewStudentByProfessor = async (json) => {
    try {
      const response = await axios.post("http://192.168.1.106:9080/api/student", json);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export const postNewAssignmentByProfessor = async (json) => {
  try {
    const response = await axios.post("http://192.168.1.106:9080/api/assignment", json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
} 

export const editAssignmentByProfessor = async (json) => {
  try {
    const response = await axios.post("http://192.168.1.106:9080/api/assignment/update",json);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteAssignmentByProfessor = async (assID) => {
  try {
    const response = await axios.post(`http://192.168.1.106:9080/api/assignment/delete/${assID}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const postNewCourseByProfessor = async (json) => {
  try {
    const response = await axios.post("http://192.168.1.106:9080/api/parse", json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const deleteStudentByProfessor = async (stuID) => {
  try {
    console.log(stuID);
    const response = await axios.post(`http://192.168.1.106:9080/api/student/delete/${stuID}`);
    
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getCoursesByStudent = async () => {
    try {
      const response = await axios.get("http://192.168.1.106:9080/api/course");
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getAssignmenstByStudent = async () => {
    try {
      const response = await axios.get(`http://192.168.1.106:9080/api/professor/${studentID}/course/assignment/student`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getSubmissionsToReviewByStudent = async (assignmentID) => {
  try {
    const response = await axios.get(`http://192.168.1.106:9080/api/professor/${studentID}/assignment/${assignmentID}/reviews`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getTeamIdByStudentAndCourse = async (courseID) => {
  try {
    console.log(courseID)
    const response = await axios.get(`http://192.168.1.106:9080/api/professor/${studentID}/course/${courseID}/teamId`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postNewSolutionByStudent = async (json) => {
  try {

    const response = await axios.post("http://192.168.1.106:9080/api/solution", json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const postNewPeerReviewByStudent = async (json) => {
  try {

    const response = await axios.post("http://192.168.1.106:9080/api/review", json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getQualityCheckSolutionByProfessor = async (assignmentID) => {//{userId}/assignment/{assignmentId}/qualitycheck/solution
  try {
    const response = await axios.get(`http://192.168.1.106:9080/api/professor/${studentID}/assignment/${assignmentID}/solution/qualityCheck`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getQualityCheckPeerReviewByProfessor = async (assignmentID) => {//{userId}/assignment/{assignmentId}/qualitycheck/solution
  try {
    const response = await axios.get(`http://192.168.1.106:9080/api/professor/${studentID}/assignment/${assignmentID}/peerreview/qualityCheck`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const sendAssignReviewByProfessor = async (assignmentID) => {//{userId}/assignment/{assignmentId}/qualitycheck/solution
  try {
    const response = await axios.post(`http://192.168.1.106:9080/api/professor/${studentID}/assignment/${assignmentID}/assignReview`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}