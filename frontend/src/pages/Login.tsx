import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="order-2 flex items-center justify-center bg-[#FAFAF5] p-6 md:order-1">
        <div className="neo-card w-full max-w-md p-7">
          <span className="sticker mb-3 bg-[#FFD84D]">LOGIN</span>
          <h2 className="font-space text-4xl font-extrabold text-[#1A1A1A]">SIGN IN</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <input
                {...register('email', { required: 'Email is required' })}
                placeholder="Email"
                className="neo-input w-full px-4 py-3"
              />
              {errors.email && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="Password"
                className="neo-input w-full px-4 py-3"
              />
              {errors.password && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.password.message}</p>}
            </div>

            <div className="text-right">
              <a className="text-sm text-gray-500" href="#">Forgot password?</a>
            </div>

            <button className="neo-btn w-full bg-[#2EC4B6] py-3 text-white">SIGN IN</button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Need an account?{' '}
            <Link to="/register" className="font-semibold text-[#00C896]">
              Register
            </Link>
          </p>
        </div>
      </div>

      <div className="order-1 flex flex-col justify-center border-b-[3px] border-black bg-[#1A1A1A] p-10 text-[#FAFAF5] md:order-2 md:border-b-0 md:border-l-[3px]">
        <h1 className="font-space text-5xl font-extrabold leading-tight md:text-6xl">WELCOME BACK</h1>
        <p className="mt-5 text-white/80">Track priorities, ship work faster, and stay focused with one clean workspace.</p>
      </div>
    </div>
  );
};

export default Login;
