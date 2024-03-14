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
import ObjectsFiltersPanel from "@components/UI/filters-panels/objects-filters-panel";
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

const initialState = {
  address: "",
  phone: "",
  name: "",
  company: "",
  cadastralNumber: "",
  fullDescription: "",
  objectActivity: "",
  startDate: null,
  endDate: null,
  selectedDistricts: [],
  selectedCities: [],
  selectedUsers: [],
  selectedStatuses: [],
  selectedCurrentRenters: [],
  selectedEstateTypes: [],
  selectedTradeArea: [],
  selectedObjectProperties: [],
  selectedObjectTypes: [],
  selectedMetro: []
};

const Objects = React.memo(() => {
  const [rowSelection, setRowSelection] = useState([]);

  const [state, setState] = useState({
    selectedObjects: [],
    selectedBaloon: null,
    rowSelection: [],
    objectPage: false,
    createPage: false,
    updatePage: false,
    objectId: null,
    presentationPage: false,
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
    defaultValues: !!localStorageState ? formatedState : initialState,
    mode: "onChange"
  });

  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());
  const objectsSatuses = useSelector(getObjectsStatusList());

  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isUsersLoading =
    useSelector(getIsLoggedIn()) && useSelector(getUsersLoadingStatus());

  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isManager = useSelector(getIsUserManager(currentUserId));
  const isHideCheckbox = isCurator ? false : true;

  const objects = useSelector(getObjectsList());

  const selectedObject = useSelector(getObjectById(state.selectedBaloon));
  const searchedObjects = useSearchObject(objects, data);
  const sortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["desc"]);
  }, [searchedObjects]);
  const modifiedObjectsData = useModifyObjectToExportExel(sortedObjects);

  const {
    handleOpenCreateObjectPage,
    handleOpenObjectPage,
    handleOpenTransferObjectPage,
    handleOpenVideoPlayerPage,
    handleOpenContactPage,
    handleOpenUpdateCompanyPage
  } = useDialogHandlers(setState);

  const handleSelectedBaloon = (item) => {
    setState((prevState) => ({ ...prevState, selectedBaloon: item }));
  };

  const handleSelectObjects = (objects) => {
    setState((prevState) => ({ ...prevState, selectedObjects: objects }));
  };

  useEffect(() => {
    localStorage.setItem("search-objects-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-objects-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem("search-objects-data", JSON.stringify(initialState));
    }
  }, []);

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
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateObjectPage={handleOpenCreateObjectPage}
        onOpenTransferObjectPage={handleOpenTransferObjectPage}
        onOpenVideoPlayerPage={handleOpenVideoPlayerPage}
        isCurator={isCurator}
        isInputEmpty={isInputEmpty}
      />
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
      <ObjectsFiltersPanel
        data={data}
        objects={objects}
        statuses={objectsSatuses}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isLoading}
      />
      <BasicTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        items={sortedObjects}
        itemsColumns={objectsColumns(
          handleOpenObjectPage,
          isCurator,
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
      <PageDialogs
        state={state}
        setState={setState}
        selectedObjects={state.selectedObjects}
        setRowSelection={setRowSelection}
        videoTitle="Как пользоваться страницей с Объектами"
        videoSrc="https://www.youtube.com/embed/zz_SjeT_-M4"
      />
    </ContainerStyled>
  );
});

export default Objects;
