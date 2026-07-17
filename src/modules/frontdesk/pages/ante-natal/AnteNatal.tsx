import AnteLog from "./components/AnteLog";

const AnteNatal = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Added `ml-72` to shift the main content to the right */}
      <main className="flex-1 p-6 ">
        <div className=" gap-6 mt-6">
          <AnteLog />
        </div>
      </main>
    </div>
  );
};

export default AnteNatal;
