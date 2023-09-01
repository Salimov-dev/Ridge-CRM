import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
// components
import { FormatManagerName } from "../components/common/table/helpers/helpers";
import TableOpenButton from "../components/common/buttons/table-open-button";
// store
import { getObjectById } from "../store/object/objects.store";
// utils
import { FormatDate } from "../utils/date/format-date";
import { FormatTime } from "../utils/date/format-time";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import GoToButton from "../components/common/buttons/go-to-button";

export const tasksColumns = [
  {
    accessorKey: "date",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      const formattedDate = FormatDate(new Date(date));
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

      const paramsId = useParams();
      const isParamsId = Boolean(Object.keys(paramsId).length);

      const handleClick = () => {
        navigate(`/objects/${objectId}`);
      };

      return object ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {result}
          {!isParamsId ? (
            <GoToButton text="Перейти" color="neutral" onClick={handleClick} />
          ) : null}
        </Box>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "userId",
    header: "Задачу поставил",
    cell: (info) => {
      const userId = info.getValue();
      return (
        <Typography sx={{ textAlign: "center" }}>
          {FormatManagerName(userId)}
        </Typography>
      );
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
