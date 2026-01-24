const s = {
  small: "size-6 border-4",
  medium: "size-8 border-6",
  large: "size-10 border-8",
};

const Loading = ({ size = "medium" }) => (
  <div
    className={`${s[size]} border-green-500 border-t-transparent rounded-full
    transition animate-spin`}
  ></div>
);

export default Loading;
