import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { CirclePicker } from "react-color";
import Errors from "../inputs/components/errors";
const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 0 0px 0;
  gap: 14px;
`;

const ColorPicker = ({ title, color, onColorChange, errors }) => {
  return (
    <Component>
      <Typography variant="h5" sx={{ color: "Aqua" }}>
        {title}
      </Typography>
      <CirclePicker color={color} onChangeComplete={onColorChange} />
      <Errors errors={errors.color} color="LightCoral" fontSize="14px" />
    </Component>
  );
};

export default ColorPicker;
