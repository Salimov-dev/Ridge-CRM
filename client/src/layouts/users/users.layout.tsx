// libraries
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// initial-states
import { usersLayoutInitialState } from "@initial-states/layouts/users-layout.initial-state";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import HeaderLayout from "@components/common/page-headers/header-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import ButtonsUsersLayout from "@UI/layout-buttons/buttons.users-layout";
import TeamMateTablesUsersLayout from "./components/temmate-tables.users-layout";
import InformItemsUsersLayout from "./components/inform-items.users-layout";

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
      <HeaderLayout title="Моя команда" />
      <ButtonsUsersLayout data={data} setState={setState} reset={reset} />
      <InformItemsUsersLayout />
      <TeamMateTablesUsersLayout
        data={data}
        setState={setState}
        register={register}
      />
      <PageDialogs
        state={state}
        setState={setState}
        videoTitle="Как пользоваться страницей с Командой"
        videoSrc="https://www.youtube.com/embed/0-K3ll4jkoo"
      />
    </ContainerStyled>
  );
});

export default UsersLayout;
