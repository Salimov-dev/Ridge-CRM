import { useFieldArray } from "react-hook-form";
import {
  Box,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Switch
} from "@mui/material";
// icons
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";

const FieldsPhone = ({ data, register, setValue, errors, control }) => {
  const {
    fields: fieldPhones,
    append: appendPhone,
    remove: removePhone
  } = useFieldArray({
    name: "phones",
    control
  });

  const lastPhoneIndex = fieldPhones.length - 1;

  const handleChangePhone = (phoneIndex, currentState) => {
    const updatedPhones = data.phones.map((phone, index) => {
      if (index === phoneIndex) {
        return { ...phone, isDefault: !currentState }; // Инвертируем состояние текущего объекта
      } else if (phone.isDefault) {
        return { ...phone, isDefault: false }; // Если у другого объекта isDefault был true, устанавливаем его в false
      }
      return phone;
    });

    setValue("phones", updatedPhones);
  };

  const handleRemovePhone = (index) => {
    removePhone(index);

    const isDefaultBeforeRemoval = fieldPhones[index].isDefault;
    const lastPhone = fieldPhones[index];
    const filterePhones = fieldPhones.filter(
      (phone) => phone.id !== lastPhone.id
    );

    if (isDefaultBeforeRemoval && fieldPhones.length > 0) {
      const hasAnotherDefault = filterePhones.some((phone) => phone.isDefault);

      if (!hasAnotherDefault) {
        const firstPhoneIndex = 0;

        handleChangePhone(firstPhoneIndex, false);
        removePhone(index);
      }
    }
  };
  return (
    <>
      <RowTitle title="Телефон" background="green" margin="14px 0 -6px 0" />
      {fieldPhones?.map((field, index) => {
        if (field.id) {
          return (
            <Box
              key={field.id}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <TextFieldStyled
                register={register}
                label="Телефон"
                type="number"
                required={true}
                name={`phones.${index}.phone`}
                value={data.phones?.[index].phone}
                errors={errors?.phones?.[index]?.phone}
                onInputQuantities={12}
                isHelperText={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneIphoneOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                label="Bottom"
                labelPlacement="bottom"
                sx={{ width: "80px", margin: "0" }}
                control={
                  <Switch
                    checked={field.isDefault || false}
                    color="default"
                    onChange={() => handleChangePhone(index, field.isDefault)}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      marginTop: "-10px",
                      "& .Mui-checked": {
                        color: "LimeGreen" // Задаем кастомный цвет для свитча в состоянии "включено"
                      },
                      "& .Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "LimeGreen" // Задаем кастомный цвет для фона свитча в состоянии "включено"
                      }
                    }}
                  />
                }
                label={field.isDefault ? "Основной" : null}
              />
            </Box>
          );
        } else {
          return null;
        }
      })}
      <FormHelperText sx={{ marginTop: "-4px" }}>
        Вводите номер телефона только в форматах 79045554433, 78129998877,
        9995544
      </FormHelperText>
      <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
        <ButtonStyled
          title="Добавить телефон"
          style="ADD_SOME_NEW"
          width="100%"
          size="small"
          icon={<ControlPointOutlinedIcon />}
          onClick={() => appendPhone({ phone: "", isDefault: false })}
        />
        <ButtonStyled
          title="Удалить телефон"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemovePhone(lastPhoneIndex)} // передаем функцию removePhone с аргументом
        />
      </Box>
    </>
  );
};

export default FieldsPhone;
