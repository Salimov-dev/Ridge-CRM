import { makeDigitSeparator } from "@utils/data/make-digit-separator";
import {
  FormatCurrentRenter,
  FormatDate,
  FormatManagerName,
  FormatMetro,
  FormatObjectProperties,
  FormatObjectStatus,
  FormatObjectTradeArea,
  FormatPhone,
  FormatTypeEstate,
  FormatTypeObject,
  FormatTypeRent,
  FormatWorkingPosition
} from "@components/common/table/helpers/helpers";
import EmptyTd from "@components/common/columns/empty-td";
import { useSelector } from "react-redux";
import { getEstateConditionNameById } from "@store/object-params/object-conditions.store";
import { getDistrictName } from "@store/object-params/districts.store";
import { AlignCenter } from "@components/common/columns/styled";
import makeToLocalString from "@utils/data/make-to-local-string";

export const locationColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    }
  },
  {
    accessorKey: "city",
    header: "Город",
    enableSorting: false,
    cell: (info) => {
      const city = info.getValue();
      return <AlignCenter>{city}</AlignCenter>;
    }
  },
  {
    accessorKey: "district",
    header: "Район",
    enableSorting: false,
    cell: (info) => {
      const district = info.getValue();
      const distName = useSelector(getDistrictName(district));
      return <AlignCenter>{distName}</AlignCenter>;
    }
  },
  {
    accessorKey: "metro",
    header: "Метро",
    enableSorting: false,
    cell: (info) => {
      const metro = info.getValue();
      return metro ? (
        <AlignCenter>{FormatMetro(metro)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "address",
    header: "Адрес",
    enableSorting: false,
    cell: (info) => {
      const address = info.getValue();
      return <AlignCenter>{address}</AlignCenter>;
    }
  },
  {
    accessorFn: (row) => row,
    header: "Идентификатор",
    enableSorting: false,
    cell: (info) => {
      const object = info.getValue();
      const identifier = object?.identifier;
      if (identifier) {
        return <AlignCenter>{identifier}</AlignCenter>;
      } else {
        return <EmptyTd />;
      }
    }
  },
  {
    accessorKey: "userId",
    header: "Менеджер",
    enableSorting: false,
    cell: (info) => {
      const userId = info.getValue();
      return (
        <AlignCenter
          style={{ background: "yellow", color: "black", padding: "5px" }}
        >
          {FormatManagerName(userId)}
        </AlignCenter>
      );
    }
  }
];

export const estateTypeColumns = [
  {
    accessorKey: "cadastralNumber",
    header: "Кадастровый №",
    enableSorting: false,
    cell: (info) => {
      const cadNumber = info.getValue();
      return cadNumber ? <AlignCenter>{cadNumber}</AlignCenter> : <EmptyTd />;
    }
  },
  {
    accessorKey: "estateTypes",
    header: "Тип недвижимости",
    enableSorting: false,
    cell: (info) => {
      const type = info.getValue();
      return <AlignCenter>{FormatTypeEstate(type)}</AlignCenter>;
    }
  },
  {
    accessorKey: "objectTypes",
    header: "Тип объекта",
    enableSorting: false,
    cell: (info) => {
      const type = info.getValue();
      return <AlignCenter>{FormatTypeObject(type)}</AlignCenter>;
    }
  },
  {
    accessorFn: (row) => row,
    header: "Расположение объекта",
    enableSorting: false,
    cell: (info) => {
      const type = info?.getValue()?.objectProperties;
      return type ? (
        <AlignCenter>{FormatObjectProperties(type)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorFn: (row) => row,
    header: "Тип торговой площади",
    enableSorting: false,
    cell: (info) => {
      const tradeArea = info?.getValue()?.tradeArea;
      return tradeArea ? (
        <AlignCenter>{FormatObjectTradeArea(tradeArea)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "currentRenters",
    header: "Текущий арендатор",
    enableSorting: false,
    cell: (info) => {
      const renter = info.getValue();
      return <AlignCenter>{FormatCurrentRenter(renter)}</AlignCenter>;
    }
  },
  {
    accessorKey: "objectConditions",
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
    }
  },
  {
    accessorKey: "status",
    header: "Статус",
    enableSorting: false,
    cell: (info) => {
      const status = info.getValue();
      return (
        <AlignCenter
          style={{ background: "yellow", color: "black", padding: "5px" }}
        >
          {FormatObjectStatus(status)}
        </AlignCenter>
      );
    }
  }
];

export const estateOptionsColumns = [
  {
    accessorKey: "electricityKw",
    header: "Электр.",
    enableSorting: false,
    cell: (info) => {
      const square = info.getValue();
      return square ? <AlignCenter>{`${square}кВт`}</AlignCenter> : <EmptyTd />;
    }
  },
  {
    accessorKey: "waterSuply",
    header: "Водоснабжение",
    enableSorting: false,
    cell: (info) => {
      const waterSuply = info.getValue();
      return waterSuply ? <AlignCenter>{waterSuply}</AlignCenter> : <EmptyTd />;
    }
  },
  {
    accessorKey: "premisesHeight",
    header: "Потолки",
    enableSorting: false,
    cell: (info) => {
      const premisesHeight = info.getValue();
      return premisesHeight ? (
        <AlignCenter>{`${premisesHeight}м`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "premisesFloor",
    header: "Полы",
    enableSorting: false,
    cell: (info) => {
      const premisesFloor = info.getValue();
      return premisesFloor ? (
        <AlignCenter>{premisesFloor}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "parkingQuantity",
    header: "Парковка",
    enableSorting: false,
    cell: (info) => {
      const parkingQuantity = info.getValue();
      return parkingQuantity ? (
        <AlignCenter>{`${parkingQuantity} авто`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "loadingArea",
    header: "Разгрузка",
    enableSorting: false,
    cell: (info) => {
      const loadingArea = info.getValue();
      return loadingArea ? (
        <AlignCenter>{loadingArea}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  }
];

export const commercialTermsColumns = [
  {
    accessorKey: "rentSquare",
    header: "S аренды",
    enableSorting: false,
    cell: (info) => {
      const square = info.getValue();
      return square ? (
        <AlignCenter>{`${makeToLocalString(square)}м²`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "rentPrice",
    header: "Стоимость аренды",
    enableSorting: false,
    cell: (info) => {
      const price = info.getValue();
      return price ? (
        <AlignCenter>{`${makeToLocalString(price)}₽`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorFn: (row) => row,
    header: "Стоимость 1м²",
    enableSorting: false,
    cell: (info) => {
      const object = info.getValue();
      const rentPrice = Number(object?.rentPrice);
      const rentSquare = Number(object?.rentSquare);
      const priceForMetr = Math.round(rentPrice / rentSquare);

      const result = makeToLocalString(priceForMetr);
      if (priceForMetr) {
        return <AlignCenter>{`${result}₽/м²`}</AlignCenter>;
      } else return <EmptyTd />;
    }
  },
  {
    accessorKey: "indexingAnnual",
    header: "Индексация",
    enableSorting: false,
    cell: (info) => {
      const indexing = info.getValue();
      return indexing ? (
        <AlignCenter>{`${makeToLocalString(indexing)}%`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "rentalHolidays",
    header: "Каникулы",
    enableSorting: false,
    cell: (info) => {
      const holidays = info.getValue();
      return holidays ? (
        <AlignCenter>{`${holidays} дней`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "securityDeposit",
    header: "Обеспечительный",
    enableSorting: false,
    cell: (info) => {
      const securityDeposit = info.getValue();
      return securityDeposit ? (
        <AlignCenter>{`${makeToLocalString(securityDeposit)}₽`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorFn: (row) => row,
    header: "Авансовый",
    enableSorting: false,
    cell: (info) => {
      const advanseDeposit = info?.getValue()?.advanseDeposit;
      return advanseDeposit ? (
        <AlignCenter>{`${makeToLocalString(advanseDeposit)}₽`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorFn: (row) => row,
    header: "Комиссия",
    cell: (info) => {
      const object = info.getValue();
      const agentComission = object?.agentComission;
      return agentComission ? (
        <AlignCenter>{`${makeToLocalString(agentComission)}%`}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  },
  {
    accessorKey: "rentTypes",
    header: "Договор",
    enableSorting: false,
    cell: (info) => {
      const deal = info.getValue();
      return deal ? (
        <AlignCenter>{FormatTypeRent(deal)}</AlignCenter>
      ) : (
        <EmptyTd />
      );
    }
  }
];
