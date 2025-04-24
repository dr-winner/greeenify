
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";
import { Link } from "react-router-dom";

const AuthForm = () => {
  return (
    <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
      
      {/* <div className="mt-8 text-center">
        <p className="text-gray-600">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-green-600 hover:text-green-700">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</Link>
        </p>
      </div> */}
    </Tabs>
  );
};

export default AuthForm;
