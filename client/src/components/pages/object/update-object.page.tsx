// libraries
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import DialogPages from "@dialogs/dialog-pages";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithBackButtonForPage from "@components/common/headers/header-with-back-button.page";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
// utils
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
// forms
import ObjectForm from "@forms/object/object.form";
// schemas
import { objectSchema } from "@schemas/object/object.schema";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { CompanyType } from "@interfaces/object/object.interface";
// store
import { getObjectById, updateObject } from "@store/object/objects.store";

interface UpdateObjectProps {
  onClose: () => void;
  objectId: string;
}

const UpdateObject: FC<UpdateObjectProps> = React.memo(
  ({ onClose, objectId }): JSX.Element => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogPages, setStateDialogPages] =
      useState<IDialogPagesState>(dialogePagesState);

    const object = useSelector(getObjectById(objectId));
    const transformedObject = {
      ...object,
      advanseDeposit: String(object?.advanseDeposit),
      parkingQuantity: String(object?.parkingQuantity),
      rentPrice: String(object?.rentPrice),
      rentSquare: String(object?.rentSquare),
      securityDeposit: String(object?.securityDeposit)
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
      resolver: yupResolver<any>(objectSchema)
    });

    const data = watch();

    const newCompanies = watch("companies");
    const previousCompanies = object?.companies;
    const objectCompanies = object?.companies;
    const removedCompanies = objectCompanies?.filter(
      (obj) =>
        !newCompanies.some((item: CompanyType) => item.company === obj.company)
    );
    const addedCompanies = newCompanies.filter(
      (newCompany: CompanyType) =>
        !objectCompanies?.some((obj) => obj.company === newCompany.company)
    );

    const onSubmit = () => {
      setIsLoading(true);

      const newData = {
        ...data,
        advanseDeposit: removeSpacesAndConvertToNumber(data.advanseDeposit),
        parkingQuantity: removeSpacesAndConvertToNumber(data.parkingQuantity),
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
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <>
        <HeaderWithBackButtonForPage
          onClose={onClose}
          title="Править:"
          subtitle={`${object?.city}, ${object?.address}`}
        />
        <ObjectForm
          data={data}
          register={register}
          errors={errors}
          watch={watch}
          control={control}
          setValue={setValue}
          setState={setStateDialogPages}
          isUpdatePage={true}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          disabledRemoveButton={true}
        />
        <LoaderFullWindow isLoading={isLoading} />
        <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
      </>
    );
  }
);

export default UpdateObject;
