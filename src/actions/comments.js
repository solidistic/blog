import api from "../api/index";

export const addComment = comment => ({
  type: "ADD_COMMENT",
  comment
});

export const startAddComment = async commentData => {
  try {
    const res = await api.saveComment(commentData);
    console.log("SAVE COMMENT RESPONSE", res);
    if (res.status !== 200) throw new Error(res.error);
    return addComment(res.data.comment);
  } catch (error) {
    return { error };
  }
};

export const removeComment = ({ commentId, postId }) => ({
  type: "REMOVE_COMMENT",
  commentId,
  postId
});

export const startRemoveComment = async comment => {
  try {
    console.log("COMMENT", comment);
    const res = await api.removeComment(comment);
    console.log(res);
    if (res.status !== 200) throw new Error(res.error);
    const asd = removeComment(comment);
    console.log("REMOVECOMMENT", asd);
    return asd;
  } catch (error) {
    return { error };
  }
};
