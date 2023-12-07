import { useEffect, useState } from "react";
import avatarUploadService from "../../services/upload/avatart-upload.service";

const useGetUserAvatar = (userId) => {
  const [avatarSrc, setAvatarSrc] = useState(null);

  const getUserAvatar = async (userId) => {
    try {
      const { content } = await avatarUploadService.get(userId);
      const contentLength = content.byteLength

      if(contentLength) {
        const arrayBuffer = new Uint8Array(content);
        const base64ImageString = btoa(
          String.fromCharCode.apply(null, arrayBuffer)
        );
        const srcValue = "data:image/png;base64," + base64ImageString;
        setAvatarSrc(srcValue);
      } else {
        setAvatarSrc(null)
      }
      
    } catch (error) {}
  };

  useEffect(() => {
    getUserAvatar(userId);
  }, [userId]);

  return avatarSrc;
};

export default useGetUserAvatar;
