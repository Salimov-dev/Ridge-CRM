import { useState } from "react";
import { orderBy } from "lodash";
import { InputAdornment, IconButton, Box, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FieldsContainer, Form } from "../components/common/forms/styled";
import TextFieldStyled from "../components/common/inputs/text-field-styled";
import { CirclePicker } from "react-color";
import styled from "@emotion/styled";
import { citiesArray } from "@data/cities";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
import { useSelector } from "react-redux";
import { getCititesList } from "@store/city/citites.store";
import Errors from "@components/common/inputs/components/errors";

const ColorPicker = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 0 0px 0;
  gap: 14px;
`;

const AuthForm = ({
  data,
  register,
  errors,
  color,
  watch,
  setValue,
  onColorChange,
  isRegister = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const citiesList = useSelector(getCititesList());
  const sortedLastContacts = orderBy(citiesList, "name", ["desc"]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Почта"
          type="text"
          name="email"
          errors={errors?.email}
          value={data?.email}
        />

        <TextFieldStyled
          register={register}
          label="Пароль"
          type={showPassword ? "text" : "password"}
          name="password"
          value={data?.password}
          errors={errors?.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {isRegister && (
          <AutocompleteStyled
            label="Выберите свой город"
            register={register}
            name="city"
            options={sortedLastContacts}
            value={watch.city ?? ""}
            setValue={setValue}
            watchItemId={watch.city}
            errors={errors?.city}
          />
        )}
      </FieldsContainer>

      {isRegister && (
        <ColorPicker>
          <Typography variant="h5" sx={{ color: "Aqua" }}>
            Выберите свой цвет в Грядке:
          </Typography>
          <CirclePicker color={color} onChangeComplete={onColorChange} />
          <Errors errors={errors.color} color="LightCoral" fontSize="14px" />
        </ColorPicker>
      )}
    </Form>
  );
};

export default AuthForm;
