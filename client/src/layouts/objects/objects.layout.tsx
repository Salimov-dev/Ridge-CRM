// libraries
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
// components
import DialogPages from "@dialogs/dialog-pages";
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import ButtonsObjectsLayout from "@components/UI/layout-buttons/buttons.objects-layout";
// initial-states
import { objectsLayoutInitialState } from "@initial-states/layouts/objects-layout.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// columninterfacess
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { RowSelection } from "@interfaces/table/row-selection.type";
// utils
import { getItemsIdsFromRowSelection } from "@utils/table/get-items-Ids-from-row-selection";
import getLocalStorageFiltersState from "@utils/local-storage/get-local-storage-filters-state";
import setLocalStorageFiltersState from "@utils/local-storage/set-local-storage-filters-state";
// hooks
import useSearchObject from "@hooks/object/use-search-object";
// store
import ObjectsLayoutContent from "./components/content.objects-layout";

const ObjectsLayout = React.memo(() => {
  const [rowSelection, setRowSelection] = useState<RowSelection>([]);
  const [selectedRowObjects, setSelectedRowObjects] = useState<string[]>([]);
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const { localStorageData, formatedState } = getLocalStorageFiltersState({
    title: "search-objects-data"
  });

  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageData ? formatedState : objectsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const sortedSearchedObjects = useSearchObject({ data });

  setLocalStorageFiltersState({
    title: "search-objects-data",
    data: data
  });

  const handleSelectRowObjects = (objects: string[]) => {
    setSelectedRowObjects(objects);
  };

  useEffect(() => {
    handleSelectRowObjects(
      getItemsIdsFromRowSelection(sortedSearchedObjects, rowSelection)
    );
  }, [rowSelection]);

  return (
    <ContainerStyled>
      <HeaderForLayout title="Таблица объектов" />
      <ButtonsObjectsLayout
        data={data}
        reset={reset}
        setState={setStateDialogPages}
      />
      <ObjectsLayoutContent
        data={data}
        register={register}
        setValue={setValue}
        setStateDialogPages={setStateDialogPages}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        objects={sortedSearchedObjects}
      />
      <DialogPages
        state={stateDialogPages}
        setState={setStateDialogPages}
        selectedObjects={selectedRowObjects}
        setRowSelection={setRowSelection}
        videoTitle="Как пользоваться Таблицей объектов"
        videoSrc="https://www.youtube.com/embed/i7INzzNfG1o"
      />
    </ContainerStyled>
  );
});

export default ObjectsLayout;
