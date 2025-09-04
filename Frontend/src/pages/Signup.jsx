import React, { useState } from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser, FaBuilding } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'; // 1. Import eye icons
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Updated IconInput to support password visibility
function IconInput({ icon, placeholder, type, value, onChange, name, isPassword, showPassword, onToggleVisibility }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-cyan-600 transition">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-14 pl-14 pr-12 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
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
          className="absolute right-0 h-full px-4 text-gray-500 hover:text-gray-800"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
        </button>
      )}
    </div>
  );
}

const Signup = () => {
  const [signupType, setSignupType] = useState('user');
  const [form, setForm] = useState({ username: '', email: '', password: '', registrationNumber: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 2. State for password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = signupType === 'user' ? 'signup/user' : 'signup/hospital';
    const payload = signupType === 'user'
      ? { username: form.username, email: form.email, password: form.password }
      : { registrationNumber: form.registrationNumber, password: form.password };

    try {
      const response = await fetch(`https://doc-finder-ten.vercel.app/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      toast.success(`${signupType === 'user' ? 'User' : 'Hospital'} registered successfully! Please log in.`);
      navigate(signupType === 'user' ? '/login' : '/hospital-login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className='flex min-h-screen bg-white'>
        {/* Left Panel (Illustration) */}
        <div className="hidden lg:flex w-1/2 relative">
            <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2832&auto=format&fit=crop" 
                alt="Hospital interior" 
                className="absolute h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            <div className="relative z-10 p-12 flex flex-col justify-end text-white">
                <h2 className="text-4xl font-bold leading-tight">Your Partner in Health.</h2>
                <p className="mt-4 text-lg text-gray-200">Join our network to connect with patients and providers, simplifying healthcare for everyone.</p>
            </div>
        </div>

        {/* Right Panel (Signup Form) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12">
            <div className="w-full max-w-md">
                <Link to="/" className='flex items-center gap-2 mb-8'>
                    <img src="/src/images/DocFinder.png" alt="Logo" className="w-10 h-10" />
                    <span className="text-2xl font-bold text-gray-800">DocFinder</span>
                </Link>

                <motion.div variants={formVariants} initial="hidden" animate="visible">
                    <motion.h1 variants={itemVariants} className='text-4xl font-bold text-gray-900'>Create an Account</motion.h1>
                    <motion.p variants={itemVariants} className='text-gray-600 mt-2'>Begin your journey with us today.</motion.p>

                    {/* Toggle Buttons */}
                    <motion.div variants={itemVariants} className='flex gap-2 mt-8 p-1 bg-slate-100 rounded-lg'>
                        <button
                            onClick={() => setSignupType('user')}
                            className={`w-1/2 py-2.5 rounded-md font-semibold transition ${signupType === 'user' ? 'bg-white text-cyan-700 shadow' : 'text-gray-500'}`}
                        >
                            Patient / User
                        </button>
                        <button
                            onClick={() => setSignupType('hospital')}
                            className={`w-1/2 py-2.5 rounded-md font-semibold transition ${signupType === 'hospital' ? 'bg-white text-cyan-700 shadow' : 'text-gray-500'}`}
                        >
                            Hospital
                        </button>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        {signupType === 'user' ? (
                            <>
                                <motion.div variants={itemVariants}>
                                    <IconInput icon={<FaRegUser />} placeholder="Username" type="text" value={form.username} onChange={handleChange} name="username" />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <IconInput icon={<MdAlternateEmail />} placeholder="Email" type="email" value={form.email} onChange={handleChange} name="email" />
                                </motion.div>
                            </>
                        ) : (
                            <motion.div variants={itemVariants}>
                                <IconInput icon={<FaBuilding />} placeholder="Hospital Registration Number" type="text" value={form.registrationNumber} onChange={handleChange} name="registrationNumber" />
                            </motion.div>
                        )}
                        <motion.div variants={itemVariants}>
                            <IconInput 
                                icon={<RiLockPasswordLine />} 
                                placeholder="Password" 
                                type={showPassword ? 'text' : 'password'} // 3. Dynamic type
                                value={form.password} 
                                onChange={handleChange} 
                                name="password" 
                                isPassword={true}
                                showPassword={showPassword}
                                onToggleVisibility={() => setShowPassword(!showPassword)} // 4. Toggle function
                            />
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <button
                                className='w-full bg-cyan-600 text-white font-bold py-3.5 rounded-lg hover:bg-cyan-700 transition'
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </motion.div>
                    </form>

                    <motion.p variants={itemVariants} className='text-center text-sm text-gray-600 mt-8'>
                        Already have an account?{' '}
                        <Link to='/login' className='font-semibold text-cyan-600 hover:text-cyan-800'>Log in</Link>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    </div>
  );
};

export default Signup;
