import React, { useState } from 'react';
import LoginIlu from "/Users/dineshgurumahapatra/Desktop/FRONTEND/src/images/Login.png";
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';


function IconInput({ children, placeholder, type, value, onChange, name }) {
  return (
    <div className="bg-white flex items-center w-full relative h-12 border border-gray-300 rounded-lg mt-4 focus-within:ring-2 focus-within:ring-[#ff8c00] focus-within:border-[#ff8c00]">
      <div className="icon__wrapper w-14 absolute flex justify-center items-center">
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

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

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
    // await fetch('/api/login', { method: 'POST', body: JSON.stringify(form) })
    alert(`Logging in as user: ${form.email}`);
  };

  // Redirect to hospital login page
  const handleHospitalLogin = () => {
    navigate('/hospital-login');
  };

  return (
    <div className='abcd flex justify-center items-center w-full h-screen bg-white'>
      <div className='form-container overflow-hidden justify-between rounded-2xl flex shadow-2xl border-none w-11/12 max-w-screen-xl bg-orange-50'>
        {/* Form Section with transition */}
        <div
          ref={formRef}
          className={`form-section w-1/2 px-24 py-16 transition-all duration-1000 ease-out ${
            formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/*form section*/}
          <div className='logo-wrap flex justify-left gap-x-1 items-center'>
            <img src='src/images/DocFinder.png' alt="logo" className="w-13 h-13"/>
            <span className="text-lg font-bold text-gray-70 mt-2">DocFinder</span>
          </div>
          <h1 className='text-xl font-semibold text-black mt-6 opacity-80'>Login to your Account</h1>
          <p className='text-black opacity-60 mt-3'>Welcome back! Select method to login </p>

          {/* INPUTS */}
          <form onSubmit={handleSubmit}>
            <IconInput
              placeholder="Email"
              type="text"
              value={form.email}
              onChange={handleChange}
              name="email"
              
            >
              <MdOutlineMailOutline/>
            </IconInput>

            <IconInput
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              name="password"
            >
              <RiLockPasswordLine/>
            </IconInput>

            <div className='flex justify-between items-center mt-3'>
              <div className='item'>
                <input type="checkbox" id="remember" />
                <span className='text-neutral-500 '> Remember me</span>
              </div>
              <div>
                <a href='' className='text-[#ff8c00]'>Forgot Password?</a>
              </div>
            </div>
            <p className='text-center mt-9'>Don't have an account? 
              <a href='/signup' className='text-[#ff8c00]'> Sign up</a>
            </p>
            <button
              type="submit"
              className='bg-[#ff8c00] text-white w-full py-4 rounded mt-8 text-xl'
            >
              Login
            </button>
          </form>
          <button
            onClick={handleHospitalLogin}
            className='bg-white border-2 border-[#ff8c00] text-[#ff8c00] w-full py-4 rounded mt-4 text-xl font-semibold hover:bg-[#ff8c00] hover:text-white transition'
          >
            Login as Hospital
          </button>
        </div>
        
        {/* Illustration Section with transition */}
        <div
          ref={illuRef}
          className={`illustration-section w-1/2 bg-gradient-to-tr from-[#febd76] to-[#ff8c00] transition-all duration-1000 ease-out delay-200 flex flex-col justify-center items-center ${
            illuInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <div className='illu-wrap '>
            <img src={LoginIlu} alt='' className='w-cover h-120'/>
          </div>
          <div className='bottom-sec-wrap text-center'>
            <h2 className='text-white text-2xl font-bold mb-1'>connect with every application</h2>
            <p className='text-white mb-8'>everything you need to know about our application</p>
          </div>
          <div className='dots flex justify-center items-center gap-x-3 mb-2'>
            <div className='dot w-2 h-2 bg-white rounded-2xl block'></div>
            <div className='dot  w-2 h-2 bg-white rounded-2xl block'></div>
            <div className='dot  w-2 h-2 bg-white rounded-2xl block'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;