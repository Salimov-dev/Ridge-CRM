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
import {
  setUpdateMeetingId,
  setUpdateMeetingOpenState,
} from "../../../store/meeting/update-meeting.store";
import { useNavigate } from "react-router-dom";

export const groupedColumns = [
  {
    accessorKey: "date",
    header: "Дата",
    cell: (info) => {
      const date = info.getValue();
      return FormatDate(new Date(date));
    },
  },
  {
    accessorKey: "time",
    header: "Время",
    cell: (info) => {
      const time = info.getValue();
      return FormatTime(new Date(time));
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
      return name;
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
    accessorKey: "status",
    header: "Статус",
    cell: (info) => {
      const status = info.getValue();
      const name = useSelector(getMeetingStatusNameById(status));
      return name;
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
      return FormatDate(new Date(date));
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
        <TableOpenButton id={meetingId} text="Править" onClick={handleClick} />
      );
    },
  },
];
