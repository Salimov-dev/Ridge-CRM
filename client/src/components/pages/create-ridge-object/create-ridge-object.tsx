import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useFindObject from "../../../hooks/object/use-find-object";
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TitleWithAddress from "../../common/page-titles/title-with-address";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
import RidgeObjectForm from "../../common/forms/ridge-object-form/ridge-object-form";
import { ridgeObjectSchema } from "../../../schemas/schemas";
import { createRidgeObject } from "../../../store/ridge-object/ridge-objects.store";

const initialState = {
  findedContacts: "",
  comment: "",
  status: "",
  location: {
    city: "",
    address: "",
    district: "",
    metro: "",
  },
};

const CreateRidgeObject = ({ onClose }) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(ridgeObjectSchema),
  });

  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const dispatch = useDispatch();
  const watchAddress = watch("location.address", "");
  const watchCity = watch("location.city", "");
  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const isObjectHasAddress = Boolean(watchCity) && Boolean(watchAddress);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      findedContacts: capitalizeFirstLetter(data?.findedContacts),
      comment: capitalizeFirstLetter(data?.comment),
      location: {
        ...data.location,
        zoom: 16,
      },
    };
    console.log("newData", newData);

    dispatch(createRidgeObject(newData))
      .then(onClose())
      .then(toast.success("Объект с грядки собран!"));
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

      <RidgeObjectForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        isValid={isValid}
        watch={watch}
        errors={errors}
        isFindedObject={isFindedObject}
        isObjectHasAddress={isObjectHasAddress}
        onClose={onClose}
      />
    </>
  );
};

export default CreateRidgeObject;
