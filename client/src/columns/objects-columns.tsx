import { Box, styled } from "@mui/material";
import TableOpenButton from "../components/common/buttons/table-open-button";
import {
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
  FormatPhone,
} from "../components/common/table/helpers/helpers";
import { FormatDate } from "../utils/date/format-date";
import { useNavigate } from "react-router-dom";

const AlignCenter = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const objectsColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(new Date(date))}</AlignCenter>;
    },
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
          return <AlignCenter>{FormatPhone(phone)}</AlignCenter>;
        },
      },
      {
        accessorKey: "contact.name",
        header: "Имя",
        cell: (info) => {
          const name = info.getValue();
          return <AlignCenter>{name}</AlignCenter>;
        },
      },
      {
        accessorKey: "",
        header: "Последний контакт",
        cell: (info) => {
          const contact = info.getValue();
          return <AlignCenter>{contact}</AlignCenter>;
        },
      },
    ],
  },
  {
    header: "Другое",
    columns: [
      {
        accessorKey: "userId",
        header: "Менеджер",
        cell: (info) => {
          const userId = info.getValue();
          return <AlignCenter>{FormatManagerName(userId)}</AlignCenter>;
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
      {
        accessorKey: "_id",
        header: "",
        enableSorting: false,
        cell: (info) => {
          const objectId = info.getValue();
          const navigate = useNavigate();
          const handleClick = () => {
            navigate(objectId);
          };
          return <TableOpenButton text="Открыть" onClick={handleClick} />;
        },
      },
    ],
  },
];
