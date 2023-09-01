import { useDispatch, useSelector } from "react-redux";
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

export const weeklyTasksColumns = [
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
    accessorKey: "objectId",
    header: "Объект задачи",
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
          <TableOpenButton
            id={objectId}
            text="Перейти"
            color="neutral"
            onClick={handleClick}
          />
        </Box>
      );
    },
  },
  {
    accessorKey: "userId",
    header: "Создатель задачи",
    cell: (info) => {
      const userId = info.getValue();
      return FormatManagerName(userId);
    },
  },

  {
    accessorKey: "comment",
    header: "Задача",
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
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const meetingId = info.getValue();
      const dispatch = useDispatch();
      const handleClick = () => {
        // dispatch(setUpdateMeetingId(meetingId));
        // dispatch(setUpdateMeetingOpenState(true));
      };
      return (
        <TableOpenButton id={meetingId} text="Править" onClick={handleClick} />
      );
    },
  },
];
