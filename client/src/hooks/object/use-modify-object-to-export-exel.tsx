import { useMemo } from "react";
import { useSelector } from "react-redux";
// utils
import { FormatDate } from "../../utils/date/format-date";
// store
import { getObjectsStatusList } from "../../store/object-params/object-status.store";
import { getUsersList } from "../../store/user/users.store";
import { getDistrictsList } from "../../store/object-params/districts.store";
import { getMetroList } from "../../store/object-params/metro.store";
import { getWorkingPositionsList } from "../../store/user-params/working-position.store";
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
      const userName = `${user?.lastName} ${user?.firstName} ${user?.surName}`;
      const userPhone = user?.phone;

      const city = object?.city;
      const address = object?.address;
      const district = districts?.find((dist) => dist._id === object?.district);
      const metro = metros?.find((metro) => metro._id === object?.metro);
      const latitude = object?.latitude;
      const longitude = object?.ongitude;
      const identifier = object?.identifier;
      const zoom = object?.zoom;

      const contactName = object?.name;
      const contactPhone = object?.phone;
      const contactPosition = workingPositions?.find(
        (pos) => pos._id === object?.position
      );
      const contactEmail = object?.email;

      const description = object?.fullDescription;

      const rentPrice = object?.rentPrice;
      const securityDeposit = object?.securityDeposit;
      const rentSquare = object?.rentSquare;
      const rentalHolidays = object?.rentalHolidays;
      const indexingAnnual = object?.indexingAnnual;
      const rentType = rentTypes?.find(
        (type) => type._id === object?.rentTypes
      );
      const advanseDeposit = object?.advanseDeposit;

      const currentRenter = currentRenters?.find(
        (renter) => renter._id === object?.currentRenters
      );
      const objectCondition = objectConditions?.find(
        (cond) => cond._id === object?.objectConditions
      );
      const estateType = estateTypes?.find(
        (type) => type._id === object?.estateTypes
      );
      const objectType = objectTypes?.find(
        (type) => type._id === object?.objectTypes
      );
      const objectProperty = objectProperties?.find(
        (prop) => prop._id === object?.objectProperties
      );

      const loadingArea = object?.loadingArea;
      const premisesHeight = object?.premisesHeight;
      const parkingQuantity = object?.parkingQuantity;
      const electricityKw = object?.electricityKw;
      const waterSuply = object?.waterSuply;
      const premisesFloor = object?.premisesFloor;
      const cadastralNumber = object?.cadastralNumber;

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
        "Кадастровый №": cadastralNumber ? cadastralNumber : "-"
      };

      return result;
    });
  }, [objects]);

  return modifiedObjectsData;
};

export default useModifyObjectToExportExel;
