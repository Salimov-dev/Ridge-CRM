import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAvatarsList } from "../../store/avatar/avatar.store";

const useGetUserAvatar = (userId) => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const userAvatarsList = useSelector(getUserAvatarsList());
  const usersArray = Array.isArray(userAvatarsList) ? userAvatarsList : [];

  const user = usersArray.find((user) => user.userId === userId);
  const userSrc = user?.src;

  const getUserAvatar = () => {
    try {
      if (userSrc) {
        const srcValue = "data:image/png;base64," + userSrc;
        setIsLoading(false);
        setAvatarSrc(srcValue);
      } else {
        setIsLoading(false);
        setAvatarSrc(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getUserAvatar(userId);
  });

  const refreshAvatar = () => {
    getUserAvatar(userId);
  };

  return { avatarSrc, isLoading, refreshAvatar };
};

export default useGetUserAvatar;
