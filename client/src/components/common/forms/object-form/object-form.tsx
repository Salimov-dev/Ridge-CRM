import { useSelector } from "react-redux";
import { orderBy } from "lodash";
// MUI
import { Box, InputAdornment, Typography } from "@mui/material";
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
// mock
import { districtsMSK } from "../../../../mock/districts/districts-msk";
import { districtsSPB } from "../../../../mock/districts/districts-spb";
// components
import Title from "../title/title";
import FooterButtons from "../footer-buttons/footer-buttons";
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import AutocompleteStyled from "../../inputs/autocomplete-styled";
// store
import { getMetroList } from "../../../../store/object-params/metro.store";
import { getRentTypesList } from "../../../../store/object-params/rent-types.store";
import { getObjectTypesList } from "../../../../store/object-params/object-types.store";
import { getEstateTypesList } from "../../../../store/object-params/estate-types.store";
import { getObjectsStatusList } from "../../../../store/object-params/object-status.store";
import { getObjectPropertiesList } from "../../../../store/object-params/object-properties";
import { getCurrentRentersList } from "../../../../store/object-params/current-renter.store";
import { getWorkingPositionsList } from "../../../../store/user/working-position.store";
import { getObjectConditionsList } from "../../../../store/object-params/object-conditions.store";

const ObjectForm = ({
  data,
  register,
  errors,
  handleSubmit,
  onCreate = () => {},
  onSubmit,
  onClose,
  watch,
  setValue,
  isValid,
}) => {
  const workingPositions = useSelector(getWorkingPositionsList());
  const sortedWorkingPositions = orderBy(workingPositions, ["name"], ["asc"]);
  const objectStatuses = useSelector(getObjectsStatusList());
  const sortedObjectStatuses = orderBy(objectStatuses, ["name"], ["asc"]);
  const currentRenters = useSelector(getCurrentRentersList());
  const sortedCurrentRenters = orderBy(currentRenters, ["name"], ["asc"]);
  const objectProperties = useSelector(getObjectPropertiesList());
  const sortedObjectProperties = orderBy(objectProperties, ["name"], ["asc"]);
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
  const watchAddress = watch("location.address");
  const watchMetro = watch("location.metro");
  const watchRentTypes = watch("commercialTerms.rentTypes");
  const watchObjectTypes = watch("estateOptions.objectTypes");
  const watchEstateTypes = watch("estateOptions.estateTypes");
  const watchCurrentRenters = watch("estateOptions.currentRenters");
  const watchobjectConditions = watch("estateOptions.objectConditions");
  const watchObjectProperties = watch("estateOptions.objectProperties");
  const watchCloudLink = watch("cloudLink");


  const hasDistrict =
    watchDistrict?.includes("Санкт-Петербург") ||
    watchDistrict?.includes("Москва");

  function getDistrictName(districtId, districts) {
    const district = districts.find((item) => item._id === districtId);
    return district ? district.name : "";
  }

  const getDistName = () => {
    if (watchDistrict?.startsWith("77")) {
      return getDistrictName(watchDistrict, districtsMSK);
    } else if (watchDistrict?.startsWith("78")) {
      return getDistrictName(watchDistrict, districtsSPB);
    } else {
      return watchDistrict;
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Title title="Объект" />
        <FieldsContainer sx={{ gap: "3px" }}>
          {!hasDistrict ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              Район:{" "}
              {watchAddress ? (
                getDistName()
              ) : (
                <Typography>Выберите адрес</Typography>
              )}
            </Box>
          ) : null}
          {watchDistrict?.includes("Санкт-Петербург") && (
            <AutocompleteStyled
              label="Район *"
              register={register}
              name="location.district"
              options={districtsSPB}
              value={watchDistrict}
              setValue={setValue}
              watchItemId={watchDistrict}
              errors={errors?.location?.district}
            />
          )}
          {watchDistrict?.includes("Москва") && (
            <AutocompleteStyled
              label="Район *"
              register={register}
              name="location.district"
              options={districtsMSK}
              value={watchDistrict}
              setValue={setValue}
              watchItemId={watchDistrict}
              errors={errors?.location?.district}
            />
          )}
          <AutocompleteStyled
            label="Метро"
            register={register}
            name="location.metro"
            options={sortedMetros}
            value={watchMetro}
            setValue={setValue}
            watchItemId={watchMetro}
            disabled={!watchDistrict && true}
          />
          <AutocompleteStyled
            label="Статус объекта *"
            register={register}
            name="status"
            options={sortedObjectStatuses}
            value={watchStatus ?? ""}
            setValue={setValue}
            watchItemId={watchStatus}
            errors={errors?.status}
          />
          <TextFieldStyled
            register={register}
            label="Идентификатор объекта"
            name="location.identifier"
            errors={errors?.location?.identifier}
            onInputQuantities={60}
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
        <FieldsContainer sx={{ gap: "3px" }}>
          <AutocompleteStyled
            label="Тип объекта *"
            register={register}
            name="estateOptions.objectTypes"
            options={sortedObjectTypes}
            value={watchObjectTypes ?? ""}
            setValue={setValue}
            watchItemId={watchObjectTypes}
            errors={errors?.estateOptions?.objectTypes}
          />
          <AutocompleteStyled
            label="Тип недвижимости *"
            register={register}
            name="estateOptions.estateTypes"
            options={sortedEstateTypes}
            value={watchEstateTypes ?? ""}
            setValue={setValue}
            watchItemId={watchEstateTypes}
            errors={errors?.estateOptions?.estateTypes}
          />
          <AutocompleteStyled
            label="Расположение объекта *"
            register={register}
            name="estateOptions.objectProperties"
            options={sortedObjectProperties}
            value={watchObjectProperties ?? ""}
            setValue={setValue}
            watchItemId={watchObjectProperties}
            errors={errors?.estateOptions?.objectProperties}
          />
          <AutocompleteStyled
            label="Текущий арендатор *"
            register={register}
            name="estateOptions.currentRenters"
            options={sortedCurrentRenters}
            value={watchCurrentRenters ?? ""}
            setValue={setValue}
            watchItemId={watchCurrentRenters}
            errors={errors?.estateOptions?.currentRenters}
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
          <AutocompleteStyled
            label="Позиция"
            register={register}
            name="contact.position"
            options={sortedWorkingPositions}
            value={watchWorkingPosition ?? ""}
            setValue={setValue}
            watchItemId={watchWorkingPosition}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contact.phone"
            valueAsNumber={true}
            value={data?.contact?.phone || ""}
            errors={errors?.contact?.phone}
            onInputQuantities={12}
            isHelperText={true}
            helperText="Вводите в формате 79045554433, 78129998877, 9995544"
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
              type="number"
              name="commercialTerms.rentSquare"
              valueAsNumber={true}
              onInputQuantities={5}
              value={data?.commercialTerms?.rentSquare || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">м²</InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Стоимость аренды"
              type="text"
              name="commercialTerms.rentPrice"
              onInputQuantities={60}
              value={data?.commercialTerms?.rentPrice || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Введите стоимость 1м2"
              type="text"
              name="commercialTerms.priceForMetr"
              onInputQuantities={60}
              value={data?.commercialTerms?.priceForMetr || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Индексация"
              type="number"
              name="commercialTerms.indexingAnnual"
              valueAsNumber={true}
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
              onInputQuantities={30}
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
              type="text"
              name="commercialTerms.securityDeposit"
              onInputQuantities={38}
              value={data?.commercialTerms?.securityDeposit || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Авансовый платёж"
              type="text"
              name="commercialTerms.advanseDeposit"
              onInputQuantities={38}
              value={data?.commercialTerms?.advanseDeposit || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <SimpleSelectField
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
            <SimpleSelectField
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
              type="text"
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
              valueAsNumber={true}
              onInputQuantities={4}
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
              valueAsNumber={true}
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
              valueAsNumber={true}
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
              type="text"
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
          />
        </FieldsContainer>
        <FooterButtons
          onCreate={onCreate}
          isEditMode={true}
          isValid={isValid}
          onClose={onClose}
          withoutRemoveButton={true}
        />
      </Form>
    </>
  );
};

export default ObjectForm;
