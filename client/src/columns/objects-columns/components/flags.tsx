import { Box, Tooltip } from "@mui/material";

const Flags = ({ meetings, tasks }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "end",
        gap: "5px",
      }}
    >
      {meetings?.length ? (
        <Tooltip title="Есть встречи" placement="top-start" arrow>
          <Box
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
            sx={{
              width: "10px",
              height: "10px",
              background: "orange",
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
