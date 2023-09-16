// libraries
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ObjectForm from "../../common/forms/object-form/object-form";
import TitleWithAddress from "../../common/page-titles/title-with-address";
// store
import { getUpdateObjectFromRidgeObjectId } from "../../../store/ridge-object/create-object-from-ridge.store";
import { getRidgeObjectById } from "../../../store/ridge-object/ridge-objects.store";
import { createObject } from "../../../store/object/objects.store";
// schemas
import { ridgeObjectSchema } from "../../../schemas/ridge-object-schema";
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

const CreateObjectFromRidge = ({ onClose }) => {
  const dispatch = useDispatch();
  const objectId = useSelector(getUpdateObjectFromRidgeObjectId());
  const object = useSelector(getRidgeObjectById(objectId));

  const cloudLink = object?.cloudLink;
  const phone = object?.contact?.phone;
  const name = object?.contact?.name;
  const position = object?.contact?.position;
  const email = object?.contact?.email;

  const city = object?.location?.city;
  const address = object?.location?.address;
  const district = object?.location?.district;
  const metro = object?.location?.metro;
  const latitude = object?.location?.latitude;
  const longitude = object?.location?.longitude;

  const cadastralNumber = object?.estateOptions?.cadastralNumber;
  const comment = object?.comment;

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

  const onSubmit = (data) => {
    const newData = {
      ...data,
      contact: {
        ...data.contact,
        name: capitalizeFirstLetter(name),
        phone: phone,
        position: position,
        email: email,
      },
      estateOptions: {
        ...data.estateOptions,
        cadastralNumber: cadastralNumber,
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
    setValue("description.fullDescription", comment);
    setValue("location.city", city);
    setValue("location.address", address);
    setValue("location.latitude", latitude);
    setValue("location.longitude", longitude);
    setValue("location.district", district);
    setValue("location.metro", metro);

    setValue("cloudLink", cloudLink);
    setValue("contact.name", name);
    setValue("contact.phone", phone);
    setValue("contact.position", position);
    setValue("contact.email", email);
    setValue("estateOptions.cadastralNumber", cadastralNumber);
  }, []);
  return (
    <>
      <TitleWithAddress
        isFindedObject={true}
        city={city}
        address={address}
        title="Создать объект:"
        subtitle="Выберите объект на карте"
        onClose={onClose}
      />
      <ObjectForm
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        isValid={isValid}
        onClose={onClose}
        onCreate={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default CreateObjectFromRidge;
