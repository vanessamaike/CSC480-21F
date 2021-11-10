import axios from "axios";
export const getCoursesByProfessor = async () => {
  try {
    const response = await axios.get("http://localhost:3000/courses");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getTeamsByProfessor = async () => {
    try {
      const response = await axios.get("http://localhost:3000/courses");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getAssignmentByProfessor = async () => {
    try {
      const response = await axios.get("http://192.168.1.106:9080/api/professor/54411/course/assignment");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getCoursesByStudent = async () => {
    try {
      const response = await axios.get("http://192.168.1.106:9080/api/course");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getAssignmentByStudent = async () => {
    try {
      const response = await axios.get("http://192.168.1.106:9080/api/student/54411/course/assignment");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}