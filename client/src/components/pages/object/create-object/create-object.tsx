// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ObjectForm from "@components/common/forms/object-form/object.form";
import FindObjectOnMap from "@common/find-object-on-map/find-object-on-map";
import AlertObjectInDatabase from "./components/alert-object-in-database";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
// store
import { createObject, getObjectsList } from "@store/object/objects.store";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// schema
import { objectSchema } from "@schemas/object.schema";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { capitalizeAllFirstLetters } from "@utils/data/capitalize-all-first-letters";
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";

const initialState = {
  status: null,
  contact: null,
  fullDescription: null,
  city: null,
  address: null,
  district: null,
  metro: null,
  identifier: null,
  rentPrice: null,
  priceForMetr: null,
  securityDeposit: null,
  advanseDeposit: null,
  agentComission: null,
  rentSquare: null,
  rentalHolidays: null,
  indexingAnnual: null,
  rentTypes: null,
  currentRenters: null,
  objectConditions: null,
  estateTypes: null,
  objectTypes: null,
  tradeArea: null,
  premisesHeight: null,
  premisesFloor: null,
  parkingQuantity: null,
  electricityKw: null,
  waterSuply: null,
  cadastralNumber: null,
  loadingArea: null,
  objectProperties: null,
  cloudLink: null
};

const CreateObject = React.memo(({ onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedArea, setSelectedArea] = useState("");
  // const [isCityHasMetro, setIsCityHasMetro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isObjectAlreadyInDatabase, setObjectAlreadyInDatabase] =
    useState(false);

  const {
    register,
    watch,
    handleSubmit,
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
      rentalHolidays: removeSpacesAndConvertToNumber(data.rentalHolidays),
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
      selectedArea?.includes("Москва")
    ) {
      // setIsCityHasMetro(true);
      setValue("district", "");
    } else {
      // setIsCityHasMetro(false);
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
        title={
          !isFindedObject
            ? "КЛИКНИТЕ по карте, чтобы выбрать объект"
            : `Создать объект: ${getCity()}, ${getAddress()}`
        }
        color={!isFindedObject ? "white" : "black"}
        margin="0 0 20px 0"
        background={
          !isFindedObject ? colors.error["red"] : colors.header["gold"]
        }
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
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default CreateObject;
