// libraries
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ObjectForm from "../../common/forms/object-form/object-form";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
import TitleWithAddress from "../../common/page-titles/title-with-address";
// store
import { createObject } from "../../../store/object/objects.store";
// schemas
import { objectSchema } from "../../../schemas/schemas";
// hooks
import useFindObject from "../../../hooks/object/use-find-object";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

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
  },
  commercialTerms: {
    rentPrice: "",
    securityDeposit: "",
    totalSquare: "",
    rentSquare: "",
    rentalHolidays: "",
    agentComission: "",
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
  },
  description: {
    fullDescription: "",
  },
};

const CreateObject = ({ onClose }) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(objectSchema),
  });

  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const dispatch = useDispatch();
  const data = watch();
  const watchAddress = watch("location.address", "");
  const watchCity = watch("location.city", "");
  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const isObjectHasAddress = Boolean(watchCity) && Boolean(watchAddress);


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
        zoom: 16,
      },
      description: {
        ...data.description,
        fullDescription: capitalizeFirstLetter(
          data.description.fullDescription
        ),
      },
    };

    dispatch(createObject(newData))
      .then(onClose())
      .then(toast.success("Объект успешно создан!"));
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  return (
    <>
      <TitleWithAddress
        isFindedObject={isFindedObject}
        getCity={getCity}
        getAddress={getAddress}
        title="Создать объект:"
        subtitle="Выберите объект на карте"
        onClose={onClose}
      />

      <FindObjectOnMap />

      <ObjectForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isValid={isValid}
        watch={watch}
        isFindedObject={isFindedObject}
        isObjectHasAddress={isObjectHasAddress}
        onClose={onClose}
      />
    </>
  );
};

export default CreateObject;
