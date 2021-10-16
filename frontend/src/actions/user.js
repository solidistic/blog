import api from "../api/index";

export const login = user => ({
  type: "LOGIN",
  user
});

export const startLogin = async ({ username, password } = {}) => {
  let res;
  if (username && password) res = await api.login(username, password);
  else res = await api.login();

  console.log("startLogin", res);

  const { password: pw, tokens, ...user } = res.data.user;
  const privatePosts = res.data.privatePosts.posts;

  if (res.status !== 200) return null;

  return [login(user), privatePosts];
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startRemoveUser = async user => {
  const res = await api.removeUser();
  if (res.status !== 200) throw new Error();
  return res.data.id;
};

export const updateUser = updates => ({
  type: "UPDATE_USER",
  updates
});

export const startUpdateUser = async (id, updates, password) => {
  try {
    const res = await api.updateUser(id, updates, password);
    const { password: pw, ...user } = res.data.user;

    if (res.status !== 200) throw new Error();

    return updateUser(user);
  } catch (error) {
    return new Error(error);
  }
};
