import { AuthFooter } from "../components/AuthFooter";
import { Carousel } from "../components/Carousel";
import { LoginForm } from "./components/LoginForm";
// import { useAuthStore } from "@/store/useAuthStore";

export const Signin: React.FC = () => {
  // const { user } = useAuthStore();
  // console.log(user);
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
            <LoginForm />
          </div>
          {/* Footer */}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};
export default Signin;

// import { Carousel } from "../components/Carousel";
// import { LoginForm } from "./components/LoginForm";

// export const Signin: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-background text-txt overflow-hidden">
//       {/* Left Pane - Carousel Component */}
//       <Carousel />

//       {/* Right Pane - Form Component */}
//       <div className="flex w-full lg:w-1/2 flex-col justify-between h-screen overflow-y-auto">
//         <div className="flex-1 flex flex-col justify-center py-12">
//           <LoginForm />
//         </div>

//         {/* Footer */}
//         <div className="px-8 py-6 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
//           <p>2026 EasyCare Inc. All rights reserved.</p>
//           <div className="flex gap-4">
//             <a href="#" className="hover:text-muted hover:underline">
//               Privacy Policy
//             </a>
//             <span>|</span>
//             <a href="#" className="hover:text-muted hover:underline">
//               Terms and Conditions
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;
