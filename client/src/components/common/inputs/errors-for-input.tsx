import { useTheme } from "@emotion/react";
import { FormHelperText } from "@mui/material";
import { tokens } from "@theme/theme";
import { FC } from "react";

interface ErrorsForInputProps {
  errors: any;
  padding?: string;
  color?: string;
  fontSize?: string;
}

const ErrorsForInput: FC<ErrorsForInputProps> = ({
  errors,
  padding = "0",
  color,
  fontSize
}) => {
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

export default ErrorsForInput;
