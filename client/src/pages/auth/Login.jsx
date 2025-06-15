import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../store/auth/test';
import { useNavigate } from 'react-router-dom';
import AuthNavbar from '../../components/AuthNavbar';
import { Link } from 'react-router-dom';
import loginIllustration from '../../assets/illustration.svg';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk(form)).unwrap();
      navigate('/dashboard/student/explore');
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div>
      <AuthNavbar/>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
          {/* Optional Left Illustration */}
          <div className="hidden md:flex w-1/2 bg-gray-50 justify-center items-center p-8">
            <img src={loginIllustration} alt="login visual" className="max-h-[400px]" />
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to your account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
              >
                Continue with email
              </button>
            </form>

            <div className="mt-6 text-sm text-center text-gray-600">
              Don’t have an account?{' '}
              <Link to="/register" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
