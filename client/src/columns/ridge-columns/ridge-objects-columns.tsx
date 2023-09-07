import { useDispatch, useSelector } from "react-redux";
import {
  FormatDistrict,
  FormatMetro,
} from "../../components/common/table/helpers/helpers";
import { FormatDate } from "../../utils/date/format-date";
import { AlignCenter } from "../styled/styled";
import { Box, Button, Typography } from "@mui/material";
import TableOpenButton from "../../components/common/buttons/table-open-button";
import OpenRidgeObjectButton from "../../components/common/buttons/ridge-object/open-ridge-object-button";
import CreateObjectButton from "../../components/UI/dialogs/buttons/create-object-button";
import {
  setUpdateRidgeObjectId,
  setUpdateRidgeObjectOpenState,
} from "../../store/ridge-object/update-ridge-object.store";
import { getRidgeObjectStatusNameById } from "../../store/ridge-object/ridge-object-status.store";
import CreateObjectFromRidgeButton from "../../components/UI/dialogs/buttons/create-object-from-ridge-button";

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
      const objectId = info.getValue();
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch(setUpdateRidgeObjectId(objectId));
        dispatch(setUpdateRidgeObjectOpenState(true));
      };
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <OpenRidgeObjectButton
            text="Открыть"
            background="purple"
            onClick={handleClick}
            //  disabled,
            fontColor="white"
            backgroudHover="darkOrchid"
            //  fontColorHover
          />
          <CreateObjectFromRidgeButton objectId={objectId}/>
        </Box>
      );
    },
  },
];
