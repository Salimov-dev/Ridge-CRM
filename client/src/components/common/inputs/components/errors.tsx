import { useTheme } from "@emotion/react";
import { FormHelperText } from "@mui/material";
import { tokens } from "@theme/theme";

const Errors = ({ errors, padding = "0" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <FormHelperText sx={{ color: colors.error["gold"], padding: padding }}>
      {errors?.message}
    </FormHelperText>
  );
};

export default Errors;
