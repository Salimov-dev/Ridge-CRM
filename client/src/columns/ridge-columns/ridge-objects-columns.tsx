import { useDispatch, useSelector } from "react-redux";
import {
  FormatDistrict,
  FormatMetro,
} from "../../components/common/table/helpers/helpers";
import { FormatDate } from "../../utils/date/format-date";
import { AlignCenter } from "../styled/styled";
import { Box, Typography } from "@mui/material";
import OpenRidgeObjectButton from "../../components/common/buttons/open-ridge-object-button";
import {
  setUpdateRidgeObjectId,
  setUpdateRidgeObjectOpenState,
} from "../../store/ridge-object/update-ridge-object.store";
import { getRidgeObjectStatusNameById } from "../../store/ridge-object/ridge-object-status.store";
import EmptyTd from "../components/empty-td";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";

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
          return <Typography>{address}</Typography>;
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          const name = useSelector(getRidgeObjectStatusNameById(status));
          return <AlignCenter>{name}</AlignCenter>;
        },
      },
    ],
  },
  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "findedContacts",
        header: "Найденные контакты",
        cell: (info) => {
          const contacts = info.getValue();
          return contacts ? <Typography>{contacts}</Typography> : <EmptyTd />;
        },
      },
      {
        accessorKey: "comment",
        header: "Комментарий",
        cell: (info) => {
          const comment = info.getValue();
          return comment ? <Typography>{comment}</Typography> : <EmptyTd />;
        },
      },
    ],
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const objectId = info.getValue();
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch(setUpdateRidgeObjectId(objectId));
        dispatch(setUpdateRidgeObjectOpenState(true));
      };
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <MultiColorContainedButton
            text="Открыть"
            fontColor="white"
            background="purple"
            backgroudHover="darkOrchid"
            onClick={handleClick}
          />
        </Box>
      );
    },
  },
];
