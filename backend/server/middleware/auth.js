const User = require("../../database/models/user");

module.exports = async (req, res, next) => {
  console.log(req.signedCookies);
  try {
    if (!req.signedCookies.id && !req.signedCookies.jwt_token)
      throw new Error();

    const user = await User.findById(req.signedCookies.id);

    console.log("user", user);

    if (!user) throw new Error();

    const tokenFound = user.tokens.find(
      (index) => index.token === req.signedCookies.jwt_token
    );

    console.log("token found", tokenFound);

    if (!tokenFound) throw new Error();

    const [validToken, message] = await user.validateToken(
      req.signedCookies.jwt_token
    );

    console.log("valid", validToken);

    if (!validToken) throw new Error(message);

    req.user = user;

    return next();
  } catch (e) {
    res
      .clearCookie("id")
      .clearCookie("jwt_token")
      .status(401)
      .json({ message: "Please authenticate" });
  }
};
