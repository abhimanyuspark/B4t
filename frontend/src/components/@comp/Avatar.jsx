const Avatar = ({ profilePicture, className, size = 40 }) => {
  const avatarSize = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    maxWidth: size,
    maxHeight: size,
  };

  const Logo =
    "https://res.cloudinary.com/dyzuf567d/image/upload/v1751211556/Blog/l3fomqurs4jsbc9nd9w4.png";

  return (
    <div
      className={`rounded-full overflow-hidden ${className || ""}`}
      style={avatarSize}
    >
      <img
        className="size-full object-cover"
        src={profilePicture || Logo}
        onError={(e) => (e.currentTarget.src = Logo)}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
