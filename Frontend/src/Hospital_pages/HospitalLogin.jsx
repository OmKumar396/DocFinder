import React, { useState, useContext } from 'react';
import { RiHospitalLine, RiLockPasswordLine } from 'react-icons/ri';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Redesigned IconInput component with password visibility
function IconInput({ icon, placeholder, type, value, onChange, name, isPassword, showPassword, onToggleVisibility }) {
  return (
    <div className="relative border-b-2 border-gray-300 focus-within:border-indigo-600 transition">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xl text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-12 pl-10 pr-12 text-lg bg-transparent border-none focus:outline-none focus:ring-0"
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

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ registrationNumber: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://doc-finder-ten.vercel.app/api/login/hospital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const hospital = data.hospital;
      if (!hospital || !hospital._id) {
        throw new Error("Hospital ID not found in response");
      }
      
      toast.success('Login successful! Redirecting to your dashboard.');
      // The user object for context should include role
      login({ ...hospital, role: 'hospital' }); 
      localStorage.setItem('hospitalId', JSON.stringify(hospital)); // Store the whole object
      localStorage.setItem('token', data.token); // Store token
      navigate('/hospital-home');

    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.message || "Invalid registration number or password");
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
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2942&auto=format&fit=crop" 
                alt="Hospital corridor" 
                className="absolute h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            <div className="relative z-10 p-12 flex flex-col justify-end text-white">
                <h2 className="text-4xl font-bold leading-tight">Hospital Management Portal</h2>
                <p className="mt-4 text-lg text-gray-200">Manage your facility's bed availability, appointments, and ambulance services with efficiency and ease.</p>
            </div>
        </div>

        {/* Right Panel (Login Form) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12">
            <div className="w-full max-w-md">
                <Link to="/" className='flex items-center gap-2 mb-10'>
                    <img src="/src/images/DocFinder.png" alt="Logo" className="w-10 h-10" />
                    <span className="text-2xl font-bold text-gray-800">DocFinder</span>
                </Link>

                <motion.div variants={formVariants} initial="hidden" animate="visible">
                    <motion.h1 variants={itemVariants} className='text-4xl font-bold text-gray-900'>Hospital Portal Login</motion.h1>
                    <motion.p variants={itemVariants} className='text-gray-600 mt-2'>Please enter your credentials to continue.</motion.p>
                    
                    <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                        <motion.div variants={itemVariants}>
                            <IconInput 
                                icon={<RiHospitalLine />} 
                                placeholder="Registration Number" 
                                type="text" 
                                value={form.registrationNumber} 
                                onChange={handleChange} 
                                name="registrationNumber" 
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <IconInput 
                                icon={<RiLockPasswordLine />} 
                                placeholder="Password" 
                                type={showPassword ? 'text' : 'password'}
                                value={form.password} 
                                onChange={handleChange} 
                                name="password" 
                                isPassword={true}
                                showPassword={showPassword}
                                onToggleVisibility={() => setShowPassword(!showPassword)}
                            />
                        </motion.div>
            
                        <motion.div variants={itemVariants} className='flex justify-between items-center text-sm'>
                          <label className='text-gray-600 flex items-center'>
                            <input type="checkbox" className='mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500' /> Remember me
                          </label>
                          <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-800'>Forgot Password?</a>
                        </motion.div>
            
                        <motion.div variants={itemVariants}>
                            <button type="submit" className='w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg hover:bg-indigo-700 transition' disabled={loading}>
                              {loading ? 'logging in...' : 'Log In'}
                            </button>
                        </motion.div>
                    </form>
        
                    <motion.p variants={itemVariants} className='text-center text-sm text-gray-600 mt-8'>
                      Are you a patient?{' '}
                      <Link to='/login' className='font-semibold text-indigo-600 hover:text-indigo-800'>Login Here</Link>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    </div>
  );
};

export default HospitalLogin;
