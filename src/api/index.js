import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true
});

api.defaults.timeout = 1000000;

// Post
export const savePost = post =>
  api.post("/posts/create", { post }).catch(e => console.log("AXIOS", e));
export const getPost = id => api.get(`/posts/${id}`);
export const removePost = id => api.delete(`/posts/remove/${id}`);
export const editPost = (_id, updates) =>
  api.patch(`/posts/edit/${_id}`, { updates });
export const getAllPosts = () => api.get("/posts/all");

// Comments
export const saveComment = ({ id, ...comment }) =>
  api
    .post("/posts/comments/create", { comment, id })
    .catch(e => console.log("AXIOS", e));

// User
export const getUserById = id => api.get(`/users/${id}`);
export const removeUser = () => api.post("/users/remove");

// Authentication
export const login = (username, password) =>
  api.post("/login", { username, password });
export const logout = () => api.post("/logout");
export const signup = (username, password) =>
  api.post("/signup", { username, password });

export default {
  savePost,
  saveComment,
  getPost,
  removePost,
  editPost,
  getAllPosts,
  getUserById,
  removeUser,
  login,
  logout,
  signup
};
