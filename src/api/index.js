import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/"
});

export const savePost = post => api.post("/create", { post });
export const getPost = id => api.get(`/posts/${id}`);
export const removePost = id => api.delete(`/remove/${id}`);
export const editPost = (_id, updates) =>
  api.patch(`/edit/${_id}`, { _id, updates });
export const getAllPosts = () => api.get("/posts");

export default { savePost, getPost, removePost, editPost, getAllPosts };
