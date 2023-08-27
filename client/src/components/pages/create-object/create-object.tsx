// libraries
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Box } from "@mui/material";
// components
import ObjectForm from "../../common/forms/object-form/object-form";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
import TitleWithAddress from "../../common/page-titles/title-with-address";
// store
import { createObject } from "../../../store/objects.store";
// other
import { objectSchema } from "../../../schemas/schemas";
import useFindObject from "../../../hooks/use-find-object";
import { capitalizeFirstLetter } from "../../../utils/capitalize-first-letter";

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

const CreateObject = () => {
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

  const data = watch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmptyFindedObject = !Boolean(Object.keys(findedObject)?.length);
  const isObjectHasAddress = data?.location?.city && data?.location?.address;

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
    console.log("newData", newData);

    dispatch(createObject(newData))
      .then(navigate("/objects"))
      .then(toast.success("Объект успешно создан!"));
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  return (
    <Box>
      <TitleWithAddress
        isEmptyFindedObject={isEmptyFindedObject}
        getCity={getCity}
        getAddress={getAddress}
        title="Создать объект:"
        subtitle="Выберите объект на карте"
        path="objects"
      />

      <FindObjectOnMap />

      <ObjectForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isValid={isValid}
        watch={watch}
        isEmptyFindedObject={isEmptyFindedObject}
        isObjectHasAddress={isObjectHasAddress}
      />
    </Box>
  );
};

export default CreateObject;
