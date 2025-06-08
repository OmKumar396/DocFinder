import React, { useState } from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useInView } from 'react-intersection-observer';

function IconInput({ children, placeholder, type, value, onChange, name }) {
  return (
    <div className='flex items-center w-full relative h-12 border border-gray-50 rounded-lg mt-4 focus-within:ring-2 focus-within:ring-[#ff8c00] focus-within:border-[#ff8c00]'>
      <div className='flex w-14 absolute justify-center items-center'>
        <span className="text-xl opacity-80 text-gray-500">{children}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-full pl-14 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c00]"
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={name}
      />
    </div>
  );
}

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  // Animation hooks for transitions
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: illuRef, inView: illuInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (ready for backend integration)
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with backend API call
    // Example:
    // await fetch('/api/signup', { method: 'POST', body: JSON.stringify(form) })
    alert(`Signed up as: ${form.username}`);
  };

  return (
    <div className='flex justify-center items-center w-full h-screen bg-white'>
      <div className='form-container overflow-hidden flex justify-between rounded-2xl shadow-2xl w-11/12 max-w-screen-xl'>
        {/* Left Side (Form) with transition */}
        <div
          ref={formRef}
          className={`bg-orange-50 w-1/2 px-16 py-14 transition-all duration-1000 ease-out ${
            formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='logo-wrap flex items-center gap-x-2'>
            <img src='src/images/DocFinder.png' alt="logo" className="w-13 h-13"/>
            <span className="text-lg font-bold text-gray-70 mt-2">DocFinder</span>
          </div>
          <h1 className='text-xl mt-6 font-semibold text-black opacity-80'>Create Account!</h1>
          <p className='text-black opacity-60 mt-3'>Add your information to get started!</p> 
          
          <form onSubmit={handleSubmit}>
            <div className='bg-white rounded-2xl'>
              <IconInput
                placeholder="Username"
                type="text"
                value={form.username}
                onChange={handleChange}
                name="username"
              >
                <FaRegUser />
              </IconInput>
            </div>
            <div className='bg-white rounded-2xl'>
              <IconInput
                placeholder="Email"
                type="text"
                value={form.email}
                onChange={handleChange}
                name="email"
              >
                <MdAlternateEmail />
              </IconInput>
            </div>
            <div className='bg-white rounded-2xl'>   
              <IconInput
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={handleChange}
                name="password"
              >
                <RiLockPasswordLine/>
              </IconInput>
            </div>
            <div className='flex justify-between items-center mt-3'>
              <div className='item'>
                <input type="checkbox" />
                <span className='text-neutral-500 '> Remember me</span>
              </div>
              <div>
                <a href='' className='text-[#ff8c00]'>Forgot Password?</a>
              </div>
            </div>
            <p className='text-center mt-9'>Already have an account? 
              <a href='/login' className='text-[#ff8c00]'> Login</a>
            </p>
            <button className='bg-[#ff8c00] text-white w-full py-4 rounded mt-8 text-xl'>Signup</button>
          </form>
        </div>
        {/* Right Side (Illustration) with transition */}
        <div
          ref={illuRef}
          className={`w-1/2 flex flex-col justify-center items-center bg-gradient-to-tr from-[#febd76] to-[#ff8c00] transition-all duration-1000 ease-out delay-200 ${
            illuInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <div className='illu-wrap'>
            <img src='src/images/Signup.png' alt="Login Illustration" className="w-cover h-120"/>
          </div>
          <div className='bottom-wrap text-center mt-4'>
            <h1 className='text-white text-2xl font-bold mb-1'>Welcome to CureNet</h1>
            <p className='text-white mb-6'>Join us for a better healthcare experience</p>
          </div>
          <div className='dots flex gap-x-3 mb-3'>
            <div className='dot w-2 h-2 bg-white rounded-full'></div>
            <div className='dot w-2 h-2 bg-white rounded-full'></div>
            <div className='dot w-2 h-2 bg-white rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;