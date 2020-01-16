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
    const newPost = await (await api.savePost(post)).data.post;
    return addPost(newPost);
  } catch (e) {
    console.log("Error in posts actions", e);
  }
};

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
    await api.editPost(id, updates);
    return editPost(id, updates);
  } catch (e) {
    console.log("Error in startEditPost actions", e);
  }
};
