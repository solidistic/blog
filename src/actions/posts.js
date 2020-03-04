import api from "../api/index";

export const populatePosts = posts => ({
  type: "POPULATE_POSTS",
  posts
});

export const addPost = post => ({
  type: "ADD_POST",
  post
});

export const startAddPost = async (post = {}) => {
  try {
    const res = await api.savePost(post);
    if (res.status !== 200) throw new Error("Unable to save post to database");
    return addPost(res.data.post);
  } catch (e) {
    console.log("Error in posts actions", e);
  }
};

export const removeAllFromUser = id => ({
  type: "REMOVE_ALL_FROM_USER",
  id
});

export const removePost = ({ _id: id }) => ({
  type: "REMOVE_POST",
  id
});

export const startRemovePost = async post => {
  try {
    await api.removePost(post._id);
    return removePost(post);
  } catch (e) {
    console.log("Error in startRemovePost action", e);
  }
};

export const editPost = (id, updates) => ({
  type: "EDIT_POST",
  id,
  updates
});

export const startEditPost = async (id, updates) => {
  try {
    const res = await api.editPost(id, updates);
    console.log("STARTEDITPOST", res);
    const { author, createdAt, comments, ...updatedPost } = res.data.post;
    return editPost(id, updatedPost);
  } catch (e) {
    console.log("Error in startEditPost action", e);
  }
};
