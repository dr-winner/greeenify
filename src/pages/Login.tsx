
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-xl -translate-x-4 translate-y-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1603178455924-ef33372953bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="Fresh farm produce"
                  className="relative rounded-xl shadow-lg"
                />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h3 className="font-medium text-lg mb-2">Join our community!</h3>
                <p className="text-gray-600">
                  Create an account to enjoy fresh produce direct from local farmers, manage your orders, and receive personalized recommendations.
                </p>
              </div>
            </div>
            
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-heading font-semibold mb-2">Welcome to Greenify</h1>
                <p className="text-gray-600">
                  Sign in to your account or create a new one
                </p>
              </div>
              
              <AuthForm />
              
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  By signing in, you agree to our{' '}
                  <Link to="/terms" className="text-green-600 hover:text-green-700">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
