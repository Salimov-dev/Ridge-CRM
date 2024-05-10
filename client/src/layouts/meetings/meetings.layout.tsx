// libraries
import { useForm } from "react-hook-form";
import React, { useState } from "react";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import ButtonsMeetingsLayout from "../../components/UI/layout-buttons/buttons.meetings-layout";
import MeetingsLayoutContent from "./components/content.meetings-layout";
// dialogs
import DialogPages from "@dialogs/dialog-pages";
// initial-states
import { meetingsLayoutInitialState } from "@initial-states/layouts/meetings-layout.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// utils
import getLocalStorageFiltersState from "@utils/local-storage/get-local-storage-filters-state";
import setLocalStorageFiltersState from "@utils/local-storage/set-local-storage-filters-state";

const MeetingsLayout = React.memo(() => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const { localStorageData, formatedState } = getLocalStorageFiltersState({
    title: "search-meetings-data"
  });

  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageData
      ? formatedState
      : meetingsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  setLocalStorageFiltersState({
    title: "search-meetings-data",
    data: data
  });

  return (
    <ContainerStyled>
      <HeaderForLayout title="Встречи" />
      <ButtonsMeetingsLayout
        data={data}
        reset={reset}
        setState={setStateDialogPages}
      />
      <MeetingsLayoutContent
        data={data}
        register={register}
        setValue={setValue}
        setStateDialogPages={setStateDialogPages}
      />
      <DialogPages
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей со Встречами"
        videoSrc="https://www.youtube.com/embed/ywwSfkQ6McY"
      />
    </ContainerStyled>
  );
});

export default MeetingsLayout;
