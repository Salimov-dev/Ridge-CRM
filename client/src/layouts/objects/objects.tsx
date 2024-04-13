// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
// columns
import { objectsColumns } from "@columns/objects.columns";
// components
import ObjectBaloon from "@components/UI/maps/object-baloon";
import ObjectsFiltersPanel from "@components/UI/filters-panels/objects-layout/objects-layout.filters-panel";
import BasicTable from "@components/common/table/basic-table";
import HeaderLayout from "@components/common/page-headers/header-layout";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import ExportToExelButton from "@components/common/buttons/export-to-excel.button";
import Buttons from "./components/buttons";
import { ContainerStyled } from "@components/common/container/container-styled";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
import useSearchObject from "@hooks/object/use-search-object";
import useModifyObjectToExportExel from "@hooks/object/use-modify-object-to-export-exel";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import {
  getCurrentUserId,
  getIsLoggedIn,
  getIsUserCurator,
  getIsUserManager,
  getUsersLoadingStatus
} from "@store/user/users.store";
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus
} from "@store/object/objects.store";
import ObjectsLayoutFiltersPanel from "@components/UI/filters-panels/objects-layout/objects-layout.filters-panel";
import { objectsLayoutInitialState } from "@components/UI/filters-panels/objects-layout/objects-layout-initial-state.filters-panel";

const Objects = React.memo(() => {
  const [rowSelection, setRowSelection] = useState([]);

  // выделить состояние для диалог окон и назвать типа stateDialogPages, состояние НЕ ДЛЯ ДИАЛОГОВ окон вынести в другое состояние
  const [state, setState] = useState({
    selectedObjects: [], // проверить объекты или только Ids? тогда selecteObjectIds
    selectedBaloon: null, // selectedObjectBaloon
    rowSelection: [], // переименовать на selecteObjectdRows
    objectPage: false, //
    createPage: false, // createObjectPage
    updatePage: false, // updateObjectPage
    objectId: null, // updatedObjectId
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
  const currentUserId = useSelector(getCurrentUserId());
  const objectsSatuses = useSelector(getObjectsStatusList());

  const isInputEmpty =
    JSON.stringify(objectsLayoutInitialState) !== JSON.stringify(data);
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isUsersLoading =
    useSelector(getIsLoggedIn()) && useSelector(getUsersLoadingStatus());

  // перенести глубже туда где используется, а не тут
  // сами методы переименовать на checkIsUserRoleManager
  const isCurator = useSelector(getIsUserCurator(currentUserId)); // дописать, что если нет userId, тогда брать id текущего юзера, переменную переименовать
  const isManager = useSelector(getIsUserManager(currentUserId)); // дописать, что если нет userId, тогда брать id текущего юзера, переменную переименовать

  // перенести в таблицу, а не тут
  const isHideCheckbox = isCurator ? false : true;

  const objects = useSelector(getObjectsList());

  // перенести глубже в хук и вернуть только sortedObjects
  const selectedObject = useSelector(getObjectById(state.selectedBaloon)); // переменную переименовать
  const searchedObjects = useSearchObject(objects, data);
  const sortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["desc"]);
  }, [searchedObjects]);

  const modifiedObjectsData = useModifyObjectToExportExel(sortedObjects);

  // выделить в отдельный метод для этого компонента dialogHandlers.objects-layout.tsx, это не хук!
  const {
    handleOpenCreateObjectPage,
    handleOpenObjectPage,
    handleOpenTransferObjectPage,
    handleOpenVideoPlayerPage,
    handleOpenContactPage,
    handleOpenUpdateCompanyPage
  } = useDialogHandlers(setState);

  // переменную переименовать и сделать отдельное состояние
  const handleSelectedBaloon = (item) => {
    setState((prevState) => ({ ...prevState, selectedBaloon: item }));
  };

  // переменную переименовать и сделать отдельное состояние
  const handleSelectObjects = (objects) => {
    setState((prevState) => ({ ...prevState, selectedObjects: objects }));
  };

  // вынести в отдельный хук всю работу с localStorage
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

  // вынести в отдельную функцию
  useEffect(() => {
    const getObjectsIdFromRowSelection = () => {
      return Object.keys(rowSelection)
        .map((index) => {
          const objectIndex = parseInt(index, 10);
          if (
            !isNaN(objectIndex) &&
            objectIndex >= 0 &&
            objectIndex < sortedObjects.length
          ) {
            return sortedObjects[objectIndex]._id;
          }
          return null;
        })
        .filter((objectId) => objectId !== null);
    };

    handleSelectObjects(getObjectsIdFromRowSelection());
  }, [rowSelection]);

  return (
    <ContainerStyled>
      <HeaderLayout title="Таблица объектов" />
      {/* переименовать в ButtonsObjectsLayout, хендлеры вызвать внутри, а не передавать в парамсах */}
      <Buttons
        initialState={objectsLayoutInitialState}
        reset={reset}
        onOpenCreateObjectPage={handleOpenCreateObjectPage}
        onOpenTransferObjectPage={handleOpenTransferObjectPage}
        onOpenVideoPlayerPage={handleOpenVideoPlayerPage}
        isCurator={isCurator}
        isInputEmpty={isInputEmpty}
      />
      {/* переименовать ObjectBaloon В ObjectBalloon*/}
      <ItemsOnMap
        items={searchedObjects}
        onClick={handleSelectedBaloon}
        isLoading={isLoading}
        baloon={
          <ObjectBaloon
            object={selectedObject}
            onOpenObjectPage={handleOpenObjectPage}
            isLoading={isLoading}
          />
        }
      />
      {/* переименовать в ObjectsLayoutFiltersPanel*/}
      <ObjectsLayoutFiltersPanel
        data={data}
        objects={objects}
        statuses={objectsSatuses}
        register={register}
        setValue={setValue}
        isManager={isManager}
        isLoading={isLoading}
      />
      {/* передать setState, а не хендлеры */}
      <BasicTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        items={sortedObjects}
        itemsColumns={objectsColumns(
          handleOpenObjectPage,
          handleOpenContactPage,
          handleOpenUpdateCompanyPage,
          isHideCheckbox,
          isManager
        )}
        isLoading={isUsersLoading}
      />
      {/* {isCurator && (
        <ExportToExelButton
          title="Скачать объекты в EXCEL"
          data={modifiedObjectsData}
        />
      )} */}
      {/* разбить в objects-layout.page-dialogs.tsx */}
      <PageDialogs
        state={state}
        setState={setState}
        selectedObjects={state.selectedObjects}
        setRowSelection={setRowSelection}
        isObjectPage={true}
        videoTitle="Как пользоваться Таблицей объектов"
        videoSrc="https://www.youtube.com/embed/i7INzzNfG1o"
      />
    </ContainerStyled>
  );
});

export default Objects;
