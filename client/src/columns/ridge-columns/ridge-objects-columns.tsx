import { useSelector } from "react-redux";
import {
  FormatDistrict,
  FormatMetro,
} from "../../components/common/table/helpers/helpers";
import { FormatDate } from "../../utils/date/format-date";
import { AlignCenter } from "../styled/styled";
import { Button, Typography } from "@mui/material";
import TableOpenButton from "../../components/common/buttons/table-open-button";

export const ridgeObjectsColumns = [
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
          return <Typography>{address}</Typography>;
        },
      },
    ],
  },
  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "contacts",
        header: "Найденные контакты",
        cell: (info) => {
          const contacts = info.getValue();
          return <Typography>{contacts}</Typography>;
        },
      },
      {
        accessorKey: "comment",
        header: "Комментарий",
        cell: (info) => {
          const comment = info.getValue();
          return <Typography>{comment}</Typography>;
        },
      },
    ],
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      return (
        <Button color="success" variant="outlined">
          Создать объект
        </Button>
      );
    },
  },
];
