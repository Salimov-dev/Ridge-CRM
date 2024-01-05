import { useSelector } from "react-redux";
import { orderBy } from "lodash";
// MUI
import { InputAdornment } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WaterIcon from "@mui/icons-material/Water";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
// styled
import { FieldsContainer, Form } from "../styled/styled";
// components
import Title from "../manager/components/title";
import FooterButtons from "../buttons/success-cancel-form-buttons";
import TextFieldStyled from "../../inputs/text-field-styled";
import DistrictSelect from "./components/district-select";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
// store
import { getMetroList } from "@store/object-params/metro.store";
import { getRentTypesList } from "@store/object-params/rent-types.store";
import { getObjectTypesList } from "@store/object-params/object-types.store";
import { getEstateTypesList } from "@store/object-params/estate-types.store";
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import { getObjectPropertiesList } from "@store/object-params/object-properties";
import { getCurrentRentersList } from "@store/object-params/current-renter.store";
import { getWorkingPositionsList } from "@store/user/working-position.store";
import { getObjectConditionsList } from "@store/object-params/object-conditions.store";
import { getTradeAreaList } from "@store/object-params/object-trade-area";

const ObjectForm = ({
  data,
  register,
  errors,
  selectedArea = "",
  watch,
  isUpdate = false,
}) => {
  const workingPositions = useSelector(getWorkingPositionsList());
  const sortedWorkingPositions = orderBy(workingPositions, ["name"], ["asc"]);
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

  const metros = useSelector(getMetroList());
  const sortedMetros = orderBy(metros, ["name"], ["asc"]);
  const rentTypes = useSelector(getRentTypesList());
  const sortedRentTypes = orderBy(rentTypes, ["name"], ["asc"]);
  const objectTypes = useSelector(getObjectTypesList());
  const sortedObjectTypes = orderBy(objectTypes, ["name"], ["asc"]);
  const estateTypes = useSelector(getEstateTypesList());
  const sortedEstateTypes = orderBy(estateTypes, ["name"], ["asc"]);

  const watchStatus = watch("status");
  const watchWorkingPosition = watch("contact.position");
  const watchDistrict = watch("location.district");
  const watchMetro = watch("location.metro");
  const watchRentTypes = watch("commercialTerms.rentTypes");
  const watchObjectTypes = watch("estateOptions.objectTypes");
  const watchEstateTypes = watch("estateOptions.estateTypes");
  const watchCurrentRenters = watch("estateOptions.currentRenters");
  const watchobjectConditions = watch("estateOptions.objectConditions");
  const watchObjectProperties = watch("estateOptions.objectProperties");
  const watchObjectTradeArea = watch("estateOptions.tradeArea");
  const watchCloudLink = watch("cloudLink");

  return (
    <>
      <Form noValidate>
        <Title title="Объект" />
        <FieldsContainer sx={{ gap: "3px" }}>
          <DistrictSelect
            register={register}
            selectedArea={selectedArea}
            errors={errors}
            watchDistrict={watchDistrict}
            isUpdate={isUpdate}
          />
          <SelectFieldStyled
            label="Метро"
            register={register}
            name="location.metro"
            labelId="location.metro"
            required={true}
            itemsList={sortedMetros}
            value={watchMetro ?? ""}
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
            name="estateOptions.currentRenters"
            labelId="estateOptions.currentRenters"
            required={true}
            itemsList={sortedCurrentRenters}
            value={watchCurrentRenters ?? ""}
            errors={errors?.estateOptions?.currentRenters}
          />
        </FieldsContainer>
        <FieldsContainer sx={{ gap: "3px" }}>
          <SelectFieldStyled
            label="Тип объекта"
            register={register}
            name="estateOptions.objectTypes"
            labelId="estateOptions.objectTypes"
            required={true}
            itemsList={sortedObjectTypes}
            value={watchObjectTypes ?? ""}
            errors={errors?.estateOptions?.objectTypes}
          />
          <SelectFieldStyled
            label="Тип недвижимости"
            register={register}
            name="estateOptions.estateTypes"
            labelId="estateOptions.estateTypes"
            required={true}
            itemsList={sortedEstateTypes}
            value={watchEstateTypes ?? ""}
            errors={errors?.estateOptions?.estateTypes}
          />
          <SelectFieldStyled
            label="Расположение объекта"
            register={register}
            name="estateOptions.objectProperties"
            labelId="estateOptions.objectProperties"
            required={true}
            itemsList={sortedObjectProperties}
            value={watchObjectProperties ?? ""}
            errors={errors?.estateOptions?.objectProperties}
          />
          <SelectFieldStyled
            label="Тип торговой площади"
            register={register}
            name="estateOptions.tradeArea"
            labelId="estateOptions.tradeArea"
            required={true}
            itemsList={sortedObjectTradeArea}
            value={watchObjectTradeArea ?? ""}
            errors={errors?.estateOptions?.tradeArea}
          />
        </FieldsContainer>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Идентификатор объекта"
            name="location.identifier"
            errors={errors?.location?.identifier}
            onInputQuantities={260}
            value={data?.location?.identifier || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FingerprintIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>
        <Title title="Контактная информация" />
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Контактное лицо"
            name="contact.name"
            errors={errors?.contact?.name}
            value={data?.contact?.name ?? ""}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <SelectFieldStyled
            label="Позиция"
            register={register}
            name="contact.position"
            labelId="contact.position"
            itemsList={sortedWorkingPositions}
            value={watchWorkingPosition ?? ""}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contact.phone"
            value={data?.contact?.phone || ""}
            errors={errors?.contact?.phone}
            onInputQuantities={12}
            isHelperText={true}
            subtitle="Вводите в формате 79045554433, 78129998877, 9995544"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldStyled
            register={register}
            label="Email"
            name="contact.email"
            errors={errors?.contact?.email}
            onInputQuantities={100}
            value={data?.contact?.email || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <Title title="Коммерческие условия" />
        <FieldsContainer sx={{ flexDirection: "column", gap: "8px" }}>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Площадь аренды"
              name="commercialTerms.rentSquare"
              valueAsNumber={true}
              onInputQuantities={8}
              errors={errors?.commercialTerms?.rentSquare}
              value={data?.commercialTerms?.rentSquare || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">м²</InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Общая стоимость арендной платы"
              name="commercialTerms.rentPrice"
              onInputQuantities={12}
              valueAsNumber={true}
              value={data?.commercialTerms?.rentPrice || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Комиссия агента"
              type="number"
              name="commercialTerms.agentComission"
              onInputQuantities={3}
              value={data?.commercialTerms?.agentComission || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Индексация"
              type="number"
              name="commercialTerms.indexingAnnual"
              onInputQuantities={3}
              value={data?.commercialTerms?.indexingAnnual || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </FieldsContainer>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Каникулы"
              name="commercialTerms.rentalHolidays"
              onInputQuantities={3}
              value={data?.commercialTerms?.rentalHolidays || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">дней</InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Обеспечительный платёж"
              name="commercialTerms.securityDeposit"
              onInputQuantities={12}
              valueAsNumber={true}
              value={data?.commercialTerms?.securityDeposit || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Авансовый платёж"
              name="commercialTerms.advanseDeposit"
              onInputQuantities={12}
              valueAsNumber={true}
              value={data?.commercialTerms?.advanseDeposit || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <SelectFieldStyled
              register={register}
              name="commercialTerms.rentTypes"
              labelId="rentTypes"
              label="Тип договора"
              itemsList={sortedRentTypes}
              value={watchRentTypes ?? ""}
            />
          </FieldsContainer>
        </FieldsContainer>

        <Title title="Параметры помещения" />
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <FieldsContainer>
            <SelectFieldStyled
              register={register}
              name="estateOptions.objectConditions"
              labelId="objectConditions "
              label="Состояние помещения"
              itemsList={sortedObjectConditions}
              value={watchobjectConditions}
            />
            <TextFieldStyled
              register={register}
              label="Кадастровый номер"
              name="estateOptions.cadastralNumber"
              onInputQuantities={24}
              value={data?.estateOptions?.cadastralNumber || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">№</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Электричество"
              type="number"
              name="estateOptions.electricityKw"
              onInputQuantities={5}
              value={data?.estateOptions?.electricityKw || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ElectricBoltIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Состояние полов"
              name="estateOptions.premisesFloor"
              onInputQuantities={100}
              value={data?.estateOptions?.premisesFloor || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VerticalAlignBottomOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FieldsContainer>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Водоснабжение"
              type="text"
              name="estateOptions.waterSuply"
              onInputQuantities={20}
              value={data?.estateOptions?.waterSuply || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WaterIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Высота потолков"
              type="number"
              name="estateOptions.premisesHeight"
              onInputQuantities={3}
              value={data?.estateOptions?.premisesHeight || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">м</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Парковочных мест"
              type="number"
              name="estateOptions.parkingQuantity"
              onInputQuantities={4}
              value={data?.estateOptions?.parkingQuantity || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DirectionsCarIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Зона погрузки"
              name="estateOptions.loadingArea"
              onInputQuantities={60}
              value={data?.estateOptions?.loadingArea ?? ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalShippingIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FieldsContainer>
        </FieldsContainer>

        <Title title="Описание объекта" />
        <TextFieldStyled
          register={register}
          label="Опишите объект"
          name="description.fullDescription"
          value={data?.description?.fullDescription ?? ""}
          rows="6"
          multiline={true}
          errors={errors?.description?.fullDescription}
          onInputQuantities={20000}
        />
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Ссылка на папку в облако"
            name="cloudLink"
            value={watchCloudLink ?? ""}
            onInputQuantities={200}
            errors={errors?.cloudLink}
          />
        </FieldsContainer>
      </Form>
    </>
  );
};

export default ObjectForm;
