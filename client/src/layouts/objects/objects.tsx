// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
// columns
import { objectsColumns } from "../../columns/objects-columns/objects-columns";
// components
import ObjectBaloon from "@components/UI/maps/object-baloon";
import ObjectsFiltersPanel from "@components/UI/filters-panels/objects-filters-panel";
import BasicTable from "@components/common/table/basic-table";
import LayoutTitle from "@components/common/page-titles/layout-title";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import ExportToExelButton from "@components/common/buttons/export-to-excel-button";
import CreateObject from "@components/pages/create-object/create-object";
import DialogStyled from "@components/common/dialog/dialog-styled";
import UpdateObject from "@components/pages/update-object/update-object";
import ObjectPage from "@components/pages/object-page/object-page";
import CreatePresentation from "@components/pages/create-presentation/create-presentation";
import Buttons from "./components/buttons";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager";
// hooks
import useSearchObject from "@hooks/object/use-search-object";
import useModifyObjectToExportExel from "@hooks/object/use-modify-object-to-export-exel";
// store
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus,
} from "@store/object/objects.store";

const initialState = {
  address: "",
  phone: "",
  name: "",
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
  selectedMetro: [],
};

const Objects = React.memo(() => {
  const [rowSelection, setRowSelection] = useState([]);
  const [selectedBaloon, setSelectedBaloon] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState([]);

  const [state, setState] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    objectId: null,
    presentationPage: false,
    transferObjectPage: false,
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
      : null,
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState) ? formatedState : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const objects = useSelector(getObjectsList());
  const objectsSatuses = useSelector(getObjectsStatusList());
  const selectedObject = useSelector(getObjectById(selectedBaloon));
  const searchedObjects = useSearchObject(objects, data);
  const sortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["desc"]);
  }, [searchedObjects]);
  const modifiedObjectsData = useModifyObjectToExportExel(sortedObjects);

  // обновление стейта при открытии страницы создания объекта
  const handleOpenCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: true }));
  };
  const handleCloseCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: false }));
  };

  // обновление стейта при открытии страницы обновления объекта
  const handleOpenUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: true }));
  };
  const handleCloseUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: false }));
  };

  // обновление стейта при открытии страницы объекта
  const handleOpenObjectPage = (objectId) => {
    setState((prevState) => ({
      ...prevState,
      objectPage: true,
      objectId: objectId,
    }));
  };
  const handleCloseObjectPage = () => {
    setState((prevState) => ({ ...prevState, objectPage: false }));
  };

  // обновление стейта при открытии окна создания презентации
  const handleOpenCreatePresentationPage = () => {
    setState((prevState) => ({ ...prevState, presentationPage: true }));
  };
  const handleCloseCreatePresentationPage = () => {
    setState((prevState) => ({ ...prevState, presentationPage: false }));
  };

  // обновление стейта при открытии окна передачи объекта другому менеджеру
  const handleOpenTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: true }));
  };
  const handleCloseTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: false }));
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

    setSelectedObjects(getObjectsIdFromRowSelection());
  }, [rowSelection]);

  return (
    <>
      <LayoutTitle title="Таблица объектов" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateObjectPage={handleOpenCreateObjectPage}
        isCurator={isCurator}
        isInputEmpty={isInputEmpty}
      />
      <ItemsOnMap
        items={searchedObjects}
        onClick={setSelectedBaloon}
        baloon={<ObjectBaloon object={selectedObject} />}
        isLoading={isLoading}
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
        itemsColumns={objectsColumns(handleOpenObjectPage, isCurator)}
        isLoading={isLoading}
      />
      {isCurator && (
        <ExportToExelButton
          title="Скачать все объекты в EXEL"
          data={modifiedObjectsData}
        />
      )}

      <DialogStyled
        component={
          <ObjectPage
            onClose={handleCloseObjectPage}
            onEdit={handleOpenUpdateObjectPage}
            objectId={state.objectId}
          />
        }
        onClose={handleCloseObjectPage}
        open={state.objectPage}
        maxWidth="lg"
      />
      <DialogStyled
        component={<CreateObject onClose={handleCloseCreateObjectPage} />}
        onClose={handleCloseCreateObjectPage}
        open={state.createPage}
        maxWidth="lg"
      />
      <DialogStyled
        component={<UpdateObject onClose={handleCloseUpdateObjectPage} />}
        onClose={handleCloseUpdateObjectPage}
        open={state.updatePage}
        maxWidth="lg"
      />
      <DialogStyled
        component={
          <CreatePresentation onClose={handleCloseCreatePresentationPage} />
        }
        onClose={handleCloseUpdateObjectPage}
        open={state.presentationPage}
        maxWidth="lg"
      />
      <DialogStyled
        onClose={handleCloseTransferObjectPage}
        open={state.transferObjectPage}
        fullWidth={false}
        component={
          <TransferObjectToAnotherManager
            title="Передать объекты"
            objectsToTransfer={selectedObjects}
            onClose={handleCloseTransferObjectPage}
            setRowSelection={setRowSelection}
          />
        }
      />
    </>
  );
});

export default Objects;
