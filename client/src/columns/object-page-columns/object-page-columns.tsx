import { Box, styled } from "@mui/material";
import { makeDigitSeparator } from "../../utils/data/make-digit-separator";
import {
  FormatCurrentRenter,
  FormatDate,
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectProperties,
  FormatObjectStatus,
  FormatPhone,
  FormatTypeEstate,
  FormatTypeObject,
  FormatTypeRent,
  FormatWorkingPosition,
  priceForMetr,
} from "../../components/common/table/helpers/helpers";
import EmptyTd from "../../components/common/columns/empty-td";
import { useSelector } from "react-redux";
import { getEstateConditionNameById } from "../../store/object/object-conditions.store";
import { getDistrictName } from "../../store/object/districts.store";

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
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
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
      const distName = useSelector(getDistrictName(district));
      return <AlignCenter>{distName}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.metro",
    header: "Метро",
    cell: (info) => {
      const metro = info.getValue();
      return metro ? (
        <AlignCenter>{FormatMetro(metro)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
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
      return cadNumber ? <AlignCenter>{cadNumber}</AlignCenter> : <EmptyTd />;
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
    accessorKey: "estateOptions.objectProperties",
    header: "Тип недвижимости",
    cell: (info) => {
      const objectProperties = info.getValue();
      return (
        <AlignCenter>
          {objectProperties ? FormatObjectProperties(objectProperties) : null}
        </AlignCenter>
      );
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
      const conditionName = useSelector(getEstateConditionNameById(сondition));

      return сondition ? (
        <AlignCenter>{conditionName}</AlignCenter>
      ) : (
        <EmptyTd />
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
      return square ? <AlignCenter>{`${square}кВт`}</AlignCenter> : <EmptyTd />;
    },
  },
  {
    accessorKey: "estateOptions.waterSuply",
    header: "Водоснабжение",
    cell: (info) => {
      const waterSuply = info.getValue();
      return waterSuply ? <AlignCenter>{waterSuply}</AlignCenter> : <EmptyTd />;
    },
  },
  {
    accessorKey: "estateOptions.premisesHeight",
    header: "Потолки",
    cell: (info) => {
      const premisesHeight = info.getValue();
      return premisesHeight ? (
        <AlignCenter>{`${premisesHeight}м`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "estateOptions.premisesFloor",
    header: "Полы",
    cell: (info) => {
      const premisesFloor = info.getValue();
      return premisesFloor ? (
        <AlignCenter>{premisesFloor}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "estateOptions.parkingQuantity",
    header: "Парковка",
    cell: (info) => {
      const parkingQuantity = info.getValue();
      return parkingQuantity ? (
        <AlignCenter>{`${parkingQuantity} авто`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "estateOptions.loadingArea",
    header: "Разгрузка",
    cell: (info) => {
      const loadingArea = info.getValue();
      return loadingArea ? (
        <AlignCenter>{loadingArea}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
];

export const commercialTermsColumns = [
  {
    accessorKey: "commercialTerms.rentSquare",
    header: "S аренды",
    cell: (info) => {
      const square = info.getValue();
      return square ? (
        <AlignCenter>{`${makeDigitSeparator(square)}м²`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "commercialTerms.rentPrice",
    header: "Стоимость аренды",
    cell: (info) => {
      const price = info.getValue();
      return price ? (
        <AlignCenter>{`${makeDigitSeparator(price)}₽`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorFn: (row) => row,
    header: "Стоимость 1м²",
    cell: (info) => {
      const object = info.getValue();
      const priceForMetr = object?.commercialTerms.priceForMetr;

      const result = makeDigitSeparator(priceForMetr);
      if (priceForMetr) {
        return <AlignCenter>{`${result}₽/м²`}</AlignCenter>;
      } else return <EmptyTd />;
    },
  },
  {
    accessorKey: "commercialTerms.indexingAnnual",
    header: "Индексация",
    cell: (info) => {
      const indexing = info.getValue();
      return indexing ? (
        <AlignCenter>{`${makeDigitSeparator(indexing)}%`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "commercialTerms.rentalHolidays",
    header: "Каникулы",
    cell: (info) => {
      const holidays = info.getValue();
      return holidays ? (
        <AlignCenter>{`${holidays} дней`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "commercialTerms.securityDeposit",
    header: "Обеспечительный",
    cell: (info) => {
      const securityDeposit = info.getValue();
      return securityDeposit ? (
        <AlignCenter>{`${makeDigitSeparator(securityDeposit)}₽`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  // {
  //   accessorKey: "commercialTerms.agentComission",
  //   header: "Комиссия",
  //   cell: (info) => {
  //     const agentComission = info.getValue();
  //     return agentComission ? (
  //       <AlignCenter>{`${makeDigitSeparator(agentComission)}%`}</AlignCenter>
  //     ) : (
  //       <EmptyTd />
  //     );
  //   },
  // },
  {
    accessorKey: "commercialTerms.rentTypes",
    header: "Договор",
    cell: (info) => {
      const deal = info.getValue();
      return deal ? (
        <AlignCenter>{FormatTypeRent(deal)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
];

export const contactsColumns = [
  {
    accessorKey: "contact.name",
    header: "Имя",
    cell: (info) => {
      const name = info?.getValue();
      return name ? <AlignCenter>{name}</AlignCenter> : <EmptyTd />;
    },
  },
  {
    accessorKey: "contact.position",
    header: "Позиция",
    cell: (info) => {
      const position = info?.getValue();
      return position ? (
        <AlignCenter>{FormatWorkingPosition(position)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "contact.phone",
    header: "Телефон",
    cell: (info) => {
      const phone = info?.getValue();
      return phone ? (
        <AlignCenter>{FormatPhone(phone)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "contact.email",
    header: "Почта",
    cell: (info) => {
      const email = info?.getValue();
      return email ? <AlignCenter>{email}</AlignCenter> : <EmptyTd />;
    },
  },
];
