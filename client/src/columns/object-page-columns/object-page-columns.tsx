import { Box, styled } from "@mui/material";
import { makeDigitSeparator } from "../../utils/data/make-digit-separator";
import {
  FormatCurrentRenter,
  FormatDate,
  FormatManagerName,
  FormatMetro,
  FormatObjectProperties,
  FormatObjectStatus,
  FormatPhone,
  FormatTypeEstate,
  FormatTypeObject,
  FormatTypeRent,
  FormatWorkingPosition,
} from "../../components/common/table/helpers/helpers";
import EmptyTd from "../../components/common/columns/empty-td";
import { useSelector } from "react-redux";
import { getEstateConditionNameById } from "../../store/object-params/object-conditions.store";
import { getDistrictName } from "../../store/object-params/districts.store";

const AlignCenter = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const locationColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.city",
    header: "Город",
    enableSorting: false,
    cell: (info) => {
      const city = info.getValue();
      return <AlignCenter>{city}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.district",
    header: "Район",
    enableSorting: false,
    cell: (info) => {
      const district = info.getValue();
      const distName = useSelector(getDistrictName(district));
      return <AlignCenter>{distName}</AlignCenter>;
    },
  },
  {
    accessorKey: "location.metro",
    header: "Метро",
    enableSorting: false,
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
    enableSorting: false,
    cell: (info) => {
      const address = info.getValue();
      return <AlignCenter>{address}</AlignCenter>;
    },
  },
  {
    accessorFn: (row) => row,
    header: "Идентификатор",
    enableSorting: false,
    cell: (info) => {
      const object = info.getValue();
      const location = object?.location.identifier;
      if (location && location.identifier) {
        return <AlignCenter>{location.identifier}</AlignCenter>;
      } else {
        return <EmptyTd />;
      }
    },
  },
  {
    accessorKey: "userId",
    header: "Менеджер",
    enableSorting: false,
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
    enableSorting: false,
    cell: (info) => {
      const cadNumber = info.getValue();
      return cadNumber ? <AlignCenter>{cadNumber}</AlignCenter> : <EmptyTd />;
    },
  },
  {
    accessorKey: "estateOptions.estateTypes",
    header: "Тип недвижимости",
    enableSorting: false,
    cell: (info) => {
      const type = info.getValue();
      return <AlignCenter>{FormatTypeEstate(type)}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.objectTypes",
    header: "Тип объекта",
    enableSorting: false,
    cell: (info) => {
      const type = info.getValue();
      return <AlignCenter>{FormatTypeObject(type)}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.objectProperties",
    header: "Расположение объекта",
    enableSorting: false,
    cell: (info) => {
      const type = info.getValue();
      return type ? <AlignCenter>{FormatObjectProperties(type)}</AlignCenter> :  <EmptyTd />;
    },
  },
  {
    accessorKey: "estateOptions.currentRenters",
    header: "Текущий арендатор",
    enableSorting: false,
    cell: (info) => {
      const renter = info.getValue();
      return <AlignCenter>{FormatCurrentRenter(renter)}</AlignCenter>;
    },
  },
  {
    accessorKey: "estateOptions.objectConditions",
    header: "Состояние помещения",
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
    cell: (info) => {
      const square = info.getValue();
      return square ? <AlignCenter>{`${square}кВт`}</AlignCenter> : <EmptyTd />;
    },
  },
  {
    accessorKey: "estateOptions.waterSuply",
    header: "Водоснабжение",
    enableSorting: false,
    cell: (info) => {
      const waterSuply = info.getValue();
      return waterSuply ? <AlignCenter>{waterSuply}</AlignCenter> : <EmptyTd />;
    },
  },
  {
    accessorKey: "estateOptions.premisesHeight",
    header: "Потолки",
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
    cell: (info) => {
      const securityDeposit = info.getValue();
      return securityDeposit ? (
        <AlignCenter>{`${makeDigitSeparator(securityDeposit)}₽`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    },
  },
  {
    accessorKey: "commercialTerms.advanseDeposit",
    header: "Авансовый",
    enableSorting: false,
    cell: (info) => {
      const advanseDeposit = info.getValue();
      return advanseDeposit ? (
        <AlignCenter>{`${makeDigitSeparator(advanseDeposit)}₽`}</AlignCenter>
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
    enableSorting: false,
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
    enableSorting: false,
    cell: (info) => {
      const name = info?.getValue();
      return name ? <AlignCenter>{name}</AlignCenter> : <EmptyTd />;
    },
  },
  {
    accessorKey: "contact.position",
    header: "Позиция",
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
    cell: (info) => {
      const email = info?.getValue();
      return email ? <AlignCenter>{email}</AlignCenter> : <EmptyTd />;
    },
  },
];
