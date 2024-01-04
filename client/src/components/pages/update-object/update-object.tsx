// libraries
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { Box } from "@mui/material";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import ObjectForm from "../../common/forms/object-form/object.form";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import HeaderWithBackButton from "../../common/page-headers/header-with-back-button";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
// schemas
import { objectSchema } from "@schemas/object-schema";
// store
import {
  getObjectById,
  updateObject,
} from "../../../store/object/objects.store";
import SuccessCancelFormButtons from "@components/common/forms/success-cancel-form-buttons/success-cancel-form-buttons";

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const UpdateObject = React.memo(({ onClose, objectId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const object = useSelector(getObjectById(objectId));

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: object,
    mode: "onChange",
    resolver: yupResolver(objectSchema),
  });

  const data = watch();

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data,
      contact: {
        ...data.contact,
        name: capitalizeFirstLetter(data.contact.name),
      },
      description: {
        ...data.description,
        fullDescription: capitalizeFirstLetter(
          data.description.fullDescription
        ),
      },
      estateOptions: {
        ...data.estateOptions,
        loadingArea: capitalizeFirstLetter(data.estateOptions.loadingArea),
        premisesFloor: capitalizeFirstLetter(data.estateOptions.premisesFloor),
      },
      location: {
        ...data.location,
        city: capitalizeFirstLetter(data.location.city),
        address: capitalizeFirstLetter(data.location.address),
      },
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
        subtitle={`${object.location.city}, ${object.location.address}`}
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
