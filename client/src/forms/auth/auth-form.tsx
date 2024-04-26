import { useState } from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { InputAdornment, IconButton } from "@mui/material";
// icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import ColorPicker from "@components/common/color-picker/color-picker";
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// store
import { getCititesList } from "@store/city/citites.store";

const AuthForm = ({
  data,
  register,
  errors,
  color = "",
  watch = () => {},
  setValue = () => {},
  onColorChange = () => {},
  isRegister = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const citiesList = useSelector(getCititesList());
  const sortedCities = orderBy(citiesList, "name", ["asc"]);
  const watchCity = watch("city");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
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
          inputProps={{ maxLength: 150 }}
        />

        <TextFieldStyled
          register={register}
          label="Пароль"
          type={showPassword ? "text" : "password"}
          name="password"
          value={data?.password}
          errors={errors?.password}
          inputProps={{ maxLength: 20 }}
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
          <TextFieldStyled
            register={register}
            label="Подтвердите пароль"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={data?.confirmPassword}
            errors={errors?.confirmPassword}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
        {isRegister && (
          <AutocompleteStyled
            label="Выберите свой город"
            register={register}
            name="city"
            options={sortedCities}
            value={watchCity}
            setValue={setValue}
            watchItemId={watchCity}
            errors={errors?.city}
            maxHeightListBox="16rem"
          />
        )}
      </FieldsContainer>

      {isRegister && (
        <ColorPicker
          title="Выберите свой цвет в Грядке"
          color={color}
          onColorChange={onColorChange}
          errors={errors}
        />
      )}
    </Form>
  );
};

export default AuthForm;
