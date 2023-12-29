// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// components
import ObjectForm from "@common/forms/object-form/object-form";
import FindObjectOnMap from "@common/find-object-on-map/find-object-on-map";
import TitleWithAddress from "@common/page-titles/title-with-address";
import IsLoadingDialog from "@common/dialog/is-loading-dialog";
// store
import { getObjectsList } from "@store/object/objects.store";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import AlertObjectInDatabase from "./components/alert-object-in-database";
import { yupResolver } from "@hookform/resolvers/yup";
import { objectSchema } from "@schemas/object-schema";

const initialState = {
  status: "",
  contact: {
    phone: "",
    name: "",
    position: "",
    email: "",
  },
  location: {
    city: "",
    address: "",
    district: "",
    metro: "",
    identifier: "",
  },
  commercialTerms: {
    rentPrice: "",
    priceForMetr: "",
    securityDeposit: "",
    advanseDeposit: "",
    agentComission: "",
    rentSquare: "",
    rentalHolidays: "",
    indexingAnnual: "",
    rentTypes: "",
  },
  estateOptions: {
    currentRenters: "",
    objectConditions: "",
    estateTypes: "",
    objectTypes: "",
    tradeArea: "",
    premisesHeight: "",
    premisesFloor: "",
    parkingQuantity: "",
    electricityKw: "",
    waterSuply: "",
    cadastralNumber: "",
    loadingArea: "",
    objectProperties: "",
  },
  description: {
    fullDescription: "",
  },
  cloudLink: "",
};

const CreateObject = React.memo(({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isObjectAlreadyInDatabase, setObjectAlreadyInDatabase] =
    useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(objectSchema),
  });
  console.log("errors", errors);
  // console.log("isValid", isValid);

  const {
    getCity,
    getDistrict,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const data = watch();
  console.log("data", data);

  const objects = useSelector(getObjectsList());

  const watchAddress = watch<any>("location.address", "");
  const watchCity = watch<any>("location.city", "");

  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const findedObjectFullAddress = `${watchCity}, ${watchAddress}`;
  const isObjectHasAddress = Boolean(watchCity) && Boolean(watchAddress);
  const isValidAndHasAdress = isFindedObject && isObjectHasAddress && isValid;

  const onSubmit = (data) => {
    // setIsLoading(true);

    const newData = {
      ...data,
      contact: {
        ...data.contact,
        name: capitalizeFirstLetter(data.contact.name),
      },
      estateOptions: {
        ...data.estateOptions,
        premisesFloor: capitalizeFirstLetter(data.estateOptions.premisesFloor),
      },
      location: {
        ...data.location,
        city: capitalizeFirstLetter(data.location.city),
        address: capitalizeFirstLetter(data.location.address),
        zoom: 16,
      },
      description: {
        ...data.description,
        fullDescription: capitalizeFirstLetter(
          data.description.fullDescription
        ),
      },
    };
    // dispatch<any>(createObject(newData))
    //   .then(() => {
    //     setIsLoading(false);
    //     onClose();
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     toast.error(error);
    //   });
  };

  useEffect(() => {
    setValue<any>("location.city", getCity());
    setValue<any>("location.address", getAddress());
    setValue<any>("location.district", getDistrict());
    setValue<any>("location.latitude", getLatitudeCoordinates());
    setValue<any>("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  useEffect(() => {
    const objectInDatabase = objects?.filter(
      (obj) =>
        `${obj.location.city}, ${obj.location.address}` ===
        findedObjectFullAddress
    );
    const isObjectInDatabase = Boolean(objectInDatabase?.length);
    setObjectAlreadyInDatabase(isObjectInDatabase);
  }, [findedObjectFullAddress]);

  return (
    <>
      <TitleWithAddress
        isFindedObject={isFindedObject}
        city={getCity()}
        address={getAddress()}
        title="Создать объект:"
        subtitle="КЛИКНИТЕ по карте, чтобы выбрать объект на карте"
        onClose={onClose}
      />

      {isObjectAlreadyInDatabase && <AlertObjectInDatabase />}

      <FindObjectOnMap />

      <ObjectForm
        data={data}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        isValid={isValidAndHasAdress}
        onClose={onClose}
        setValue={setValue}
      />

      {isLoading && (
        <IsLoadingDialog
          text="Немного подождите, создаем новый `Объект`"
          isLoading={isLoading}
        />
      )}
    </>
  );
});

export default CreateObject;
