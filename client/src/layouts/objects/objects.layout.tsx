// libraries
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// components
import BasicTable from "@components/common/table/basic-table";
import HeaderLayout from "@components/common/page-headers/header-layout";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import { ContainerStyled } from "@components/common/container/container-styled";
import PageDialogs from "@components/common/dialog/page-dialogs";
import ObjectsLayoutFiltersPanel from "@components/UI/filters-panels/objects-layout/objects-layout.filters-panel";
import { objectsLayoutInitialState } from "@components/UI/filters-panels/objects-layout/objects-layout-initial-state.filters-panel";
import ButtonsObjectsLayout from "./components/buttons-objects-layout";
import ObjectBalloon from "@components/UI/maps/object-balloon";
// columns
import { objectsColumns } from "@columns/objects.columns";
// utils
import { getItemsIdsFromRowSelection } from "@utils/table/get-items-Ids-from-row-selection";
// hooks
import useSearchObject from "@hooks/object/use-search-object";
// store
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus
} from "@store/object/objects.store";

const ObjectsLayout = React.memo(() => {
  const [rowSelection, setRowSelection] = useState([]);
  const [selectedRowObjects, setSelectedRowObjects] = useState([]);
  const [selectedBalloon, setSelectedBalloon] = useState([]);
  const [stateDialogPages, setStateDialogPages] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    objectId: null,
    createPresentationPage: false,
    transferObjectPage: false,
    videoPlayerPage: false
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-objects-data")
  );

  const formatedState = {
    ...localStorageState,
    startDate: localStorageState?.startDate
      ? dayjs(localStorageState?.startDate)
      : null,
    endDate: localStorageState?.endDate
      ? dayjs(localStorageState?.endDate)
      : null
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: !!localStorageState
      ? formatedState
      : objectsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();
  const objects = useSelector(getObjectsList());
  const isLoading = useSelector(getObjectsLoadingStatus());

  const selectedObjectOnMap = useSelector(getObjectById(selectedBalloon));
  const sortedSearchedObjects = useSearchObject(objects, data);

  const handleSelectBalloon = (item) => {
    setSelectedBalloon(item);
  };

  const handleSelectRowObjects = (objects) => {
    setSelectedRowObjects(objects);
  };

  useEffect(() => {
    handleSelectRowObjects(
      getItemsIdsFromRowSelection(sortedSearchedObjects, rowSelection)
    );
  }, [rowSelection]);

  useEffect(() => {
    localStorage.setItem("search-objects-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-objects-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-objects-data",
        JSON.stringify(objectsLayoutInitialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Таблица объектов" />
      <ButtonsObjectsLayout
        data={data}
        reset={reset}
        setState={setStateDialogPages}
      />
      <ItemsOnMap
        items={sortedSearchedObjects}
        onClick={handleSelectBalloon}
        isLoading={isLoading}
        baloon={
          <ObjectBalloon
            object={selectedObjectOnMap}
            setState={setStateDialogPages}
          />
        }
      />
      <ObjectsLayoutFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
      />
      <BasicTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        items={sortedSearchedObjects}
        itemsColumns={objectsColumns(setStateDialogPages)}
        isLoading={isLoading}
      />
      <PageDialogs
        state={stateDialogPages}
        setState={setStateDialogPages}
        selectedObjects={selectedRowObjects}
        setRowSelection={setRowSelection}
        isObjectPage={true}
        videoTitle="Как пользоваться Таблицей объектов"
        videoSrc="https://www.youtube.com/embed/i7INzzNfG1o"
      />
    </ContainerStyled>
  );
});

export default ObjectsLayout;
