import { useSelector } from "react-redux";
import { orderBy } from "lodash";
// MUI
import { InputAdornment } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
// store
import { getWorkingPositionsList } from "@store/user-params/working-position.store";
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";

const MainFields = ({ register, data, errors, watch }) => {
  const workingPositions = useSelector(getWorkingPositionsList());
  const sortedWorkingPositions = orderBy(workingPositions, ["name"], ["asc"]);
  const watchWorkingPosition = watch("position");

  return (
    <>
      <TextFieldStyled
        register={register}
        label="Имя"
        name="name"
        required={true}
        errors={errors.name}
        value={capitalizeFirstLetter(data.name)}
        inputProps={{ maxLength: 150 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountCircleOutlinedIcon />
            </InputAdornment>
          )
        }}
      />
      <SelectFieldStyled
        label="Позиция"
        register={register}
        name="position"
        required={true}
        labelId="position"
        errors={errors.position}
        itemsList={sortedWorkingPositions}
        value={watchWorkingPosition ?? ""}
      />
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        errors={errors.comment}
        value={capitalizeFirstLetter(data.comment)}
        inputProps={{ maxLength: 150 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <BorderColorOutlinedIcon />
            </InputAdornment>
          )
        }}
      />
    </>
  );
};

export default MainFields;
