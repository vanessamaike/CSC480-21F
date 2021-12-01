import axios from "axios";
import https from "https";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";

const url = "http://pi.cs.oswego.edu"

const PROFESSOR_PORT = "5682"

const STUDENT_PORT = "5683"

const LOGIN_PORT = "5681"

const ULTILITY_PORT = "5680"


const convertToJson_AddToken = (data) => {

  const token = localStorage.getItem('token');

  let json
  
  if (data !== undefined) {
    json = {
      data: data,
      token: token,
    };
  }
  else {

    json = {
      data : 'abv',
      token: token
    };
  }

  return JSON.stringify(json);
}

export const getAssignmentsByProfessor = async () => {
  try {
    const json = convertToJson_AddToken()
    const userID = localStorage.getItem('userID');
    const response = await axios.post(`${url}:${PROFESSOR_PORT}/api/professor/${userID}/course/assignment`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//Professor
export const getSpecificAssignment = async (assignmentID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/assignment/${assignmentID}`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const deleteCourseByProfessor = async (courseID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/course/delete/${courseID}`, json);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getTeamsByProfessor = async () => {
    try {
      const json = convertToJson_AddToken()
      const userID = localStorage.getItem('userID');
      const response = await axios.post(`${url}:${PROFESSOR_PORT}/api/professor/${userID}/course/team`,json);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getQualityCheckSolutionByProfessor = async (assignmentID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${PROFESSOR_PORT}/api/professor/assignment/${assignmentID}/solution/qualityCheck`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getQualityCheckPeerReviewByProfesssor = async (assignmentID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${PROFESSOR_PORT}/api/professor/assignment/${assignmentID}/peerreview/qualityCheck`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const sendReviewByProfessor = async (assignmentID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${PROFESSOR_PORT}/api/professor/assignment/${assignmentID}/assignReview`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const sendFeedBackByProfessor = async (assignmentID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/assignment/setResultStage/${assignmentID}`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postNewStudentByProfessor = async (data) => {
    try {
      const json = convertToJson_AddToken(data)
      const response = await axios.post(`${url}:${STUDENT_PORT}/api/student`, json);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const postNewAssignmentByProfessor = async (data) => {
  try {
    const json = convertToJson_AddToken(data)
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/assignment`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
} 
export const editAssignmentByProfessor = async (data) => {
  try {
    const json = convertToJson_AddToken(data)
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/assignment/update`,json);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const deleteAssignmentByProfessor = async (assID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/assignment/delete/${assID}`, json);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const postNewCourseByProfessor = async (data) => {
  try {
    const json = convertToJson_AddToken(data)
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/parse`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const deleteStudentByProfessor = async (stuID) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${STUDENT_PORT}/api/student/delete/${stuID}`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const rejectSolutionByProfessor = async (assID,teamID) => {
  try {
    console.log(assID);
    console.log(teamID);
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${PROFESSOR_PORT}/api/professor/assignment/${assID}/team/${teamID}/reject/solution`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const rejectPeerReviewByProfessor = async (assID,teamId, solutionId, solutionSubmissionName) => {
  try {
    const json = convertToJson_AddToken()
    const response = await axios.post(`${url}:${PROFESSOR_PORT}/api/professor/assignment/${assID}/team/${teamId}/reject/review/${solutionId}/solutionSubmissionName/${solutionSubmissionName}`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//Student
export const getResultsByStudent = async () => {
  try {
    const json = convertToJson_AddToken()
    const userID = localStorage.getItem('userID');
    const response = await axios.post(`${url}:${STUDENT_PORT}/api/student/${userID}/course/assignment/result/student`,json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getPeerReviewResulttByStudent = async (assignmentID) => {
  try {
    const json = convertToJson_AddToken()
    const userID = localStorage.getItem('userID');
    const response = await axios.post(`${url}:${STUDENT_PORT}/api/student/${userID}/assignment/${assignmentID}/result/student`,json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getAssignmenstByStudent = async () => {
    try {
      
      const json = convertToJson_AddToken()
      const userID = localStorage.getItem('userID');
      console.log(userID)
      const response = await axios.post(`${url}:${STUDENT_PORT}/api/student/${userID}/course/assignment/student`,json);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getSubmissionsToReviewByStudent = async (assignmentID) => {
  try {
    const json = convertToJson_AddToken()
    const userID = localStorage.getItem('userID');
    const response = await axios.post(`${url}:${STUDENT_PORT}/api/student/${userID}/assignment/${assignmentID}/reviews`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getTeamIdByStudentAndCourse = async (courseID) => {
  try {
    const json = convertToJson_AddToken()
    const userID = localStorage.getItem('userID');
    const response = await axios.post(`${url}:${STUDENT_PORT}/api/student/${userID}/course/${courseID}/teamId`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const postNewSolutionByStudent = async (data) => {
  try {
    const json = convertToJson_AddToken(data)
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/solution`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const postNewPeerReviewByStudent = async (data) => {
  try {
    const json = convertToJson_AddToken(data)
    const response = await axios.post(`${url}:${ULTILITY_PORT}/api/review`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getTeamsByStudent = async () => {
  try {
    const json = convertToJson_AddToken()
    const userID = localStorage.getItem('userID');
    const response = await axios.post(`${url}:${STUDENT_PORT}/api/student/${userID}/course/team/student`, json);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const loginAuth = async (tokenId) => {
  console.log(tokenId)
  try {
    const response = await axios.post(`${url}:${LOGIN_PORT}/api/login`, tokenId);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


