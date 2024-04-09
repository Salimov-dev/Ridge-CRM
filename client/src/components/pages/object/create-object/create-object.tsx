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
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// schema
import { objectSchema } from "@schemas/object/object.schema";
// utils
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
// data
import { hasDistrict } from "@data/object/has-district";
// store
import { createObject, getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/user/user-license.store";

const initialState = {
  status: null,
  contact: null,
  fullDescription: "",
  city: null,
  address: null,
  district: null,
  metro: null,
  identifier: "",
  rentPrice: null,
  securityDeposit: null,
  advanseDeposit: null,
  agentComission: null,
  rentSquare: null,
  rentalHolidays: "",
  indexingAnnual: null,
  rentTypes: null,
  currentRenters: null,
  objectConditions: null,
  estateTypes: null,
  objectTypes: null,
  tradeArea: null,
  premisesHeight: null,
  premisesFloor: "",
  parkingQuantity: null,
  electricityKw: null,
  waterSuply: "",
  cadastralNumber: "",
  loadingArea: null,
  objectProperties: null,
  cloudLink: null
};

const CreateObject = React.memo(({ onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedArea, setSelectedArea] = useState("");
  const [state, setState] = useState({
    createCompanyPage: false
  });
  const [isCityHasMetro, setIsCityHasMetro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    defaultValues: initialState,
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
      setIsCityHasMetro(true);
      setValue("district", null);
    } else if (hasDistrict(selectedArea)) {
      setIsCityHasMetro(false);
      setValue("metro", null);
      setValue("district", null);
    } else {
      setIsCityHasMetro(false);
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
      <HeaderWithCloseButton
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
        setState={setState}
        control={control}
        setValue={setValue}
        isCityHasMetro={isCityHasMetro}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
      <LoaderFullWindow isLoading={isLoading} />
      <PageDialogs state={state} setState={setState} />
    </>
  );
});

export default CreateObject;
