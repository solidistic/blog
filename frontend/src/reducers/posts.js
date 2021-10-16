export default (state = [], action) => {
  switch (action.type) {
    case "POPULATE_POSTS":
      return action.posts;
    case "ADD_POST":
      return [...state, action.post];
    case "REMOVE_POST":
      return state.filter(post => post._id !== action.id);
    case "REMOVE_ALL_FROM_USER":
      return state.filter(post => post.author._id !== action.id);
    case "EDIT_POST":
      return state.map(post => {
        if (post._id === action.id) {
          return { ...post, ...action.updates };
        } else {
          return post;
        }
      });
    case "ADD_COMMENT": {
      console.log("ADD COMMENT REDUCER", action.comment);
      return state.map(post => {
        if (post._id === action.comment.post._id) {
          post.comments.push(action.comment);
          return post;
        } else {
          return post;
        }
      });
    }
    case "REMOVE_COMMENT": {
      return state.map(post => {
        if (post._id === action.postId) {
          post.comments = post.comments.filter(
            comment => comment._id !== action.commentId
          );
          return post;
        }
        return post;
      });
    }
    case "TOGGLE_LIKE": {
      return state.map(post => {
        if (post._id === action.postId) {
          if (post.likes.users.includes(action.userId)) {
            post.likes.users = post.likes.users.filter(
              id => id !== action.userId
            );
          } else {
            post.likes.users.push(action.userId);
          }
        }
        post.likes.count = post.likes.users.length;
        return post;
      });
    }
    default:
      throw new Error("Error in posts reducer");
  }
};
