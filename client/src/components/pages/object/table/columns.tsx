import { Box, styled } from "@mui/material";
import { makeDigitSeparator } from "../../../../utils/make-digit-separator";
import {
  FormatCurrentRenter,
  FormatDate,
  FormatDistrict,
  FormatEstateConditions,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
  FormatPhone,
  FormatTypeEstate,
  FormatTypeObject,
  FormatTypeRent,
  FormatWorkingPosition,
  priceForMetr,
} from "../../../common/table/helpers/helpers";

const AlignCenter = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const locationColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(new Date(date))}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.city",
    header: "Город",
    cell: (info) => {
      const city = info.getValue();
      return <AlignCenter>{city}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.district",
    header: "Район",
    cell: (info) => {
      const district = info.getValue();
      return <AlignCenter>{FormatDistrict(district)}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.metro",
    header: "Метро",
    cell: (info) => {
      const metro = info.getValue();
      return <AlignCenter>{FormatMetro(metro)}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.address",
    header: "Адрес",
    cell: (info) => {
      const address = info.getValue();
      return <AlignCenter>{address}</AlignCenter>;
    },
  },
  {
    accessorKey: "userId",
    header: "Менеджер",
    cell: (info) => {
      const userId = info.getValue();
      return <AlignCenter>{FormatManagerName(userId)}</AlignCenter>;
    },
  },
];

export const estateTypeColumns = [
  {
    accessorKey: "estateOptions.cadastralNumber",
    header: "Кадастровый №",
    cell: (info) => {
      const cadNumber = info.getValue();
      return <AlignCenter>{cadNumber ? cadNumber : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.estateTypes",
    header: "Тип объекта",
    cell: (info) => {
      const type = info.getValue();
      return <AlignCenter>{FormatTypeEstate(type)}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.objectTypes",
    header: "Тип недвижимости",
    cell: (info) => {
      const type = info.getValue();
      return <AlignCenter>{FormatTypeObject(type)}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.currentRenters",
    header: "Текущий арендатор",
    cell: (info) => {
      const renter = info.getValue();
      return <AlignCenter>{FormatCurrentRenter(renter)}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.objectConditions",
    header: "Состояние помещения",
    cell: (info) => {
      const сondition = info.getValue();
      return (
        <AlignCenter>
          {сondition ? FormatEstateConditions(сondition) : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: (info) => {
      const status = info.getValue();
      return <AlignCenter>{FormatObjectStatus(status)}</AlignCenter>;
    },
  },
];

export const estateOptionsColumns = [
  {
    accessorKey: "estateOptions.electricityKw",
    header: "Электр.",
    cell: (info) => {
      const square = info.getValue();
      return <AlignCenter>{square ? `${square}кВт` : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.waterSuply",
    header: "Водоснабжение",
    cell: (info) => {
      const waterSuply = info.getValue();
      return <AlignCenter>{waterSuply ? waterSuply : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.premisesHeight",
    header: "Потолки",
    cell: (info) => {
      const premisesHeight = info.getValue();
      return (
        <AlignCenter>{premisesHeight ? `${premisesHeight}м` : "-"}</AlignCenter>
      );
    },
  },
  {
    accessorKey: "estateOptions.premisesFloor",
    header: "Полы",
    cell: (info) => {
      const premisesFloor = info.getValue();
      return <AlignCenter>{premisesFloor ? premisesFloor : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.parkingQuantity",
    header: "Парковка",
    cell: (info) => {
      const parkingQuantity = info.getValue();
      return (
        <AlignCenter>
          {parkingQuantity ? `${parkingQuantity} авто` : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "estateOptions.loadingArea",
    header: "Разгрузка",
    cell: (info) => {
      const loadingArea = info.getValue();
      return <AlignCenter>{loadingArea ? loadingArea : "-"}</AlignCenter>;
    },
  },
];

export const commercialTermsColumns = [
  {
    accessorKey: "commercialTerms.totalSquare",
    header: "Общая S",
    cell: (info) => {
      const square = info.getValue();
      return (
        <AlignCenter>
          {square ? `${makeDigitSeparator(square)}м²` : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "commercialTerms.rentSquare",
    header: "S аренды",
    cell: (info) => {
      const square = info.getValue();
      return (
        <AlignCenter>
          {square ? `${makeDigitSeparator(square)}м²` : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "commercialTerms.rentPrice",
    header: "Стоимость аренды",
    cell: (info) => {
      const price = info.getValue();
      return (
        <AlignCenter>
          {price ? `${makeDigitSeparator(price)}₽` : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Стоимость 1м²",
    cell: (info) => {
      const objectId = info.getValue();
      const result = makeDigitSeparator(priceForMetr(objectId));
      return <AlignCenter>{result ? `${result}₽/м²` : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "commercialTerms.indexingAnnual",
    header: "Индексация",
    cell: (info) => {
      const indexing = info.getValue();
      return (
        <AlignCenter>
          {indexing ? `${makeDigitSeparator(indexing)}%` : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "commercialTerms.rentalHolidays",
    header: "Каникулы",
    cell: (info) => {
      const holidays = info.getValue();
      console.log("holidays", holidays);
      return <AlignCenter>{holidays ? `${holidays} дней` : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "commercialTerms.securityDeposit",
    header: "Обеспечительный",
    cell: (info) => {
      const securityDeposit = info.getValue();
      return (
        <AlignCenter>
          {securityDeposit ? `${makeDigitSeparator(securityDeposit)}₽` : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "commercialTerms.agentComission",
    header: "Комиссия",
    cell: (info) => {
      const agentComission = info.getValue();
      return (
        <AlignCenter>
          {agentComission ? `${makeDigitSeparator(agentComission)}%` : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "commercialTerms.rentTypes",
    header: "Договор",
    cell: (info) => {
      const deal = info.getValue();
      return <AlignCenter>{deal ? FormatTypeRent(deal) : "-"}</AlignCenter>;
    },
  },
];

export const contactsColumns = [
  {
    accessorKey: "contact.name",
    header: "Имя",
    cell: (info) => {
      const name = info.getValue();
      return <AlignCenter>{name ? name : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "contact.position",
    header: "Позиция",
    cell: (info) => {
      const position = info.getValue();
      return (
        <AlignCenter>
          {position ? FormatWorkingPosition(position) : "-"}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "contact.phone",
    header: "Телефон",
    cell: (info) => {
      const phone = info.getValue();
      return <AlignCenter>{phone ? FormatPhone(phone) : "-"}</AlignCenter>;
    },
  },
  {
    accessorKey: "contact.email",
    header: "Почта",
    cell: (info) => {
      const email = info.getValue();
      return <AlignCenter>{email ? email : "-"}</AlignCenter>;
    },
  },
];
