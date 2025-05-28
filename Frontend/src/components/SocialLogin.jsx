import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

const SocialLogin = () => {
  return (
    <div className="space-y-4">
      <a
        href="http://localhost:5000/api/auth/google"
        className="w-full flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
      >
        <FaGoogle className="mr-3" />
        Sign in with Google
      </a>
      
      <a
        href="http://localhost:5000/api/auth/github"
        className="w-full flex items-center justify-center px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-medium"
      >
        <FaGithub className="mr-3" />
        Sign in with GitHub
      </a>
      
      <a
        href="http://localhost:5000/api/auth/facebook"
        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        <FaFacebook className="mr-3" />
        Sign in with Facebook
      </a>
    </div>
  );
};

export default SocialLogin;