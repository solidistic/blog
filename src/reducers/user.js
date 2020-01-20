export default (state = undefined, action) => {
  console.log("ACTION OBJECT", action);
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user
      };
    case "LOGOUT":
      return undefined;
    default:
      throw new Error("Error in user reducer");
  }
};
