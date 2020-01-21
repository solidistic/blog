const User = require("../../database/models/user");

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.id && !req.cookies.jwt_token) throw new Error();
    
    const user = await User.findById(req.cookies.id);

    if (!user) throw new Error();

    const tokenFound = user.tokens.find(
      index => index.token === req.cookies.jwt_token
    );

    if (!tokenFound) throw new Error();

    return next();
  } catch (e) {
    res.status(401).json({ message: "Please authenticate" });
  }
};
