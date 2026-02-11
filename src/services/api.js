// import axios from "axios";

// const API_URL = "http://localhost:5000/books";

// export const getBooks = () => axios.get(API_URL);
// export const getBookById = (id) => axios.get(`${API_URL}/${id}`);
// export const addBook = (data) => axios.post(API_URL, data);
// export const updateBook = (id, data) => axios.put(`${API_URL}/${id}`, data);
// export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);



import axios from "axios";

const API_URL = "http://localhost:8080/books";

export const getBooks = () => axios.get(`${API_URL}/books`);
export const addBook = (book) => axios.post(`${API_URL}/books`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/books/${id}`);
export const updateBook = (id, book) =>
  axios.put(`${API_URL}/books/${id}`, book);
export const getBookById = (id) => axios.get(`${API_URL}/books/${id}`);
