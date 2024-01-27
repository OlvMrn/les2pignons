const argon2 = require("argon2");

const registerUser = async (user) => {
  const hashedPassword = await argon2.hash(user.password);

  const newUser = { email: user.email, password: hashedPassword };

  return newUser;
};

module.exports = { registerUser };
