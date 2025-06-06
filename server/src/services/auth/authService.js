const { generateToken } = require('../../utils/jwt');
const { hashPassword, comparePasswords } = require('../../utils/hashUtils');
const { User } = require('../../models');

const registerUser = async (data) => {
  const { fullName, username, email, password, role } = data;
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    fullName,
    username,
    email,
    password: hashedPassword,
    role
  });

  const token = generateToken({ id: user.id, role: user.role });

  return {
    status: 201,
    token,
    body: {
      message: 'User registered and logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    }
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await comparePasswords(password, user.password))) {
    return { status: 401, body: { message: 'Invalid credentials' } };
  }

  const token = generateToken({ id: user.id, role: user.role });

  return {
    status: 200,
    token,
    body: { 
      message: 'User logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    }
  };
};

module.exports = { registerUser, loginUser };
