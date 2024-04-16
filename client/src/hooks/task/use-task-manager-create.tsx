import { roleManagerId } from "@data/users/user-roles";
import { getObjectById, getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId, getUsersList } from "@store/user/users.store";
import { useSelector } from "react-redux";

const useTaskManagerCreateHook = (objectId, watch) => {
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const watchManagerId = watch("managerId");

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );
  const managerUsersWithRole = usersWithoutCurrentUser?.filter(
    (user) => user?.role && user?.role.includes(roleManagerId)
  );
  const actualUsersArray = managerUsersWithRole?.map((user) => {
    const lastName = user?.lastName;
    const firstName = user?.firstName;

    return {
      _id: user._id,
      name: `${lastName ? lastName : "Без"} ${firstName ? firstName : "имени"}`
    };
  });

  const objects = useSelector(getObjectsList());
  const managerObjects = objects?.filter(
    (obj) => obj.userId === watchManagerId
  );
  const currentObject = useSelector(getObjectById(objectId));
  const managerId = currentObject?.userId;
  return { actualUsersArray, managerObjects, managerId };
};

export default useTaskManagerCreateHook;
