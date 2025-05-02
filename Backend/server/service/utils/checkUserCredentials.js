const sequelize = require("../../db/connection");

sequelize

const checkUserExists = async (email) => {
  const query = `select id, email, password from users where email = :email`;

  const [checkUserExist, _] = await sequelize.query(query, {
    raw: true,
    replacements: {
      email,
    },
  });

  if (!checkUserExist || checkUserExist.length == 0) {
    return false;
  }
  return checkUserExist[0];
};

const checkUserNotExist = async (email) => {
  const query = `select email, password from users where email = :email`;

  const [checkUserExist, _] = await sequelize.query(query, {
    raw: true,
    replacements: {
      email,
    },
  });

  if (!checkUserExist || checkUserExist.length == 0) {
    return false;
  }
  return true;
};

const checkPassword = async (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};

// const extractPassword= async

module.exports = { checkUserExists, checkPassword, checkUserNotExist };
