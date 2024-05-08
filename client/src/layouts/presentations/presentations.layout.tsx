import { useForm } from "react-hook-form";
import React, { useState } from "react";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@common/container/container-styled";
import PresentationsLayoutContent from "./components/presentations-layout-content";
// initial-states
import { presentationsLayoutInitialState } from "@initial-states/layouts/presentations-layout.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// utils
import setLocalStorageFiltersState from "@utils/local-storage/set-local-storage-filters-state";
import getLocalStorageFiltersState from "@utils/local-storage/get-local-storage-filters-state";
// UI
import ButtonsPresentationsLayout from "@UI/layout-buttons/buttons.presentations-layout";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// dialogs
import DialogPages from "@dialogs/dialog-pages";

const PresentationsLayout = React.memo((): JSX.Element => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const { localStorageData, formatedState } = getLocalStorageFiltersState({
    title: "search-presentations-data"
  });

  const defaultValues = localStorageData
    ? formatedState
    : presentationsLayoutInitialState;

  const { register, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
    mode: "onChange"
  });

  const data = watch();

  setLocalStorageFiltersState({
    title: "search-presentations-data",
    data: data
  });

  return (
    <ContainerStyled>
      <HeaderForLayout title="Презентации" />
      <ButtonsPresentationsLayout
        data={data}
        reset={reset}
        setState={setStateDialogPages}
      />
      <PresentationsLayoutContent
        data={data}
        register={register}
        setValue={setValue}
        setStateDialogPages={setStateDialogPages}
      />
      <DialogPages
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей с Презентациями"
        videoSrc="https://www.youtube.com/embed/J6Hlb3M7TdM"
      />
    </ContainerStyled>
  );
});

export default PresentationsLayout;
