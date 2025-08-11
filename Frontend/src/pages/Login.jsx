import React, { useState, useContext } from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { AuthContext } from '../context/AuthContext';
import LoginIlu from '../images/Login.png';
import { toast } from 'react-toastify';

// Redesigned IconInput component
function IconInput({ icon, placeholder, type, value, onChange, name, isPassword, showPassword, onToggleVisibility }) {
  return (
    <div className="relative group mt-4">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-indigo-600 transition">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-14 pl-14 pr-12 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={name}
        required
      />
      {isPassword && (
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-0 h-full px-4 text-gray-500 hover:text-gray-700"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
        </button>
      )}
    </div>
  );
}

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalMessage, setModalMessage] = useState({ text: '', type: '' });

  // Animation Refs
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: illuRef, inView: illuInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      
      toast.success('Login successful! Redirecting...');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      login(data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalLogin = () => {
    navigate('/hospital-login');
  };

  const sendOtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      setModalMessage({ text: data.message || 'OTP sent to email!', type: 'success' });
      setOtpSent(true);
    } catch (err) {
      setModalMessage({ text: err.message, type: 'error' });
    }
  };

  const verifyOtpAndReset = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail, otp: otpCode, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to reset password');
      toast.success('Password reset successful! Please log in.');
      setShowForgotModal(false);
      // Reset state
      setOtpSent(false); setOtpCode(''); setNewPassword(''); setOtpEmail(''); setModalMessage({text:'', type:''});
    } catch (err) {
      setModalMessage({ text: err.message, type: 'error' });
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    // Delayed reset to allow for fade-out animation
    setTimeout(() => {
        setOtpSent(false); setOtpEmail(''); setOtpCode(''); setNewPassword(''); setModalMessage({text:'', type:''});
    }, 300);
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-100 p-4'>
      <div className='w-full max-w-5xl flex rounded-2xl shadow-2xl bg-white overflow-hidden'>

        {/* Login Form Section */}
        <div
          ref={formRef}
          className={`w-full lg:w-1/2 p-8 sm:p-12 transition-all duration-1000 ease-out ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className='flex items-center gap-2 mb-8'>
            <img src="/src/images/DocFinder.png" alt="Logo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-gray-800">DocFinder</span>
          </div>

          <h1 className='text-3xl font-bold text-gray-900'>Login to your Account</h1>
          <p className='text-gray-600 mt-2'>Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <IconInput placeholder="Email" type="email" value={form.email} onChange={handleChange} name="email" icon={<MdOutlineMailOutline />} />
            <IconInput 
                placeholder="Password" 
                type={showPassword ? 'text' : 'password'} 
                value={form.password} 
                onChange={handleChange} 
                name="password" 
                icon={<RiLockPasswordLine />}
                isPassword={true}
                showPassword={showPassword}
                onToggleVisibility={() => setShowPassword(!showPassword)}
            />

            <div className='flex justify-between items-center text-sm'>
              <label className='text-gray-600 flex items-center'>
                <input type="checkbox" className='mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500' /> Remember me
              </label>
              <button type="button" onClick={() => setShowForgotModal(true)} className='font-semibold text-indigo-600 hover:text-indigo-800'>
                Forgot Password?
              </button>
            </div>

            <button type="submit" className='w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold py-3.5 rounded-lg hover:from-indigo-700 hover:to-blue-600 transition duration-300 transform hover:scale-105 shadow-lg' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className='text-center text-sm text-gray-600 mt-6'>
            Don't have an account?{' '}
            <Link to='/signup' className='font-semibold text-indigo-600 hover:text-indigo-800'>Sign up</Link>
          </p>
          
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={handleHospitalLogin}
            className='w-full border-2 border-indigo-600 text-indigo-600 font-bold py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition'
          >
            Login as Hospital
          </button>
        </div>

        {/* Illustration Section */}
        <div
          ref={illuRef}
          className={`hidden lg:flex w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-1000 ease-out delay-200 flex-col justify-center items-center p-12 text-center ${illuInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={LoginIlu} alt='Login Illustration' className='w-full max-w-sm' />
          <h2 className='text-white text-3xl font-bold mt-8'>Seamless Access to Healthcare</h2>
          <p className='text-gray-300 mt-4 max-w-xs'>Your trusted partner in finding and securing medical care instantly.</p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Reset Password</h2>
            {modalMessage.text && (
                <p className={`mb-4 text-sm font-semibold text-center p-2 rounded-md ${modalMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{modalMessage.text}</p>
            )}
            {!otpSent ? (
                <>
                <p className="text-gray-600 mb-6">Enter your email address and we'll send you an OTP to reset your password.</p>
                <input
                    type='email'
                    placeholder='name@example.com'
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    className='w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-indigo-500'
                />
                </>
            ) : (
              <div className="space-y-4">
                <input
                  type='text'
                  placeholder='Enter 6-digit OTP'
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-indigo-500'
                />
                <input
                  type='password'
                  placeholder='Enter new password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-indigo-500'
                />
              </div>
            )}

            <div className='flex justify-end gap-4 mt-8'>
              <button onClick={closeForgotModal} className='px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold transition'>
                Cancel
              </button>
              <button
                onClick={otpSent ? verifyOtpAndReset : sendOtp}
                className='px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition'
              >
                {otpSent ? 'Reset Password' : 'Send OTP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;