import { useNavigate } from "react-router-dom";
// MUI
import { Box, styled, InputAdornment, Button } from "@mui/material";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
// components
import TextFieldStyled from "../inputs/text-field-styled";
import DatePickerStyled from "../inputs/date-picker";
import SimpleSelectField from "../inputs/simple-select-field";
// mock
import { gendersArray } from "../../../mock/genders";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const FooterButtons = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const ManagerForm = ({
  data,
  isEditMode = false,
  register,
  handleSubmit,
  onSubmit,
  errors,
  setValue,
  userStatuses,
  isValid,
  watchStatus,
  watchGender,
  watchStartDate,
}) => {
  const navigate = useNavigate();
  const today = dayjs();
  const tomorrow = dayjs(watchStartDate).add(1, "day");
  const endTrialPeriod = dayjs(tomorrow).add(1, "day");

  const handleBackPage = () => {
    navigate("/users");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ marginRight: "auto" }}>
        <h3>Менеджер</h3>
      </Box>
      <FieldsContainer
        sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Фамилия"
            name="name.lastName"
            errors={errors?.name?.lastName}
            value={data?.name?.lastName || ""}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">Ф</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Имя"
            name="name.firstName"
            errors={errors?.name?.firstName}
            value={data?.name?.firstName || ""}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">И</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Отчество"
            type="text"
            name="name.surName"
            errors={errors?.name?.surName}
            value={data?.name?.surName || ""}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">О</InputAdornment>,
            }}
          />
        </FieldsContainer>

        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contacts.phone"
            errors={errors?.contacts?.phone}
            value={data?.contacts?.phone || ""}
            onInputQuantities={12}
            valueAsNumber={true}
            helperText={"Только в формате 79098887766, 78129998877, 9302211"}
            isHelperText={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <DatePickerStyled
            register={register}
            name="birthday"
            label="Дата рождения"
            value={data?.birthday}
            onChange={(value) => setValue("birthday", value)}
            minDate={null}
          />
          <SimpleSelectField
            register={register}
            itemsList={gendersArray}
            name="gender"
            labelId="gender"
            label="Пол"
            value={watchGender}
            errors={errors?.gender}
          />
        </FieldsContainer>
      </FieldsContainer>

      <Box sx={{ marginRight: "auto" }}>
        <h3>Трудовой договор</h3>
      </Box>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="contract.startDate"
          label="Начало договора"
          value={data?.contract?.startDate}
          onChange={(value) => setValue("contract.startDate", value)}
          minDate={null}
        />
        <DatePickerStyled
          register={register}
          name="contract.endDate"
          label="Окончание договора"
          value={data?.contract?.endDate}
          onChange={(value) => setValue("contract.endDate", value)}
          minDate={watchStartDate === "" ? today : tomorrow}
        />
        <DatePickerStyled
          register={register}
          name="contract.trialPeriod"
          label="Окончание испыт.срока"
          value={data?.contract?.trialPeriod}
          color="green"
          onChange={(value) => setValue("contract.trialPeriod", value)}
          minDate={watchStartDate === "" ? today : endTrialPeriod}
        />
      </FieldsContainer>

      <Box sx={{ marginRight: "auto" }}>
        <h3>Аккаунт в CRM</h3>
      </Box>
      <FieldsContainer>
        <SimpleSelectField
          register={register}
          name="status"
          labelId="status"
          label="Статус"
          itemsList={userStatuses}
          value={watchStatus}
          errors={errors?.status}
        />
        <TextFieldStyled
          register={register}
          label="Email"
          type="text"
          name="email"
          errors={errors?.email}
          value={data?.email || ""}
          onInputQuantities={25}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        {!isEditMode && (
          <TextFieldStyled
            register={register}
            label="Пароль"
            type="text"
            name="password"
            errors={errors?.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      </FieldsContainer>

      <FooterButtons>
        <Button
          type="submit"
          variant="outlined"
          color="success"
          disabled={!isValid}
        >
          {isEditMode ? "Сохранить" : "Создать"}
        </Button>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={handleBackPage}
          >
            Отмена
          </Button>
        </Box>
      </FooterButtons>
    </Form>
  );
};

export default ManagerForm;
