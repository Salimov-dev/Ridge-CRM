import { Box, InputAdornment } from "@mui/material";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray
} from "react-hook-form";
import styled from "@emotion/styled";
// icons
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import DeleteElementIcon from "@components/common/button-icons/delete-element-icon";
import SwitchField from "@components/common/inputs/switch-field";
import { FC } from "react";
import { IContactCreateInitState } from "@interfaces/contact/contact.inteface";

interface FieldsEmailProps {
  data: IContactCreateInitState;
  register: UseFormRegister<IContactCreateInitState>;
  setValue: UseFormSetValue<IContactCreateInitState>;
  errors: FieldErrors<IContactCreateInitState>;
  control: Control<IContactCreateInitState>;
}

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

const FieldsEmail: FC<FieldsEmailProps> = ({
  data,
  register,
  setValue,
  errors,
  control
}): JSX.Element => {
  const {
    fields: fieldEmails,
    append: appendEmail,
    remove: removeEmail
  } = useFieldArray({
    name: "emails",
    control
  });

  const lastEmailIndex = fieldEmails.length - 1;

  const handleChangeEmail = (emailIndex, currentState) => {
    const updatedEmails = data.emails.map((email, index) => {
      if (index === emailIndex) {
        return { ...email, isDefault: !currentState }; // Инвертируем состояние текущего объекта
      } else if (email.isDefault) {
        return { ...email, isDefault: false }; // Если у другого объекта isDefault был true, устанавливаем его в false
      }
      return email;
    });

    setValue("emails", updatedEmails);
  };

  const handleRemoveEmail = (index) => {
    removeEmail(index);

    const isDefaultBeforeRemoval = fieldEmails[index].isDefault;
    const lastEmail = fieldEmails[index];
    const filtereEmails = fieldEmails.filter(
      (email) => email.id !== lastEmail.id
    );

    if (isDefaultBeforeRemoval && fieldEmails.length > 0) {
      const hasAnotherDefault = filtereEmails.some((email) => email.isDefault);

      if (!hasAnotherDefault) {
        const firstEmailIndex = 0;

        handleChangeEmail(firstEmailIndex, false);
        removeEmail(index);
      }
    }
  };

  const handleAddEmail = () => {
    const isNewDefault = fieldEmails.length === 0; // Проверяем, есть ли уже телефоны

    appendEmail({ email: "", isDefault: isNewDefault }); // Добавляем телефон с соответствующим значением isDefault
  };

  return (
    <>
      <RowTitle
        title="Электронная почта"
        background="linear-gradient(to right, Orange , OrangeRed)"
        margin="14px 0 -4px 0"
      />
      {fieldEmails?.map((field, index) => {
        if (field.id) {
          return (
            <FieldContainer key={field.id}>
              <DeleteElementIcon
                onClick={() => handleRemoveEmail(index)}
                error={errors?.emails?.[index]?.email}
              />
              <TextFieldStyled
                register={register}
                label="Почта"
                name={`emails.${index}.email`}
                value={data?.emails?.[index].email}
                errors={errors?.emails?.[index]?.email}
                inputProps={{ maxLength: 150 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AlternateEmailOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
              <SwitchField
                label={field.isDefault ? "Основной" : null}
                checked={field.isDefault || false}
                onChange={() => handleChangeEmail(index, field.isDefault)}
              />
            </FieldContainer>
          );
        } else {
          return null;
        }
      })}
      <ButtonsContainer>
        <ButtonStyled
          title="Добавить почту"
          style="ADD_NEW_EMAIL"
          width="100%"
          size="small"
          icon={<ControlPointOutlinedIcon />}
          onClick={handleAddEmail}
        />
        <ButtonStyled
          title="Удалить почту"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          disabled={!data?.emails?.length}
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveEmail(lastEmailIndex)} // передаем функцию removePhone с аргументом
        />
      </ButtonsContainer>
    </>
  );
};

export default FieldsEmail;
