import { useDispatch } from "react-redux";
import { Box, Tooltip, styled } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { setCreateMyTaskOpenState } from "../../../../../../../../../../../../../store/task/create-my-task.store";
import { setCreateRidgeTaskOpenState } from "../../../../../../../../../../../../../store/ridge-task/create-ridge-task.store";

const Component = styled(Box)`
  display: flex;
  justify-content: end;
`;

const CreateMyTaskIcon = ({
  day,
  isCurrentDay,
  isFutureDay,
  setDateCreate,
  hoverColor,
  isRidgePage,
}) => {
  const dispatch = useDispatch();

  const handleOpenCreateMyTask = () => {
    dispatch(setCreateMyTaskOpenState(true));
    setDateCreate(day);
  };

  const handleOpenCreateRidgeTask = () => {
    dispatch(setCreateRidgeTaskOpenState(true));
    setDateCreate(day);
  };

  return (
    <Component
      onClick={isRidgePage ? handleOpenCreateRidgeTask : handleOpenCreateMyTask}
    >
      {isCurrentDay || isFutureDay ? (
        <Tooltip title="Добавить себе задачу" placement="top-start" arrow>
          <ControlPointOutlinedIcon
            sx={{
              width: "25px",
              height: "25px",
              opacity: "0.3",
              "&:hover": {
                opacity: "1",
                transform: "scale(1.2)",
                color: hoverColor,
              },
            }}
          />
        </Tooltip>
      ) : null}
    </Component>
  );
};

export default CreateMyTaskIcon;
