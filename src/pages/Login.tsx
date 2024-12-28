import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../store/useAuthStore";
import { getProfile } from "../api/services/auth";
import { TokenResponse } from "../types/user";
import { useNavigate } from "react-router-dom";
import Bg from '../assets/bg-login.jpg'
import Button from "../components/Button";
import { Icon } from "@iconify/react";

const Login: React.FC = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        const userInfo = await getProfile(tokenResponse.access_token);
        setAuth(userInfo);
        localStorage.setItem("token", tokenResponse.access_token);
        navigate("/");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  return (
    <div className="h-screen flex justify-center relative bg-center bg-cover" style={{backgroundImage: `url(${Bg})`}}>
      <div className="bg-black bg-opacity-35 absolute inset-0 "></div>
      <main className="w-full container relative z-20 hidden lg:flex justify-center flex-col">
        <div className="text-white space-y-4">
          <h1 className="text-white font-medium text-4xl md:text-6xl lg:text-8xl">Welcome to <span className="text-primary font-bold ">Trivia Tales</span></h1>
          <p className="text-lg">"Welcome to TriviaTales — Where Curiosity Meets Challenge! Dive into a world of intriguing questions, exciting challenges, and endless discoveries. Unleash your knowledge, test your limits, and let every answer pave the way to becoming a true trivia champion!"</p>
        </div>
      </main>
      <aside className="max-w-md relative z-20 w-full flex flex-col items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm space-y-2 p-8 gap-4">
        <div className="w-full space-y-2 text-center text-white ">
          <h1 className="text-6xl font-semibold">Login</h1>
          <p className="text-base">Get started and make learning exciting today!</p>
        </div>
        <Button onClick={() => loginWithGoogle()} variant="primary">
          <div className="p-1 bg-white rounded-lg">
            <Icon icon={'logos:google-icon'}/>
          </div>
          Login with Google
        </Button>
      </aside>
    </div>
  );
};

export default Login;
