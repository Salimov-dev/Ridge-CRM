import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import { Dispatch, FC, SetStateAction } from "react";
// MUI
import { InputAdornment } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WaterIcon from "@mui/icons-material/Water";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import DistrictSelect from "@components/common/inputs/district-select";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import RowTitle from "@components/common/titles/row-title";
import FieldsCompany from "@components/common/forms/dynamic-fields/fields-company";
import FieldsContact from "@components/common/forms/dynamic-fields/fields-contact";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// data
import { metroListArraySPB } from "@data/metro/metro-spb";
import { metroListArrayMSK } from "@data/metro/metro-msk";
import { metroListArrayKZN } from "@data/metro/metro-kzn";
import { allDistrictsList } from "@utils/objects/get-finded-object-districts-list";
// interfaces
import { IObjectCreateInitState } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getRentTypesList } from "@store/object-params/object-rent-types.store";
import { getObjectTypesList } from "@store/object-params/object-types.store";
import { getEstateTypesList } from "@store/object-params/object-estate-types.store";
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import { getObjectPropertiesList } from "@store/object-params/object-properties";
import { getCurrentRentersList } from "@store/object-params/object-current-renter.store";
import { getObjectConditionsList } from "@store/object-params/object-conditions.store";
import { getTradeAreaList } from "@store/object-params/object-trade-area";

interface ObjectFormProps {
  state: IDialogPagesState;
  data: IObjectCreateInitState;
  register: UseFormRegister<IObjectCreateInitState>;
  errors: FieldErrors<IObjectCreateInitState>;
  watch: UseFormWatch<IObjectCreateInitState>;
  setValue: UseFormSetValue<IObjectCreateInitState>;
  isUpdatePage?: boolean;
  selectedArea?: any;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  control?: Control<IObjectCreateInitState>;
}

