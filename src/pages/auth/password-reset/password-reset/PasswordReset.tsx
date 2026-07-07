import { AuthFooter } from "../components/AuthFooter";
import { Carousel } from "../components/Carousel";
import PasswordResetForm from "./components/PasswordResetForm";

export const PasswordReset: React.FC = () => {
  return (
    // Outer Wrapper
    <div className="h-screen bg-background flex justify-center items-center lg:p-8">
      {/* Main Container*/}
      <div className="flex w-full max-w-[1440px] bg-background text-txt lg:rounded-2xl lg:shadow-xl overflow-hidden h-screen lg:h-[calc(100vh-4rem)] min-h-[700px]">
        {/* Left Pane - Carousel Component */}
        <Carousel />

        {/* Right Pane - Form Component */}
        <div className="flex w-full lg:w-1/2 flex-col justify-between overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-16">
            <PasswordResetForm />
          </div>
          {/* Footer */}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;
