import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true
});

// Post
export const savePost = post => api.post("/posts/create", { post });
export const getPost = id => api.get(`/posts/${id}`);
export const removePost = id => api.delete(`/posts/remove/${id}`);
export const editPost = (_id, updates) =>
  api.patch(`/posts/edit/${_id}`, { updates });
export const getAllPosts = () => api.get("/posts/all");

// User
export const getUserById = id => api.get(`/users/${id}`);

// Authentication
export const login = (username, password) =>
  api.post("/login", { username, password });
export const logout = () => api.post("/logout");
export const signup = (username, password) =>
  api.post("/signup", { username, password });

export default {
  savePost,
  getPost,
  removePost,
  editPost,
  getAllPosts,
  getUserById,
  login,
  logout,
  signup
};
