import {
  FormatDate,
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
  FormatPhone,
} from "../../../common/table/helpers/helpers";
//   import OpenButton from "./components/open-button";

export const locationColumns = [
  {
    header: "Основная информация",
    columns: [
      {
        accessorKey: "created_at",
        header: "Дата",
        cell: (info) => {
          const date = info.getValue();
          return FormatDate(new Date(date));
        },
      },
      {
        accessorKey: "userId",
        header: "Менеджер",
        cell: (info) => {
          const userId = info.getValue();
          return FormatManagerName(userId);
        },
      },
    ],
  },
  {
    header: "Расположение объекта",
    columns: [
      {
        accessorKey: "location.city",
        header: "Город",
        cell: (info) => {
          const city = info.getValue();
          return city;
        },
      },
      {
        accessorKey: "location.district",
        header: "Район",
        cell: (info) => {
          const district = info.getValue();
          return FormatDistrict(district);
        },
      },
      {
        accessorKey: "location.metro",
        header: "Метро",
        cell: (info) => {
          const metroValue = info.getValue();
          return FormatMetro(metroValue);
        },
      },
      {
        accessorKey: "location.address",
        header: "Адрес",
        cell: (info) => {
          const address = info.getValue();
          return address;
        },
      },
    ],
  },
];

export const estateTypeColumns = [
  {
    accessorKey: "estateOptions.cadastralNumber",
    header: "Кадастровый №",
    cell: (info) => {
      const cadNumber = info.getValue();
      return cadNumber;
    },
  },
  {
    accessorKey: "estateOptions.estateTypes",
    header: "Тип объекта",
    cell: (info) => {
      const type = info.getValue();
      return type;
    },
  },
  {
    accessorKey: "estateOptions.objectTypes",
    header: "Тип недвижимости",
    cell: (info) => {
      const type = info.getValue();
      return type;
    },
  },
  {
    accessorKey: "estateOptions.currentRenters",
    header: "Текущий арендатор",
    cell: (info) => {
      const renter = info.getValue();
      return renter;
    },
  },
  {
    accessorKey: "objectCondition",
    header: "Состояние помещения",
    cell: (info) => {
      const сondition = info.getValue();
      return сondition;
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: (info) => {
      const status = info.getValue();
      return FormatObjectStatus(status);
    },
  },
];

export const commercialTermsColumns = [
  {
    accessorKey: "commercialTerms.totalSquare",
    header: "Общая S",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "commercialTerms.rentSquare",
    header: "S аренды",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "commercialTerms.rentPrice",
    header: "Стоимость аренды",
    cell: (info) => {
      const price = info.getValue();
      return price;
    },
  },
  {
    accessorKey: "commercialTerms.indexingAnnual",
    header: "Индексация",
    cell: (info) => {
      const indexing = info.getValue();
      return indexing;
    },
  },
  {
    accessorKey: "commercialTerms.rentalHolidays",
    header: "Каникулы",
    cell: (info) => {
      const holidays = info.getValue();
      return holidays;
    },
  },
  {
    accessorKey: "commercialTerms.securityDeposit",
    header: "Обеспечительный",
    cell: (info) => {
      const holidays = info.getValue();
      return holidays;
    },
  },
  {
    accessorKey: "commercialTerms.agentComission",
    header: "Комиссия",
    cell: (info) => {
      const holidays = info.getValue();
      return holidays;
    },
  },
  {
    accessorKey: "commercialTerms.rentTypes",
    header: "Договор",
    cell: (info) => {
      const deal = info.getValue();
      return deal;
    },
  },
];

export const estateOptionsColumns = [
  {
    accessorKey: "estateOptions.electricityKw",
    header: "Электр.",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "estateOptions.waterSuply",
    header: "Водоснабжение",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "estateOptions.premisesHeight",
    header: "Потолки",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "estateOptions.premisesFloor",
    header: "Полы",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "estateOptions.parkingQuantity",
    header: "Парковка",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "estateOptions.loadingArea",
    header: "Разгрузка",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
];

export const contactsColumns = [
  {
    accessorKey: "contact.name",
    header: "Имя",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "contact.position",
    header: "Позиция",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "contact.phone",
    header: "Телефон",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
  {
    accessorKey: "contact.email",
    header: "Почта",
    cell: (info) => {
      const square = info.getValue();
      return square;
    },
  },
];
