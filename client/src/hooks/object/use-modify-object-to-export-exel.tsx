import { useMemo } from "react";
import { useSelector } from "react-redux";
// utils
import { FormatDate } from "../../utils/date/format-date";
// store
import { getObjectsStatusList } from "../../store/object-params/object-status.store";
import { getUsersList } from "../../store/user/users.store";
import { getDistrictsList } from "../../store/object-params/districts.store";
import { getMetroList } from "../../store/object-params/metro.store";
import { getWorkingPositionsList } from "../../store/user/working-position.store";
import { getRentTypesList } from "../../store/object-params/rent-types.store";
import { getCurrentRentersList } from "../../store/object-params/current-renter.store";
import { getObjectConditionsList } from "../../store/object-params/object-conditions.store";
import { getEstateTypesList } from "../../store/object-params/estate-types.store";
import { getObjectTypesList } from "../../store/object-params/object-types.store";
import { getObjectPropertiesList } from "../../store/object-params/object-properties";

const useModifyObjectToExportExel = (objects) => {
  const statusesList = useSelector(getObjectsStatusList());
  const users = useSelector(getUsersList());
  const districts = useSelector(getDistrictsList());
  const metros = useSelector(getMetroList());
  const workingPositions = useSelector(getWorkingPositionsList());
  const rentTypes = useSelector(getRentTypesList());

  const currentRenters = useSelector(getCurrentRentersList());
  const objectConditions = useSelector(getObjectConditionsList());
  const estateTypes = useSelector(getEstateTypesList());
  const objectTypes = useSelector(getObjectTypesList());
  const objectProperties = useSelector(getObjectPropertiesList());

  const modifiedObjectsData = useMemo(() => {
    return objects?.map((object) => {
      const date = FormatDate(object?.created_at);
      const status = statusesList?.find(
        (status) => status._id === object.status
      );

      const user = users?.find((user) => user._id === object?.userId);
      const userName = `${user?.name.lastName} ${user?.name.firstName} ${user?.name.surName}`;
      const userPhone = user?.contacts.phone;

      const city = object?.location.city;
      const address = object?.location.address;
      const district = districts?.find(
        (dist) => dist._id === object?.location.district
      );
      const metro = metros?.find(
        (metro) => metro._id === object?.location.metro
      );
      const latitude = object?.location.latitude;
      const longitude = object?.location.longitude;
      const identifier = object?.location.identifier;
      const zoom = object?.location.zoom;

      const contactName = object?.contact.name;
      const contactPhone = object?.contact.phone;
      const contactPosition = workingPositions?.find(
        (pos) => pos._id === object?.contact.position
      );
      const contactEmail = object?.contact.email;

      const description = object?.description.fullDescription;

      const rentPrice = object?.commercialTerms.rentPrice;
      const securityDeposit = object?.commercialTerms.securityDeposit;
      const rentSquare = object?.commercialTerms.rentSquare;
      const rentalHolidays = object?.commercialTerms.rentalHolidays;
      const indexingAnnual = object?.commercialTerms.indexingAnnual;
      const rentType = rentTypes?.find(
        (type) => type._id === object?.commercialTerms.rentTypes
      );
      const advanseDeposit = object?.commercialTerms.advanseDeposit;

      const currentRenter = currentRenters?.find(
        (renter) => renter._id === object?.estateOptions.currentRenters
      );
      const objectCondition = objectConditions?.find(
        (cond) => cond._id === object?.estateOptions.objectConditions
      );
      const estateType = estateTypes?.find(
        (type) => type._id === object?.estateOptions.estateTypes
      );
      const objectType = objectTypes?.find(
        (type) => type._id === object?.estateOptions.objectTypes
      );
      const objectProperty = objectProperties?.find(
        (prop) => prop._id === object?.estateOptions.objectProperties
      );

      const loadingArea = object?.estateOptions.loadingArea;
      const premisesHeight = object?.estateOptions.premisesHeight;
      const parkingQuantity = object?.estateOptions.parkingQuantity;
      const electricityKw = object?.estateOptions.electricityKw;
      const waterSuply = object?.estateOptions.waterSuply;
      const premisesFloor = object?.estateOptions.premisesFloor;
      const cadastralNumber = object?.estateOptions.cadastralNumber;

      const result = {
        Дата: date,
        Менеджер: userName,
        "Телефон менеджера": userPhone,

        Город: city,
        Район: district?.name,
        Метро: metro ? metro?.name : "-",
        Адрес: address,
        Идентификатор: identifier ? identifier : "-",
        Долгота: longitude,
        Широта: latitude,
        Zoom: zoom,
        "Статус объекта": status?.name,

        Описание: description ? description : "-",

        "Имя представителя": contactName ? contactName : "-",
        "Позиция представителя": contactPosition ? contactPosition?.name : "-",
        "Телефон представителя": contactPhone ? contactPhone : "-",
        "Email представителя": contactEmail ? contactEmail : "-",

        "Стоимость аренды": rentPrice ? rentPrice : "-",
        Обеспечительный: securityDeposit ? securityDeposit : "-",
        "S аренды": rentSquare ? rentSquare : "-",
        Каникулы: rentalHolidays ? rentalHolidays : "-",
        Индексация: indexingAnnual ? indexingAnnual : "-",
        "Тип сделки": rentType ? rentType?.name : "-",
        Авансовый: advanseDeposit ? advanseDeposit : "-",

        "Текущий арендатор": currentRenter ? currentRenter?.name : "-",
        "Состояние помещения": objectCondition ? objectCondition?.name : "-",
        "Тип недвижимости": estateType ? estateType?.name : "-",
        "Тип объекта": objectType ? objectType?.name : "-",
        "Расположение объекта": objectProperty ? objectProperty?.name : "-",

        "Зона погрузки": loadingArea ? loadingArea : "-",
        "Высота потолков": premisesHeight ? premisesHeight : "-",
        "Парковка (мест)": parkingQuantity ? parkingQuantity : "-",
        "Электричество (кВт)": electricityKw ? electricityKw : "-",
        Водоснабжение: waterSuply ? waterSuply : "-",
        "Состояние полов": premisesFloor ? premisesFloor : "-",
        "Кадастровый №": cadastralNumber ? cadastralNumber : "-",
      };

      return result;
    });
  }, [objects]);

  return modifiedObjectsData;
};

export default useModifyObjectToExportExel;
