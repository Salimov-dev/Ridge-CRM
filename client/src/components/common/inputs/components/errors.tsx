import { useTheme } from "@emotion/react";
import { FormHelperText } from "@mui/material";
import { tokens } from "@theme/theme";

const Errors = ({ errors, padding = "0", color, fontSize }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <FormHelperText
      sx={{
        color: color || colors.error["gold"],
        padding: padding,
        fontSize: fontSize
      }}
    >
      {errors?.message}
    </FormHelperText>
  );
};

export default Errors;
