import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import EmptyTd from "../../components/common/columns/empty-td";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
// utils
import { FormatDate } from "../../utils/date/format-date";
// store
import {
  setUpdateRidgeLastContactId,
  setUpdateRidgeLastContactOpenState,
} from "../../store/ridge-last-contact/update-ridge-last-contact.store";

export const ridgeTastContactColumns = [
  {
    accessorKey: "date",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      const formattedDate = FormatDate(date);
      const dayOfWeek = dayjs(date).locale("ru").format("dd");
      return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: "6px" }}>
          <Typography>{formattedDate}</Typography>
          <Typography>{dayOfWeek}</Typography>{" "}
        </Box>
      );
    },
  },
  {
    accessorKey: "result",
    header: "Результат",
    cell: (info) => {
      const result = info.getValue();
      return result ? result : <EmptyTd />;
    },
  },
  {
    accessorKey: "_id",
    header: "",
    maxWidth: 70,
    minWidth: 50,
    width: 60,
    cell: (info) => {
      const dispatch = useDispatch();
      const lastContactId = info.getValue();

      const handleClick = () => {
        dispatch(setUpdateRidgeLastContactId(lastContactId));
        dispatch(setUpdateRidgeLastContactOpenState(true));
      };

      return (
        <MultiColorContainedButton
          text="Править"
          fontColor="white"
          background="Chocolate"
          backgroudHover="SaddleBrown"
          onClick={handleClick}
        />
      );
    },
  },
];
