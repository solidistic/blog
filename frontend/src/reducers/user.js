export default (state = undefined, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...action.user
      };
    case "LOGOUT":
      return undefined;
    case "UPDATE_USER":
      return {
        ...state.user,
        ...action.updates
      };
    default:
      throw new Error("Error in user reducer");
  }
};
