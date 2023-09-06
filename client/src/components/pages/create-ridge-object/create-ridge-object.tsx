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

const initialState = {
  contacts: "",
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
  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
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
  const isEmptyFindedObject = !Boolean(Object.keys(findedObject)?.length);
  const isObjectHasAddress = data?.location?.city && data?.location?.address;

  const onSubmit = (data) => {
    const newData = {
      ...data,
      contacts: capitalizeFirstLetter(data?.contacts),
      findedContacts: capitalizeFirstLetter(data?.findedContacts),
      comment: capitalizeFirstLetter(data?.comment),
    };

    // dispatch(createObject(newData))
    //   .then(onClose())
    //   .then(toast.success("Объект успешно создан!"));
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
        isEmptyFindedObject={isEmptyFindedObject}
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
        isValid={isObjectHasAddress}
        watch={watch}
        isEmptyFindedObject={isEmptyFindedObject}
        isObjectHasAddress={isObjectHasAddress}
        onClose={onClose}
      />
    </>
  );
};

export default CreateRidgeObject;
