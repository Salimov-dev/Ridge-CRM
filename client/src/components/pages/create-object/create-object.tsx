// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ObjectForm from "@common/forms/object-form/object-form";
import FindObjectOnMap from "@common/find-object-on-map/find-object-on-map";
import ButtonStyled from "@components/common/buttons/button-styled";
import IsLoadingDialog from "@common/dialog/is-loading-dialog";
import AlertObjectInDatabase from "./components/alert-object-in-database";
import TitleWithCloseButton from "@components/common/page-titles/title-with-close-button";
// store
import { createObject, getObjectsList } from "@store/object/objects.store";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// schema
import { objectSchema } from "@schemas/object-schema";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { capitalizeAllFirstLetters } from "@utils/data/capitalize-all-first-letters";

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

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
    identifier: "",
  },
  commercialTerms: {
    rentPrice: "",
    priceForMetr: "",
    securityDeposit: "",
    advanseDeposit: "",
    agentComission: "",
    rentSquare: "",
    rentalHolidays: "",
    indexingAnnual: "",
    rentTypes: "",
  },
  estateOptions: {
    currentRenters: "",
    objectConditions: "",
    estateTypes: "",
    objectTypes: "",
    tradeArea: "",
    premisesHeight: "",
    premisesFloor: "",
    parkingQuantity: "",
    electricityKw: "",
    waterSuply: "",
    cadastralNumber: "",
    loadingArea: "",
    objectProperties: "",
  },
  description: {
    fullDescription: "",
  },
  cloudLink: "",
};

const CreateObject = React.memo(({ onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedArea, setSelectedArea] = useState("");
  const [isCityHasMetro, setIsCityHasMetro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isObjectAlreadyInDatabase, setObjectAlreadyInDatabase] =
    useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(objectSchema),
  });

  const {
    getCity,
    getDistrict,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const data = watch();
  // console.log("data", data);

  const objects = useSelector(getObjectsList());

  const watchAddress = watch<any>("location.address", "");
  const watchCity = watch<any>("location.city", "");

  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const findedObjectFullAddress = `${watchCity}, ${watchAddress}`;

  const onSubmit = (data) => {
    // setIsLoading(true);

    const newData = {
      ...data,
      contact: {
        ...data.contact,
        name: capitalizeAllFirstLetters(data.contact.name),
      },
      estateOptions: {
        ...data.estateOptions,
        premisesFloor: capitalizeFirstLetter(data.estateOptions.premisesFloor),
      },
      location: {
        ...data.location,
        city: capitalizeFirstLetter(data.location.city),
        address: capitalizeFirstLetter(data.location.address),
        zoom: 16,
      },
      description: {
        ...data.description,
        fullDescription: capitalizeFirstLetter(
          data.description.fullDescription
        ),
      },
    };
    console.log("newData", newData);

    dispatch<any>(createObject(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  // устаналиваю значения для объекта
  useEffect(() => {
    setSelectedArea(getDistrict());
    setValue("location.district", "");
    setValue<any>("location.city", getCity());
    setValue<any>("location.address", getAddress());
    setValue<any>("location.latitude", getLatitudeCoordinates());
    setValue<any>("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  useEffect(() => {
    if (
      selectedArea?.includes("Санкт-Петербург") ||
      selectedArea?.includes("Москва")
    ) {
      setIsCityHasMetro(true);
      setValue("location.district", "");
    } else {
      setIsCityHasMetro(false);
      setValue("location.district", selectedArea);
    }
  }, [selectedArea]);

  useEffect(() => {
    const objectInDatabase = objects?.filter(
      (obj) =>
        `${obj.location.city}, ${obj.location.address}`.trim() ===
        findedObjectFullAddress
    );
    const isObjectInDatabase = Boolean(objectInDatabase?.length);

    setObjectAlreadyInDatabase(isObjectInDatabase);
  }, [findedObjectFullAddress]);

  return (
    <>
      <TitleWithCloseButton
        title={
          isFindedObject
            ? `Создать объект: ${getCity()}, ${getAddress()}`
            : "КЛИКНИТЕ по карте, чтобы выбрать объект"
        }
        color="white"
        background={colors.error["red"]}
        onClose={onClose}
      />
      {isObjectAlreadyInDatabase && <AlertObjectInDatabase />}
      <FindObjectOnMap />
      <ObjectForm
        data={data}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        selectedArea={selectedArea}
        onClose={onClose}
        isValid={isValid}
        isCityHasMetro={isCityHasMetro}
      />
      <ButtonsContainer>
        <ButtonStyled
          title="Сохранить"
          style="SUCCESS"
          onClick={handleSubmit(onSubmit)}
        />
        <ButtonStyled title="Отмена" style="CANCEL" onClick={onClose} />
      </ButtonsContainer>
      {isLoading && (
        <IsLoadingDialog
          text="Немного подождите, создаем новый `Объект`"
          isLoading={isLoading}
        />
      )}
    </>
  );
});

export default CreateObject;
