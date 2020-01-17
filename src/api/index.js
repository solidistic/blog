import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/"
});

export const savePost = post => api.post("/posts/create", { post });
export const getPost = id => api.get(`/posts/${id}`);
export const removePost = id => api.delete(`/posts/remove/${id}`);
export const editPost = (_id, updates) =>
  api.patch(`/posts/edit/${_id}`, { updates });
export const getAllPosts = () => api.get("/posts/all");

export default { savePost, getPost, removePost, editPost, getAllPosts };
