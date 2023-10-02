import { Box, Tooltip } from "@mui/material";

const Flags = ({
  meetings = [],
  tasks = [],
  lastContacts = [],
  taskBackgroundColor = "orange",
  onClick,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        gap: "5px",
      }}
    >
      {lastContacts?.length ? (
        <Tooltip title="Есть последний контакт" placement="top-start" arrow>
          <Box
            onClick={onClick}
            sx={{
              width: "10px",
              height: "10px",
              background: "SaddleBrown",
              borderRadius: "50%",
              border: "1px solid gray",
            }}
          ></Box>
        </Tooltip>
      ) : null}
      {meetings?.length ? (
        <Tooltip title="Есть встречи" placement="top-start" arrow>
          <Box
            onClick={onClick}
            sx={{
              width: "10px",
              height: "10px",
              background: "RoyalBlue",
              borderRadius: "50%",
              border: "1px solid gray",
            }}
          ></Box>
        </Tooltip>
      ) : null}
      {tasks?.length ? (
        <Tooltip title="Есть задачи" placement="top-start" arrow>
          <Box
            onClick={onClick}
            sx={{
              width: "10px",
              height: "10px",
              background: taskBackgroundColor,
              border: "1px solid orange",
              borderRadius: "50%",
            }}
          ></Box>
        </Tooltip>
      ) : null}
    </Box>
  );
};

export default Flags;
