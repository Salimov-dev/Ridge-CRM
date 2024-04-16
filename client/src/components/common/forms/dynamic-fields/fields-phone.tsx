import styled from "@emotion/styled";
import { useFieldArray } from "react-hook-form";
import { Box, FormHelperText, InputAdornment } from "@mui/material";
// icons
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import DeleteElementIcon from "@components/common/button-icons/delete-element-icon";
import SwitchField from "@components/common/inputs/switch-field";

const FieldContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

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

  const handleAddPhone = () => {
    const isNewDefault = fieldPhones.length === 0; // Проверяем, есть ли уже телефоны

    appendPhone({ phone: "", isDefault: isNewDefault }); // Добавляем телефон с соответствующим значением isDefault
  };

  return (
    <>
      <RowTitle
        title="Телефон"
        background="linear-gradient(to right, SeaGreen , DarkOliveGreen)"
        margin="14px 0 -4px 0"
      />
      {fieldPhones?.map((field, index) => {
        if (field.id) {
          return (
            <FieldContainer key={field.id}>
              <DeleteElementIcon
                onClick={() => handleRemovePhone(index)}
                error={errors?.phones?.[index]?.phone}
                disabled={data?.phones?.length <= 1}
              />
              <TextFieldStyled
                register={register}
                label="Телефон"
                type="number"
                required={true}
                name={`phones.${index}.phone`}
                value={data.phones?.[index].phone}
                errors={errors?.phones?.[index]?.phone}
                isHelperText={true}
                inputProps={{ maxLength: 150 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneIphoneOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
              <SwitchField
                label={field.isDefault ? "Основной" : null}
                checked={field.isDefault || false}
                onChange={() => handleChangePhone(index, field.isDefault)}
              />
            </FieldContainer>
          );
        } else {
          return null;
        }
      })}
      <FormHelperText sx={{ margin: "-4px 0  0 52px" }}>
        Вводите номер телефона только в форматах 79045554433, 78129998877,
        9995544
      </FormHelperText>
      <ButtonsContainer>
        <ButtonStyled
          title="Добавить телефон"
          style="ADD_SOME_NEW"
          width="100%"
          size="small"
          icon={<ControlPointOutlinedIcon />}
          onClick={handleAddPhone}
        />
        <ButtonStyled
          title="Удалить телефон"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          disabled={data?.phones?.length <= 1}
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemovePhone(lastPhoneIndex)} // передаем функцию removePhone с аргументом
        />
      </ButtonsContainer>
    </>
  );
};

export default FieldsPhone;
