import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import TitleWithAddress from "../../common/page-titles/title-with-address";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
import RidgeObjectForm from "../../common/forms/ridge-object-form/ridge-object-form";
// hooks
import useFindObject from "../../../hooks/object/use-find-object";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
// store
import { createRidgeObject } from "../../../store/ridge-object/ridge-objects.store";
// schema
import { ridgeObjectSchema } from "../../../schemas/ridge-object-schema";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";

const initialState = {
  findedContacts: "",
  comment: "",
  status: "",
  contact: {
    phone: null,
    name: "",
    position: "",
    email: "",
  },
  estateOptions: {
    cadastralNumber: "",
  },
  location: {
    city: "",
    address: "",
    district: "",
    metro: "",
  },
  cloudLink: "",
};

const CreateRidgeObject = ({ onClose }) => {
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
    resolver: yupResolver(ridgeObjectSchema),
  });

  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const data = watch()
  const watchAddress = watch("location.address", "");
  const watchCity = watch("location.city", "");

  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const isObjectHasAddress = Boolean(watchCity) && Boolean(watchAddress);
  const isValidAndHasAdress = isFindedObject && isObjectHasAddress && isValid;

  const onSubmit = (data) => {
    console.log("onSubmit");

    const newData = {
      ...data,
      contact: {
        ...data.contact,
        name: capitalizeFirstLetter(data.contact.name),
      },
      findedContacts: capitalizeFirstLetter(data?.findedContacts),
      comment: capitalizeFirstLetter(data?.comment),
      location: {
        ...data.location,
        zoom: 16,
      },
    };

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
        city={getCity()}
        address={getAddress()}
        title="Создать объект:"
        subtitle="Выберите объект на карте"
        onClose={onClose}
      />

      <FindObjectOnMap />

      <RidgeObjectForm
      data={data}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        watch={watch}
        errors={errors}
      />
      <FooterButtons
        onCreate={handleSubmit(onSubmit)}
        onClose={onClose}
        isValid={isValidAndHasAdress}
        isRidgeObject={true}
      />
    </>
  );
};

export default CreateRidgeObject;
