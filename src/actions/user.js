import api from "../api/index";

export const login = user => ({
  type: "LOGIN",
  user
});

export const startLogin = async ({ username, password }) => {
  const res = await api.login(username, password);
  console.log(res);
  const { password: pw, ...user } = res.data.user;

  if (res.status !== 200) return null;

  return login(user);
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startRemoveUser = async user => {
  const res = await api.removeUser();
  console.log("START REMOVE USER RESPONSE", res);
  if (res.status !== 200) throw new Error();
  return res.data.id;
};
