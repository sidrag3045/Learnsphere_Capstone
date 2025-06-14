const { registerUserService, loginUserService } = require('../services/auth/authService');
const { User } = require('../models'); 

const register = async (req, res) => {
  const result = await registerUserService(req.body);

  res.cookie('token', result.token, 
    {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });

  return res.status(result.status).json(result.body);
};

const login = async (req, res) => {
  const result = await loginUserService(req.body);
  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  });
  return res.status(result.status).json(result.body);
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findByPk(userId, {
      attributes: ['id', 'fullName', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log('Current user:', user.toJSON());
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout, getCurrentUser };
