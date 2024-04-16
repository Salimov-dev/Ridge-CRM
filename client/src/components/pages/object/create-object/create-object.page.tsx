// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ObjectForm from "@forms/object/object.form";
import FindObjectOnMap from "@common/find-object-on-map/find-object-on-map";
import AlertObjectInDatabase from "./components/alert-object-in-database";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// schema
import { objectSchema } from "@schemas/object/object.schema";
// utils
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
// initial-states
import { objectCreateInitialState } from "@initial-states/pages/object-create.initial-state";
// data
import { objectHasDistrict } from "@data/object/object-has-district";
// store
import { createObject, getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/license/user-license.store";

const CreateObject = React.memo(({ onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [stateDialogPages, setStateDialogPages] = useState({
    createCompanyPage: false
  });
  const [isObjectAlreadyInDatabase, setObjectAlreadyInDatabase] =
    useState(false);

  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: objectCreateInitialState,
    mode: "onChange",
    resolver: yupResolver(objectSchema)
  });

  const {
    getCity,
    getDistrict,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject
  } = useFindObject();

  const data = watch();

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const watchAddress = watch<any>("address", "");
  const watchCity = watch<any>("city", "");

  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const findedObjectFullAddress = `${watchCity}, ${watchAddress}`;

  const getHeaderTitle = () => {
    if (!userLicense?.quantityClicksOnMap) {
      return "Клики по карте на сегодня закончились, попробуйте завтра";
    }
    if (!isFindedObject) {
      return "КЛИКНИТЕ по карте, чтобы выбрать объект";
    }
    if (isFindedObject) {
      return `Создать объект: ${getCity()}, ${getAddress()}`;
    }
  };

  const getColorHeaderTitle = () => {
    if (!userLicense?.quantityClicksOnMap) {
      return colors.error["red"];
    }
    if (!isFindedObject) {
      return colors.error["red"];
    }
    if (isFindedObject) {
      return colors.header["gold"];
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data,
      advanseDeposit: removeSpacesAndConvertToNumber(data.advanseDeposit),
      agentComission: removeSpacesAndConvertToNumber(data.agentComission),
      electricityKw: removeSpacesAndConvertToNumber(data.electricityKw),
      parkingQuantity: removeSpacesAndConvertToNumber(data.parkingQuantity),
      indexingAnnual: removeSpacesAndConvertToNumber(data.indexingAnnual),
      premisesHeight: removeSpacesAndConvertToNumber(data.premisesHeight),
      rentPrice: removeSpacesAndConvertToNumber(data.rentPrice),
      rentSquare: removeSpacesAndConvertToNumber(data.rentSquare),
      rentalHolidays: data.rentalHolidays,
      securityDeposit: removeSpacesAndConvertToNumber(data.securityDeposit)
    };

    dispatch<any>(createObject(newData))
      .then(() => {
        onClose();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // устаналиваю значения для объекта
  useEffect(() => {
    setSelectedArea(getDistrict());
    setValue("district", "");
    setValue<any>("city", getCity());
    setValue<any>("address", getAddress());
    setValue<any>("latitude", getLatitudeCoordinates());
    setValue<any>("longitude", getLongitudeCoordinates());
  }, [findedObject]);

  useEffect(() => {
    if (
      selectedArea?.includes("Санкт-Петербург") ||
      selectedArea?.includes("Москва") ||
      selectedArea?.includes("Казань")
    ) {
      setValue("district", null);
    } else if (objectHasDistrict(selectedArea)) {
      setValue("metro", null);
      setValue("district", null);
    } else {
      setValue("metro", null);
      setValue("district", selectedArea);
    }
  }, [selectedArea]);

  useEffect(() => {
    const objectInDatabase = objects?.filter(
      (obj) => `${obj.city}, ${obj.address}`.trim() === findedObjectFullAddress
    );
    const isObjectInDatabase = Boolean(objectInDatabase?.length);

    setObjectAlreadyInDatabase(isObjectInDatabase);
  }, [findedObjectFullAddress]);

  return (
    <>
      <HeaderWithCloseButtonForPage
        title={getHeaderTitle()}
        color={!isFindedObject ? "white" : "black"}
        margin="0 0 20px 0"
        background={getColorHeaderTitle()}
        onClose={onClose}
      />
      {isObjectAlreadyInDatabase && <AlertObjectInDatabase />}
      <FindObjectOnMap />
      <ObjectForm
        data={data}
        register={register}
        errors={errors}
        watch={watch}
        selectedArea={selectedArea}
        setState={setStateDialogPages}
        control={control}
        setValue={setValue}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
      <LoaderFullWindow isLoading={isLoading} />
      <PageDialogs state={stateDialogPages} setState={setStateDialogPages} />
    </>
  );
});

export default CreateObject;
