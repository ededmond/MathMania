import axios from "axios";

export default {
  // Gets user info
  getUser: function() {
    return axios.get('/auth/user');
  },
  //Gets students
  getStudents: function() {
    return axios.get('/auth/students');
  },
  updateStudent: function(id,difficulty) {
    return axios.post('/auth/students/'+id,{difficulty})
  },
  // Logs the user out
  logout: function() {
    return axios.post('/auth/logout');
  },
  // Log the user in
  login: function(username, password) {
    return axios.post('/auth/login', { username, password });
  },
  // New user registration
  signup: function(userData) {
    return axios.post('/auth/signup', userData);
  }
};
