import {
  FormatDate,
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
  FormatPhone,
} from "../../../components/common/table/helpers/helpers";
import OpenButton from "./components/open-button";

export const groupedColumns = [
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

  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "contact.phone",
        header: "Телефон",
        cell: (info) => {
          const phone = info.getValue();        
          return FormatPhone(phone);
        },
      },
      {
        accessorKey: "contact.name",
        header: "Имя",
        cell: (info) => {
          const name = info.getValue();
          return name;
        },
      },
      {
        accessorKey: "",
        header: "Последний контакт",
        cell: (info) => {
          const contact = info.getValue();
          return contact;
        },
      },
    ],
  },
  {
    header: "Другое",
    columns: [
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return FormatObjectStatus(status);
        },
      },
      {
        accessorKey: "_id",
        header: "Ссылка",
        enableSorting: false,
        cell: (info) => <OpenButton objectId={info.getValue()} />,
      },
    ],
  },
];
