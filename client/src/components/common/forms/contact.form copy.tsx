import { useSelector } from "react-redux";
import { orderBy } from "lodash";
// MUI
import {
  Box,
  FormControlLabel,
  InputAdornment,
  Switch,
  Tooltip
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
// styled
import { FieldsContainer, Form } from "./styled/styled";
// components
import TextFieldStyled from "../inputs/text-field-styled";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
// store
import { getWorkingPositionsList } from "@store/user-params/working-position.store";
import AutocompleteStyled from "../inputs/autocomplete-styled";
import RowTitle from "../titles/row-title";
import ButtonStyled from "../buttons/button-styled.button";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

const ContactForm = ({
  data,
  objects,
  statuses,
  types,
  watch,
  control,
  register,
  errors,
  setValue,
  isEditMode = false,
  isMeetingsLoading = false,
  isObjectPage = false
}) => {
  const workingPositions = useSelector(getWorkingPositionsList());
  const sortedWorkingPositions = orderBy(workingPositions, ["name"], ["asc"]);
  const watchWorkingPosition = watch("position");
  const watchObjectId = watch("objectId");

  const {
    fields: fieldPhones,
    append: appendPhone,
    remove: removePhone
  } = useFieldArray({
    name: "phones",
    control
  });

  const {
    fields: fieldEmails,
    append: appendEmail,
    remove: removeEmail
  } = useFieldArray({
    name: "emails",
    control
  });

  const {
    fields: fieldObjects,
    append: appenObject,
    remove: removeObject
  } = useFieldArray({
    name: "objects",
    control
  });
  // console.log("fieldEmails", fieldEmails);

  const handleChange = (phoneIndex, currentState) => {
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

  // useEffect(() => {
  //   fieldPhones.forEach((field, index) => {
  //     // Обновляем каждый объект field в соответствии с данными из формы
  //     fieldPhones[index] = data.phones[index];
  //   });
  // }, [data.phones]);

  return (
    <>
      <Form noValidate>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <TextFieldStyled
            register={register}
            label="Имя"
            name="name"
            errors={errors.name}
            value={data?.name ?? ""}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
          <TextFieldStyled
            register={register}
            label="Компания"
            name="company"
            errors={errors.company}
            value={data?.company ?? ""}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HomeOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
          <SelectFieldStyled
            label="Позиция"
            register={register}
            name="position"
            labelId="position"
            itemsList={sortedWorkingPositions}
            value={watchWorkingPosition ?? ""}
          />
          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            errors={errors.comment}
            value={data?.comment ?? ""}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BorderColorOutlinedIcon />
                </InputAdornment>
              )
            }}
          />

          <RowTitle title="Телефон" background="green" margin="14px 0 0 0" />
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
                    name={`phones.${index}.phone`}
                    errors={errors?.phones?.[index]?.phone}
                    // value={field.phone}
                    onInputQuantities={12}
                    isHelperText={true}
                    subtitle="Вводите в формате 79045554433, 78129998877, 9995544"
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
                    control={
                      <Switch
                        checked={field.isDefault || false}
                        color="default"
                        onChange={() => handleChange(index, field.isDefault)} // Передаем индекс и текущее состояние isDefault
                        inputProps={{ "aria-label": "controlled" }}
                        sx={{ marginTop: "-28px" }}
                        color="warning"
                        label="Gilad Gray"
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
          <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
            <ButtonStyled
              title="Добавить телефон"
              style="ADD_SOME_NEW"
              width="100%"
              size="small"
              icon={<ControlPointOutlinedIcon />}
              onClick={() => appendPhone({ phone: null, isDefault: false })}
            />
            <ButtonStyled
              title="Удалить телефон"
              style="REMOVE_SOME_NEW"
              width="100%"
              size="small"
              icon={<DoNotDisturbOnOutlinedIcon />}
              onClick={removePhone}
            />
          </Box>

          <RowTitle
            title="Электронная почта"
            background="green"
            margin="14px 0 0 0"
          />
          {/* <TextFieldStyled
            register={register}
            label="Email"
            name="email"
            errors={errors?.email}
            onInputQuantities={100}
            value={data?.email || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              )
            }}
          /> */}
          <ButtonStyled
            title="Добавить почту"
            style="ADD_SOME_NEW"
            width="100%"
            size="small"
            icon={<ControlPointOutlinedIcon />}
            //  onClick={onSuccess}
          />

          <RowTitle
            title="Объекты недвижимости"
            background="green"
            margin="14px 0 0 0"
          />
          {/* <AutocompleteStyled
            label="Объект"
            register={register}
            name="objectId"
            options={objects}
            value={data.objectId}
            setValue={setValue}
            watchItemId={watchObjectId}
            // disabled={!isObjectPage}
            // optionLabel={(option) => `${option?.city}, ${option?.address}`}
          /> */}
          <ButtonStyled
            title="Добавить объект"
            style="ADD_SOME_NEW"
            width="100%"
            size="small"
            icon={<ControlPointOutlinedIcon />}
            //  onClick={onSuccess}
          />
        </FieldsContainer>
      </Form>
    </>
  );
};

export default ContactForm;
