// libraries
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
// forms
import ObjectForm from "@forms/object/object.form";
// components
import FindObjectOnMap from "@common/find-object-on-map/find-object-on-map";
import AlertObjectInDatabase from "./alert-object-in-database";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import HeaderCreateObjectPage from "./header.create-object-page";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// schema
import { objectSchema } from "@schemas/object/object.schema";
// utils
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
// initial-states
import { objectCreateInitialState } from "@initial-states/pages/object-create.initial-state";
// data
import { objectHasDistrict } from "@utils/objects/object-has-district";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { createObject, getObjectsList } from "@store/object/objects.store";

interface ContentCreateObjectPageProps {
  onClose: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setStateDialogPages: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ContentCreateObjectPage: FC<ContentCreateObjectPageProps> = ({
  onClose,
  setIsLoading,
  setStateDialogPages
}) => {
  const dispatch: any = useDispatch();

  const [selectedArea, setSelectedArea] = useState("");
  const [isObjectAlreadyInDatabase, setObjectAlreadyInDatabase] =
    useState(false);

  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: objectCreateInitialState,
    mode: "onChange",
    resolver: yupResolver<any>(objectSchema)
  });

  const data = watch();

  const objects = useSelector(getObjectsList());
  const watchAddress = watch<any>("address", "");
  const watchCity = watch<any>("city", "");
  const findedObjectFullAddress = `${watchCity}, ${watchAddress}`;

  const {
    getCity,
    getDistrict,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject
  } = useFindObject();

  const onSubmit = () => {
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

    dispatch(createObject(newData))
      .then(() => {
        onClose();
      })
      .catch((error: string) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setSelectedArea(getDistrict());
    setValue("district", "");
    setValue<any>("city", getCity());
    setValue<any>("address", getAddress());
    setValue<any>("latitude", getLatitudeCoordinates());
    setValue<any>("longitude", getLongitudeCoordinates());
  }, [findedObject]);

  useEffect(() => {
    if (
      selectedArea?.includes("Санкт-Петербург") ||
      selectedArea?.includes("Москва") ||
      selectedArea?.includes("Казань")
    ) {
      setValue("district", null);
    } else if (objectHasDistrict(selectedArea)) {
      setValue("metro", null);
      setValue("district", null);
    } else {
      setValue("metro", null);
      setValue("district", selectedArea);
    }
  }, [selectedArea]);

  useEffect(() => {
    const objectInDatabase = objects?.filter(
      (obj: IObject) =>
        `${obj.city}, ${obj.address}`.trim() === findedObjectFullAddress
    );
    const isObjectInDatabase = Boolean(objectInDatabase?.length);

    setObjectAlreadyInDatabase(isObjectInDatabase);
  }, [findedObjectFullAddress]);

  return (
    <>
      <HeaderCreateObjectPage
        findedObject={findedObject}
        getCity={getCity}
        getAddress={getAddress}
        onClose={onClose}
      />
      <FindObjectOnMap />
      <ObjectForm
        data={data}
        register={register}
        errors={errors}
        watch={watch}
        selectedArea={selectedArea}
        setState={setStateDialogPages}
        control={control}
        setValue={setValue}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
      <AlertObjectInDatabase
        isObjectAlreadyInDatabase={isObjectAlreadyInDatabase}
      />
    </>
  );
};

export default ContentCreateObjectPage;
