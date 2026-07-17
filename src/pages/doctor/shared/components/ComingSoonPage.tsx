import { FaSeedling } from "react-icons/fa";

const ComingSoonPage = ({ title }: { title: string }) => {
  return (
    <div className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
        <FaSeedling className="h-8 w-8 text-[#573FD1]" />
      </div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-gray-500">Info Coming Soon</p>
    </div>
  );
};

export default ComingSoonPage;
