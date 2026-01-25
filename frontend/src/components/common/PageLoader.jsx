import Loading from "./Loading";

const PageLoader = () => {
  return (
    <div
      className="absolute size-full top-0 left-0 flex items-center justify-center z-50
    bg-[0,0,0,0.5]"
    >
      <Loading />
    </div>
  );
};

export default PageLoader;
