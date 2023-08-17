// libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// MUI
import { Box } from "@mui/material";
// components
import ObjectForm from "../../common/forms/object-form";
import FindObjectOnMap from "../../common/find-object-on-map";
// store
import { createObject } from "../../../store/objects.store";
// other
import useFindObject from "../../../hooks/use-find-object";
import { objectSchema } from "../../../schemas/schemas";
import { capitalizeFirstLetter } from "../../../utils/capitalize-first-letter";
import TitleWithAddress from "../../common/page-titles/title-with-address";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const isEmptyFindedObject = Boolean(Object.keys(findedObject)?.length);

  const watchName = watch("contact.name");
  const watchStatus = watch("status");
  const watchDistrict = watch("location.district");
  const watchMetro = watch("location.metro");
  const watchCurrentRenters = watch("estateOptions.currentRenters");
  const watchobjectConditions = watch("estateOptions.objectConditions");
  const watchRentTypes = watch("estateOptions.rentTypes");
  const watchObjectTypes = watch("estateOptions.objectTypes");
  const watchEstateTypes = watch("estateOptions.estateTypes");

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
    // console.log("newData", newData);

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
        isEmptyFindedObject={isEmptyFindedObject}
        watchName={watchName}
        watchDistrict={watchDistrict}
        watchMetro={watchMetro}
        watchCurrentRenters={watchCurrentRenters}
        watchobjectConditions={watchobjectConditions}
        watchRentTypes={watchRentTypes}
        watchObjectTypes={watchObjectTypes}
        watchEstateTypes={watchEstateTypes}
        watchStatus={watchStatus}
      />
    </Box>
  );
};

export default CreateObject;
