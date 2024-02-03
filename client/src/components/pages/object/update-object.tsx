// libraries
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import ObjectForm from "@common/forms/object-form/object.form";
import HeaderWithBackButton from "@common/page-headers/header-with-back-button";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// schemas
import { objectSchema } from "@schemas/object.schema";
// store
import { getObjectById, updateObject } from "@store/object/objects.store";

const UpdateObject = React.memo(({ onClose, objectId }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const object = useSelector(getObjectById(objectId));

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: object,
    mode: "onChange",
    resolver: yupResolver(objectSchema)
  });

  const data = watch();

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data,
      address: capitalizeFirstLetter(data.address)
    };

    dispatch<any>(updateObject(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Объект успешно изменен!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  return (
    <>
      <HeaderWithBackButton
        onClose={onClose}
        title="Изменить объект:"
        subtitle={`${object.city}, ${object.address}`}
      />
      <ObjectForm
        data={data}
        register={register}
        errors={errors}
        watch={watch}
        isUpdate={true}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default UpdateObject;
