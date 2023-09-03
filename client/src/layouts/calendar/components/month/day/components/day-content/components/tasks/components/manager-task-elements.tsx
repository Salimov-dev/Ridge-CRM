import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getObjectsList } from "../../../../../../../../../../store/object/objects.store";
import { getUsersList } from "../../../../../../../../../../store/user/users.store";
import DividerStyled from "../../../../../../../../../../components/common/divider/divider-styled";

const ManagerTaskElements = ({ task }) => {
  const objects = useSelector(getObjectsList());
  const users = useSelector(getUsersList());

  const getManagerName = (managerId) => {
    const user = users?.find((user) => user._id === managerId);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
    return result;
  };

  const getCuratorName = (curatorId) => {
    const user = users?.find((user) => user._id === curatorId);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
    return result;
  };

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj._id === id);
    const result = `${object?.location.city}, ${object?.location.address}`;
    return result;
  };
  return (
    <>
      {task?.managerId ? (
        <Typography>
          <b>Менеджер:</b> {getManagerName(task?.managerId)}
        </Typography>
      ) : null}
      {task?.managerId ? (
        <Typography>
          <b>Куратор:</b> {getCuratorName(task?.userId)}
        </Typography>
      ) : null}
      {task?.managerId && <DividerStyled />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography>
          <b>Задача:</b> {task?.comment}
        </Typography>
        {task?.objectId ? (
          <Typography>
            <b>Объект:</b> {getObjectAddress(task?.objectId)}
          </Typography>
        ) : null}
      </Box>
    </>
  );
};

export default ManagerTaskElements;
