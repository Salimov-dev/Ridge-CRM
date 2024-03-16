import { getObjectById } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { useSelector } from "react-redux";

export const filteredObjectsForManager = (company) => {
  const currentUserId = useSelector(getCurrentUserId());

  const objects = company?.objects.map((obj) => {
    return useSelector(getObjectById(obj.object));
  });

  const filteredObjects = objects?.filter(
    (obj) => obj && obj.userId === currentUserId
  );

  const filteredObjectsIds = filteredObjects?.map((obj) => ({
    object: obj._id
  }));

  return filteredObjectsIds;
};
