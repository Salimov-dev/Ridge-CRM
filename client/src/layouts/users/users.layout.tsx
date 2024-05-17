// libraries
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// initial-states
import { usersLayoutInitialState } from "@initial-states/layouts/users-layout.initial-state";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import ButtonsUsersLayout from "@components/UI/layout-buttons/buttons.users-layout/buttons.users-layout";
import TeamMateTablesUsersLayout from "./components/temmate-tables.users-layout";
import InformItemsUsersLayout from "./components/inform-items.users-layout";
import DialogPages from "@dialogs/dialog-pages";

const UsersLayout = React.memo(() => {
  const [state, setState] = useState({
    createUserPage: false,
    makePaymentPage: false,
    updateUserPage: false,
    userId: "",
    videoPlayerPage: false
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-users-data")
  );
  const { register, watch, reset } = useForm({
    defaultValues: localStorageState || usersLayoutInitialState,
    mode: "onBlur"
  });
  const data = watch();

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(
      "search-users-data",
      JSON.stringify(usersLayoutInitialState)
    );
  }, []);

  return (
    <ContainerStyled>
      <HeaderForLayout title="Моя команда" />
      <ButtonsUsersLayout data={data} setState={setState} reset={reset} />
      <InformItemsUsersLayout />
      <TeamMateTablesUsersLayout
        data={data}
        setState={setState}
        register={register}
      />
      <DialogPages
        state={state}
        setState={setState}
        videoTitle="Как пользоваться страницей с Командой"
        videoSrc="https://www.youtube.com/embed/0-K3ll4jkoo"
      />
    </ContainerStyled>
  );
});

export default UsersLayout;
