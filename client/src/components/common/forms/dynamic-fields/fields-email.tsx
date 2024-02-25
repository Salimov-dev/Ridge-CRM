import { Box, FormControlLabel, InputAdornment, Switch } from "@mui/material";
import { useFieldArray } from "react-hook-form";
// icons
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";

const FieldsEmail = ({ data, register, setValue, errors, control }) => {
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

  return (
    <>
      <RowTitle
        title="Электронная почта"
        background="DarkOrange"
        margin="14px 0 -6px 0"
      />
      {fieldEmails?.map((field, index) => {
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
                label="Почта"
                name={`emails.${index}.email`}
                value={data.emails?.[index].email}
                errors={errors?.emails?.[index]?.email}
                onInputQuantities={12}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AlternateEmailOutlinedIcon />
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
                    onChange={() => handleChangeEmail(index, field.isDefault)}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      marginTop: "-10px",
                      "& .Mui-checked": {
                        color: "orange" // Задаем кастомный цвет для свитча в состоянии "включено"
                      },
                      "& .Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "orange" // Задаем кастомный цвет для фона свитча в состоянии "включено"
                      }
                    }}
                  />
                }
                label={field.isDefault ? "Основная" : null}
              />
            </Box>
          );
        } else {
          return null;
        }
      })}
      <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
        <ButtonStyled
          title="Добавить почту"
          style="ADD_NEW_EMAIL"
          width="100%"
          size="small"
          icon={<ControlPointOutlinedIcon />}
          onClick={() => appendEmail({ email: "", isDefault: false })}
        />
        <ButtonStyled
          title="Удалить почту"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveEmail(lastEmailIndex)} // передаем функцию removePhone с аргументом
        />
      </Box>
    </>
  );
};

export default FieldsEmail;
