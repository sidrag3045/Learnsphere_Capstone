import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../store/auth/test';
import AuthNavBar from '../../components/AuthNavbar';
import registerIllustration from '../../assets/illustration.svg';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'student'
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerThunk(form)).unwrap();
      navigate('/explore');
    } catch (err) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div>
      <AuthNavBar/>
      <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        {/* Optional Left Illustration */}
        <div className="hidden md:flex w-1/2 bg-gray-50 justify-center items-center p-8">
          <img src={registerIllustration} alt="signup visual" className="max-h-[400px]" />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign up with email</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
            >
              Continue with email
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:underline">Log in</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
