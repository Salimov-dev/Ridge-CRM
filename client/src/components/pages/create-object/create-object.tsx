// libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// components
import ObjectForm from "../../common/forms/object-form/object-form";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
import TitleWithAddress from "../../common/page-titles/title-with-address";
// store
import { createObject } from "../../../store/object/objects.store";
// hooks
import useFindObject from "../../../hooks/object/use-find-object";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import { districtsSPB } from "../../../mock/districts/districts-spb";
import { districtsMSK } from "../../../mock/districts/districts-msk";

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

const CreateObject = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
  });

  const {
    getCity,
    getDistrict,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const districtsSPBArray = districtsSPB
  const districtsMSKArray = districtsMSK

  const data = watch();
  // console.log("data", data);
  
  const watchAddress = watch<any>("location.address", "");
  const watchCity = watch<any>("location.city", "");
  const watchDistrict = watch("location.district", "");
  const watchObjectTypes = watch("estateOptions.objectTypes", "");
  const watchEstateTypes = watch("estateOptions.estateTypes", "");
  const watchCurrentRenters = watch("estateOptions.currentRenters", "");
  const watchStatus = watch("status", "");
  const watchObjectProperties = watch("estateOptions.objectProperties", "");
  const isWatchValid =
    Boolean(watchDistrict) &&
    Boolean(watchObjectTypes) &&
    Boolean(watchEstateTypes) &&
    Boolean(watchCurrentRenters) &&
    Boolean(watchStatus) &&
    Boolean(watchObjectProperties);

  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const isObjectHasAddress = Boolean(watchCity) && Boolean(watchAddress);
  const isValidAndHasAdress = isFindedObject && isObjectHasAddress && isWatchValid;

  const onSubmit = (data) => {
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
    console.log("newData", newData);
    
    // dispatch<any>(createObject(newData)).then(onClose());
  };

  useEffect(() => {
    setValue<any>("location.city", getCity());
    setValue<any>("location.address", getAddress());
    setValue<any>("location.district", getDistrict());
    setValue<any>("location.latitude", getLatitudeCoordinates());
    setValue<any>("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  return (
    <>
      <TitleWithAddress
        isFindedObject={isFindedObject}
        city={getCity()}
        address={getAddress()}
        title="Создать объект:"
        subtitle="Выберите объект на карте"
        onClose={onClose}
      />

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
    </>
  );
};

export default CreateObject;
