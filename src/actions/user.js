import api from "../api/index";

export const login = user => ({
  type: "LOGIN",
  user
});

export const startLogin = async ({ username, password }) => {
  const response = await api.login(username, password);
  console.log("startlogin", response);
  if (response.status !== 200) return null;
  return login({ username, password });
};

export const logout = () => ({
  type: "LOGOUT"
})