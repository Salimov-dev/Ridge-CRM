import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
// components
import { FormatManagerName } from "../../../components/common/table/helpers/helpers";
import TableOpenButton from "../../../components/common/buttons/table-open-button";
// store
import { getObjectById } from "../../../store/object/objects.store";
import { getMeetingStatusNameById } from "../../../store/meeting/meeting-status.store";
import { getMeetingTypeNameById } from "../../../store/meeting/meeting-types.store";
// utils
import { FormatDate } from "../../../utils/date/format-date";
import { FormatTime } from "../../../utils/date/format-time";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import GoToButton from "../../../components/common/buttons/go-to-button";

export const weeklyMeetingsColumns = [
  {
    accessorKey: "date",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      const formattedDate = FormatDate(new Date(date));
      const dayOfWeek = dayjs(date).locale("ru").format("dd");
      return (
        <Box sx={{ display: "flex", gap: "6px" }}>
          <Typography>{formattedDate}</Typography>
          <Typography>{dayOfWeek}</Typography>{" "}
        </Box>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Время",
    enableSorting: false,
    cell: (info) => {
      const time = info.getValue();
      return (
        <Typography sx={{ textAlign: "center" }}>
          {FormatTime(new Date(time))}
        </Typography>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Место",
    cell: (info) => {
      const location = info.getValue();
      return (
        <Typography>
          {location.city}, {location.address}
        </Typography>
      );
    },
  },
  {
    accessorKey: "meetingType",
    header: "Тип",
    cell: (info) => {
      const type = info.getValue();
      const name = useSelector(getMeetingTypeNameById(type));
      return <Typography sx={{ textAlign: "center" }}>{name}</Typography>;
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект встречи",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const result = `${object?.location.city}, ${object?.location.address}`;
      const navigate = useNavigate();

      const handleClick = () => {
        navigate(`/objects/${objectId}`);
      };

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {result}
          <GoToButton
            text="Перейти"
            color="neutral"
            onClick={handleClick}
          />
        </Box>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: (info) => {
      const status = info.getValue();
      const name = useSelector(getMeetingStatusNameById(status));
      return <Typography sx={{ textAlign: "center" }}>{name}</Typography>;
    },
  },

  {
    accessorKey: "userId",
    header: "Инициатор",
    cell: (info) => {
      const userId = info.getValue();
      return FormatManagerName(userId);
    },
  },

  {
    accessorKey: "comment",
    header: "Комментарий",
    cell: (info) => {
      const comment = info.getValue();
      return comment;
    },
  },

  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: (info) => {
      const date = info.getValue();
      return (
        <Typography sx={{ textAlign: "center" }}>
          {FormatDate(new Date(date))}
        </Typography>
      );
    },
  },
];
