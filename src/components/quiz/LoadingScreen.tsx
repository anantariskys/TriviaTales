import Modal from "../Modal";

const LoadingScreen = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundColor: "#f4f6ff",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
      }}
    >
         <Modal />
      <div className="text-center">
        <div className="w-12 h-12 border-8 mx-auto border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-primary text-lg  animate-bounce font-semibold">
          Loading questions...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
