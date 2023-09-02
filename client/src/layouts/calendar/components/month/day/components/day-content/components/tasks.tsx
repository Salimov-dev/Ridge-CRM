import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import { getObjectsList } from "../../../../../../../../store/object/objects.store";
import { FormatTime } from "../../../../../../../../utils/date/format-time";
import Loader from "../../../../../../../../components/common/loader/loader";
import { getUsersList } from "../../../../../../../../store/user/users.store";
import DividerStyled from "../../../../../../../../components/common/divider/divider-styled";

const ItemsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  border-radius: 4px;
`;

const Tasks = ({ tasks, isCurrentDay, isFutureDay }) => {
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

  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => (
        <ItemContainer
          key={task._id}
          sx={{
            color: isCurrentDay
              ? task.managerId
                ? "white"
                : "black"
              : isFutureDay
              ? task.managerId
                ? "white"
                : "black"
              : "white",
            background: isCurrentDay
              ? task.managerId
                ? "red"
                : "orange"
              : isFutureDay
              ? task.managerId
                ? "red"
                : "orange"
              : "gray",
          }}
        >
          <Typography sx={{ fontSize: "15px", textDecoration: "underline" }}>
            <b>
              Задача до: {task.time ? FormatTime(task.time) : "В течение дня"}
            </b>
          </Typography>
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
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Tasks;
