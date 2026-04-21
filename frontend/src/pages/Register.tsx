import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { registerUser } from '../api/auth.api';
import { useAuth } from '../hooks/useAuth';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password });
      await login(data.email, data.password);
      toast.success('Welcome aboard!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col justify-center border-b-[3px] border-black bg-[#1A1A1A] p-10 text-[#FAFAF5] md:border-b-0 md:border-r-[3px]">
        <h1 className="font-space text-5xl font-extrabold leading-tight md:text-6xl">START YOUR JOURNEY</h1>
        <ul className="mt-8 space-y-3 text-base text-white/80">
          <li>- Manage tasks with priorities and status</li>
          <li>- Secure JWT auth with role access</li>
          <li>- Clean dashboards with realtime filters</li>
        </ul>
      </div>

      <div className="flex items-center justify-center bg-[#FAFAF5] p-6">
        <div className="neo-card w-full max-w-md p-7">
          <span className="sticker mb-3 bg-[#FF6B6B] text-white">NEW USER</span>
          <h2 className="font-space text-4xl font-extrabold text-[#1A1A1A]">CREATE ACCOUNT</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <input
                {...register('name', { required: 'Full Name is required', minLength: 2 })}
                placeholder="Full Name"
                className="neo-input w-full px-4 py-3"
              />
              {errors.name && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register('email', { required: 'Email is required' })}
                placeholder="Email"
                className="neo-input w-full px-4 py-3"
              />
              {errors.email && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex gap-2">
                <input
                  {...register('password', { required: 'Password is required', minLength: 8 })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="neo-input w-full px-4 py-3"
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="neo-btn bg-[#FFD84D] px-3">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-[#FF4D4D]">Password must be at least 8 characters</p>}
            </div>
            <div>
              <input
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value, formValues) => value === formValues.password || 'Passwords do not match',
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="neo-input w-full px-4 py-3"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.confirmPassword.message}</p>}
            </div>

            <button className="neo-btn w-full bg-[#2EC4B6] py-3 text-white">CREATE ACCOUNT</button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Already have account?{' '}
            <Link to="/login" className="font-semibold text-[#2EC4B6]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
