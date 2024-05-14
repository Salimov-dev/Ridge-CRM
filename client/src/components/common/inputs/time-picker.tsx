import { FC } from "react";
import { Box, styled } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
// components
import ErrorsForInput from "./errors-for-input";
// interfaces
import { ITheme } from "@interfaces/theme/theme.interface";

interface TimePickerStyledProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  value: string | Date | null;
  setValue: UseFormSetValue<any>;
  errors: any;
  disabled?: boolean;
  required?: boolean;
}

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: "center";
  margin-bottom: -3px;
  margin-top: -8px;
`;

interface StyledTimePickerProps {
  errors: any;
  colors: ITheme;
}

const StyledTimePicker = styled(TimePicker)<StyledTimePickerProps>(
  ({ errors, colors, value }) => ({
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: errors ? colors.error["red"] : "gray"
      },
      "&.Mui-focused fieldset": {
        borderColor: errors ? "red" : "green"
      }
    },
    "& .MuiInputLabel-root": {
      color: "gray"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiButtonBase-root": {
      color: value ? "white" : "gray"
    }
  })
);

const TimePickerStyled: FC<TimePickerStyledProps> = ({
  register,
  label,
  name,
  value,
  setValue,
  errors = null,
  disabled = false,
  required = false
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <FieldsContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DemoContainer
          components={["TimePicker"]}
          sx={{
            paddingTop: "8px"
          }}
        >
          <StyledTimePicker
            {...register(name, { required: required })}
            label={label}
            ampm={false}
            onChange={(value) => setValue(name, value)}
            value={value}
            colors={colors}
            errors={errors}
            required={required}
            disabled={disabled}
          />
        </DemoContainer>
      </LocalizationProvider>
      <ErrorsForInput errors={errors} padding="0 0 0 10px" />
    </FieldsContainer>
  );
};

export default TimePickerStyled;
