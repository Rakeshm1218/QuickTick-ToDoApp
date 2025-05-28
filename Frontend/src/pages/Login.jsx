import SocialLogin from '../components/SocialLogin';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#27c6d9]">Sign in to your account</h2>
        </div>
        <div className="mt-8 space-y-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;