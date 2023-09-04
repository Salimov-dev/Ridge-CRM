import { Box, Tooltip, styled } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

const Component = styled(Box)`
  display: flex;
  justify-content: end;
`;

const CreateTaskIcon = ({ day, isCurrentDay, isFutureDay, onClick }) => {
  return (
    <Component
      onClick={() => {
        onClick(day);
      }}
    >
      {isCurrentDay || isFutureDay ? (
        <Tooltip title="Добавить задачу" placement="top-start" arrow>
          <ControlPointOutlinedIcon
            sx={{
              width: "25px",
              height: "25px",
              opacity: "0.3",
              "&:hover": {
                opacity: "1",
                transform: "scale(1.2)",
                color: "yellow",
              },
            }}
          />
        </Tooltip>
      ) : null}
    </Component>
  );
};

export default CreateTaskIcon;
