import basicAva from "../../../assets/basic-ava.jpg";

const UserAvatar = ({ avatarSrc, width = "30px", height = "30px" }) => {

  return (
    <img
      src={avatarSrc ? avatarSrc : basicAva}
      style={{ borderRadius: "50%", width, height }}
    />
  );
};

export default UserAvatar;
