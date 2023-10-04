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
import { objectSchema } from "../../../schemas/object-schema";
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
  cloudLink: "",
};

const CreateObject = ({ onClose }) => {
  const dispatch = useDispatch();
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

  const watchAddress = watch<any>("location.address", "");
  const watchCity = watch<any>("location.city", "");

  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const isObjectHasAddress = Boolean(watchCity) && Boolean(watchAddress);
  // const isValidAndHasAdress = isFindedObject && isObjectHasAddress && isValid;
  const isValidAndHasAdress = true;

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

    dispatch<any>(createObject(newData))
      .then(onClose())
      .then(toast.success("Объект успешно создан!"));
  };

  useEffect(() => {
    setValue<any>("location.city", getCity());
    setValue<any>("location.address", getAddress());
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
