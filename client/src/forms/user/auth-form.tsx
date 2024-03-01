import { useState } from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { InputAdornment, IconButton } from "@mui/material";
import ColorPicker from "@components/common/color-picker/color-picker";
// icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// components
import { FieldsContainer, Form } from "../../components/common/forms/styled";
import TextFieldStyled from "../../components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// store
import { getCititesList } from "@store/city/citites.store";

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
