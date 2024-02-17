// libraries
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
// components
import TitleWithCloseButton from "@common/page-headers/header-with-close-button";
import CreateUserForm from "@components/common/forms/create-user-form";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// store
import { createNewUser, getCurrentUserId } from "@store/user/users.store";
// schema
import { createUserSchema } from "@schemas/create-user.schema";

const initialState = {
  email: "",
  password: null,
  curatorId: null,
  role: ""
};

const CreateUser = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(createUserSchema)
  });

  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);
    const newData = {
      ...data,
      password: "Qwer1234",
      curatorId: currentUserId
    };

    dispatch<any>(createNewUser(newData))
      .then(() => {
        onClose();
        toast.success("Новый пользователь успешно создан");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box>
      <TitleWithCloseButton
        title="Добавить участника"
        onClose={onClose}
        background="orange"
      />
      <CreateUserForm register={register} data={data} errors={errors} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "0 10px"
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "red",
            padding: "5px"
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Пароль для каждого нового пользователя задаётся по умолчанию
            "Qwer1234", смените при первом входе
          </Typography>
        </Box>
        <Typography>
          1. Введите почту будущего Пользователя (она же будет служить Логином
          для доступа в систему)
        </Typography>
        <Box>
          <Typography>2. Выберите роль Пользователя:</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "4px"
            }}
          >
            <Typography>
              а. Менеджер - создает, видит и редактирует только свои объекты
            </Typography>
            <Typography>
              б. Куратор - создает, видит и редактирует свои объекты, а так же
              видит, но не редактирует объекты своих Менеджеров, ставит им
              задачи
            </Typography>
            <Typography>
              в. Наблюдатель - создает, видит и редактирует свои объекты, а так
              же видит, но не редактирует объекты Куратора и его Менеджеров
            </Typography>
          </Box>
        </Box>
        <Typography>
          3. На указанную почту придёт письмо с подтверждением
        </Typography>
        <Typography>
          4. Новый член команды сможет авторизоваться в системе под своим
          Логином (введенной почтой)
        </Typography>
        <Typography>
          5. Пароль для каждого нового пользователя задаётся по умолчанию
          "Qwer1234"
        </Typography>
        <Typography>
          6. После первого входа обязательно нужно поменять пароль на новый в
          Профиле пользователя и заполнить информацию о себе, добавить аватарку
        </Typography>
        <Typography>
          7. Передайте эту информацию новому члену команды
        </Typography>
      </Box>

      <SuccessCancelFormButtons
        successTitle="Добавить"
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </Box>
  );
});

export default CreateUser;
