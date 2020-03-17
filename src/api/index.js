import axios from "axios";

axios.defaults.timeout = 10000;

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
export const getPrivatePosts = id => api.get(`/backend/private/${id}`);
export const toggleLike = (postId, userId) =>
  api
    .patch(`/backend/posts/likes/${postId}`, { userId })
    .catch(e => e.response);

// Comments
export const saveComment = ({ id, ...comment }) =>
  api
    .post("/backend/posts/comments/create", { comment, id })
    .catch(e => e.response);
export const removeComment = ({ commentId, postId }) =>
  api.patch("/backend/posts/comments/remove", { commentId, postId });

// User
export const getUserById = id => api.get(`/backend/users/${id}`).catch(e => e);
export const removeUser = () => api.post("/backend/users/remove");
export const createUser = (user, isPublic) =>
  api.post("/backend/signup", { user, isPublic }).catch(e => e.response);
export const updateUser = (id, updates, password) =>
  api.patch("/backend/users/update", { id, updates, password });

// Authentication
export const login = (username, password) =>
  api.post("/backend/login", { username, password });
export const logout = () => api.post("/backend/logout");
export const signup = (username, password) =>
  api
    .post("/backend/signup", { username, password })
    .then(res => console.log(res))
    .catch(e => {
      console.log("from api:", e.response);
      return e.response;
    });

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
  getPrivatePosts,
  createUser,
  removeUser,
  toggleLike,
  updateUser,
  login,
  logout,
  signup
};
