import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  // Updates a book in the database
  UpdateBook: function(id, bookData) {
    return axios.put("/api/books/" + id, bookData);
  },

  // Gets all departments
  getDepartments: function() {
    return axios.get("/api/departments");
  },
  // Gets the department with the given id
  getDepartment: function(id) {
    return axios.get("/api/departments/" + id);
  },
  // Deletes the department with the given id
  deleteDepartment: function(id) {
    return axios.delete("/api/departments/" + id);
  },
  // Saves a department to the database
  saveDepartment: function(bookData) {
    return axios.post("/api/departments", bookData);
  },
  // Updates a department in the database
  UpdateDepartment: function(id, bookData) {
    return axios.put("/api/departments/" + id, bookData);
  },

  getCurrentUser: function(){
    return axios.get("/api/getUser");
  },

  signUp: (newUser) => {
    return axios.post("/api/signup", newUser)
  },

  login: (user) => {
    return axios.post("/api/login", user)
  },

  logout: () => {
    return axios.get("/api/logout");
  },




};
