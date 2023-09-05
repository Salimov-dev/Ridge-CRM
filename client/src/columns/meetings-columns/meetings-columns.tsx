import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
// components
import GoToButton from "../../components/common/buttons/go-to-button";
import { FormatManagerName } from "../../components/common/table/helpers/helpers";
import TableOpenButton from "../../components/common/buttons/table-open-button";
// store
import { getObjectById } from "../../store/object/objects.store";
import { getMeetingStatusNameById } from "../../store/meeting/meeting-status.store";
import { getMeetingTypeNameById } from "../../store/meeting/meeting-types.store";
// utils
import { FormatDate } from "../../utils/date/format-date";
import { FormatTime } from "../../utils/date/format-time";
import {
  setUpdateMeetingId,
  setUpdateMeetingOpenState,
} from "../../store/meeting/update-meeting.store";
import {
  loadOpenObjectPageOpenState,
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";
import { AlignCenter } from "../styled/styled";

export const meetingsColumns = [
  {
    accessorKey: "isDone",
    header: "",
    enableSorting: false,
    cell: (info) => {
      const isDone = info.getValue();
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {!isDone ? (
            <TaskAltOutlinedIcon sx={{ color: "green" }} />
          ) : (
            <DoDisturbAltOutlinedIcon sx={{ color: "red" }} />
          )}
        </Box>
      );
    },
  },
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
    header: "Адрес встречи",
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
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;
      const isObjectPage = useSelector(loadOpenObjectPageOpenState());
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch(setOpenObjectPageId(objectId));
        dispatch(setOpenObjectPageOpenState(true));
      };

      return objectId ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {fullAddress}
          {!isObjectPage && objectId ? (
            <GoToButton text="Открыть" color="neutral" onClick={handleClick} />
          ) : null}
        </Box>
      ) : (
        "-"
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
      return <AlignCenter>{FormatManagerName(userId)}</AlignCenter> ;
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
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const meetingId = info.getValue();
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch(setUpdateMeetingId(meetingId));
        dispatch(setUpdateMeetingOpenState(true));
      };

      return (
        <TableOpenButton
          text="Править"
          onClick={handleClick}
          background="blue"
          backgroudHover="darkBlue"
        />
      );
    },
  },
];
