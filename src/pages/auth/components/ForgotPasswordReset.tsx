import { useForm, SubmitHandler } from "react-hook-form";

// Define the form data structure
interface FormData {
  username: string;
}

const ForgotPasswordReset = ({
  setActiveTab,
}: {
  setActiveTab: (
    tab: "ForgotPasswordReset" | "VerifyEmailPassword" | "UpdatePassword"
  ) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data", data);
    setActiveTab("VerifyEmailPassword");
  };

  return (
    <div>
      <div className="my-5">
        <h4 className="text-[20px] font-bold">
          Log in to your hospital’s dashboard
        </h4>
        <p className="text-sm">Enter your username or email to continue</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username/Email
          </label>
          <div className="relative mt-1">
            <input
              id="username"
              type="username"
              {...register("username", { required: true })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#573fd1] text-white py-4 rounded font-bold"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordReset;
