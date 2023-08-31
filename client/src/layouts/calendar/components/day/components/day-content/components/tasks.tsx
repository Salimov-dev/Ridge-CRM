import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import { getObjectsList } from "../../../../../../../store/object/objects.store";
import { FormatTime } from "../../../../../../../utils/date/format-time";
import Loader from "../../../../../../../components/common/loader/loader";

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

const Tasks = ({ task, isCurrentDay, isFutureDay }) => {
  const objects = useSelector(getObjectsList());
  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj._id === id);
    const result = `${object?.location.city}, ${object?.location.address}`;
    return result;
  };

  return task ? (
    <ItemsContainer>
      {task?.map((task) => (
        <ItemContainer
          key={task._id}
          sx={{
            color: isCurrentDay ? "black" : isFutureDay ? "black" : "white",
            background: isCurrentDay
              ? "orange"
              : isFutureDay
              ? "orange"
              : "gray",
          }}
        >
          <Typography sx={{ textDecoration: "underline" }}>
            Задача до: {task.time ? FormatTime(task.time) : "В течение дня"}
          </Typography>
          <Typography>Коммент: {task?.comment}</Typography>
          <Typography>Объект: {getObjectAddress(task?.objectId)}</Typography>
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Tasks;
