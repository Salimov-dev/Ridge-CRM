// libraries
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import ObjectForm from "@forms/object/object.form";
import HeaderWithBackButton from "@common/page-headers/header-with-back-button";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
// utils
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
// schemas
import { objectSchema } from "@schemas/object/object.schema";
// store
import { getObjectById, updateObject } from "@store/object/objects.store";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import PageDialogs from "@components/common/dialog/page-dialogs";

const UpdateObject = React.memo(({ onClose, objectId }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const object = useSelector(getObjectById(objectId));

  const [state, setState] = useState({
    createCompanyPage: false,
    updateCompanyPage: false
  });

  const transformedObject = {
    ...object,
    advanseDeposit: String(object.advanseDeposit),
    agentComission: String(object.agentComission),
    electricityKw: String(object.electricityKw),
    parkingQuantity: String(object.parkingQuantity),
    indexingAnnual: String(object.indexingAnnual),
    rentPrice: String(object.rentPrice),
    rentSquare: String(object.rentSquare),
    rentalHolidays: object.rentalHolidays,
    securityDeposit: String(object.securityDeposit)
  };

  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: transformedObject,
    mode: "onChange",
    resolver: yupResolver(objectSchema)
  });

  const data = watch();

  const newCompanies = watch("companies");
  const previousCompanies = object?.companies;
  const objectCompanies = object?.companies;
  const removedCompanies = objectCompanies.filter(
    (obj) => !newCompanies.some((item) => item.company === obj.company)
  );
  const addedCompanies = newCompanies.filter(
    (newCompany) =>
      !objectCompanies.some((obj) => obj.company === newCompany.company)
  );

  const { handleOpenCreateCompanyPage, handleOpenUpdateCompanyPage } =
    useDialogHandlers(setState);

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data,
      advanseDeposit: removeSpacesAndConvertToNumber(data.advanseDeposit),
      agentComission: removeSpacesAndConvertToNumber(data.agentComission),
      electricityKw: removeSpacesAndConvertToNumber(data.electricityKw),
      parkingQuantity: removeSpacesAndConvertToNumber(data.parkingQuantity),
      indexingAnnual: removeSpacesAndConvertToNumber(data.indexingAnnual),
      premisesHeight: removeSpacesAndConvertToNumber(data.premisesHeight),
      rentPrice: removeSpacesAndConvertToNumber(data.rentPrice),
      rentSquare: removeSpacesAndConvertToNumber(data.rentSquare),
      rentalHolidays: data.rentalHolidays,
      securityDeposit: removeSpacesAndConvertToNumber(data.securityDeposit)
    };

    dispatch<any>(
      updateObject({
        newData,
        removedCompanies,
        addedCompanies,
        previousCompanies
      })
    )
      .then(() => {
        onClose();
        toast.success("Объект успешно изменен!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <HeaderWithBackButton
        onClose={onClose}
        title="Править:"
        subtitle={`${object.city}, ${object.address}`}
      />
      <ObjectForm
        data={data}
        register={register}
        errors={errors}
        watch={watch}
        control={control}
        setValue={setValue}
        setState={setState}
        isUpdate={true}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
      <PageDialogs state={state} setState={setState} />
    </>
  );
});

export default UpdateObject;
