import { Box, Typography, styled } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ArrowLeft = styled(KeyboardArrowLeftOutlinedIcon)({
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.2)",
    color: "yellow",
  },
});

const ArrowRight = styled(KeyboardArrowRightOutlinedIcon)({
  cursor: "pointer",
  "&:hover": { transform: "scale(1.2)", color: "yellow" },
});

const ToggleTask = ({ title, onToggle, color, backgroundColor }) => {
  return (
    <Component>
      <ArrowLeft onClick={onToggle} />
      <Box sx={{ display: "flex", gap: "6px" }}>
        <Typography>ПЕРЕКЛЮЧИТЬ НА</Typography>
        <Typography
          sx={{
            color: color,
            backgroundColor: backgroundColor,
            padding: "0 4px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Box>
      <ArrowRight onClick={onToggle} />
    </Component>
  );
};

export default ToggleTask;
