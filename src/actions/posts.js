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
    console.log("Error in startEditPost action", e);
  }
};

export const addComment = comment => ({
  type: "ADD_COMMENT",
  comment
});

export const startAddComment = async commentData => {
  try {
    const res = await api.saveComment(commentData);
    if (res.status !== 200) throw new Error();
    return addComment(res.data.comment);
  } catch (e) {
    console.log(e);
  }
};