const ObjectForm: FC<ObjectFormProps> = ({
  data,
  state,
  register,
  errors,
  watch,
  setValue,
  isUpdatePage = false,
  selectedArea = "",
  setState,
  control
}): JSX.Element => {
  const objectStatuses = useSelector(getObjectsStatusList());
  const sortedObjectStatuses = orderBy(objectStatuses, ["name"], ["asc"]);
  const currentRenters = useSelector(getCurrentRentersList());
  const sortedCurrentRenters = orderBy(currentRenters, ["name"], ["asc"]);
  const objectProperties = useSelector(getObjectPropertiesList());
  const sortedObjectProperties = orderBy(objectProperties, ["name"], ["asc"]);
  const objectTradeArea = useSelector(getTradeAreaList());
  const sortedObjectTradeArea = orderBy(objectTradeArea, ["name"], ["asc"]);
  const objectConditions = useSelector(getObjectConditionsList());
  const sortedObjectConditions = orderBy(objectConditions, ["name"], ["asc"]);

  const rentTypes = useSelector(getRentTypesList());
  const sortedRentTypes = orderBy(rentTypes, ["name"], ["asc"]);
  const objectTypes = useSelector(getObjectTypesList());
  const sortedObjectTypes = orderBy(objectTypes, ["name"], ["asc"]);
  const estateTypes = useSelector(getEstateTypesList());
  const sortedEstateTypes = orderBy(estateTypes, ["name"], ["asc"]);

  const watchStatus = watch("status");
  const watchDistrict = watch("district");

  const watchMetro = watch("metro");

  const watchRentTypes = watch("rentTypes");
  const watchObjectTypes = watch("objectTypes");
  const watchEstateTypes = watch("estateTypes");
  const watchCurrentRenters = watch("currentRenters");
  const watchobjectConditions = watch("objectConditions");
  const watchObjectProperties = watch("objectProperties");
  const watchObjectTradeArea = watch("tradeArea");
  const watchCloudLink = watch("cloudLink");
  const watchCity = watch("city");

  const getObjectMetrosList = () => {
    let area = selectedArea ? selectedArea : watchCity;
    if (area?.includes("Санкт-Петербург")) {
      return metroListArraySPB;
    } else if (area?.includes("Москва")) {
      return metroListArrayMSK;
    } else if (area?.includes("Казань")) {
      return metroListArrayKZN;
    }
  };
  const sortedMetrosForFindedObject = orderBy(
    getObjectMetrosList(),
    ["name"],
    ["asc"]
  );

  const districtIsId = allDistrictsList()?.find((dist) => {
    const result = dist._id === watchDistrict;
    return result;
  });

  return (
    <>
      <Form noValidate>
        <RowTitle
          title="Объект"
          background="linear-gradient(to right, ForestGreen, DarkGreen)"
          margin="14px 0 -8px 0"
        />
        <FieldsContainer>
          {isUpdatePage && !districtIsId ? (
            <TextFieldStyled
              register={register}
              label="Район"
              name="district"
              disabled={true}
              value={watchDistrict}
            />
          ) : (
            <DistrictSelect
              register={register}
              selectedArea={selectedArea}
              errors={errors}
              watchDistrict={watchDistrict}
              isUpdatePage={isUpdatePage}
              disabled={isUpdatePage && true}
            />
          )}
          <SelectFieldStyled
            label="Метро"
            register={register}
            name="metro"
            labelId="metro"
            itemsList={sortedMetrosForFindedObject}
            value={watchMetro ?? null}
            disabled={!watchDistrict}
          />
          <SelectFieldStyled
            label="Статус объекта"
            register={register}
            name="status"
            labelId="status"
            required={true}
            itemsList={sortedObjectStatuses}
            value={watchStatus ?? ""}
            errors={errors?.status}
          />
          <SelectFieldStyled
            label="Текущий арендатор"
            register={register}
            name="currentRenters"
            labelId="currentRenters"
            required={true}
            itemsList={sortedCurrentRenters}
            value={watchCurrentRenters ?? ""}
            errors={errors?.currentRenters}
          />
        </FieldsContainer>

        <FieldsContainer>
          <SelectFieldStyled
            label="Тип объекта"
            register={register}
            name="objectTypes"
            labelId="objectTypes"
            required={true}
            itemsList={sortedObjectTypes}
            value={watchObjectTypes ?? ""}
            errors={errors?.objectTypes}
          />
          <SelectFieldStyled
            label="Тип недвижимости"
            register={register}
            name="estateTypes"
            labelId="estateTypes"
            required={true}
            itemsList={sortedEstateTypes}
            value={watchEstateTypes ?? ""}
            errors={errors?.estateTypes}
          />
          <SelectFieldStyled
            label="Расположение объекта"
            register={register}
            name="objectProperties"
            labelId="objectProperties"
            required={true}
            itemsList={sortedObjectProperties}
            value={watchObjectProperties ?? ""}
            errors={errors?.objectProperties}
          />
          <SelectFieldStyled
            label="Тип торговой площади"
            register={register}
            name="tradeArea"
            labelId="tradeArea"
            required={true}
            itemsList={sortedObjectTradeArea}
            value={watchObjectTradeArea ?? ""}
            errors={errors?.tradeArea}
          />
          <TextFieldStyled
            register={register}
            label="Идентификатор объекта"
            name="identifier"
            errors={errors?.identifier}
            inputProps={{ maxLength: 200 }}
            value={data?.identifier}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FingerprintIcon />
                </InputAdornment>
              )
            }}
          />
        </FieldsContainer>

        <RowTitle
          title="Коммерческие условия"
          background="linear-gradient(to right, DarkGoldenRod, OrangeRed)"
          margin="14px 0 -8px 0"
        />
        <FieldsContainer sx={{ flexDirection: "column", gap: "8px" }}>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Площадь аренды"
              name="rentSquare"
              valueAsNumber={true}
              value={data?.rentSquare ?? ""}
              errors={errors?.rentSquare}
              inputProps={{ maxLength: 10 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">м²</InputAdornment>
              }}
            />
            <TextFieldStyled
              register={register}
              label="Общая стоимость арендной платы"
              name="rentPrice"
              valueAsNumber={true}
              value={data?.rentPrice ?? ""}
              errors={errors?.rentPrice}
              inputProps={{ maxLength: 11 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>
              }}
            />
            <TextFieldStyled
              register={register}
              label="Комиссия агента"
              name="agentComission"
              value={data?.agentComission ?? ""}
              valueAsNumber={true}
              errors={errors?.agentComission}
              inputProps={{ maxLength: 5 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
            />
            <TextFieldStyled
              register={register}
              label="Индексация"
              name="indexingAnnual"
              value={data?.indexingAnnual ?? ""}
              valueAsNumber={true}
              errors={errors?.indexingAnnual}
              inputProps={{ maxLength: 5 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
            />
          </FieldsContainer>

          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Каникулы"
              name="rentalHolidays"
              value={capitalizeFirstLetter(data?.rentalHolidays ?? "")}
              isHelperText={true}
              subtitle="Допишите рабочих или календарных дней"
              inputProps={{ maxLength: 20 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">дней</InputAdornment>
                )
              }}
            />
            <TextFieldStyled
              register={register}
              label="Обеспечительный платёж"
              name="securityDeposit"
              valueAsNumber={true}
              value={data?.securityDeposit ?? ""}
              errors={errors?.securityDeposit}
              inputProps={{ maxLength: 11 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>
              }}
            />
            <TextFieldStyled
              register={register}
              label="Авансовый платёж"
              name="advanseDeposit"
              valueAsNumber={true}
              value={data?.advanseDeposit ?? ""}
              errors={errors?.advanseDeposit}
              inputProps={{ maxLength: 11 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>
              }}
            />
            <SelectFieldStyled
              register={register}
              name="rentTypes"
              labelId="rentTypes"
              label="Тип договора"
              itemsList={sortedRentTypes}
              value={watchRentTypes ?? ""}
            />
          </FieldsContainer>
        </FieldsContainer>

        <RowTitle
          title="Параметры помещения"
          background="linear-gradient(to right, LightSlateGray , DarkSlateGray)"
          margin="14px 0 -8px 0"
        />
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <FieldsContainer>
            <SelectFieldStyled
              register={register}
              name="objectConditions"
              labelId="objectConditions "
              label="Состояние помещения"
              itemsList={sortedObjectConditions}
              value={watchobjectConditions ?? ""}
            />
            <TextFieldStyled
              register={register}
              label="Кадастровый номер"
              name="cadastralNumber"
              value={data?.cadastralNumber ?? ""}
              errors={errors?.cadastralNumber}
              inputProps={{ maxLength: 26 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">№</InputAdornment>
              }}
            />
            <TextFieldStyled
              register={register}
              label="Электричество"
              name="electricityKw"
              valueAsNumber={true}
              value={data?.electricityKw ?? ""}
              errors={errors?.electricityKw}
              inputProps={{ maxLength: 6 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ElectricBoltIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextFieldStyled
              register={register}
              label="Состояние полов"
              name="premisesFloor"
              value={capitalizeFirstLetter(data?.premisesFloor ?? "")}
              errors={errors?.premisesFloor}
              inputProps={{ maxLength: 50 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VerticalAlignBottomOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </FieldsContainer>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Водоснабжение"
              name="waterSuply"
              inputProps={{ maxLength: 50 }}
              value={capitalizeFirstLetter(data?.waterSuply ?? "")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WaterIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextFieldStyled
              register={register}
              label="Высота потолков"
              name="premisesHeight"
              valueAsNumber={true}
              value={data?.premisesHeight ?? ""}
              errors={errors?.premisesHeight}
              inputProps={{ maxLength: 6 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">м</InputAdornment>
              }}
            />
            <TextFieldStyled
              register={register}
              label="Парковочных мест"
              name="parkingQuantity"
              valueAsNumber={true}
              value={data?.parkingQuantity ?? ""}
              errors={errors?.parkingQuantity}
              inputProps={{ maxLength: 5 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DirectionsCarIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextFieldStyled
              register={register}
              label="Зона погрузки"
              name="loadingArea"
              inputProps={{ maxLength: 50 }}
              value={capitalizeFirstLetter(data?.loadingArea ?? "")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalShippingIcon />
                  </InputAdornment>
                )
              }}
            />
          </FieldsContainer>
        </FieldsContainer>

        <TextFieldStyled
          register={register}
          label="Опишите объект"
          name="fullDescription"
          value={capitalizeFirstLetter(data?.fullDescription)}
          rows="3"
          multiline={true}
          errors={errors?.fullDescription}
          inputProps={{ maxLength: 1550 }}
        />
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Ссылка на папку в облако"
            name="cloudLink"
            value={watchCloudLink ?? ""}
            inputProps={{ maxLength: 200 }}
            errors={errors?.cloudLink}
          />
        </FieldsContainer>

        <FieldsCompany
          data={data}
          register={register}
          errors={errors}
          setValue={setValue}
          control={control}
          watch={watch}
          setState={setState}
        />
        <FieldsContact
          data={data}
          register={register}
          errors={errors}
          setValue={setValue}
          control={control}
          watch={watch}
          setState={setState}
        />
      </Form>
    </>
  );
};

export default ObjectForm;
