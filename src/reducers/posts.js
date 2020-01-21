export default (state = [], action) => {
  switch (action.type) {
    case "POPULATE_POSTS":
      return action.posts;
    case "ADD_POST":
      return [...state, action.post];
    case "REMOVE_POST":
      return state.filter(post => post._id !== action.id);
    case "EDIT_POST":
      return state.map(post => {
        if (post._id === action.id) {
          return { ...post, ...action.updates };
        } else {
          return post;
        }
      });
    case "ADD_COMMENT":
      return state.map(post => {
        if (post._id === action.comment.post._id) {
          post.comments.push(action.comment);
          return post;
        } else {
          return post;
        }
      });
    default:
      throw new Error("Error in posts reducer");
  }
};
