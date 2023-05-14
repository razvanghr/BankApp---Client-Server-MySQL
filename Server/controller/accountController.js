const bcrypt = require("bcrypt");

const accountRegister = async (req, res) => {
  const { firstName, lastName, email, password, pin, dateOfBirth } = req.body;
  const cryptPassword = await bcrypt.hash(password, 5);
  const cryptPIN = await bcrypt.hash(pin, 5);

  console.log(cryptPIN);
};

const accountLogin = async (req, res) => {
  const { email, password, pin } = req.body;
};

module.exports = { accountRegister, accountLogin };
