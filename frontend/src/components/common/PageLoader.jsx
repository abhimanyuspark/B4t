import Loading from "./Loading";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loading />
    </div>
  );
};

export default PageLoader;
