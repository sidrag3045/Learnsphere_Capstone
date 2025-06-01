const authService = require('../services/authService');

const register = async (req, res) => {
  const result = await authService.registerUser(req.body);

  res.cookie('token', result.token, 
    {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    });

  return res.status(result.status).json(result.body);
};

const login = async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
  return res.status(result.status).json(result.body);
};

const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
