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
import {
  setUpdateLastContactId,
  setUpdateLastContactOpenState,
} from "../../store/last-contact/update-last-contact.store";

export const lastContactColumns = [
  {
    accessorKey: "date",
    header: "Дата",
    enableSorting: false,
    size: 30,
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
        dispatch(setUpdateLastContactId(lastContactId));
        dispatch(setUpdateLastContactOpenState(true));
      };

      return (
        <MultiColorContainedButton
          text="Править"
          fontColor="white"
          background="SaddleBrown"
          backgroudHover="Sienna"
          onClick={handleClick}
        />
      );
    },
  },
];
