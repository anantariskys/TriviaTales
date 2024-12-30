import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from '/Logo.png'
import Button from "../components/Button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen    flex flex-col justify-center items-center text-center p-6"
    style={{
        backgroundColor: "#10375C",
         backgroundImage: "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
      }}>
      <div className="max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <img
          src={Logo}
          alt="404 Illustration"
          className="w-32 h-32 mx-auto mb-6 animate-bounce"
        />
        <h1 className="text-5xl font-bold text-secondary mb-4">Oops! 404</h1>
        <p className="text-xl text-primary mb-4">
          It seems like you've reached a page that doesn't exist. Let's get you back on track.
        </p>
        <Button
          onClick={handleGoHome}
          variant="primary"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
