import { AuthFooter } from "../components/AuthFooter";
import { Carousel } from "../components/Carousel";
import SignupForm from "./comonents/SignupForm"; // Note: left your import path exactly as provided

export const Signup: React.FC = () => {
  return (
    // Outer Wrapper
    <div className="h-screen bg-background flex justify-center items-center lg:p-8">
      {/* Main Container */}
      <div className="flex w-full max-w-[1440px] bg-background text-txt lg:rounded-2xl lg:shadow-xl overflow-hidden h-screen lg:h-[calc(100vh-4rem)] min-h-[700px] ">
        {/* Left Pane - Carousel Component */}
        <Carousel />

        {/* Right Pane - Form Component */}
        <div className="flex w-full lg:w-1/2 flex-col justify-between overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-16">
            <SignupForm />
          </div>

          {/* Footer */}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default Signup;
