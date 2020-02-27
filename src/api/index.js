import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? `https://solidistic-blog.herokuapp.com/`
    : "http://localhost:8080/";

const api = axios.create({
  baseURL: url,
  withCredentials: true
});

// Images
export const getImages = () => api.get("/backend/images/all");

// Post
export const savePost = post =>
  api.post("/backend/posts/create", post, {
    headers: { "Content-type": "multipart/form-data" }
  });
export const getPost = id => api.get(`/backend/posts/${id}`);
export const removePost = id => api.delete(`/backend/posts/remove/${id}`);
export const editPost = (_id, updates) =>
  api.patch(`/backend/posts/edit/${_id}`, updates, {
    headers: { "Content-type": "multipart/form-data" }
  });
export const getAllPosts = () => api.get("/backend/posts/all");

// Comments
export const saveComment = ({ id, ...comment }) =>
  api
    .post("/backend/posts/comments/create", { comment, id })
    .catch(e => console.log("AXIOS", e));
export const removeComment = ({ commentId, postId }) =>
  api.patch("/backend/posts/comments/remove", { commentId, postId });

// User
export const getUserById = id => api.get(`/backend/users/${id}`);
export const removeUser = () => api.post("/backend/users/remove");
export const createUser = user => api.post("/backend/signup", { user });
export const updateUser = (id, updates, password) =>
  api.patch("/backend/users/update", { id, updates, password });

// Authentication
export const login = (username, password) =>
  api.post("/backend/login", { username, password });
export const logout = () => api.post("/backend/logout");
export const signup = (username, password) =>
  api.post("/backend/signup", { username, password });

export default {
  editPost,
  savePost,
  saveComment,
  removePost,
  removeComment,
  getPost,
  getImages,
  getAllPosts,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  login,
  logout,
  signup
};
