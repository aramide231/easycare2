import PostRecord from "./components/PostRecord";

const PostNatal = () => {
  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-6 ">
        <div className=" gap-6 mt-6">
          <PostRecord />
        </div>
      </main>
    </div>
  );
};

export default PostNatal;
